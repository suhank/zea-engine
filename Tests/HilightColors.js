
testingHarness.registerTest('HilightColors', (domElement, resources)=> {

    const scene = new Visualive.Scene(resources);
    scene.setupGrid(60.0, 6);

    const standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));

    const linesMaterial = new Visualive.Material('lines', 'LinesShader');
    linesMaterial.getParameter('Color').setValue(new Visualive.Color(1.0, 0.3, .4));

    const pointsMaterial = new Visualive.Material('points', 'SimpleSurfaceShader');
    pointsMaterial.getParameter('BaseColor').setValue(new Visualive.Color(1.0, 0.3, .4));

    const addShape = (name, shape, pos, material, hilightColor)=>{
        const geomItem = new Visualive.GeomItem(name+'Item', shape, material);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));

        geomItem.addHilight('custom', hilightColor);
        scene.getRoot().addChild(geomItem);
    }

    const hilightColor1 = new Visualive.Color(1.0, 0.5, 0.5);
    const hilightColor2 = new Visualive.Color(0.5, 0.5, 1.0);

    addShape('Disc', new Visualive.Disc(2.0, 22), new Visualive.Vec3(-9, 0, 0), standardMaterial, hilightColor1);
    addShape('Plane', new Visualive.Plane(2.0, 1.5, 22, 22), new Visualive.Vec3(-6, 0, 0), standardMaterial, hilightColor1);
    addShape('Cuboid', new Visualive.Cuboid(1.5, 2.0, 1.0), new Visualive.Vec3(-3, 0, 0), standardMaterial, hilightColor1);
    addShape('Cone', new Visualive.Cone(1.2, 4.0), new Visualive.Vec3(0, 0, 0), standardMaterial, hilightColor2);
    addShape('Cylinder', new Visualive.Cylinder(1.2, 4.0, 32, 2, true), new Visualive.Vec3(3, 0, 0), standardMaterial, hilightColor2);
    addShape('Torus', new Visualive.Torus(0.4, 1.3), new Visualive.Vec3(6, 0, 0), standardMaterial, hilightColor2);
    addShape('Sphere', new Visualive.Sphere(1.4, 13), new Visualive.Vec3(9, 0, 0), standardMaterial, hilightColor2);


    // addShape('Circle', new Visualive.Circle(2.2, 12), new Visualive.Vec3(-6, 6, 0), linesMaterial);
    // addShape('Rect', new Visualive.Rect(1.5, 2.0), new Visualive.Vec3(-3, 6, 0), linesMaterial);
    // addShape('Cross', new Visualive.Cross(1.5), new Visualive.Vec3(0, 6, 0), linesMaterial);
    // addShape('Grid', new Visualive.Grid(1.5, 2.0), new Visualive.Vec3(3, 6, 0), linesMaterial);
    // addShape('LinesCuboid', new Visualive.LinesCuboid(1.5, 2.0, 3.0), new Visualive.Vec3(6, 6, 0), linesMaterial);
    // addShape('PointGrid', new Visualive.PointGrid(2.2, 1.5, 12, 12), new Visualive.Vec3(-6, 12, 0), pointsMaterial);


    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 2, 15), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    // renderer.frameAll();
    renderer.resumeDrawing();


    renderer.getViewport().mouseDownOnGeom.connect((event)=>{
        const geomItem = event.intersectionData.geomItem;
        console.log(geomItem.getPath())
        if(!event.shiftKey && !event.altKey){
          geomItem.setSelected(!geomItem.getSelected());
        }
    });
    
});