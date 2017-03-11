
speech2owl.NLP.SentenceInspector.prototype.relations = function(){

    var output = [];

    if( this.pronouns.length > 0 || this.whdeterminers > 0 ){
        // Replace all the pronouns and the which/that determiners
        for( var i = 0; i < this.terms.length; i++ ){
            var term = this.terms[i];
            var token = term.token;

            if( i > 0 && ( this.isPronoun(token) || this.isWhDeterminer(token) ) ){
                if( this.isnoun(this.terms[i-1]) ){

                }
            }
        }
    }

    return output;

}
