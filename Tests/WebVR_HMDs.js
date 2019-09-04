

testingHarness.registerTest('WebVR_HMDs', (domElement, resources)=> {
    const Z = ZeaEngine;

    /////////////////////////////////////
    // Scene
    const scene = new Z.Scene(resources);
    scene.setupGrid(1.0, 10);

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Z.GLRenderer(domElement);
    // const renderer = new Z.GLRenderer(div);

    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1, -1, 0.5), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    // renderer.addGUI(gui);

    /////////////////////////////////////
    // Obj Asset
    const loadAsset = (path, tr) => {
        const holder = new Z.TreeItem(path);
        const xfo = new Z.Xfo(
            tr, 
            new Z.Quat({ setFromAxisAndAngle: [new Z.Vec3(1, 0, 0), Math.PI * 0.5] })
            );;
        holder.setLocalXfo(xfo);
        
        const vrAsset = scene.loadCommonAssetResource(path);
        holder.addChild(vrAsset);
        scene.getRoot().addChild(holder);
        vrAsset.loaded.connect( () => {
            vrAsset.traverse( (i) => console.log( i.getPath()))
        });
    }
    loadAsset("ZeaEngine/Vive.vla", new Z.Vec3(0.2, 0, 0.0));
    loadAsset("ZeaEngine/Oculus.vla", new Z.Vec3(-0.2, 0, 0.0));


    // vrAsset.loaded.connect((entries) => {
    //     const controllerTree = vrAsset.getChildByName('Controller');
    //     controllerTree.setLocalXfo(new Z.Xfo(new Z.Vec3(0.25, 0,0)));
    // });


    renderer.resumeDrawing();
});