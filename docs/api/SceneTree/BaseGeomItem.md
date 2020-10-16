<a name="BaseGeomItem"></a>

### BaseGeomItem 
Base class that represents geometry items with layering, overlaying and cut away features.

**Events**
* **cutAwayChanged:** Triggered everytime the cutaway variables change(if enabled or not, the vector and the distance).


**Extends**: <code>[TreeItem](api/SceneTree/TreeItem.md)</code>  

* [BaseGeomItem ⇐ <code>TreeItem</code>](#BaseGeomItem)
    * [new BaseGeomItem(name)](#new-BaseGeomItem)
    * [setOverlay(val)](#setOverlay)
    * [isOverlay() ⇒ <code>boolean</code>](#isOverlay)
    * [addLayer(name)](#addLayer)
    * [getLayers() ⇒ <code>array</code>](#getLayers)
    * [isCutawayEnabled() ⇒ <code>boolean</code>](#isCutawayEnabled)
    * [setCutawayEnabled(state)](#setCutawayEnabled)
    * [getCutVector() ⇒ <code>Vec3</code> \| <code>boolean</code>](#getCutVector)
    * [setCutVector(cutAwayVector)](#setCutVector)
    * [getCutDist() ⇒ <code>number</code>](#getCutDist)
    * [setCutDist(cutAwayDist)](#setCutDist)
    * [readBinary(reader, context)](#readBinary)

<a name="new_BaseGeomItem_new"></a>

### new BaseGeomItem
Create a base geometry item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the base geom item. |

<a name="BaseGeomItem+setOverlay"></a>

### setOverlay
Sets overlay value.


**Todo**

- [ ] Need to find the layer and add this item to it.


| Param | Type | Description |
| --- | --- | --- |
| val | <code>boolean</code> | `true` to enable it. |

<a name="BaseGeomItem+isOverlay"></a>

### isOverlay
Returns `true` if overlay is enabled for current item.


**Returns**: <code>boolean</code> - - The return value.  
<a name="BaseGeomItem+addLayer"></a>

### addLayer
Adds a layer to current item.


**Todo**

- [ ] Need to find the layer and add this item to it.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the layer. |

<a name="BaseGeomItem+getLayers"></a>

### getLayers
Returns all layers in current item.


**Returns**: <code>array</code> - - The return value.  
<a name="BaseGeomItem+isCutawayEnabled"></a>

### isCutawayEnabled
Checks if cutaway is enabled.


**Returns**: <code>boolean</code> - - Returns `true` if enabled.  
<a name="BaseGeomItem+setCutawayEnabled"></a>

### setCutawayEnabled
Sets cutaway state.



| Param | Type | Description |
| --- | --- | --- |
| state | <code>boolean</code> | `true` to enable it, otherwise `false`. |

<a name="BaseGeomItem+getCutVector"></a>

### getCutVector
Returns cutaway vector value.


**Returns**: <code>Vec3</code> \| <code>boolean</code> - - `Vec3` when it is set, `false` on default.  
<a name="BaseGeomItem+setCutVector"></a>

### setCutVector
Sets cutaway vector value.



| Param | Type | Description |
| --- | --- | --- |
| cutAwayVector | <code>[Vec3](api/Math/Vec3.md)</code> | The cutAwayVector value. |

<a name="BaseGeomItem+getCutDist"></a>

### getCutDist
Getter for the cutaway distance.


**Returns**: <code>number</code> - - The return value.  
<a name="BaseGeomItem+setCutDist"></a>

### setCutDist
Sets cutaway distance value.



| Param | Type | Description |
| --- | --- | --- |
| cutAwayDist | <code>number</code> | The cutAwayDist value. |

<a name="BaseGeomItem+readBinary"></a>

### readBinary
Sets state of current Item(Including layers & material) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree/BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |

