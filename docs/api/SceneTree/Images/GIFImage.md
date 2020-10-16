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


**Extends**: <code>[FileImage](api/SceneTree/Images/FileImage.md)</code>  

* [GIFImage ⇐ <code>FileImage</code>](#GIFImage)
    * [new GIFImage(name, filePath, params)](#new-GIFImage)
    * [getFrameDelay(index) ⇒ <code>number</code>](#getFrameDelay)

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

