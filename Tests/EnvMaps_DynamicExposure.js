testingHarness.registerTest('EnvMaps_DynamicExposure', (domElement, resources)=> {
    /////////////////////////////////////
    // Scene
    const scene = new Visualive.Scene(resources);
    const envMap = new Visualive.EnvMap("Assets/HDR_041_Path_Ref.vlenv");
    scene.setEnvMap(envMap);

    envMap.loaded.connect(()=>{

        const setTree = new Visualive.TreeItem('luminanceValues')
        for(let i=0; i<32; i++) {
            for(let j=0; j<32; j++) {
                const thmbPixel = (i * 32) + (Math.floor(uv.x * 32));
                const lum = envMap.__sampleSets.luminanceThumbnail[thmbPixel];
                const dir = envMap.sphOctUvToDir(new Visualive.Vec2(i/32, j/32));

                const color = new Visualive.Color(lum, lum, lum, 1);
                const material = new Visualive.Material('sample:'+i+':'+j, 'FlatSurfaceShader');
                material.getParameter('BaseColor').setValue(color);

                const geomItem = new Visualive.GeomItem('sample:'+j, disc, material);

                const xfo = new Visualive.Xfo();
                xfo.tr.addInPlace(dir.scale(dist));
                xfo.ori.setFromDirectionAndUpvector(dir, up);

                // console.log(dir.toString() + " radius:" + radius)
                xfo.sc.set(0.4, 0.4, 0.4);
                geomItem.setLocalXfo(xfo);
                setTree.addChild(geomItem);
            }
            scene.getRoot().addChild(setTree);
            dist -= 1.0;
        }

        renderer.viewChanged.connect((data) => {
            const viewDir = data.viewXfo.ori.getZaxis().negate();
            const luminance = envMap.dirToLuminance(viewDir);
            // console.log("luminance:", luminance, viewDir.toString())

            renderer.exposure = Math.log(1 / luminance);
            console.log("luminance:", luminance, renderer.exposure)
        })
    })

    /////////////////////////////////////
    // Renderer
    
    const renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.setupGrid(60.0, new Visualive.Color(.53, .53, .53), 60, 0.01);

    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(0, 0, 1.2), new Visualive.Vec3(1, 0, 1.2));
    // renderer.getViewport().getCamera().focalDistance = 30;
    renderer.setScene(scene);
    renderer.exposure = 1.5;
    // renderer.displayEnvironment = false;


    renderer.resumeDrawing();
});