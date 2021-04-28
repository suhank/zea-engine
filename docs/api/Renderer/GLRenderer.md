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
    * [planeDist](#planeDist)
    * [planeDist](#planeDist)
    * [cutPlaneNormal](#cutPlaneNormal)
    * [cutPlaneNormal](#cutPlaneNormal)
    * [getGLEnvMap() ⇒ <code>GLEnvMap</code> \| <code>GLHDRImage</code> \| <code>GLTexture2D</code>](#getGLEnvMap)
    * [getEnvMapTex() ⇒ <code>EnvMap</code> \| <code>BaseImage</code>](#getEnvMapTex)
    * [setScene(scene)](#setScene)
    * [addViewport(name) ⇒ <code>GLViewport</code>](#addViewport)
    * [resizeFbos(width, height)](#resizeFbos)
    * [createSelectedGeomsFbo()](#createSelectedGeomsFbo)
    * [getFbo() ⇒ <code>GLFbo</code>](#getFbo)
    * [createOffscreenFbo(format)](#createOffscreenFbo)
    * [raycastWithRay() ⇒ <code>object</code>](#raycastWithRay)
    * [raycast() ⇒ <code>object</code>](#raycast)
    * [raycastCluster() ⇒ <code>any</code>](#raycastCluster)
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

<a name="GLRenderer+planeDist"></a>

### planeDist
Getter for planeDist.


<a name="GLRenderer+planeDist"></a>

### planeDist
Setter for planeDist.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+cutPlaneNormal"></a>

### cutPlaneNormal
Getter for cutPlaneNormal.


<a name="GLRenderer+cutPlaneNormal"></a>

### cutPlaneNormal
Setter for cutPlaneNormal.



| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+getGLEnvMap"></a>

### getGLEnvMap
The getGLEnvMap method.


**Returns**: <code>GLEnvMap</code> \| <code>GLHDRImage</code> \| <code>GLTexture2D</code> - - The return value.  
<a name="GLRenderer+getEnvMapTex"></a>

### getEnvMapTex
The getEnvMapTex method.


**Returns**: <code>EnvMap</code> \| <code>BaseImage</code> - - The return value.  
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

<a name="GLRenderer+resizeFbos"></a>

### resizeFbos
The resizeFbos method.



| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The width value. |
| height | <code>number</code> | The height value. |

<a name="GLRenderer+createSelectedGeomsFbo"></a>

### createSelectedGeomsFbo
The createSelectedGeomsFbo method.


<a name="GLRenderer+getFbo"></a>

### getFbo
The getFbo method.


**Returns**: <code>[GLFbo](api/Renderer/GLFbo.md)</code> - - The return value.  
<a name="GLRenderer+createOffscreenFbo"></a>

### createOffscreenFbo
The createOffscreenFbo method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. |

<a name="GLRenderer+raycastWithRay"></a>

### raycastWithRay
The raycastWithRay method.


**Returns**: <code>object</code> - - The return value.  
<a name="GLRenderer+raycast"></a>

### raycast
The raycast method.


**Returns**: <code>object</code> - - The return value.  
<a name="GLRenderer+raycastCluster"></a>

### raycastCluster
The raycastCluster method.


**Returns**: <code>any</code> - - The return value.  
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

