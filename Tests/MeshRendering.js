

testingHarness.registerTest('TestRenderTriangle', (domElement, resources)=> {

    let triangle = new Visualive.Mesh();
    triangle.setNumVertices(3);
    triangle.getVertex(0).set(-1, -1, 0.0);
    triangle.getVertex(1).set(3, -1, 0.0);
    triangle.getVertex(2).set(-1, 3, 0.0);
    triangle.setFaceCounts([1]);
    triangle.setFaceVertexIndices(0, 0, 1, 2);
    let texCoords = triangle.addVertexAttribute('texCoords', Visualive.Vec2);
    texCoords.getValueRef(0).set(0.0, 1.0);
    texCoords.getValueRef(1).set(0.0, 0.0);
    texCoords.getValueRef(2).set(1.0, 0.0);

    triangle.computeVertexNormals();

    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let geomItem = new Visualive.GeomItem('geomItem', triangle, material);

    let scene = new Visualive.Scene(resources);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2, 5, 1), new Visualive.Vec3(0, 0, 1));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderManualQuad', (domElement, resources)=> {

    let quad = new Visualive.Mesh();
    quad.setNumVertices(4);
    quad.getVertex(0).set(3.4, 3.4, 0.0);
    quad.getVertex(1).set(3.4, -3.4, 0.0);
    quad.getVertex(2).set(-3.4, -3.4, 0.0);
    quad.getVertex(3).set(-3.4, 3.4, 0.0);
    quad.setFaceCounts([0, 1]);
    quad.setFaceVertexIndices(0, 0, 1, 2, 3);
    let texCoords = quad.addVertexAttribute('texCoords', Visualive.Vec2);
    texCoords.getValueRef(0).set(0.0, 1.0);
    texCoords.getValueRef(1).set(0.0, 0.0);
    texCoords.getValueRef(2).set(1.0, 0.0);
    texCoords.getValueRef(3).set(1.0, 1.0);

    quad.computeVertexNormals();

    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let geomItem = new Visualive.GeomItem('geomItem', quad, material);

    let scene = new Visualive.Scene(resources);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-2.0, 2.0, -15.0), new Visualive.Vec3(-2.0, 2.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderPlane', (domElement, resources)=> {
    // Test a simple plane..
    let quad = new Visualive.Plane(1, 1, 1, 1);
    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let geomItem = new Visualive.GeomItem('geomItem', quad, material);

    let scene = new Visualive.Scene(resources);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2.0, 1.0, 2.0), new Visualive.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderUVSeam', (domElement, resources)=> {
    let scene = new Visualive.Scene(resources);
    // Test generating a UV seam in a simply plane..

    let quad = new Visualive.Plane(1, 2, 1, 2);

    // Generate UVs with a seam between the 2 polys
    let texCoords = quad.addVertexAttribute('texCoords', Visualive.Vec2);
    texCoords.setFaceVertexValue(0, 0, new Visualive.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(0, 1, new Visualive.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(0, 2, new Visualive.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(0, 3, new Visualive.Vec2(0, 1), true);
    texCoords.setFaceVertexValue(1, 0, new Visualive.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(1, 1, new Visualive.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(1, 2, new Visualive.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(1, 3, new Visualive.Vec2(0, 1), true);

    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let texture = new Visualive.FileImage2D("Assets/Texture.png", scene.getResourceLoader());
    let geomItem = new Visualive.GeomItem('geomItem', quad, material);
    material.baseColor = texture;

    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2.0, 1.0, 2.0), new Visualive.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderUVAndNormalSeam', (domElement, resources)=> {
    let scene = new Visualive.Scene(resources);
    // Test generating a UV seam in a simply plane..

    let quad = new Visualive.Plane(1, 2, 1, 2);

    // Bend the plane in the middle to cause a creace in the normals.
    let positions = quad.getVertexAttribute('positions');
    positions.getValueRef(2).set(-0.5, 1, 0);
    positions.getValueRef(4).set(-0.5, 0, 0);
    quad.computeVertexNormals();

    // Generate UVs with a seam between the 2 polys
    let texCoords = quad.addVertexAttribute('texCoords', Visualive.Vec2);
    texCoords.setFaceVertexValue(0, 0, new Visualive.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(0, 1, new Visualive.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(0, 2, new Visualive.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(0, 3, new Visualive.Vec2(0, 1), true);
    texCoords.setFaceVertexValue(1, 0, new Visualive.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(1, 1, new Visualive.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(1, 2, new Visualive.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(1, 3, new Visualive.Vec2(0, 1), true);

    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let geomItem = new Visualive.GeomItem('geomItem', quad, material);
    material.baseColor = new Visualive.FileImage2D("Assets/Texture.png", scene.getResourceLoader());

    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1.3, 1.3, 1.3), new Visualive.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderCuboid', (domElement, resources)=> {

    let cuboid = new Visualive.Cuboid(2, 3, 4);
    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let geomItem = new Visualive.GeomItem('geomItem', cuboid, material);

    let scene = new Visualive.Scene(resources);
    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-2, -8, 2), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderTexturedCuboid', (domElement, resources)=> {
    let scene = new Visualive.Scene(resources);

    let cuboid = new Visualive.Cuboid(2, 3, 4);
    let material = new Visualive.Material('material', 'SimpleSurfaceShader');
    let texture = new Visualive.FileImage2D("Assets/Texture.png", scene.getResourceLoader());
    let geomItem = new Visualive.GeomItem('geomItem', cuboid, material);

    material.baseColor = texture;

    scene.getRoot().addChild(geomItem);

    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-5, -5, 5), new Visualive.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});


