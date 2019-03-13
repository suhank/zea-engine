

testingHarness.registerTest('Vive', (domElement, resources)=> {

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
    const viveAsset = scene.loadCommonAssetResource("VisualiveEngine/Oculus.vla");

    const materialLibrary = viveAsset.getMaterialLibrary();
    const materialNames = materialLibrary.getMaterialNames();
    for (let name of materialNames) {
        const material = materialLibrary.getMaterial(name, false);
        if (material) {
            material.visibleInGeomDataBuffer = false;
            material.setShaderName('SimpleSurfaceShader');
        }
    }

    const xfo = new Visualive.Xfo(
        new Visualive.Vec3(0, -0.035, 0.01), 
        new Visualive.Quat({ setFromAxisAndAngle: [new Visualive.Vec3(1, 0, 0), Math.PI * 0.5] }),
        new Visualive.Vec3(0.01, 0.01, 0.01)
        );;
    viveAsset.setLocalXfo(xfo);

    scene.getRoot().addChild(viveAsset);


    // viveAsset.loaded.connect((entries) => {
    //     const controllerTree = viveAsset.getChildByName('Controller');
    //     controllerTree.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(0.25, 0,0)));
    // });


    renderer.resumeDrawing();
});