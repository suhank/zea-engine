<a name="ImageParameter"></a>

### ImageParameter 
Represents a specific type of parameter, that only stores `BaseImage` values.

i.e.:
```javascript
// Since `Label` is a `BaseImage` implementation, it helps us with the example.
const label = new Label('My awesome label', 'LabelPack')
const imageParam = new ImageParameter('MyImage', label)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(imageParam)
```


**Extends**: <code>Parameter</code>  

* [ImageParameter ⇐ <code>Parameter</code>](#ImageParameter)
    * [new ImageParameter(name, value)](#new-ImageParameter)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags) ⇒ <code>object</code>](#fromJSON)
    * [clone(flags)](#clone)

<a name="new_ImageParameter_new"></a>

### new ImageParameter
Create an image parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the image parameter. |
| value | <code>BaseImage</code> | The value of the parameter. |

<a name="ImageParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ImageParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="ImageParameter+clone"></a>

### clone
The clone method constructs a new image parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>ImageParameter</code>](#ImageParameter) - - Returns a new cloned image parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

