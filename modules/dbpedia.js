
var Module = Module || {};

Module.DBpedia = function( id_textarea, id_results, debug ){

    this.debug = debug || false;
    this.endpoint = 'http://www.dbpedia-spotlight.com/en/annotate';
    this.textarea = document.getElementById( id_textarea );
    this.results = document.getElementById( id_results );

    Module.DBpedia.singleton = this;

    this.getText = function(){
        if( this.textarea != null && this.textarea.value != '' )
            return this.textarea.value;

        if( this.debug ){
            var text = "President Obama called Wednesday on Congress to extend" +
            " a tax break for students included in last year's economic " +
            " stimulus package, arguing that the policy provides more generous" +
            " assistance.";

            this.textarea.value = text;
            return text;
        }
    }

    this.request = function(){

        if( this.results != null )
            this.results.innerHTML = '';

        var ajaxRequest = $.ajax({

            'url': this.endpoint,
            'data': {
                text: this.getText(),
                confidence: 0.5,
                support: 20
            },
            'headers': {'Accept': 'application/json'},
            'success': Module.DBpedia.successHandler,
            'error': Module.DBpedia.errorHandler

        });
    }

}

Module.DBpedia.successHandler = function( response ){
    var context = Module.DBpedia.singleton;

    if( context.debug ){
        console.log( "DBpedia::success" );
        console.log( response );
    }

    if( context.results != null ){
        if( response["Resources"] ){
            var output = "";
            for( var i = 0; i < response["Resources"].length; i++ ){
                var elem = response["Resources"][i];
                var content = "<a href = '" + elem['@URI'] +"'>" + elem['@surfaceForm'] + '</a>';
                output += "<li class = 'list-group-item'>" + content + "</li>";
            }

            context.results.innerHTML = output;
        }
    }
}

Module.DBpedia.errorHandler = function( response ){
    var context = Module.DBpedia.singleton;

    if( context.debug ){
        console.log( "DBpedia::error" );
        console.log( response );
    }
}

Module.DBpedia.singleton = null;
