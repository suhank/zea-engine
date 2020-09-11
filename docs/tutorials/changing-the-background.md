
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

Construct a new color value using a hex color code to specify the value of the color. He color codes are simple string values that encode colors. You can read more about them here [https://htmlcolorcodes.com/](https://htmlcolorcodes.com/).

The SceneSettings object contains parameter called 'BackgroundColor' that can be set to change the background color.

```javascript
const color = new Color('#887744')
scene.getSettings().getParameter('BackgroundColor').setValue(color)
```

<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/change-background?path=package.json&previewSize=100"
    title="change-background on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>
