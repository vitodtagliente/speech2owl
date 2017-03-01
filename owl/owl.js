
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

    this.class = function( object ){
        for( var i = 0; i < this.classes.length; i++ ){
            var c = this.classes[i];

            if( c.URI == object.URI )
                return c;
        }

        this.classes.push( object );
        return object;
    }

    this.property = function( object ){
        for( var i = 0; i < this.properties.length; i++ ){
            var p = this.properties[i];

            if( p.URI == object.URI )
                return p;
        }

        this.properties.push( object );
        return object;
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<?xml version="1.0"?>' );
        xml.push( '' );

        xml.push( this.namespace.open() );
        xml.push( '' );
        xml.push( this.header.toString() );
        xml.push( '' );

        for( var i = 0; i < this.properties.length; i++ ){
            var p = this.properties[i];

            xml.push( '' );
            xml.push( p.toString() );
            xml.push( '' );
        }

        for( var i = 0; i < this.classes.length; i++ ){
            var c = this.classes[i];

            xml.push( '' );
            xml.push( c.toString() );
            xml.push( '' );
        }

        xml.push( '' );
        xml.push( this.namespace.close() );

        return xml.join("\n");
    }
}
