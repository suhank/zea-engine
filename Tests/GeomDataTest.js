

testingHarness.registerTest('GeomDataTest', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);

    // const envMap =  new Visualive.FileImage('HDR_041_Path_Ref0', Assets/HDR_041_Path_Ref0.vlh');
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
    
    // const renderer = new Visualive.GLRenderer(domElement);
    const renderer = new Visualive.GLRenderer(domElement);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(18, 17, 14), new Visualive.Vec3(0, 0, 1));
    renderer.exposure = 1.0;
    renderer.setScene(scene);

    /////////////////////////////////////
    // Obj Asset
    const asset = new Visualive.ObjAsset('obj');
    asset.getParameter('ObjFilePath').setValue("/Assets/cow.obj");
    asset.getParameter('splitObjects').setValue(false);
    asset.getParameter('splitGroupsIntoObjects').setValue(false);
    asset.getParameter('loadMtlFile').setValue(false);
    asset.getParameter('unitsConversion').setValue(1.0);
    asset.getParameter('defaultShader').setValue("StandardSurfaceShader");
    asset.setLocalXfo(new Visualive.Xfo(
        new Visualive.Vec3(0, 0, 3.55),
        new Visualive.Quat({rotateX: (Math.PI * 0.5) })
        ));
    scene.getRoot().addChild(asset);

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
    scene.getRoot().mouseDown.connect((event)=>{
        const { intersectionData } = event;
        if(intersectionData.intersectionPos) {
            addLocator(intersectionData.intersectionPos);
            event.vleStopPropagation = true;
        }
    });
    scene.getRoot().mouseMove.connect((event)=>{
        const { intersectionData } = event;
        if(intersectionData.dragging && intersectionData.intersectionPos) {
            addLocator(intersectionData.intersectionPos);
        }
    });

});


