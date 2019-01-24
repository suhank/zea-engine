
testingHarness.registerTest('HelloWorld', (domElement, resources) => { 
    const scene = new Visualive.Scene(resources);
    scene.setupGrid(5.0, 50);

    const renderer = new Visualive.GLRenderer(domElement);
    renderer.setScene(scene);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,2,1.7), new Visualive.Vec3(0,0,0.4));
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

