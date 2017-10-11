
let getUrlVars = () => {
    let url = window.location.href,
        args = {};

    let parts = url.split('?');
    let hashes = parts.length > 1 ? parts[1].split('&') : [];
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        args[hash[0]] = hash[1];
    }
    return args;
}

var createLink = (name, parent)=>{
    var a = document.createElement('a');
    var linkText = document.createTextNode(name);
    a.appendChild(linkText);
    a.title = name;
    a.href = window.location.href + "?test=" + name;
    parent.appendChild(a);
    parent.appendChild(document.createElement('br'));
}
var init = function(domElement, resources) { 
    args = getUrlVars();

    switch(args.test) {
        case 'HelloWorld':
            HelloWorld(domElement, resources);
            break;
        case 'Materials':
            Materials(domElement, resources);
            break;
        case 'LatLongBackgroundLoading':
            LatLongBackgroundLoading(domElement, resources);
            break;
        case 'LatLongSterioBackgroundLoading':
            LatLongSterioBackgroundLoading(domElement, resources);
            break;
        case 'Labels':
            Labels(domElement, resources);
            break;
        case 'GifLoading':
            GifLoading(domElement, resources);
            break;
        case 'GearsOperator':
            GearsOperator(domElement, resources);
            break;
        case 'Cutaway':
            Cutaway(domElement, resources);
            break;
        default:
            createLink('HelloWorld', domElement);
            createLink('Materials', domElement);
            createLink('LatLongBackgroundLoading', domElement);
            createLink('LatLongSterioBackgroundLoading', domElement);
            createLink('Labels', domElement);
            createLink('GifLoading', domElement);
            createLink('GearsOperator', domElement);
            createLink('Cutaway', domElement);
    }

};