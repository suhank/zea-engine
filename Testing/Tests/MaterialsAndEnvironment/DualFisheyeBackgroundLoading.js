
testingHarness.registerTest('MaterialsAndEnvironment/DualFisheyeBackgroundLoading', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    const bgMap =  new Z.FileImage('DualFisheye', "Assets/DualFisheye.jpg", { mapping: 'dualfisheye'});
    scene.setBackgroundMap(bgMap);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1,1,2), new Z.Vec3(0,0,2));
    renderer.setScene(scene);
    bgMap.addEventListener('loaded', event => {
        renderer.requestRedraw()
    })
    renderer.resumeDrawing();
});
