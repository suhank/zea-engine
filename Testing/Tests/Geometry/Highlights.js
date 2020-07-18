
testingHarness.registerTest('Geometry/Highlights', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(60.0, 6);

    const tree1 = new Z.TreeItem('tree1');
    setInterval(function(){ 
        tree1.setSelected(!tree1.getSelected());
    }, 3000);
    scene.getRoot().addChild(tree1);

    const group1 = new Z.Group('group1');
    group1.getParameter('HighlightColor').setValue(new Z.Color('lemonchiffon'));
    setInterval(function(){ 
        const p = group1.getParameter('Highlighted');
        p.setValue(!p.getValue());
    }, 2000);
    scene.getRoot().addChild(group1);

    const group2 = new Z.Group('group2');
    group2.getParameter('HighlightColor').setValue(new Z.Color('mediumblue'));
    setInterval(function(){ 
        const p = group2.getParameter('Highlighted');
        p.setValue(!p.getValue());
    }, 2000);
    scene.getRoot().addChild(group2);

    const standardMaterial = new Z.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.getParameter('BaseColor').setValue(new Z.Color(89 / 255, 182 / 255, 92 / 255));

    const addGeomItem = (shape, row, count, i)=>{
        const geomItem = new Z.GeomItem('Item'+row+'-'+i, shape, standardMaterial);
        geomItem.setLocalXfo(new Z.Xfo(new Z.Vec3(i * 3, row * 3, 0)));
        tree1.addChild(geomItem);
        setInterval(function(){ 
            geomItem.setVisible(!geomItem.getVisible());
        }, 1000 + (i*500) * Math.random());

        group1.addItem(geomItem);
        if(i%2 == 0)
            group2.addItem(geomItem);
    }
    const addMeshShape = (shape, row, count)=>{
        for(let i=0; i<count; i++){
            addGeomItem(shape, row, count, i);
        }
    }

    addMeshShape(new Z.Sphere(1.4, 13), 3, 1);
    addMeshShape(new Z.Sphere(1.4, 13), 2, 3);
    addMeshShape(new Z.Plane(2.0, 1.5), 1.4, 4);
    addMeshShape(new Z.Cuboid(1.5, 2.0, 1.0), 0.5, 6);
    addMeshShape(new Z.Cone(1.2, 4.0), -1, 5);
    addMeshShape(new Z.Cylinder(1.2, 4.0, 32, 2, true), -2, 8);
    addMeshShape(new Z.Torus(0.4, 1.3), -3, 4);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 2, 15), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();
});