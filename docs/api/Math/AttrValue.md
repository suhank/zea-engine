<a name="AttrValue"></a>

### AttrValue
Base class for values that can be stored in vertex attributes.
<br>
**Note:** These values use [Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) values to store their data.



* [AttrValue](#AttrValue)
    * _instance_
        * [isValid() ⇒ <code>boolean</code>](#isValid)
        * [asArray() ⇒ <code>array</code>](#asArray)
        * [toString() ⇒ <code>string</code>](#toString)
        * [toJSON()](#toJSON)
    * _static_
        * [createFromFloat32Buffer(buffer, offset)](#createFromFloat32Buffer)
        * [numElements()](#numElements)

<a name="AttrValue+isValid"></a>

### isValid
Verifies that all the numeric values inside the `this.__data` variable are a valid number.
Returns `false` If at least one of the values is either [Infinity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/Infinity) or
[NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Referencia/Objetos_globales/NaN).


**Returns**: <code>boolean</code> - - Returns the result as a boolean.  
<a name="AttrValue+asArray"></a>

### asArray
Returns current Vec2 data as array. Often used to pass types to the GPU.


**Returns**: <code>array</code> - - Returns the result as an array.  
<a name="AttrValue+toString"></a>

### toString
Calls `toJSON` method and stringifies it.


**Returns**: <code>string</code> - - The return value.  
<a name="AttrValue+toJSON"></a>

### toJSON
Represents the state of your class as a JSON Object.


**Todo**

- [ ] Implement this function in the derived class.

<a name="AttrValue.createFromFloat32Buffer"></a>

### createFromFloat32Buffer
Creates a new value to wrap memory in an existing buffer.


**Todo**

- [ ] Implement this function


| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>ArrayBuffer</code> | the buffer value. |
| offset | <code>number</code> | the offset value. |

<a name="AttrValue.numElements"></a>

### numElements
Returns the number of Float32 elements used by this type. Used to calculate storage requirements for large arrays of this type.


**Todo**

- [ ] Implement this function

