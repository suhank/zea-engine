<a name="Operator"></a>

### Operator 
Class representing an operator.


**Extends**: <code>[BaseItem](api/SceneTree\BaseItem.md)</code>  

* [Operator ⇐ <code>BaseItem</code>](#Operator)
    * [new Operator(name)](#new-Operator)
    * [addInput(input) ⇒ <code>array</code>](#addInput)
    * [removeInput(input)](#removeInput)
    * [getNumInputs() ⇒ <code>number</code>](#getNumInputs)
    * [getInputByIndex(index) ⇒ <code>object</code>](#getInputByIndex)
    * [getInput(name) ⇒ <code>OperatorInput</code>](#getInput)
    * [addOutput(output) ⇒ <code>array</code>](#addOutput)
    * [removeOutput(output)](#removeOutput)
    * [getNumOutputs() ⇒ <code>number</code>](#getNumOutputs)
    * [getOutputByIndex(index) ⇒ <code>object</code>](#getOutputByIndex)
    * [getOutput(name) ⇒ <code>OperatorOutput</code>](#getOutput)
    * [evaluate()](#evaluate)
    * [backPropagateValue(value) ⇒ <code>any</code>](#backPropagateValue)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [detach()](#detach)
    * [reattach()](#reattach)
    * [rebind()](#rebind)

<a name="new_Operator_new"></a>

### new Operator
Create an operator.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Operator+addInput"></a>

### addInput
The addInput method.


**Returns**: <code>array</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>[OperatorInput](api/SceneTree\Operators\OperatorInput.md)</code> | The name of the input, or the input object |

<a name="Operator+removeInput"></a>

### removeInput
The removeInput method.



| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>[OperatorInput](api/SceneTree\Operators\OperatorInput.md)</code> | The name of the input, or the input object |

<a name="Operator+getNumInputs"></a>

### getNumInputs
Getter for the number of inputs in this operator.


**Returns**: <code>number</code> - - Returns the number of inputs.  
<a name="Operator+getInputByIndex"></a>

### getInputByIndex
The getInputByIndex method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Operator+getInput"></a>

### getInput
The getInput method.


**Returns**: <code>[OperatorInput](api/SceneTree\Operators\OperatorInput.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Operator+addOutput"></a>

### addOutput
The addOutput method.


**Returns**: <code>array</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| output | <code>string</code> \| <code>[OperatorOutput](api/SceneTree\Operators\OperatorOutput.md)</code> | The name of the output, or the output object |

<a name="Operator+removeOutput"></a>

### removeOutput
The removeOutput method.



| Param | Type | Description |
| --- | --- | --- |
| output | <code>string</code> \| <code>[OperatorOutput](api/SceneTree\Operators\OperatorOutput.md)</code> | The name of the output, or the output object |

<a name="Operator+getNumOutputs"></a>

### getNumOutputs
Getter for the number of outputs in this operator.


**Returns**: <code>number</code> - - Returns the number of outputs.  
<a name="Operator+getOutputByIndex"></a>

### getOutputByIndex
The getOutputByIndex method.


**Returns**: <code>object</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="Operator+getOutput"></a>

### getOutput
The getOutput method.


**Returns**: <code>[OperatorOutput](api/SceneTree\Operators\OperatorOutput.md)</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="Operator+evaluate"></a>

### evaluate
The evaluate method.
Computes the values of each of the outputs based on the values of the inputs
and the values of outputs with mode OP_READ_WRITE.
This method must be implemented by all Operators.


<a name="Operator+backPropagateValue"></a>

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

<a name="Operator+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="Operator+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="Operator+detach"></a>

### detach
The detach method.


<a name="Operator+reattach"></a>

### reattach
The reattach method.


<a name="Operator+rebind"></a>

### rebind
The rebind method.




### [Class Tests](api/SceneTree\Operators/Operator.test)