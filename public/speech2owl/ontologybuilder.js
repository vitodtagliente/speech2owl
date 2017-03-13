
var Module = Module || {};

Module.OntologyBuilder = function( nlp, links, debug ){
    this.nlp = nlp;
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


        /*
        owl.property(
            new OWL.Property('#isContainedIn').domain('#Sentence').range('#Speech').inverseOf('#containsSentence')
        );

        owl.property(
            new OWL.Property('#containsSentence').domain('#Speech').range('#Sentence').inverseOf('#isContainedIn')
        );

        owl.property(
            new OWL.Property('#speechValue').datatype().domain('#Speech').range('string')
        );

        owl.property(
            new OWL.Property('#sentenceValue').datatype().domain('#Sentence').range('string');
        );

        owl.class( '#Speech' ).label( 'eng', 'This class represents the text given from Speech recognition' )
        owl.class( '#Sentence' );

        for( var i = 0; i < this.nlp.data().length; i++ ){
            var sentence = this.nlp.data()[i];


        }

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

        */

        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
