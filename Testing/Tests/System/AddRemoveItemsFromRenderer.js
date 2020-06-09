testingHarness.registerTest('System/AddRemoveItemsFromRenderer', (domElement, resources) => {
    
    const Z = ZeaEngine;
    const scene = new Z.Scene(resources);
    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(15, 2, 15), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();

    scene.setupGrid(60.0, 6);
    const root = scene.getRoot()

    const addGeomItem = (shape, row, count, i, material) => {
        const geomItem = new Z.GeomItem('Item' + row + '-' + i, shape, standardMaterial);
        geomItem.setLocalXfo(new Z.Xfo(new Z.Vec3(i * 3, row * 3, 0)));

        // Keep the item from being destoryed
        // when it is removed from the tree.
        geomItem.addRef(this);

        let added = false;
        setInterval(function() {
            if (!added) {
                root.addChild(geomItem);
                added = true;
            } else {
                const index = root.getChildIndex(geomItem)
                root.removeChild(index)
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

    addShapeRow(new Z.Sphere(1.4, 24), 0, 5, standardMaterial);

    const linesMaterial = new Z.Material('lines', 'LinesShader');
    linesMaterial.getParameter('Color').setValue(new Z.Color(1.0, 0.3, .4));

    addShapeRow(new Z.Circle(1.4, 24), 1, 5, linesMaterial);
});