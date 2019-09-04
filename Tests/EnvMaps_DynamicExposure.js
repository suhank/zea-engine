testingHarness.registerTest('EnvMaps_DynamicExposure', (domElement, resources)=> {
    const Z = ZeaEngine;
    /////////////////////////////////////
    // Scene
    const scene = new Z.Scene(resources);
    const envMap = new Z.EnvMap("Assets/HDR_041_Path_Ref.vlenv");
    scene.setEnvMap(envMap);
    scene.setupGrid(60.0, 6);

    envMap.loaded.connect(()=>{
        let exposure = 1.0;
        const camera = renderer.getViewport().getCamera();
        renderer.startContinuousDrawing();
        renderer.redrawOccured.connect((data) => {
            const viewDir = camera.getGlobalXfo().ori.getZaxis().negate();
            const uv = envMap.dirToUv(viewDir);
            const luminance = envMap.uvToLuminance(uv);
            // Apply a sigmoid function to reduce variance. 
            const targExposure = Math.atan(1 / luminance);
            // console.log("luminance:", luminance, targExposure)

            exposure = Math.lerp(exposure, targExposure, 0.08);
            renderer.exposure = exposure;
        })
    })

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Z.GLRenderer(domElement);

    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(0, 0, 1.2), new Z.Vec3(1, 0, 1.2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    renderer.exposure = 1.0;
    // renderer.displayEnvironment = false;

    renderer.resumeDrawing();
});