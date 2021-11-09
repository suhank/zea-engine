# Working With Labels

To add a label to your scene, you first create the [label](api/SceneTree/Images/Label), then add it to a [billboard item](api/SceneTree/BillboardItem), which is then rendered in the billboard pass. 
All of the billboard items you create, must be a part of the scene tree or hierarchy to be rendererd. You can add your billboard items to an 
empty [tree item](api/SceneTree/TreeItem) so that it can rendered.

1. [Adding Labels to Your Scene](manual/tutorials/labels?id=adding-labels-to-your-scene)
2. [Working With Multilingual Labels](manual/tutorials/labels?id=working-with-multilingual-labels)

> Below is an example of what you can do with labels
<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-labels?path=src/main.js&previewSize=100"
    title="zea-labels on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>



<br>


## Adding Labels to Your Scene

Add labels to your scene using the billboard renderer.

> Add this code to your project. Use the [Basic Setup Template](manual/resources/basic-setup-template.md) to get started quickly.

```javascript
// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.
const { Scene, GLRenderer, Vec3, Color, Xfo, Label, BillboardItem, TreeItem } = window.zeaEngine

function createLabel(color, labelText) {
  const label = new Label(labelText)
  label.getParameter('FontSize').setValue(48)
  label.getParameter('FontColor').setValue(color)
  label.getParameter('BackgroundColor').setValue(new Color(0.3, 0.3, 0.3)
  return label
}

function createBillboard(label, pos) {
  const billboard = new BillboardItem('billboard', label)
  const xfo = new Xfo(pos)
  billboard.getParameter('LocalXfo').setValue(xfo)
  billboard.getParameter('PixelsPerMeter').setValue(300)
  billboard.getParameter('AlignedToCamera').setValue(true)
  billboard.getParameter('Alpha').setValue(1)
  return billboard
}

export function main() {
  const renderer = new GLRenderer(document.getElementById('canvas'))
  const camera = renderer.getViewport().getCamera()
  camera.setPositionAndTarget(new Vec3(5, 6, 3), new Vec3(0, 0, 0))

  const scene = new Scene()
  scene.setupGrid(20, 10)
  renderer.setScene(scene)

  // create an empty TreeItem can be added to the scene tree to then add billboards to.
  const asset = new TreeItem('labels')
  scene.getRoot().addChild(asset)

  const label0 = createLabel(new Color(0, 1, 0), 'Hello')
  const billboard0 = createBillboard(label0, new Vec3(1, 1, 1))
  asset.addChild(billboard0)

  const label1 = createLabel(new Color(1, 1, 0), 'Long')
  const billboard1 = createBillboard(label1, new Vec3(-1, -1, 1))
  asset.addChild(billboard1)

  const label2 = createLabel(new Color(1, 1, 0), 'MyCustomLabel')
  const billboard2 = createBillboard(label2, new Vec3(0, 0.05, 0.08))
  asset.addChild(billboard2)

  renderer.resumeDrawing()
}
```
<br>

## Working With Multilingual Labels

### Loading a label pack.

> See the live example

<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-multilingual-labels?path=src/main.js&previewSize=100"
    title="zea-multilingual-labels on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>
<br>

```javascript
fetch('https://cdn.glitch.com/be58caa6-3757-4c0c-a11c-b4eaa9f5d339%2FLabelPack.labels?v=1599494954724')
  .then((response) => response.json())
  .then((data) => {
    labelManager.loadLibrary('LabelPack', data)
    addLabel(new Vec3(0, 0, 0), new Vec3(0, 0.05, 0.08), new Color(1, 1, 0), 'MyCustomLabel')
  })
```


