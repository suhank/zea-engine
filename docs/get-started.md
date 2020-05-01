# Getting Started using the engine

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

const renderer = new ZeaEngine.GLRenderer(domElement);
renderer.setScene(scene);
renderer.resumeDrawing();
  </script>
</html>
```

### Creating the Scene

```javascript
const scene = new ZeaEngine.Scene();
```

### Setting up the Grid

```javascript
scene.setupGrid(10.0, 10);
```

### Creating the Renderer

```javascript
const renderer = new ZeaEngine.GLRenderer(domElement);
```

### Connecting the Renderer to the scene.

```javascript
renderer.setScene(scene);
```

> The live example

[Hello World](./tutorials/HelloWorld.html ':include :type=iframe width=100% height=800px')

The example comes with a few things already configured. 

There is already a camera matnipulator attacched to the viewport, so you can move the camera around by clikcing and dragging and zoom in and out using the mouse wheel. 
