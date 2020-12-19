<a name="VertexAttribute"></a>

### VertexAttribute 
Class representing vertex attributes.

```
const vertexAttribute = new VertexAttribute(this, Float32, 0)
```


**Extends**: <code>[Attribute](api/SceneTree\Geometry\Attribute.md)</code>  

* [VertexAttribute ⇐ <code>Attribute</code>](#VertexAttribute)
    * [new VertexAttribute(geom, dataType, expectedSize, defaultScalarValue)](#new-VertexAttribute)
    * [resize(size)](#resize)
    * [getFaceVertexValueRef(face, facevertex) ⇒ <code>AttrValue</code>](#getFaceVertexValueRef)
    * [setFaceVertexValue(face, facevertex, value)](#setFaceVertexValue)
    * [setFaceVertexValue_ByVertexIndex(face, vertex, value)](#setFaceVertexValue_ByVertexIndex)
    * [setSplitVertexValue(vertex, face, value)](#setSplitVertexValue)
    * [setSplitVertexValues(vertex, faceGroup, value)](#setSplitVertexValues)
    * [getSplits() ⇒ <code>array</code>](#getSplits)
    * [getSplitCount() ⇒ <code>number</code>](#getSplitCount)
    * [generateSplitValues(splitIndices, splitCount) ⇒ <code>Float32Array</code>](#generateSplitValues)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context)](#fromJSON)
    * [loadSplitValues(reader)](#loadSplitValues)

<a name="new_VertexAttribute_new"></a>

### new VertexAttribute
Create vertex attributes


| Param | Type | Description |
| --- | --- | --- |
| geom | <code>[Mesh](api/SceneTree\Geometry\Mesh.md)</code> | The geom value. |
| dataType | <code>AttrValue</code> \| <code>number</code> | The dataType value. |
| expectedSize | <code>number</code> \| <code>TypedArray</code> | The expectedSize value. |
| defaultScalarValue | <code>number</code> | The default scalar value. |

<a name="VertexAttribute+resize"></a>

### resize
Resizes current data array to to a new size.
In case the new size is bigger than current size, the new values are filled up with default ones.



| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The size value. |

<a name="VertexAttribute+getFaceVertexValueRef"></a>

### getFaceVertexValueRef
The getFaceVertexValueRef method.


**Returns**: <code>[AttrValue](api/Math\AttrValue.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| face | <code>number</code> | The face value. |
| facevertex | <code>number</code> | The face vertex value. |

<a name="VertexAttribute+setFaceVertexValue"></a>

### setFaceVertexValue
The setFaceVertexValue method.



| Param | Type | Description |
| --- | --- | --- |
| face | <code>number</code> | The face value. |
| facevertex | <code>number</code> | The facevertex value. |
| value | <code>[AttrValue](api/Math\AttrValue.md)</code> | The value value. |

<a name="VertexAttribute+setFaceVertexValue_ByVertexIndex"></a>

### setFaceVertexValue
The setFaceVertexValue_ByVertexIndex method.



| Param | Type | Description |
| --- | --- | --- |
| face | <code>number</code> | The face value. |
| vertex | <code>number</code> | The vertex value. |
| value | <code>[AttrValue](api/Math\AttrValue.md)</code> | The value value. |

<a name="VertexAttribute+setSplitVertexValue"></a>

### setSplitVertexValue
The setSplitVertexValue method.



| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>number</code> | The vertex value. |
| face | <code>number</code> | The face value. |
| value | <code>[AttrValue](api/Math\AttrValue.md)</code> | The value value. |

<a name="VertexAttribute+setSplitVertexValues"></a>

### setSplitVertexValues
The setSplitVertexValues method.



| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>number</code> | The vertex value. |
| faceGroup | <code>array</code> | The faceGroup value. |
| value | <code>[AttrValue](api/Math\AttrValue.md)</code> | The value value. |

<a name="VertexAttribute+getSplits"></a>

### getSplits
The getSplits method.


**Returns**: <code>array</code> - - The return value.  
<a name="VertexAttribute+getSplitCount"></a>

### getSplitCount
The getSplitCount method.


**Returns**: <code>number</code> - - The return value.  
<a name="VertexAttribute+generateSplitValues"></a>

### generateSplitValues
The generateSplitValues method.


**Returns**: <code>Float32Array</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| splitIndices | <code>array</code> | The splitIndices value. |
| splitCount | <code>number</code> | The splitCount value. |

<a name="VertexAttribute+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="VertexAttribute+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="VertexAttribute+loadSplitValues"></a>

### loadSplitValues
The loadSplitValues method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |

