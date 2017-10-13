
testingHarness.registerTest('DualFisheyeBackgroundLoading', (domElement, resources)=> {

    let scene = new Visualive.Scene(resources);
    let bgMap =  new Visualive.FileImage2D("Assets/DualFisheye.jpg", scene.getResourceLoader(), { mapping: 'dualfisheye'});
    scene.setBackgroundMap(bgMap);

    let renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,2,1), new Visualive.Vec3(0,2,0));
    renderer.setScene(scene);
    bgMap.loaded.connect(() => {
        renderer.requestRedraw();
    });

    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main);
    renderer.resumeDrawing();
});
