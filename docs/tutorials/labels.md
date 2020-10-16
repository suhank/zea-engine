# Setting up the Labels


```javascript
const domElement = document.getElementById("viewport");

const scene = new Scene();
scene.setupGrid(20, 10);

const asset = new TreeItem('labels');

let index = 0;
const addLabel = (lineEndPos, pos, color, name)=> {
  const label = new Label(name, 'Labels');
  label.getParameter('fontSize').setValue(48);
  label.getParameter('fontColor').setValue(color);
  label.getParameter('backgroundColor').setValue(new Color(0.3, 0.3, 0.3));
  
  const billboard = new BillboardItem('billboard'+index, label);
  const xfo = new Xfo(pos);
  billboard.setLocalXfo(xfo);
  billboard.getParameter('PixelsPerMeter').setValue(100);
  billboard.getParameter('AlignedToCamera').setValue(true);
  billboard.getParameter('Alpha').setValue(1);
  // billboard.getParameter('lineEnd').addElement(lineEndPos);
  // billboard.getChildByName('line0').getMaterial().getParameter('Color').setValue(new Color(.7, .7, .7));
  asset.addChild(billboard);

  index++;
}
addLabel(new Vec3(1, 0, 0), new Vec3(1, 1, 1), new Color(0, 1, 0), "Hello");
addLabel(new Vec3(-1, 0, 0), new Vec3(-1, -1, 1), new Color(1, 1, 0), "Long");
addLabel(new Vec3(0, 0, 0), new Vec3(0, 0.05, 0.08), new Color(1, 1, 0), "MyCustomLabel");

scene.getRoot().addChild(asset);

const renderer = new GLRenderer(domElement);
renderer.getViewport().getCamera().setPositionAndTarget(new Vec3(5, 6, 3), new Vec3(0, 0, 0));
renderer.setScene(scene);
renderer.resumeDrawing();
```


> See the live example

<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-labels?path=src/main.js&previewSize=100"
    title="zea-labels on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>
