<a name="LDRImage"></a>

### LDRImage 
Class representing a LDR (low dynamic range) image.

```
const image = new LDRImage()
image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
```

**Parameters**
* **PreferredSize(`NumberParameter`):** _todo_

**Events:**
* **loaded:** Triggered when image data is loaded.

**File Types:** jpg, jpeg, png


**Extends**: <code>FileImage</code>  

* [LDRImage ⇐ <code>FileImage</code>](#LDRImage)
    * [new LDRImage(name, filePath, params)](#new-LDRImage)
    * [setCrossOrigin(crossOrigin)](#setCrossOrigin)
    * [setImageURL(url, format)](#setImageURL)

<a name="new_LDRImage_new"></a>

### new LDRImage
Create a LDR image.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> | The filePath value. |
| params | <code>object</code> | The params value. |

<a name="LDRImage+setCrossOrigin"></a>

### setCrossOrigin
Defines how to handle cross origin request.

**Possible values:**
* **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
* **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
* **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.


**Default**: <code>anonymous</code>  

| Param | Type | Description |
| --- | --- | --- |
| crossOrigin | <code>string</code> | The crossOrigin value. |

<a name="LDRImage+setImageURL"></a>

### setImageURL
Uses the specify url to load an Image element and adds it to the data library.
Sets the state of the current object.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. |

