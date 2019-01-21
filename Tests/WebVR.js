
testingHarness.registerTest('WebVR', (domElement, resources) => { 

    const scene = new Visualive.Scene(resources);
    const renderer = new Visualive.GLRenderer(domElement);



    const addMeshShape = (name, shape, pos)=>{
        const standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
        standardMaterial.getParameter('BaseColor').setValue(Visualive.Color.random(0.1));
        const geomItem = new Visualive.GeomItem(name+'Item', shape, standardMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }

    addMeshShape('Cuboid', new Visualive.Cuboid(1.5, 2.0, 1.0), new Visualive.Vec3(-2, 0, 0.5));
    addMeshShape('Cone', new Visualive.Cone(0.8, 5.0), new Visualive.Vec3(2, 2, 0));
    addMeshShape('Cylinder', new Visualive.Cylinder(0.6, 4.0, 32, 2, true), new Visualive.Vec3(2, 0, 2));
    addMeshShape('Torus', new Visualive.Torus(0.3, 0.8), new Visualive.Vec3(0, -2, 0.3));
    addMeshShape('Sphere', new Visualive.Sphere(1.2, 13), new Visualive.Vec3(0, 2, 0.6));

    renderer.setScene(scene);
    renderer.setupGrid(5.0, new Visualive.Color(.53, .53, .53), 50, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(0,0,1.7), new Visualive.Vec3(1,0,1));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look')
    renderer.resumeDrawing();

    // if(Visualive.SystemDesc.isMobileDevice){
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

