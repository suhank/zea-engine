<a name="OperatorOutput"></a>

### OperatorOutput
Class representing an operator output.



* [OperatorOutput](#OperatorOutput)
    * [new OperatorOutput(name, operatorOutputMode)](#new-OperatorOutput)
    * [getName() ⇒ <code>string</code>](#getName)
    * [setOperator(op)](#setOperator)
    * [getOperator() ⇒ <code>Operator</code>](#getOperator)
    * [getMode() ⇒ <code>OperatorOutputMode</code>](#getMode)
    * [isConnected() ⇒ <code>boolean</code>](#isConnected)
    * [getParam() ⇒ <code>any</code>](#getParam)
    * [setParam(param)](#setParam)
    * [getParamBindIndex() ⇒ <code>number</code>](#getParamBindIndex)
    * [setParamBindIndex(index)](#setParamBindIndex)
    * [setDirty()](#setDirty)
    * [getValue() ⇒ <code>any</code>](#getValue)
    * [backPropagateValue(value) ⇒ <code>any</code>](#backPropagateValue)
    * [setClean(value)](#setClean)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [detach()](#detach)
    * [reattach()](#reattach)
    * [rebind()](#rebind)

<a name="new_OperatorOutput_new"></a>

### new OperatorOutput
Create an operator output.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| operatorOutputMode | <code>OperatorOutputMode</code> | The mode which the OperatorOutput uses to bind to its target parameter. |

<a name="OperatorOutput+getName"></a>

### getName
Returns name of the output.


**Returns**: <code>string</code> - - The name string.  
<a name="OperatorOutput+setOperator"></a>

### setOperator
Sets operator that owns this output. Called by the operator when adding outputs



| Param | Type | Description |
| --- | --- | --- |
| op | <code>[Operator](api/SceneTree/Operators/Operator.md)</code> | The operator object. |

<a name="OperatorOutput+getOperator"></a>

### getOperator
Returns operator that owns this output.


**Returns**: <code>[Operator](api/SceneTree/Operators/Operator.md)</code> - - The operator object.  
<a name="OperatorOutput+getMode"></a>

### getMode
Returns mode that the output writes to be parameter. Must be a number from OperatorOutputMode


**Returns**: <code>OperatorOutputMode</code> - - The mode value.  
<a name="OperatorOutput+isConnected"></a>

### isConnected
Returns true if this output is connected to a parameter.


**Returns**: <code>boolean</code> - - The return value.  
<a name="OperatorOutput+getParam"></a>

### getParam
The getParam method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+setParam"></a>

### setParam
Sets the Parameter for this out put to write to.



| Param | Type | Description |
| --- | --- | --- |
| param | <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code> | The param value. |

<a name="OperatorOutput+getParamBindIndex"></a>

### getParamBindIndex
Returns the index of the binding on the parameter of this OperatorOutput
up to date.


**Returns**: <code>number</code> - index - The index of the binding on the parameter.  
<a name="OperatorOutput+setParamBindIndex"></a>

### setParamBindIndex
If bindings change on a Parameter, it will call this method to ensure the output index is
up to date.



| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index of the binding on the parameter. |

<a name="OperatorOutput+setDirty"></a>

### setDirty
Propagates dirty to the connected parameter.


<a name="OperatorOutput+getValue"></a>

### getValue
The getValue method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+backPropagateValue"></a>

### backPropagateValue
When the value on a Parameter is modified by a user by calling 'setValue,
then if any operators are bound, the value of the Parameter cannot be modified
directly as it is the result of a computation. Instead, the Parameter calls
'backPropagateValue' on the Operator to cause the Operator to handle propagating
the value to one or more of its inputs.
to its inputs.


**Returns**: <code>any</code> - - The modified value.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="OperatorOutput+setClean"></a>

### setClean
The setClean method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="OperatorOutput+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="OperatorOutput+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="OperatorOutput+detach"></a>

### detach
The detach method is called when an operator is being removed from the scene tree.
It removes all connections to parameters in the scene.


<a name="OperatorOutput+reattach"></a>

### reattach
The reattach method can be called when re-instating an operator in the scene.


<a name="OperatorOutput+rebind"></a>

### rebind
The rebind rebinds the outputs to be at the top of the stack for its parameter.


