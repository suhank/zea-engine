<a name="LDRVideo"></a>

### LDRVideo 
Class representing a LDR (low dynamic range) video.

```
const video = new LDRVideo()
video.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/video.mp4")
```

**Parameters**
* **Mute([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** Mutes video volume.
* **Loop([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** Repeats video over and over again.
* **Gain([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Sets loudness of the video before going through any processing.
* **SpatializeAudio([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** Enables/Disables spatial(Surrounding) audio.
* **refDistance([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **maxDistance([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **rolloffFactor([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **coneInnerAngle([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **coneOuterAngle([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_
* **coneOuterGain([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_

**File Types:** mp4, ogg


**Extends**: <code>[FileImage](api/SceneTree/Images/FileImage.md)</code>  
<a name="new_LDRVideo_new"></a>

### new LDRVideo
Create a LDR video.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> | The filePath value. |
| params | <code>object</code> | The params value. |

