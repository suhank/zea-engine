<a name="BaseImage"></a>

### BaseImage 
Represents a 2D image item, containing width and height.

**Parameters**
* **AlphaFromLuminance([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Sets alpha chanel to the luminance of the image and all color channels to `0`.
* **Invert([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Horizontally flips the image(Basically inverting X pixels).
* **FlipY([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** Vertically flips the image, meaning that it would be upside down if enabled.

**Events**
* **updated:** Triggered when the value of any of the parameters listed above changes.


**Extends**: <code>[BaseItem](api/SceneTree\BaseItem.md)</code>  

* [BaseImage ⇐ <code>BaseItem</code>](#BaseImage)
    * [new BaseImage(name)](#new-BaseImage)
    * [getMapping() ⇒ <code>object</code> \| <code>undefined</code>](#getMapping)
    * [setMapping(mapping)](#setMapping)
    * [isStream() ⇒ <code>boolean</code>](#isStream)
    * [getParams() ⇒ <code>object</code>](#getParams)

<a name="new_BaseImage_new"></a>

### new BaseImage
Creates an instance of BaseImage.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the item |

<a name="BaseImage+getMapping"></a>

### getMapping
Returns mapping object state of the item.


**Returns**: <code>object</code> \| <code>undefined</code> - - The return value.  
<a name="BaseImage+setMapping"></a>

### setMapping
Sets mapping structure object in the state of the item.



| Param | Type | Description |
| --- | --- | --- |
| mapping | <code>object</code> | The mapping value. |

<a name="BaseImage+isStream"></a>

### isStream
Base images are static content, so the value for this method is always going to be `false`


**Returns**: <code>boolean</code> - - Returns a boolean.  
<a name="BaseImage+getParams"></a>

### getParams
Returns all parameters and class state values.


**Returns**: <code>object</code> - - The return value.  
