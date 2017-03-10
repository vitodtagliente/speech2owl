
var Module = Module || {};

Module.OntologyBuilder = function( inspector, links, debug ){
    this.inspector = inspector;
    this.links = links || [];
    this.debug = debug || false;

    this.build = function(){
        if( this.debug )
            console.log( '------Ontology Builder------' );

        var owl = new OWL.Ontology();
        // Define namespaces
        var SPEECH = new OWL.Namespace( 'speech', 'http://www.example.org/speech#' );
        // Define ontology's Namespace
        owl.namespace.default().add( SPEECH.base() );

        // Speech
        owl.property(
            new OWL.Property('#make').domain('#Sentence').range('#Speech').inverseOf('#isMadeOf')
        );

        owl.property(
            new OWL.Property('#isMadeOf').domain('#Speech').range('#Sentence').inverseOf('#make')
        );

        owl.property(
            new OWL.Property('#speechValue').datatype().domain('#Speech').range('string')
        );

        owl.class( '#Speech' ).label( 'eng', 'This class represents the text given from Speech recognition' )

        owl.individual(
            '#GivenText', '#Speech'
        ).datatype( 'speechValue', 'string', this.inspector.sentences.join( '. ' ) );

        // Sentence
        owl.property(
            new OWL.Property('#containsWord').domain('#Sentence').range('#Word').inverseOf('#isContainedIn')
        )

        owl.property(
            new OWL.Property('#isContainedIn').domain('#Word').range('#Sentence').inverseOf('#containsWord')
        );

        owl.property(
            new OWL.Property('#sentenceValue').datatype().domain('#Sentence').range('string')
        );

        owl.class( '#Sentence' ).label( 'eng',
        'Each SpeechText can contain multiple sentences' ).disjointWith('#Speech');

        /*
        var sentenceInspectors = this.inspector.data();
        var tokens = [];
        for( var i = 0; i < sentenceInspectors.length; i++ ){
            var s = sentenceInspectors[i];

            owl.individual(
                '#Sentence' + (i+1),
                '#Sentence'
            ).datatype( 'sentenceValue', 'string', s.sourceText );

            for( var j = 0; j < s.tokens.length; j++ ){
                var t = s.tokens[j];

                if( tokens.contains( t ) == false )
                    tokens.push( t );
            }
        }
        */

        // Word
        owl.property(
                new OWL.Property('#wordValue').datatype().domain('#Word').range('string')
        );

        owl.class('#Word');

        // Token
        owl.class('#Token').subClassOf('#Word');

        // Matched
        owl.class('#MatchedToken').subClassOf('#Token').disjointWith('#UnMatchedToken');
        owl.class('#UnMatchedToken').subClassOf('#Token').disjointWith('#MatchedToken');

        owl.property(
                new OWL.Property('#linksTo').domain('#MatchedToken').range(PIZZA.get(''))
        );

        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
