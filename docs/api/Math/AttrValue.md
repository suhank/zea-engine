<a name="AttrValue"></a>

### AttrValue
Base class for Math types that can be stored in vertex attributes.
<br>
**Note:** These values use [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) values to store their data.



* [AttrValue](#AttrValue)
    * _instance_
        * [isValid() ⇒ <code>boolean</code>](#isValid)
        * [asArray() ⇒ <code>array</code>](#asArray)
        * [toString() ⇒ <code>string</code>](#toString)
        * [toJSON() ⇒ <code>object</code>](#toJSON)
    * _static_
        * [createFromFloat32Buffer(buffer, offset)](#createFromFloat32Buffer)
        * [numElements() ⇒ <code>number</code>](#numElements)

<a name="AttrValue+isValid"></a>

### isValid
Verifies if the values stored in this Math type are valid numeric values.
Returns `false` If at least one of the values is either [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/Infinity) or
[NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/NaN).


**Returns**: <code>boolean</code> - - Returns the result as a boolean.  
<a name="AttrValue+asArray"></a>

### asArray
Returns current Math type data as array. Often used to pass types to the GPU.


**Returns**: <code>array</code> - - Returns the result as an array.  
<a name="AttrValue+toString"></a>

### toString
Converts this Math type to a string in JSON format.


**Returns**: <code>string</code> - - The return value.  
<a name="AttrValue+toJSON"></a>

### toJSON
Converts this Math type to a JSON object.


**Returns**: <code>object</code> - - The json object.  
<a name="AttrValue.createFromFloat32Buffer"></a>

### createFromFloat32Buffer
This method is a factory function for creating new instances of math types, given an existing Float32Array buffer.
Each Math type implements this function to return an constructed value.


**Returns**: [<code>AttrValue</code>](#AttrValue) - - Returns the constructed value.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | the buffer value. |
| offset | <code>number</code> | the offset value. |

<a name="AttrValue.numElements"></a>

### numElements
Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.


**Returns**: <code>number</code> - - Returns the number of float values stored in this math type.  
