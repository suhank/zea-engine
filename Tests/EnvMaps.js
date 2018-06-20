testingHarness.registerTest('EnvMaps', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);
    scene.setEnvMap(new Visualive.EnvMap("Assets/HDR_041_Path_Ref.vlenv"));

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    let vrViewport = renderer.getVRViewport();
    if(vrViewport){
        vrViewport.setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    }


    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1, 1, 1.2), new Visualive.Vec3(0, 0, 0.1));
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);


    renderer.resumeDrawing();
});