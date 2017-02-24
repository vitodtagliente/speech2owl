
/*
    HOW TO:

    // Parse an RDF+XML file
    var linker = new Module.EntityLinker( inspector, ontology, debug [true|false] );
    // where:
    // - inspector is an instance of Module.NLP.Inspector
    // - ontology is an instance of Module.RDF

    // to link entities
    var links = linker.link( subject, predicate, object )
    
*/

var Module = Module || {};

Module.EntityLinker = function( inspector, ontology, debug ){
    this.inspector = inspector;
    this.ontology = ontology;
    this.debug = debug || false;

    this.ignoreVerbs = false;
    this.ignoreAdjectives = false;
    this.ignorePeople = false;
    this.ignorePlaces = false;

    this.link = function( subject, predicate, object ){
        var checked = [];
        var links = [];

        if( this.debug )
            console.log( 'EntityLinker::Tokens' );

        for( var i = 0; i < this.inspector.data().length; i++ ){
            var s = this.inspector.data()[i];

            for( var j = 0; j < s.terms().length; j++ ){
                var t = s.terms()[j];
                console.log(t);

                if( checked.contains( t.token ) ||
                    t.isVerb && this.ignoreVerbs ||
                    t.isAdjective && this.ignoreAdjectives ||
                    t.isPeople && this.ignorePeople ||
                    t.isPlace && this.ignorePlaces
                )
                    continue;
                checked.push( t.token );

                var best = this.ontology.any(subject, predicate, object).match( t.token ).best();
                if( best != null ){
                    links.push({
                        token: t.token,
                        triple: {
                            object: best.object,
                            subject: best.subject,
                            predicate: best.predicate
                        }
                    });
                }
            }

        }

        console.log( 'EntityLinker::Links' );
        console.log( links );

        return links;
    }
}
