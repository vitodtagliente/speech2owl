
var OWL = OWL || {};

OWL.Class = function( URI ){

    this.normalize = function( text ){
        if( text.charAt(0) != '#' )
            return '#' + text;
        return text;
    }

    this.URI = this.normalize( URI );
    this.subClass = null;

    this.subClassOf = function( name ){
        this.subClass = this.normalize( name );
        return this;
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<owl:Class rdf:about="' + this.URI + '">' );
        if( this.subClass != null )
            xml.push( '\t<rdfs:subClassOf rdf:resource="' + this.subClass + '"/>' );
        xml.push( '</owl:Class>' );

        return xml.join( "\n" );

    }
}
