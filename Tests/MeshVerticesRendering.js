
testingHarness.registerTest('MeshVerticesRendering', (domElement, resources)=> {


    const scene = new Visualive.Scene(resources);
    let objAsset = new Visualive.ObjAsset('obj');
    objAsset.splitObjects = true;
    objAsset.splitGroupsIntoObjects = true;
    objAsset.loadMtlFile = false;
    scene.getRoot().addChild(objAsset);


    const renderer = new Visualive.GLSimpleRenderer(div);
    renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-10, 20, 20), new Visualive.Vec3(0, 3, 0));
    renderer.addPass(new Visualive.GLMeshPointsPass(renderer.gl));
    renderer.setScene(scene)

    let onLoaded = function() {
        renderer.resumeDrawing();
        scene.getCamera().frameView([scene.getRoot()]);
    }
    objAsset.loaded.connect(onLoaded);
    objAsset.loadURL("Assets/cow.obj");
    
});

