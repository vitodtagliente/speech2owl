
var express = require('express');
var app = express();
var path = require("path");
var colors = require('colors');
var formidable = require('formidable');
var fs = require('fs');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/upload', function (req, res) {
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = false;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public/assets');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        console.log( "Upload Request: ".yellow + file.name );
        var filename = path.join(form.uploadDir, file.name);

        if( fs.existsSync( filename ) )
            fs.unlinkSync( filename );

        fs.rename(file.path, filename);
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log( "UPLOAD::ERROR".red );
        console.log('');
        res.end("UPLOAD::ERROR");
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        console.log( "UPLOAD::SUCCESS".green );
        console.log('');
        res.end("UPLOAD::SUCCESS");
    });

    // parse the incoming request containing the form data
    form.parse(req);
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
