testingHarness.registerTest('StateMachine', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);
    const camera = new Visualive.Camera();
    camera.setPositionAndTarget(new Visualive.Vec3(35, -35, 0), new Visualive.Vec3(12, 0, 0));


    /////////////////////////////////////

    const asset = new Visualive.TreeItem('asset');
    const parts = new Visualive.TreeItem('parts');
    asset.addChild(parts);
    scene.getRoot().addChild(asset);

    const middleSphere = new Visualive.Sphere(2.5);
    const middleSphereMaterial = new Visualive.Material('middleSphereMaterial', 'SimpleSurfaceShader');
    middleSphereMaterial.addParameter('BaseColor', new Visualive.Color(0.0, 0.0, 1.0));
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere0', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, 3.5);
        parts.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere1', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, -3.5);
        parts.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere2', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, 3.5);
        parts.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere3', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, -3.5);
        parts.addChild(middleSphereItem, false);
    }

    const littleSphere = new Visualive.Sphere(2.0);
    const littleSphereMaterial = new Visualive.Material('littleSphereMaterial', 'SimpleSurfaceShader');
    littleSphereMaterial.getParameter('BaseColor').setValue(new Visualive.Color(1.0, 0.0, 0.0));
    const littleSphereItem = new Visualive.GeomItem('littleSphere', littleSphere, littleSphereMaterial);
    parts.addChild(littleSphereItem);

    const bolt = new Visualive.Cuboid(1.2, 1.2, 1.2);
    const boltmaterial = new Visualive.Material('boltmaterial', 'SimpleSurfaceShader');
    boltmaterial.getParameter('BaseColor').setValue(new Visualive.Color(1.0, 0.5, 0.0));

    let index = 0;
    const addBolt = (pos)=> {
        const geomItem = new Visualive.GeomItem('bolt'+(index++), bolt, boltmaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        parts.addChild(geomItem, false);
    }
    addBolt(new Visualive.Vec3(6.6, 5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, 5.2, -5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, -5.2));


    /////////////////////////////////////
    // Groups
    const boltsGroup = new Visualive.Group("BoltsGroup");
    asset.addChild(boltsGroup)
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt0']));
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt1']));
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt2']));
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt3']));
    boltsGroup.getParameter('InitialXfoMode').setValue('average');

    const middleSpheresGroup = new Visualive.Group("MiddleSpheresGroup");
    asset.addChild(middleSpheresGroup)
    middleSpheresGroup.addItem(asset.resolvePath(['parts', 'middleSphere0']));
    middleSpheresGroup.addItem(asset.resolvePath(['parts', 'middleSphere1']));
    middleSpheresGroup.addItem(asset.resolvePath(['parts', 'middleSphere2']));
    middleSpheresGroup.addItem(asset.resolvePath(['parts', 'middleSphere3']));
    // middleSpheresGroup.recalcInitialXfo();
    middleSpheresGroup.getParameter('InitialXfoMode').setValue('average');

    /////////////////////////////////////
    // Obj Asset
    {

        let objAsset = new Visualive.AssetItem('PartA');
        objAsset.getParameter('DataFilePath').setValue("/Assets/ExplodePartA.obj");
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        asset.addChild(objAsset);

    }


    {
        let objAsset = new Visualive.AssetItem('PartB');
        objAsset.getParameter('DataFilePath').setValue("/Assets/ExplodePartB.obj");
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        asset.addChild(objAsset);

        objAsset.loaded.connect(function() {

            let explodedPartsOp = new Visualive.ExplodePartsOperator('explodeOp');
            explodedPartsOp.getParameter('Dist').setValue(30.0);
            // explodedPartsOp.getParameter('Cascade').setValue(true);

            const bolts = explodedPartsOp.getParameter('Parts').addElement();
            bolts.getOutput().setParam(boltsGroup.getParameter('GlobalXfo'));
            
            const casing = explodedPartsOp.getParameter('Parts').addElement();
            casing.getOutput().setParam(asset.resolvePath(['PartB', 'GlobalXfo']))

            const internalBits = explodedPartsOp.getParameter('Parts').addElement();
            internalBits.getOutput().setParam(middleSpheresGroup.getParameter('GlobalXfo'));


            const internalBits2 = explodedPartsOp.getParameter('Parts').addElement();
            internalBits2.getOutput().setParam(littleSphereItem.getParameter('GlobalXfo'));

            asset.addComponent(explodedPartsOp);

            //////////////////////////////////
            // Setup the StateMachine

            const stateMachine = new Visualive.StateMachine();
            const cutawayState = new Visualive.State('cutawayState');
            const initialState = new Visualive.State('initialState');
            stateMachine.addState(initialState);
            stateMachine.addState(cutawayState);
            asset.addComponent(stateMachine);


            const moveCameraToInitialCameraPos = new Visualive.SetCameraPosisionAndTarget(camera);
            moveCameraToInitialCameraPos.setCameraPosisionAndTarget(new Visualive.Vec3(35, 20, 35), new Visualive.Vec3(12, 0, 0));
            moveCameraToInitialCameraPos.getParameter('interpTime').setValue(3.0);
            moveCameraToInitialCameraPos.getParameter('Camera').setValue(renderer.getViewport().getCamera());
            initialState.addActivationAction(moveCameraToInitialCameraPos);


            const boltClicked = new Visualive.GeomClicked(camera);
            boltClicked.getParameter('TreeItem').setValue(boltsGroup);
            const switchTocutawayStateState = new Visualive.SwitchState();
            switchTocutawayStateState.getParameter('TargetState').setValue('cutawayState')
            boltClicked.addAction(switchTocutawayStateState);
            initialState.addStateEvent(boltClicked);



            const moveCameraToCutawayPos = new Visualive.SetCameraPosisionAndTarget(camera);
            moveCameraToCutawayPos.setCameraPosisionAndTarget(new Visualive.Vec3(35, 20, -35), new Visualive.Vec3(12, 0, 0));
            moveCameraToCutawayPos.getParameter('interpTime').setValue(2.0);
            moveCameraToCutawayPos.getParameter('Camera').setValue(renderer.getViewport().getCamera());


            const setCutawayParam = new Visualive.SetParameterValue();
            setCutawayParam.getOutput('Param').setParam(explodedPartsOp.getParameter('Explode'));
            setCutawayParam.getParameter('Value').setValue(1);
            setCutawayParam.getParameter('InterpTime').setValue(3.0);
            cutawayState.addActivationAction(setCutawayParam);


            stateMachine.activateState('initialState');

        });
    }


    //////////////////////////////////
    // Setup the Renderer



    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().setCamera(camera);
    renderer.setScene(scene);
    renderer.resumeDrawing();

});