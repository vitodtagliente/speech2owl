
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
        var token = new speech2owl.NLP.Token( term );

        if( token.isVerb )
            this.verbs.push( token.text );
        else if( token.isNoun ){
            this.nouns.push( token.text );
            if( token.isEntity )
                this.entities.push( token.text );
        }
        else if( token.isConjuction )
            this.adjectives.push( token.text );
        else if( token.isAdverb )
            this.adverbs.push( token.text );
        else if( token.isAdverb )
            this.conjuctions.push( token.text );
        else if( token.isPronoun )
            this.pronouns.push( token.text );
        else if( token.isDeterminer )
            this.determiners.push( token.text );
        else if( token.isWhDeterminer )
            this.whdeterminers.push( token.text );
        else this.other.push( token.text );

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

    this.tag = function( term ){
        return speech2owl.NLP.Token( term );
    }

}

speech2owl.NLP.Token = function( term ){
    if( term == null )
        term = { token: '', tag: '' };
    var tag = term.tag;
    return {
        text: term.token,
        tag: term.tag,
        isVerb: tag.startsWith('VB'),
        isNoun: tag.startsWith('NN'),
        isEntity: tag == 'NNP' || tag == 'NNPS',
        isAdjective: tag.startsWith('JJ'),
        isAdverb: tag.startsWith('RB'),
        isConjuction: tag == 'CC',
        isPronoun: tag == 'PRP',
        isDeterminer: tag == 'DET',
        idWhDeterminer: tag == 'WDT'
    };
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
