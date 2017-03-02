
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

        // SpeechText
        owl.property(
            new OWL.Property('#containsSentence').domain('#SpeechText').range('#Sentence')
        );

        owl.property(
            new OWL.Property('#speechValue').datatype().domain('#SpeechText').range('string')
        );

        owl.class(
            new OWL.Class( '#SpeechText' )
        ).label( 'eng', 'This class represents the text given from Speech recognition');

        owl.individual( new OWL.Individual(
            '#GivenText',
            '#SpeechText'
        ) ).datatype( 'speechValue', 'string', this.inspector.sentences.join( '. ' ) );

        // Sentence
        owl.property(
            new OWL.Property('#containsToken').domain('#Sentence').range('#Token')
        )

        owl.property(
            new OWL.Property('#sentenceValue').datatype().domain('#Sentence').range('string')
        );

        owl.class(
            new OWL.Class( '#Sentence' )
        ).label( 'eng', 'Each SpeechText can contain multiple sentences' );

        var sentenceInspectors = this.inspector.data();
        var tokens = [];
        for( var i = 0; i < sentenceInspectors.length; i++ ){
            var s = sentenceInspectors[i];

            owl.individual( new OWL.Individual(
                '#Sentence' + (i+1),
                '#Sentence'
            ) ).datatype( 'sentenceValue', 'string', s.sourceText );

            for( var j = 0; j < s.tokens.length; j++ ){
                var t = s.tokens[j];

                if( tokens.contains( t ) == false )
                    tokens.push( t );
            }
        }

        // Token
        owl.property(
            new OWL.Property('#hasMatch').domain('#Token').range('#LinkedEntity')
        )

        owl.property(
            new OWL.Property('#tokenValue').datatype().domain('#Token').range('string')
        );

        owl.class(
            new OWL.Class( '#Token' )
        ).label( 'eng', 'Each sentence contains tokens' );

        for( var i = 0; i < tokens.length; i++ ){
            var t = tokens[i];

            owl.individual( new OWL.Individual(
                t + 'Token',
                '#Token'
            ) ).datatype( 'tokenValue', 'string', t );;
        }

        // LinkedEntity

        owl.class( new OWL.Class( '#LinkedEntity' ) );

        for( var i = 0; i < this.links.length; i++ ){
            var l = this.links[i];

            owl.class(
                new OWL.Class( l.token + 'Entity' )
            ).subClassOf( '#LinkedEntity' ).subClassOf( l.triple.subject );

            owl.individual(
                new OWL.Individual( l.token, '#LinkedEntity' )
            );
        }

        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
