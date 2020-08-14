<a name="MathFunctions"></a>

### MathFunctions
Math Functions



* [MathFunctions](#MathFunctions)
    * [radToDeg(rad) ⇒ <code>number</code>](#radToDeg)
    * [degToRad(deg) ⇒ <code>number</code>](#degToRad)
    * [isNumeric(number) ⇒ <code>boolean</code>](#isNumeric)
    * [randomInt(min, max) ⇒ <code>number</code>](#randomInt)
    * [lerp(v0, v1, t) ⇒ <code>number</code>](#lerp)
    * [clamp(value, min, max) ⇒ <code>number</code>](#clamp)
    * [nearestPow2(value) ⇒ <code>number</code>](#nearestPow2)
    * [nearestPow10(value) ⇒ <code>number</code>](#nearestPow10)
    * [nextPow2(value) ⇒ <code>number</code>](#nextPow2)
    * [fract(value) ⇒ <code>number</code>](#fract)
    * [remap(value, start1, end1, start2, end2) ⇒ <code>number</code>](#remap)
    * [smoothStep(edge0, edge1, x) ⇒ <code>number</code>](#smoothStep)
    * [linStep(edge0, edge1, x) ⇒ <code>number</code>](#linStep)
    * [decode16BitFloatFrom2xUInt8(c) ⇒ <code>number</code>](#decode16BitFloatFrom2xUInt8)
    * [encode16BitFloatInto2xUInt8(v) ⇒ <code>Uint8Array</code>](#encode16BitFloatInto2xUInt8)
    * [encode16BitFloat(v) ⇒ <code>number</code>](#encode16BitFloat)
    * [decode16BitFloat(h) ⇒ <code>number</code>](#decode16BitFloat)
    * [convertFloat32ArrayToUInt16Array(float32Array) ⇒ <code>Uint16Array</code>](#convertFloat32ArrayToUInt16Array)

<a name="MathFunctions.radToDeg"></a>

### radToDeg
Converts Radians to Degrees


**Returns**: <code>number</code> - - Degrees equivalent  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Radians value |

<a name="MathFunctions.degToRad"></a>

### degToRad
Converts Degrees to Radiants


**Returns**: <code>number</code> - -  Radians equivalent  

| Param | Type | Description |
| --- | --- | --- |
| deg | <code>number</code> | Degrees value |

<a name="MathFunctions.isNumeric"></a>

### isNumeric
Verifies if the specified parameter is numeric.


**Returns**: <code>boolean</code> - - `true` when is a valid number  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>number</code> \| <code>any</code> | Number to test |

<a name="MathFunctions.randomInt"></a>

### randomInt
Generates and returns a random integer within the specified range.


**Returns**: <code>number</code> - - Random number inside range.  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>number</code> | Lower value random int can be. |
| max | <code>number</code> | Highest value random int can be. |

<a name="MathFunctions.lerp"></a>

### lerp
Calculates a lineal interpolation between two inputs for the specified parameter(t).


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| v0 | <code>number</code> | - |
| v1 | <code>number</code> | - |
| t | <code>number</code> | - |

<a name="MathFunctions.clamp"></a>

### clamp
Restricts the specified value between two numbers



| Param | Type |
| --- | --- |
| value | <code>number</code> | 
| min | <code>number</code> | 
| max | <code>number</code> | 

<a name="MathFunctions.nearestPow2"></a>

### nearestPow2
Returns the nearest pow of two value of the specified number.


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | - |

<a name="MathFunctions.nearestPow10"></a>

### nearestPow10
Returns the nearest pow of ten value of the specified number.


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | - |

<a name="MathFunctions.nextPow2"></a>

### nextPow2
Returns the next pow of two value of the specified number.


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | - |

<a name="MathFunctions.fract"></a>

### fract
Returns the fractional component of a number


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | - |

<a name="MathFunctions.remap"></a>

### remap
Moves the specified value from one numeric domain(range) to another.


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | - |
| start1 | <code>number</code> | - |
| end1 | <code>number</code> | - |
| start2 | <code>number</code> | - |
| end2 | <code>number</code> | - |

<a name="MathFunctions.smoothStep"></a>

### smoothStep
Perform Hermite interpolation between two values


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| edge0 | <code>number</code> | - |
| edge1 | <code>number</code> | - |
| x | <code>number</code> | - |

<a name="MathFunctions.linStep"></a>

### linStep
Performs - interpolation between two values


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| edge0 | <code>number</code> | - |
| edge1 | <code>number</code> | - |
| x | <code>number</code> | - |

<a name="MathFunctions.decode16BitFloatFrom2xUInt8"></a>

### decode16BitFloatFrom2xUInt8
Decodes a Float16 from two unsigned Int8


**Returns**: <code>number</code> - - Decoded Float16  

| Param | Type | Description |
| --- | --- | --- |
| c | <code>Uint8Array</code> | Array with the two UInt8 |

<a name="MathFunctions.encode16BitFloatInto2xUInt8"></a>

### encode16BitFloatInto2xUInt8
Encodes an array of two unsigned Int8 to a Float16


**Returns**: <code>Uint8Array</code> - - Encoded Unsigned Int8 array  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | Float16 number |

<a name="MathFunctions.encode16BitFloat"></a>

### encode16BitFloat
Transforms a 16 bit float to an encoded integer.


**Returns**: <code>number</code> - - Encoded number  

| Param | Type | Description |
| --- | --- | --- |
| v | <code>number</code> | Float16 number to encode |

<a name="MathFunctions.decode16BitFloat"></a>

### decode16BitFloat
As opposite of the `encode16BitFloat` method, this takes an encoded integer value,
and returns the 16 bit float.


**Returns**: <code>number</code> - - Decoded 16 bit float.  

| Param | Type | Description |
| --- | --- | --- |
| h | <code>number</code> | Encoded integer |

<a name="MathFunctions.convertFloat32ArrayToUInt16Array"></a>

### convertFloat32ArrayToUInt16Array
Transforms an array of Float 32 to an array of unsigned Int16.


**Returns**: <code>Uint16Array</code> - - Unsigned Int16 array representative of the Float32Array  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>Float32Array</code> | - |

