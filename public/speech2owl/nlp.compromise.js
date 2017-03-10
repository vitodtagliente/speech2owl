
if( nlp === undefined )
    //var nlp = require( 'compromise' );
    var nlp = window.nlp;

var Module = Module || {};

Module.NLP = {};

Module.NLP.pronouns = [
    'I', 'you', 'he', 'she', 'it', 'we', 'they'
];

Module.NLP.Inspector = function( text ){

    this.sentences = nlp(text).sentences().out('array');

    this.output = [];

    for( var i = 0; i < this.sentences.length; i++ ){
        var sentence = this.sentences[i];
        var processed = new Module.NLP.SentenceInspector( sentence );
        this.output.push( processed );
    }

    this.data = function(){
        return this.output;
    }

}

Module.NLP.SentenceInspector = function( text ){
    this.sourceText = text;

    var r = nlp( text );

    // Tokenize
    this.tokens = r.terms().out('array');

    // find verbs, adjectives, nouns, adverbs, conjunctions
    this.verbs = r.verbs().out('array');
    this.nouns = r.nouns().out('array');
    this.adjectives = r.adjectives().out('array');
    this.adverbs = r.adverbs().out('array');
    this.topics = r.topics().out('array');
    this.people = r.people().out('array');
    this.places = r.places().out('array');

    this.terms = function(){
        var v = [];
        for( var i = 0; i < this.tokens.length; i++ ){
            var t = this.tokens[i];

            v.push({
                token: t,
                isVerb: this.verbs.contains( t ),
                isAdjective: this.adjectives.contains( t ),
                isNoun: this.nouns.contains( t ),
                isPeople: this.people.contains( t ),
                isPlace: this.places.contains( t ),
                isTopic: this.topics.contains( t )
            });
        }

        return v;
    }

    this.valuableTokens = function(){

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
