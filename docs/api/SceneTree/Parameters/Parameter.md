<a name="Parameter"></a>

### Parameter
Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.

**Events**
* **nameChanged:** Triggered when the name of the parameter changes.
* **valueChanged:** Triggered when the value of the parameter changes.



* [Parameter](#Parameter)
    * [new Parameter(name, value, dataType)](#new-Parameter)
    * [clone()](#clone)
    * [getName() ⇒ <code>string</code>](#getName)
    * [setName(name)](#setName)
    * [getOwner() ⇒ <code>ParameterOwner</code>](#getOwner)
    * [setOwner(ownerItem)](#setOwner)
    * [getPath() ⇒ <code>array</code>](#getPath)
    * [getDataType() ⇒ <code>string</code>](#getDataType)
    * [bindOperatorOutput(operatorOutput, index) ⇒ <code>number</code>](#bindOperatorOutput)
    * [unbindOperator(operatorOutput) ⇒ <code>boolean</code>](#unbindOperator)
    * [setDirty(index) ⇒ <code>boolean</code>](#setDirty)
    * [isDirty() ⇒ <code>boolean</code>](#isDirty)
    * [getDirtyBindingIndex() ⇒ <code>number</code>](#getDirtyBindingIndex)
    * [setCleanFromOp(value, index)](#setCleanFromOp)
    * [getValueFromOp(index) ⇒ <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code>](#getValueFromOp)
    * [_clean(index)](#_clean)
    * [getValue(mode) ⇒ <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code>](#getValue)
    * [setValue(value, mode)](#setValue)
    * [loadValue(value)](#loadValue)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [clone()](#clone)

<a name="new_Parameter_new"></a>

### new Parameter
When initializing a new parameter, the passed in value could be anything.
If it is a new type of value, just ensure you register it in the `Registry`.

How to use it:

```javascript
 // Creating a parameter object
 const param = new Parameter('Title', 'Awesome Parameter Value', 'String')

  // Capturing events
 param.on('valueChanged', (...params) => console.log('Value changed!'))

 // Changing parameter's value will cause `valueChanged` event to trigger.
 param.setValue('A New Awesome Parameter Value')
 // As result the console log code will execute: Value Changed!
```


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the parameter. |
| value | <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> | The value of the parameter. |
| dataType | <code>string</code> | The data type of the parameter. |

<a name="Parameter+clone"></a>

### clone
Copies and returns the exact clone of current parameter


**Returns**: [<code>Parameter</code>](#Parameter) - - Clone of current parameter  
<a name="Parameter+getName"></a>

### getName
Returns specified name of the parameter.


**Returns**: <code>string</code> - - Returns the name.  
<a name="Parameter+setName"></a>

### setName
Sets the name of the current parameter.


**Returns**: [<code>Parameter</code>](#Parameter) - - The instance itself.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The base parameter name. |

<a name="Parameter+getOwner"></a>

### getOwner
Returns the owner item of the current parameter.


**Returns**: <code>[ParameterOwner](api/SceneTree/ParameterOwner.md)</code> - - The return value.  
<a name="Parameter+setOwner"></a>

### setOwner
Sets the owner item of the current parameter.



| Param | Type | Description |
| --- | --- | --- |
| ownerItem | <code>[ParameterOwner](api/SceneTree/ParameterOwner.md)</code> | The ownerItem value. |

<a name="Parameter+getPath"></a>

### getPath
Returns the parameter's path as an array of strings.
Includes owner's path in case it is owned by a `ParameterOwner`.


**Returns**: <code>array</code> - - The return value.  
<a name="Parameter+getDataType"></a>

### getDataType
Returns parameter's data type.


**Returns**: <code>string</code> - - The return value.  
<a name="Parameter+bindOperatorOutput"></a>

### bindOperatorOutput
Binds an OperatorOutput to this parameter.


**Returns**: <code>number</code> - - The index of the bound output.  

| Param | Type | Description |
| --- | --- | --- |
| operatorOutput | <code>[OperatorOutput](api/SceneTree/Operators/OperatorOutput.md)</code> | The output that we are unbinding from the Parameter |
| index | <code>number</code> | The index(optional) that the output is being bound at. |

<a name="Parameter+unbindOperator"></a>

### unbindOperator
The unbindOperator method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| operatorOutput | <code>[OperatorOutput](api/SceneTree/Operators/OperatorOutput.md)</code> | The output that we are unbinding from the Parameter |

<a name="Parameter+setDirty"></a>

### setDirty
Dirties this Parameter so subsequent calls to `getValue` will cause an evaluation of its bound operators.


**Returns**: <code>boolean</code> - - `true` if the Parameter was made dirty, else `false` if it was already dirty.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index of the operator |

<a name="Parameter+isDirty"></a>

### isDirty
Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.


**Returns**: <code>boolean</code> - - Returns a boolean.  
<a name="Parameter+getDirtyBindingIndex"></a>

### getDirtyBindingIndex
Returns the index of the first 'dirty' binding in the stack. This will be the index of the
first operator that will evaluate when the parameter needs to be cleaned.


**Returns**: <code>number</code> - - The index of the dirty binding in the binding stack.  
<a name="Parameter+setCleanFromOp"></a>

### setCleanFromOp
The setCleanFromOp method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The computed value to be stored in the Parameter. |
| index | <code>number</code> | The index of the bound OperatorOutput. |

<a name="Parameter+getValueFromOp"></a>

### getValueFromOp
During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.


**Returns**: <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the bound OperatorOutput to evaluate up to. |

<a name="Parameter+_clean"></a>

### parameter
Cleans the parameter up tp the index of the specified index of the bound OperatorOutput



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the bound OperatorOutput to evaluate up to. |

<a name="Parameter+getValue"></a>

### getValue
Returns parameter's value.


**Returns**: <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>number</code> | The mode value. |

<a name="Parameter+setValue"></a>

### setValue
Sets value of the parameter.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> \| <code>string</code> \| <code>number</code> \| <code>any</code> | The value param. |
| mode | <code>number</code> | This is deprecated now. |

<a name="Parameter+loadValue"></a>

### loadValue
The loadValue is used to change the value of a parameter, without triggering a
valueChanges, or setting the USER_EDITED state.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The context value. |

<a name="Parameter+toJSON"></a>

### toJSON
The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="Parameter+fromJSON"></a>

### fromJSON
The fromJSON method takes a JSON and deserializes into an instance of this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="Parameter+readBinary"></a>

### readBinary
The readBinary method.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="Parameter+clone"></a>

### clone
The clone method constructs a new parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>Parameter</code>](#Parameter) - - Returns a new cloned parameter.  


### [Class Tests](api/SceneTree/Parameters/Parameter.test)