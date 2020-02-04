window.vlmain = function(domElement, resources) {
  const scene = new ZeaEngine.Scene(resources)
  const renderer = new ZeaEngine.GLRenderer(domElement)
  renderer.setScene(scene)
  renderer.resumeDrawing()
  scene.setupGrid(1, 10)
}
