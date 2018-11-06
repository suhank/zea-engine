
testingHarness.registerTest('Cutaway', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);

    let asset = new Visualive.TreeItem('asset');

    let bigSphere = new Visualive.Sphere(8.0, 32, 32);
    let bigSphereMaterial = new Visualive.Material('bigSphereMaterial', 'SimpleSurfaceShader');
    bigSphereMaterial.addParameter('BaseColor', new Visualive.Color(0.0, 1.0, 0.0));
    let bigSphereItem = new Visualive.GeomItem('bigSphere', bigSphere, bigSphereMaterial);
    asset.addChild(bigSphereItem, false);
    scene.getRoot().addChild(asset);


    /////////////////////////////////////
    // Obj Asset
    let objAsset = new Visualive.ObjAsset('obj');
    objAsset.getParameter('splitObjects').setValue(false);
    objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
    objAsset.getParameter('loadMtlFile').setValue(false);
    objAsset.getParameter('unitsConversion').setValue(1.0);
    objAsset.getParameter('defaultShader').setValue("SimpleCutawaySurfaceShader");
    scene.addAsset(objAsset);

    let cutAmount = -10.0;
    let cutParam = new Visualive.NumberParameter('planeDist', cutAmount, [-10, 10]);
    let cutDir = new Visualive.Vec3Parameter('planeNormal', new Visualive.Vec3(-1, 0, 0));

    objAsset.getParameter('ObjFilePath').setValue("/Assets/CutawayAndExplode.obj");
    objAsset.loaded.connect(function() {
        renderer.frameAll();
        renderer.resumeDrawing();
        objAsset.getMaterialLibrary().getMaterialNames().forEach((materialName)=>{
            const material = objAsset.getMaterialLibrary().getMaterial(materialName);
            material.addParameterInstance(cutParam);
            material.addParameterInstance(cutDir);
        });

        let animatingValue = false;
        let timeoutId;
        let timerCallback = () => {
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


    const renderer = new Visualive.GLRenderer(domElement, { enableCrossSections:true });
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-24, 24, 2), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);

});