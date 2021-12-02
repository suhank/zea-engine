---
sidebar_position: 1
title: Using Zea Engine with React
---

# Using Zea Engine with React

This tutorial covers the integration and use of React with Zea Engine. 
[React](https://reactjs.org/) is a popular client side library for building web applications. We can use React to build the UI for a Zea Engine app. 

## Creating a React project with Typescript
Use the following command to create a new project.

```
yarn create react-app my-app --template typescript
```
<!-- yarn install -->
### React Dependencies

First, we should add Zea Engine to our project. We can do this with the following command.
```bash
yarn add @zeainc/zea-engine
```


## React Components
In React, a component is a class that extends React.Component and consists of a [render](https://reactjs.org/docs/react-component.html#render)() method, which returns the React elements to be rendered; these elements are written in [JSX/TSX](https://reactjs.org/docs/introducing-jsx.html). A component can also have an optional constructor, custom methods, or lifecycle methods like componentDidMount, componentDidUpdate, which are both used in this tutorial. 

:::tip
View [react-lifecycle-methods-diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) to learn about the variety of methods that React calls and the order in which those methods execute.
:::

### App.tsx
In App.tsx and copy the contents below into the newly created file.
In this component, we will compose the tree view and renderer within the layout component to set up our screen.


```tsx
import { Scene } from '@zeainc/zea-engine'
import { useEffect, useState } from 'react'
import { Viewport3D } from './Viewport3D'

import './App.css'


const App = () => {
  const [scene] = useState<Scene>(new Scene())

  return (
    <Viewport3D scene={scene} />
  )
}

export default App
```


### Viewport3D.tsx
Create a file Viewport3D.tsx in a new directory src/components/ and copy the contents below into the newly created file.

```tsx
import React from "react";

class Viewport3D extends React.Component<any, any> {
  canvasRef: React.RefObject<any>
  constructor(props: any) {
    super(props);
    this.state = {};
    this.canvasRef = React.createRef()
  }

  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {}

  // this method is called the 'props' of the component are changed.
  componentDidUpdate(prevProps: any) {}

  // The Viewport3D component needs a reference to the canvas in order to initialize.
  render() {
    return (
      <canvas
        ref={this.canvasRef}
        className="screen"
        id="canvas"
        width="500px"
        height="500px"
      />
    );
  }
}

export { Viewport3D };
```


### App.css
To give our components custom styling, replace the contents of App.css with the following:
```css
html,
body,
#root {
  height: 100%;
  width: 100%;
}

.App {
  font-family: sans-serif;
  text-align: center;
  display: flex;
  height: 100%;
  width: 100%;
}

.App__bar {
  height: 100%;
  width: 5rem;
  background: blue;
  cursor: pointer;
}

.App__content {
  height: 100%;
  width: calc(100% - 5rem);
}

.screen {
  display: flex;
}
```
Now that we have our basic setup, we can now look to render a basic scene. 
## Displaying a grid

### Viewport3D.tsx

Going back to Viewport3D.tsx, to display a simple scene, we just need to import Scene and GLRenderer classes from "@zeainc/zea-engine"
then add member variables 'scene' and 'renderer'
```tsx
import {
  Scene,
  GLRenderer,
  Vec3,
  Material,
  Sphere,
  GeomItem,
  Color,
  Xfo,
  TreeItem,
} from "@zeainc/zea-engine";

class Viewport3D extends React.Component<any, any> {
  scene: Scene = new Scene();
  renderer?: GLRenderer;
  canvasRef: React.RefObject<any>

```
Along with adding the dependencies and member variables, we will want to initialize the renderer once the HTMLCanvas element is loaded. We can do this by initializing the
renderer in componentDidMount(), which waits for the canvas to load. In the render() method, we see that the Canvas hook is used/rendered.

```tsx
  // this method is called when the component is initially mounted and initially renders.
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current);
    this.renderer.setupScene(this.scene);

    // The parameters for setupGrid are gridSize, the size of the grid
    // and the resolution, or the number of divisions in the grid.
    this.scene.setupGrid(10, 10);

    const camera = this.renderer.getViewport().getCamera();
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5));
  }

```

With this change, we should now see a basic scene rendered once the command yarn start is used.

```bash
cd my-app
yarn start
```
![screen](../../../static/img/react/grid-view.png)

## Adding geometry to our scene

The following method setupScene() simply adds several spheres to our scene in a hierarchy. We can add this method to Viewport3D.tsx.

```tsx
  setupScene() {
    const material = new Material('surfaces', 'SimpleSurfaceShader')
    material.getParameter('BaseColor')?.setValue(new Color(0.5, 0.5, 0.5))
    const sphere = new Sphere(1.0, 20, 20)

    const createSphere = (name: string, position: Vec3) => {
      const geomItem = new GeomItem(name, sphere, material, new Xfo(position))
      return geomItem
    }
    
    const geomItem0 = createSphere('sphere0', new Vec3(0, 0, 0))
    const geomItem1 = createSphere('sphere1', new Vec3(0, 5, 0))
    const geomItem2 = createSphere('sphere2', new Vec3(0, -5, 0))
    const geomItem3 = createSphere('sphere3', new Vec3(5, 0, 0))
    const geomItem4 = createSphere('sphere5', new Vec3(-5, 0, 0))

    // Add geometry to the SceneTree and also create a hierarchy of geometry by parenting geometry.
    this.scene.getRoot().addChild(geomItem0)
    this.scene.getRoot().addChild(geomItem1)
    geomItem1.addChild(geomItem2)
    geomItem2.addChild(geomItem3)
    geomItem2.addChild(geomItem4)
  }
```
After adding this as a method to the Viewport3D component, we can call this method after initializing the scene in the componentDidMount() method.
```tsx
  componentDidMount() {
    // ...
    this.setupScene()
  }
```

## Result

![screen](../../../static/img/react/screen.png)

## Conclusion
You should now be able to use Zea Engine with React. 
Future tutorials will cover how to manage the layout of your UI and how to work with a third-party tree view.

