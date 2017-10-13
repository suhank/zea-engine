
testingHarness.registerTest('TestUI', (domElement, resources)=> {

    let browserDesc = Visualive.getBrowserDesc();
    if (browserDesc.isMobileDevice || browserDesc.browserName != 'Chrome') {
        VisualiveUI.renderComponent(domElement, VisualiveUI.MobileNotSupportedDialog);
        return;
    }
    let load = ()=>{
        VisualiveUI.cleanDiv(domElement);
        
        let scene = new Visualive.Scene(resources);
        // scene.setEnvMap(new Visualive.FileImage2D('Assets/pisa.vlh', scene.getResourceLoader()));

        let renderer  = new Visualive.GLVisualiveRenderer(domElement);
        renderer.setScene(scene);
        renderer.setupGrid(5.0, new Visualive.Color(.53, .53, .53), 50, 0.01);
        renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,1.7,2), new Visualive.Vec3(0,1,0));
        renderer.resumeDrawing();
        
        let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    }
    VisualiveUI.renderComponent(domElement, VisualiveUI.ExplicitLoadDialog, { load });


});