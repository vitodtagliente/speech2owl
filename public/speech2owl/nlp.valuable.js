
speech2owl.NLP.SentenceInspector.prototype.valuableTokens = function(){

    var output = [];

    for( var i = 0; i < this.count(); i++ ){
        var term = this.term(i);

        // Se il termine corrente è un nome
        // cerca di raggrupparlo con possibili nomi successivi
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
        // Se il termine corrente è un verbo
        // cerca di raggrupparlo con possibili verbi successivi
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
        // Non ignorare gli aggettivi
        else if( term.isAdjective )
            output.push( term.token );

    }

    return output;

}
