
function addScript(attribute, text, callback) {
    var s = document.createElement('script');
    for (var attr in attribute) {
        s.setAttribute(attr, attribute[attr] ? attribute[attr] : null)
    }
    s.innerHTML = text;
    s.onload = callback;
    document.body.appendChild(s);
}

testingHarness.registerTest('WebVRPolyfill', (domElement, resources) => { 

    window.WebVRConfig = {
        // Prevents the polyfill from initializing automatically.
        DEFER_INITIALIZATION: true,
        // Ensures the polyfill is always active when initialized, even if the
        // native API is available. This is probably NOT what most pages want.
        ALWAYS_APPEND_POLYFILL_DISPLAY: true,
        // Polyfill optimizations
        DIRTY_SUBMIT_FRAME_BINDINGS: true,
        BUFFER_SCALE: 0.75,
      };

    addScript({
        src: "../external/webvr-polyfill.js",
        type: 'text/javascript'
    }, '', ()=>{

        InitializeWebVRPolyfill();

        const scene = new Visualive.Scene(resources);
        const renderer = new Visualive.GLVisualiveRenderer(domElement);

        renderer.setScene(scene);
        renderer.setupGrid(5.0, new Visualive.Color(.53, .53, .53), 50, 0.01);
        renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,2,1.7), new Visualive.Vec3(0,0,1));
        renderer.resumeDrawing();

        if(Visualive.SystemDesc.isMobileDevice){
            renderer.startContinuousDrawing();
        }

        // let controller = new VisualiveUI.renderUI(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);

        VisualiveUI.renderUI(renderer);
    });

});

