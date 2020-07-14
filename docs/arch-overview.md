# Architecture Overview
Zea Engine is a web based visualization SDK for professional graphics applications. It was designed around 3 key motivations.

 * Performance
 * Versatility
 * Extensibility

## Performance
The architecture of Zea Engine enables high performance visualization by providing a highly optimized code path for WebGL based rendering. The Renderer / Scene Tree abstraction enables the renderer to build a rendering path optimized for efficient GPU utilization, while the scene tree provides a representation useful in the construction of  large complex 3d scenes. 

## Versatility
Zea Engine was designed to follow the highly versatile and powerful scene representations found in high end Visual Effects packages like Autodesk Maya™ and Autodesk Softimage™. These tools were designed to support a wide range of requirements, and domains from Film VFX Production through to Design Visualization. A key goal of Zea Engine is to support a wide range of rendering requirements, complex motion driven by either predefined animation sequences, or procedural algorithms, and user interaction models. Being in the web space, Zea Leverages the simple yet powerful event model found in the browser, while adding a layer of tools for building 3d user interface widgets and interaction models.

## Extensibility
To allow an infinite number of use cases for Zea Engine, all aspects of the toolkit from the scene tree, interaction system and also the renderer support extension through plugins that can implement custom behaviors and features. The Scene Tree is a pluggable system that supports custom tree nodes to be added which can contain any type of data, expose custom functions, and provide interaction tools. These custom tree nodes can be persisted and restored like the builtin nodes and enable the scene tree to be extended to handle any data representation required. The Operator system that computes changes in the Scene Tree data is pluggable so custom procedural motion or effects can be implemented. The Renderer supports plugins that can take responsibility to displaying custom nodes in the tree, making it possible to integrate any custom rendering effects, while integrating with existing rendering solutions, and supporting features such as VR or AR.

# Scene Tree

![scene-tree](_media/scene-tree.svg)
*A simple scene tree containing a tree item, one geom Item, and an Asset containing a couple of Geom Items.*

The Scene tree structures the data that is rendered by the renderer. The Scene tree provides a hierarchy of nodes, each containing data in the form of Parameters, and potentially custom JavaScript objects.
Why a Scene Tree and not a DAG?

Many scene descriptions and described as a Direct Acyclic Graph(DAG), instead of a tree. A DAG is more flexible, in that any item can have 1 or more parents. While a DAG provides an elegant definition of instancing, it implies that any item in the tree can  have 1 or more transformations in the 3d scene. A scene tree, in contrast, implies that any tree item can have one and only one transformation in the 3d scene. With this 
Parameters
Within the Scene Tree, each item in the tree contains a collection of parameters. Each parameter has a name and a value. Parameters can be added and removed from Tree items and provide a standard interface to access data stored within the tree.

Parameters can also be displayed using ParameterWidgets, which are user interface components found in the zea-web-components library.

## Operators
Operators are used to compute new values for Parameters within the scene tree. Operators make the scene tree dynamic and able to maintain relationships between parameters, update based on changes, and drive animation. 

![operators-ABC](_media/operators-ABC.svg)
*In this diagram above, the value of Parameter C is calculated by Operator A using the values of Parameter A and Parameter B as inputs.*

## Renderer
While the Scene tree provides a structure useful in organizing according to hierarchies useful for our understanding of the environment being displayed, the Renderer, through the system of passes, enables the organization of data around the requirements of efficient rendering on the GPU. Each Pass in the Renderer takes responsibility for rendering parts of the scene tree. The builtin passes generally handle the standard geometries that are provided in the scene tree, and custom pases can be registered to handle custom geometries that could be added to the scene tree.


![scene-tree-renderer](_media/scene-tree-renderer.svg)
*A simple scene tree containing a tree item, one geom Item, and an Asset containing a couple of Geom Items. The Renderer contains a collection of passes that are observing the various parts of the scene tree.*

## Renderer as an observer of the Scene Tree
The Renderer is implemented as an observer of the scene tree. The Scene Tree has no knowledge of the renderer and does not have access to rendering functionality. All rendering functionality is maintained in the Renderer, including the canvas element, the rendering context, all rendering specific data and shaders.

Whenever the scene tree changes in any way, the renderer receives events which allow it to respond to the changes, update rendering state and trigger redrawing to the canvas bound to the renderer.

## Evented Rendering
Rendering only occurs when some part of the rendering system detects a change in the scene tree it is observing. Upon detection of a change, the renderer updates any rendering specific data and then redraws. 

“In a static scene, If no user interaction occurs, then no rendering occurs.”
By only rendering in response to changes in the scene tree, the renderer strikes a balance between responsiveness and efficiency. This architecture means that rendering is not continuously occurring while the scene is static. In a static scene, meaning no animation or changes are being caused by external event systems like timers, then the renderer rests dormant waiting for a change until it receives its next change notification.

*Example: In a static scene, a user is viewing some large model and discussing with colleagues on a lightweight mobile device. The conversation might last 30 minutes. During the conversation, at different times, the user interacts with the scene a few times to change the position and orientation of the camera to focus on parts of the model. Rendering of the model only occurs during those interactions. The rest of the time the renderer is dormant consuming no resources, leading to longer battery life.*

“In a dynamic scene, rendering updates are triggered whenever the dynamic scene changes, or if the user interacts in some way”

*Example: In a heavy scene on a lightweight device, an animation is playing at a frequency of 20ms, or 50fps. The renderer can only render at a maximum of 40fps. During rendering of each frame, the scene can be considered ‘clean’, because the renderer has pulled all the relevant data and all operators are up to date. The scene then updates again before the rendering completes, and the renderer queues up another frame. A second time the scene may update, but the renderer has not yet cleaned the scene, so nothing changes. As soon as possible, the renderer starts rendering the subsequent frame, and will clean the scene. 

In this way, the renderer and scene can update at independent frequencies. *


## Continuous Rendering
By comparison, maybe renderers, especially simple ones like Tree JS, or engines designed around the requirements of games, tend to render as fast as possible at all times. In Games, this is typically desired. The renderer in a game runs at a fixed 60fps at all times and usually the scenes are continuously changing and require re-rendering. The renderer frequency is not tied to user interactions, and instead on a simple timer and update loop.

When utilising the WebXR api in Zea Engine, during a VR/AR session, the renderer switches to continuous rendering instead of evented rendering to ensure the smoothest experience.

## AR/VR
Zea Engine supports a wide range of AR and VR devices through the WebXR api available in most browsers today. Through WebXR, web based apps built using Zea Engine can leverage a very wide range of hardware. 

### Mobile/Cardboard VR
While the GPU on mobile devices are getting more powerful every year, they are still orders of magnitude slower than their desktop counterparts. However, for small simple scenes containing only a few thousand triangles, they are fast enough to deliver impressive virtual reality experiences. 

### Desktop VR
For a high end VR experience, there are a range of options such as the HTC Vive or Oculus Rift that work very well within the browser with Zea Engine. Full head and controller tracking is provided and the performance of Zea Engine enables quite amazing experiences to be built.

### Untethered AR
AR devices such as the microsoft Hololens is also supported by WebXR in the new Chromium Edge browser, enabling AR based apps to be build and deployed using only the web browser and Zea Engine. 

# Mobile
Support for mobile devices is improving as the browsers on those devices improve. Currently, Zea Engine support mobile devices, but some rendering features may not work on all devices. 
## iOS
iOS devices have typically provided far poorer support for WebGL than the equivalent Android devices. iOS has lagged behind Android in its support for WebGL, but we are anticipating this situation changing in the coming years.

### Zea CAD
The ZeaCAD extension uses start of the art rendering techniques to provide efficient and fast rendering of large CAD scenes. The rendering techniques require at least WebGL2 or later, and support for floating point textures, neither of which are supported by iOS(or desktop Safari). 

## Android
Android devices provide great support for WebGL through the installed chrome browser. However not all hardware provides the same level of functionality, and so each device must be tested individually.

## Microsoft Surface
The latest Microsoft surface hardware runs a full version of Windows 10 and so provide excellent support for Zea Engine and application built with it.


# Class Hierarchy

![zea-engine-class-hierarchy](_media/zea-engine-class-hierarchy.svg)



