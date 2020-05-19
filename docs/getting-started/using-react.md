# Using Zea Engine with React

### What is React

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
import { SelectionManager } from '@zeainc/zea-ux'

import './zea-fps-display.js'

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
    renderer.addPass(cadPass, PassType.OPAQUE)

    
    const asset = new CADAsset('test');
    asset.getParameter('DataFilePath').setUrl(process.env.PUBLIC_URL+'/Autruche.zcad');
    asset.loaded.connect(()=>{
      renderer.frameAll();
    })
    scene.getRoot().addChild(asset);


    ////////////////////////////////////
    // Setup the Left side Tree view.
    
    const appData = {
      scene,
      renderer
    }
    
    appData.selectionManager  = new SelectionManager(appData);

    const sceneTreeView = document.getElementById(
      "zea-tree-view"
    );
    sceneTreeView.rootItem  = scene.getRoot()
    sceneTreeView.appData = appData


    ////////////////////////////////////
    // Display the Fps
    const fpsDisplay = document.createElement("zea-fps-display")
    fpsDisplay.renderer  = renderer
    domElement.appendChild(fpsDisplay)
        
  }

  render() {
    return (
      <zea-layout
        orientation="vertical"
        cell-a-size="5"
        resize-cell-a="false"
        cell-c-size="5"
        resize-cell-c="false"
      >
        <div slot="a">
          <img alt="ZEA" id="logo" src="./logo-zea.svg"/>
        </div>
        <zea-layout slot="b" cell-a-size="200" cell-c-size="5" resize-cell-c="false">
          <div slot="a">
            <zea-tree-view  id="zea-tree-view"></zea-tree-view>
          </div>
          <div slot="b" id="renderer"></div>
        </zea-layout>
      </zea-layout>
    );
  }
}
export default App;
```

