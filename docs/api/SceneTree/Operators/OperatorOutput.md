### Classes

<dl>
<dt><a href="#OperatorOutput">OperatorOutput</a> ⇐ <code>EventEmitter</code></dt>
<dd><p>Class representing an operator output.</p>
</dd>
<dt><a href="#XfoOperatorOutput">XfoOperatorOutput</a> ⇐ <code><a href="#OperatorOutput">OperatorOutput</a></code></dt>
<dd><p>Class representing an Xfo operator output.</p>
</dd>
</dl>

<a name="OperatorOutput"></a>

### OperatorOutput 
Class representing an operator output.


**Extends**: <code>EventEmitter</code>  

* [OperatorOutput ⇐ <code>EventEmitter</code>](#OperatorOutput)
    * [new OperatorOutput(name, filterFn)](#new-OperatorOutput)
    * [getName() ⇒ <code>any</code>](#getName)
    * [getFilterFn() ⇒ <code>any</code>](#getFilterFn)
    * [isConnected() ⇒ <code>boolean</code>](#isConnected)
    * [getParam() ⇒ <code>any</code>](#getParam)
    * [setParam(param)](#setParam)
    * [getValue(mode) ⇒ <code>any</code>](#getValue)
    * [setValue(value, mode)](#setValue)
    * [setClean(value)](#setClean)
    * [setDirty(fn)](#setDirty)
    * [removeCleanerFn(fn)](#removeCleanerFn)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [detach()](#detach)
    * [reattach()](#reattach)

<a name="new_OperatorOutput_new"></a>

### new OperatorOutput
Create an operator output.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| filterFn | <code>any</code> | The filterFn value. |

<a name="OperatorOutput+getName"></a>

### getName
The getName method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+getFilterFn"></a>

### getFilterFn
The getFilterFn method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+isConnected"></a>

### isConnected
The isConnected method.


**Returns**: <code>boolean</code> - - The return value.  
<a name="OperatorOutput+getParam"></a>

### getParam
The getParam method.


**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+setParam"></a>

### setParam
The setParam method.



| Param | Type | Description |
| --- | --- | --- |
| param | <code>any</code> | The param value. |

<a name="OperatorOutput+getValue"></a>

### getValue
The getValue method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>boolean</code> | The mode param. |

<a name="OperatorOutput+setValue"></a>

### setValue
The setValue method.
Note: Sometimes outputs are used in places like statemachines,
where we would want the change to cause an event.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>boolean</code> | The mode value. |

<a name="OperatorOutput+setClean"></a>

### setClean
The setClean method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="OperatorOutput+setDirty"></a>

### setDirty
The setDirty method.



| Param | Type | Description |
| --- | --- | --- |
| fn | <code>any</code> | The fn value. |

<a name="OperatorOutput+removeCleanerFn"></a>

### removeCleanerFn
The removeCleanerFn method.



| Param | Type | Description |
| --- | --- | --- |
| fn | <code>any</code> | The fn value. |

<a name="OperatorOutput+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="OperatorOutput+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="OperatorOutput+detach"></a>

### detach
The detach method.


<a name="OperatorOutput+reattach"></a>

### reattach
The reattach method.


<a name="XfoOperatorOutput"></a>

### XfoOperatorOutput 
Class representing an Xfo operator output.


**Extends**: [<code>OperatorOutput</code>](#OperatorOutput)  

* [XfoOperatorOutput](#XfoOperatorOutput)
    * [new XfoOperatorOutput(name)](#new-XfoOperatorOutput)
    * [getInitialValue() ⇒ <code>any</code>](#getInitialValue)
    * [setParam(param)](#setParam)
    * [getName() ⇒ <code>any</code>](#getName)
    * [getFilterFn() ⇒ <code>any</code>](#getFilterFn)
    * [isConnected() ⇒ <code>boolean</code>](#isConnected)
    * [getParam() ⇒ <code>any</code>](#getParam)
    * [getValue(mode) ⇒ <code>any</code>](#getValue)
    * [setValue(value, mode)](#setValue)
    * [setClean(value)](#setClean)
    * [setDirty(fn)](#setDirty)
    * [removeCleanerFn(fn)](#removeCleanerFn)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [detach()](#detach)
    * [reattach()](#reattach)

<a name="new_XfoOperatorOutput_new"></a>

### new XfoOperatorOutput
Create an Xfo operator output.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |

<a name="XfoOperatorOutput+getInitialValue"></a>

### getInitialValue
The getInitialValue method.


**Returns**: <code>any</code> - - The return value.  
<a name="XfoOperatorOutput+setParam"></a>

### setParam
The setParam method.


**Overrides**: [<code>setParam</code>](#OperatorOutput+setParam)  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>any</code> | The param value. |

<a name="OperatorOutput+getName"></a>

### getName
The getName method.


**Overrides**: [<code>getName</code>](#OperatorOutput+getName)  
**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+getFilterFn"></a>

### getFilterFn
The getFilterFn method.


**Overrides**: [<code>getFilterFn</code>](#OperatorOutput+getFilterFn)  
**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+isConnected"></a>

### isConnected
The isConnected method.


**Overrides**: [<code>isConnected</code>](#OperatorOutput+isConnected)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="OperatorOutput+getParam"></a>

### getParam
The getParam method.


**Overrides**: [<code>getParam</code>](#OperatorOutput+getParam)  
**Returns**: <code>any</code> - - The return value.  
<a name="OperatorOutput+getValue"></a>

### getValue
The getValue method.


**Overrides**: [<code>getValue</code>](#OperatorOutput+getValue)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>boolean</code> | The mode param. |

<a name="OperatorOutput+setValue"></a>

### setValue
The setValue method.
Note: Sometimes outputs are used in places like statemachines,
where we would want the change to cause an event.


**Overrides**: [<code>setValue</code>](#OperatorOutput+setValue)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>boolean</code> | The mode value. |

<a name="OperatorOutput+setClean"></a>

### setClean
The setClean method.


**Overrides**: [<code>setClean</code>](#OperatorOutput+setClean)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="OperatorOutput+setDirty"></a>

### setDirty
The setDirty method.


**Overrides**: [<code>setDirty</code>](#OperatorOutput+setDirty)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>any</code> | The fn value. |

<a name="OperatorOutput+removeCleanerFn"></a>

### removeCleanerFn
The removeCleanerFn method.


**Overrides**: [<code>removeCleanerFn</code>](#OperatorOutput+removeCleanerFn)  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>any</code> | The fn value. |

<a name="OperatorOutput+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Overrides**: [<code>toJSON</code>](#OperatorOutput+toJSON)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="OperatorOutput+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.


**Overrides**: [<code>fromJSON</code>](#OperatorOutput+fromJSON)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="OperatorOutput+detach"></a>

### detach
The detach method.


**Overrides**: [<code>detach</code>](#OperatorOutput+detach)  
<a name="OperatorOutput+reattach"></a>

### reattach
The reattach method.


**Overrides**: [<code>reattach</code>](#OperatorOutput+reattach)  
