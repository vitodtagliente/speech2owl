
var OWL = OWL || {};

OWL.Restriction = function(){

    this._restrictionType = 'subClassOf';

    this._onProperty = null;
    this._someValuesFrom = null;
    this._allValuesFrom = null;
    this._cardinality = null;
    this._hasValue = null;
    this._custom = null;

    // Restriction typeof

    this.subClassOf = function(){
        this._restrictionType = 'subClassOf';
        return this
    }

    this.equivalentClass = function(){
        this._restrictionType = 'equivalentClass';
        return this;
    }

    // Restriction params

    this.onProperty = function( value ){
        this._onProperty = value;
        return this;
    }

    this.someValuesFrom = function( value ){
        this._someValuedFrom = value;
        return this;
    }

    this.allValuesFrom = function( value ){
        this._allValuesFrom = value;
        return this;
    }

    this.cardinality = function( value ){
        this._cardinality = value;
        return this;
    }

    this.hasValue = function( value ){
        this._hasValue = value;
        return this;
    }

    this.custom = function( value ){
        this._custom = value;
        return this;
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<owl:' + this._restrictionType + '>' );

        xml.push( '\t<owl:Restriction>' );

        xml.push( '\t\t<owl:onProperty rdf:resource="' + this._onProperty + '"/>' );

        if( this._someValuesFrom != null ){
            xml.push( '\t\t<owl:someValuesFrom rdf:resource="' + this._someValuesFrom + '"/>' );
        }
        else if( this._allValuesFrom != null ){
            xml.push( '\t\t<owl:allValuesFrom rdf:resource="' + this._allValuesFrom + '"/>' );
        }
        else if( this._cardinality != null ){
            xml.push( '\t\t<owl:cardinality rdf:datatype="&xsd;nonNegativeInteger">' + this._cardinality + '"</owl:cardinality>' );
        }
        else if( this._hasValue != null ){
            xml.push( '\t\t<owl:hasValue rdf:resource="' + this._hasValue + '"/>' );
        }
        else if( this._custom != null ){
            xml.push( '\t\t' + this._custom );
        }

        xml.push( '\t</owl:Restriction>' );

        xml.push( '</owl:' + this._restrictionType + '>' );

        return xml.join("\n");

    }
}
