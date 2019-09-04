

testingHarness.registerTest('Webcam', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(60.0, 6);

    // Note: 'back' for the Vive USB camera.
    let webcamimage = new Z.WebcamImage2D(640, 480, false);

    const material = new Z.Material('wecam', 'FlatSurfaceShader');
    material.addParameter('BaseColor', webcamimage);

    const plane =new Z.Plane(2.0, 1.5);

    const geomItem = new Z.GeomItem('PlaneItem', plane, material);
    geomItem.setLocalXfo(new Z.Xfo(new Z.Vec3(0,0,1)));
    scene.getRoot().addChild(geomItem);


    const renderer = new Z.GLRenderer(domElement);
    // renderer.getViewport().setBackground(webcamimage);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1,1,2), new Z.Vec3(0,0,1));

    // renderer.vrViewportSetup.connect((vrvp)=>{
    //     const geomItem = new Z.GeomItem('BG', plane, material);
    //     geomItem.localXfo.sc.set(8, 8, 1);
    //     geomItem.localXfo.tr.set(0, -4, -8);
    //     // geomItem.localXfo.ori.rotateX(-0.15);
    //     vrvp.getVRHead().getTreeItem().addChild(geomItem);
    // })

    renderer.setScene(scene);
    renderer.resumeDrawing();
});