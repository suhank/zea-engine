
                
testingHarness.registerTest('TestRender2Points', (domElement, resources) => { 
    let scene = new Visualive.Scene(resources);

    let points = new Visualive.Points('points', 1);
    points.setNumVertices(2);
    points.getVertex(0).set(-1, 0, 0.0);
    points.getVertex(1).set(1, 0, 0.0);

    let material = new Visualive.PointsMaterial();
    material.pointSize = 1.0;
    let geomItem = new Visualive.GeomItem('geomItem', points, material);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2.0, 1.0, 5.0), new Visualive.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});



testingHarness.registerTest('TestRenderPointCloud', (domElement, resources) => {
    let scene = new Visualive.Scene(resources);

    let points = new Visualive.Points('points', 1);
    let count = 50000;
    points.setNumVertices(count);
    for(let i=0; i<count; i++)
        points.getVertex(i).setRandom(3).scaleInPlace(Math.random());

    let material = new Visualive.PointsMaterial();
    material.pointSize = 0.02;
    let geomItem = new Visualive.GeomItem('geomItem', points, material);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().setBackgroundColor(new Visualive.Color(0.0, 0.0, 0.0));
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2.0, 1.0, 5.0), new Visualive.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

