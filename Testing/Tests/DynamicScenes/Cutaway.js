
testingHarness.registerTest('DynamicScenes/Cutaway', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    const renderer = new Z.GLRenderer(domElement, { enableCrossSections:true });
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-24, 24, 2), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);

    const asset = new Z.TreeItem('asset');

    const bigSphere = new Z.Sphere(8.0, 32, 32);
    const bigSphereMaterial = new Z.Material('bigSphereMaterial', 'SimpleSurfaceShader');
    bigSphereMaterial.getParameter('BaseColor').setValue(new Z.Color(0.0, 1.0, 0.0));
    const bigSphereItem = new Z.GeomItem('bigSphere', bigSphere, bigSphereMaterial);
    asset.addChild(bigSphereItem, false);
    scene.getRoot().addChild(asset);


    /////////////////////////////////////
    // Obj Asset
    const objAsset = new Z.ObjAsset('obj');
    objAsset.getParameter('splitObjects').setValue(false);
    objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
    objAsset.getParameter('loadMtlFile').setValue(false);
    objAsset.getParameter('unitsConversion').setValue(1.0);
    objAsset.getParameter('defaultShader').setValue("SimpleSurfaceShader");
    scene.addAsset(objAsset);

    let cutAmount = -10.0;
    const group = new Z.Group();
    group.addItem(objAsset)
    group.getParameter('CutAwayEnabled').setValue(true);
    const cutParam = group.getParameter('CutDist');
    const cutDir = group.getParameter('CutVector');
    cutParam.setValue(cutAmount);
    cutDir.setValue(new Z.Vec3(-1, 0, 0));

    objAsset.getParameter('ObjFilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/CutawayAndExplode.obj");
    objAsset.loaded.connect(function() {
        renderer.frameAll();
        renderer.resumeDrawing();

        let animatingValue = false;
        let timeoutId;
        const timerCallback = () => {
            // Check to see if the video has progressed to the next frame. 
            // If so, then we emit and update, which will cause a redraw.
            animatingValue = true;
            cutAmount += 0.05;
            cutParam.setValue(cutAmount);
            renderer.requestRedraw();
            if (cutAmount < 10.0) {
                timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
            }
            animatingValue = false;
        };
        timeoutId = setTimeout(timerCallback, 1000); // half second delay
        cutParam.valueChanged.connect(()=>{
            if(!animatingValue) {
                clearTimeout(timeoutId);
            }
        });


    });



});