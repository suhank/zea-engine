testingHarness.registerTest('StateMachine', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);
    const camera = new Visualive.Camera();
    camera.setPositionAndTarget(new Visualive.Vec3(35, 0, -35), new Visualive.Vec3(12, 0, 0));


    /////////////////////////////////////

    let asset = new Visualive.TreeItem('asset');
    let parts = new Visualive.TreeItem('parts');
    asset.addChild(parts);
    scene.getRoot().addChild(asset);

    let middleSphere = new Visualive.Sphere(2.5);
    let middleSphereMaterial = new Visualive.Material('middleSphereMaterial', 'SimpleSurfaceShader');
    middleSphereMaterial.addParameter('BaseColor', new Visualive.Color(0.0, 0.0, 1.0));
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere1', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, 3.5);
        parts.addChild(middleSphereItem);
    }
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere2', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, -3.5);
        parts.addChild(middleSphereItem);
    }
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere3', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, 3.5);
        parts.addChild(middleSphereItem);
    }
    {
        let middleSphereItem = new Visualive.GeomItem('middleSphere4', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, -3.5);
        parts.addChild(middleSphereItem);
    }

    let littleSphere = new Visualive.Sphere(2.0);
    let littleSphereMaterial = new Visualive.Material('littleSphereMaterial', 'SimpleSurfaceShader');
    littleSphereMaterial.addParameter('BaseColor', new Visualive.Color(1.0, 0.0, 0.0));
    let littleSphereItem = new Visualive.GeomItem('littleSphere', littleSphere, littleSphereMaterial);
    parts.addChild(littleSphereItem);

    let bolt = new Visualive.Cuboid(1.2, 1.2, 1.2);
    let boltmaterial = new Visualive.Material('boltmaterial', 'SimpleSurfaceShader');
    boltmaterial.addParameter('BaseColor', new Visualive.Color(1.0, 0.5, 0.0));

    let index = 0;
    let addBolt = (pos)=> {
        const geomItem = new Visualive.GeomItem('bolt'+(index++), bolt, boltmaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        parts.addChild(geomItem);
    }
    addBolt(new Visualive.Vec3(6.6, 5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, 5.2, -5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, -5.2));


    /////////////////////////////////////
    // Obj Asset
    {

        let objAsset = new Visualive.ObjAsset('PartA');
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        objAsset.getParameter('FilePath').setValue("/Assets/ExplodePartA.obj");
        asset.addChild(objAsset);

    }
    let op = new Visualive.ExplodePartsOperator('explodeOp');
    op.getParameter('Dist').setValue(30.0);
    asset.addItem(op);


    {
        let objAsset = new Visualive.ObjAsset('PartB');
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        objAsset.getParameter('FilePath').setValue("/Assets/ExplodePartB.obj");
        asset.addChild(objAsset);

        objAsset.loaded.connect(function() {

            op.connectParts([
                [
                    ['.', 'parts', 'bolt0'],
                    ['.', 'parts', 'bolt1'],
                    ['.', 'parts', 'bolt2'],
                    ['.', 'parts', 'bolt3'],
                    ['.', 'PartB', 'PartB'], 
                ],
                [
                    ['.', 'parts', 'middleSphere1'],
                    ['.', 'parts', 'middleSphere2'],
                    ['.', 'parts', 'middleSphere3'],
                    ['.', 'parts', 'middleSphere4']
                ]
                ]);

            // let explodedAmount = 0;
            // let animatingValue = false;
            // let timeoutId;
            // let param = op.getParameter('Explode');
            // let timerCallback = () => {
            //     // Check to see if the video has progressed to the next frame. 
            //     // If so, then we emit and update, which will cause a redraw.
            //     animatingValue = true;
            //     explodedAmount += 0.005;
            //     op.getParameter('Explode').setValue(explodedAmount);
            //     renderer.requestRedraw();
            //     if (explodedAmount < 1.0) {
            //         timeoutId = setTimeout(timerCallback, 20); // Sample at 50fps.
            //     }
            //     animatingValue = false;
            // };
            // timeoutId = setTimeout(timerCallback, 1000); // half second delay
            // param.valueChanged.connect(()=>{
            //     if(!animatingValue) {
            //         clearTimeout(timeoutId);
            //     }
            // });
            
            // renderer.resumeDrawing();



            //////////////////////////////////
            // Setup the StateMachine

            const bolts = new Visualive.Group('bolts');
            bolts.resolveItems(asset, [
                    ['.', 'parts', 'bolt0'],
                    ['.', 'parts', 'bolt1'],
                    ['.', 'parts', 'bolt2'],
                    ['.', 'parts', 'bolt3'],
                    ['.', 'PartB', 'PartB'], 
                ]);

            asset.addItem(bolts);

            const stateMachine = new Visualive.StateMachine();
            const cutawayState = new Visualive.State('cutawayState');
            const initialState = new Visualive.State('initialState');
            stateMachine.addState(initialState);
            stateMachine.addState(cutawayState);
            asset.addItem(stateMachine);


            const moveCameraToInitialCameraPos = new Visualive.MoveCamera(camera);
            moveCameraToInitialCameraPos.setCameraPosisionAndTarget(new Visualive.Vec3(35, 20, 35), new Visualive.Vec3(12, 0, 0));
            moveCameraToInitialCameraPos.getParameter('interpTime').setValue(3.0);
            initialState.addActivationAction(moveCameraToInitialCameraPos);


            const boltClicked = new Visualive.GeomClicked(camera);
            boltClicked.getParameter('path').setValue('asset/bolts');
            boltClicked.getParameter('targetState').setValue('cutawayState');
            initialState.addStateEvent(boltClicked);



            const moveCameraToCutawayPos = new Visualive.MoveCamera(camera);
            moveCameraToCutawayPos.setCameraPosisionAndTarget(new Visualive.Vec3(35, 20, -35), new Visualive.Vec3(12, 0, 0));
            moveCameraToCutawayPos.getParameter('interpTime').setValue(2.0);

            const setCutawayParam = new Visualive.SetParameterValue();
            setCutawayParam.getParameter('path').setValue('asset/explodeOp:parameter>Explode');
            setCutawayParam.getParameter('interpTime').setValue(3.0);
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

    //////////////////////////////////
    // Setup the UI

    // let sliderController = new Visualive.SliderController(op.getParameter('Explode'));

    // let widgetPanel = new Visualive.UIWidgetPanel();
    // widgetPanel.addWidgetController(sliderController);

    // let uicontroller = new Visualive.UIController();
    // uicontroller.addWidgetPanel(widgetPanel);


    // VisualiveUI.renderUI(renderer, uicontroller);

});