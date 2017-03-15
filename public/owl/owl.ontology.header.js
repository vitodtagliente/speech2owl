
var OWL = OWL || {};
OWL.Ontology = OWL.Ontology || {};

OWL.Ontology.Header = function(){
    this._about = null;

    this.about = function( value ){
        this._about = value;
        return this;
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<owl:Ontology rdf:about="' + this._about + '">' );

        xml.push( '</owl:Ontology>' );

        return xml.join( "\n" );

    }
}
