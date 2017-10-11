var GearsOperator = (domElement, resources)=> {
    let scene = new Visualive.Scene(resources);

    let asset = new Visualive.TreeItem('gears');
    scene.getRoot().addChild(asset);

    let index = 0;
    let gearBindings = [];
    let prevTeeth = 0;
    let addGear = (pos, radius, teeth, axis, color)=> {
        let gearGeom = new Visualive.Cylinder(radius, 0.2, teeth);
        let gearmaterial = new Visualive.Material('gearmaterial', 'SimpleSurfaceShader');
        gearmaterial.addParameter('baseColor', color);
        let geomItem = new Visualive.GeomItem('gear'+(index++), gearGeom, gearmaterial);
        let xfo = new Visualive.Xfo();
        xfo.tr = pos;
        // xfo.ori.setFromDirectionAndUpvector(axis, new Visualive.Vec3(1, 0, 0));
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);

        gearBindings.push({ path: geomItem.getPath(), ratio:((prevTeeth > 0) ? (-prevTeeth / teeth) : 1.0), axis});
        prevTeeth = teeth;
    }
    addGear(new Visualive.Vec3(0, 0, 0), 2.5, 12, new Visualive.Vec3(0, 1, 0), new Visualive.Color(1.0, 0.0, 0.0));
    addGear(new Visualive.Vec3(3.5, 0, 0), 1.2, 8, new Visualive.Vec3(0, 1, 0), new Visualive.Color(0.0, 0.0, 1.0));
    addGear(new Visualive.Vec3(3.5, 0, 1.6), 0.6, 5, new Visualive.Vec3(0, 1, 0), new Visualive.Color(1.0, 1.0, 0.0));


    let op = new Visualive.GearsOperator(scene.getRoot());
    let revolutionsParam = op.getParameter('Revolutions');
    revolutionsParam.setRange([0, 0.5]);
    let rpmParam = op.getParameter('RPM');
    rpmParam.setValue(12.0);
    rpmParam.setRange([0, 60]);
    op.connectParts(gearBindings);



    let renderer = new Visualive.GLSimpleRenderer(div);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 10, 15), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.setupGrid(20, new Visualive.Color(0.2, 0.2, 0.2), 10, 0);
    renderer.resumeDrawing();

    //////////////////////////////////
    // Setup the UI
    let widgetPanel = new Visualive.UIWidgetPanel();

    widgetPanel.addWidgetController(new Visualive.SliderController(revolutionsParam));
    widgetPanel.addWidgetController(new Visualive.SliderController(rpmParam));

    let uicontroller = new Visualive.UIController();
    uicontroller.addWidgetPanel(widgetPanel);

    VisualiveUI.renderUI(renderer, uicontroller);
}