
testingHarness.registerTest('HelloWorld', (domElement, resources) => { 
    const scene = new Visualive.Scene(resources);
    const renderer = new Visualive.GLVisualiveRenderer(domElement);

    renderer.setScene(scene);
    renderer.setupGrid(5.0, new Visualive.Color(.53, .53, .53), 50, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,1.7,2), new Visualive.Vec3(0,0,0.4));
    renderer.resumeDrawing();
});

