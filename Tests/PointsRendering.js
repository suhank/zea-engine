
                
testingHarness.registerTest('TestRender2Points', (domElement, resources) => { 
    const scene = new Visualive.Scene(resources);
    scene.setupGrid(5.0, 5);

    const points = new Visualive.Points('points', 1);
    points.setNumVertices(2);
    points.getVertex(0).set(-1, 0, 1);
    points.getVertex(1).set(1, 0, 1);

    const material = new Visualive.Material('points', 'FatPointsShader');
    material.getParameter("BaseColor").setValue(new Visualive.Color(1,0,0));
    material.getParameter("PointSize").setValue(0.05);
    const geomItem = new Visualive.GeomItem('geomItem', points, material);
    scene.getRoot().addChild(geomItem);

    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2.0, 1.0, 5.0), new Visualive.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});



testingHarness.registerTest('TestRenderPointCloud', (domElement, resources) => {
    const scene = new Visualive.Scene(resources);
    scene.setupGrid(5.0, 5);

    const points = new Visualive.Points();
    const count = 50000;
    points.setNumVertices(count);
    for(let i=0; i<count; i++) {
        const v = points.getVertex(i);
        v.setRandom(3).normalizeInPlace();
        v.scaleInPlace(Math.random());
    }

    // const material = new Visualive.Material('points', 'PointsShader');
    // const material = new Visualive.Material('points', 'SimpleSurfaceShader');
    // material.getParameter("BaseColor").setValue(new Visualive.Color(1,0,0));

    const material = new Visualive.Material('points', 'FatPointsShader');
    // material.getParameter("BaseColor").setValue(new Visualive.Color(1,0,0));
    material.getParameter("PointSize").setValue(0.02);
    material.getParameter("Rounded").setValue(0.2);
    material.getParameter("BaseColor").setValue(new Visualive.Color(1,0,1));
    
    const geomItem = new Visualive.GeomItem('geomItem', points, material);
    scene.getRoot().addChild(geomItem);

    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2.0, 1.0, 5.0), new Visualive.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

