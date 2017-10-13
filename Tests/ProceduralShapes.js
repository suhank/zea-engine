
testingHarness.registerTest('ProceduralShapes', (domElement, resources)=> {

    let scene = new Visualive.Scene(resources);

    let standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.addParameter('baseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    standardMaterial.addParameter('roughness', 1.0);
    standardMaterial.addParameter('metallic', 0.0);

    let addMeshShape = (name, shape, pos)=>{
        let geomItem = new Visualive.GeomItem(name+'Item', shape, standardMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addMeshShape('Plane', new Visualive.Plane(2.0, 1.5, 22, 22), new Visualive.Vec3(-6, 0, 0));
    addMeshShape('Cuboid', new Visualive.Cuboid(1.5, 2.0, 1.0), new Visualive.Vec3(-3, 0, 0));
    addMeshShape('Cone', new Visualive.Cone(1.2, 4.0), new Visualive.Vec3(0, 0, 0));
    addMeshShape('Cylinder', new Visualive.Cylinder(1.2, 4.0, 32, 2, true), new Visualive.Vec3(3, 0, 0));
    addMeshShape('Torus', new Visualive.Torus(0.4, 1.3), new Visualive.Vec3(6, 0, 0));
    addMeshShape('Sphere', new Visualive.Sphere(1.4, 13), new Visualive.Vec3(9, 0, 0));

    let linesMaterial = new Visualive.Material('lines', 'FatLinesShader');
    linesMaterial.addParameter('color', new Visualive.Color(1.0, 0.3, .4));

    let addLinesShape = (name, shape, pos)=>{
        shape.lineThickness = 0.05;
        let geomItem = new Visualive.GeomItem(name+'Item', shape, linesMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addLinesShape('Circle', new Visualive.Circle(2.2, 12), new Visualive.Vec3(-6, 0, 6));
    addLinesShape('Rect', new Visualive.Rect(1.5, 2.0), new Visualive.Vec3(-3, 0, 6));


    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 2, 15), new Visualive.Vec3(0, 0, 0));
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);
    // renderer.frameAll();
    renderer.resumeDrawing();
});