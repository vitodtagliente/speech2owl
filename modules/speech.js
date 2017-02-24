
var Module = Module || {};

Module.Speech = function( id_textarea, id_button, debug ){

    if ( 'webkitSpeechRecognition' in window ) {
        console.log("webkitSpeechRecognition is available");
    }
    else return;

    this.debug = debug || false;

    this.textarea = document.getElementById( id_textarea );
    this.button = document.getElementById( id_button );

    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'eng';
    this.recognition.continuous = false;

    // sta ascoltando???
    this.recognizing = false;

    Module.Speech.singleton = this;

    this.lang = function(arg) {
        if( arg != null )
            this.recognition.lang = arg;
        else return this.recognition.lang;
    }

    // bind events
    this.recognition.onresult = function (event) {
        var instance = Module.Speech.singleton;

        if( instance.debug )
            console.log( "Speech::onresult" );

        for (var i = event.resultIndex; i < event.results.length; ++i) {
            var text = event.results[i][0].transcript;
            if (event.results[i].isFinal) {

                if( instance.textarea != null )
                    instance.textarea.value = ( text );
                if( instance.debug )
                    console.log( text );

            }
        }
    };

    this.recognition.onstart = function(){
        var instance = Module.Speech.singleton;

        instance.recognizing = true;
        instance.updateButton( 'Recognizing...', 'btn-warning' );

        if( instance.debug )
            console.log( "Speech::Recognizing..." );
    }

    this.recognition.onend = function(){
        var instance = Module.Speech.singleton;

        instance.recognizing = false;
        instance.updateButton( 'Speech', 'btn-info' );

        if( instance.debug )
            console.log( "Speech::Recognition stop" );
    }

    if( this.button != null ){
        this.button.onclick = function(){
            var instance = Module.Speech.singleton;
            if( instance.recognizing ){
                instance.recognition.stop();
                return;
            }
            instance.recognition.start();
        }
    }

    this.bindCheckbox = function( id ){
        var elem = document.getElementById( id );

        if( elem == null )
            return;

        elem.onchange = function( value ){
            Module.Speech.singleton.recognition.continuous = elem.checked;

            if( Module.Speech.singleton.debug )
                console.log( "Speech::Continuous = " + elem.checked );
        }
    }

    // Funzione di aggiornamento grafico
    this.updateButton = function( text, style ){
        if( this.button == null )
            return;

        this.button.innerHTML = text;
        this.button.className = 'btn ' + style;
    }
}

Module.Speech.singleton = null;
