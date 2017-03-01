
var OWL = OWL || {};

OWL.SubClass = function( URI ){
    this.URI = URI;
    this._restriction = null;

    this.restriction = function( object ){
        this._restriction = object;
        return this;
    }

    this.toString = function(){

        var xml = [];

        if( this._restriction == null )
            xml.push( '\t<rdfs:subClassOf rdf:resource="' + this.URI + '"/>' );
        else {
            xml.push( '\t\t<owl:Restriction>' );

            xml.push( this.restriction.toString() );

            xml.push( '\t\t</owl:Restriction>' );
        }

        return xml.join( "\n" );
    }
}
