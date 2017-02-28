
/*
    Simple Library for writing OWL/XML

    HOW TO:
    // Create a new OWL object
    var owl = new OWL();


*/

var OWL = OWL || {};

OWL.Ontology = function(){

    this.namespace = new OWL.Ontology.Namespace();
    this.header = new OWL.Ontology.Header();
    this.classes = [];
    this.properties = [];

    this.toString = function(){

        var xml = [];

        xml.push( '<?xml version="1.0"?>' );
        xml.push( '' );

        xml.push( this.namespace.open() );
        xml.push( '' );
        xml.push( this.header.toString() );
        xml.push( '' );

        xml.push( '' );
        xml.push( this.namespace.close() );

        return xml.join("\n");
    }
}
