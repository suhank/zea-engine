
testingHarness.registerTest('Geometry/Grids', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);


    let size = 2;
    const quads = [];
    const maxQuadSize = 10;
    for(let i=2; i<maxQuadSize; i++) {
        for(let j=i; j<maxQuadSize; j++) {
            const x = Math.pow(2, i);
            const y = Math.pow(2, j);
            quads.push(new Z.Plane(x*0.1, y*0.1, x, y));
        }
    }


    const material = new Z.Material('material', 'SimpleSurfaceShader');
    material.getParameter('BaseColor').setValue(new Z.Color(1, 0, 1));
    const addGeomItem = (shape, xfo, index, material)=>{
        const geomItem = new Z.GeomItem(shape.name+'Item'+index, shape, material);
        geomItem.setLocalXfo(xfo);
        scene.getRoot().addChild(geomItem, false);
    }
    let offset = 0;
    for(let quad of quads) {

        offset += quad.getX()*1.4;
        const tr = new Z.Vec3(offset, 1.0, 0.0);
        const xfo = new Z.Xfo(tr);
        addGeomItem(quad, xfo, offset, material);

    }

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(2, 15, 15), new Z.Vec3(0, 0, 0));
    renderer.setScene(scene);
    renderer.frameAll();
    renderer.resumeDrawing();

});