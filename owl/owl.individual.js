
var OWL = OWL || {};

OWL.Individual = function( URI, classURI ){

    this.normalize = function( text ){
        if( text.charAt(0) != '#' )
            return '#' + text;
        return text;
    }

    this.URI = this.normalize( URI );
    this.classURI = classURI;

    this.toString = function(){

        var xml = [];

        xml.push( '<owl:Thing rdf:about="' + this.URI + '">' );
        xml.push( '\t<rdf:type rdf:resource="' + this.classURI + '"/>' );
        xml.push( '</owl:Thing>' );

        return xml.join( "\n" );

    }
}
