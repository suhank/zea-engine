

testingHarness.registerTest('GeomDataTest', (domElement, resources)=> {
    const Z = ZeaEngine;
    /////////////////////////////////////
    // Scene
    const scene = new Z.Scene(resources);

    // const envMap =  new Z.FileImage('HDR_041_Path_Ref0', Assets/HDR_041_Path_Ref0.vlh');
    // scene.setEnvMap(envMap);

    /////////////////////////////////////
    // Ground Plane
    const groundMaterial = new Z.Material('ground', 'StandardSurfaceShader');
    groundMaterial.getParameter('BaseColor').setValue(new Z.Color(89 / 255, 182 / 255, 92 / 255));
    groundMaterial.getParameter('Roughness').setValue(1.0);
    groundMaterial.getParameter('Metallic').setValue(0.0);
    const quad = new Z.Plane(20, 20);
    const groundPlaneItem = new Z.GeomItem('groundPlaneItem', quad, groundMaterial);
    scene.getRoot().addChild(groundPlaneItem);

    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Z.GLRenderer(domElement);
    const renderer = new Z.GLRenderer(domElement);

    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(18, 17, 14), new Z.Vec3(0, 0, 1));
    renderer.exposure = 1.0;
    renderer.setScene(scene);

    /////////////////////////////////////
    // Obj Asset
    const asset = new Z.ObjAsset('obj');
    asset.getParameter('ObjFilePath').setValue("/Assets/cow.obj");
    asset.getParameter('splitObjects').setValue(false);
    asset.getParameter('splitGroupsIntoObjects').setValue(false);
    asset.getParameter('loadMtlFile').setValue(false);
    asset.getParameter('unitsConversion').setValue(1.0);
    asset.getParameter('defaultShader').setValue("StandardSurfaceShader");
    asset.setLocalXfo(new Z.Xfo(
        new Z.Vec3(0, 0, 3.55),
        new Z.Quat({rotateX: (Math.PI * 0.5) })
        ));
    scene.getRoot().addChild(asset);

    renderer.resumeDrawing();

    /////////////////////////////////////
    // Locators
    const locatorMaterial = new Z.Material('locator', 'SimpleSurfaceShader');
    locatorMaterial.getParameter('BaseColor').setValue(new Z.Color(1, 0, 0));
    const locator = new Z.Cuboid(.05, .05, .05);
    let index = 0;
    const addLocator = (pos) => {
        const locatorItem = new Z.GeomItem('locatorItem'+(index++), locator, locatorMaterial);
        locatorItem.setLocalXfo(new Z.Xfo(pos));
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


