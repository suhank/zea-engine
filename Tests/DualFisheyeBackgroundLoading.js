
testingHarness.registerTest('DualFisheyeBackgroundLoading', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);
    const bgMap =  new Visualive.FileImage('DualFisheye', "Assets/DualFisheye.jpg", { mapping: 'dualfisheye'});
    scene.setBackgroundMap(bgMap);

    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,1,2), new Visualive.Vec3(0,0,2));
    renderer.setScene(scene);
    bgMap.loaded.connect(() => {
        renderer.requestRedraw();
    });
    renderer.resumeDrawing();
});
