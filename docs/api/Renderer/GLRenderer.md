<a name="GLRenderer"></a>

## GLRenderer ⇐ <code>GLBaseRenderer</code>
Class representing a GL renderer.

**Kind**: global class  
**Extends**: <code>GLBaseRenderer</code>  

* [GLRenderer ⇐ <code>GLBaseRenderer</code>](#GLRenderer)
    * [new GLRenderer(canvasDiv, options)](#new-GLRenderer)
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
    * [getGLEnvMap() ⇒ <code>any</code>](#getGLEnvMap)
    * [getEnvMapTex() ⇒ <code>any</code>](#getEnvMapTex)
    * [setScene(scene)](#setScene)
    * [addTreeItem(treeItem)](#addTreeItem)
    * [removeTreeItem(treeItem)](#removeTreeItem)
    * [addViewport(name) ⇒ <code>any</code>](#addViewport)
    * [onKeyPressed(key, event)](#onKeyPressed)
    * [resizeFbos(width, height)](#resizeFbos)
    * [createSelectedGeomsFbo()](#createSelectedGeomsFbo)
    * [getFbo() ⇒ <code>any</code>](#getFbo)
    * [createOffscreenFbo(format)](#createOffscreenFbo)
    * [createRayCastRenderTarget()](#createRayCastRenderTarget)
    * [raycastWithRay() ⇒ <code>any</code>](#raycastWithRay)
    * [raycast() ⇒ <code>any</code>](#raycast)
    * [drawBackground(renderstate)](#drawBackground)
    * [bindGLRenderer(renderstate)](#bindGLRenderer)
    * [drawScene(renderstate)](#drawScene)

<a name="new_GLRenderer_new"></a>

### new GLRenderer
Create a GL renderer.


| Param | Type | Description |
| --- | --- | --- |
| canvasDiv | <code>any</code> | The canvasDiv value. |
| options | <code>any</code> | The options value. |

<a name="GLRenderer+exposure"></a>

### exposur
Getter for exposure.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+exposure"></a>

### exposur
Setter for exposure.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+gamma"></a>

### gamm
Getter for gamma.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+gamma"></a>

### gamm
Setter for gamma.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+displayEnvironment"></a>

### displayEnvironmen
Getter for displayEnvironment.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+displayEnvironment"></a>

### displayEnvironmen
Setter for displayEnvironment.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+planeDist"></a>

### planeDis
Getter for planeDist.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+planeDist"></a>

### planeDis
Setter for planeDist.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+cutPlaneNormal"></a>

### cutPlaneNorma
Getter for cutPlaneNormal.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+cutPlaneNormal"></a>

### cutPlaneNorma
Setter for cutPlaneNormal.

**Kind**: instance property of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val value. |

<a name="GLRenderer+getGLEnvMap"></a>

### getGLEnvMap
The getGLEnvMap method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLRenderer+getEnvMapTex"></a>

### getEnvMapTex
The getEnvMapTex method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLRenderer+setScene"></a>

### setScene
The setScene method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| scene | <code>any</code> | The scene value. |

<a name="GLRenderer+addTreeItem"></a>

### addTreeItem
The addTreeItem method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The treeItem param. |

<a name="GLRenderer+removeTreeItem"></a>

### removeTreeItem
The removeTreeItem method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The treeItem param. |

<a name="GLRenderer+addViewport"></a>

### addViewport
The addViewport method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="GLRenderer+onKeyPressed"></a>

### onKeyPressed
The onKeyPressed method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |
| event | <code>any</code> | The event value. |

<a name="GLRenderer+resizeFbos"></a>

### resizeFbos
The resizeFbos method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| width | <code>any</code> | The width value. |
| height | <code>any</code> | The height value. |

<a name="GLRenderer+createSelectedGeomsFbo"></a>

### createSelectedGeomsFbo
The createSelectedGeomsFbo method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+getFbo"></a>

### getFbo
The getFbo method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLRenderer+createOffscreenFbo"></a>

### createOffscreenFbo
The createOffscreenFbo method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| format | <code>any</code> | <code>RGB</code> | The format value. |

<a name="GLRenderer+createRayCastRenderTarget"></a>

### createRayCastRenderTarget
The createRayCastRenderTarget method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
<a name="GLRenderer+raycastWithRay"></a>

### raycastWithRay
The raycast method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLRenderer+raycast"></a>

### raycast
The raycast method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLRenderer+drawBackground"></a>

### drawBackground
The drawBackground method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLRenderer+bindGLRenderer"></a>

### bindGLRenderer
The bindGLRenderer method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLRenderer+drawScene"></a>

### drawScene
The drawScene method.

**Kind**: instance method of [<code>GLRenderer</code>](#GLRenderer)  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
