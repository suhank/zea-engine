const addGUI = function(div, options) {
    const moveGUIDiv = document.createElement("div");
    moveGUIDiv.id = 'moveGUI';
    div.appendChild(moveGUIDiv);
    options = options ? options : {};
    options.autoPlace = false;
    const gui = new dat.GUI(options);
    
    moveGUIDiv.style.position = 'absolute';
    moveGUIDiv.style.top = '0px';
    moveGUIDiv.style.right = '30px';
    moveGUIDiv.style.zIndex = 100;
    moveGUIDiv.appendChild(gui.domElement);
    return gui;
}

const addCanvas = function(width, height) {
    const resizeDiv = document.createElement("div");
    resizeDiv.id = 'visualive';
    if (width == undefined) {
        resizeDiv.style.width = '100%';
        resizeDiv.style.height = '100%';
        resizeDiv.style.position = 'fixed';
        resizeDiv.style.top = 0;
        resizeDiv.style.left = 0;
        // resizeDiv.style.overflow = 'hidden';
    } else {
        resizeDiv.style.position = 'relative';
        resizeDiv.style.width = width + 'px';
        resizeDiv.style.height = height + 'px';
    }
    document.body.appendChild(resizeDiv);
    if (width !== undefined) {
        document.body.appendChild(document.createElement("br"));
    }
    return resizeDiv;
}

const getUrlVars = () => {
    const url = window.location.href,
        args = {};

    const parts = url.split('?');
    const hashes = parts.length > 1 ? parts[1].split('&') : [];
    for (let i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        args[hash[0]] = hash[1];
    }
    return args;
}

const createLink = (name, parent)=>{
    const a = document.createElement('a');
    const linkText = document.createTextNode(name);
    a.appendChild(linkText);
    a.title = name;
    a.href = window.location.href + "?test=" + name;
    parent.appendChild(a);
    parent.appendChild(document.createElement('br'));
}

let generateResourcesDict = (list=[], assetDescs=[], imageDescs=[])=>{
    let resources = {
        VisualiveEngine: {
            'Vive.vla': { url: window.location.origin+'/Resources/Vive.vla' } ,
            'Dome.vla': { url: window.location.origin+'/Resources/Dome.vla' } ,
            'LogoSmall.png': { url: window.location.origin+'/Resources/LogoSmall.png' } ,
            'FlakesNormalMap.png': { url: window.location.origin+'/Resources/FlakesNormalMap.png' } 
        }
    };
    let rootURL = window.location.href.split('#')[0];
    rootURL = rootURL.split('?')[0];
    if(rootURL.endsWith('.html') || rootURL.endsWith('.html')){
        rootURL = rootURL.substring(0, rootURL.lastIndexOf('/')) + '/';
    }
    const generatePath = (item)=>{
        const parts = item.split('/');
        const base = rootURL;
        if(parts[0] == '.')
            parts.shift();
        if(parts[0] == '..'){
            item = item.substring(3);
            const baseparts = base.split('/');
            baseparts.pop();
            baseparts.pop();
            base = baseparts.join('/') + '/';
        }
        const curr = resources;
        for(let i=0; i<parts.length-1; i++){
            const part = parts[i];
            if(!(part in curr)){
                curr[part] = {};
            }
            curr = curr[part];
        }
        curr[parts[parts.length-1]] = { url: base+item };
    }
    for(let item of list){
        generatePath(item);
    }
    for(let assetDesc of assetDescs){
        generatePath(assetDesc[0] + ".vla");
        for(let i=0; i<assetDesc[1]; i++)
            generatePath(assetDesc[0] + i + ".vlageoms");
        if(assetDesc.length == 3) {
            for(let i=0; i<3; i++){
                // PAth for the env and the lightmaps for the env
                generatePath(assetDesc[2] + i + ".vlh");
                let envMapName = assetDesc[2].split('/');
                if(envMapName.length > 1)
                    envMapName.shift();
                envMapName = envMapName[0];
                generatePath(assetDesc[0] + "_" + envMapName + "_Lightmap" + i + ".vlh");
            }
        }
    }
    for(let imageDesc of imageDescs){
        for(let i=0; i<3; i++){
            let suffixSt = imageDesc.lastIndexOf('.')
            generatePath(imageDesc.substring(0, suffixSt) + i + imageDesc.substring(suffixSt));
        }
    }
    return resources;
}