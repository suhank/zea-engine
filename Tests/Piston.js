testingHarness.registerTest('Piston', (domElement, resources)=> {
    const scene = new Visualive.Scene(resources);

    const asset = new Visualive.AssetItem('parts');
    const steelmaterial = new Visualive.Material('steel', 'SimpleSurfaceShader');
    steelmaterial.getParameter('BaseColor').setValue(new Visualive.Color(0.2, 0.2, 0.2));
    const ringsmaterial = new Visualive.Material('rings', 'SimpleSurfaceShader');
    ringsmaterial.getParameter('BaseColor').setValue(new Visualive.Color(0.3, 0.3, 0.3));

    {
        const geomItem = new Visualive.GeomItem('Head', new Visualive.Cylinder(2, 3, 30), steelmaterial);
        const xfo = new Visualive.Xfo();
        xfo.tr.set(0, 0, 3.5);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }
    {
        const geomItem = new Visualive.GeomItem('HeadRing0', new Visualive.Cylinder(2.2, .2, 30), ringsmaterial);
        const xfo = new Visualive.Xfo();
        xfo.tr.set(0, 0, 4.5);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }
    {
        const geomItem = new Visualive.GeomItem('HeadRing1', new Visualive.Cylinder(2.2, .2, 30), ringsmaterial);
        const xfo = new Visualive.Xfo();
        xfo.tr.set(0, 0, 4.0);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }

    {
        const geomItem = new Visualive.GeomItem('Crank0', new Visualive.Cylinder(1, 4, 30), steelmaterial);
        const xfo = new Visualive.Xfo();
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, -3, 0);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }
    {
        const geomItem = new Visualive.GeomItem('Crank1', new Visualive.Cylinder(1, 4, 30), steelmaterial);
        const xfo = new Visualive.Xfo();
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, 3, 0);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }
    {
        const geomItem = new Visualive.GeomItem('CrankArm0', new Visualive.Cuboid(2, 1, 4), steelmaterial);
        const xfo = new Visualive.Xfo();
        // xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, -1.5, -1.5);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }
    {
        const geomItem = new Visualive.GeomItem('CrankArm1', new Visualive.Cuboid(2, 1, 4), steelmaterial);
        const xfo = new Visualive.Xfo();
        // xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, 1.5, -1.5);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }
    {
        const geomItem = new Visualive.GeomItem('CrankArmBar', new Visualive.Cylinder(0.7, 4, 30), steelmaterial);
        const xfo = new Visualive.Xfo();
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, 0, -3);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }

    {
        const geomItem = new Visualive.GeomItem('BigEnd', new Visualive.Cylinder(1.5, 2, 30), steelmaterial);
        const xfo = new Visualive.Xfo();
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, 0, -3);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }

    {
        const geomItem = new Visualive.GeomItem('SmallEnd', new Visualive.Cylinder(0.5, 2, 30), steelmaterial);
        const xfo = new Visualive.Xfo();
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, 0, 2);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }

    {
        const geomItem = new Visualive.GeomItem('Rod', new Visualive.Cuboid(2, 1, 4), steelmaterial);
        const xfo = new Visualive.Xfo();
        // xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1,0,0), Math.PI * 0.5)
        xfo.tr.set(0, 0, -0);
        geomItem.setLocalXfo(xfo);
        asset.addChild(geomItem);
    }

    const crankGroup = new Visualive.Group('crankGroup');
    asset.addChild(crankGroup);
    crankGroup.addItem(asset.resolvePath(['Crank0']));
    crankGroup.addItem(asset.resolvePath(['Crank1']));
    crankGroup.addItem(asset.resolvePath(['CrankArm0']));
    crankGroup.addItem(asset.resolvePath(['CrankArm1']));
    crankGroup.addItem(asset.resolvePath(['CrankArmBar']));


    const rodGroup = new Visualive.Group('rodGroup');
    asset.addChild(rodGroup);
    rodGroup.addItem(asset.resolvePath(['BigEnd']));
    rodGroup.addItem(asset.resolvePath(['SmallEnd']));
    rodGroup.addItem(asset.resolvePath(['Rod']));

    const capGroup = new Visualive.Group('capGroup');
    asset.addChild(capGroup);
    capGroup.addItem(asset.resolvePath(['Head']));
    capGroup.addItem(asset.resolvePath(['HeadRing0']));
    capGroup.addItem(asset.resolvePath(['HeadRing1']));

    const setupPistonOp = true;
    if(setupPistonOp) {
        const pistonOp = new Visualive.PistonOperator("Piston");
        asset.addComponent(pistonOp);
        pistonOp.getParameter('RPM').setValue(15.0);
        pistonOp.getParameter('CrankAxis').setValue(new Visualive.Vec3(0,1,0));

        pistonOp.getCrankOutput().setParam(crankGroup.getParameter('GlobalXfo'))
        
        const piston = pistonOp.getParameter('Pistons').addElement();
        piston.getMember('PistonAngle').setValue(0);
        piston.getMember('CamPhase').setValue(.5);
        piston.getMember('CamLength').setValue(3);
        piston.getMember('RodLength').setValue(5);
        piston.getRodOutput().setParam(rodGroup.getParameter('GlobalXfo'))
        piston.getCapOutput().setParam(capGroup.getParameter('GlobalXfo'))


        // Now save the component, remove it, and then add another one.
        const j = pistonOp.toJSON( { assetItem:asset } );
        asset.removeComponent('Piston');
        const pistonOp2 = new Visualive.PistonOperator('Piston2');
        asset.addComponent(pistonOp2);
        pistonOp2.fromJSON(j, { assetItem:asset } );
    }

    scene.getRoot().addChild(asset);



    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(20, 20, 10), new Visualive.Vec3(0, 0, 5));
    renderer.setScene(scene);
    renderer.setupGrid(50, new Visualive.Color(0.2, 0.2, 0.2), 10, 1);

    renderer.resumeDrawing();

});