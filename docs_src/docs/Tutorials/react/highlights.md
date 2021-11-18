---
sidebar_position: 4
title: Highlighting objects from the Tree View
---

In this tutorial, we will cover how to use the tree view to select items in our scene. 

## Making select work from the viewport and treeview.
### Viewport3D.tsx

First, we can add the callback "setSelected" to our component's state. This will be set by the Main component. The callback will enable us to modify the state (which variable is selected) of the Main component.
```tsx
class Viewport3D extends React.Component<any, any> {
  scene: Scene = new Scene()
  renderer?: GLRenderer
  canvasRef: React.RefObject<any>
  constructor(props: any) {
    super(props)
    this.state = {
      setSelected: props.setSelected,
      setTree: props.setTree,
    }
    this.canvasRef = React.createRef()
  }
  // ...
```


We can add an event listener to our viewport. We can do this by using the "on" method with the right arguments.
When a click happens within the viewport, we will check to see if there are any intersections with our pointer ray and the geometry of our scene.
```tsx 
  componentDidMount() {
    this.renderer = new GLRenderer(this.canvasRef.current)
    this.renderer.setupScene(this.scene)
    this.scene.setupGrid(10, 10)

    const camera = this.renderer.getViewport().getCamera()
    camera.setPositionAndTarget(new Vec3(6, 6, 5), new Vec3(0, 0, 1.5))

    this.setupScene()

    const nodes = this.traverse_tree()
    this.state.setTree(nodes)
    
    this.renderer.getViewport().on('pointerDown', (event: any) => {
      const geomItem = event?.intersectionData?.geomItem
      if (geomItem instanceof GeomItem) {
        this.state.setSelected(geomItem)
      } else {
        this.state.setSelected(null)
      }
    })
  }
```


To actually highlight a GeomItem, we can use the method addHighlight().
```tsx
  toggle_highlight(treeItem: GeomItem) {
    if (treeItem == null) return
    if (!(treeItem instanceof GeomItem)) return

    if (!treeItem.isHighlighted()) {
      treeItem.addHighlight('hl', new Color(1.0, 1.0, 0.2, 0.5), false)
    } else {
      treeItem.removeHighlight('hl', false)
    }
  }

  unhighlight(treeItem: GeomItem) {
    if (treeItem == null) return
    if (!(treeItem instanceof GeomItem)) return

    if (treeItem.isHighlighted()) {
      treeItem.removeHighlight('hl', false)
    }
  }
```

This method will execute when any of the component's state changes. Here, we check if the selected object has changed, and if so, we highlight it.
```tsx
  componentDidUpdate(prevProps: any) {
    if (prevProps.selected !== this.props.selected) {
      this.unhighlight(prevProps.selected)
      this.toggle_highlight(this.props.selected)
    } else {
      this.toggle_highlight(this.props.selected)
    }
  }
```


### Main.tsx

In Main.tsx, we can augment the existing state variable to include "selected." When the selected variable changes, this will cause the render() method of the Main component to execute.
This is useful since, in the render() method we pass props containing the "selected" variable in. We can use this to later compare the previously selected object and currently selected object to then determine which object we should highlight.

```tsx
class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      treeNodes: [],
      selected: null,
    }
  }
```

This is a handler that is used in the DeniReactTreeView component. When we click on a item in the tree view, it will trigger this code. The code below sets the "selected" state variable.
```tsx
onSelectItemHandler = (item: any) => {
  this.setState({ selected: item.geomItem })
}
```

Here we add the above handler to the DeniReactTreeView.
```tsx
<DeniReactTreeView
  style={{ width: 'auto', height: '99%' }}
  theme={'classic'}
  items={this.state.treeNodes}
  onSelectItem={this.onSelectItemHandler}
/>
```

We also have to pass the setSelected callback, along with the selected state variable.
```tsx
<Viewport3D
  selected={this.state.selected}
  setSelected={(selected: number) => {
    this.setState({ selected: selected })
  }}
  setTree={(nodes: any) => {
    this.setState({ treeNodes: nodes })
  }}
></Viewport3D>

```

## Result
![highlight](../../../static/img/react/highlight-result.png)
## Conclusion

You should now be able to select GeomItems in the scene with either the tree view or by clicking on the viewport.