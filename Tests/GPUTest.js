
const gpuTest = (domElement, resources, sideCount, sphereDetail, size) => {

  const scene = new Visualive.Scene(resources);

  const addMeshShape = (name, shape, pos, material)=>{
    const geomItem = new Visualive.GeomItem(name+'Item', shape, material);
    geomItem.setLocalXfo(new Visualive.Xfo(pos));
    scene.getRoot().addChild(geomItem);
  }

  const sphere = new Visualive.Sphere(1, sphereDetail, sphereDetail);
  const material = new Visualive.Material('surfaces', 'SimpleSurfaceShader');
  material.getParameter('BaseColor').setValue(Visualive.Color.random(0.25));
  for(let i=0; i<sideCount; i++){
    for(let j=0; j<sideCount; j++){
      addMeshShape('Sphere'+i+"-"+j, sphere, new Visualive.Vec3(i*size, j*size, 0), material);
    }
  }

  const renderer = new Visualive.GLRenderer(domElement);
  renderer.getViewport().getCamera().setPositionAndTarget(new Visualive.Vec3(-20,-20,10), new Visualive.Vec3(10,10,0));
  
  renderer.setScene(scene);
  renderer.frameAll();

  renderer.resumeDrawing();
}

testingHarness.registerTest('GPUTest_1024x99904', (domElement, resources) => {
  const start = performance.now();
  gpuTest(domElement, resources, 32, 223, 2.6)
  console.log("Done 'GPUTest_1024x99904':" + (performance.now() - start));
});

testingHarness.registerTest('GPUTest_49x1001112', (domElement, resources) => {
  const start = performance.now();
  gpuTest(domElement, resources, 7, 707, 2.6)
  console.log("Done 'GPUTest_49x1001112':" + (performance.now() - start));
});

testingHarness.registerTest('GPUTest_484x1001112', (domElement, resources) => {
  const start = performance.now();
  gpuTest(domElement, resources, 22, 707, 2.6)
  console.log("Done 'GPUTest_484x1001112':" + (performance.now() - start));
});
