
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
    this._restriction = [];
    this._equivalentClass = null;
    this._disjointWith = [];

    this.subClassOf = function( object ){
        for( var i = 0; i < this._subClassOf.length; i++ ){
            var c = this._subClassOf[i];

            if( c == object )
                return this;
        }
        this._subClassOf.push( object );
        return this;
    }

    this.restriction = function( object ){
        this._restriction.push( object );
        return this;
    }

    this.equivalent = function( value ){
        this._equivalentClass = value;
        return this;
    }

    this.disjointWith = function( value ){
        this._disjointWith.push( value );
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

            xml.push( '\t<rdfs:subClassOf rdf:resource="' + s + '"/>' );
        }

        for( var i = 0; i < this._restriction.length; i++ ){
            var r = this._restriction[i];

            xml.push( r.toString() );
        }

        for( var i = 0; i < this._disjointWith.length; i++ ){
            var d = this._disjointWith[i];

            xml.push( '\t<owl:disjointWith rdf:resource="' + d + '" />' );
        }

        for( var i = 0; i < this._labels.length; i++ ){
            var l = this._labels[i];

            xml.push( '\t<rdfs:label xml:lang="' + l.language + '">' + l.label + '</rdfs:label>' );
        }

        xml.push( '</owl:Class>' );

        return xml.join( "\n" );

    }
}
