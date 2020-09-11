<a name="StructParameter"></a>

### StructParameter 
Represents a specific type of parameter, that stores multiple parameters in object format.

i.e.:
```javascript
const structParam = new StructParameter('MyStructParam')
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(structParam)
```

**Events**
* **valueChanged:** Triggered whenever parameter's value changes.


**Extends**: <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code>  

* [StructParameter ⇐ <code>Parameter</code>](#StructParameter)
    * [new StructParameter(name)](#new-StructParameter)
    * [getMember(name) ⇒ <code>Parameter</code>](#getMember)
    * [getMemberNames() ⇒ <code>array</code>](#getMemberNames)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [destroy()](#destroy)

<a name="new_StructParameter_new"></a>

### new StructParameter
Create a struct parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the struct parameter. |

<a name="StructParameter+getMember"></a>

### getMember
Looks for a member parameter with the specified name and returns it.


**Returns**: <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The parameter name. |

<a name="StructParameter+getMemberNames"></a>

### getMemberNames
Returns the name of all parameters in StructParameter.


**Returns**: <code>array</code> - - The return value.  
<a name="StructParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="StructParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="StructParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


