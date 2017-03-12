
speech2owl.NLP.SyntaxTree = function( s ){
    this.sentence = s.text;
    this.root = null;
    this.source = s; // SentenceInspector

    this.init = function(){
        var s = this.source;
        // Find the root node
        for( var i = 0; i < s.terms.length; i++ ){
            var term = s.term(i);
            if( term.isNoun || term.isPronoun ){
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

            var c = current.data; // current term of current node in tree
            var term = s.term(i);

            // Se sono a livello di un nome
            // posso inserire come figlio un verbo o un verbo composto
            if( term.isVerb ){
                if( c.isNoun || c.isPronoun ){
                    var n = this.next(i);
                    if( n != null && n.isVerb /*&& n.tag == 'VBG'*/ ){
                        current.add( s.tag({
                            token: term.token + ' ' + n.token,
                            tag: term.tag,
                            tags: [term.tag, n.tag]
                        }) );
                        checked.push(i+1);
                    }
                    else current.add(term);

                    current = current.down('last');

                }
            }
            else if( term.isAdjective ){

            }
            // Se trovo un pronome vado su
            // fintanto che non tropo un pronome o una entità
            else if( term.isPronoun ){

                while( current.parent != null && c.isEntity == false )
                    current = current.up();

            }
            // se sono a livello di un verbo
            // come figli posso avere solo un nome nome || aggettivo nome || nome
            // se composto, espandi nei singoli
            else if( c.isVerb && ( term.isNoun || term.isAdjective ) ){

                var n = this.next(i);
                if( n != null && n.isNoun ){
                    current.add( s.tag({
                        token: term.token + ' ' + n.token,
                        tag: term.tag,
                        tags: [term.tag, n.tag]
                    }) );
                    checked.push(i+1);

                    if( term.isNoun ){
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
        return this.source.term(index+1);
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

        var text = space + this.data.token + ' /' + this.data.tag;
        if( this.data['tags'] != undefined ){
            text += ' [';
            for(var i = 0; i < this.data['tags'].length; i++ )
                text += ' ' + this.data['tags'][i];
            text += ' ]';
        }

        output.push( text );
        space += '\t';
        for( var i = 0; i < this.children.length; i++ ){
            var c = this.children[i];

            output.push( c.toString( space ) );
        }

        return output.join('\n');
    }
}
