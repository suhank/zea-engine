# Using Zea Engine with React

### What is React
React is a popular client side library for building Single Page Applications.

https://reactjs.org/

### App.js

To setup the engine in a React based app, implement componentDidMount and create the scene and renderer there. You can also use our library of user interface widgets to provide a rich UI to your app.


```javascript
import React, { Component } from "react";
import "./App.css";

import {
  Vec3,
  Color,
  Scene,
  GLRenderer,
  PassType
} from '@zeainc/zea-engine'
import {
  CADAsset,
  GLCADPass
} from '@zeainc/zea-cad'


class App extends Component {
  
  componentDidMount(){
    const scene = new Scene();
    scene.setupGrid(7.0, 50);

    const domElement = document.getElementById("renderer");

    const renderer = new GLRenderer(domElement);
    renderer.setScene(scene);
    renderer
      .getViewport()
      .getCamera()
      .setPositionAndTarget(
        new Vec3(2, 2, 1.7),
        new Vec3(0, 0, 0.4)
      );
    renderer.resumeDrawing();

    const cadPass = new GLCADPass()
    renderer.addPass(cadPass)

    
    const asset = new CADAsset('test');
    asset.load('./path/to/MyFile.zcad')
    asset.loaded.connect(()=>{
      renderer.frameAll();
    })
    scene.getRoot().addChild(asset);
  }

  render() {
    return (
      <div slot="b" id="renderer"></div>
    );
  }
}
export default App;
```

