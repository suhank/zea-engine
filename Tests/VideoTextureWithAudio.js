

testingHarness.registerTest('VideoTextureWithAudio', (domElement, resources)=> {
    const Z = ZeaEngine;
    
    const scene = new Z.Scene(resources);
    scene.setupGrid(60.0, 6);




    const addMeshShape = (name, shape, pos, url)=>{
        const material = new Z.Material('surfaces', 'SimpleSurfaceShader');

        const video = new Z.FileImage(name+'Video');
        video.getParameter('FilePath').setValue(url);
        video.getParameter('Gain').setValue(0.1);

        material.getParameter('BaseColor').setValue(video);
        const geomItem = new Z.GeomItem(name+'Item', shape, material)

        const xfo = new Z.Xfo(pos)
        xfo.ori.rotateX(Math.PI * -0.5);
        geomItem.setLocalXfo(xfo);

        scene.getRoot().addChild(geomItem, false);

        return video;
    }

    addMeshShape('small', new Z.Plane(0.3, 0.4), new Z.Vec3(0, 5, 1.7), "Assets/VideoFiles/small.mp4");

    const renderer = new Z.GLRenderer(domElement);
    renderer.setScene(scene);

    const camera = renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Z.Vec3(0, 0, 1.7), new Z.Vec3(0.0, 3.0, 1.7));
    renderer.getViewport().getManipulator().setDefaultManipulationMode('look');

    renderer.resumeDrawing();
});
