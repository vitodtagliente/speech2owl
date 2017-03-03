
/*
    Simple Library for writing OWL/XML

    HOW TO:
    // Create a new OWL object
    var owl = new OWL();
    //
    ... add classes, individuals ....
    // build the output
    var ontology = owl.toString();
*/

var OWL = OWL || {};

OWL.Ontology = function(){

    this.namespace = new OWL.Ontology.Namespace();
    this.header = new OWL.Ontology.Header();
    this.classes = [];
    this.properties = [];
    this.individuals = [];

    /*
     * params: OWL.Class or String (URI)
     * returns [OWL.Class]
     * this method adds a class to the ontology
     * example:
     * owl.class( new OWL.Class( '#Generic' ) );
     * owl.class( '#Generic' );
    */
    this.class = function( object ){
        if( typeof( object ) == 'string' )
            object = new OWL.Class( object );

        for( var i = 0; i < this.classes.length; i++ ){
            var c = this.classes[i];

            if( c.URI == object.URI )
                return c;
        }

        this.classes.push( object );
        return object;
    }

    /*
     * params: OWL.Individual or String, String (IndividualURI, ClassURI)
     * returns [OWL.Individual]
     * this method adds an individual to the ontology
     * example:
     * owl.individual( new OWL.Individual( '#Generic1', '#Generic' ) );
     * owl.individual( '#Generic1', '#Generic' );
    */
    this.individual = function( object, classURI ){
        if( typeof( object ) == 'string' && classURI != null ){
            object = new OWL.Individual( object, classURI );
        }

        for( var i = 0; i < this.individuals.length; i++ ){
            var c = this.individuals[i];

            if( c.URI == object.URI )
                return c;
        }

        this.individuals.push( object );
        return object;
    }

    /*
     * params: OWL.Property
     * returns [OWL.Property]
     * this method adds a property to the ontology
     * example:
     * owl.property( new OWL.Property( ... ) );
    */
    this.property = function( object ){
        for( var i = 0; i < this.properties.length; i++ ){
            var p = this.properties[i];

            if( p.URI == object.URI )
                return p;
        }

        this.properties.push( object );
        return object;
    }

    // Generate the xml format
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

        for( var i = 0; i < this.individuals.length; i++ ){
            var c =  this.individuals[i];

            xml.push( '' );
            xml.push( c.toString() );
            xml.push( '' );
        }

        xml.push( '' );
        xml.push( this.namespace.close() );

        return xml.join("\n");
    }
}
