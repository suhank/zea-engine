testingHarness.registerTest('MaterialsAndEnvironment/LatLongBackgroundLoading', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    let bgMapName = "Assets/Man-Singh-Palace.JPG";

    const scene = new Z.Scene(resources);
    let bgMap =  new Z.FileImage('bg', bgMapName, { mapping: 'latlong'});
    scene.setEnvMap(bgMap);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1,1,2), new Z.Vec3(0,0,2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    renderer.setScene(scene);
    renderer.resumeDrawing();

});
