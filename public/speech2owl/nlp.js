
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

    // find verbs, adjectives, nouns, adverbs, conjunctions
    this.verbs = [];
    this.nouns = [];
    this.adjectives = [];
    this.adverbs = [];
    this.pronouns = [];
    this.conjuctions = [];
    this.articles = [];
    this.other = [];

    // Constructor

    for( var i = 0; i < response.terms.length; i++ ){
        var term = response.terms[i];

        this.tokens.push( term.token );

        if( term.tag == 'VERB' )
            this.verbs.push( term.token );
        else if( term.tag == 'NOUN' )
            this.nouns.push( term.token );
        else if( term.tag == 'ADJ' )
            this.adjectives.push( term.token );
        else if( term.tag == 'ADV' )
            this.adverbs.push( term.token );
        else if( term.tag == 'CONJ' )
            this.conjuctions.push( term.token );
        else if( term.tag == 'PRON' )
            this.pronouns.push( term.token );
        else if( term.tag == 'DET' )
            this.articles.push( term.token );
        else this.other.push( term.token );

    }

    // Constructor

    this.isNoun = function( word ){
        return this.nouns.contains( word );
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

    this.valuableTokens = function(){
        var data = this.tokens;
        var toks = [];

        for( var i = 0; i < data.length; i++ ){
            var token = data[i];

            if( this.isNoun(token) ){
                var element = token;

                if( i + 1 < data.length ){
                    if( this.isNoun(data[i+1]) ){
                        element = [
                            token + ' ' + data[i+1],
                            token,
                            data[i+1]
                        ];
                        i++;
                    }
                    else if( this.isConjuction(data[i+1]) && i + 2 < data.length && this.isNoun(data[i+2]) ){
                        element = [
                            token + ' ' + data[i+1] + ' ' + data[i+2],
                            token,
                            data[i+2]
                        ];
                        i+=2;
                    }
                }

                toks.push( element );
            }
            else if( this.isVerb(token) ){
                var element = token;

                if( element.includes('ing') )
                    toks.push( element );
                else if( i + 1 < data.length && this.isVerb(data[i+1]) && data[i+1].includes('ing') ){
                    toks.push( [
                        element + ' ' + data[i+1],
                        element,
                        data[i+1] 
                    ]);
                    i++;
                }

            }
            else if( this.isAdjective(token) )
                toks.push( token );

        }

        return toks;
    }

    this.relations = function(){

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
