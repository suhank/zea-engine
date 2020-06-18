
testingHarness.registerTest('Geometry/Labels', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    const scene = new Z.Scene(resources);
    scene.setupGrid(20, 10);

    // Z.resourceLoader.addResourceURL('Assets/Default.labels')
    // scene.getResourceLoader().addResourceURL('Assets/Labels.xlsx')

    const asset = new Z.TreeItem('labels');

    let index = 0;
    const addLabel = (lineEndPos, pos, color, name)=> {
        const label = new Z.Label(name, 'Labels');
        label.getParameter('fontSize').setValue(48);
        label.getParameter('backgroundColor').setValue(color);
        const billboard = new Z.BillboardItem('billboard'+index, label);
        const xfo = new Z.Xfo(pos);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(1);
        billboard.getParameter('alignedToCamera').setValue(true);
        billboard.getParameter('alpha').setValue(1);
        billboard.getParameter('lineEnd').addElement(lineEndPos);
        billboard.getChildByName('line0').getMaterial().getParameter('Color').setValue(new Z.Color(.7, .7, .7));
        asset.addChild(billboard);

        // const timeoutId = setTimeout(() => {
        //     console.log(label.getParameter('text').getValue() + ": changed");
        //     billboard.getParameter('alpha').setValue(1.0);
        // }, (0.5 + Math.random()) * 2000);

        index++;
    }
    addLabel(new Z.Vec3(1, 0, 0), new Z.Vec3(1, 1, 1), new Z.Color(0, 1, 0), "Hello");
    addLabel(new Z.Vec3(-1, 0, 0), new Z.Vec3(-1, -1, 1), new Z.Color(1, 1, 0), "Long");
    addLabel(new Z.Vec3(-0.69, 0, 0), new Z.Vec3(-0.69, 0.05, 0.08), new Z.Color(1, 1, 0), "LeftHWheelSensor");
    addLabel(new Z.Vec3(0.04, 0, 0), new Z.Vec3(0.04, -0.02, 0.25), new Z.Color(1, 1, 0), "AverageWheelSpeedSensor");
    addLabel(new Z.Vec3(-0.25, 0, 0), new Z.Vec3(-0.25, 0.0, 0.05), new Z.Color(1, 1, 0), "SpiderGearCarrierAssembly");
    addLabel(new Z.Vec3(0.295, 0, 0), new Z.Vec3(0.295, 0.0, 0.35), new Z.Color(1, 1, 0), "ClutchPack");
    addLabel(new Z.Vec3(0.505, 0, 0), new Z.Vec3(0.505, 0.0, 0.25), new Z.Color(1, 1, 0), "ClutchBallandRamp");
    addLabel(new Z.Vec3(0.75, 0, 0), new Z.Vec3(0.75, 0.03, 0.11), new Z.Color(1, 1, 0), "FrontDiffLockActuator");

    scene.getRoot().addChild(asset);

    // const j = asset.toJSON();
    // console.log(j)
    // const asset2 = new Z.TreeItem('asset2');
    // asset2.fromJSON(j);
    // scene.getRoot().addChild(asset2);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(5, 6, 3), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.resumeDrawing();

    
});