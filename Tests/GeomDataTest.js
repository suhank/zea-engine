

testingHarness.registerTest('GeomDataTest', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    let scene = new Visualive.Scene(resources);


    /////////////////////////////////////
    // Ground Plane
    let groundMaterial = new Visualive.Material('ground', 'SimpleSurfaceShader');
    groundMaterial.addParameter('baseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    groundMaterial.addParameter('roughness', 1.0);
    groundMaterial.addParameter('metallic', 0.0);
    let quad = new Visualive.Plane(20, 20);
    let groundPlaneItem = new Visualive.GeomItem('groundPlaneItem', quad, groundMaterial);
    groundPlaneItem.getLocalXfo().ori.rotateX(Math.PI * -0.5);
    scene.getRoot().addChild(groundPlaneItem);

    /////////////////////////////////////
    // Renderer
    
    let renderer = new Visualive.GLSimpleRenderer(domElement);
    // let renderer = new Visualive.GLVisualiveRenderer(div);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(8, 7, 4), new Visualive.Vec3(3, 3, 0));
    renderer.setScene(scene);
    // renderer.addGUI(gui);

    /////////////////////////////////////
    // Obj Asset
    let objAsset = new Visualive.ObjAsset('obj', scene.getResourceLoader());
    objAsset.getParameter('splitObjects').setValue(true);
    objAsset.getParameter('splitGroupsIntoObjects').setValue(true);
    objAsset.getParameter('loadMtlFile').setValue(false);
    objAsset.getParameter('unitsConversion').setValue(1.0);
    objAsset.getParameter('defaultShader').setValue("SimpleSurfaceShader");
    objAsset.getLocalXfo().tr.set(0, 3.55, 0);
    scene.getRoot().addChild(objAsset);

    objAsset.loaded.connect(function() {
        renderer.frameAll();
    });
    objAsset.getParameter('FilePath').setValue("/Assets/cow.obj");


    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();

});


