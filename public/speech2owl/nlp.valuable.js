
speech2owl.NLP.SentenceInspector.prototype.valuableTokens = function(){

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
