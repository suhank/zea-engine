testingHarness.registerTest('LatLongSterioBackgroundLoading', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    let bgMapName = "Assets/teidetour23_under_over_stereo_pair_4000.jpg";

    const scene = new Z.Scene(resources);
    let bgMap =  new Z.FileImage(bgMapName, { mapping: 'steriolatlong'});
    scene.setBackgroundMap(bgMap);

    const renderer = new Z.GLRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(1,1,2), new Z.Vec3(0,0,2));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');
    renderer.setScene(scene);
    renderer.resumeDrawing();

});
