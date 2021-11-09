---
sidebar_position: 4
title: Setting up the Highlights
hide_table_of_contents: true
---

This tutorial covers how to create and use groups to highlight objects.

> Try: hover over the various groups in the scene and see the highlights in action.

<iframe 
    src="https://glitch.com/embed/#!/embed/zea-highlight?path=src/main.js&previewSize=100"
    title="zea-highlight on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
  class="glitch" markdown="1"
></iframe>

## 1) Minimal Setup

First, get set up. You can do this one of two ways, locally or by using glitch.

a) [Basic Setup](basic-template.md)
Create a project locally in your favorite IDE

b) [Basic Setup on Glitch](https://glitch.com/edit/#!/zea-minimal-app)
follow the link and click 'remix to edit' at the top right of the screen to modify this project.

> To learn more about how to set up your environment, view the [Getting Started](getting-started) guide.

## 2) Create Groups and Add Highlights

```javascript
// Zea Engine dependencies stored in new const variables. View the API to see what you can include and use.
const {
  Scene,
  GLRenderer,
  Vec3,
  Color,
  Xfo,
  Group,
  TreeItem,
  Material,
  Sphere,
  GeomItem,
  Plane,
  Cuboid,
  Cone,
  Cylinder,
  Torus
} = window.zeaEngine

export function main() {
  const scene = new Scene()
  const renderer = new GLRenderer(document.getElementById('canvas'))
  const camera = renderer.getViewport().getCamera()
  camera.setPositionAndTarget(new Vec3(25, 25, 13), new Vec3(10, 0, 0))

  renderer.setScene(scene)
  renderer.resumeDrawing()

  scene.setupGrid(60.0, 6)

  const tree1 = new TreeItem('tree1')
  scene.getRoot().addChild(tree1)

  const group1 = new Group('group1')
  group1.getParameter('HighlightColor').setValue(new Color('lemonchiffon'))
  scene.getRoot().addChild(group1)

  const group2 = new Group('group2')
  group2.getParameter('HighlightColor').setValue(new Color('mediumblue'))
  scene.getRoot().addChild(group2)

  const standardMaterial = new Material('surfaces', 'SimpleSurfaceShader')
  standardMaterial.getParameter('BaseColor').setValue(new Color(89 / 255, 182 / 255, 92 / 255))

  const addGeomItem = (shape, row, count, i) => {
    const geomItem = new GeomItem('Item' + row + '-' + i, shape, standardMaterial)
    geomItem.getParameter('LocalXfo').setValue(new Xfo(new Vec3(i * 3, row * 3, 0)))
    tree1.addChild(geomItem)

    group1.addItem(geomItem)
    if (i % 2 == 0) group2.addItem(geomItem)
  }
  const addMeshShape = (shape, row, count) => {
    for (let i = 0; i < count; i++) {
      addGeomItem(shape, row, count, i)
    }
  }

  addMeshShape(new Sphere(1.4, 13), 3, 1)
  addMeshShape(new Sphere(1.4, 13), 2, 3)
  addMeshShape(new Plane(2.0, 1.5), 1.4, 4)
  addMeshShape(new Cuboid(1.5, 2.0, 1.0), 0.5, 6)
  addMeshShape(new Cone(1.2, 4.0), -1, 5)
  addMeshShape(new Cylinder(1.2, 4.0, 32, 2, true), -2, 8)
  addMeshShape(new Torus(0.4, 1.3), -3, 4)

  setInterval(function() {
    tree1.setSelected(!tree1.getSelected())
  }, 1200)
  setInterval(function() {
    const p = group1.getParameter('Highlighted')
    p.setValue(!p.getValue())
  }, 1000)
  setInterval(function() {
    const p = group2.getParameter('Highlighted')
    p.setValue(!p.getValue())
  }, 700)
}
```

## Conclusion

This tutorial shows how to create groups and how to highlight your groups or objects in your scene.
