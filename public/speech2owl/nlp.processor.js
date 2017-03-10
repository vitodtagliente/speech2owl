
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

    this.tokens = function(){

    }

    this.relationships = function(){
        
    }
}
