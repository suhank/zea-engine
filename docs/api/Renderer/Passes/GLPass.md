<a name="GLPass"></a>

### GLPass 
This class abstracts the rendering of a collection of geometries to screen.


**Extends**: <code>[ParameterOwner](api/SceneTree\ParameterOwner.md)</code>  

* [GLPass ⇐ <code>ParameterOwner</code>](#GLPass)
    * [new GLPass()](#new-GLPass)
    * [init(renderer, passIndex)](#init)
    * [setPassIndex(passIndex)](#setPassIndex)
    * [getPassType() ⇒ <code>number</code>](#getPassType)
    * [itemAddedToScene(treeItem, rargs) ⇒ <code>Boolean</code>](#itemAddedToScene)
    * [itemRemovedFromScene(treeItem, rargs) ⇒ <code>Boolean</code>](#itemRemovedFromScene)
    * [startPresenting()](#startPresenting)
    * [stopPresenting()](#stopPresenting)
    * [draw(renderstate)](#draw)
    * [drawHighlightedGeoms(renderstate)](#drawHighlightedGeoms)
    * [drawGeomData(renderstate)](#drawGeomData)
    * [getGeomItemAndDist(geomData)](#getGeomItemAndDist)

<a name="new_GLPass_new"></a>

### new GLPass
Create a GL pass.

<a name="GLPass+init"></a>

### init
The init method.



| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>[GLBaseRenderer](api/Renderer\GLBaseRenderer.md)</code> | The renderer value. |
| passIndex | <code>number</code> | The index of the pass in the GLBAseRenderer |

<a name="GLPass+setPassIndex"></a>

### setPassIndex
The setPassIndex method.



| Param | Type | Description |
| --- | --- | --- |
| passIndex | <code>number</code> | The index of the pass in the GLBAseRenderer |

<a name="GLPass+getPassType"></a>

### getPassType
Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.


**Returns**: <code>number</code> - - The pass type value.  
<a name="GLPass+itemAddedToScene"></a>

### itemAddedToScene
The itemAddedToScene method is called on each pass when a new item
is added to the scene, and the renderer must decide how to render it.
It allows Passes to select geometries to handle the drawing of.


**Returns**: <code>Boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree\TreeItem.md)</code> | The treeItem value. |
| rargs | <code>object</code> | Extra return values are passed back in this object. The object contains a parameter 'continueInSubTree', which can be set to false, so the subtree of this node will not be traversed after this node is handled. |

<a name="GLPass+itemRemovedFromScene"></a>

### itemRemovedFromScene
The itemRemovedFromScene method is called on each pass when aa item
is removed to the scene, and the pass must handle cleaning up any resources.


**Returns**: <code>Boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree\TreeItem.md)</code> | The treeItem value. |
| rargs | <code>object</code> | Extra return values are passed back in this object. |

<a name="GLPass+startPresenting"></a>

### startPresenting
The startPresenting method.


<a name="GLPass+stopPresenting"></a>

### stopPresenting
The stopPresenting method.


<a name="GLPass+draw"></a>

### draw
The draw method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLPass+drawHighlightedGeoms"></a>

### drawHighlightedGeoms
The drawHighlightedGeoms method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLPass+drawGeomData"></a>

### drawGeomData
The drawGeomData method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLPass+getGeomItemAndDist"></a>

### getGeomItemAndDist
The getGeomItemAndDist method.



| Param | Type | Description |
| --- | --- | --- |
| geomData | <code>any</code> | The geomData value. |

