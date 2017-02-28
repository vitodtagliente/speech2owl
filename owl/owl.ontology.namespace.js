
var OWL = OWL || {};
OWL.Ontology = OWL.Ontology || {};

OWL.Ontology.Namespace = function(){
    this.namespaces = [];

    this.add = function( namespace ){
        this.namespaces.push( namespace );
        return this;
    }

    this.base = function( namespace ){
        return this.add( namespace.base() );
    }

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
                header.push( '\txml:base = "' + n.URI + '"' );
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
