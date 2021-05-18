<a name="GLRenderer"></a>

### GLRenderer 
Class representing a GL renderer.


**Extends**: <code>[GLBaseRenderer](api/Renderer/GLBaseRenderer.md)</code>  

* [GLRenderer ⇐ <code>GLBaseRenderer</code>](#GLRenderer)
    * [new GLRenderer($canvas, options)](#new-GLRenderer)
    * [exposure](#exposure)
    * [exposure](#exposure)
    * [gamma](#gamma)
    * [gamma](#gamma)
    * [displayEnvironment](#displayEnvironment)
    * [displayEnvironment](#displayEnvironment)
    * [setScene(scene)](#setScene)
    * [addViewport(name) ⇒ <code>GLViewport</code>](#addViewport)
    * [raycastWithRay(ray, dist, area, mask) ⇒ <code>object</code>](#raycastWithRay)
    * [raycastWithXfo(xfo, dist, area, mask) ⇒ <code>object</code>](#raycastWithXfo)
    * [drawBackground(renderstate)](#drawBackground)
    * [bindGLRenderer(renderstate)](#bindGLRenderer)
    * [drawScene(renderstate)](#drawScene)

<a name="new_GLRenderer_new"></a>

### new GLRenderer
Create a GL renderer.


| Param | Type | Description |
| --- | --- | --- |
| $canvas | <code>canvas</code> | The $canvas value. |
| options | <code>object</code> | The dictionary of options. |

<a name="GLRenderer+exposure"></a>

### exposure
Getter for exposure.


<a name="GLRenderer+exposure"></a>

### exposure
Setter for exposure.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+gamma"></a>

### gamma
Getter for gamma.


<a name="GLRenderer+gamma"></a>

### gamma
Setter for gamma.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+displayEnvironment"></a>

### displayEnvironment
Getter for displayEnvironment.


<a name="GLRenderer+displayEnvironment"></a>

### displayEnvironment
Setter for displayEnvironment.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+setScene"></a>

### setScene
The setScene method.



| Param | Type | Description |
| --- | --- | --- |
| scene | <code>[Scene](api/SceneTree/Scene.md)</code> | The scene value. |

<a name="GLRenderer+addViewport"></a>

### addViewport
The addViewport method.


**Returns**: <code>[GLViewport](api/Renderer/GLViewport.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="GLRenderer+raycastWithRay"></a>

### raycastWithRay
Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
This method takes a Ray value, and uses that base the ray cast operation.


**Returns**: <code>object</code> - - The object containing the ray cast results.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ray | <code>[Ray](api/Math/Ray.md)</code> |  | The ray to use in the raycast. |
| dist | <code>number</code> |  | The maximum distance to cast the ray |
| area | <code>number</code> | <code>0.01</code> | The area to use for the ray |
| mask | <code>number</code> |  | The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY |

<a name="GLRenderer+raycastWithXfo"></a>

### raycastWithXfo
Ray casting is implemented by rendering a small image from the position of the ray, and capturing geometries detected in the resulting image.
This method takes an Xfo value, and uses that base the ray cast operation.


**Returns**: <code>object</code> - - The object containing the ray cast results.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| xfo | <code>[Xfo](api/Math/Xfo.md)</code> |  | The xfo to use in the raycast. |
| dist | <code>number</code> |  | The maximum distance to cast the ray |
| area | <code>number</code> | <code>0.01</code> | The area to use for the ray |
| mask | <code>number</code> |  | The mask to filter our certain pass types. Can be PassType.OPAQUE | PassType.TRANSPARENT | PassType.OVERLAY |

<a name="GLRenderer+drawBackground"></a>

### drawBackground
The drawBackground method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLRenderer+bindGLRenderer"></a>

### bindGLRenderer
The bindGLRenderer method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLRenderer+drawScene"></a>

### drawScene
The drawScene method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

