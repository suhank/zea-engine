let addGUI = function() {
    let moveGUIDiv = document.createElement("div");
    moveGUIDiv.id = 'moveGUI';
    document.body.appendChild(moveGUIDiv);
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


var onResize = function(element, callback) {
  if (!onResize.watchedElementData) {
    // First time we are called, create a list of watched elements
    // and hook up the event listeners.
    onResize.watchedElementData = [];

    var checkForChanges = function() {
      onResize.watchedElementData.forEach(function(data) {
        if (data.element.offsetWidth !== data.offsetWidth ||
            data.element.offsetHeight !== data.offsetHeight) {
          data.offsetWidth = data.element.offsetWidth;
          data.offsetHeight = data.element.offsetHeight;
          data.callback();
        }
      });
    };

    // Listen to the window's size changes
    window.addEventListener('resize', checkForChanges);

    // Listen to changes on the elements in the page that affect layout 
    var observer = new MutationObserver(checkForChanges);
    observer.observe(document.body, { 
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true 
    });
  }

  // Save the element we are watching
  onResize.watchedElementData.push({
    element: element,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
    callback: callback
  });
};
