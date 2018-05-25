testingHarness.registerTest('LatLongSterioBackgroundLoading', (domElement, resources)=> {
    
    let bgMapName = "Assets/teidetour23_under_over_stereo_pair_4000.jpg";

    let scene = new Visualive.Scene(resources);
    let bgMap =  new Visualive.FileImage2D(bgMapName, scene.getResourceLoader(), { mapping: 'steriolatlong'});
    scene.setBackgroundMap(bgMap);

    let renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,1,2), new Visualive.Vec3(0,0,2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    renderer.setScene(scene);
    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main);
    renderer.resumeDrawing();

});
