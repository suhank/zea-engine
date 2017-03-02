let addGUI = function(div) {
    let moveGUIDiv = document.createElement("div");
    moveGUIDiv.id = 'moveGUI';
    div.appendChild(moveGUIDiv);
    let gui = new dat.GUI({
        autoPlace: false
    });
    moveGUIDiv.style.position = 'absolute';
    moveGUIDiv.style.top = '0px';
    moveGUIDiv.style.right = '30px';
    moveGUIDiv.style.zIndex = 100;
    moveGUIDiv.appendChild(gui.domElement);
    return gui;
}

let addCanvas = function(width, height, fullscreen) {
    let resizeDiv = document.createElement("div");
    resizeDiv.id = 'sapphireHolder';
    if (fullscreen) {
        resizeDiv.style.width = '100%';
        resizeDiv.style.height = '100%';
        resizeDiv.style.position = 'absolute';
        resizeDiv.style.top = 0;
        resizeDiv.style.left = 0;
    } else {
        resizeDiv.style.position = 'relative';
        resizeDiv.style.width = width + 'px';
        resizeDiv.style.height = height + 'px';
        // $(resizeDiv).resizable();
    }
    document.body.appendChild(resizeDiv);
    if (!fullscreen) {
        document.body.appendChild(document.createElement("br"));
    }
    return resizeDiv;
}

