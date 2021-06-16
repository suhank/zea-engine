<a name="LDRImage"></a>

### LDRImage 
Class representing a LDR (low dynamic range) image.

```
const image = new LDRImage()
image.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")
```

**Parameters**
* **PreferredSize([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_

**Events:**
* **loaded:** Triggered when image data is loaded.

**File Types:** jpg, jpeg, png


**Extends**: <code>[FileImage](api/SceneTree\Images\FileImage.md)</code>  
<a name="new_LDRImage_new"></a>

### new LDRImage
Create a LDR image.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> | The filePath value. |
| params | <code>object</code> | The params value. |

