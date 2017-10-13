

testingHarness.registerTest('Vive', (domElement, resources)=> {

    /////////////////////////////////////
    // Scene
    let scene = new Visualive.Scene(resources);

    /////////////////////////////////////
    // Renderer
    
    let renderer = new Visualive.GLSimpleRenderer(domElement);
    // let renderer = new Visualive.GLVisualiveRenderer(div);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(8, 7, 4), new Visualive.Vec3(3, 3, 0));
    renderer.setScene(scene);
    // renderer.addGUI(gui);

    /////////////////////////////////////
    // Obj Asset
    let viveAsset = scene.loadCommonAssetResource("VisualiveEngine/Vive.vla");
    viveAsset.getMaterialLibrary().setMaterialTypeMapping( { '*': 'SimpleSurfaceShader' });
    scene.getRoot().addChild(viveAsset);


    viveAsset.loaded.connect((entries) => {
        let controllerTree = viveAsset.getChildByName('HTC_Vive_Controller').clone();
        controllerTree.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0, -0.035, 0.01), new Visualive.Quat({ setFromAxisAndAngle: [new Visualive.Vec3(0, 1, 0), Math.PI] })));
        scene.getRoot().addChild(controllerTree);
    });

    viveAsset.allPartsLoaded.connect(()=>{
        renderer.frameAll();
    })


    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();
    renderer.setupGrid(1, new Visualive.Color(0, 0, 0), 50);
});