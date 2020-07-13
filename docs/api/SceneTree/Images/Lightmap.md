### Classes

<dl>
<dt><a href="#Lightmap">Lightmap</a> ⇐ <code>RefCounted</code></dt>
<dd><p>Class representing a lightmap.</p>
</dd>
<dt><a href="#LightmapMixer">LightmapMixer</a> ⇐ <code>ParameterOwner</code></dt>
<dd><p>Class representing a lightmap mixer.</p>
</dd>
</dl>

<a name="Lightmap"></a>

### Lightmap 
Class representing a lightmap.


**Extends**: <code>RefCounted</code>  

* [Lightmap ⇐ <code>RefCounted</code>](#Lightmap)
    * [new Lightmap(filepath, asset, atlasSize, stream)](#new-Lightmap)
    * [width](#width)
    * [height](#height)
    * [isStream() ⇒ <code>any</code>](#isStream)
    * [loadResource(filepath)](#loadResource)
    * [fromJSON(j)](#fromJSON)

<a name="new_Lightmap_new"></a>

### new Lightmap
Create a lightmap.


| Param | Type | Description |
| --- | --- | --- |
| filepath | <code>any</code> | The filepath value. |
| asset | <code>any</code> | The asset value. |
| atlasSize | <code>any</code> | The atlasSize value. |
| stream | <code>any</code> | The stream value. |

<a name="Lightmap+width"></a>

### width
Getter for width.


<a name="Lightmap+height"></a>

### height
Getter for height.


<a name="Lightmap+isStream"></a>

### isStream
The isStream method.


**Returns**: <code>any</code> - - The return value.  
<a name="Lightmap+loadResource"></a>

### loadResource
The loadResource method.



| Param | Type | Description |
| --- | --- | --- |
| filepath | <code>any</code> | The filepath value. |

<a name="Lightmap+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |

<a name="LightmapMixer"></a>

### LightmapMixer 
Class representing a lightmap mixer.


**Extends**: <code>ParameterOwner</code>  

* [LightmapMixer ⇐ <code>ParameterOwner</code>](#LightmapMixer)
    * [new LightmapMixer(atlasSize)](#new-LightmapMixer)
    * [width](#width)
    * [height](#height)
    * [isStream() ⇒ <code>any</code>](#isStream)
    * [loadResource(index, resourceName, weight, stream)](#loadResource)
    * [setWeight(index, weight)](#setWeight)
    * [numSubImages() ⇒ <code>any</code>](#numSubImages)
    * [getSubImage(index) ⇒ <code>any</code>](#getSubImage)
    * [getSubImageWeight(index) ⇒ <code>any</code>](#getSubImageWeight)
    * [fromJSON(j)](#fromJSON)

<a name="new_LightmapMixer_new"></a>

### new LightmapMixer
Create a lightmap mixer


| Param | Type | Description |
| --- | --- | --- |
| atlasSize | <code>any</code> | The atlasSize value. |

<a name="LightmapMixer+width"></a>

### width
Getter for width.


<a name="LightmapMixer+height"></a>

### height
Getter for height.


<a name="LightmapMixer+isStream"></a>

### isStream
The isStream method.


**Returns**: <code>any</code> - - The return value.  
<a name="LightmapMixer+loadResource"></a>

### loadResource
The loadResource method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> |  | The index value. |
| resourceName | <code>string</code> |  | The resourceName value. |
| weight | <code>any</code> |  | The weight value. |
| stream | <code>boolean</code> | <code>false</code> | The stream value. |

<a name="LightmapMixer+setWeight"></a>

### setWeight
The setWeight method.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| weight | <code>any</code> | The weight value. |

<a name="LightmapMixer+numSubImages"></a>

### numSubImages
The numSubImages method.


**Returns**: <code>any</code> - - The return value.  
<a name="LightmapMixer+getSubImage"></a>

### getSubImage
The getSubImage method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="LightmapMixer+getSubImageWeight"></a>

### getSubImageWeight
The getSubImageWeight method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>value</code> | The index value. |

<a name="LightmapMixer+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |

