
speech2owl.NLP.SentenceInspector.prototype.relations = function(){

    var output = [];

    var tree = new speech2owl.NLP.SyntaxTree( this );
    tree.init();
    tree.populate();

    return tree;

}
