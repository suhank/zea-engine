# Basic Setup Template

Here is a minimal example you can copy into your favorite IDE. <br>
Create a directory structure like the following, then copy and paste the contents of index.html and main.js, found below, into your project.

```bash
myProject
├── index.html
└── main.js
```

An example of this setup can be found on [glitch](https://glitch.com/edit/#!/zea-minimal-app). After clicking on the link, click 'remix to edit' at the top right of the screen to modify this project.

> If you are using [Visual Studio Code](https://code.visualstudio.com/), it's recommended you download the extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Live Server makes it easy to launch a local development server that reloads automatically as changes are made to your source code.

### index.html

```html
<!DOCTYPE html>
<html>

  <!-- download Zea Engine -- this downloads the latest build from version 3 of the engine -->
  <script crossorigin src="https://cdn.jsdelivr.net/npm/@zeainc/zea-engine@3/dist/index.umd.js"></script>
  <!-- download our stylesheet -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.9/tailwind.min.css" />

  <head>
    <title>Zea Engine App</title>
  </head>
  
  <body class="overflow-hidden">

    <div class="layout grid h-screen">
      <main>
        <!-- HTML Canvas -- what we render to -->
        <canvas id="canvas"></canvas>
      </main>
    </div>

    <!-- Run your code here -->
    <script type="module">
      import { main } from './main.js'
      main() // modify this function in main.js
    </script>

  </body>
</html>
```

### main.js

```javascript
// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.
const { Scene, GLRenderer, Vec3, Color, Xfo, Quat, GeomItem, Sphere, Material, Ray, MathFunctions } = window.zeaEngine

export function main() {
  // create a new scene
  const scene = new Scene()

  // create a new renderer and attach it to our HTML Canvas
  const renderer = new GLRenderer(document.getElementById('canvas'))

  // attach the scene to the renderer. Anything attached to this scene will now be rendererd.
  renderer.setScene(scene)

  // get the camera from renderer
  const camera = renderer.getViewport().getCamera()
  // set camera's target and position.
  camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))

  // These variables can be used later in our program
  const grid_size = 10
  const grid_div = 10
  const grid_div_size = grid_size / grid_div

  scene.setupGrid(grid_size, grid_div)

  /*
      Write your code below
  */
}
```
