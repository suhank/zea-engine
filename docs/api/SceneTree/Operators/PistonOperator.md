### Classes

<dl>
<dt><a href="#PistonParameter">PistonParameter</a> ⇐ <code>StructParameter</code></dt>
<dd><p>Class representing a piston parameter.</p>
</dd>
<dt><a href="#PistonOperator">PistonOperator</a> ⇐ <code>Operator</code></dt>
<dd><p>Class representing a piston operator.</p>
</dd>
</dl>

<a name="PistonParameter"></a>

### PistonParameter 
Class representing a piston parameter.


**Extends**: <code>StructParameter</code>  

* [PistonParameter ⇐ <code>StructParameter</code>](#PistonParameter)
    * [new PistonParameter(name)](#new-PistonParameter)
    * [getRodOutput() ⇒ <code>any</code>](#getRodOutput)
    * [getCapOutput() ⇒ <code>any</code>](#getCapOutput)
    * [setCrankXfo(baseCrankXfo)](#setCrankXfo)
    * [init()](#init)
    * [evaluate(quat, crankAxis, revolutions)](#evaluate)
    * [setOwner(owner)](#setOwner)
    * [getOwner() ⇒ <code>any</code>](#getOwner)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [clone(flags)](#clone)

<a name="new_PistonParameter_new"></a>

### new PistonParameter
Create a piston parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="PistonParameter+getRodOutput"></a>

### getRodOutput
The getRodOutput method.


**Returns**: <code>any</code> - - The return value.  
<a name="PistonParameter+getCapOutput"></a>

### getCapOutput
The getCapOutput method.


**Returns**: <code>any</code> - - The return value.  
<a name="PistonParameter+setCrankXfo"></a>

### setCrankXfo
The setCrankXfo method.



| Param | Type | Description |
| --- | --- | --- |
| baseCrankXfo | <code>Xfo</code> | The baseCrankXfo value. |

<a name="PistonParameter+init"></a>

### init
The init method.


<a name="PistonParameter+evaluate"></a>

### evaluate
The evaluate method.



| Param | Type | Description |
| --- | --- | --- |
| quat | <code>Quat</code> | The quat value. |
| crankAxis | <code>any</code> | The crankAxis value. |
| revolutions | <code>any</code> | The revolutions value. |

<a name="PistonParameter+setOwner"></a>

### setOwner
The setOwner method.



| Param | Type | Description |
| --- | --- | --- |
| owner | <code>any</code> | The owner value. |

<a name="PistonParameter+getOwner"></a>

### getOwner
The getOwner method.


**Returns**: <code>any</code> - - The return value.  
<a name="PistonParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="PistonParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="PistonParameter+clone"></a>

### clone
The clone method constructs a new pistom parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>PistonParameter</code>](#PistonParameter) - - Returns a new cloned piston parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="PistonOperator"></a>

### PistonOperator 
Class representing a piston operator.


**Extends**: <code>Operator</code>  

* [PistonOperator ⇐ <code>Operator</code>](#PistonOperator)
    * [new PistonOperator(name)](#new-PistonOperator)
    * [setOwner(ownerItem)](#setOwner)
    * [getCrankOutput() ⇒ <code>any</code>](#getCrankOutput)
    * [init()](#init)
    * [evaluate()](#evaluate)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [destroy()](#destroy)

<a name="new_PistonOperator_new"></a>

### new PistonOperator
Create a piston operator.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="PistonOperator+setOwner"></a>

### setOwner
The setOwner method.



| Param | Type | Description |
| --- | --- | --- |
| ownerItem | <code>any</code> | The ownerItem value. |

<a name="PistonOperator+getCrankOutput"></a>

### getCrankOutput
The getCrankOutput method.


**Returns**: <code>any</code> - - The return value.  
<a name="PistonOperator+init"></a>

### init
The init method.


<a name="PistonOperator+evaluate"></a>

### evaluate
The evaluate method.


<a name="PistonOperator+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="PistonOperator+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="PistonOperator+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.


