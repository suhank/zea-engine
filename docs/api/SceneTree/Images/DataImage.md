<a name="DataImage"></a>

### DataImage 
Represents a BaseImage with the ability to load data.

**Events**
* **loaded**
* **updated**


**Extends**: <code>BaseImage</code>  

* [DataImage ⇐ <code>BaseImage</code>](#DataImage)
    * [new DataImage(name)](#new-DataImage)
    * [isLoaded() ⇒ <code>boolean</code>](#isLoaded)
    * [getName() ⇒ <code>string</code>](#getName)
    * [isStream() ⇒ <code>boolean</code>](#isStream)
    * [setData(width, height, data)](#setData)
    * [getParams() ⇒ <code>object</code>](#getParams)

<a name="new_DataImage_new"></a>

### new DataImage
Create a data image.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="DataImage+isLoaded"></a>

### isLoaded
Returns an indicator of current item's loaded state.


**Returns**: <code>boolean</code> - - `true` if bytes data is fully loaded, `false` otherwise.  
<a name="DataImage+getName"></a>

### getName
Returns the item's name.


**Returns**: <code>string</code> - - The return value.  
<a name="DataImage+isStream"></a>

### isStream
Images are static content, so the value for this method is always going to be `false`


**Returns**: <code>boolean</code> - - The return value.  
<a name="DataImage+setData"></a>

### setData
Sets Image's data by recieving an bytes array.



| Param | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | The width value. |
| height | <code>number</code> | The height value. |
| data | <code>Uint8Array</code> | The data value. |

<a name="DataImage+getParams"></a>

### getParams
Returns all params and class state values(Including data).


**Returns**: <code>object</code> - - The return value.  
