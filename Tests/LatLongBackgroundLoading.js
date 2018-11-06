testingHarness.registerTest('LatLongBackgroundLoading', (domElement, resources)=> {
    
    let bgMapName = "Assets/Man-Singh-Palace.JPG";

    const scene = new Visualive.Scene(resources);
    let bgMap =  new Visualive.FileImage('bg', bgMapName, { mapping: 'latlong'});
    scene.setBackgroundMap(bgMap);

    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,1,2), new Visualive.Vec3(0,0,2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    renderer.setScene(scene);
    renderer.resumeDrawing();

});
