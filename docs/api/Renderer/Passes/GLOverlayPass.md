<a name="GLOverlayPass"></a>

### GLOverlayPass 
Class representing a GL overlay pass.


**Extends**: <code>[GLOpaqueGeomsPass](api/Renderer/Passes/GLOpaqueGeomsPass.md)</code>  

* [GLOverlayPass ⇐ <code>GLOpaqueGeomsPass</code>](#GLOverlayPass)
    * [new GLOverlayPass(name)](#new-GLOverlayPass)
    * [getPassType() ⇒ <code>number</code>](#getPassType)
    * [filterGeomItem(geomItem) ⇒ <code>any</code>](#filterGeomItem)
    * [draw(renderstate)](#draw)
    * [drawGeomData(renderstate)](#drawGeomData)

<a name="new_GLOverlayPass_new"></a>

### new GLOverlayPass
Create a GL overlay pass.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="GLOverlayPass+getPassType"></a>

### getPassType
Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.


**Returns**: <code>number</code> - - The pass type value.  
<a name="GLOverlayPass+filterGeomItem"></a>

### filterGeomItem
The filterGeomItem method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| geomItem | <code>[GeomItem](api/SceneTree/GeomItem.md)</code> | The geomItem value. |

<a name="GLOverlayPass+draw"></a>

### draw
The draw method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="GLOverlayPass+drawGeomData"></a>

### drawGeomData
The drawGeomData method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

