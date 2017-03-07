
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

        owl.class( '#SpeechText' ).label( 'eng', 'This class represents the text given from Speech recognition' );

        owl.individual(
            '#GivenText', '#SpeechText'
        ).datatype( 'speechValue', 'string', this.inspector.sentences.join( '. ' ) );

        // Sentence
        owl.property(
            new OWL.Property('#containsToken').domain('#Sentence').range('#Token')
        )

        owl.property(
            new OWL.Property('#sentenceValue').datatype().domain('#Sentence').range('string')
        );

        owl.class( '#Sentence' ).label( 'eng',
        'Each SpeechText can contain multiple sentences' ).disjointWith('#SpeechText');

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

        // Token
        owl.property(
            new OWL.Property('#hasMatch').domain('#Token').range('#LinkedEntity')
        )

        owl.property(
            new OWL.Property('#tokenValue').datatype().domain('#Token').range('string')
        );

        owl.class( '#Token' ).label( 'eng', 'Each sentence contains tokens' );

        for( var i = 0; i < tokens.length; i++ ){
            var t = tokens[i];

            owl.individual(
                t + 'Token',
                '#Token'
            ).datatype( 'tokenValue', 'string', t );;
        }

        // LinkedEntity

        owl.class( '#LinkedEntity' );

        for( var i = 0; i < this.links.length; i++ ){
            var l = this.links[i];

            owl.class(
                new OWL.Class( l.token + 'Entity' )
            ).subClassOf( '#LinkedEntity' ).subClassOf( l.triple.subject );

            owl.individual( l.token, '#LinkedEntity' );

            owl.individual( l.token + 'Entity1', '#' + l.token + 'Entity' );
        }

        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
