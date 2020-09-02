<a name="GLGeomItem"></a>

### GLGeomItem 
This class abstracts the rendering of a collection of geometries to screen.


**Extends**: <code>[EventEmitter](api/Utilities/EventEmitter.md)</code>  

* [GLGeomItem ⇐ <code>EventEmitter</code>](#GLGeomItem)
    * [new GLGeomItem(gl, geomItem, glGeom, id, flags)](#new-GLGeomItem)
    * [getGeomItem() ⇒ <code>any</code>](#getGeomItem)
    * [getGLGeom() ⇒ <code>any</code>](#getGLGeom)
    * [isVisible() ⇒ <code>any</code>](#isVisible)
    * [getId() ⇒ <code>any</code>](#getId)
    * [getFlags() ⇒ <code>any</code>](#getFlags)
    * [updateVisibility()](#updateVisibility)
    * [setCullState(culled)](#setCullState)
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


**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getGLGeom"></a>

### getGLGeom
The getGLGeom method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+isVisible"></a>

### isVisible
The isVisible method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getId"></a>

### getId
The getId method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+getFlags"></a>

### getFlags
The getFlags method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLGeomItem+updateVisibility"></a>

### updateVisibility
The updateVisibility method.


<a name="GLGeomItem+setCullState"></a>

### setCullState
The setCullState method.



| Param | Type | Description |
| --- | --- | --- |
| culled | <code>any</code> | The culled value. |

<a name="GLGeomItem+bind"></a>

### bind
The bind method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLGeomItem+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


