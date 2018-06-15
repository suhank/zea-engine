testingHarness.registerTest('ExplodedPartsOperator', (domElement, resources)=> {
    const scene = new Visualive.Scene(resources);

    const asset = new Visualive.AssetItem('parts');

    const middleSphere = new Visualive.Sphere(2.5);
    const middleSphereMaterial = new Visualive.Material('middleSphereMaterial', 'SimpleSurfaceShader');
    middleSphereMaterial.addParameter('baseColor', new Visualive.Color(0.0, 0.0, 1.0));
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere1', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, 3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere2', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, 3.5, -3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere3', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, 3.5);
        asset.addChild(middleSphereItem, false);
    }
    {
        const middleSphereItem = new Visualive.GeomItem('middleSphere4', middleSphere, middleSphereMaterial);
        middleSphereItem.getLocalXfo().tr.set(0, -3.5, -3.5);
        asset.addChild(middleSphereItem, false);
    }

    const littleSphere = new Visualive.Sphere(2.0);
    const littleSphereMaterial = new Visualive.Material('littleSphereMaterial', 'SimpleSurfaceShader');
    littleSphereMaterial.addParameter('baseColor', new Visualive.Color(1.0, 0.0, 0.0));
    const littleSphereItem = new Visualive.GeomItem('littleSphere', littleSphere, littleSphereMaterial);
    asset.addChild(littleSphereItem, false);

    const bolt = new Visualive.Cuboid(1.2, 1.2, 1.2);
    const boltmaterial = new Visualive.Material('boltmaterial', 'SimpleSurfaceShader');
    boltmaterial.addParameter('baseColor', new Visualive.Color(1.0, 0.5, 0.0));

    let index = 0;
    const addBolt = (pos)=> {
        const geomItem = new Visualive.GeomItem('bolt'+(index++), bolt, boltmaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        asset.addChild(geomItem, false);
    }
    addBolt(new Visualive.Vec3(6.6, 5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, 5.2, -5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, 5.2));
    addBolt(new Visualive.Vec3(6.6, -5.2, -5.2));

    /////////////////////////////////////
    // Obj Asset
    {

        const objAsset = new Visualive.ObjAsset('PartA');
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        objAsset.getParameter('ObjFilePath').setValue("/Assets/ExplodePartA.obj");
        asset.addChild(objAsset);

    }


    scene.getRoot().addChild(asset);

    {
        const objAsset = new Visualive.ObjAsset('PartB');
        objAsset.getParameter('splitObjects').setValue(false);
        objAsset.getParameter('splitGroupsIntoObjects').setValue(false);
        objAsset.getParameter('loadMtlFile').setValue(false);
        objAsset.getParameter('defaultShader').setValue('SimpleSurfaceShader');
        objAsset.getParameter('ObjFilePath').setValue("/Assets/ExplodePartB.obj");
        asset.addChild(objAsset);
        objAsset.loaded.connect(function() {

            const explodedPartsOp = new Visualive.ExplodePartsOperator();
            asset.addComponent(explodedPartsOp);
            explodedPartsOp.getParameter('Dist').setValue(30.0);

            explodedPartsOp.connectParts([
                [
                    ['bolt0'],
                    ['bolt1'],
                    ['bolt2'],
                    ['bolt3']
                ],
                [
                    ['PartB', 'PartB'], 
                ],
                [
                    ['middleSphere1'],
                    ['middleSphere2'],
                    ['middleSphere3'],
                    ['middleSphere4']
                ]
                ]);

            let explodedAmount = 0;
            let animatingValue = false;
            let timeoutId;
            const param = explodedPartsOp.getParameter('Explode');
            const timerCallback = () => {
                // Check to see if the video has progressed to the next frame. 
                // If so, then we emit and update, which will cause a redraw.
                animatingValue = true;
                explodedAmount += 0.005;
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




    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(35, 35, 20), new Visualive.Vec3(12, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();

    //////////////////////////////////
    // Setup the UI

    // const sliderController = new Visualive.SliderController(explodedPartsOp.getParameter('Explode'));

    // const widgetPanel = new Visualive.UIWidgetPanel();
    // widgetPanel.addWidgetController(sliderController);

    // const uicontroller = new Visualive.UIController();
    // uicontroller.addWidgetPanel(widgetPanel);


    // VisualiveUI.renderUI(renderer, uicontroller);

});