

testingHarness.registerTest('TestRenderLines', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    const lines = new Z.Lines();
    lines.setNumVertices(3);
    lines.getVertex(0).set(-1, -1, 0.0);
    lines.getVertex(1).set( 3, -1, 0.0);
    lines.getVertex(2).set(-1, 3, 0.0);
    lines.setNumSegments(3);
    lines.setSegment(0,0,1);
    lines.setSegment(1,1,2);
    lines.setSegment(2,2,0);

    lines.lineThickness = 0.4;
    // let lineThickness = lines.addVertexAttribute('lineThickness', Z.Float32);
    // for(let i=0; i<lineThickness.length; i++)
    //     lineThickness.setFloat32Value(i, /*(i/lineThickness.length) */ 0.6);

    const material = new Z.Material('material', 'FatLinesShader');
    const geomItem = new Z.GeomItem('geomItem', lines, material);
    const scene = new Z.Scene(resources);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1.0, 4.0, 3.0), new Z.Vec3(0.0, 1.5, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderCircle', (domElement, resources)=> {

    const lines = new Z.Circle(2.0, 8);

    // lines.lineThickness = 0.4;
    const lineThickness = lines.addVertexAttribute('lineThickness', Z.Float32);
    for(let i=0; i<lineThickness.length; i++)
        lineThickness.setFloat32Value(i, (i/lineThickness.length) * 0.4);

    const material = new Z.Material('material', 'FatLinesShader');
    const geomItem = new Z.GeomItem('geomItem', lines, material);
    const scene = new Z.Scene(resources);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1.0, 4.0, 3.0), new Z.Vec3(0.0, 0.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});
