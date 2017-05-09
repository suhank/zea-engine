
// source file for 'HelloWorld' test.
var init = function(domElement, resources) { 
    let scene = new Visualive.Scene(resources);
    let renderer;
    if(Visualive.isMobileDevice()){
        renderer = new Visualive.GLSimpleRenderer(domElement);
    }
    else{
        renderer = new Visualive.GLVisualiveRenderer(domElement);
    }
    renderer.setScene(scene);
    renderer.setupGrid(5.0, new Visualive.Color(.53, .53, .53), 50, 0.01);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,1.7,2), new Visualive.Vec3(0,1,0));
    renderer.resumeDrawing();

    VisualiveUI.render(domElement);
};