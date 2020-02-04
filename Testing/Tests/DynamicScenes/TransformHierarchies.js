

testingHarness.registerTest('TransformHierarchies', (domElement, resources)=> {
    const Z = ZeaEngine;
        

    const scene = new Z.Scene(resources);

    const material = new Z.Material('material', 'SimpleSurfaceShader');
    material.getParameter('BaseColor').setValue(new Z.Color(89 / 255, 182 / 255, 92 / 255));
    let cuboid = new Z.Cuboid(0.6, 2.0, 0.2);

    let geomItem0 = new Z.GeomItem('Item0', cuboid, material);
    geomItem0.setLocalXfo(new Z.Xfo(new Z.Vec3(0,0,3)));
    scene.getRoot().addChild(geomItem0);

    let geomItem1 = new Z.GeomItem('Item1', cuboid, material);
    geomItem1.setLocalXfo(new Z.Xfo(new Z.Vec3(0,0,2), new Z.Quat({'rotateX':Math.degToRad(90)})));
    geomItem0.addChild(geomItem1);

    let geomItem2 = new Z.GeomItem('Item2', cuboid, material);
    geomItem2.setLocalXfo(new Z.Xfo(new Z.Vec3(0,0,2), new Z.Quat({'rotateX':Math.degToRad(90)})));
    geomItem1.addChild(geomItem2);


    let geomItem3 = new Z.GeomItem('Item3', cuboid, material);
    geomItem2.setLocalXfo(new Z.Xfo(new Z.Vec3(0,0,3), new Z.Quat({'rotateY':Math.degToRad(90)})));
    geomItem2.addChild(geomItem3);

    const renderer = new Z.GLRenderer(domElement);
    renderer.setScene(scene);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 15, 2), new Z.Vec3(0, 0, 0));
    renderer.frameAll();
    renderer.resumeDrawing();

});