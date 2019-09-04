

testingHarness.registerTest('MultipleViewports', (domElement, resources)=> {
    const Z = ZeaEngine;

    let cuboid = new Z.Cuboid(2, 3, 4);
    const material = new Z.Material('surfaces', 'SimpleSurfaceShader');
    const geomItem = new Z.GeomItem('geomItem', cuboid, material);

    const scene = new Z.Scene(resources);
    // let cam2 = new Z.Camera('right');
    scene.getRoot().addChild(geomItem);
    // scene.getRoot().addChild(cam2);

    const renderer = new Z.GLRenderer(domElement);
    renderer.setScene(scene);

    renderer.getViewport(0).setTr(new Z.Vec2(0.499, 1.0));
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-2.0, -8.0, 2.0), new Z.Vec3(0, 0, 0));
    let vp2 = renderer.addViewport('right'); 
    vp2.setBl(new Z.Vec2(0.501, 0.0));
    // vp2.setCamera(cam2);
    // vp2.setCamera(scene.getCamera());

    renderer.resumeDrawing();
});