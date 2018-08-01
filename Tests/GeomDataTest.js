

testingHarness.registerTest('GeomDataTest', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);

    // const envMap =  new Visualive.FileImage('Assets/HDR_041_Path_Ref0.vlh');
    // scene.setEnvMap(envMap);

    /////////////////////////////////////
    // Ground Plane
    const groundMaterial = new Visualive.Material('ground', 'StandardSurfaceShader');
    groundMaterial.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    groundMaterial.getParameter('Roughness').setValue(1.0);
    groundMaterial.getParameter('Metallic').setValue(0.0);
    const quad = new Visualive.Plane(20, 20);
    const groundPlaneItem = new Visualive.GeomItem('groundPlaneItem', quad, groundMaterial);
    scene.getRoot().addChild(groundPlaneItem);

    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Visualive.GLSimpleRenderer(domElement);
    const renderer = new Visualive.GLVisualiveRenderer(domElement);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(18, 17, 14), new Visualive.Vec3(0, 0, 1));
    renderer.exposure = 1.0;
    renderer.setScene(scene);

    /////////////////////////////////////
    // Obj Asset
    const objAsset = new Visualive.ObjAsset('obj');
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

    objAsset.getParameter('ObjFilePath').setValue("/Assets/cow.obj");


    const controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();

    /////////////////////////////////////
    // Locators
    const locatorMaterial = new Visualive.Material('locator', 'SimpleSurfaceShader');
    locatorMaterial.getParameter('BaseColor').setValue(new Visualive.Color(1, 0, 0));
    const locator = new Visualive.Cuboid(.05, .05, .05);
    let index = 0;
    const addLocator = (pos) => {
        const locatorItem = new Visualive.GeomItem('locatorItem'+(index++), locator, locatorMaterial);
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


