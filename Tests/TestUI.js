
testingHarness.registerTest('TestUI', (domElement, resources)=> {

    let systemDesc = Visualive.SystemDesc;
    if (systemDesc.isMobileDevice || systemDesc.browserName != 'Chrome') {
        VisualiveUI.renderComponent(domElement, VisualiveUI.MobileNotSupportedDialog);
        return;
    }
    let load = ()=>{
        VisualiveUI.cleanDiv(domElement);
        
        const scene = new Visualive.Scene(resources);
        // scene.setEnvMap(new Visualive.FileImage2D('Assets/pisa.vlh'));

        let renderer  = new Visualive.GLVisualiveRenderer(domElement);
        renderer.setScene(scene);
        renderer.setupGrid(5.0, new Visualive.Color(.53, .53, .53), 50, 0.01);
        renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(2,2,1.7), new Visualive.Vec3(0,0,1));
        renderer.resumeDrawing();
        
        let controller = new VisualiveUI.UIController(renderer, VisualiveUI.Main, VisualiveUI.VRControllerUI);
    }
    VisualiveUI.renderComponent(domElement, VisualiveUI.ExplicitLoadDialog, { load });


});