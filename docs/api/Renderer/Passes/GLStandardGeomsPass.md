<a name="GLStandardGeomsPass"></a>

### GLStandardGeomsPass 
This class abstracts the rendering of a collection of geometries to screen.


**Extends**: <code>[GLPass](api/Renderer/Passes/GLPass.md)</code>  

* [GLStandardGeomsPass ⇐ <code>GLPass</code>](#GLStandardGeomsPass)
    * [new GLStandardGeomsPass()](#new-GLStandardGeomsPass)
    * [init(renderer, passIndex)](#init)
    * [filterGeomItem(geomItem) ⇒ <code>any</code>](#filterGeomItem)
    * [addShader(material) ⇒ <code>any</code>](#addShader)
    * [constructShaders(shaderName) ⇒ <code>object</code>](#constructShaders)
    * [addMaterial(material) ⇒ <code>any</code>](#addMaterial)
    * [addGeom(geom) ⇒ <code>any</code>](#addGeom)
    * [removeGeom(geom)](#removeGeom)
    * [addGeomItem(geomItem) ⇒ <code>any</code>](#addGeomItem)
    * [removeGeomItem(geomItem) ⇒ <code>any</code>](#removeGeomItem)
    * [removeGLGeom(geomItemMapping, materialGeomMapping)](#removeGLGeom)
    * [getGeomItem(id) ⇒ <code>any</code>](#getGeomItem)
    * [newItemsReadyForLoading() ⇒ <code>any</code>](#newItemsReadyForLoading)
    * [uploadGeomItems()](#uploadGeomItems)
    * [finalize()](#finalize)
    * [bind(renderstate) ⇒ <code>any</code>](#bind)
    * [bindShader(renderstate, glshader) ⇒ <code>any</code>](#bindShader)
    * [bindMaterial(renderstate, glmaterial, warnMissingUnifs) ⇒ <code>any</code>](#bindMaterial)

<a name="new_GLStandardGeomsPass_new"></a>

### new GLStandardGeomsPass
Create a GL pass.

<a name="GLStandardGeomsPass+init"></a>

### init
The init method.



| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>any</code> | The renderer value. |
| passIndex | <code>any</code> | The passIndex value. |

<a name="GLStandardGeomsPass+filterGeomItem"></a>

### filterGeomItem
The filterGeomItem method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geomItem | <code>any</code> | The geomItem value. |

<a name="GLStandardGeomsPass+addShader"></a>

### addShader
The addShader method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| material | <code>any</code> | The material value. |

<a name="GLStandardGeomsPass+constructShaders"></a>

### constructShaders
The constructShaders method.
Given a material, generate the various shaders required to render objects
using this material. There should always be at least a single glshader
and optionally a glgeomdatashader for rendering the goem data buffer
and a glselectedshader for rendering selection hilghlights


**Returns**: <code>object</code> - - The object containing the shader instances.  

| Param | Type | Description |
| --- | --- | --- |
| shaderName | <code>string</code> | The name of the base shader. |

<a name="GLStandardGeomsPass+addMaterial"></a>

### addMaterial
The addMaterial method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| material | <code>any</code> | The material value. |

<a name="GLStandardGeomsPass+addGeom"></a>

### addGeom
The addGeom method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geom | <code>any</code> | The geom value. |

<a name="GLStandardGeomsPass+removeGeom"></a>

### removeGeom
The removeGeom method.



| Param | Type | Description |
| --- | --- | --- |
| geom | <code>any</code> | The geom value. |

<a name="GLStandardGeomsPass+addGeomItem"></a>

### addGeomItem
The addGeomItem method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geomItem | <code>any</code> | The geomItem value. |

<a name="GLStandardGeomsPass+removeGeomItem"></a>

### removeGeomItem
The removeGeomItem method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geomItem | <code>any</code> | The geomItem value. |

<a name="GLStandardGeomsPass+removeGLGeom"></a>

### removeGLGeom
The removeGLGeom method.



| Param | Type | Description |
| --- | --- | --- |
| geomItemMapping | <code>any</code> | The geomItemMapping value. |
| materialGeomMapping | <code>any</code> | The materialGeomMapping value. |

<a name="GLStandardGeomsPass+getGeomItem"></a>

### getGeomItem
The getGeomItem method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>any</code> | The id value. |

<a name="GLStandardGeomsPass+newItemsReadyForLoading"></a>

### newItemsReadyForLoading
The newItemsReadyForLoading method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLStandardGeomsPass+uploadGeomItems"></a>

### uploadGeomItems
The uploadGeomItems method.


<a name="GLStandardGeomsPass+finalize"></a>

### finalize
The finalize method.


<a name="GLStandardGeomsPass+bind"></a>

### bind
The bind method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLStandardGeomsPass+bindShader"></a>

### bindShader
The bindShader method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
| glshader | <code>any</code> | The glshader value. |

<a name="GLStandardGeomsPass+bindMaterial"></a>

### bindMaterial
The bindMaterial method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |
| glmaterial | <code>any</code> | The glmaterial value. |
| warnMissingUnifs | <code>any</code> | The warnMissingUnifs value. |

