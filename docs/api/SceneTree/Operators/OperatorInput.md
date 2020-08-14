<a name="OperatorInput"></a>

### OperatorInput
Class representing an operator input.



* [OperatorInput](#OperatorInput)
    * [new OperatorInput(name)](#new-OperatorInput)
    * [getName() ⇒ <code>any</code>](#getName)
    * [setOperator(op)](#setOperator)
    * [getOperator() ⇒ <code>Operator</code>](#getOperator)
    * [isConnected() ⇒ <code>boolean</code>](#isConnected)
    * [getParam() ⇒ <code>any</code>](#getParam)
    * [setParam(param)](#setParam)
    * [getValue() ⇒ <code>any</code>](#getValue)
    * [setValue(value)](#setValue)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [detach()](#detach)
    * [reattach()](#reattach)

<a name="new_OperatorInput_new"></a>

### new OperatorInput
Create an operator input.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="OperatorInput+getName"></a>

### getName
The getName method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorInput+setOperator"></a>

### setOperator
Sets operator that owns this input. Called by the operator when adding inputs



| Param | Type | Description |
| --- | --- | --- |
| op | <code>Operator</code> | The operator object. |

<a name="OperatorInput+getOperator"></a>

### getOperator
Returns operator that owns this input.


**Returns**: <code>Operator</code> - - The operator object.  
<a name="OperatorInput+isConnected"></a>

### isConnected
Returns true if this input is connected to a parameter.


**Returns**: <code>boolean</code> - - The return value.  
<a name="OperatorInput+getParam"></a>

### getParam
The getParam method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorInput+setParam"></a>

### setParam
Assigns the Paramter to be used to provide the input value.



| Param | Type | Description |
| --- | --- | --- |
| param | <code>Parameter</code> | The param value. |

<a name="OperatorInput+getValue"></a>

### getValue
The getValue method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorInput+setValue"></a>

### setValue
The setValue method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="OperatorInput+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="OperatorInput+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="OperatorInput+detach"></a>

### detach
The detach method is called when an operator is being removed from the scene tree.
It removes all connections to parameters in the scene.


<a name="OperatorInput+reattach"></a>

### reattach
The reattach method can be called when re-instating an operator in the scene.


