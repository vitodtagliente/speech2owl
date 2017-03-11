
var speech2owl = speech2owl || {};

speech2owl.NLP = function( text, nlp_response ){
    this.text = text || '';

    this.sentences = [];

    var output = [];

    for( var i = 0; i < nlp_response.length; i++ ){
        var s = nlp_response[i];

        this.sentences.push( s.sentence );

        var processed = new speech2owl.NLP.SentenceInspector( nlp_response[i] );
        output.push( processed );
    }

    this.data = function(){
        return output;
    }
}

speech2owl.NLP.SentenceInspector = function( response ){
    this.text = response.sentence;

    // Tokenize
    this.tokens = [];
    this.terms = response.terms;

    // find verbs, adjectives, nouns, adverbs, conjunctions
    this.verbs = [];
    this.nouns = [];
    this.adjectives = [];
    this.adverbs = [];
    this.pronouns = [];
    this.conjuctions = [];
    this.determiners = [];
    this.other = [];
    this.whdeterminers = [];
    this.entities = [];

    // Constructor

    for( var i = 0; i < response.terms.length; i++ ){
        var term = response.terms[i];

        this.tokens.push( term.token );

        if( term.tag.startsWith('VB') )
            this.verbs.push( term.token );
        else if( term.tag.startsWith('NN') ){
            this.nouns.push( term.token );
            if( term.tag == 'NNP' || 'NNPS' )
                this.entities.push( term.token );
        }
        else if( term.tag.startsWith('JJ') )
            this.adjectives.push( term.token );
        else if( term.tag.startsWith('RB') )
            this.adverbs.push( term.token );
        else if( term.tag == 'CC' )
            this.conjuctions.push( term.token );
        else if( term.tag == 'PRP' )
            this.pronouns.push( term.token );
        else if( term.tag == 'DET' )
            this.determiners.push( term.token );
        else if( term.tag == 'WDT' )
            this.whdeterminers.push( term.token );
        else this.other.push( term.token );

    }

    // Constructor

    this.isNoun = function( word ){
        return this.nouns.contains( word );
    }

    this.isEntity = function( word ){
        return this.entities.contains( word );
    }

    this.isVerb = function( word ){
        return this.verbs.contains( word );
    }

    this.isAdjective = function( word ){
        return this.adjectives.contains( word );
    }

    this.isConjuction = function( word ){
        return this.conjuctions.contains( word );
    }

    this.isWhDeterminer = function( word ){
        return this.whdeterminers.contains( word );
    }

    this.isPronoun = function( word ){
        return this.pronouns.contains( word );
    }

}

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
