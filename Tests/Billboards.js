﻿<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Billboards</title>
        <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    </head>
    <body text-align: left;>

        <script src="../external/helpers.js"></script>
        <script src="../lib/Visualive-dev.js"></script>
        <script src="../lib/VisualiveUI-dev.js"></script>
        
        <script type="text/javascript">

    let Trapeze2 = 'Assets/VerticalDoubleMaleTrapeze2.png';
    let SolorFloorPerformer = 'Assets/SolorFloorPerformer.png';
    let resources = generateResourcesDict([
            Trapeze2,
            SolorFloorPerformer
        ]);
    let scene = new Visualive.Scene(resources);

    {
        let image = new Visualive.FileImage2D(Trapeze2, scene.getResourceLoader());
        image.flags = 4;
        let billboard = new Visualive.BillboardItem('billboard1', image);
        let xfo = new Visualive.Xfo();
        xfo.tr.set( -1, 0, 1 );
        billboard.setLocalXfo(xfo);
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('flags').setValue(0);
        billboard.getParameter('color').setValue(new Visualive.Color(.53, 1.0, .53));
        scene.getRoot().addChild(billboard);
    }

    {   
        let image =  new Visualive.FileImage2D(SolorFloorPerformer, scene.getResourceLoader());
        image.flags = 4;
        let billboard = new Visualive.BillboardItem('billboard0', image);
        let xfo = new Visualive.Xfo();
        xfo.tr.set( 1, 0, 0 );
        xfo.ori.setFromAxisAndAngle(new Visualive.Vec3( 0, 1, 0 ), Math.PI * 0.25);
        billboard.setLocalXfo(xfo); 
        billboard.getParameter('scale').setValue(2.5);
        billboard.getParameter('flags').setValue(0);
        billboard.getParameter('color').setValue(new Visualive.Color(1.0, .53, .53));
        scene.getRoot().addChild(billboard);
    }

    let renderer = new Visualive.GLSimpleRenderer(addCanvas());
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(5,4,3), new Visualive.Vec3(0,0,0));

    renderer.setScene(scene);
    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    renderer.resumeDrawing();

        </script> 
    </body>
</html>
