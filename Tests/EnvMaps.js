testingHarness.registerTest('EnvMaps', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);
    const envMap = new Visualive.EnvMap("Assets/HDR_041_Path_Ref.vlenv");
    scene.setEnvMap(envMap);
    scene.setupGrid(60.0, 6);

    envMap.loaded.connect(()=>{
        const data = envMap.getSampleSets();
        const disc = new Visualive.Disc(0.5)
        const up = new Visualive.Vec3(0,0,1);
        const dir = new Visualive.Vec3();
        let dist = 20.0;
        const displaySampleSet = (sampleSet, dist, i)=>{
            const setTree = new Visualive.TreeItem('sampleSet'+i)
            for(let j=0; j<sampleSet.length; j++) {
                const sample = sampleSet[j];

                const color = new Visualive.Color();
                color.fromJSON(sample.color);
                let material = new Visualive.Material('sample:'+i+':'+j, 'FlatSurfaceShader');
                material.getParameter('BaseColor').setValue(color);

                const geomItem = new Visualive.GeomItem('sample:'+j, disc, material);

                const xfo = new Visualive.Xfo();
                dir.fromJSON(sample.dir);
                xfo.tr.addInPlace(dir.scale(dist));
                xfo.ori.setFromDirectionAndUpvector(dir, up);

                const radius = dist * Math.sin(sample.solidAngle);
                // console.log(dir.toString() + " radius:" + radius)
                xfo.sc.set(radius, radius, radius);
                geomItem.setLocalXfo(xfo);
                setTree.addChild(geomItem);
            }
            scene.getRoot().addChild(setTree);
            dist -= 1.0;
        }
        // for(let i=0; i<data.sampleSets.length; i++) 
        {
            // const i = 0;
            // const i = data.sampleSets.length - 1;
            displaySampleSet(data.sampleSets[0], dist, 0); 
            // displaySampleSet(data.sampleSets[1], dist, 1); 
            // displaySampleSet(data.sampleSets[2], dist, 2);
            // displaySampleSet(data.sampleSets[3], dist, 3);
            // displaySampleSet(data.sampleSets[data.sampleSets.length - 1], dist, 10);

            
        }
    })

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Visualive.GLRenderer(domElement);
    renderer.getViewport().setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    let vrViewport = renderer.getVRViewport();
    if(vrViewport){
        vrViewport.setBackground(new Visualive.Color(0.94, 0.94, 0.94));
    }


    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1, 1, 1.2), new Visualive.Vec3(0, 0, 0.1));
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    renderer.exposure = 0.5;
    // renderer.displayEnvironment = false;


    renderer.resumeDrawing();
});