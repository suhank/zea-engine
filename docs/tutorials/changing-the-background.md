
## Changing the Background Color


```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script type=module>
import { Scene, GLRenderer, Color } from "https://unpkg.com/@zeainc/zea-engine@1.0.7/dist/index.esm.js"

const domElement = document.getElementById("app");

const scene = new Scene();
scene.setupGrid(10.0, 10);

const color = new Color('#887744')
scene.getSettings().getParameter('BackgroundColor').setValue(color)

const renderer = new GLRenderer(domElement);
renderer.setScene(scene);
renderer.resumeDrawing();
  </script>
</html>
```


```javascript
const color = new Color('#887744')
scene.getSettings().getParameter('BackgroundColor').setValue(color)
```


[Different Background Color](./ChangeBackgroundColor.html ':include :type=iframe width=100% height=800px')

Click here to download the file to your computer to try it for yourself: 
<a id="raw-url" href="./tutorials/ChangeBackgroundColor.html" download>Download</a>