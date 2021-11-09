<a name="GIFImage"></a>

### GIFImage 
Class representing a GIF image.

```
const image = new GIFImage()
image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.gif")
```

**Parameters**
* **StreamAtlasDesc:**
* **StreamAtlasIndex:**

**Events**
* **loaded:** Triggered when the gif data is loaded.

**File Types:** gif


**Extends**: <code>[FileImage](api/SceneTree\Images\FileImage.md)</code>  

* [GIFImage ⇐ <code>FileImage</code>](#GIFImage)
    * [new GIFImage(name, filePath, params)](#new-GIFImage)
    * [getFrameDelay(index) ⇒ <code>number</code>](#getFrameDelay)
    * [load(url, format) ⇒ <code>Promise</code>](#load)

<a name="new_GIFImage_new"></a>

### new GIFImage
Create a GIF image.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> \| <code>object</code> | The filePath value. |
| params | <code>object</code> | The params value. |

<a name="GIFImage+getFrameDelay"></a>

### getFrameDelay
The getFrameDelay method.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="GIFImage+load"></a>

### load
Uses the specify url to load an Image element and adds it to the data library.
Sets the state of the current object.


**Returns**: <code>Promise</code> - Returns a promise that resolves once the image is loaded.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. |

