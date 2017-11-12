

testingHarness.registerTest('PositionalAudio', (domElement, resources)=> {
    
    const scene = new Visualive.Scene(resources);


    const standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.addParameter('baseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    standardMaterial.addParameter('roughness', 1.0);
    standardMaterial.addParameter('metallic', 0.0);

    const addMeshShape = (name, shape, pos, url)=>{
        const geomItem = new Visualive.GeomItem(name+'Item', shape, standardMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));

        const audioItem = new Visualive.AudioItem(name+'Audio', scene.getResourceLoader());
        audioItem.getParameter('FilePath').setValue(url);
        audioItem.getParameter('rolloffFactor').setValue(5.0);
        geomItem.addChild(audioItem);

        scene.getRoot().addChild(geomItem);

        return audioItem;
    }

    const einstein = addMeshShape('Einstein', new Visualive.Cuboid(0.3, 0.4, 0.6), new Visualive.Vec3(-4, 3, -3), "Assets/AudioFiles/Albert Einstein Interview 1940.mp3");
    einstein.getParameter('Gain').setValue(0.6);

    const mandela = addMeshShape('Mandela', new Visualive.Cuboid(0.3, 0.4, 0.6), new Visualive.Vec3(5, 2, -3), "Assets/AudioFiles/Nelson Mandela speech that changed the world.mp3");
    mandela.getParameter('Gain').setValue(2.6);

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);

    const camera = renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Visualive.Vec3(1.0, 4.0, 3.0), new Visualive.Vec3(0.0, 1.5, 0.0));

    renderer.resumeDrawing();
});
