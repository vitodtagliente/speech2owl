
var OWL = OWL || {};

OWL.Property = function( URI ){

    this.normalize = function( text ){
        if( text.charAt(0) != '#' )
            return '#' + text;
        return text;
    }

    this.URI = this.normalize( URI );
    this._subPropertyOf = null;
    this._comments = [];
    this._domain = null;
    this._range = null;
    this._type = [];
    this._inverseOf = null;
    this._isDatatype = false;

    this.subPropertyOf = function( name ){
        this._subPropertyOf = this.normalize( name );
        return this;
    }

    this.comment = function( language, text ){
        for( var i = 0; i < this._comments.length; i++ ){
            var c = this._comments[i];

            if( c.language == language ){
                c.text = text;
                return this;
            }
        }

        this._comments.push({
            language: language,
            text: text
        });
        return this;
    }

    this.type = function( value ){
        if( this._type.contains( value ) == false )
            this._type.push( value );
        return this;
    }

    this.transitive = function(){
        this.type('&owl;TransitiveProperty');
        return this;
    }

    this.symmetric = function(){
        this.type('&owl;SymmetricProperty');
        return this;
    }

    this.functional = function(){
        this.type('&owl;FunctionalProperty');
        return this;
    }

    this.inverseFunctional = function(){
        this.type('&owl;InverseFunctionalProperty');
        return this;
    }

    this.domain = function( value ){
        this._domain = value;
        return this;
    }

    this.range = function( value ){
        this._range = value;
        return this;
    }

    this.inverseOf = function( value ){
        this._inverseOf = value;
        return this;
    }

    this.datatype = function(){
        this._isDatatype = true;
        return this;
    }

    this.toString = function(){

        var xml = [];

        if( this._isDatatype )
            xml.push( '<owl:DatatypeProperty rdf:about="' + this.URI + '">' );
        else xml.push( '<owl:ObjectProperty rdf:about="' + this.URI + '">' );

        for( var i = 0; i < this._type.length; i++ ){
            var t = this._type[i];

            xml.push( '\t<rdf:type rdf:resource="' + t + '"/>' );
        }

        if( this._subPropertyOf != null )
            xml.push( '\t<rdfs:subPropertyOf rdf:resource="' + this._subPropertyOf + '"/>' );

        for( var i = 0; i < this._comments.length; i++ ){
            var c = this._comments[i];

            xml.push( '\t<rdfs:comment xml:lang="' + l.language + '">' + l.text + '</rdfs:comment>' );
        }

        if( this._domain != null )
            xml.push( '\t<rdfs:domain rdf:resource="' + this._domain + '"/>' );

        if( this._range != null ){
            var value = this._range;
            if( this._isDatatype )
                value = '&xsd;' + this._range;

            xml.push( '\t<rdfs:range rdf:resource="' + value + '"/>' );
        }

        if( this._inverseOf != null )
            xml.push( '\t<owl:inverseOf rdf:resource="' + this._inverseOf + '"/>' );

        if( this._isDatatype )
            xml.push( '</owl:DatatypeProperty>' );
        else xml.push( '</owl:ObjectProperty>' );

        return xml.join( "\n" );

    }
}
