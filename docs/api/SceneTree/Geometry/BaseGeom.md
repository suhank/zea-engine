<a name="BaseGeom"></a>

### BaseGeom 
Class representing a base geometry.

**Kind**: global class  
**Extends**: <code>ParameterOwner</code>  

* [BaseGeom ⇐ <code>ParameterOwner</code>](#BaseGeom)
    * [new BaseGeom()](#new-BaseGeom)
    * [vertices](#vertices)
    * [boundingBox ⇒ <code>any</code>](#boundingBox)
    * [setDebugName(name)](#setDebugName)
    * [addVertexAttribute(name, dataType, defaultScalarValue) ⇒ <code>Attribute</code>](#addVertexAttribute)
    * [hasVertexAttribute(name) ⇒ <code>any</code>](#hasVertexAttribute)
    * [getVertexAttribute(name) ⇒ <code>any</code>](#getVertexAttribute)
    * [getVertexAttributes(name) ⇒ <code>any</code>](#getVertexAttributes)
    * [numVertices() ⇒ <code>number</code>](#numVertices)
    * [getNumVertices() ⇒ <code>number</code>](#getNumVertices)
    * [setNumVertices(count)](#setNumVertices)
    * [getVertex(index) ⇒ <code>Vec3</code>](#getVertex)
    * [setVertex(index, vec3) ⇒ <code>Vec3</code>](#setVertex)
    * [moveVertices(delta)](#moveVertices)
    * [transformVertices(xfo)](#transformVertices)
    * [setBoundingBoxDirty()](#setBoundingBoxDirty)
    * [updateBoundingBox()](#updateBoundingBox)
    * [getMetadata(key) ⇒ <code>any</code>](#getMetadata)
    * [hasMetadata(key) ⇒ <code>any</code>](#hasMetadata)
    * [setMetadata(key, metaData)](#setMetadata)
    * [deleteMetadata(key)](#deleteMetadata)
    * [genBuffers(opts) ⇒ <code>any</code>](#genBuffers)
    * [freeBuffers()](#freeBuffers)
    * [loadBaseGeomBinary(reader)](#loadBaseGeomBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context, flags)](#fromJSON)
    * [toString() ⇒ <code>any</code>](#toString)

<a name="new_BaseGeom_new"></a>

### new BaseGeom
Create a base geom.

<a name="BaseGeom+vertices"></a>

### vertices
Getter for vertices.

**Kind**: instance property of [<code>BaseGeom</code>](#BaseGeom)  
<a name="BaseGeom+boundingBox"></a>

### boundingBox 
The boundingBox method.

**Kind**: instance property of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  
<a name="BaseGeom+setDebugName"></a>

### setDebugName
The setDebugName method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The debug name value. |

<a name="BaseGeom+addVertexAttribute"></a>

### addVertexAttribute
The addVertexAttribute method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>Attribute</code> - - Returns an attribute.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |
| dataType | <code>any</code> | The dataType value. |
| defaultScalarValue | <code>number</code> | Thedefault scalar value. |

<a name="BaseGeom+hasVertexAttribute"></a>

### hasVertexAttribute
The hasVertexAttribute method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |

<a name="BaseGeom+getVertexAttribute"></a>

### getVertexAttribute
The getVertexAttribute method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |

<a name="BaseGeom+getVertexAttributes"></a>

### getVertexAttributes
The getVertexAttributes method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the vertex attribute. |

<a name="BaseGeom+numVertices"></a>

### numVertices
The numVertices method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>number</code> - - The return value.  
<a name="BaseGeom+getNumVertices"></a>

### getNumVertices
The getNumVertices method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>number</code> - - The return value.  
<a name="BaseGeom+setNumVertices"></a>

### setNumVertices
The setNumVertices method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The count value. |

<a name="BaseGeom+getVertex"></a>

### getVertex
The getVertex method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>Vec3</code> - - Returns a Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="BaseGeom+setVertex"></a>

### setVertex
The setVertex method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>Vec3</code> - - Returns a Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>index</code> | The index value. |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="BaseGeom+moveVertices"></a>

### moveVertices
The moveVertices method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| delta | <code>any</code> | The delta value. |

<a name="BaseGeom+transformVertices"></a>

### transformVertices
The transformVertices method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| xfo | <code>Xfo</code> | The xfo tranform. |

<a name="BaseGeom+setBoundingBoxDirty"></a>

### setBoundingBoxDirty
The setBoundingBoxDirty method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
<a name="BaseGeom+updateBoundingBox"></a>

### updateBoundingBox
The updateBoundingBox method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
<a name="BaseGeom+getMetadata"></a>

### getMetadata
The getMetadata method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |

<a name="BaseGeom+hasMetadata"></a>

### hasMetadata
The hasMetadata method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |

<a name="BaseGeom+setMetadata"></a>

### setMetadata
The setMetadata method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |
| metaData | <code>object</code> | The metaData value. |

<a name="BaseGeom+deleteMetadata"></a>

### deleteMetadata
The deleteMetadata method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>any</code> | The key value. |

<a name="BaseGeom+genBuffers"></a>

### genBuffers
The genBuffers method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>any</code> | The opts value. |

<a name="BaseGeom+freeBuffers"></a>

### freeBuffers
The freeBuffers method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
<a name="BaseGeom+loadBaseGeomBinary"></a>

### loadBaseGeomBinary
The loadBaseGeomBinary method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |

<a name="BaseGeom+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="BaseGeom+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="BaseGeom+toString"></a>

### toString
The toString method.

**Kind**: instance method of [<code>BaseGeom</code>](#BaseGeom)  
**Returns**: <code>any</code> - - The return value.  
