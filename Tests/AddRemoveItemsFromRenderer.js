testingHarness.registerTest('AddRemoveItemsFromRenderer', (domElement, resources) => {
    
    const Z = ZeaEngine;
    const scene = new Z.Scene(resources);
    scene.setupGrid(60.0, 6);

    const addGeomItem = (shape, row, count, i, material) => {
        const geomItem = new Z.GeomItem('Item' + row + '-' + i, shape, standardMaterial);
        geomItem.setLocalXfo(new Z.Xfo(new Z.Vec3(i * 3, row * 3, 0)));

        // Keep the item from being destoryed
        // when it is removed from the tree.
        geomItem.addRef(this);

        scene.getRoot().addChild(geomItem);
        let added = true;
        setInterval(function() {
            if (!added) {
                scene.getRoot().addChild(geomItem);
                added = true;
            } else {
                scene.getRoot().removeChildByHandle(geomItem);
                added = false;
            }
        }, (row * 200) + (i * 500));
    }
    const addShapeRow = (shape, row, count, material) => {
        for (let i = 0; i < count; i++) {
            addGeomItem(shape, row, count, i, material);
        }
    }


    const standardMaterial = new Z.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.addParameter('BaseColor', new Z.Color(89 / 255, 182 / 255, 92 / 255));
    standardMaterial.addParameter('Roughness', 1.0);
    standardMaterial.addParameter('Metallic', 0.0);

    addShapeRow(new Z.Sphere(1.4, 24), 0, 5, standardMaterial);

    const linesMaterial = new Z.Material('lines', 'LinesShader');
    linesMaterial.getParameter('Color').setValue(new Z.Color(1.0, 0.3, .4));

    addShapeRow(new Z.Circle(1.4, 24), 1, 5, linesMaterial);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 2, 15), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();
});