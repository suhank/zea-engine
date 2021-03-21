<a name="GLStandardGeomsPass"></a>

### GLStandardGeomsPass 
This class abstracts the rendering of a collection of geometries to screen.


**Extends**: <code>[GLPass](api/Renderer/Passes/GLPass.md)</code>  

* [GLStandardGeomsPass ⇐ <code>GLPass</code>](#GLStandardGeomsPass)
    * [new GLStandardGeomsPass()](#new-GLStandardGeomsPass)
    * [init(renderer, passIndex)](#init)
    * [itemAddedToScene(treeItem, rargs) ⇒ <code>Boolean</code>](#itemAddedToScene)
    * [itemRemovedFromScene(treeItem, rargs) ⇒ <code>Boolean</code>](#itemRemovedFromScene)
    * [filterGeomItem(geomItem) ⇒ <code>any</code>](#filterGeomItem)
    * [constructShaders(shaderName) ⇒ <code>object</code>](#constructShaders)

<a name="new_GLStandardGeomsPass_new"></a>

### new GLStandardGeomsPass
Create a GL pass.

<a name="GLStandardGeomsPass+init"></a>

### init
The init method.



| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>[GLBaseRenderer](api/Renderer/GLBaseRenderer.md)</code> | The renderer value. |
| passIndex | <code>number</code> | The index of the pass in the GLBAseRenderer |

<a name="GLStandardGeomsPass+itemAddedToScene"></a>

### itemAddedToScene
The itemAddedToScene method is called on each pass when a new item
is added to the scene, and the renderer must decide how to render it.
It allows Passes to select geometries to handle the drawing of.


**Returns**: <code>Boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | The treeItem value. |
| rargs | <code>object</code> | Extra return values are passed back in this object. The object contains a parameter 'continueInSubTree', which can be set to false, so the subtree of this node will not be traversed after this node is handled. |

<a name="GLStandardGeomsPass+itemRemovedFromScene"></a>

### itemRemovedFromScene
The itemRemovedFromScene method is called on each pass when aa item
is removed to the scene, and the pass must handle cleaning up any resources.


**Returns**: <code>Boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | The treeItem value. |
| rargs | <code>object</code> | Extra return values are passed back in this object. |

<a name="GLStandardGeomsPass+filterGeomItem"></a>

### filterGeomItem
The filterGeomItem method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geomItem | <code>[GeomItem](api/SceneTree/GeomItem.md)</code> | The geomItem value. |

<a name="GLStandardGeomsPass+constructShaders"></a>

### constructShaders
The constructShaders method.
Given a material, generate the various shaders required to render objects
using this material. There should always be at least a single glShader
and optionally a glgeomdatashader for rendering the goem data buffer
and a glselectedshader for rendering selection hilghlights


**Returns**: <code>object</code> - - The object containing the shader instances.  

| Param | Type | Description |
| --- | --- | --- |
| shaderName | <code>string</code> | The name of the base shader. |

