testingHarness.registerTest('LatLongVideoLoading', (domElement, resources)=> {
    const scene = new Visualive.Scene(resources);
    
    const bgMapName = "Assets/VideoFiles/SAMSUNG VR - The Anatomy of Ski w_ Bode Miller.mp4";
    // const bgMapName = "Assets/DEMO_UNLIMITED_ONLINE_Version_courte_inter_30oct_2017.mp4";
    const bgMap =  new Visualive.FileImage(bgMapName, { mapping: 'latlong'});
    scene.setBackgroundMap(bgMap);

    const renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,1,2), new Visualive.Vec3(0,0,2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    renderer.setScene(scene);
    const controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main);
    renderer.resumeDrawing();

});
