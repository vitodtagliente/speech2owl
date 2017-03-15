
/*

    HOW TO:
    // Create a namespace
    var RDFS = new OWL.Namespace( 'http://...' );
    // get the URI of a particular resource in the RDFS namespace
    RDFS.get( 'label' ) // -> http://..........#label
    //

    HOW TO add namespaces to the ontology:
    var owl = new OWL.Onotlogy();

    var RDFS = new OWL.Namespace( 'http://.........' );
    owl.namespace.add( RDFS );

*/

var OWL = OWL || {};

OWL.Namespace = function( name, URI ){
    this.name = name;
    this.URI = URI;
    this.isBase = false;

    // set this namespace as the base namespace for the ontology
    this.base = function(){
        this.isBase = true;
        return this;
    }

    this.get = function( resource ){
        return this.URI + resource;
    }
}

OWL.Namespace.default = {
    OWL: new OWL.Namespace( 'owl', 'http://www.w3.org/2002/07/owl#' ),
    //OWL11: new OWL.Namespace( 'owl11', 'http://www.w3.org/2006/12/owl11#' ),
    XSD: new OWL.Namespace( 'xsd', 'http://www.w3.org/2001/XMLSchema#' ),
    //OWL11XML: new OWL.Namespace( 'owl11xml', 'http://www.w3.org/2006/12/owl11-xml#' ),
    XML: new OWL.Namespace( 'xml', 'http://www.w3.org/XML/1998/namespace' ),
    RDFS: new OWL.Namespace( 'rdfs', 'http://www.w3.org/2000/01/rdf-schema#' ),
    RDF: new OWL.Namespace( 'rdf', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#' )
}
