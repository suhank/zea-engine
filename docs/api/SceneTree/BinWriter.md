<a name="BinWriter"></a>

### BinWriter
Class representing a bin writer.



* [BinWriter](#BinWriter)
    * [new BinWriter(dataSize)](#new-BinWriter)
    * [pos() ⇒ <code>any</code>](#pos)
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
The pos method.


**Returns**: <code>any</code> - - The return value.  
<a name="BinWriter+seek"></a>

### seek
The seek method.



| Param | Type | Description |
| --- | --- | --- |
| byteOffset | <code>number</code> | The byteOffset value. |

<a name="BinWriter+seekEnd"></a>

### seekEnd
The seekEnd method.


<a name="BinWriter+getBuffer"></a>

### getBuffer
The getBuffer method.


**Returns**: <code>ArrayBuffer</code> - - Returns an array buffer.  
<a name="BinWriter+writeUInt8"></a>

### writeUInt8
The writeUInt8 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BinWriter+writeUInt16"></a>

### writeUInt16
The writeUInt16 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BinWriter+writeUInt32"></a>

### writeUInt32
The writeUInt32 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BinWriter+writeSInt32"></a>

### writeSInt32
The writeSInt32 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BinWriter+writeFloat16"></a>

### writeFloat16
The writeFloat16 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BinWriter+writeFloat32"></a>

### writeFloat32
The writeFloat32 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BinWriter+writeUInt8Array"></a>

### writeUInt8Array
The writeUInt8Array method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeUInt16Array"></a>

### writeUInt16Array
The writeUInt16Array method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeUInt32Array"></a>

### writeUInt32Array
The writeUInt32Array method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeFloat32Array"></a>

### writeFloat32Array
The writeFloat32Array method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>any</code> |  | The value param. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeStr"></a>

### writeStr
The writeStr method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>any</code> |  | The str value. |
| writeSize | <code>boolean</code> | <code>true</code> | The writeSize value. |

<a name="BinWriter+writeSInt32Vec2"></a>

### writeSInt32Vec2
The writeSInt32Vec2 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeUInt32Vec2"></a>

### writeUInt32Vec2
The writeUInt32Vec2 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeFloat16Vec2"></a>

### writeFloat16Vec2
The writeFloat16Vec2 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeFloat32Vec2"></a>

### writeFloat32Vec2
The writeFloat32Vec2 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec2</code> | The Vec2 to write. |

<a name="BinWriter+writeFloat16Vec3"></a>

### writeFloat16Vec3
The writeFloat16Vec3 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec3</code> | The Vec3 to write. |

<a name="BinWriter+writeFloat32Vec3"></a>

### writeFloat32Vec3
The writeFloat32Vec3 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Vec3</code> | The Vec3 to write. |

<a name="BinWriter+writeFloat16Quat"></a>

### writeFloat16Quat
The writeFloat16Quat method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Quat</code> | The Quat to write. |

<a name="BinWriter+writeFloat32Quat"></a>

### writeFloat32Quat
The writeFloat32Quat method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Quat</code> | The Quat to write. |

<a name="BinWriter+writeRGBFloat32Color"></a>

### writeRGBFloat32Color
The writeRGBFloat32Color method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeRGBAFloat32Color"></a>

### writeRGBAFloat32Color
The writeRGBAFloat32Color method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeRGBUInt8Color"></a>

### writeRGBUInt8Color
The writeRGBUInt8Color method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeRGBAUInt8Color"></a>

### writeRGBAUInt8Color
The writeRGBAUInt8Color method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Color</code> | The Color to write. |

<a name="BinWriter+writeBox2"></a>

### writeBox2
The writeBox2 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Box2</code> | The Box2 to write. |

<a name="BinWriter+writeBox3"></a>

### writeBox3
The writeBox3 method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>Box3</code> | The Box3 to write. |

<a name="BinWriter+writePadd"></a>

### writePadd
The writePadd method.



| Param | Type | Description |
| --- | --- | --- |
| size | <code>any</code> | The size value. |

<a name="BinWriter+writeAlignment"></a>

### writeAlignment
The writeAlignment method.



| Param | Type | Description |
| --- | --- | --- |
| numBytes | <code>any</code> | The numBytes value. |

