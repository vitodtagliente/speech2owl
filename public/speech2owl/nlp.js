
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
    this.terms = [];

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
        var t = response.terms[i];

        this.tokens.push( t.token );
        var term = new speech2owl.NLP.Term( t );
        this.terms.push( term );

        if( term.isVerb )
            this.verbs.push( term.token );
        else if( term.isNoun ){
            this.nouns.push( term.token );
            if( term.isEntity )
                this.entities.push( term.token );
        }
        else if( term.isConjuction )
            this.adjectives.push( term.token );
        else if( term.isAdverb )
            this.adverbs.push( term.token );
        else if( term.isAdverb )
            this.conjuctions.push( term.token );
        else if( term.isPronoun )
            this.pronouns.push( term.token );
        else if( term.isDeterminer )
            this.determiners.push( term.token );
        else if( term.isWhDeterminer )
            this.whdeterminers.push( term.token );
        else this.other.push( term.token );

    }

    this.term = function( index ){
        if( index < this.terms.length )
            return this.terms[index];
        return null;
    }

    this.token = function( index ){
        if( index < this.terms.length )
            return this.terms[index].token;
        return null;
    }

    this.tag = function( obj ){
        return new speech2owl.NLP.Term( obj );
    }

    this.count = function(){
        return this.terms.length;
    }

}

// term: {token:'', tag:''}

speech2owl.NLP.Term = function( term ){
    if( term == null )
        term = { token: '', tag: '' };

    term.isVerb = term.tag.startsWith('VB'),
    term.isNoun = term.tag.startsWith('NN'),
    term.isEntity = term.tag == 'NNP' || term.tag == 'NNPS',
    term.isAdjective = term.tag.startsWith('JJ'),
    term.isAdverb = term.tag.startsWith('RB'),
    term.isConjuction = term.tag == 'CC',
    term.isPronoun = term.tag == 'PRP',
    term.isDeterminer = term.tag == 'DET',
    term.idWhDeterminer = term.tag == 'WDT'

    return term;
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
