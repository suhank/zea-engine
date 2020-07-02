<a name="BinWriter"></a>

### BinWriter
Writes `TypedArray` types in binary using a specific encoding.



* [BinWriter](#BinWriter)
    * [new BinWriter(dataSize)](#new-BinWriter)
    * [pos() ⇒ <code>number</code>](#pos)
    * [seek(byteOffset)](#seek)
    * [seekEnd()](#seekEnd)
    * [getBuffer() ⇒ <code>ArrayBuffer</code>](#getBuffer)
    * [writeUInt8(value)](#writeUInt8)
    * [writeUInt16(value)](#writeUInt16)
    * [writeUInt32(value)](#writeUInt32)
    * [writeSInt32(value)](#writeSInt32)
    * [writeFloat16(value)](#writeFloat16)
    * [writeFloat32(value)](#writeFloat32)
    * [writeUInt8Array(value, writeSize)](#writeUInt8Array)
    * [writeUInt16Array(value, writeSize)](#writeUInt16Array)
    * [writeUInt32Array(value, writeSize)](#writeUInt32Array)
    * [writeFloat32Array(value, writeSize)](#writeFloat32Array)
    * [writeStr(str, writeSize)](#writeStr)
    * [writeSInt32Vec2(value)](#writeSInt32Vec2)
    * [writeUInt32Vec2(value)](#writeUInt32Vec2)
    * [writeFloat16Vec2(value)](#writeFloat16Vec2)
    * [writeFloat32Vec2(value)](#writeFloat32Vec2)
    * [writeFloat16Vec3(value)](#writeFloat16Vec3)
    * [writeFloat32Vec3(value)](#writeFloat32Vec3)
    * [writeFloat16Quat(value)](#writeFloat16Quat)
    * [writeFloat32Quat(value)](#writeFloat32Quat)
    * [writeRGBFloat32Color(value)](#writeRGBFloat32Color)
    * [writeRGBAFloat32Color(value)](#writeRGBAFloat32Color)
    * [writeRGBUInt8Color(value)](#writeRGBUInt8Color)
    * [writeRGBAUInt8Color(value)](#writeRGBAUInt8Color)
    * [writeBox2(value)](#writeBox2)
    * [writeBox3(value)](#writeBox3)
    * [writePadd(size)](#writePadd)
    * [writeAlignment(numBytes)](#writeAlignment)

<a name="new_BinWriter_new"></a>

### new BinWriter
Create a bin writer.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataSize | <code>number</code> | <code>0</code> | The dataSize value. |

<a name="BinWriter+pos"></a>

### pos
Returns the byte offset position.


**Returns**: <code>number</code> - - The return value.  
<a name="BinWriter+seek"></a>

### seek
Sets byte offset value.



| Param | Type | Description |
| --- | --- | --- |
| byteOffset | <code>number</code> | The byteOffset value. |

<a name="BinWriter+seekEnd"></a>

### seekEnd
The seekEnd method.


<a name="BinWriter+getBuffer"></a>

### getBuffer
Returns written buffer data to current point.


**Returns**: <code>ArrayBuffer</code> - - Returns an array buffer.  
<a name="BinWriter+writeUInt8"></a>

### writeUInt8
Writes an unsigned Int8 value in current byte offset.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="BinWriter+writeUInt16"></a>

### writeUInt16
Writes an unsigned Int16 value in current byte offset.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="BinWriter+writeUInt32"></a>

### writeUInt32
Writes an unsigned Int32 value in current byte offset.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="BinWriter+writeSInt32"></a>

### writeSInt32
Writes a signed Int32 value in current byte offset.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="BinWriter+writeFloat16"></a>

### writeFloat16
Writes a Float16 value in current byte offset.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="BinWriter+writeFloat32"></a>

### writeFloat32
Writes a Float32 value in current byte offset.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value param. |

<a name="BinWriter+writeUInt8Array"></a>

### writeUInt8Array
Writes an unsigned Int8 array value from current byte offset.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Uint8Array</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeUInt16Array"></a>

### writeUInt16Array
Writes an unsigned Int16 array value from current byte offset.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>array</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeUInt32Array"></a>

### writeUInt32Array
Writes an unsigned Int32 array value from current byte offset.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Uint32Array</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeFloat32Array"></a>

### writeFloat32Array
Writes a Float32 array value from current byte offset.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>Float32Array</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeStr"></a>

### writeStr
Writes string value in current position, first writing an unsigned Int32 describing its length, then adding the string in Float32 values.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | The str value. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeSInt32Vec2"></a>

### writeSInt32Vec2
Writes a `Vec2` in the buffer using signed Int32 values(In `x,y` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeUInt32Vec2"></a>

### writeUInt32Vec2
Writes a `Vec2` in the buffer using unsigned Int32 values(In `x,y` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeFloat16Vec2"></a>

### writeFloat16Vec2
Writes a `Vec2` in the buffer using Float16 values(In `x,y` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeFloat32Vec2"></a>

### writeFloat32Vec2
Writes a `Vec2` in the buffer using Float32 values(In `x,y` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeFloat16Vec3"></a>

### writeFloat16Vec3
Writes a `Vec3` in the buffer using Float16 values(In `x,y,z` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec3</code> | The Vec3 to write. |

<a name="BinWriter+writeFloat32Vec3"></a>

### writeFloat32Vec3
Writes a `Vec3` in the buffer using Float32 values(In `x,y,z` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec3</code> | The Vec3 to write. |

<a name="BinWriter+writeFloat16Quat"></a>

### writeFloat16Quat
Writes a `Quat` in the buffer using Float16 values(In `x,y,z,w` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Quat</code> | The Quat to write. |

<a name="BinWriter+writeFloat32Quat"></a>

### writeFloat32Quat
Writes a `Quat` in the buffer using Float32 values(In `x,y,z,w` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Quat</code> | The Quat to write. |

<a name="BinWriter+writeRGBFloat32Color"></a>

### writeRGBFloat32Color
Writes a RGB `Color` in the buffer using Float32 values(In `r,g,b` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeRGBAFloat32Color"></a>

### writeRGBAFloat32Color
Writes a RGBA `Color` in the buffer using Float32 values(In `r,g,b,a` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeRGBUInt8Color"></a>

### writeRGBUInt8Color
Writes a RGB `Color` in the buffer using unsigned Int8 values(In `r,g,b` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeRGBAUInt8Color"></a>

### writeRGBAUInt8Color
Writes a RGBA `Color` in the buffer using unsigned Int8 values(In `r,g,b,a` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeBox2"></a>

### writeBox2
Writes a `Box2` in the buffer using Floar32 values(In `p0,p1` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Box2</code> | The Box2 to write. |

<a name="BinWriter+writeBox3"></a>

### writeBox3
Writes a `Box3` in the buffer using Floar32 values(In `p0,p1` order).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Box3</code> | The Box3 to write. |

<a name="BinWriter+writePadd"></a>

### writePadd
The writePadd method.



| Param | Type | Description |
| --- | --- | --- |
| size | <code>number</code> | The size value. |

<a name="BinWriter+writeAlignment"></a>

### writeAlignment
The writeAlignment method.



| Param | Type | Description |
| --- | --- | --- |
| numBytes | <code>number</code> | The numBytes value. |

