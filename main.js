
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

app.get('/nlp', function (req, res) {

    console.log( req.query );
    var text = req.query.text;

    console.log( 'NLP::Text = ' + text );

    var salient = require('salient');
    // Tokenization
    var tokenizer = new salient.tokenizers.RegExpTokenizer({ pattern: /\W+/ });
    var tokens = tokenizer.tokenize(text);
    console.log( 'NLP::Tokens = ' );
    console.log( tokens );

    var hmmTagger = new salient.tagging.HmmTagger();
    var tags = hmmTagger.tag( tokens );
    console.log( 'NLP::Tags = ' );
    console.log( tags );

    var glossary = new salient.glossary.Glossary();
    glossary.parse( text );
    gson = glossary.toJSON();
    console.log( 'NLP::Glossay = ' );
    console.log( gson );

    var terms = [];
    for( var i = 0; i < tokens.length; i++ ){
        terms.push({
            token: tokens[i],
            tag: tags[i]
        })
    }

    res.send({
        terms: terms,
        glossary: gson
    });
});

app.listen(8000, function () {
  console.log('speech2owl is listening on port 8000!');
});
