
/*
    This function returns valuable tokens
    that could be used for entity annotation
    insted of processing the simple tokens attribute

    This algorithm match as 'valuable' only tokens that are nouns, verbs or
    adjectives. More over, it try to merge terms togheter for better matching
    results.

    For example in a sentence: 'John likes eating pizza Margherita'
    the output will be:
    [
        'John',
        ['likes eating', 'likes', 'eating'],
        ['pizza Margherita', 'pizza', 'Margherita']

    ]

    instead of a simple Tokenizer: ['John', 'likes', 'eating', 'pizza', 'Margherita']

*/
speech2owl.NLP.SentenceInspector.prototype.valuableTokens = function(){

    var output = [];

    for( var i = 0; i < this.count(); i++ ){
        var term = this.term(i);

        // if the current term is a noun
        // try to merge it with some next nouns
        if( term.isNoun ){
            var element = term.token;

            if( i + 1 < this.count() ){
                if( this.term(i+1).isNoun ){
                    element = [
                        term.token + ' ' + this.token(i+1),
                        term.token,
                        this.token(i+1)
                    ];
                    i++;
                }
                else if( this.term(i+1).isConjuction && i + 2 < this.count() && this.term(i+2).isNoun ){
                    element = [
                        term.token + ' ' + this.token(i+1) + ' ' + this.token(i+2),
                        term.token,
                        this.token(i+2)
                    ];
                    i+=2;
                }
            }

            output.push( element );
        }
        // if the current term is a verb
        // try to merge it with next verbs
        else if( term.isVerb ){
            var element = term.token;

            if( element.includes('ing') )
                output.push( element );
            else if( i + 1 < this.count() && this.term(i+1).isVerb && this.token(i+1).includes('ing') ){
                output.push( [
                    element + ' ' + this.token(i+1),
                    element,
                    this.token(i+1)
                ]);
                i++;
            }

        }
        // don't ignore adjectives
        else if( term.isAdjective )
            output.push( term.token );

    }

    return output;

}
