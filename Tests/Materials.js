testingHarness.registerTest('Materials', (domElement, resources)=> {
    
    let scene = new Visualive.Scene(resources);

    let envMapName = "Assets/hdri_sky_02_sample" + (Visualive.SystemDesc.isMobileDevice ? 2 : 0) + ".vlh";
    let envMap =  new Visualive.FileImage2D(envMapName, scene.getResourceLoader());
    scene.setEnvMap(envMap);

    let addMeshShape = (name, shape, pos, mat)=>{
        let geomItem = new Visualive.GeomItem(name, shape, mat);
        geomItem.setLocalXfo(new Visualive.Xfo(pos));
        scene.getRoot().addChild(geomItem);
    }
    for(let i=0; i<10; i++){
        for(let j=0; j<10; j++){
            let material = new Visualive.Material('surfaces', 'StandardSurfaceShader');
            material.addParameter('baseColor', new Visualive.Color(0.6, 0.0, 0.0));
            material.addParameter('roughness', i/9);
            material.addParameter('metallic', j/9);
            if(j < 6)
                material.addParameter('reflectance', 0.02);
            else
                material.addParameter('reflectance', 0.5);
            addMeshShape('Sphere'+i+"-"+j, new Visualive.Sphere(1.4, 40), new Visualive.Vec3(i*3.4, j*3.4, 0), material);
        }
    }
    
    let renderer = new Visualive.GLVisualiveRenderer(domElement);
    renderer.exposure = 1.0;
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(1,2,1), new Visualive.Vec3(0,0,0));
    
    renderer.setScene(scene);
    renderer.frameAll();

    renderer.resumeDrawing();

});