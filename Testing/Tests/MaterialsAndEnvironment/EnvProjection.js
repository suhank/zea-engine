testingHarness.registerTest('MaterialsAndEnvironment/EnvMaps/EnvProjection', (domElement, resources)=> {
    const Z = ZeaEngine;
    /////////////////////////////////////
    // Scene
    const scene = new Z.Scene(resources);
    const envMap = new Z.EnvMap("Assets/HDR_041_Path_Ref.vlenv");
    scene.setEnvMap(envMap);
    scene.setupGrid(60.0, 6);

    const material = new Z.Material('layer0', 'OctahedralEnvProjectionShader');
    // material.getParameter('envMap').setValue(envMap);

    const addMeshShape = (name, shape, xfo)=>{
        const geomItem = new Z.GeomItem(name, shape, material);
        geomItem.setLocalXfo(xfo);
        scene.getRoot().addChild(geomItem);
        return geomItem;
    }

    // addMeshShape('Sphere', new Z.Sphere(20, 64), new Z.Xfo());
    addMeshShape('Plane0', new Z.Plane(50.0, 50.0), new Z.Xfo());
    addMeshShape('Plane1', 
        new Z.Plane(6.0, 2.0), 
        new Z.Xfo(new Z.Vec3(0, -2, 1), new Z.Quat({setFromAxisAndAngle: [new Z.Vec3(1, 0, 0), Math.PI * 0.5] }))
        );


    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Z.GLRenderer(domElement);
    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().setBackground(new Z.Color(0.94, 0.94, 0.94));
    const vrViewport = renderer.getVRViewport();
    if(vrViewport){
        vrViewport.setBackground(new Z.Color(0.94, 0.94, 0.94));
    }

    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(0, 0, 1.2), new Z.Vec3(1, 0, 1.2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    // renderer.gamma = 1.0;

    renderer.resumeDrawing();

    // envMap.loaded.connect(()=>{
    //     let exposure = 1.0;
    //     const camera = renderer.getViewport().getCamera();
    //     renderer.startContinuousDrawing();
    //     renderer.redrawOccured.connect((data) => {
    //         const viewDir = camera.getGlobalXfo().ori.getZaxis().negate();
    //         const luminance = envMap.dirToLuminance(viewDir);
    //         // Apply a sigmoid function to reduce variance. 
    //         const targExposure = Math.atan(1 / luminance);
    //         // console.log("luminance:", luminance, targExposure)

    //         exposure = Math.lerp(exposure, targExposure, 0.08);
    //         renderer.exposure = exposure;
    //     })
    // })
});