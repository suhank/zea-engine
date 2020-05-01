
## Changing the Background Color


```
<!DOCTYPE html>
<html>
  <head>
    <title>Hello World</title>
    <meta charset="UTF-8"/>
    <script src="https://unpkg.com/@zeainc/zea-engine@1.0.4/dist/zea-engine.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script>
const domElement = document.getElementById("app");

const scene = new ZeaEngine.Scene();
scene.setupGrid(10.0, 10);

const color = new ZeaEngine.Color('#887744')
scene.getSettings().getParameter('BackgroundColor').setValue(color)

const renderer = new ZeaEngine.GLRenderer(domElement);
renderer.setScene(scene);
renderer.resumeDrawing();
  </script>
</html>
```

### Setting the Color Value
```javascript
const color = new ZeaEngine.Color('#887744')
scene.getSettings().getParameter('BackgroundColor').setValue(color)
```


[Different Background Color](./HelloWorld-DifferentBackgroundColor.html ':include :type=iframe width=100% height=800px')