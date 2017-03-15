
var speech2owl = speech2owl || {};
speech2owl.OntologyBuilder = speech2owl.OntologyBuilder || {};

speech2owl.OntologyBuilder.Full = function( nlp, links, debug ){
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

        // ---------- Object Properties

        owl.property('#containsToken')
            .inverseOf('#isContainedInSentence')
            .functional()
            .domain('#Sentence').range('#Token');

        owl.property('#isContainedInSentence').domain('#Token').range('#Sentence');

        owl.property('#joins')
            .domain('#KnowledgeRelation').range('#KnowledgeElement')
            .functional().transitive()

        // ---------- Data properties

        owl.property('#hasSentenceValue')
            .datatype()
            .domain('#Sentence').range('string');

        // ---------- Classes

        owl.class('#DomainConcept');

        owl.class('#Knowledge').subClassOf('#DomainConcept');

        owl.class('#KnowledgeRelation').subClassOf('#Knowledge');
        owl.class('#KnowledgeElement').subClassOf('#Knowledge');

        owl.class('#Sentence').subClassOf('#DomainConcept')
            .restriction(
                new OWL.Restriction().onProperty('#containsToken').someValuesFrom('#Token')
            );

        owl.class('#Token').subClassOf('#DomainConcept');

        owl.class('#Noun').subClassOf('#Token');
        owl.class('#Verb').subClassOf('#Token');

        // ---------- Populate the ontology

        for( var i = 0; i < this.nlp.data().length; i++ ){
            var tree = this.nlp.data()[i].relations();


        }


        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
