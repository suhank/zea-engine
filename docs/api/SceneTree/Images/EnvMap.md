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
    * [getSampleSets() ⇒ <code>object</code>](#getSampleSets)
    * [uvToDir(uv) ⇒ <code>Vec2</code> \| <code>Vec3</code>](#uvToDir)
    * [dirToUv(dir) ⇒ <code>Vec2</code>](#dirToUv)
    * [uvToLuminance(uv) ⇒ <code>number</code>](#uvToLuminance)
    * [dirToLuminance(dir) ⇒ <code>number</code>](#dirToLuminance)

<a name="new_EnvMap_new"></a>

### new EnvMap
Create an env map.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| params | <code>object</code> | The params value. |

<a name="EnvMap+getSampleSets"></a>

### getSampleSets
The getSampleSets method.


**Returns**: <code>object</code> - - The return value.  
<a name="EnvMap+uvToDir"></a>

### uvToDir
The uvToDir method.


**Returns**: <code>Vec2</code> \| <code>Vec3</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| uv | <code>[Vec2](api/Math\Vec2.md)</code> | The uv value. |

<a name="EnvMap+dirToUv"></a>

### dirToUv
Converts position into UV.


**Returns**: <code>[Vec2](api/Math\Vec2.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>Vec2</code> \| <code>[Vec3](api/Math\Vec3.md)</code> | The dir value. |

<a name="EnvMap+uvToLuminance"></a>

### uvToLuminance
Converts a `Vec2` into luminance.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| uv | <code>[Vec2](api/Math\Vec2.md)</code> | The uv value. |

<a name="EnvMap+dirToLuminance"></a>

### dirToLuminance
Converts `Vec2` coordinates into luminance.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>object</code> | The dir value. |

