---
sidebar_position: 3
title: Setting up a Zea Tree View in React
---


:::note
This is a standalone tutorial which explains how the tree view is used in the [zea-react-template](https://github.com/ZeaInc/zea-react-template)
:::

The purpose of this tutorial is to provide a quick overview on how the zea tree view component is used within the zea react template.

This tree view will display the GeomItems of our scene and where they are in the SceneTree hierarchy.

We will be able to display something like the following in our sidebar:

![layout](../../../static/img/card-icons/zea-react-template.png)


### React Dependencies

First, install the tree view component: 
```bash
yarn add @zeainc/zea-tree-view
```


## Integrating the Tree View

First we need to create a [React hook](https://reactjs.org/docs/hooks-intro.html) to manage loading the web component based tree view. 

```tsx
import '@zeainc/zea-tree-view'

import { useEffect, useRef } from 'react'

const ZeaTreeViewWrapper = (props: any) => {
  const ref = useRef<any>()

  useEffect(() => {
    const { current } = ref
    const { scene, appData } = props

    // This guard prevents loading the tree without the appData object or setting the tree twice.
    if (!current.rootTreeItem && appData) {
      appData.displayTreeComplexity = false
      current.setTreeItem(scene.getRoot(), appData)
    }
  })

  // @ts-ignore
  return <zea-tree-view ref={ref}></zea-tree-view>
}

export { ZeaTreeViewWrapper }

```



### Main.tsx

At the top of Main.tsx, import the newly created hook.
```tsx
import { ZeaTreeViewWrapper } from '../ZeaTreeViewWrapper/ZeaTreeViewWrapper'
```

Within the return method, we can add our tree view and pass in the scene object, which we get from Main.tsx and appData object which we get from the Viewport3D component.
To get objects from components, we could either use a [React Context](https://reactjs.org/docs/context.html) or callbacks. 

```tsx
<div className="Main__left-pane">
  <ZeaTreeViewWrapper scene={scene} appData={appData} />
</div>
```

In our React template, we use callbacks in the Viewport3D component to retrieve the AppData object. 
Below is the snippet demonstrating this in the Viewport3D componentDidMount() method.

```tsx
    // appData is used in initializing the selectionManager and ZeaTreeView web component
    const appData: AppData = {
      scene: this.scene,
      renderer: this.renderer,
      selectionManager: null,
      parentItem: null,
      session: null,
    }

    // Setup SelectionManager for highlights
    this.selectionManager = new SelectionManager(appData, {
      selectionOutlineColor: new Color(1, 1, 0.2, 0.1),
      branchSelectionOutlineColor: new Color(1, 1, 0.2, 0.1),
    })

    appData.selectionManager = this.selectionManager

    //send appData back to App.tsx, then to ZeaTreeViewWrapper.
    this.state.setAppData(appData)
```

## Result

![layout](../../../static/img/card-icons/zea-react-template.png)


## Conclusion
This was a quick overview on how to integrate the zea tree view to your react project.