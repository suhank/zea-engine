# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.


## [3.2.0](https://github.com/ZeaInc/zea-engine/compare/v3.0.1...v3.2.0) (2021-02-08)


### Features

* Added Color#addInPlace ([58a9953](https://github.com/ZeaInc/zea-engine/commit/58a99534e91ff20cefbb68c06173ea43f9a01fa8))
* CameraManipulator#setDefaultManipulationMode generates a useful error message if an invalid value is passed ([2cbde30](https://github.com/ZeaInc/zea-engine/commit/2cbde3026767a01c4660778b2b838288733bda8e))
* Due to a change in behavior in Chrome which caused a pause launching the renderer, xrCompatible is now set to false by default. The GL canvas is converted to an XR canvas when an XR device is detected, so no change in behavior should be noticed. ([e5f1ee0](https://github.com/ZeaInc/zea-engine/commit/e5f1ee00b6b5165b02a7d55e0df8cb5558eb3da2))
* GLShader now generates far nicer formatted error messages. No longer dumping out the entire GLSL code for the shader, instead just the culprit line and a few surrounding lines. ([d8b219b](https://github.com/ZeaInc/zea-engine/commit/d8b219b223833dfed1e3484afa8f637d63a19959))
* As geometries are streamed, the bounding box for the tree is now valid as we pre-load the bounding boxes for the geometries into the tree. ([9017f08](https://github.com/ZeaInc/zea-engine/commit/9017f08141eed2c84c23e87d60fbbf93ac584f43))
* CameraManipulator now calls 'setCapture' to avoid redundant geom data rendering during camera movements. ([6134bdd](https://github.com/ZeaInc/zea-engine/commit/6134bddd8c51f28eb149b7fb67101cda6f49e6e5))
* GridTreeItem is now exported for use outside the engine. ([9a5bfc7](https://github.com/ZeaInc/zea-engine/commit/9a5bfc72e0f25e822fbe21a0b120fe07bfdec41f))
* Draw shaders now support debugging of geom Id to verify how effective instancing has been. ([5b87975](https://github.com/ZeaInc/zea-engine/commit/5b87975b2031a39345d25b7a1baa23bba23b400c))
* Pointer events are now emitted from the VRViewport based on interactions with VR controller ([426a153](https://github.com/ZeaInc/zea-engine/commit/426a153c7c748efec022a0b56649c7b6c2f65e6e))
* Implemented support for spectator mode in VR. ([23fdbec](https://github.com/ZeaInc/zea-engine/commit/23fdbecd1d3a4ace576bdb3eed3d0791c5e68855))
* Implemented a 1D Allocator for managing 2d arrays packed into a single 1D Array. ([b37bcca](https://github.com/ZeaInc/zea-engine/commit/b37bccaf2212b4829c32f3b07c32e5354c123a22))
* Initializing VR Stage below the active viewport position. ([ac6c5f2](https://github.com/ZeaInc/zea-engine/commit/ac6c5f2ab2f56ccc928d37528d6282be5c09f22e))
* Material now tracks state to check if a a texture has been assigned, or if it has become transparent. ([7914eac](https://github.com/ZeaInc/zea-engine/commit/7914eacff2c47ca990a04418da35e9bc48221717))
* Multi-draw pipeline now supports lines and points, and also non-32bit attr values. ([0553692](https://github.com/ZeaInc/zea-engine/commit/055369255d2284e94e8455019cd8b30fb5143780))
* Resizing a GLFbo now causes its bound color texture to be resized. ([29359c3](https://github.com/ZeaInc/zea-engine/commit/29359c3dd4578927f6740d8ed9498671a1b2e6a0))
* Resource loader now supports loading binary files via a new plugin ([#309](https://github.com/ZeaInc/zea-engine/issues/309)) ([adc5f1c](https://github.com/ZeaInc/zea-engine/commit/adc5f1c1012ff1b9a84b2a49b0cf4f9fd718f015))


### Bug Fixes

* Cloning NumberParameter or MaterialFloatParam now properly clones the range and step values. ([ad4eefd](https://github.com/ZeaInc/zea-engine/commit/ad4eefd0d98ddd00ebd44665ce7910290c5d3a3c))
* Labels are now lazily updated on the next draw, instead of waiting on a timeout. This means we should no longer have frames where labels disappear/reappear. ([740d42c](https://github.com/ZeaInc/zea-engine/commit/740d42c78d25c907ac9add392276b2ad9ad568d6))
* PointGrid was not correctly generating its geometry after changes to procedural geometries in the previous release.([70e7c46](https://github.com/ZeaInc/zea-engine/commit/70e7c460d8f1637cdfc3af4848d72f7ffe2a1672))
* Cleaned up regressions in the VRViewTool for VR navigation([fe3b656](https://github.com/ZeaInc/zea-engine/commit/fe3b656e5af0c84c9afbf02ec7ab5ad98c701b9a))
* CameraManipulator WASD walk keys were left on when the mouse left the viewport. ([5edd614](https://github.com/ZeaInc/zea-engine/commit/5edd6140e69b6e5ca31862d19164419d20dab9ea))
* VLAAsset was not correctly reporting progress when loading streaming geoms. ([9c828c3](https://github.com/ZeaInc/zea-engine/commit/9c828c3ac1d3e43ebaabeec12763fc58811c2c82))
* ObjAsset was not able to correctly load objects made up of groups. ([ef1d92b](https://github.com/ZeaInc/zea-engine/commit/ef1d92b50062538af67d1b86207ff38ff43b8e1f))
* Viewports can now be initialized after the scene is already assigned to the renderer. Needed for XRViewports. ([a6fbb5c](https://github.com/ZeaInc/zea-engine/commit/a6fbb5cdd09d0397af120e94acd7ce5ffd8772a4))


### [3.0.1] (2020-12-04)


### Bug Fixes

* Fixed property detection on GLLines ([dc2d474](https://github.com/ZeaInc/zea-engine/commit/dc2d474c76f1e77c69204ae8bd2a5aa8ba3af1d4))

## [3.0.0] (2020-12-03)

## [2.0.0] (2020-09-12)


### ⚠ BREAKING CHANGES

* **npm:** Raw imports are no longer supported.

### Features

* Added 'Overlay' option to LinesShader so lines can be rendered overlaid on scene geometries.
* Added support to make Points and Lines drawn as Overlay.
* SystemDesc now correctly detects RTX based GPUs.


### Bug Fixes

* Docs search now have their own namespace.
* Dynamic updates to lines topology now is reflected in the renderer.
* GeomProxy was missing a method to retrieve the bounding box, which caused regression when loading polygon meshes from zcad files.
* Updated Version class, deprecating old methods.
* Wasm file resolving from script tag.


### Build

* **npm:** Add UMD support.


## 1.3.0 (2020-08-20)


### Features

* Added PointSize parameter to PointsShader now that it's working in Chrome.
* Implemented new 'tumbler' manipulation mode on CameraMouseAndKeyboard manipulator to emulate the behavior of various CAD packages.
* TreeItem.resolvePath now throws an exception if the path cannot be resolved.


### Bug Fixes

* Regressions in the code for procedural lines and material parameter.
* Bug causing circle to throw exception when generating.
* Bug that prevented updating points geometry dynamically.
* Issues related to loading label packs in the labelManager.
* Regression in Group when using the 'manual' Initial Xfo mode.
* Regression in ObjLoader caused by changes to Mesh topology.
* Regressions in RouterOperator due to changes to OperatorOutputs map on Operator.
* Reverted Torus to simpler detail setting. Consistent with Sphere Cone, and Circle.
* Updated all snapshots with new output format.


## 1.2.0 (2020-08-14)


### Features

* Add footer for docs.
* Add GridTreeItem file and update Scene class.
* Added 'mouseOverGeom' and 'mouseLeaveGeom' events.
* Added basic cycle checking in the operator evaluation.
* Add isEqual and approxEqual to Xfo.
* Added splash screen to Zea Engine when loading.
* Implement 'addFace' on Mesh class to make it easier to setup meshes.
* Improved parameter dirtying when many multi-output operators are bound to many different parameters.
* Make the splash screen optional.
* No longer logging the SystemDesc on startup.
* Shaders can now provide a name to the constructor.


### Bug Fixes

* Cleaned up error messages being provided when throwing exceptions.
* Cleaned up dirty state vs clean state on Parameter.
* Duplicated createFromBuffer method on Color class.
* Wrong byteOffset on few classes.
* Debug script for Windows systems.
* Minor issue with the drawCount in the class GLMaterialGeomItemSets.
* Regression causing changes to materials to not trigger re-rendering.
* Regression in Potree due to GLGeom was no longer emitting a 'destructing' event.
* Geometry types are now registered with the SGFactory.
* Math type constructors need to be able to take a Float32Array as an argument.
* OperatorOutput now throws an error if trying to call 'getValue' before a param is connected.
* Operators now become dirty when adding Inputs and Outputs.
* Quat.setFrom2Vectors was incorrectly normalizing input vectors. Now assumes unit vectors are provided.
* Removed 'flags' implementation from Items.
* Removed 'flags' implementation on parameters and geometries, we're no longer using it.
* Replaced old sgFactory from GridTreeItem for Registry.
* Restored code that shouldn't be touched(Backwards compatibility).
* Restoring Box3 to default values in case axes are not numeric.
* Regressions in 'removeParameter' and 'replaceParameter'.
* Throwing errors instead of warnings in Registry class.
