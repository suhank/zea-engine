

testingHarness.registerTest('PositionalAudio', (domElement, resources)=> {
    
    const scene = new Visualive.Scene(resources);


    // const AudioContext = window.AudioContext || window.webkitAudioContext;
    // const audioCtx = new AudioContext();



    const standardMaterial = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
    standardMaterial.addParameter('baseColor', new Visualive.Color(89 / 255, 182 / 255, 92 / 255));
    standardMaterial.addParameter('roughness', 1.0);
    standardMaterial.addParameter('metallic', 0.0);

    const addMeshShape = (name, shape, pos)=>{
        const geomItem = new Visualive.GeomItem(name+'Item', shape, standardMaterial);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));

        const audioItem = new Visualive.AudioItem('Einstein', scene.getResourceLoader());
        audioItem.getParameter('FilePath').setValue("Assets/AudioFiles/Albert Einstein Interview 1940.mp3")
        geomItem.addChild(audioItem);

        // const audioElement = new Audio();
        // audioElement.autoplay = true;
        // audioElement.src = "Assets/AudioFiles/Albert Einstein Interview 1940.mp3";


        // const source = audioCtx.createMediaElementSource(audioElement);
        // const gainNode = audioCtx.createGain();
        // gainNode.gain.value = 1.8;

        // source.connect(gainNode);
        // const panner = audioCtx.createPanner();
        // panner.panningModel = 'HRTF';
        // panner.distanceModel = 'inverse';
        // panner.refDistance = 2;
        // panner.maxDistance = 10000;
        // panner.rolloffFactor = 1;
        // panner.coneInnerAngle = 120;
        // panner.coneOuterAngle = 180;
        // panner.coneOuterGain = 0.2;


        // const updatePannerNodePosition = (globalXfo)=>{
        //     if(panner.positionX) {
        //         panner.positionX.value = globalXfo.tr.x;
        //         panner.positionY.value = globalXfo.tr.y;
        //         panner.positionZ.value = globalXfo.tr.z;
        //     } else {
        //         panner.setPosition(globalXfo.tr.x, globalXfo.tr.y, globalXfo.tr.z);
        //     }

        //     const dir = globalXfo.ori.getZaxis();
        //     if(panner.orientationX) {
        //       panner.orientationX.value = dir.x;
        //       panner.orientationY.value = dir.y;
        //       panner.orientationZ.value = dir.z;
        //     } else {
        //       panner.setOrientation(dir.x,dir.y,dir.z);
        //     }

        //     // TODO: 
        //     // setVelocity()
        // }
        // geomItem.globalXfoChanged.connect((changeType)=>{
        //     const globalXfo = geomItem.getGlobalXfo();
        //     updatePannerNodePosition(globalXfo);
        // });


        // gainNode.connect(panner);
        // panner.connect(audioCtx.destination);



        scene.getRoot().addChild(geomItem);

        // updatePannerNodePosition(geomItem.getGlobalXfo());
    }

    addMeshShape('Cuboid', new Visualive.Cuboid(0.3, 0.4, 0.6), new Visualive.Vec3(0, 3, 0));

    // const material = new Visualive.Material('material', 'FatLinesShader');
    // const geomItem = new Visualive.GeomItem('geomItem', lines, material);
    // scene.getRoot().addChild(geomItem);

    const renderer = new Visualive.GLSimpleRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);
    renderer.setScene(scene);

    const camera = renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Visualive.Vec3(1.0, 4.0, 3.0), new Visualive.Vec3(0.0, 1.5, 0.0));

    // const listener = audioCtx.listener;

    // camera.viewMatChanged.connect(()=> {
    //     const globalXfo = camera.getGlobalXfo();
    //     if(listener.positionX) {
    //         listener.positionX.value = globalXfo.tr.x;
    //         listener.positionY.value = globalXfo.tr.y;
    //         listener.positionZ.value = globalXfo.tr.z;
    //     } else {
    //         listener.setPosition(globalXfo.tr.x, globalXfo.tr.y, globalXfo.tr.z);
    //     }

    //     const zdir = globalXfo.ori.getZaxis().negate();
    //     const ydir = globalXfo.ori.getYaxis();
    //     if(listener.orientationX) {
    //       listener.orientationX.value = zdir.x;
    //       listener.orientationY.value = zdir.y;
    //       listener.orientationZ.value = zdir.z;
    //     } else {
    //       listener.setOrientation(zdir.x, zdir.y, zdir.z, ydir.x, ydir.y, ydir.z);
    //     }
    // });
    renderer.resumeDrawing();
});
