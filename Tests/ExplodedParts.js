testingHarness.registerTest('ExplodedParts', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);

    const asset = new Z.AssetItem('parts');

    const middleSphere = new Z.Sphere(2.5);
    const middleSphereMaterial = new Z.Material('middleSphereMaterial', 'SimpleSurfaceShader');
    middleSphereMaterial.getParameter('BaseColor').setValue(new Z.Color(0.0, 0.0, 1.0));
    {
        const middleSphereItem = new Z.GeomItem('middleSphere1', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, 3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Z.GeomItem('middleSphere2', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, -3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Z.GeomItem('middleSphere3', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, 3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Z.GeomItem('middleSphere4', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, -3.5);
        asset.addChild(middleSphereItem, false);
    }

    const littleSphere = new Z.Sphere(2.0);
    const littleSphereMaterial = new Z.Material('littleSphereMaterial', 'SimpleSurfaceShader');
    littleSphereMaterial.getParameter('BaseColor').setValue(new Z.Color(1.0, 0.0, 0.0));
    const littleSphereItem = new Z.GeomItem('littleSphere', littleSphere, littleSphereMaterial);
    asset.addChild(littleSphereItem, false);

    const bolt = new Z.Cuboid(1.2, 1.2, 1.2);
    const boltmaterial = new Z.Material('boltmaterial', 'SimpleSurfaceShader');
    boltmaterial.getParameter('BaseColor').setValue(new Z.Color(1.0, 0.5, 0.0));

    let index = 1;
    const addBolt = (pos)=> {
        const geomItem = new Z.GeomItem('bolt'+(index++), bolt, boltmaterial);
        geomItem.setLocalXfo(new Z.Xfo(pos));
        asset.addChild(geomItem, false);
    }
    addBolt(new Z.Vec3(6.6, 5.2, 5.2));
    addBolt(new Z.Vec3(6.6, 5.2, -5.2));
    addBolt(new Z.Vec3(6.6, -5.2, 5.2));
    addBolt(new Z.Vec3(6.6, -5.2, -5.2));

    /////////////////////////////////////
    // Groups
    const boltsGroup = new Z.Group("BoltsGroup");
    asset.addChild(boltsGroup)
    boltsGroup.addItem(asset.resolvePath(['bolt1']));
    boltsGroup.addItem(asset.resolvePath(['bolt2']));
    boltsGroup.addItem(asset.resolvePath(['bolt3']));
    boltsGroup.addItem(asset.resolvePath(['bolt4']));
    boltsGroup.getParameter('InitialXfoMode').setValue('average');

    const middleSpheresGroup = new Z.Group("MiddleSpheresGroup");
    asset.addChild(middleSpheresGroup)
    middleSpheresGroup.addItem(asset.resolvePath(['middleSphere1']));
    middleSpheresGroup.addItem(asset.resolvePath(['middleSphere2']));
    middleSpheresGroup.addItem(asset.resolvePath(['middleSphere3']));
    middleSpheresGroup.addItem(asset.resolvePath(['middleSphere4']));
    // middleSpheresGroup.recalcInitialXfo();
    middleSpheresGroup.getParameter('InitialXfoMode').setValue('average');

    /////////////////////////////////////
    // Obj Asset
    {

        const objAsset = new Z.ObjAsset('PartA');
        objAsset.getParameter('ObjFilePath').setFilepath("/Assets/ExplodePartA.obj");
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        asset.addChild(objAsset);

    }


    scene.getRoot().addChild(asset);

    {
        const objAsset = new Z.ObjAsset('PartB');
        objAsset.getParameter('ObjFilePath').setFilepath("/Assets/ExplodePartB.obj");
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        asset.addChild(objAsset);
        objAsset.loaded.connect(function() {

            const explodedPartsOp = new Z.ExplodePartsOperator('ExplodeParts');
            asset.addComponent(explodedPartsOp);
            explodedPartsOp.getParameter('Dist').setValue(30.0);
            explodedPartsOp.getParameter('Cascade').setValue(false);

            const bolts = explodedPartsOp.getParameter('Parts').addElement();
            bolts.getOutput().setParam(boltsGroup.getParameter('GlobalXfo'));

            const casing = explodedPartsOp.getParameter('Parts').addElement();
            casing.getOutput().setParam(asset.resolvePath(['PartB', 'GlobalXfo']))

            const internalBits = explodedPartsOp.getParameter('Parts').addElement();
            internalBits.getOutput().setParam(middleSpheresGroup.getParameter('GlobalXfo'));

            // const j = explodedPartsOp.toJSON( { assetItem:asset } );
            // console.log(JSON.stringify(j));
            // asset.removeComponent('ExplodeParts');
            // const explodedPartsOp2 = new Z.ExplodePartsOperator('ExplodeParts2');
            // asset.addComponent(explodedPartsOp2);
            // explodedPartsOp2.fromJSON(j, { assetItem:asset } );
            // explodedPartsOp = explodedPartsOp2;

            let explodedAmount = 0;
            let animatingValue = false;
            let timeoutId;
            const param = explodedPartsOp.getParameter('Explode');
            const timerCallback = () => {
                // Check to see if the video has progressed to the next frame. 
                // If so, then we emit and update, which will cause a redraw.
                animatingValue = true;
                explodedAmount += 0.01;
                explodedPartsOp.getParameter('Explode').setValue(explodedAmount);
                renderer.requestRedraw();
                if (explodedAmount < 1.0) {
                    timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
                }
                animatingValue = false;
            };
            timeoutId = setTimeout(timerCallback, 1000); // half second delay
            param.valueChanged.connect(()=>{
                if(!animatingValue) {
                    clearTimeout(timeoutId);
                }
            });
            renderer.resumeDrawing();
        });
    }




    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(35, 55, 20), new Z.Vec3(12, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();

});