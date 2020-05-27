<a name="AttrValue"></a>

## AttrValue
A base class for values that can be stored in vertex attributes.Note: these values use Float32Array values to store their data,and we can create references to values in attributes using

**Kind**: global class  

* [AttrValue](#AttrValue)
    * _instance_
        * [isValid() ⇒ <code>boolean</code>](#isValid)
        * [asArray() ⇒ <code>array</code>](#asArray)
        * [toString() ⇒ <code>any</code>](#toString)
    * _static_
        * [createFromFloat32Buffer(buffer, offset)](#createFromFloat32Buffer)
        * [numElements()](#numElements)

<a name="AttrValue+isValid"></a>

### isValid
The isValid method.

**Kind**: instance method of [<code>AttrValue</code>](#AttrValue)  
**Returns**: <code>boolean</code> - - Returns the result as a boolean.  
<a name="AttrValue+asArray"></a>

### asArray
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>AttrValue</code>](#AttrValue)  
**Returns**: <code>array</code> - - Returns the result as an array.  
<a name="AttrValue+toString"></a>

### toString
The toString method.

**Kind**: instance method of [<code>AttrValue</code>](#AttrValue)  
**Returns**: <code>any</code> - - The return value.  
<a name="AttrValue.createFromFloat32Buffer"></a>

### createFromFloat32Buffer
Creates a new value to wrap memory in an existing buffer.

**Kind**: static method of [<code>AttrValue</code>](#AttrValue)  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | the buffer value. |
| offset | <code>number</code> | the offset value. |

<a name="AttrValue.numElements"></a>

### numElements
Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.

**Kind**: static method of [<code>AttrValue</code>](#AttrValue)  
