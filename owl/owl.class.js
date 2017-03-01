
var OWL = OWL || {};

OWL.Class = function( URI ){

    this.normalize = function( text ){
        if( text.charAt(0) != '#' )
            return '#' + text;
        return text;
    }

    this.URI = this.normalize( URI );
    this._subClassOf = [];
    this._labels = [];

    this.subClassOf = function( object ){

        if( typeof( object ) == 'string' ){
            object = new OWL.SubClass( object );
        }

        // TODO search
        this._subClassOf.push( object );
        return this;
    }

    this.label = function( language, text ){
        for( var i = 0; i < this._labels.length; i++ ){
            var l = this._labels[i];

            if( l.language == language ){
                l.label = text;
                return this;
            }
        }

        this._labels.push({
            language: language,
            label: text
        });
        return this;
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<owl:Class rdf:about="' + this.URI + '">' );

        for( var i = 0; i < this._subClassOf.length; i++ ){
            var s = this._subClassOf[i];

            xml.push( s.toString() );
        }

        for( var i = 0; i < this._labels.length; i++ ){
            var l = this._labels[i];

            xml.push( '\t<rdfs:label xml:lang="' + l.language + '">' + l.label + '</rdfs:label>' );
        }



        xml.push( '</owl:Class>' );

        return xml.join( "\n" );

    }
}
