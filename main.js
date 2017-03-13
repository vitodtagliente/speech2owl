
var express = require('express');
var app = express();
var path = require("path");
var colors = require('colors');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/nlp', function (req, res) {

    var text = req.query.text || '';
    var output = [];

    var pos = require('pos');

    console.log( '' );
    console.log( ('NLP::Text = ' + text).cyan );

    var sentences = text.split('.');
    for( var i = 0; i < sentences.length; i++ ){
        var sentence = sentences[i].trim();
        console.log( '' );
        console.log( sentence.yellow );
        console.log( '' );
        // Processing
        var terms = [];
        var words = new pos.Lexer().lex( sentence );
        var tagger = new pos.Tagger();
        var taggedWords = tagger.tag(words);
        for (j in taggedWords) {
            var taggedWord = taggedWords[j];
            var word = taggedWord[0];
            var tag = taggedWord[1];
            console.log(word + " /".cyan + tag.cyan);
            terms.push({
                token: word,
                tag: tag
            });
        }

        output.push({
            sentence: sentence,
            terms: terms
        });
    }

    res.send( output);
});

app.listen(8000, function () {
  console.log('speech2owl is listening on port 8000!');
});
