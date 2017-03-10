
/*
    HOW TO access to this object in the ontology:
    var owl = new OWL.Ontology();
    -> owl.namespace

    HOW TO add default namespace to the ontology:
    owl.namespace.default();

*/

var OWL = OWL || {};
OWL.Ontology = OWL.Ontology || {};

OWL.Ontology.Namespace = function(){
    this.namespaces = [];

    /*
     * params: OWL.Namespace
     * returns [OWL.Ontology.Namespace]
     * this method adds a namespace to the ontology
     * example:
     * owl.namespace.add( new OWL.Namespace( 'http://..........' ) );
    */
    this.add = function( namespace ){
        this.namespaces.push( namespace );
        return this;
    }

    /*
     * params: OWL.Namespace
     * returns [OWL.Ontology.Namespace]
     * Add a namespace and set it as a base namespace for the ontology
     * example:
     * owl.namespace.base( new OWL.Namespace( 'http://..........' ) );
    */
    this.base = function( namespace ){
        return this.add( namespace.base() );
    }

    // Load default namespaces for the current ontology
    this.default = function(){
        for( var namespace in OWL.Namespace.default ){
            this.add( OWL.Namespace.default[namespace] );
        }
        return this;
    }

    this.open = function(){

        var xml = [];
        var header = [];

        xml.push( '<!DOCTYPE rdf:RDF [' );

        for(var i = 0; i < this.namespaces.length; i++ ){
            var n = this.namespaces[i];

            xml.push( '\t<!ENTITY ' + n.name + ' "' +  n.URI + '" >' );

            header.push( '\txmlns:' + n.name + ' = "' + n.URI + '"' );

            if( n.isBase ) {
                header.push( '\txmlns = "' + n.URI + '"' );
                header.push( '\txml:base = "' + n.URI.replace('#', '') + '"' );
            }
        }

        xml.push( ']>' );
        xml.push( '' );
        xml.push( '<rdf:RDF ' );
        xml.push( header.join("\n") + ' >' );

        return xml.join("\n");

    }

    this.close = function(){
        return '</rdf:RDF>';
    }
}
