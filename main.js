
var express = require('express');
var app = express();
var path = require("path");

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname+'/test/nlp.html'));
});

app.get('/nlp-compromise', function (req, res) {

    console.log( req.query );
    var text = req.query.text || '';


});

app.get('/nlp', function (req, res) {

    console.log( req.query );
    var text = req.query.text || '';
    var output = [];

    console.log( 'NLP::Text = ' + text );

    var salient = require('salient');

    var sentences = text.split('.');
    for( var i = 0; i < sentences.length; i++ ){
        var sentence = sentences[i].trim();
        console.log( '' );
        console.log( '###################################' );
        console.log( '|---------------------------------|' );
        console.log( '' );
        console.log( sentence );
        console.log( '' );
        console.log( '|---------------------------------|' );
        console.log( '###################################' );
        console.log( '' );
        // Tokenization
        var tokenizer = new salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
        var tokens = tokenizer.tokenize( sentence );
        console.log( '###### NLP::Tokens ######' );
        console.log( tokens );

        var hmmTagger = new salient.tagging.HmmTagger();
        var tags = hmmTagger.tag( tokens );
        console.log( '###### NLP::Tags ######' );
        console.log( tags );

        var glossary = new salient.glossary.Glossary();
        glossary.parse( text );
        gson = glossary.toJSON();
        console.log( '###### NLP::Glossay ######' );
        console.log( gson );

        var terms = [];
        for( var j = 0; j < tokens.length; j++ ){
            terms.push({
                token: tokens[j],
                tag: tags[j]
            })
        }

        output.push({
            sentence: sentence,
            terms: terms,
            glossary, gson
        });
    }

    res.send( output );
});

app.listen(8000, function () {
  console.log('speech2owl is listening on port 8000!');
});
