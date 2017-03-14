
/*
    HOW TO:

    // Parse an RDF+XML file
    var linker = new speech2owl.EntityLinker( inspector, ontology, debug [true|false] );
    // where:
    // - inspector is an instance of Module.NLP.Inspector
    // - ontology is an instance of Module.RDF

    // to link entities
    var links = linker.link( subject, predicate, object )

*/

var speech2owl = speech2owl || {};

speech2owl.EntityLinker = function( inspector, ontology, log ){
    this.inspector = inspector;
    this.ontology = ontology;
    this.log = log || false;

    this.link = function( subject, predicate, object, confidence ){
        var links = [];
        var checked = [];

        if( this.log ){
            console.log( '################## EntityLinker ##################');
        }

        var sentences = this.inspector.data();
        for( var i = 0; i < sentences.length; i++ ){
            var s = sentences[i];

            var tokens = s.valuableTokens();
            if( this.log ){
                console.log( "#EntityLinker::ValuableTokens" );
                console.log( tokens );
            }
            for( var j = 0; j < tokens.length; j++ ){
                var token = tokens[j];

                if( this.log )
                    console.log(token);

                if( typeof( token ) == 'string' ){
                    if( checked.contains( token ) )
                        continue;
                    checked.push( token );

                    var best = this.ontology.any(subject, predicate, object).match( token, confidence ).best();
                    if( best != null ){
                        links.push({
                            token: token,
                            triple: {
                                subject: best.subject,
                                predicate: best.predicate,
                                object: best.object,
                            }
                        });
                    }

                }
                else {

                    var temp = [];

                    for( var z = 0; z < token.length; z++ ){
                        var element = token[z];

                        if( checked.contains( element ) )
                            continue;
                        checked.push( element );

                        var best = this.ontology.any(subject, predicate, object).match( element, confidence ).best();
                        if( best != null ){
                            temp.push({
                                token: element,
                                distance: best.distance,
                                triple: {
                                    subject: best.subject,
                                    predicate: best.predicate,
                                    object: best.object,
                                }
                            });
                        }
                    }

                    if( temp.length > 0 ){
                        var first = temp[0];

                        for( var z = 1; z < temp.length; z++ )
                            if( first.distance < temp[z].distance )
                                temp[0] = null;

                        if( temp[0] == null ){
                            for( var z = 1; z < temp.length; z++ )
                                links.push({
                                    token: temp[z].token,
                                    triple: temp[z].triple
                                });
                        }
                        else links.push({
                            token: first.token,
                            triple: first.triple
                        });
                    }

                }
            }

        }

        if( this.log ){
            console.log( 'EntityLinker::Links' );
            console.log( links );
            console.log( '##################################################');
        }

        return links;
    }
}
