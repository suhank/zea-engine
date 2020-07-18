testingHarness.registerTest('MaterialsAndEnvironment/LatLongVideoLoading', (domElement, resources)=> {
    const Z = ZeaEngine;

    const scene = new Z.Scene(resources);
    
    const bgMapName = "Assets/VideoFiles/SAMSUNG VR - The Anatomy of Ski w_ Bode Miller.mp4";
    // const bgMapName = "Assets/DEMO_UNLIMITED_ONLINE_Version_courte_inter_30oct_2017.mp4";
    const bgMap =  new Z.FileImage(bgMapName, { mapping: 'latlong'});
    scene.setBackgroundMap(bgMap);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1,1,2), new Z.Vec3(0,0,2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    renderer.setScene(scene);
    renderer.resumeDrawing();

});
