<a name="LDRVideo"></a>

### LDRVideo 
Class representing a LDR (low dynamic range) video.

```
const video = new LDRVideo()
video.getParameter('FilePath').setUrl("https://storage.googleapis.com/zea-playground-assets/zea-engine/video.mp4")
```

**Parameters**
* **Mute(`BooleanParameter`):** Mutes video volume.
* **Loop(`BooleanParameter`):** Repeats video over and over again.
* **Gain(`NumberParameter`):** Sets loudness of the video before going through any processing.
* **SpatializeAudio(`BooleanParameter`):** Enables/Disables spatial(Surrounding) audio.
* **refDistance(`NumberParameter`):** _todo_
* **maxDistance(`NumberParameter`):** _todo_
* **rolloffFactor(`NumberParameter`):** _todo_
* **coneInnerAngle(`NumberParameter`):** _todo_
* **coneOuterAngle(`NumberParameter`):** _todo_
* **coneOuterGain(`NumberParameter`):** _todo_

**File Types:** mp4, ogg


**Extends**: <code>FileImage</code>  
<a name="new_LDRVideo_new"></a>

### new LDRVideo
Create a LDR video.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filePath | <code>string</code> | The filePath value. |
| params | <code>object</code> | The params value. |

