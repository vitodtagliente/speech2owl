
var OWL = OWL || {};
OWL.Utils = OWL.Utils || {};

OWL.Utils.normalizeURI = function( text ){
    if( text.charAt(0) != '#' && text.charAt(0) != '&' )
        return '#' + text;
    return text;
}
