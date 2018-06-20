

testingHarness.registerTest('GeomDataTest', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);

    let envMap =  new Visualive.FileImage('Assets/HDR_041_Path_Ref0.vlh');
    scene.setEnvMap(envMap);

    /////////////////////////////////////
    // Ground Plane
    let groundMaterial = new Visualive.Material('ground', 'StandardSurfaceShader');
    groundMaterial.addParameter('baseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    groundMaterial.addParameter('roughness', 1.0);
    groundMaterial.addParameter('metallic', 0.0);
    let quad = new Visualive.Plane(20, 20);
    let groundPlaneItem = new Visualive.GeomItem('groundPlaneItem', quad, groundMaterial);
    scene.getRoot().addChild(groundPlaneItem);

    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Visualive.GLSimpleRenderer(domElement);
    const renderer = new Visualive.GLVisualiveRenderer(domElement);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(8, 7, 4), new Visualive.Vec3(3, 3, 0));
    renderer.exposure = 1.0;
    renderer.setScene(scene);
    // renderer.addGUI(gui);

    /////////////////////////////////////
    // Obj Asset
    let objAsset = new Visualive.ObjAsset('obj');
    objAsset.getParameter('splitObjects').setValue(false);
    objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
    objAsset.getParameter('loadMtlFile').setValue(false);
    objAsset.getParameter('unitsConversion').setValue(1.0);
    objAsset.getParameter('defaultShader').setValue("StandardSurfaceShader");
    objAsset.setLocalXfo(new Visualive.Xfo(
        new Visualive.Vec3(0, 0, 3.55), 
        new Visualive.Quat({rotateX: (Math.PI * 0.5) })
        ));
    scene.getRoot().addChild(objAsset);

    objAsset.loaded.connect(function() {
        renderer.frameAll();
    });
    objAsset.getParameter('FilePath').setValue("/Assets/cow.obj");


    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();

    /////////////////////////////////////
    // Locators
    let locatorMaterial = new Visualive.Material('locator', 'SimpleSurfaceShader');
    locatorMaterial.addParameter('baseColor', new Visualive.Color(1, 0, 0));
    let locator = new Visualive.Cuboid(.05, .05, .05);
    let index = 0;
    let addLocator = (pos) => {
        let locatorItem = new Visualive.GeomItem('locatorItem'+(index++), locator, locatorMaterial);
        locatorItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(locatorItem);
    }
    scene.getRoot().mouseDown.connect((event, intersectionData)=>{
        if(intersectionData.intersectionPos) {
            addLocator(intersectionData.intersectionPos);
            event.vleStopPropagation = true;
        }
    });
    scene.getRoot().mouseMove.connect((event, intersectionData)=>{
        if(intersectionData.dragging && intersectionData.intersectionPos) {
            addLocator(intersectionData.intersectionPos);
        }
    });

});


