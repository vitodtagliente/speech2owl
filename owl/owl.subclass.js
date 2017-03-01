
var OWL = OWL || {};

OWL.SubClass = function( URI ){
    this.URI = URI;

    this.toString = function(){

        var xml = [];

        xml.push( '\t<rdfs:subClassOf rdf:resource="' + this.URI + '"/>' );

        return xml.join( "\n" );
    }
}
