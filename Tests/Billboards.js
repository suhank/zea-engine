
testingHarness.registerTest('Billboards', (domElement, resources)=> {
    
    Visualive.resourceLoader.setResources(resources);
    const scene = new Visualive.Scene();

    {
        const image = new Visualive.FileImage('VerticalDoubleMaleTrapeze2', 'Assets/VerticalDoubleMaleTrapeze2.png');
        image.getParameter('Invert').setValue(true);
        image.getParameter('AlphaFromLuminance').setValue(true);
        const billboard = new Visualive.BillboardItem('billboard1', image);
        const xfo = new Visualive.Xfo();
        xfo.tr.set( 1, -1, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('alignedToCamera').setValue(true);
        billboard.getParameter('color').setValue(new Visualive.Color(.53,  .53, 1.0));
        scene.getRoot().addChild(billboard);
    }
    {
        const image = new Visualive.FileImage('VerticalDoubleMaleTrapeze2', 'Assets/VerticalDoubleMaleTrapeze2.png');
        image.getParameter('Invert').setValue(true);
        image.getParameter('AlphaFromLuminance').setValue(true);
        const billboard = new Visualive.BillboardItem('billboard2', image);
        const xfo = new Visualive.Xfo();
        xfo.tr.set( -2, 1, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('alignedToCamera').setValue(true);
        billboard.getParameter('color').setValue(new Visualive.Color(.53, 1.0, .53));
        scene.getRoot().addChild(billboard);
    }

    {   
        const image =  new Visualive.FileImage('SolorFloorPerformer', 'Assets/SolorFloorPerformer.png');
        image.getParameter('Invert').setValue(true);
        image.getParameter('AlphaFromLuminance').setValue(true);
        const billboard = new Visualive.BillboardItem('billboard0', image);
        const xfo = new Visualive.Xfo();
        xfo.tr.set( 1, 0, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo); 
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('alignedToCamera').setValue(true);
        billboard.getParameter('color').setValue(new Visualive.Color(1.0, .53, .53));
        scene.getRoot().addChild(billboard);
    }

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(5,4,3), new Visualive.Vec3(0,0,0));

    renderer.setScene(scene);
    const controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();
});