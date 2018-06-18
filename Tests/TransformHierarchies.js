

testingHarness.registerTest('TransformHierarchies', (domElement, resources)=> {
        

    const scene = new Visualive.Scene(resources);

    const material = new Visualive.Material('material', 'SimpleSurfaceShader');
    material.addParameter('BaseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    material.addParameter('Roughness', 1.0);
    material.addParameter('Metallic', 0.0);
    let cuboid = new Visualive.Cuboid(0.6, 2.0, 0.2);

    let geomItem0 = new Visualive.GeomItem('Item0', cuboid, material);
    geomItem0.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,3,0)));
    scene.getRoot().addChild(geomItem0);

    let geomItem1 = new Visualive.GeomItem('Item1', cuboid, material);
    geomItem1.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,2,0), new Visualive.Quat({'rotateZ':Math.degToRad(90)})));
    geomItem0.addChild(geomItem1);

    let geomItem2 = new Visualive.GeomItem('Item2', cuboid, material);
    geomItem2.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,2,0), new Visualive.Quat({'rotateZ':Math.degToRad(90)})));
    geomItem1.addChild(geomItem2);


    let geomItem3 = new Visualive.GeomItem('Item3', cuboid, material);
    geomItem2.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,3,0), new Visualive.Quat({'rotateX':Math.degToRad(90)})));
    geomItem2.addChild(geomItem3);

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setScene(scene);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 15, 2), new Visualive.Vec3(0, 0, 0));
    renderer.frameAll();
    renderer.resumeDrawing();

});