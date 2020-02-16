
testingHarness.registerTest('Geometry/Billboards', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    const scene = new Z.Scene();
    const renderer = new Z.GLRenderer(domElement);
    renderer.setScene(scene);
    renderer.resumeDrawing();

    scene.setupGrid(60.0, 6);
    
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(5,4,3), new Z.Vec3(0,0,0));

    {   
        const image = new Z.LDRImage('SolorFloorPerformer');
        image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/SolorFloorPerformer.png")
        image.getParameter('Invert').setValue(true);
        image.getParameter('AlphaFromLuminance').setValue(true);
        const billboard = new Z.BillboardItem('billboard0', image);
        const xfo = new Z.Xfo();
        xfo.tr.set( 1, 0, 0 );
        xfo.ori.setFromAxisAndAngle(new Z.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo); 
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('alignedToCamera').setValue(true);
        billboard.getParameter('color').setValue(new Z.Color(1.0, .53, .53));
        scene.getRoot().addChild(billboard);
    }
    {
        const image = new Z.LDRImage('VerticalDoubleMaleTrapeze');
        image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/VerticalDoubleMaleTrapeze2.png")
        image.getParameter('Invert').setValue(true);
        image.getParameter('AlphaFromLuminance').setValue(true);
        const billboard = new Z.BillboardItem('billboard1', image);
        const xfo = new Z.Xfo();
        xfo.tr.set( 1, -1, 0 );
        xfo.ori.setFromAxisAndAngle(new Z.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('alignedToCamera').setValue(false);
        billboard.getParameter('color').setValue(new Z.Color(.53,  .53, 1.0));
        scene.getRoot().addChild(billboard);
    }
    {
        const image = new Z.LDRImage('VerticalDoubleMaleTrapeze2');
        image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/VerticalDoubleMaleTrapeze2.png")
        image.getParameter('Invert').setValue(true);
        image.getParameter('AlphaFromLuminance').setValue(true);
        const billboard = new Z.BillboardItem('billboard2', image);
        const xfo = new Z.Xfo();
        xfo.tr.set( -2, 1, 0 );
        xfo.ori.setFromAxisAndAngle(new Z.Vec3(1, 0, 0), Math.PI * 0.5);
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('alignedToCamera').setValue(false);
        billboard.getParameter('color').setValue(new Z.Color(.53, 1.0, .53));
        scene.getRoot().addChild(billboard);
    }

});