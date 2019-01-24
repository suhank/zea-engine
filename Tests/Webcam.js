

testingHarness.registerTest('Webcam', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);
    scene.setupGrid(60.0, 6);

    // Note: 'back' for the Vive USB camera.
    let webcamimage = new Visualive.WebcamImage2D(640, 480, false);

    const material = new Visualive.Material('wecam', 'FlatSurfaceShader');
    material.addParameter('BaseColor', webcamimage);

    const plane =new Visualive.Plane(2.0, 1.5);

    const geomItem = new Visualive.GeomItem('PlaneItem', plane, material);
    geomItem.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,0,1)));
    scene.getRoot().addChild(geomItem);


    const renderer = new Visualive.GLRenderer(domElement);
    // renderer.getViewport().setBackground(webcamimage);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,1,2), new Visualive.Vec3(0,0,1));

    // renderer.vrViewportSetup.connect((vrvp)=>{
    //     const geomItem = new Visualive.GeomItem('BG', plane, material);
    //     geomItem.localXfo.sc.set(8, 8, 1);
    //     geomItem.localXfo.tr.set(0, -4, -8);
    //     // geomItem.localXfo.ori.rotateX(-0.15);
    //     vrvp.getVRHead().getTreeItem().addChild(geomItem);
    // })

    renderer.setScene(scene);
    renderer.resumeDrawing();
});