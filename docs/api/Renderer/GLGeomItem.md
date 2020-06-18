<a name="GLGeomItem"></a>

### GLGeomItem 
This class abstracts the rendering of a collection of geometries to screen.

**Kind**: global class  
**Extends**: <code>EventEmitter</code>  

* [GLGeomItem ⇐ <code>EventEmitter</code>](#GLGeomItem)
    * [new GLGeomItem(gl, geomItem, glGeom, id, flags)](#new-GLGeomItem)
    * [getGeomItem() ⇒ <code>any</code>](#getGeomItem)
    * [getGLGeom() ⇒ <code>any</code>](#getGLGeom)
    * [getVisible() ⇒ <code>any</code>](#getVisible)
    * [getId() ⇒ <code>any</code>](#getId)
    * [getFlags() ⇒ <code>any</code>](#getFlags)
    * [updateVisibility()](#updateVisibility)
    * [setCullState(culled)](#setCullState)
    * [updateGeomMatrix()](#updateGeomMatrix)
    * [getGeomMatrixArray() ⇒ <code>any</code>](#getGeomMatrixArray)
    * [bind(renderstate) ⇒ <code>any</code>](#bind)
    * [destroy()](#destroy)

<a name="new_GLGeomItem_new"></a>

### new GLGeomItem
Create a GL geom item.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gl | <code>any</code> |  | The gl value. |
| geomItem | <code>any</code> |  | The geomItem value. |
| glGeom | <code>any</code> |  | The glGeom value. |
| id | <code>any</code> |  | The id value. |
| flags | <code>number</code> | <code></code> | The flags value. |

<a name="GLGeomItem+getGeomItem"></a>

### getGeomItem
The getGeomItem method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getGLGeom"></a>

### getGLGeom
The getGLGeom method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getVisible"></a>

### getVisible
The getVisible method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getId"></a>

### getId
The getId method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getFlags"></a>

### getFlags
The getFlags method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+updateVisibility"></a>

### updateVisibility
The updateVisibility method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
<a name="GLGeomItem+setCullState"></a>

### setCullState
The setCullState method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  

| Param | Type | Description |
| --- | --- | --- |
| culled | <code>any</code> | The culled value. |

<a name="GLGeomItem+updateGeomMatrix"></a>

### updateGeomMatrix
The updateGeomMatrix method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
<a name="GLGeomItem+getGeomMatrixArray"></a>

### getGeomMatrixArray
The getGeomMatrixArray method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+bind"></a>

### bind
The bind method.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLGeomItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

**Kind**: instance method of [<code>GLGeomItem</code>](#GLGeomItem)  
