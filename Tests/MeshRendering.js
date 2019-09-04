

testingHarness.registerTest('TestRenderTriangle', (domElement, resources)=> {
    const Z = ZeaEngine;

    let triangle = new Z.Mesh();
    triangle.setNumVertices(3);
    triangle.getVertex(0).set(-1, -1, 0.0);
    triangle.getVertex(1).set(3, -1, 0.0);
    triangle.getVertex(2).set(-1, 3, 0.0);
    triangle.setFaceCounts([1]);
    triangle.setFaceVertexIndices(0, 0, 1, 2);
    let texCoords = triangle.addVertexAttribute('texCoords', Z.Vec2);
    texCoords.getValueRef(0).set(0.0, 1.0);
    texCoords.getValueRef(1).set(0.0, 0.0);
    texCoords.getValueRef(2).set(1.0, 0.0);

    triangle.computeVertexNormals();

    const material = new Z.Material('material', 'SimpleSurfaceShader');
    const geomItem = new Z.GeomItem('geomItem', triangle, material);

    const scene = new Z.Scene(resources);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2, 5, 1), new Z.Vec3(0, 0, 1));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderManualQuad', (domElement, resources)=> {
    const Z = ZeaEngine;

    let quad = new Z.Mesh();
    quad.setNumVertices(4);
    quad.getVertex(0).set(3.4, 3.4, 0.0);
    quad.getVertex(1).set(3.4, -3.4, 0.0);
    quad.getVertex(2).set(-3.4, -3.4, 0.0);
    quad.getVertex(3).set(-3.4, 3.4, 0.0);
    quad.setFaceCounts([0, 1]);
    quad.setFaceVertexIndices(0, 0, 1, 2, 3);
    let texCoords = quad.addVertexAttribute('texCoords', Z.Vec2);
    texCoords.getValueRef(0).set(0.0, 1.0);
    texCoords.getValueRef(1).set(0.0, 0.0);
    texCoords.getValueRef(2).set(1.0, 0.0);
    texCoords.getValueRef(3).set(1.0, 1.0);

    quad.computeVertexNormals();

    const material = new Z.Material('material', 'SimpleSurfaceShader');
    const geomItem = new Z.GeomItem('geomItem', quad, material);

    const scene = new Z.Scene(resources);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-2.0, 2.0, -15.0), new Z.Vec3(-2.0, 2.0, 0.0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderPlane', (domElement, resources)=> {
    const Z = ZeaEngine;

    // Test a simple plane..
    let quad = new Z.Plane(1, 1, 1, 1);
    const material = new Z.Material('material', 'SimpleSurfaceShader');
    const geomItem = new Z.GeomItem('geomItem', quad, material);

    const scene = new Z.Scene(resources);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2.0, 1.0, 2.0), new Z.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderUVSeam', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    // Test generating a UV seam in a simply plane..

    let quad = new Z.Plane(1, 2, 1, 2);

    // Generate UVs with a seam between the 2 polys
    let texCoords = quad.addVertexAttribute('texCoords', Z.Vec2);
    texCoords.setFaceVertexValue(0, 0, new Z.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(0, 1, new Z.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(0, 2, new Z.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(0, 3, new Z.Vec2(0, 1), true);
    texCoords.setFaceVertexValue(1, 0, new Z.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(1, 1, new Z.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(1, 2, new Z.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(1, 3, new Z.Vec2(0, 1), true);

    const material = new Z.Material('material', 'SimpleSurfaceShader');
    let texture = new Z.FileImage("Assets/Texture.png");
    const geomItem = new Z.GeomItem('geomItem', quad, material);
    material.baseColor = texture;

    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2.0, 1.0, 2.0), new Z.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderUVAndNormalSeam', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    // Test generating a UV seam in a simply plane..

    let quad = new Z.Plane(1, 2, 1, 2);

    // Bend the plane in the middle to cause a creace in the normals.
    let positions = quad.getVertexAttribute('positions');
    positions.getValueRef(2).set(-0.5, 1, 0);
    positions.getValueRef(4).set(-0.5, 0, 0);
    quad.computeVertexNormals();

    // Generate UVs with a seam between the 2 polys
    let texCoords = quad.addVertexAttribute('texCoords', Z.Vec2);
    texCoords.setFaceVertexValue(0, 0, new Z.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(0, 1, new Z.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(0, 2, new Z.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(0, 3, new Z.Vec2(0, 1), true);
    texCoords.setFaceVertexValue(1, 0, new Z.Vec2(0, 0), true);
    texCoords.setFaceVertexValue(1, 1, new Z.Vec2(1, 0), true);
    texCoords.setFaceVertexValue(1, 2, new Z.Vec2(1, 1), true);
    texCoords.setFaceVertexValue(1, 3, new Z.Vec2(0, 1), true);

    const material = new Z.Material('material', 'SimpleSurfaceShader');
    const geomItem = new Z.GeomItem('geomItem', quad, material);
    material.baseColor = new Z.FileImage("Assets/Texture.png");

    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1.3, 1.3, 1.3), new Z.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderCuboid', (domElement, resources)=> {
    const Z = ZeaEngine;

    let cuboid = new Z.Cuboid(2, 3, 4);
    const material = new Z.Material('material', 'SimpleSurfaceShader');
    const geomItem = new Z.GeomItem('geomItem', cuboid, material);

    const scene = new Z.Scene(resources);
    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-2, -8, 2), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();
});

testingHarness.registerTest('TestRenderTexturedCuboid', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);

    let cuboid = new Z.Cuboid(2, 3, 4);
    const material = new Z.Material('material', 'SimpleSurfaceShader');
    let texture = new Z.FileImage("Assets/Texture.png");
    const geomItem = new Z.GeomItem('geomItem', cuboid, material);

    material.baseColor = texture;

    scene.getRoot().addChild(geomItem);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-5, -5, 5), new Z.Vec3());
    renderer.setScene(scene);
    renderer.resumeDrawing();
});


