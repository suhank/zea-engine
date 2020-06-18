<a name="BinReader"></a>

### BinReader
Class representing a bin reader.

**Kind**: global class  

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
    * [loadFloat32() ⇒ <code>any</code>](#loadFloat32)
    * [loadUInt8Array(size, clone) ⇒ <code>any</code>](#loadUInt8Array)
    * [loadUInt16Array(size, clone) ⇒ <code>any</code>](#loadUInt16Array)
    * [loadUInt32Array(size, clone) ⇒ <code>any</code>](#loadUInt32Array)
    * [loadFloat32Array(size, clone) ⇒ <code>any</code>](#loadFloat32Array)
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
    * [readPadd(stride)](#readPadd)

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
Getter for isMobileDevice.

**Kind**: instance property of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Boolean</code> - - Returns true is a mobile device is detected.  
<a name="BinReader+data"></a>

### data 
Getter for data.

**Kind**: instance property of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Buffer</code> - - The data buffer we are reading from,  
<a name="BinReader+byteLength"></a>

### byteLength 
Getter for byteLength.

**Kind**: instance property of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The total length of the buffer  
<a name="BinReader+remainingByteLength"></a>

### remainingByteLength 
Getter for remainingByteLength.

**Kind**: instance property of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The reemaining length of the buffer to read.  
<a name="BinReader+pos"></a>

### pos
The pos method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The current offset in the binary buffer  
<a name="BinReader+seek"></a>

### seek
The seek method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  

| Param | Type | Description |
| --- | --- | --- |
| byteOffset | <code>number</code> | The byteOffset param. |

<a name="BinReader+advance"></a>

### advance
The advance method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  

| Param | Type | Description |
| --- | --- | --- |
| byteOffset | <code>number</code> | The byte Offset amount. |

<a name="BinReader+loadUInt8"></a>

### loadUInt8
The loadUInt8 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt16"></a>

### loadUInt16
The loadUInt16 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt32"></a>

### loadUInt32
The loadUInt32 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadSInt32"></a>

### loadSInt32
The loadSInt32 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadFloat16"></a>

### loadFloat16
The loadFloat16 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUFloat16"></a>

### loadUFloat16
The loadUFloat16 returns a float where the sign big indicates it is > 201.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadFloat16From2xUInt8"></a>

### loadFloat16From2xUInt8
The loadFloat16From2xUInt8 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadUInt32From2xUFloat16"></a>

### loadUInt32From2xUFloat16
The loadUInt32From2xUFloat16 loads a single Signed integer value from 2 Unsigned Float16 values.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadSInt32From2xFloat16"></a>

### loadSInt32From2xFloat16
The loadSInt32From2xFloat16 loads a single Signed integer value from 2 signed Float16 values.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>number</code> - - The return value.  
<a name="BinReader+loadFloat32"></a>

### loadFloat32
The loadFloat32 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>any</code> - - The return value.  
<a name="BinReader+loadUInt8Array"></a>

### loadUInt8Array
The loadUInt8Array method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadUInt16Array"></a>

### loadUInt16Array
The loadUInt16Array method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadUInt32Array"></a>

### loadUInt32Array
The loadUInt32Array method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadFloat32Array"></a>

### loadFloat32Array
The loadFloat32Array method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> |  | The size param. |
| clone | <code>boolean</code> | <code>false</code> | The clone param. |

<a name="BinReader+loadStr"></a>

### loadStr
The loadStr method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>string</code> - - The return value.  
<a name="BinReader+loadStrArray"></a>

### loadStrArray
The loadStrArray method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Array</code> - - The return value.  
<a name="BinReader+loadSInt32Vec2"></a>

### loadSInt32Vec2
The loadSInt32Vec2 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Vec2</code> - - Returns a Vec2.  
<a name="BinReader+loadUInt32Vec2"></a>

### loadUInt32Vec2
The loadUInt32Vec2 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Vec2</code> - - Returns a Vec2.  
<a name="BinReader+loadFloat16Vec2"></a>

### loadFloat16Vec2
The loadFloat16Vec2 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Vec2</code> - - Returns a Vec2.  
<a name="BinReader+loadFloat32Vec2"></a>

### loadFloat32Vec2
The loadFloat32Vec2 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Vec2</code> - - Returns a Vec2.  
<a name="BinReader+loadFloat16Vec3"></a>

### loadFloat16Vec3
The loadFloat16Vec3 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Vec3</code> - - Returns a Vec3.  
<a name="BinReader+loadFloat32Vec3"></a>

### loadFloat32Vec3
The loadFloat32Vec3 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Vec3</code> - - Returns a Vec3.  
<a name="BinReader+loadFloat16Quat"></a>

### loadFloat16Quat
The loadFloat16Quat method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Quat</code> - - Returns a Quat.  
<a name="BinReader+loadFloat32Quat"></a>

### loadFloat32Quat
The loadFloat32Quat method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Quat</code> - - Returns a Quat.  
<a name="BinReader+loadRGBFloat32Color"></a>

### loadRGBFloat32Color
The loadRGBFloat32Color method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Color</code> - - Returns a Color.  
<a name="BinReader+loadRGBAFloat32Color"></a>

### loadRGBAFloat32Color
The loadRGBAFloat32Color method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Color</code> - - Returns a Color.  
<a name="BinReader+loadRGBUInt8Color"></a>

### loadRGBUInt8Color
The loadRGBUInt8Color method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Color</code> - - Returns a Color.  
<a name="BinReader+loadRGBAUInt8Color"></a>

### loadRGBAUInt8Color
The loadRGBAUInt8Color method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Color</code> - - Returns a Color.  
<a name="BinReader+loadBox2"></a>

### loadBox2
The loadBox2 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Box2</code> - - Returns a Box2.  
<a name="BinReader+loadBox3"></a>

### loadBox3
The loadBox3 method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  
**Returns**: <code>Box3</code> - - Returns a Box3.  
<a name="BinReader+readPadd"></a>

### readPadd
The readPadd method.

**Kind**: instance method of [<code>BinReader</code>](#BinReader)  

| Param | Type | Description |
| --- | --- | --- |
| stride | <code>any</code> | The stride param. |

