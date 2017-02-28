
/*
    Simple Library for writing OWL/XML

    HOW TO:
    // Create a new OWL object
    var owl = new OWL();


*/


var OWL = function(){
    this.namespaces = [];
    this.classes = [];
    this.properties = [];

    this.buildDoctype = function(){
        var output = [];

        

        return output.join( "\n" );
    }

    this.toString = function(){

        var xml = [];

        xml.push( '<?xml version="1.0"?>' );
        xml.push( '' );

        xml.push( this.buildDoctype() );

        return xml.join("\n");
    }
}

OWL.Namespace = function( name, URI, isBase ){
    this.name = name;
    this.URI = URI;
    this.isBase = isBase || false;
}

OWL.Class = function( name ){


    this.toString = function(){

    }
}

OWL.Property = function( name ){


    this.toString = function(){

    }
}
