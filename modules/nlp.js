
if( nlp === undefined )
    //var nlp = require( 'compromise' );
    var nlp = window.nlp;

var Module = Module || {};

Module.NLP = {};

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

    this.r = nlp( text );

    // Tokenize
    this.tokens = this.r.terms().out('array');

    // find verbs, adjectives, nouns, adverbs, conjunctions
    this.verbs = this.r.verbs().out('array');
    this.nouns = this.r.nouns().out('array');
    this.adjectives = this.r.adjectives().out('array');
    this.adverbs = this.r.adverbs().out('array');

    this.findConjunctions = function(){
        var result = [];
        for( var i = 0; i < this.tokens.length; i++ ){
            var t = this.tokens[i];
            if(
                this.nouns.contains( t ) == false &&
                this.adjectives.contains( t ) == false &&
                this.adverbs.contains( t ) == false &&
                this.verbs.contains( t ) == false
            )
            result.push( t );
        }
        return result;
    }
    this.conjunctions = this.findConjunctions();

    this.topics = this.r.topics().out('array');
    this.people = this.r.people().out('array');
    this.places = this.r.places().out('array');

    this.preprocess = function(){
        this.processed.text = this.sourceText;

        for( var i = 0; i < this.conjunctions.length; i++ ){
            var c  = this.conjunctions[i];
            this.processed.text = this.processed.text.replace(c, '');
        }

        for( var i = 0; i < this.adverbs.length; i++ ){
            var c  = this.adverbs[i];
            this.processed.text = this.processed.text.replace(c, '');
        }

        this.processed.text = this.processed.text.replace('  ', ' ' ).trim();

        this.processed.r = nlp(this.processed.text);
        this.processed.ngrams = this.processed.r.ngrams().out('array');
        this.processed.startGrams = this.processed.r.startGrams().out('array');
        this.processed.endGrams = this.processed.r.endGrams().out('array');

        this.processed.tokens = this.processed.r.terms().out('array');
        this.processed.terms = [];

        for( var i = 0; i < this.processed.tokens.length; i++ ){
            var t = this.processed.tokens[i];

            var term = {
                token: t,
                isVerb: this.verbs.contains( t ),
                isAdjective: this.adjectives.contains( t ),
                isNoun: this.nouns.contains( t ),
                isPeople: this.people.contains( t ),
                isPlace: this.places.contains( t ),
                isTopic: this.topics.contains( t )
            };

            this.processed.terms.push( term );
        }
    }

    this.terms = function(){
        return this.processed.terms;
    }

    this.processed = {};
    this.preprocess();

    this.triples = [];

    this.process = function(){
        if( this.processed.startGrams[0] == this.processed.endGrams[0] ){
            // Probabilmente soggetto-predicato-oggetto

        }
        else
        {

        }
    }

    this.triples = this.process();
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
