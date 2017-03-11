
speech2owl.NLP.SyntaxTree = function( s ){
    this.sentence = s.text;
    this.root = null;
    this.source = s;

    this.init = function(){
        var s = this.source;
        // Find the root node
        for( var i = 0; i < s.terms.length; i++ ){
            var term = s.terms[i];
            if( s.isNoun(term.token) || s.isPronoun(term.token) ){
                this.root = new speech2owl.NLP.SyntaxTree.Node( term );

                return;
            }
        }
    }

    this.populate = function(){
        if( this.root == null )
            return;

        var current = this.root;
        var checked = [];
        var s = this.source;

        // Populate tree
        for( var i = 0; i < s.terms.length; i++ ){
            if( checked.contains(i) )
                continue;
            else checked.push(i);

            var currentToken = current.data.token;
            var currentTag = s.tag( current.data );

            var term = s.terms[i];
            var token = term.token;
            var tag = s.tag(term);

            // Se sono a livello di un nome
            // posso inserire come figlio un verbo o un verbo composto
            if( s.tag(term).isVerb ){
                if( currentTag.isNoun || currentTag.isPronoun ){

                    var n = this.next(i);
                    if( n != null && s.tag(n).isVerb /*&& n.tag == 'VBG'*/ ){
                        current.add({
                            token: term.token + ' ' + n.token,
                            tag: term.tag
                        });
                        checked.push(i+1);
                    }
                    else current.add(term);

                    current = current.down('last');

                }
            }
            else if( s.isAdjective(token) ){

            }
            else if( s.tag(term).isPronoun && currentTag.isNoun && currentTag.isEntity == false ){
                current = current.up();
                if( s.tag(current.data).isVerb )
                    current = current.up();
            }
            // se sono a livello di un verbo
            // come figli posso avere solo un nome nome || aggettivo nome || nome
            // se composto, espandi nei singoli
            else if( currentTag.isVerb && ( tag.isNoun || tag.isAdjective ) ){

                var n = this.next(i);
                if( n != null && s.tag(n).isNoun ){
                    current.add({
                        token: term.token + ' ' + n.token,
                        tag: term.tag + ' ' + n.tag
                    });
                    checked.push(i+1);

                    if( tag.isNoun ){
                        current = current.down();

                        current.add(term);
                        current.add(n);

                        current = current.up();
                    }
                }
                else current.add(term);

                //current = current.up();
                current = current.down('last');
            }

        }
    }

    this.next = function(index){
        var s = this.source;
        if( index < s.terms.length )
            return s.terms[index+1];
    }

    this.toString = function(){
        if( this.root != null )
            return this.root.toString();
        return '';
    }
}

speech2owl.NLP.SyntaxTree.Node = function( data, parent ){
    this.children = [];
    this.data = data;
    this.parent = parent || null;

    this.add = function( data ){
        var node = new speech2owl.NLP.SyntaxTree.Node( data, this );
        this.children.push( node );
    }

    this.up = function(){
        return this.parent;
    }

    this.down = function(i){
        if( i == 'last' ){
            var index = this.children.length - 1;
            if( index >= 0 )
                return this.children[index];
            return null;
        }

        i = i || 0;
        if( i < this.children.length ){
            return this.children[i];
        }
        return null;
    }

    this.toString = function( space ){
        var output = [];
        space = space || '';

        output.push( space + this.data.token + ' /' + this.data.tag );
        space += '\t';
        for( var i = 0; i < this.children.length; i++ ){
            var c = this.children[i];

            output.push( c.toString( space ) );
        }

        return output.join('\n');
    }
}
