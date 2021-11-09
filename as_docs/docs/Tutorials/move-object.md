---
sidebar_position: 2
title: Moving Objects Using Your Mouse
hide_table_of_contents: true
---

In this tutorial, we will cover how to move objects with the mouse using events.

1. [Minimal Setup](#1-minimal-setup)
2. [Adding Geometry](#2-adding-geometry)
3. [Adding Listeners](#3-adding-listeners)

Below, you'll find an interactive demo and the end result of this tutorial.

> Try: click on the sphere and move it around.

<iframe 
    src="https://glitch.com/embed/#!/embed/sphere-drag?path=index.html&previewSize=100"
    title="sphere-drag on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
  class="glitch" markdown="1"
></iframe>

## 1) Minimal Setup

First, get set up. You can do this one of two ways, locally or by using glitch.

a) [Basic Setup](basic-template.md)
Create a project locally in your favorite IDE

b) [Basic Setup on Glitch](https://glitch.com/edit/#!/zea-minimal-app)
follow the link and click 'remix to edit' at the top right of the screen to modify this project.

> To learn more about how to set up your environment, view the [Getting Started](../Manual/Getting-Started/getting-started-overview.md) guide.

## 2) Adding Geometry

Let's add a sphere to our scene. We do this by creating a material for the object to use, along with procedurally created [sphere](../API/SceneTree/Geometry/Shapes/SceneTree_Geometry_Shapes_Sphere.Sphere) for our [GeomItem](../API/SceneTree/SceneTree_GeomItem.GeomItem) to reference.
Then we add our new geomItem to our scene tree; we can add a geomItem to the scene tree since GeomItem is a subclass of [TreeItem](../API/SceneTree/SceneTree_TreeItem.TreeItem)

```javascript
// Let's create a new material that uses the 'Simple Surface Shader.'
const material = new Material('surfaces', 'SimpleSurfaceShader')

// Here we access the BaseColor parameter and set the value to a light gray.
material.getParameter('BaseColor').setValue(new Color(249 / 255, 206 / 255, 3 / 255))

// Here we create procedural geometry to be used by our geomItems.
// radius = 1.0, vertical sections = 20, horizontal sections = 20
const sphere = new Sphere(1.0, 20, 20)

// Let's create a GeomItem.
const geomItem = new GeomItem('sphere_name', sphere, material)

// If we want to render our newely created geomItem, we have to add it to our scene tree.
scene.getRoot().addChild(geomItem)
```

You should now have a sphere positioned at the center of the grid.

![sphere](../../static/img/misc/sphere-drag-step2.png ':class = screenshot')

## 3) Adding Listeners

Here we add three event listeners, pointerDown, pointerUp, and pointerMove, to geomItem.

- PointerDown will be triggered when we click with our mouse while our cursor is hovering over our geomItem.
- PointerUp will be triggered when we release a click with our mouse while our cursor is hovering over our geomItem.
- PointerMove will be triggered every frame when our cursor is over the geomItem.

```javascript
// an example of registering an event listener to an object in our scene.
geomItem.on('pointerDown', (event) => {
  // called every time we click down on the geomItem.
})
```

> View [GLViewport](../API/Renderer/Renderer_GLViewport.GLViewport) and [TreeItem](../API/SceneTree/SceneTree_.TreeItem) to learn more about what events are emitted by the Viewport and TreeItem classes.

#### Basic Dragging Functionality

To create dragging functionality, we need to use the method setCapture() and releaseCapture(). We use these methods so that geomItem captures all of the 'pointerMove' events even when our cursor is not over the sphere. If we did not use setCapture() and releaseCapture(), the sphere would not update it's position if our cursor was not hovering over the sphere.

```javascript
let dragging = false

geomItem.on('pointerDown', (event) => {
  // event.setCapture() will send all events to geomItem until event.releaseCapture() is called.
  // this is useful here, since our cursor is likely to leave the sphere as we drag toward where
  /// we want the sphere to go.
  event.setCapture(geomItem)
  dragging = true
})

// geomItem listens to 'pointerMove' event.
geomItem.on('pointerMove', (event) => {
  if (dragging) {
    // if dragging is still true (by not releasing the mouse button) this code should run.
    /*
          Add dragging code here
        */
  }
})

geomItem.on('pointerUp', (event) => {
  if (event.getCapture() == geomItem) {
    event.releaseCapture()
    dragging = false
  }
})
```

#### Ray-Plane Intersection

The events emitted by the GeomItem are similar to 'mouseMove' or 'mouseDown' on a 2d DOM element. They are different in that they have a few more properties specific to 3d scenes. One property available on the event is 'pointerRay', which is the ray that starts at the current camera position, and goes through the clicked pixel in your screen into the 3d world.

The following code finds the point of intersection between the ground plane and the pointerRay. We will use this in the dragging code found below.

```javascript
// this function returns the point of intersection between the ground plane and pointer ray.
function ray_plane_intersection(event) {
  const ray = event.pointerRay
  // A plane with an infinite span can be represented as a ray (point and direction)
  // in this case, the floor is at point (0,0,0) and points upwards.
  const floor = new Ray(new Vec3(0, 0, 0), new Vec3(0, 0, 1))
  const dist = ray.intersectRayPlane(floor)
  const hit_pt = ray.start.add(ray.dir.scale(dist))
  return hit_pt
}
```

#### On Pointer Move Event Code

Add this code to the 'pointerMove' event block. This code will look at the positions of the sphere and the ray-plane intersection, then move the sphere to intersection point. If the position is outside the grid, we find the closest point that is within the grid to move the sphere to.

```javascript
// get xfo of sphere
const geomItem_xfo = geomItem.getParameter('GlobalXfo').getValue()
// get transform of sphere (i.e. it's position in xyz space)
const old_pos = geomItem_xfo.tr

// this gets the intersection of pointer ray and ground plane. This will be the next position for our sphere.
const hit_pt = ray_plane_intersection(event)

// limit sphere to stay within the grid
let x = Math.min(Math.max(hit_pt.x, -grid_size / 2.0), grid_size / 2.0)
let y = Math.min(Math.max(hit_pt.y, -grid_size / 2.0), grid_size / 2.0)
// create a new Vec3 with desired new coordinates
let new_pos = new Vec3(x, y, old_pos.z)

// Optionally, add grid snapping
// const grid_x = Math.round(x/grid_div_size)*grid_div_size
// const grid_y = Math.round(y/grid_div_size)*grid_div_size
// new_pos = new Vec3(grid_x, grid_y, old_pos.z)

// set sphere's new position.
geomItem_xfo.tr = new_pos
geomItem.getParameter('GlobalXfo').setValue(geomItem_xfo)
```

## Challenges

- enable grid snapping
- change the color of the sphere based on the position within the grid.

## Conclusion:

In this tutorial we covered how to add procedural geometry to our scene and how to add listeners to a geomItem in our scene tree.

<!-- ## Next Steps -->

<!-- # TODO: also write subsequent tutorial covering object targeting via look-at rotation method.
In this tutorial, we will go over how to create an object that tracks another objects position using events. -->
