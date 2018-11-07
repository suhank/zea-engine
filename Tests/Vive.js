

testingHarness.registerTest('Vive', (domElement, resources)=> {

    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Visualive.GLRenderer(domElement);
    // const renderer = new Visualive.GLRenderer(div);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(8, -4, 7), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    // renderer.addGUI(gui);

    /////////////////////////////////////
    // Obj Asset
    const viveAsset = scene.loadCommonAssetResource("VisualiveEngine/Vive.vla");
    viveAsset.getMaterialLibrary().setMaterialTypeMapping( { '*': 'SimpleSurfaceShader' });
    const xfo = new Visualive.Xfo(
        new Visualive.Vec3(0, -0.035, 0.01), 
        new Visualive.Quat({ setFromAxisAndAngle: [new Visualive.Vec3(1, 0, 0), Math.PI * 0.5] })
        );;
    viveAsset.setLocalXfo(xfo);

    scene.getRoot().addChild(viveAsset);


    viveAsset.loaded.connect((entries) => {
        const controllerTree = viveAsset.getChildByName('HTC_Vive_Controller');
        controllerTree.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0.25, 0,0)));
    });

    viveAsset.allPartsLoaded.connect(()=>{
        renderer.frameAll();
    })

    renderer.resumeDrawing();
    renderer.setupGrid(1, new Visualive.Color(0, 0, 0), 50);
});