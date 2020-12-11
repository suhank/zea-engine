
## Changing the Background Color


```html
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <canvas id="renderer"></canvas>

    <script crossorigin src="https://cdn.jsdelivr.net/npm/@zeainc/zea-engine@3.0.1"></script>
    <script type=module>
      import { Scene, GLRenderer, Color } from "window.zeaEngine"

      const domElement = document.getElementById("renderer");
      const scene = new Scene();
      scene.setupGrid(10.0, 10);

      const color = new Color("#7460e1");
      scene.getSettings().getParameter("BackgroundColor").setValue(color);

      const renderer = new GLRenderer(domElement);
      renderer.setScene(scene);
      renderer.resumeDrawing();
    </script>
  </body>
</html>
```

Construct a new color value using a hex color code to specify the value of the color. He color codes are simple string values that encode colors. You can read more about them here [https://htmlcolorcodes.com/](https://htmlcolorcodes.com/).

The SceneSettings object contains parameter called 'BackgroundColor' that can be set to change the background color.

```javascript
const color = new Color("#7460e1");
scene.getSettings().getParameter("BackgroundColor").setValue(color);
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
