
testingHarness.registerTest('Instancing', (domElement, resources)=> {
    const scene = new Visualive.Scene(resources);
    scene.setupGrid(60.0, 6);

    let standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.getParameter('BaseColor').setValue(new Visualive.Color(89 / 255, 182 / 255, 92 / 255));

    let addGeomItem = (shape, row, count, i)=>{
        const geomItem = new Visualive.GeomItem('Item'+row+'-'+i, shape, standardMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(i * 3, row * 3, 0)));
        scene.getRoot().addChild(geomItem);
        setInterval(function(){ 
            geomItem.setVisible(!geomItem.getVisible());
        }, (row*100) + (i*500));
    }
    let addMeshShape = (shape, row, count)=>{
        for(let i=0; i<count; i++){
            addGeomItem(shape, row, count, i);
        }
    }

    addMeshShape(new Visualive.Sphere(1.4, 13), 3, 1);
    addMeshShape(new Visualive.Sphere(1.4, 13), 2, 3);
    addMeshShape(new Visualive.Plane(2.0, 1.5), 1.4, 4);
    addMeshShape(new Visualive.Cuboid(1.5, 2.0, 1.0), 0.5, 6);
    addMeshShape(new Visualive.Cone(1.2, 4.0), -1, 20);
    addMeshShape(new Visualive.Cylinder(1.2, 4.0, 32, 2, true), -2, 8 );
    addMeshShape(new Visualive.Torus(0.4, 1.3), -3, 4 );

    let linesMaterial = new Visualive.Material('lines', 'LinesShader');
    linesMaterial.getParameter('Color').setValue(new Visualive.Color(1.0, 0.3, .4));

    let addLinesShape = (shape, pos, index)=>{
        // shape.lineThickness = 0.05;
        const geomItem = new Visualive.GeomItem('Item'+index, shape, linesMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addLinesShape(new Visualive.Circle(2.2, 12), new Visualive.Vec3(-6, 0, 6), 0);
    addLinesShape(new Visualive.Rect(1.5, 2.0), new Visualive.Vec3(-3, 0, 6), 1);


    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 2, 15), new Visualive.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();
});