testingHarness.registerTest('EnvProjection', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);
    const envMap = new Visualive.EnvMap("Assets/HDR_041_Path_Ref.vlenv");
    scene.setEnvMap(envMap);
    scene.setupGrid(60.0, 6);

    const material = new Visualive.Material('layer0', 'OctahedralEnvProjectionShader');
    // material.getParameter('envMap').setValue(envMap);

    const addMeshShape = (name, shape, xfo)=>{
        const geomItem = new Visualive.GeomItem(name, shape, material);
        geomItem.setLocalXfo(xfo);
        scene.getRoot().addChild(geomItem);
        return geomItem;
    }

    addMeshShape('Sphere', new Visualive.Sphere(20, 64), new Visualive.Xfo());
    addMeshShape('Plane0', new Visualive.Plane(50.0, 50.0), new Visualive.Xfo());
    addMeshShape('Plane1', 
        new Visualive.Plane(6.0, 2.0), 
        new Visualive.Xfo(new Visualive.Vec3(0, -2, 1), new Visualive.Quat({setFromAxisAndAngle: [new Visualive.Vec3(1, 0, 0), Math.PI * 0.5] }))
        );


    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Visualive.GLRenderer(domElement);
    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    const vrViewport = renderer.getVRViewport();
    if(vrViewport){
        vrViewport.setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    }

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(0, 0, 1.2), new Visualive.Vec3(1, 0, 1.2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    // renderer.gamma = 1.0;

    renderer.resumeDrawing();

    envMap.loaded.connect(()=>{
        let exposure = 1.0;
        const camera = renderer.getViewport().getCamera();
        renderer.startContinuousDrawing();
        renderer.redrawOccured.connect((data) => {
            const viewDir = camera.getGlobalXfo().ori.getZaxis().negate();
            const luminance = envMap.dirToLuminance(viewDir);
            // Apply a sigmoid function to reduce variance. 
            const targExposure = Math.atan(1 / luminance);
            // console.log("luminance:", luminance, targExposure)

            exposure = Math.lerp(exposure, targExposure, 0.08);
            renderer.exposure = exposure;
        })
    })
});