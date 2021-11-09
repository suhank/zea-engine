# How to customize the Camera Manipulation
There are multiple camera manipulation modes built in the engine's [CameraManipulator](api/SceneTree/Manipulators/CameraManipulator).
[**Turntable**](#turntable), [**Tumbler**](#tumbler) and [**Trackball**](#trackball) are distinct modes for orbiting the camera around a model or point of focus.


## Changing the Camera Manipulation Mode

These different modes of camera manipulation are built into Zea Engine, you can change the mode by doing the following:
```javascript
const manipulationMode = CameraManipulator.MANIPULATION_MODES.tumbler
// const manipulationMode = CameraManipulator.MANIPULATION_MODES.turntable
// const manipulationMode = CameraManipulator.MANIPULATION_MODES.trackball

 renderer
  .getViewport()
  .getManipulator()
  .setDefaultManipulationMode(manipulationMode);
```

> If you want to understand more about how these various modes of orbiting differ, please check out [Matt Keeter](https://www.mattkeeter.com/projects/rotation/)'s explanation.
### Turntable
This mode is mostly recommended when the model has an associated real world axis; but the down side of it is that you can't freely rotate the camera.
Left and right rotate around the global `Z` axis and Up and Down rotate around the local `X` axis.


<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-demo-cam-manipulator-turntable-v2?path=index.html&previewSize=100"
    title="zea-demo-cam-manipulator-turntable-v2 on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

### Tumbler
This mode lets you freely rotate the camera around the axes, contrary to the [**Turntable**](#turntable) mode, but it causes the model `tumble` when moving the mouse in small circles while moving to the desired position, which end up in undesired rotations.


<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-demo-cam-manipulator-tumbler-v2?path=index.html&previewSize=100"
    title="zea-demo-cam-manipulator-tumbler-v2 on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>

### Trackball
Projects a `ball` towards onto the model and when the pointer is down, the position in the `ball` is grabbed and used to calculate the rotation, but you can only rotate it a maximum of 180º.


<!-- Copy and Paste Me -->
<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe
    src="https://glitch.com/embed/#!/embed/zea-demo-cam-manipulator-trackball-v2?path=index.html&previewSize=100"
    title="zea-demo-cam-manipulator-trackball-v2 on Glitch"
    allow="geolocation; microphone; camera; midi; vr; encrypted-media"
    style="height: 100%; width: 100%; border: 0;">
  </iframe>
</div>


