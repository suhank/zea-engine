---
sidebar_position: 3
title: Setting up a Tree View in React
---

The purpose of this tutorial is to show users how to integrate a third-party or custom tree view into their project. 

This tree view will display the GeomItems of our scene and where they are in the SceneTree hierarchy.

We will be able to display something like the following in our sidebar:

![layout](../../../static/img/react/treeview.png)


For this tutorial, we'll be using the layout component [Re-Flex](https://github.com/leefsmp/Re-Flex)
and the tree view tool, [deni-react-treeview](https://github.com/denimar/deni-react-treeview)

:::note
There are some limitations with the use of Deni-react-treeview; namely, if you are looking to select a GeomItem from the treeview, if it is not a 'leaf' element, you must expand it, then select a child of that element for the original GeomItem to then be selectable. Additionally, clicking on an already selected tree view element has no effect. 
It is recommended that you build a custom treeview for your app and use this tutorial as a general guide to help you integrate your custom treeview.
:::

### React Dependencies

First, install the tree view component: 
```bash
yarn add deni-react-treeview
```


## Integrating the Tree View

### App.tsx

At the top of Main.tsx, import the component.
```tsx
// @ts-ignore
import DeniReactTreeView from 'deni-react-treeview'
```

In the Main component constructor, we can add the member variable "treeNodes" to the component's [state](https://reactjs.org/docs/faq-state.html).  

We will get the data for this object from the Viewport3D component after the scene is initialized.
```tsx
const App = () => {
  const [scene] = useState<Scene>(new Scene())
  const [treeNodes, setTree] = useState<any>([])
  
  ...
  
```
In the render() method, return the new component with the following arguments. View the [live demos](https://deni-react-treeview.vercel.app/?path=/story/1-theming--predefined-themes) with source code to learn more about what you can do with this particular tree view.

Here in render(), we pass the the treeNodes into the items object to render.
```tsx
  <ReflexElement className="left-pane">
    <DeniReactTreeView
      style={{ width: 'auto', height: '99%' }}
      theme={'classic'}
      items={this.state.treeNodes}
    />
  </ReflexElement>
```
To allow us to set the member variable "this.state.treeNodes" in Main.tsx, we need to pass a callback function to the Viewport3D component. This is necessary for the two components to share data. 

```tsx
  <Viewport3D
    setTree={(nodes: any) => {
      this.setState({ treeNodes: nodes })
    }}
  ></Viewport3D>
```
:::tip
We can also share data among components using a [Context](https://reactjs.org/docs/context.html), which may be useful in cases where data needs to be shared among many components throughout the component tree.
:::
### Viewport3D.tsx
Deni-react-treeview uses the following interface for all of the nodes of the tree view. We also add "geomItem" as this is a useful reference to keep if we want to do any operation on the selected geomItem. 

```tsx
interface ITreeNode {
  text: string
  id: number
  isLeaf: boolean
  children: ITreeNode[]
  geomItem: GeomItem | null 
}

```
In the Viewport3D component constructor, we need to add the callback that is used to set the treeNodes member variable in the Main component.
```tsx
class Viewport3D extends React.Component<any, any> {
  // ... 
  constructor(props: any) {
    super(props)
    this.state = {
      setTree: props.setTree,
    }
    this.canvasRef = React.createRef()
  }
```


Calling the following function extracts all of the GeomItems of the scene and then returns the data for the tree view to use. 
```tsx
  traverse_tree() {
    const scene_root = this.scene.getRoot()
    let nodes: ITreeNode[] = this.traverse_tree_helper(scene_root)
    const root: ITreeNode = {
      text: 'Scene',
      id: scene_root.getId(),
      isLeaf: false,
      children: nodes,
      geomItem: null,
    }
    return [root]
  }
```
The helper function below, recursively traverses the tree, looking for GeomItems and constructs ITreeNode nodes.
```tsx
  traverse_tree_helper(treeItem: TreeItem): ITreeNode[] {
    if (!treeItem) return [];

    const items = [];
    for (let child of treeItem.getChildren()) {
      if (child instanceof GeomItem) {
        // construct child node
        const childNode: ITreeNode = {
          text: child.getName(),
          id: child.getId(),
          isLeaf: true,
          children: [],
          geomItem: child,
        };
        // get child nodes of this childnode
        childNode.children = this.traverse_tree_helper(child);
        // store items to return to caller
        items.push(childNode);
      }
    }
    return items;
  }
```

Now we have what we need to populate the Main component's member variable "treeNodes"
```tsx
  componentDidMount() {
    //...
    const nodes = this.traverse_tree();
    this.state.setTree(nodes);
  }
```

## Result

![layout-complete](../../../static/img/react/treeview-complete.png)


## Conclusion
You should now have a tree view that is populated with the GeomItems in your scene. 