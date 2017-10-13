
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

    if(args.test) {
        testingHarness.runTest(args.test, domElement, resources)
    }
    else {
        let names = testingHarness.getTestNames();
        for(let name of names) {
            createLink(name, domElement);
        }
    }

};