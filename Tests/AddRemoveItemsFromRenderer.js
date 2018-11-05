testingHarness.registerTest('AddRemoveItemsFromRenderer', (domElement, resources) => {
    const scene = new Visualive.Scene(resources);

    let standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.addParameter('BaseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    standardMaterial.addParameter('Roughness', 1.0);
    standardMaterial.addParameter('Metallic', 0.0);

    let addGeomItem = (shape, row, count, i) => {
        const geomItem = new Visualive.GeomItem('Item' + row + '-' + i, shape, standardMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(new Visualive.Vec3(i * 3, row * 3, 0)));

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
    let addMeshShape = (shape, row, count) => {
        for (let i = 0; i < count; i++) {
            addGeomItem(shape, row, count, i);
        }
    }

    addMeshShape(new Visualive.Sphere(1.4, 13), 3, 5);


    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(15, 2, 15), new Visualive.Vec3(0, 0, 0));
    // renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();
});