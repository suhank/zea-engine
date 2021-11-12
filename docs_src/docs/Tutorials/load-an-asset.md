---
sidebar_position: 3
title: Loading Asset Files
hide_table_of_contents: true
---

In this tutorial we will show how to load a simple OBJ model. For each type of asset, the correct [Asset](../API/SceneTree/SceneTree_AssetItem.AssetItem) class must be constructed and used to load the file.

Each type of asset class works in the same way so while this sample is showing loading OBJ assets, the same concepts apply to loading other types of assets, or even custom asset types. Read more about working with other asset types on the [Zea CAD Docs](https://docs.zea.live/zea-cad/#/getting-started/get-started-with-zea-cad)

> Below is the end result of this tutorial.

<iframe 
    src="https://glitch.com/embed/#!/embed/load-an-asset?path=src/main.js&previewSize=100"
    title="load-an-asset on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
  class="glitch" markdown="1"
></iframe>

## 1) Minimal Setup

First, get set up. You can do this one of two ways, locally or by using glitch.

a) [Basic Setup](basic-template.md)
Create a project locally in your favorite IDE

b) [Basic Setup on Glitch](https://glitch.com/edit/#!/zea-minimal-app)
follow the link and click 'remix to edit' at the top right of the screen to modify this project.

> To learn more about how to set up your environment, view the [Getting Started](../Manual/Getting-Started/getting-started-overview) guide.

## 2) Load an Asset

#### Loading Local Assets

The following code loads an an OBJ file into an object of type [ObjAsset](../API/SceneTree/SceneTree_ObjAsset.ObjAsset). Loading an asset is an asynchronous operation, we can create a call back like below:

```javascript
const objAsset = new ObjAsset('cow')

objAsset.load('data/cow.obj').then(() => {
  // when the load succeeds, log a comment to the console.
  console.log('Yay!')
  // once loaded, we can frame the asset using frameAll()
  renderer.frameAll()
})

scene.getRoot().addChild(objAsset)
```

#### Loading Assets From a Link

In the glitch demo, we use a different method to load an asset since we our asset is not a local one.

```javascript
const objAsset = new ObjAsset('cow')

// load an asset from a link. Note: if we set the Url to be 'data/cow.obj,' we can load local assets using this method.
objAsset
  .getParameter('FilePath')
  .setUrl('https://cdn.glitch.com/e681c657-d89f-4fda-9d85-6717a8eb198c%2Fcow.obj?v=1599493589884')

// Here we set an event listener. After the asset is done loading, objAsset will fire the event 'loaded'
objAsset.on('loaded', () => {
  renderer.frameAll()
})

scene.getRoot().addChild(objAsset)
```

The ObjAsset can only load text based .obj files, which is primarliy used in testing and creating simple examples.

> OBJ files quickly grow into large unwieldy files as the number of points and triangles in the file increases. To load larger files, there are other formats that provide more efficient storage for large meshes. Read about the alternatives in the [Zea CAD Docs](https://docs.zea.live/zea-cad/#/getting-started/get-started-with-zea-cad)

![load-asset0](../../static/img/misc/load-asset0.png)

### Positioning and Rotating the Asset

As you can see, the cow asset is lying on its side. This is because the asset was authored in an application where the y-axis was the up-axis. In Zea Engine, the Z-axis is the up axis, so to have the cow upright like intended, we have to rotate the asset to compensate for this difference.

The first step is to rotate the Asset by 90 degrees to get the cow standing on its feet. The Xfo value contains an orientation value which is a Quaternion. (see [Quat](../API/Math/Math_Quat.Quat)). Directly manipulating Quaternions can be tricky, so to set the Quaternion, we use [EulerAngles](../API/Math/Math_EulerAngles.EulerAngles), which are a more intuitive and familiar. EulerAngles use radians, so we have to convert 90 degrees to radians.

Additionally, the cow is positioned below the grid; if we want the cow to stand level with the grid
we can translate it by a value of 3.55 in the Z+ direction.

```javascript
const xfo = new Xfo()
xfo.tr.set(0, 0, 3.55)
// Using the unit conversion factor (Math.PI / 180) we can find 90 degrees in radians
xfo.ori.setFromEulerAngles(new EulerAngles(90 * (Math.PI / 180), 0, 0))
objAsset.getParameter('GlobalXfo').setValue(xfo)
```

![load-asset1](../../static/img/misc/load-asset1.png)

## Conclusion

You have learned the basics of loading assets into your web based Zea Engine App! If you want to work with other file formats, such as the ZCAD or GLTF file formats, read the [Zea CAD Docs](https://docs.zea.live/zea-cad/#/getting-started/get-started-with-zea-cad)
