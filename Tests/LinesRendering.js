

testingHarness.registerTest('TestRenderLines', (domElement, resources)=> {
    
    let lines = new Visualive.Lines();
    lines.setNumVertices(3);
    lines.getVertex(0).set(-1, -1, 0.0);
    lines.getVertex(1).set( 3, -1, 0.0);
    lines.getVertex(2).set(-1, 3, 0.0);
    lines.setNumSegments(3);
    lines.setSegment(0,0,1);
    lines.setSegment(1,1,2);
    lines.setSegment(2,2,0);

    lines.lineThickness = 0.4;
    // let lineThickness = lines.addVertexAttribute('lineThickness', Visualive.Float32);
    // for(let i=0; i<lineThickness.length; i++)
    //     lineThickness.setFloat32Value(i, /*(i/lineThickness.length) */ 0.6);

    let material = new Visualive.Material('material', 'FatLinesShader');
    let geomItem = new Visualive.GeomItem('geomItem', lines, material);
    let scene = new Visualive.Scene(resources);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1.0, 4.0, 3.0), new Visualive.Vec3(0.0, 1.5, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderCircle', (domElement, resources)=> {

    let lines = new Visualive.Circle(2.0, 8);

    // lines.lineThickness = 0.4;
    let lineThickness = lines.addVertexAttribute('lineThickness', Visualive.Float32);
    for(let i=0; i<lineThickness.length; i++)
        lineThickness.setFloat32Value(i, (i/lineThickness.length) * 0.4);

    let material = new Visualive.Material('material', 'FatLinesShader');
    let geomItem = new Visualive.GeomItem('geomItem', lines, material);
    let scene = new Visualive.Scene(resources);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1.0, 4.0, 3.0), new Visualive.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});
