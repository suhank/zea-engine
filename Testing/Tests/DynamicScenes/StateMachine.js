testingHarness.registerTest('DynamicScenes/StateMachine', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    const camera = new Z.Camera();
    camera.setPositionAndTarget(new Z.Vec3(35, -35, 0), new Z.Vec3(12, 0, 0));


    /////////////////////////////////////

    const asset = new Z.TreeItem('asset');
    const parts = new Z.TreeItem('parts');
    asset.addChild(parts);
    scene.getRoot().addChild(asset);

    const middleSphere = new Z.Sphere(2.5);
    const middleSphereMaterial = new Z.Material('middleSphereMaterial', 'SimpleSurfaceShader');
    middleSphereMaterial.addParameter('BaseColor', new Z.Color(0.0, 0.0, 1.0));
    {
        const middleSphereItem = new Z.GeomItem('middleSphere0', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, 3.5);
        parts.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Z.GeomItem('middleSphere1', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, -3.5);
        parts.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Z.GeomItem('middleSphere2', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, 3.5);
        parts.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Z.GeomItem('middleSphere3', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, -3.5);
        parts.addChild(middleSphereItem, false);
    }

    const littleSphere = new Z.Sphere(2.0);
    const littleSphereMaterial = new Z.Material('littleSphereMaterial', 'SimpleSurfaceShader');
    littleSphereMaterial.getParameter('BaseColor').setValue(new Z.Color(1.0, 0.0, 0.0));
    const littleSphereItem = new Z.GeomItem('littleSphere', littleSphere, littleSphereMaterial);
    parts.addChild(littleSphereItem);

    const bolt = new Z.Cuboid(1.2, 1.2, 1.2);
    const boltmaterial = new Z.Material('boltmaterial', 'SimpleSurfaceShader');
    boltmaterial.getParameter('BaseColor').setValue(new Z.Color(1.0, 0.5, 0.0));

    let index = 0;
    const addBolt = (pos)=> {
        const geomItem = new Z.GeomItem('bolt'+(index++), bolt, boltmaterial);
        geomItem.setLocalXfo(new Z.Xfo(pos));
        parts.addChild(geomItem, false);
    }
    addBolt(new Z.Vec3(6.6, 5.2, 5.2));
    addBolt(new Z.Vec3(6.6, 5.2, -5.2));
    addBolt(new Z.Vec3(6.6, -5.2, 5.2));
    addBolt(new Z.Vec3(6.6, -5.2, -5.2));


    /////////////////////////////////////
    // Groups
    const boltsGroup = new Z.Group("BoltsGroup");
    asset.addChild(boltsGroup)
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt0']));
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt1']));
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt2']));
    boltsGroup.addItem(asset.resolvePath(['parts', 'bolt3']));
    boltsGroup.getParameter('InitialXfoMode').setValue('average');

    const middleSpheresGroup = new Z.Group("MiddleSpheresGroup");
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

        let objAsset = new Z.AssetItem('PartA');
        objAsset.getParameter('DataFilePath').setValue("/Assets/ExplodePartA.obj");
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        asset.addChild(objAsset);

    }


    {
        let objAsset = new Z.AssetItem('PartB');
        objAsset.getParameter('DataFilePath').setValue("/Assets/ExplodePartB.obj");
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        asset.addChild(objAsset);

        objAsset.addEventListener('loaded', event => {

            let explodedPartsOp = new Z.ExplodePartsOperator('explodeOp');
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

            const stateMachine = new Z.StateMachine();
            const cutawayState = new Z.State('cutawayState');
            const initialState = new Z.State('initialState');
            stateMachine.addState(initialState);
            stateMachine.addState(cutawayState);
            asset.addComponent(stateMachine);


            const moveCameraToInitialCameraPos = new Z.SetCameraPosisionAndTarget(camera);
            moveCameraToInitialCameraPos.setCameraPosisionAndTarget(new Z.Vec3(35, 20, 35), new Z.Vec3(12, 0, 0));
            moveCameraToInitialCameraPos.getParameter('interpTime').setValue(3.0);
            moveCameraToInitialCameraPos.getParameter('Camera').setValue(renderer.getViewport().getCamera());
            initialState.addActivationAction(moveCameraToInitialCameraPos);


            const boltClicked = new Z.GeomClicked(camera);
            boltClicked.getParameter('TreeItem').setValue(boltsGroup);
            const switchTocutawayStateState = new Z.SwitchState();
            switchTocutawayStateState.getParameter('TargetState').setValue('cutawayState')
            boltClicked.addAction(switchTocutawayStateState);
            initialState.addStateEvent(boltClicked);



            const moveCameraToCutawayPos = new Z.SetCameraPosisionAndTarget(camera);
            moveCameraToCutawayPos.setCameraPosisionAndTarget(new Z.Vec3(35, 20, -35), new Z.Vec3(12, 0, 0));
            moveCameraToCutawayPos.getParameter('interpTime').setValue(2.0);
            moveCameraToCutawayPos.getParameter('Camera').setValue(renderer.getViewport().getCamera());


            const setCutawayParam = new Z.SetParameterValue();
            setCutawayParam.getOutput('Param').setParam(explodedPartsOp.getParameter('Explode'));
            setCutawayParam.getParameter('Value').setValue(1);
            setCutawayParam.getParameter('InterpTime').setValue(3.0);
            cutawayState.addActivationAction(setCutawayParam);


            stateMachine.activateState('initialState');

        });
    }


    //////////////////////////////////
    // Setup the Renderer



    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().setCamera(camera);
    renderer.setScene(scene);
    renderer.resumeDrawing();

});