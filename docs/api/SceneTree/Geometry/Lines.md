<a name="Lines"></a>

### Lines 
Class representing lines primitive drawing type, connecting vertices using the specified indices.
i.e. We have 4 points(vertices) but we don't know how they connect to each other,
and that's why we need indices(Numbers indicating which vertex connects to which).
In this case if we say that `indices` is `[0,1,2,3]`, it would connect the first vertex to the second,
and the third to the fourth.

```
const lines = new Lines()
```

**Events**
* **geomDataChanged:** Triggered when the data value of the geometry is set(This includes reading binary)


**Extends**: <code>BaseGeom</code>  

* [Lines ⇐ <code>BaseGeom</code>](#Lines)
    * [new Lines()](#new-Lines)
    * [getIndices() ⇒ <code>Uint32Array</code>](#getIndices)
    * [getNumSegments() ⇒ <code>number</code>](#getNumSegments)
    * [setNumSegments(numOfSegments)](#setNumSegments)
    * [setSegment(index, p0, p1)](#setSegment)
    * [genBuffers() ⇒ <code>object</code>](#genBuffers)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)

<a name="new_Lines_new"></a>

### new Lines
Create lines.

<a name="Lines+getIndices"></a>

### getIndices
Returns the specified indices(Vertex connectors)


**Returns**: <code>Uint32Array</code> - - The return value.  
<a name="Lines+getNumSegments"></a>

### getNumSegments
Returns the number of line segments.


**Returns**: <code>number</code> - - Returns the number of segments.  
<a name="Lines+setNumSegments"></a>

### setNumSegments
Sets the number of line segments in the geometry.<br>
**Important:** It resets indices values.



| Param | Type | Description |
| --- | --- | --- |
| numOfSegments | <code>number</code> | The count value. |

<a name="Lines+setSegment"></a>

### setSegment
Sets segment values in the specified index.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| p0 | <code>number</code> | The p0 value. |
| p1 | <code>number</code> | The p1 value. |

<a name="Lines+genBuffers"></a>

### genBuffers
Returns vertex attributes buffers and its count.


**Returns**: <code>object</code> - - The return value.  
<a name="Lines+readBinary"></a>

### readBinary
Sets state of current geometry(Including line segments) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Lines+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Lines+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

