<a name="EnvMap"></a>

### EnvMap 
An EnvMap can load High Dynamic Range environment map images, necessary for high quality PBR lighting.
<br>
<br>
**Parameters**
* **HeadLightMode([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Enables Headlight mode so that the environment lighting is aligned with the camera.
With Headlight mode on, the top of the env map is aligned with the direction of the camera, so a the view is generally well lit.


**Extends**: <code>[VLHImage](api/SceneTree\Images\VLHImage.md)</code>  

* [EnvMap ⇐ <code>VLHImage</code>](#EnvMap)
    * [new EnvMap(name, params)](#new-EnvMap)
    * [dirToLuminance(dir) ⇒ <code>number</code>](#dirToLuminance)

<a name="new_EnvMap_new"></a>

### new EnvMap
Create an env map.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| params | <code>object</code> | The params value. |

<a name="EnvMap+dirToLuminance"></a>

### dirToLuminance
Calculate the luminance of the Environment in the direction.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>[Vec3](api/Math\Vec3.md)</code> | The dir value. |

