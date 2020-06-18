<a name="BaseGeomItem"></a>

### BaseGeomItem 
Class representing a base geometry item in a scene tree.

**Kind**: global class  
**Extends**: <code>TreeItem</code>  

* [BaseGeomItem ⇐ <code>TreeItem</code>](#BaseGeomItem)
    * [new BaseGeomItem(name)](#new-BaseGeomItem)
    * [setOverlay(val)](#setOverlay)
    * [isOverlay() ⇒ <code>boolean</code>](#isOverlay)
    * [addLayer(name)](#addLayer)
    * [getLayers() ⇒ <code>any</code>](#getLayers)
    * [isCutawayEnabled() ⇒ <code>boolean</code>](#isCutawayEnabled)
    * [setCutawayEnabled(state)](#setCutawayEnabled)
    * [getCutVector() ⇒ <code>any</code>](#getCutVector)
    * [setCutVector(cutAwayVector)](#setCutVector)
    * [getCutDist() ⇒ <code>any</code>](#getCutDist)
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
The setOverlay method.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>any</code> | The val param. |

<a name="BaseGeomItem+isOverlay"></a>

### isOverlay
The getLayers method.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="BaseGeomItem+addLayer"></a>

### addLayer
Adds a layer.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the layer. |

<a name="BaseGeomItem+getLayers"></a>

### getLayers
The getLayers method.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="BaseGeomItem+isCutawayEnabled"></a>

### isCutawayEnabled
Checks if cutways are enabled.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  
**Returns**: <code>boolean</code> - - Returns true if enabled.  
<a name="BaseGeomItem+setCutawayEnabled"></a>

### setCutawayEnabled
Setter for enabling cutways.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>any</code> | The state of the cutway. |

<a name="BaseGeomItem+getCutVector"></a>

### getCutVector
Getter for cutway vectors.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="BaseGeomItem+setCutVector"></a>

### setCutVector
Setter for cutway vectors.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| cutAwayVector | <code>any</code> | The cutAwayVector value. |

<a name="BaseGeomItem+getCutDist"></a>

### getCutDist
Getter for the cutaway distance.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="BaseGeomItem+setCutDist"></a>

### setCutDist
Setter for the cutaway distance.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| cutAwayDist | <code>any</code> | The cutAwayDist value. |

<a name="BaseGeomItem+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>BaseGeomItem</code>](#BaseGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

