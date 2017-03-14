
var speech2owl = speech2owl || {};

/*
    * HOW TO:

    * Define a variable for nlp
    var nlp = null;

    * Execute a json request to the nlp API
    var ajaxRequest = $.ajax({
        'url': 'nlp',
        'data': {
            text: 'some text'
        },
        'headers': {'Accept': 'application/json'},
        'success': onsuccess,
        'error': function( response ){
            // Do something
        }
    });

    * Define an speech2owl.NLP instance using the API response
    function onsuccess( response ){

        nlp = new speech2owl.NLP( 'some text', response );

    }

    * Once we've initialized the nlp object
    * we can access to its attributes:

    * 1. we can get the source text
    var text = nlp.text

    * 2. we can get the text'sentences
    var sentences = nlp.sentences; // returns an Array

    * 3. we can get SentenceInspector instances
    var inspectors = nlp.data(); // returns an Array

*/

speech2owl.NLP = function( text, nlp_response ){
    this.text = text || '';

    // split the text in sentences
    this.sentences = [];

    var output = [];

    // Initialization: process the data we've got by nlp API
    for( var i = 0; i < nlp_response.length; i++ ){
        var s = nlp_response[i];

        this.sentences.push( s.sentence );

        var processed = new speech2owl.NLP.SentenceInspector( nlp_response[i] );
        output.push( processed );
    }

    // return an array of speech2owl.NLP.SentenceInspector
    this.data = function(){
        return output;
    }
}

/*

    * HOW TO:

    * A SentenceInspector is an object that holds all the information
    * about the terms in the given sentence

    * we can get the sentence's text
    var sentence = inspector.text;

    * we can access to tokens and terms
    var tokens = inspector.tokens; // returns ['token1', 'token2', ...., 'tokenN']
    var terms = inspector.terms; // returns an array of objects:
        [
            { token:'token_name', tag:'TOKEN_TAG', isNoun:bool, isVerb:bool, etc.. },
            { token:'token_name', tag:'TOKEN_TAG', isNoun:bool, isVerb:bool, etc.. },
            .....
            { token:'token_name', tag:'TOKEN_TAG', isNoun:bool, isVerb:bool, etc.. }
        ]

    * we can get a token or term by index
    var token = inspector.token(i);
    var term = inspector.term(i);

    * we can get the number of terms using:
    var n = inspector.count();

*/

speech2owl.NLP.SentenceInspector = function( response ){
    // the source text of the sentence
    this.text = response.sentence;

    // a token is equivalent to a string
    this.tokens = [];
    /* a term is an object {
        token: '',
        tag: '',
        isNoun: true or false,
        isVerb: true or false
        etc....
    }
    */
    this.terms = [];

    // verbs, adjectives, nouns, adverbs, conjunctions found in the sentence
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

    // Initialization:
    // we'll process all the token got by the nlp API response
    // and we'll split them into verbs, nouns, etc...
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

    // Returns the term at the specified index
    this.term = function( index ){
        if( index < this.terms.length )
            return this.terms[index];
        return null;
    }

    // returns the token at the specified index
    this.token = function( index ){
        if( index < this.terms.length )
            return this.terms[index].token;
        return null;
    }

    // auto tag an object, where the object must be: {token:'', tag:''}
    this.tag = function( obj ){
        return new speech2owl.NLP.Term( obj );
    }

    // returns the number of terms in sentence
    this.count = function(){
        return this.terms.length;
    }

}


// term is an object: {token:'', tag:''}
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
