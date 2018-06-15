testingHarness.registerTest('GearsOperator', (domElement, resources)=> {
    const scene = new Visualive.Scene(resources);

    const asset = new Visualive.AssetItem('gears');
    scene.getRoot().addChild(asset);

    let index = 0;
    const gearBindings = [];
    let prevTeeth = 0;
    let prevRatio = 1.0;
    const addGear = (pos, radius, teeth, axis, color)=> {
        const gearGeom = new Visualive.Cylinder(radius, 0.2, teeth);
        const gearmaterial = new Visualive.Material('gearmaterial', 'SimpleSurfaceShader');
        gearmaterial.getParameter('baseColor').setValue(color);
        const geomItem = new Visualive.GeomItem('gear'+(index++), gearGeom, gearmaterial);
        const xfo = new Visualive.Xfo();
        xfo.tr = pos;
        // xfo.ori.setFromDirectionAndUpvector(axis, new Visualive.Vec3(1, 0, 0));
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);

        const ratio = ((prevTeeth > 0) ? (-prevTeeth / teeth) : 1.0);
        gearBindings.push({ geomItem, ratio: ratio * -prevRatio, axis});
        prevTeeth = teeth;
        prevRatio = ratio;
    }
    addGear(new Visualive.Vec3(0, 0, 0), 2.5, 12, new Visualive.Vec3(0, 0, 1), new Visualive.Color(1.0, 0.0, 0.0));
    addGear(new Visualive.Vec3(3.5, 0, 0), 1.2, 8, new Visualive.Vec3(0, 0, 1), new Visualive.Color(0.0, 0.0, 1.0));
    addGear(new Visualive.Vec3(3.5, 1.6, 0), 0.6, 5, new Visualive.Vec3(0, 0, 1), new Visualive.Color(1.0, 1.0, 0.0));


    const gearsOp = new Visualive.GearsOperator('Gears');
    asset.addComponent(gearsOp);
    const revolutionsParam = gearsOp.getParameter('Revolutions');
    revolutionsParam.setRange([0, 0.5]);
    const rpmParam = gearsOp.getParameter('RPM');
    rpmParam.setValue(12.0);
    rpmParam.setRange([0, 60]);

    for(let binding of gearBindings) {
        const gear = gearsOp.getParameter('Gears').addElement();
        gear.getMember('Ratio').setValue(binding.ratio)
        gear.getMember('Axis').setValue(binding.axis)
        const gearGeoms = gear.getMember('Items')
        gearGeoms.addElement(binding.geomItem);
    }

    const j = gearsOp.toJSON( { assetItem:asset } );
    console.log(JSON.stringify(j));
    asset.removeComponent('Gears');
    const gearsOp2 = new Visualive.GearsOperator('Gears2');
    asset.addComponent(gearsOp2);
    gearsOp2.fromJSON(j, { assetItem:asset } );

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 15, 10), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.setupGrid(20, new Visualive.Color(0.2, 0.2, 0.2), 10, 0);
    renderer.resumeDrawing();

    //////////////////////////////////
    // Setup the UI
    // const widgetPanel = new Visualive.UIWidgetPanel();

    // widgetPanel.addWidgetController(new Visualive.SliderController(revolutionsParam));
    // widgetPanel.addWidgetController(new Visualive.SliderController(rpmParam));

    // const uicontroller = new Visualive.UIController();
    // uicontroller.addWidgetPanel(widgetPanel);

    // VisualiveUI.renderUI(renderer, uicontroller);
});