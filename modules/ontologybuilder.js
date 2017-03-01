
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
        // Define classes
        owl.class( new OWL.Class( '#SpeechText' ) );
        owl.class( new OWL.Class( '#Sentence' ) );
        owl.class( new OWL.Class( '#Token' ) );

        for( var i = 0; i < this.links.length; i++ ){
            var l = this.links[i];

            owl.individual( new OWL.Individual( l.token, '#Token' ) );
        }

        var output = owl.toString();

        if( this.debug )
            console.log( output );

        return output;
    }
}
