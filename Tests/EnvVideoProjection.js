testingHarness.registerTest('EnvVideoProjection', (domElement, resources)=> {
    const Z = ZeaEngine;
    /////////////////////////////////////
    // Scene
    const scene = new Z.Scene(resources);
    // const bgMapName = "Assets/DEMO_UNLIMITED_ONLINE_Version_courte_inter_30oct_2017.mp4";
    const bgMapName = "Assets/VideoFiles/SAMSUNG VR - The Anatomy of Ski w_ Bode Miller.mp4";
    const bgMap =  new Z.FileImage('bg', bgMapName, { mapping: 'latlong'});
    // scene.setBackgroundMap(bgMap);
    scene.setEnvMap(bgMap);
    scene.setupGrid(60.0, 6);

    const material = new Z.Material('layer0', 'LatLongEnvProjectionShader');
    // material.getParameter('envMap').setValue(envMap);

    const addMeshShape = (name, shape, xfo)=>{
        const geomItem = new Z.GeomItem(name, shape, material);
        geomItem.setLocalXfo(xfo);
        scene.getRoot().addChild(geomItem);
        return geomItem;
    }

    addMeshShape('Plane0', new Z.Plane(50.0, 50.0), new Z.Xfo());
    addMeshShape('Plane1', 
        new Z.Plane(16.0, 12.0), 
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


    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1, 1, 1.2), new Z.Vec3(0, 0, 0.1));
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    // renderer.gamma = 1.0;
    renderer.exposure = 0.5;


    renderer.resumeDrawing();
});