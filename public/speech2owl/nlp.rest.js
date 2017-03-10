
var speech2owl = speech2owl || {};

speech2owl.NLP = function( text, response, log ){
    this.text = text;
    this.log = log || false;

    this.terms = response.terms || [];
    this.glossary = response.glossary || [];

    this.ignoreNouns = false;
    this.ignoreVerbs = false;
    this.ignoreAgjectives = false;
    this.ignoreAdverbs = false;
    this.ignorePronouns = false;
    this.ignoreConjuctions = false;
    this.ignoreDet = false;
    this.ignorePrt = false;

    this.tokens = function(){
        var tok = [];
        for( var i = 0; i < this.terms.length; i++ ){
            var t = this.terms[i];

            tok.push( t.token );
        }
        return tok;
    }

    this.valuableTokens = function(){
        var toks = [];
        for( var i = 0; i < this.glossary.length; i++ ){
            var g = this.glossary[i];

            if(
                g.isVerb && this.ignoreVerbs ||
                g.isNoun && this.ignoreNouns ||
                g.isAdv && this.ignoreAdverbs ||
                g.tag == '.' ||
                g.isConj && this.ignoreConjuctions ||
                g.isPron && this.ignorePronouns ||
                g.isAdj && this.ignoreAgjectives ||
                g.isDet && this.ignoreDet ||
                g.isPrt && this.ignorePrt
            )
            continue;

            if( g.isNoun && g.termMap != undefined ){
                var v = [];

                v.push( g.term );
                for( var j = 0; j < g.termMap.length; j++ ){
                    var c = g.termMap[j];

                    v.push( c );
                }

                toks.push( v );
            }
            else toks.push( g.term );
        }

        return toks;
    }

    this.relationships = function(){

    }
}
