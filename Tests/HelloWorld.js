
testingHarness.registerTest('HelloWorld', (domElement, resources) => { 
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(5.0, 50);

    const renderer = new Z.GLRenderer(domElement);
    renderer.setScene(scene);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2,2,1.7), new Z.Vec3(0,0,0.4));
    renderer.resumeDrawing();

    document.addEventListener('keypress', (event) => {
        const key = String.fromCharCode(event.keyCode).toLowerCase();
        console.log(key)
        if(key == 'v' && event.shiftKey) {
            const vrvp = renderer.getVRViewport();
            if(vrvp) 
                vrvp.togglePresenting();
        }
    });

});

