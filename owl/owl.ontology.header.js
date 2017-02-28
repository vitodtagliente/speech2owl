
var OWL = OWL || {};
OWL.Ontology = OWL.Ontology || {};

OWL.Ontology.Header = function(){


    this.toString = function(){

        var xml = [];

        xml.push( '<owl:Ontology rdf:about="">' );

        xml.push( '</owl:Ontology>' );

        return xml.join( "\n" );

    }
}
