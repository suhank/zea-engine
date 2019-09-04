
testingHarness.registerTest('Instancing', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(60.0, 6);

    let standardMaterial = new Z.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.getParameter('BaseColor').setValue(new Z.Color(89 / 255, 182 / 255, 92 / 255));

    let addGeomItem = (shape, row, count, i)=>{
        const geomItem = new Z.GeomItem('Item'+row+'-'+i, shape, standardMaterial);
        geomItem.setLocalXfo(new Z.Xfo(new Z.Vec3(i * 3, row * 3, 0)));
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

    addMeshShape(new Z.Sphere(1.4, 13), 3, 1);
    addMeshShape(new Z.Sphere(1.4, 13), 2, 3);
    addMeshShape(new Z.Plane(2.0, 1.5), 1.4, 4);
    addMeshShape(new Z.Cuboid(1.5, 2.0, 1.0), 0.5, 6);
    addMeshShape(new Z.Cone(1.2, 4.0), -1, 20);
    addMeshShape(new Z.Cylinder(1.2, 4.0, 32, 2, true), -2, 8 );
    addMeshShape(new Z.Torus(0.4, 1.3), -3, 4 );

    let linesMaterial = new Z.Material('lines', 'LinesShader');
    linesMaterial.getParameter('Color').setValue(new Z.Color(1.0, 0.3, .4));

    let addLinesShape = (shape, pos, index)=>{
        // shape.lineThickness = 0.05;
        const geomItem = new Z.GeomItem('Item'+index, shape, linesMaterial);
        geomItem.setLocalXfo(new Z.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addLinesShape(new Z.Circle(2.2, 12), new Z.Vec3(-6, 0, 6), 0);
    addLinesShape(new Z.Rect(1.5, 2.0), new Z.Vec3(-3, 0, 6), 1);


    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 2, 15), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();
});