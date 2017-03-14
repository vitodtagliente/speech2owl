/*
    HOW TO:

    // Parse an RDF+XML file
    var rdf = new Module.RDF( 'filename', debug [true|false] );
    // debug enables/disables the console logs

    // find specified triples
    var any = rdf.any( subject, predicate, object );
    // get triples data
    any.data();
    // match a word with founded triples
    var matches = any.match( word );
    // get match data
    matches.data();
    // get the best match
    matches.best();
*/

var Module = Module || {};

Module.RDF = function( filename, debug ){
    this.rdf = new RDF();
    this.debug = debug || false;

    Module.RDF.singleton = this;

    // Initialization
    // parsing the file
    this.rdf.getRDFURL( filename, function(){
        var context = Module.RDF.singleton;

        if( context.debug )
            console.log( 'RDF::Loaded' );

        context.onload();
    });

    this.onload = function(){}

    /*
    FROM: Simple javascript RDF Parser and query thingy
    function Match(triples,subject,predicate,object)
        Return's an array of triples that match the subject/predicate/object pattern.
        triples is an array of triples to search, or null to use all of them.
        subject is the subject to look for.
        predicate is the predicate to look for.
        object is the object to look for (generally useless, but if you do have a value, it will return "" if it does not exist.)
    */

    this.any = function( subject, predicate, object ){
        var matched = [];

        var results = this.rdf.Match( null, subject, predicate, object );

        if( this.debug ){
            console.log( "RDF::Any Search result" );
            console.log( results );
        }

        return new Module.RDF.Any( results, this.debug );
    }
}

Module.RDF.singleton = null;

Module.RDF.Any = function( results, debug ){
    this.debug = debug || false;
    this.context = results;

    this.data = function(){
        return this.context;
    }

    this.match = function( match, confidence, field ){
        var matched = [];
        confidence = confidence || 0.8;
        field = field || 'object';

        for( var i = 0; i < this.context.length; i++ ){
            var r = this.context[i];

            var distance = jaro_winkler.distance( match, r[field] );
            if( distance >= confidence ){
                r.distance = distance;
                matched.push( r );
            }
        }

        if( this.debug ){
            console.log( "RDF::Matching '" + match + "'" );
            console.log( matched );
        }

        return new Module.RDF.Match( matched, this.debug );
    }
}

Module.RDF.Match = function( matches, debug ){
    this.debug = debug || false;
    this.context = matches;

    this.data = function(){
        return this.context;
    }

    this.best = function(){
        var best = this.context[0];

        for( var i = 1; i < this.context.length; i++ ){
            var m = this.context[i];

            if( m.distance > best.distance )
                best = m;
        }

        if( best === undefined )
            best = null;

        if( this.debug ){
            console.log( "RDF::Best Match" );
            console.log( best );
        }

        return best;
    }
}

Module.RDF.Namespace = function( uri ){
    this.uri = uri;

    this.get = function( text ){
        return this.uri + text;
    }
}
