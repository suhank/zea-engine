

testingHarness.registerTest('VideoTextureWithAudio', (domElement, resources)=> {
    
    const scene = new Visualive.Scene(resources);




    const addMeshShape = (name, shape, pos, url)=>{
        const material = new Visualive.Material('surfaces', 'SimpleSurfaceShader');

        const video = new Visualive.FileImage(name+'Video');
        video.getParameter('FilePath').setValue(url);
        video.getParameter('Gain').setValue(0.1);

        material.getParameter('BaseColor').setValue(video);
        const geomItem = new Visualive.GeomItem(name+'Item', shape, material)

        const xfo = new Visualive.Xfo(pos)
        xfo.ori.rotateX(Math.PI * -0.5);
        geomItem.setLocalXfo(xfo);

        scene.getRoot().addChild(geomItem, false);

        return video;
    }

    addMeshShape('small', new Visualive.Plane(0.3, 0.4), new Visualive.Vec3(0, 5, 1.7), "Assets/VideoFiles/small.mp4");

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);

    const camera = renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Visualive.Vec3(0, 0, 1.7), new Visualive.Vec3(0.0, 3.0, 1.7));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');

    // const visualivePlatform = VisualivePlatform();
    // const sessionClient = new Visualive.SessionClient(renderer, visualivePlatform);

    renderer.resumeDrawing();

    VisualiveUI.renderUI(renderer);
});
