
testingHarness.registerTest('WebVR', (domElement, resources) => { 
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    scene.setupGrid(5.0, 506);

    const renderer = new Z.GLRenderer(domElement);



    const addMeshShape = (name, shape, pos)=>{
        const standardMaterial = new Z.Material('surfaces', 'SimpleSurfaceShader');
        standardMaterial.getParameter('BaseColor').setValue(Z.Color.random(0.1));
        const geomItem = new Z.GeomItem(name+'Item', shape, standardMaterial);
        geomItem.setLocalXfo(new Z.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addMeshShape('Cuboid', new Z.Cuboid(1.5, 2.0, 1.0), new Z.Vec3(-2, 0, 0.5));
    addMeshShape('Cone', new Z.Cone(0.8, 5.0), new Z.Vec3(2, 2, 0));
    addMeshShape('Cylinder', new Z.Cylinder(0.6, 4.0, 32, 2, true), new Z.Vec3(2, 0, 2));
    addMeshShape('Torus', new Z.Torus(0.3, 0.8), new Z.Vec3(0, -2, 0.3));
    addMeshShape('Sphere', new Z.Sphere(1.2, 13), new Z.Vec3(0, 2, 0.6));

    renderer.setScene(scene);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(0,0,1.7), new Z.Vec3(1,0,1));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look')
    renderer.resumeDrawing();

    // if(Z.SystemDesc.isMobileDevice){
    //     renderer.startContinuousDrawing();
    // }

    document.addEventListener('keypress', (event) => {
        const key = String.fromCharCode(event.keyCode).toLowerCase();
        console.log(key)
        if(key == 'v' && event.shiftKey || key == ' ') {
            const vrvp = renderer.getVRViewport();
            if(vrvp) 
                vrvp.togglePresenting();
        }
    });

});

