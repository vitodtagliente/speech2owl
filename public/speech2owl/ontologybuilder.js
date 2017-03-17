
var speech2owl = speech2owl || {};
speech2owl.OntologyBuilder = speech2owl.OntologyBuilder || {};

speech2owl.OntologyBuilder = function( nlp, links, debug ){
    this.nlp = nlp;
    this.links = links || [];
    this.debug = debug || false;

    this.build = function(){
        if( this.debug )
            console.log( '------Ontology Builder------' );

        var owl = new OWL.Ontology();

        // ---------- Namespaces

        var SPEECH2OWL = new OWL.Namespace(
            'speech2owl',
            'http://www.speech2owl.org/ontologies/speech2owl/speech2owl#'
        );

        owl.namespace.default().add( SPEECH2OWL.base() );
        owl.header.about( SPEECH2OWL.get('') );

        // ---------- Classes

        owl.class('#DomainConcept');

        for( var i = 0; i < this.links.length; i++ ){
            var l = this.links[i];

            owl.class('#'+l.token+'Concept')
                .subClassOf('#DomainConcept')
                .equivalentClass(l.triple.subject);
        }

        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
