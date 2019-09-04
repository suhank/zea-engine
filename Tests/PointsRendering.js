
                
testingHarness.registerTest('TestRender2Points', (domElement, resources) => { 
    const Z = ZeaEngine;
    const scene = new Z.Scene(resources);
    scene.setupGrid(5.0, 5);

    const points = new Z.Points('points', 1);
    points.setNumVertices(2);
    points.getVertex(0).set(-1, 0, 1);
    points.getVertex(1).set(1, 0, 1);

    const material = new Z.Material('points', 'FatPointsShader');
    material.getParameter("BaseColor").setValue(new Z.Color(1,0,0));
    material.getParameter("PointSize").setValue(0.05);
    const geomItem = new Z.GeomItem('geomItem', points, material);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2.0, 1.0, 5.0), new Z.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});



testingHarness.registerTest('TestRenderPointCloud', (domElement, resources) => {
    const Z = ZeaEngine;
    const scene = new Z.Scene(resources);
    scene.setupGrid(5.0, 5);

    const points = new Z.Points();
    const count = 50000;
    points.setNumVertices(count);
    for(let i=0; i<count; i++) {
        const v = points.getVertex(i);
        v.setRandom(3).normalizeInPlace();
        v.scaleInPlace(Math.random());
    }

    // const material = new Z.Material('points', 'PointsShader');
    // const material = new Z.Material('points', 'SimpleSurfaceShader');
    // material.getParameter("BaseColor").setValue(new Z.Color(1,0,0));

    const material = new Z.Material('points', 'FatPointsShader');
    // material.getParameter("BaseColor").setValue(new Z.Color(1,0,0));
    material.getParameter("PointSize").setValue(0.02);
    material.getParameter("Rounded").setValue(0.2);
    material.getParameter("BaseColor").setValue(new Z.Color(1,0,1));
    
    const geomItem = new Z.GeomItem('geomItem', points, material);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2.0, 1.0, 5.0), new Z.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

