<a name="LDRVideo"></a>

### LDRVideo 
Class representing a LDR (low dynamic range) video.

```
const video = new LDRVideo()
video.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/video.mp4")
```

**Parameters**
* **Mute([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Mutes video volume.
* **Loop([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Repeats video over and over again.
* **Gain([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** Sets loudness of the video before going through any processing.
* **SpatializeAudio([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Enables/Disables spatial(Surrounding) audio.
* **refDistance([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_
* **maxDistance([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_
* **rolloffFactor([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_
* **coneInnerAngle([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_
* **coneOuterAngle([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_
* **coneOuterGain([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_

**File Types:** mp4, ogg


**Extends**: <code>[FileImage](api/SceneTree\Images\FileImage.md)</code>  

* [LDRVideo ⇐ <code>FileImage</code>](#LDRVideo)
    * [new LDRVideo(name, filePath, params)](#new-LDRVideo)
    * [load(url, format) ⇒ <code>Promise</code>](#load)

<a name="new_LDRVideo_new"></a>

### new LDRVideo
Create a LDR video.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> | The filePath value. |
| params | <code>object</code> | The params value. |

<a name="LDRVideo+load"></a>

### load
Uses the specify url to load an Image element and adds it to the data library.
Sets the state of the current object.


**Returns**: <code>Promise</code> - Returns a promise that resolves once the image is loaded.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | The url value. |
| format | <code>string</code> | <code>&quot;RGB&quot;</code> | The format value. |

