<a name="HDRImageMixer"></a>

### HDRImageMixer 
Class representing an HDR (high dynamic range) image mixer.

**Kind**: global class  
**Extends**: <code>BaseImage</code>  

* [HDRImageMixer ⇐ <code>BaseImage</code>](#HDRImageMixer)
    * [new HDRImageMixer(name, stream)](#new-HDRImageMixer)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [isStream() ⇒ <code>any</code>](#isStream)
    * [setURLs(urls)](#setURLs)
    * [setURL(index, url)](#setURL)
    * [setWeights(weights)](#setWeights)
    * [setWeight(index, weight)](#setWeight)
    * [getParams() ⇒ <code>any</code>](#getParams)
    * [toJSON(context, flags)](#toJSON)
    * [fromJSON(json, context, flags)](#fromJSON)

<a name="new_HDRImageMixer_new"></a>

### new HDRImageMixer
Create an HDR image mixer.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | The name value. |
| stream | <code>boolean</code> | <code>true</code> | The stream value. |

<a name="HDRImageMixer+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  
**Returns**: <code>any</code> - - The return value.  
<a name="HDRImageMixer+isStream"></a>

### isStream
The isStream method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  
**Returns**: <code>any</code> - - The return value.  
<a name="HDRImageMixer+setURLs"></a>

### setURLs
The setURLs method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  

| Param | Type | Description |
| --- | --- | --- |
| urls | <code>any</code> | The urls value. |

<a name="HDRImageMixer+setURL"></a>

### setURL
The setURL method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| url | <code>any</code> | The url value. |

<a name="HDRImageMixer+setWeights"></a>

### setWeights
The setWeights method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  

| Param | Type | Description |
| --- | --- | --- |
| weights | <code>any</code> | The weights value. |

<a name="HDRImageMixer+setWeight"></a>

### setWeight
The setWeights method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |
| weight | <code>any</code> | The weight value. |

<a name="HDRImageMixer+getParams"></a>

### getParams
The getParams method.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  
**Returns**: <code>any</code> - - The return value.  
<a name="HDRImageMixer+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="HDRImageMixer+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>HDRImageMixer</code>](#HDRImageMixer)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

