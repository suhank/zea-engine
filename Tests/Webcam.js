

testingHarness.registerTest('Webcam', (domElement, resources)=> {

    let scene = new Visualive.Scene(resources);
    let webcamimage = new Visualive.WebcamImage2D(640, 480, true);

    let material = new Visualive.Material('wecam', 'SimpleSurfaceShader');
    material.addParameter('baseColor', webcamimage);

    let plane = new Visualive.Plane(2.0, 1.5);

    let geomItem = new Visualive.GeomItem('PlaneItem', plane, material);
    geomItem.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0,0,1)));
    scene.getRoot().addChild(geomItem);


    let renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().setBackground(webcamimage);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,1,2), new Visualive.Vec3(0,0,1));

    // renderer.vrViewportSetup.connect((vrvp)=>{
    //     let geomItem = new Visualive.GeomItem('BG', plane, material);
    //     geomItem.localXfo.sc.set(8, 8, 1);
    //     geomItem.localXfo.tr.set(0, -4, -8);
    //     // geomItem.localXfo.ori.rotateX(-0.15);
    //     vrvp.getVRHead().getTreeItem().addChild(geomItem);
    // })

    renderer.setScene(scene);
    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();
});