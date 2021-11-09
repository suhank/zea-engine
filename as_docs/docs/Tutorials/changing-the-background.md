---
sidebar_position: 1
title: Changing the Background Color
hide_table_of_contents: true
---

This tutorial teaches you how to change the background color of your scene.

> Below is an interactive demo, and the result of this tutorial.

<iframe 
  src="https://glitch.com/embed/#!/embed/change-background?path=package.json&previewSize=100"
  title="change-background on Glitch"
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

## 2) Change the background color

Replace main.js from the Basic Setup Template and see the [color](../API/Math/Math_Color.Color) change.

```javascript
export function main() {
  const { GLRenderer, Scene, Color } = window.zeaEngine
  const renderer = new GLRenderer(document.getElementById('canvas'))
  const scene = new Scene()
  scene.setupGrid(10.0, 10)
  renderer.setScene(scene)

  /*
      Change the Background color
  */
  const color = new Color('#7460e1') // this is equivalent to: new Color(116/255, 96/255, 225/255)
  // get the settings of the scene.
  const settings = scene.getSettings()
  // get the "BackgroundColor" parameter and set the value to our color.
  settings.getParameter('BackgroundColor').setValue(color)
}
```

Construct a new color value using a hex color code to specify the value of the color. He color codes are simple string values that encode colors. You can read more about them here [https://htmlcolorcodes.com/](https://htmlcolorcodes.com/).

## Conclusion

You can now change a setting of the scene!

View more [tutorials](tutorials.md) to learn more!
