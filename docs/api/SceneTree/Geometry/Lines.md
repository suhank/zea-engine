<a name="Lines"></a>

### Lines 
Class representing lines.

**Kind**: global class  
**Extends**: <code>BaseGeom</code>  

* [Lines ⇐ <code>BaseGeom</code>](#Lines)
    * [new Lines()](#new-Lines)
    * [getIndices() ⇒ <code>any</code>](#getIndices)
    * [getNumSegments() ⇒ <code>number</code>](#getNumSegments)
    * [setNumSegments(count)](#setNumSegments)
    * [setSegment(index, p0, p1)](#setSegment)
    * [getSegmentVertexIndex(line, linevertex) ⇒ <code>any</code>](#getSegmentVertexIndex)
    * [addSegmentAttribute(name, dataType, count) ⇒ <code>any</code>](#addSegmentAttribute)
    * [hasSegmentAttribute(name) ⇒ <code>any</code>](#hasSegmentAttribute)
    * [getSegmentAttribute(name) ⇒ <code>any</code>](#getSegmentAttribute)
    * [genBuffers() ⇒ <code>any</code>](#genBuffers)
    * [readBinary(reader, context)](#readBinary)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)

<a name="new_Lines_new"></a>

### new Lines
Create lines.

<a name="Lines+getIndices"></a>

### getIndices
The getIndices method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>any</code> - - The return value.  
<a name="Lines+getNumSegments"></a>

### getNumSegments
Getter for the number of segments.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>number</code> - - Returns the number of segments.  
<a name="Lines+setNumSegments"></a>

### setNumSegments
Getter for the number of segments.

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | The count value. |

<a name="Lines+setSegment"></a>

### setSegment
The setSegment method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| p0 | <code>any</code> | The p0 value. |
| p1 | <code>any</code> | The p1 value. |

<a name="Lines+getSegmentVertexIndex"></a>

### getSegmentVertexIndex
The getSegmentVertexIndex method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| line | <code>any</code> | The line value. |
| linevertex | <code>any</code> | The linevertex value. |

<a name="Lines+addSegmentAttribute"></a>

### addSegmentAttribute
The addSegmentAttribute method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| dataType | <code>any</code> | The dataType value. |
| count | <code>number</code> | The count value. |

<a name="Lines+hasSegmentAttribute"></a>

### hasSegmentAttribute
The hasSegmentAttribute method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Lines+getSegmentAttribute"></a>

### getSegmentAttribute
The getSegmentAttribute method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Lines+genBuffers"></a>

### genBuffers
The genBuffers method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>any</code> - - The return value.  
<a name="Lines+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Lines+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Lines</code>](#Lines)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Lines+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Lines</code>](#Lines)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

