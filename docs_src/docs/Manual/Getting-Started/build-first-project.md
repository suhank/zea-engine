---
sidebar_position: 2
title: Build Your First Project
---

> Before we begin, please make sure you're already familiar with [Setting up your workspace](development-setup.md).

The Zea Engine enables you to build interactive 3D web apps.

In this tutorial, we will learn how to load the Zea Engine in the browser and set up your first scene:

> Try: orbit the camera around the scene.

<iframe 
    src="https://glitch.com/embed/#!/embed/zea-demo-grid?path=index.html&previewSize=100&attributionHidden=true"
    title="zea-demo-grid on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
  class="glitch" markdown="1"
></iframe>

> Hold and drag left-click to orbit, Hold and drag right-click for pan, and mouse scroll for zoom.

## Introduction to npm and unpkg

Zea Inc. distributes its libraries via [npm](https://www.npmjs.com/), which is the world's largest JavaScript package manager.

To list the pages available from Zea Inc. follow this link: https://www.jsdelivr.com/?query=%40zeainc%2F

Libraries hosted on npm can be accessed using various techniques. Among the easiest ones is to use tools like [unpkg](https://unpkg.com/), which generates URLs for each file in each package on npm, making it possible to load into the browser directly without needing to download the entire package.

ℹ️ For example, this is the unpkg URL for the Zea Engine: https://unpkg.com/@zeainc/zea-engine

If you open that URL in your browser, you will see that it displays the compiled engine's file contents. You may also notice that the URL redirects to the full path and the latest version, and in that version, the UMD build of the engine.

## Accessing the latest UMD build

[UMD](https://github.com/umdjs/umd) is a technique for distributing JavaScript packages which are capable of working everywhere, be it in the client, on the server, or elsewhere.

Within [the Zea Engine's dist folder](https://unpkg.com/@zeainc/zea-engine/dist/), there are several build files: CommonJS, ESM, and UMD. If you're not sure about which one to use, go for the UMD build, due to it's flexibility.

In this tutorial, we will start by loading the Zea Engine directly off unpkg as a UMD module.

To load this file, you can specify the path within the package: https://unpkg.com/@zeainc/zea-engine/dist/index.umd.js

ℹ️ Note: we omitted the version number, which means we default to the latest version. Initially, that is fine, but eventually you will need to lock the packages to a specific version, in that way you will have full control over which version you wish to load.

## Basic Setup

First, let's create a basic file structure for our demo project by running these commands in your terminal:

```bash
mkdir zea-engine-demo
cd zea-engine-demo
touch index.html index.js
```

You should end up with something like this:

```bash
zea-engine-demo
├── index.html
└── index.js
```

Now, let's add some content to them (feel free to copy/paste):

📄 **index.html**

```html
<!DOCTYPE html>
<html>
  <!-- download Zea Engine -- this downloads the latest build from version 3 of the engine -->
  <script src="https://cdn.jsdelivr.net/npm/@zeainc/zea-engine@3/dist/index.umd.js"></script>
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
      import { main } from './index.js'
      main() // modify this function in main.js
    </script>
  </body>
</html>
```

📄 **index.js**

Since the Zea Engine is being loaded using [UMD](https://github.com/umdjs/umd), it will add the `zeaEngine` object to the global scope, which is accessible through `window.zeaEngine` or `globalThis.zeaEngine` ([check globalThis support here](https://caniuse.com/mdn-javascript_builtins_globalthis)).

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

  // create a grid
  scene.setupGrid(10, 10)
}
```

## Running a local server

The index.html file can not be loaded without a local server, since the index.js file would be blocked by [the CORS policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). To be able to load our page in the browser, we will use [es-dev-server](https://www.npmjs.com/package/es-dev-server), a web server for development without bundling.

Run this command in your terminal:

```bash
npx es-dev-server
```

You should get an output like this:

```bash
es-dev-server started on http://localhost:8000
  Serving files from '/Users/me/zea-engine-demo'.
  Using auto compatibility mode, transforming code on older browsers based on user agent.
```

📷 Loading the given URL in your browser should generate the following result:

![getting-started-grid](../../../static/img/misc/getting-started-grid.png ':class=screenshot')

> Alternatively, if you are using [Visual Studio Code](https://code.visualstudio.com/), it's recommended you download the extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer). Live Server makes it easy to launch a local development server that reloads automatically as changes are made to your source code.

## Remix your own Zea Engine app

Using what we just learned, you can now remix your own Zea Engine apps. Try, for example, changing the number of divisions within the grid:

https://glitch.com/edit/#!/zea-demo-grid

## Next steps

Learn how to debug your app with Chrome DevTools

> [Debbugging Zea Engine](./debugging.md)
