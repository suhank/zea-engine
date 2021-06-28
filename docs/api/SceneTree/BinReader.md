<a name="BinReader"></a>

### BinReader
Reads binary data in a specific encoding. Used in loading binary data such as zcad files.



* [BinReader](#BinReader)
    * [new BinReader(data, byteOffset, isMobileDevice)](#new-BinReader)
    * [isMobileDevice ⇒ <code>Boolean</code>](#isMobileDevice)
    * [data ⇒ <code>Buffer</code>](#data)
    * [byteLength ⇒ <code>number</code>](#byteLength)
    * [remainingByteLength ⇒ <code>number</code>](#remainingByteLength)
    * [pos() ⇒ <code>number</code>](#pos)
    * [seek(byteOffset)](#seek)
    * [advance(byteOffset)](#advance)
    * [loadUInt8() ⇒ <code>number</code>](#loadUInt8)
    * [loadUInt16() ⇒ <code>number</code>](#loadUInt16)
    * [loadUInt32() ⇒ <code>number</code>](#loadUInt32)
    * [loadSInt32() ⇒ <code>number</code>](#loadSInt32)
    * [loadFloat16() ⇒ <code>number</code>](#loadFloat16)
    * [loadUFloat16() ⇒ <code>number</code>](#loadUFloat16)
    * [loadFloat16From2xUInt8() ⇒ <code>number</code>](#loadFloat16From2xUInt8)
    * [loadUInt32From2xUFloat16() ⇒ <code>number</code>](#loadUInt32From2xUFloat16)
    * [loadSInt32From2xFloat16() ⇒ <code>number</code>](#loadSInt32From2xFloat16)
    * [loadFloat32() ⇒ <code>number</code>](#loadFloat32)
    * [loadUInt8Array(size, clone) ⇒ <code>Uint8Array</code>](#loadUInt8Array)
    * [loadUInt16Array(size, clone) ⇒ <code>Uint16Array</code>](#loadUInt16Array)
    * [loadUInt32Array(size, clone) ⇒ <code>Uint32Array</code>](#loadUInt32Array)
    * [loadFloat32Array(size, clone) ⇒ <code>Float32Array</code>](#loadFloat32Array)
    * [loadStr() ⇒ <code>string</code>](#loadStr)
    * [loadStrArray() ⇒ <code>Array</code>](#loadStrArray)
    * [loadSInt32Vec2() ⇒ <code>Vec2</code>](#loadSInt32Vec2)
    * [loadUInt32Vec2() ⇒ <code>Vec2</code>](#loadUInt32Vec2)
    * [loadFloat16Vec2() ⇒ <code>Vec2</code>](#loadFloat16Vec2)
    * [loadFloat32Vec2() ⇒ <code>Vec2</code>](#loadFloat32Vec2)
    * [loadFloat16Vec3() ⇒ <code>Vec3</code>](#loadFloat16Vec3)
    * [loadFloat32Vec3() ⇒ <code>Vec3</code>](#loadFloat32Vec3)
    * [loadFloat16Quat() ⇒ <code>Quat</code>](#loadFloat16Quat)
    * [loadFloat32Quat() ⇒ <code>Quat</code>](#loadFloat32Quat)
    * [loadRGBFloat32Color() ⇒ <code>Color</code>](#loadRGBFloat32Color)
    * [loadRGBAFloat32Color() ⇒ <code>Color</code>](#loadRGBAFloat32Color)
    * [loadRGBUInt8Color() ⇒ <code>Color</code>](#loadRGBUInt8Color)
    * [loadRGBAUInt8Color() ⇒ <code>Color</code>](#loadRGBAUInt8Color)
    * [loadBox2() ⇒ <code>Box2</code>](#loadBox2)
    * [loadBox3() ⇒ <code>Box3</code>](#loadBox3)
    * [readPad(stride)](#readPad)

<a name="new_BinReader_new"></a>

### new BinReader
Create a bin reader.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>Buffer</code> |  | The data buffer. |
| byteOffset | <code>number</code> | <code>0</code> | The byte offset value to start reading the buffer. |
| isMobileDevice | <code>boolean</code> | <code>true</code> | The isMobileDevice value. |

<a name="BinReader+isMobileDevice"></a>

### isMobileDevice 
Returns state of whether or not the `BinReader` object was instantiated from a mobile device.


**Returns**: <code>Boolean</code> - - Returns true is a mobile device is detected.  
<a name="BinReader+data"></a>

### data 
Returns the data buffer we're reading from.


**Returns**: <code>Buffer</code> - - The data buffer we are reading from,  
<a name="BinReader+byteLength"></a>

### byteLength 
Returns the length of the buffer.


**Returns**: <code>number</code> - - The total length of the buffer  
<a name="BinReader+remainingByteLength"></a>

### remainingByteLength 
Returns remaining length of the buffer to read.


**Returns**: <code>number</code> - - The remaining length of the buffer to read.  
<a name="BinReader+pos"></a>

### pos
Returns current byte offset in the buffer.


**Returns**: <code>number</code> - - The current offset in the binary buffer  
<a name="BinReader+seek"></a>

### seek
Sets the byte offset value.



| Param | Type | Description |
| --- | --- | --- |
| byteOffset | <code>number</code> | The byteOffset param. |

<a name="BinReader+advance"></a>

### advance
Adds offset bytes to current offset value.



| Param | Type | Description |
| --- | --- | --- |
| byteOffset | <code>number</code> | The byte Offset amount. |

<a name="BinReader+loadUInt8"></a>

### loadUInt8
Returns the unsigned Uint8 value at current byte offset position,
and adds one byte to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt16"></a>

### loadUInt16
Returns the unsigned Uint16 value at current byte offset position,
and adds two bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt32"></a>

### loadUInt32
Returns the unsigned Uint32 value at current byte offset position,
and adds four bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadSInt32"></a>

### loadSInt32
Returns the signed Int32 value at current byte offset position,
and adds four bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadFloat16"></a>

### loadFloat16
Returns the Float16 value at current byte offset position,
and adds four bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUFloat16"></a>

### loadUFloat16
Returns the Float16 value at current byte offset position,
and adds two bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadFloat16From2xUInt8"></a>

### loadFloat16From2xUInt8
Returns a single signed Float16 value at current byte offset position from 2 unsigned Int8 values,
and adds two bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt32From2xUFloat16"></a>

### loadUInt32From2xUFloat16
Loads and returns a single Signed integer value from 2 Unsigned Float16 values.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadSInt32From2xFloat16"></a>

### loadSInt32From2xFloat16
Loads and returns a single Signed integer value from 2 signed Float16 values.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadFloat32"></a>

### loadFloat32
Returns the Float32 value at current byte offset position,
and adds four bytes to the offset.


**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt8Array"></a>

### loadUInt8Array
Reads buffer and return an unsigned Int8 array with the specified size,
starting from current byte offset.<br>
Byte offset is increased by the specified byte size.


**Returns**: <code>Uint8Array</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadUInt16Array"></a>

### loadUInt16Array
Reads buffer and return an unsigned Int16 array with the specified size,
starting from current byte offset.<br>
Byte offset is increased by the specified byte size x 2.


**Returns**: <code>Uint16Array</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadUInt32Array"></a>

### loadUInt32Array
Reads buffer and return an unsigned Int32 array with the specified size,
starting from current byte offset.<br>
Byte offset is increased by the specified byte size x 4.


**Returns**: <code>Uint32Array</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadFloat32Array"></a>

### loadFloat32Array
Reads buffer and return a Float32 array with the specified size,
starting from current byte offset.<br>
Byte offset is increased by the specified byte size x 4.


**Returns**: <code>Float32Array</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadStr"></a>

### loadStr
Returns next string.
First looks for the string length description in the next four bytes in the buffer(Starting from byte offset).


**Returns**: <code>string</code> - - The return value.  
<a name="BinReader+loadStrArray"></a>

### loadStrArray
Returns an array of strings.
First reading the size of the array then reading each string.


**Returns**: <code>Array</code> - - The return value.  
<a name="BinReader+loadSInt32Vec2"></a>

### loadSInt32Vec2
Creates and returns a `Vec2` object with the next two signed Int32 values in the buffer.


**Returns**: <code>[Vec2](api/Math\Vec2.md)</code> - - Returns a Vec2.  
<a name="BinReader+loadUInt32Vec2"></a>

### loadUInt32Vec2
Creates and returns a `Vec2` object with the next two unsigned Int32 values in the buffer.


**Returns**: <code>[Vec2](api/Math\Vec2.md)</code> - - Returns a Vec2.  
<a name="BinReader+loadFloat16Vec2"></a>

### loadFloat16Vec2
Creates and returns a `Vec2` object with the next two Float16 values in the buffer.


**Returns**: <code>[Vec2](api/Math\Vec2.md)</code> - - Returns a Vec2.  
<a name="BinReader+loadFloat32Vec2"></a>

### loadFloat32Vec2
Creates and returns a `Vec2` object with the next two Float32 values in the buffer.


**Returns**: <code>[Vec2](api/Math\Vec2.md)</code> - - Returns a Vec2.  
<a name="BinReader+loadFloat16Vec3"></a>

### loadFloat16Vec3
Creates and returns a `Vec3` object with the next three Float16 values in the buffer.


**Returns**: <code>[Vec3](api/Math\Vec3.md)</code> - - Returns a Vec3.  
<a name="BinReader+loadFloat32Vec3"></a>

### loadFloat32Vec3
Creates and returns a `Vec3` object with the next three Float32 values in the buffer.


**Returns**: <code>[Vec3](api/Math\Vec3.md)</code> - - Returns a Vec3.  
<a name="BinReader+loadFloat16Quat"></a>

### loadFloat16Quat
Creates and returns a `Quat` object with the next four Float16 values in the buffer.


**Returns**: <code>[Quat](api/Math\Quat.md)</code> - - Returns a Quat.  
<a name="BinReader+loadFloat32Quat"></a>

### loadFloat32Quat
Creates and returns a `Quat` object with the next four Float32 values in the buffer.


**Returns**: <code>[Quat](api/Math\Quat.md)</code> - - Returns a Quat.  
<a name="BinReader+loadRGBFloat32Color"></a>

### loadRGBFloat32Color
Creates and returns a `Color` object with the next three Float32 values in the buffer.


**Returns**: <code>[Color](api/Math\Color.md)</code> - - Returns a Color.  
<a name="BinReader+loadRGBAFloat32Color"></a>

### loadRGBAFloat32Color
Creates and returns a RGBA `Color` object with the next four Float32 values in the buffer.


**Returns**: <code>[Color](api/Math\Color.md)</code> - - Returns a Color.  
<a name="BinReader+loadRGBUInt8Color"></a>

### loadRGBUInt8Color
Creates and returns a `Color` object with the next three unsigned Int8 values in the buffer.


**Returns**: <code>[Color](api/Math\Color.md)</code> - - Returns a Color.  
<a name="BinReader+loadRGBAUInt8Color"></a>

### loadRGBAUInt8Color
Creates and returns a RGBA `Color` object with the next four unsigned Int8 values in the buffer.


**Returns**: <code>[Color](api/Math\Color.md)</code> - - Returns a Color.  
<a name="BinReader+loadBox2"></a>

### loadBox2
Creates and returns a `Box2` object with the next four Float32 values in the buffer.
Next four because it creates two Vec2.


**Returns**: <code>[Box2](api/Math\Box2.md)</code> - - Returns a Box2.  
<a name="BinReader+loadBox3"></a>

### loadBox3
Creates and returns a `Box2` object with the next six Float32 values in the buffer.
Next four because it creates two Vec3.


**Returns**: <code>[Box3](api/Math\Box3.md)</code> - - Returns a Box3.  
<a name="BinReader+readPad"></a>

### readPad
Given a stridee value, advance the pointer to the end of the current stride.



| Param | Type | Description |
| --- | --- | --- |
| stride | <code>number</code> | The stride param. |

