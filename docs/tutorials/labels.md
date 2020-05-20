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

[Labels](./Labels.html ':include :type=iframe width=100% height=800px')

Click here to download the file to your computer to try it for yourself: 
<a id="raw-url" href="./tutorials/Labels.html" download>Download</a>


<!-- [MultilingualLabels](./MultilingualLabels.html ':include :type=iframe width=100% height=800px') -->

<!-- 
Click here to download the file to your computer to try it for yourself: 
<a id="raw-url" href="./tutorials/MultilingualLabels.html" download>Download</a>  -->

<!-- 
[zea_engine_DynamicScenes_Gears](https://codesandbox.io/embed/zeaenginedynamicscenesgears-4yhoz?fontsize=14&theme=dark ':include :type=iframe width=100% height=600px allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"') -->


