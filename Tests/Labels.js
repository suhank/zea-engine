
testingHarness.registerTest('Labels', (domElement, resources)=> {
    
    const scene = new Visualive.Scene(resources);

    // Visualive.resourceLoader.addResourceURL('Assets/Default.labels')
    Visualive.resourceLoader.addResourceURL('Assets/Labels.xlsx')

    const asset = new Visualive.TreeItem('labels');

    let index = 0;
    const addLabel = (lineEndPos, pos, color, name)=> {
        const label = new Visualive.Label(name, 'Labels');
        label.getParameter('fontSize').setValue(48);
        label.getParameter('fontColor').setValue(color);
        const billboard = new Visualive.BillboardItem('billboard'+index, label);
        const xfo = new Visualive.Xfo(pos);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(1);
        billboard.getParameter('alignedToCamera').setValue(true);
        billboard.getParameter('alpha').setValue(1);
        billboard.getParameter('lineEnd').addElement(lineEndPos);
        billboard.getChildByName('line0').getMaterial().getParameter('Color').setValue(new Visualive.Color(.7, .7, .7));
        asset.addChild(billboard);

        // const timeoutId = setTimeout(() => {
        //     console.log(label.getParameter('text').getValue() + ": changed");
        //     billboard.getParameter('alpha').setValue(1.0);
        // }, (0.5 + Math.random()) * 2000);

        index++;
    }
    addLabel(new Visualive.Vec3(1, 0, 0), new Visualive.Vec3(1, 1, 1), new Visualive.Color(0, 1, 0), "Hello");
    addLabel(new Visualive.Vec3(-1, 0, 0), new Visualive.Vec3(-1, -1, 1), new Visualive.Color(1, 1, 0), "Long");
    addLabel(new Visualive.Vec3(-0.69, 0, 0), new Visualive.Vec3(-0.69, 0.05, 0.08), new Visualive.Color(1, 1, 0), "LeftHWheelSensor");
    addLabel(new Visualive.Vec3(0.04, 0, 0), new Visualive.Vec3(0.04, -0.02, 0.25), new Visualive.Color(1, 1, 0), "AverageWheelSpeedSensor");
    addLabel(new Visualive.Vec3(-0.25, 0, 0), new Visualive.Vec3(-0.25, 0.0, 0.05), new Visualive.Color(1, 1, 0), "SpiderGearCarrierAssembly");
    addLabel(new Visualive.Vec3(0.295, 0, 0), new Visualive.Vec3(0.295, 0.0, 0.35), new Visualive.Color(1, 1, 0), "ClutchPack");
    addLabel(new Visualive.Vec3(0.505, 0, 0), new Visualive.Vec3(0.505, 0.0, 0.25), new Visualive.Color(1, 1, 0), "ClutchBallandRamp");
    addLabel(new Visualive.Vec3(0.75, 0, 0), new Visualive.Vec3(0.75, 0.03, 0.11), new Visualive.Color(1, 1, 0), "FrontDiffLockActuator");

    scene.getRoot().addChild(asset);

    // const j = asset.toJSON();
    // console.log(j)
    // const asset2 = new Visualive.TreeItem('asset2');
    // asset2.fromJSON(j);
    // scene.getRoot().addChild(asset2);

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(5, 6, 3), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.setupGrid(20, new Visualive.Color(0.2, 0.2, 0.2), 10, 0);
    renderer.resumeDrawing();

    //////////////////////////////////
    // Setup the UI
    const uicontroller = new Visualive.UIController();
    VisualiveUI.renderUI(renderer, uicontroller);
    
});