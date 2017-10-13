

testingHarness.registerTest('MultipleViewports', (domElement, resources)=> {

    let cuboid = new Visualive.Cuboid(2, 3, 4);
    let material = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    let geomItem = new Visualive.GeomItem('geomItem', cuboid, material);

    let scene = new Visualive.Scene(resources);
    // let cam2 = new Visualive.Camera('right');
    scene.getRoot().addChild(geomItem);
    // scene.getRoot().addChild(cam2);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setScene(scene);

    renderer.getViewport(0).setTr(new Visualive.Vec2(0.499, 1.0));
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-2.0, 2.0, -8.0), new Visualive.Vec3(0, 0, 0));
    let vp2 = renderer.addViewport('right'); 
    vp2.setBl(new Visualive.Vec2(0.501, 0.0));
    // vp2.setCamera(cam2);
    // vp2.setCamera(scene.getCamera());

    renderer.resumeDrawing();
});