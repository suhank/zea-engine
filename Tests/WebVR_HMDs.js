

testingHarness.registerTest('WebVR_HMDs', (domElement, resources)=> {

    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);
    scene.setupGrid(1.0, 10);

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Visualive.GLRenderer(domElement);
    // const renderer = new Visualive.GLRenderer(div);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1, -1, 0.5), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    // renderer.addGUI(gui);

    /////////////////////////////////////
    // Obj Asset
    const loadAsset = (path, tr) => {
        const holder = new Visualive.TreeItem(path);
        const xfo = new Visualive.Xfo(
            tr, 
            new Visualive.Quat({ setFromAxisAndAngle: [new Visualive.Vec3(1, 0, 0), Math.PI * 0.5] })
            );;
        holder.setLocalXfo(xfo);
        
        const viveAsset = scene.loadCommonAssetResource(path);
        holder.addChild(viveAsset);
        scene.getRoot().addChild(holder);
    }
    loadAsset("VisualiveEngine/Vive.vla", new Visualive.Vec3(0.2, 0, 0.0));
    loadAsset("VisualiveEngine/Oculus.vla", new Visualive.Vec3(-0.2, 0, 0.0));


    // viveAsset.loaded.connect((entries) => {
    //     const controllerTree = viveAsset.getChildByName('Controller');
    //     controllerTree.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0.25, 0,0)));
    // });


    renderer.resumeDrawing();
});