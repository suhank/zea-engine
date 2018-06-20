
testingHarness.registerTest('Billboards', (domElement, resources)=> {
    
    Visualive.resourceLoader.setResources(resources);
    const scene = new Visualive.Scene();

    {
        let image = new Visualive.FileImage('Assets/VerticalDoubleMaleTrapeze2.png');
        image.flags = 4;
        let billboard = new Visualive.BillboardItem('billboard1', image);
        let xfo = new Visualive.Xfo();
        xfo.tr.set( 1, -1, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('flags').setValue(0);
        billboard.getParameter('color').setValue(new Visualive.Color(.53,  .53, 1.0));
        scene.getRoot().addChild(billboard);
    }
    {
        let image = new Visualive.FileImage('Assets/VerticalDoubleMaleTrapeze2.png');
        image.flags = 4;
        let billboard = new Visualive.BillboardItem('billboard2', image);
        let xfo = new Visualive.Xfo();
        xfo.tr.set( -2, 1, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('flags').setValue(0);
        billboard.getParameter('color').setValue(new Visualive.Color(.53, 1.0, .53));
        scene.getRoot().addChild(billboard);
    }

    {   
        let image =  new Visualive.FileImage('Assets/SolorFloorPerformer.png');
        image.flags = 4;
        let billboard = new Visualive.BillboardItem('billboard0', image);
        let xfo = new Visualive.Xfo();
        xfo.tr.set( 1, 0, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo); 
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('flags').setValue(0);
        billboard.getParameter('color').setValue(new Visualive.Color(1.0, .53, .53));
        scene.getRoot().addChild(billboard);
    }

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(5,4,3), new Visualive.Vec3(0,0,0));

    renderer.setScene(scene);
    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();
});