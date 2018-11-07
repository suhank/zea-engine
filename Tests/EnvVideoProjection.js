testingHarness.registerTest('EnvVideoProjection', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);
    // const bgMapName = "Assets/DEMO_UNLIMITED_ONLINE_Version_courte_inter_30oct_2017.mp4";
    const bgMapName = "Assets/VideoFiles/SAMSUNG VR - The Anatomy of Ski w_ Bode Miller.mp4";
    const bgMap =  new Visualive.FileImage('bg', bgMapName, { mapping: 'latlong'});
    // scene.setBackgroundMap(bgMap);
    scene.setEnvMap(bgMap);

    const material = new Visualive.Material('layer0', 'LatLongEnvProjectionShader');
    // material.getParameter('envMap').setValue(envMap);

    const addMeshShape = (name, shape, xfo)=>{
        const geomItem = new Visualive.GeomItem(name, shape, material);
        geomItem.setLocalXfo(xfo);
        scene.getRoot().addChild(geomItem);
        return geomItem;
    }

    addMeshShape('Plane0', new Visualive.Plane(50.0, 50.0), new Visualive.Xfo());
    addMeshShape('Plane1', 
        new Visualive.Plane(16.0, 12.0), 
        new Visualive.Xfo(new Visualive.Vec3(0, -2, 1), new Visualive.Quat({setFromAxisAndAngle: [new Visualive.Vec3(1, 0, 0), Math.PI * 0.5] }))
        );


    /////////////////////////////////////
    // Renderer
    
    // const renderer = new Visualive.GLRenderer(domElement);
    const renderer = new Visualive.GLRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.getViewport().setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    const vrViewport = renderer.getVRViewport();
    if(vrViewport){
        vrViewport.setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    }


    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1, 1, 1.2), new Visualive.Vec3(0, 0, 0.1));
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    // renderer.gamma = 1.0;
    renderer.exposure = 0.5;


    renderer.resumeDrawing();
});