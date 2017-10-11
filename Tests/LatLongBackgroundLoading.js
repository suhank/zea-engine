var LatLongBackgroundLoading = (domElement, resources)=> {
    
    let bgMapName = "Assets/Man-Singh-Palace.JPG";

    let scene = new Visualive.Scene(resources);
    let bgMap =  new Visualive.FileImage2D(bgMapName, scene.getResourceLoader(), { mapping: 'latlong'});
    scene.setBackgroundMap(bgMap);

    let renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,2,1), new Visualive.Vec3(0,2,0));
    renderer.setScene(scene);
    let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main);
    renderer.resumeDrawing();


}
