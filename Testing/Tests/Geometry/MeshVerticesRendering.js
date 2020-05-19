
// testingHarness.registerTest('Geometry/Meshes/VerticesRendering', (domElement, resources)=> {
//     const Z = ZeaEngine;

//     const scene = new Z.Scene(resources);
//     let objAsset = new Z.ObjAsset('obj');
//     objAsset.splitObjects = true;
//     objAsset.splitGroupsIntoObjects = true;
//     objAsset.loadMtlFile = false;
//     scene.getRoot().addChild(objAsset);


//     const renderer = new Z.GLRenderer(div);
//     renderer.getViewport().getCamera().setPositionAndTarget(new Z.Vec3(-10, 20, 20), new Z.Vec3(0, 3, 0));
//     renderer.addPass(new Z.GLMeshPointsPass(renderer.gl));
//     renderer.setScene(scene)

//     let onLoaded = function() {
//         renderer.resumeDrawing();
//         scene.getCamera().frameView([scene.getRoot()]);
//     }
//     objAsset.loaded.connect(onLoaded);
//     objAsset.getParameter('ObjFilePath').setValue("/Assets/cow.obj");
    
// });

