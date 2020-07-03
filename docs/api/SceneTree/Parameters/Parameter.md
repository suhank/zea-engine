### Classes

<dl>
<dt><a href="#BaseParameter">BaseParameter</a></dt>
<dd><p>Class representing a base parameter.</p>
</dd>
<dt><a href="#Parameter">Parameter</a> ⇐ <code><a href="#BaseParameter">BaseParameter</a></code></dt>
<dd><p>Class representing a parameter.</p>
</dd>
</dl>

<a name="BaseParameter"></a>

### BaseParameter
Class representing a base parameter.



* [BaseParameter](#BaseParameter)
    * [new BaseParameter(name)](#new-BaseParameter)
    * [getName() ⇒ <code>string</code>](#getName)
    * [setName(name)](#setName)
    * [getOwner() ⇒ <code>any</code>](#getOwner)
    * [setOwner(ownerItem)](#setOwner)
    * [getPath() ⇒ <code>any</code>](#getPath)
    * [setFlag(flag)](#setFlag)
    * [clearFlag(flag)](#clearFlag)
    * [testFlag(flag) ⇒ <code>boolean</code>](#testFlag)
    * [getValue()](#getValue)
    * [setValue(value)](#setValue)
    * [setEnabled(state)](#setEnabled)
    * [isEnabled()](#isEnabled)
    * [bindOperator(op)](#bindOperator)
    * [unbindOperator(op) ⇒ <code>boolean</code>](#unbindOperator)
    * [setDirty(cleanerFn) ⇒ <code>boolean</code>](#setDirty)
    * [setDirtyFromOp()](#setDirtyFromOp)
    * [isDirty() ⇒ <code>boolean</code>](#isDirty)
    * [removeCleanerFn(cleanerFn) ⇒ <code>number</code>](#removeCleanerFn)
    * [clone(flags)](#clone)
    * [destroy()](#destroy)

<a name="new_BaseParameter_new"></a>

### new BaseParameter
Create a base parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the base parameter. |

<a name="BaseParameter+getName"></a>

### getName
Getter for the base parameter name.


**Returns**: <code>string</code> - - Returns the name.  
<a name="BaseParameter+setName"></a>

### setName
Setter for the base parameter name.



| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The base parameter name. |

<a name="BaseParameter+getOwner"></a>

### getOwner
Getter for the owner of the parameter.


**Returns**: <code>any</code> - - The return value.  
<a name="BaseParameter+setOwner"></a>

### setOwner
Sets the owner of the parameter.



| Param | Type | Description |
| --- | --- | --- |
| ownerItem | <code>any</code> | The ownerItem value. |

<a name="BaseParameter+getPath"></a>

### getPath
Getter for the parameter path.


**Returns**: <code>any</code> - - The return value.  
<a name="BaseParameter+setFlag"></a>

### setFlag
The setFlag method.



| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag value. |

<a name="BaseParameter+clearFlag"></a>

### clearFlag
The clearFlag method.



| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag value. |

<a name="BaseParameter+testFlag"></a>

### testFlag
Returns true if the flag if set, otherwise returns false.


**Returns**: <code>boolean</code> - - Returns a boolean indicating if the flag is set.  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag to test. |

<a name="BaseParameter+getValue"></a>

### getValue
The getValue method (TODO).


<a name="BaseParameter+setValue"></a>

### setValue
The getValue method (TODO).



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="BaseParameter+setEnabled"></a>

### setEnabled
The setEnabled method.



| Param | Type | Description |
| --- | --- | --- |
| state | <code>any</code> | The state value. |

<a name="BaseParameter+isEnabled"></a>

### isEnabled
The isEnabled method.


<a name="BaseParameter+bindOperator"></a>

### bindOperator
The bindOperator method.



| Param | Type | Description |
| --- | --- | --- |
| op | <code>Operator</code> | The cleanerFn value. |

<a name="BaseParameter+unbindOperator"></a>

### unbindOperator
The unbindOperator method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| op | <code>Operator</code> | The cleanerFn value. |

<a name="BaseParameter+setDirty"></a>

### setDirty
The setDirty method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| cleanerFn | <code>any</code> | The cleanerFn value. |

<a name="BaseParameter+setDirtyFromOp"></a>

### setDirtyFromOp
The setDirtyFromOp method.


<a name="BaseParameter+isDirty"></a>

### isDirty
The isDirty method.


**Returns**: <code>boolean</code> - - Returns a boolean.  
<a name="BaseParameter+removeCleanerFn"></a>

### removeCleanerFn
The removeCleanerFn method.


**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| cleanerFn | <code>any</code> | The cleanerFn value. |

<a name="BaseParameter+clone"></a>

### clone
The clone method.



| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="BaseParameter+destroy"></a>

### destroy
The destroy method.


<a name="Parameter"></a>

### Parameter 
Class representing a parameter.


**Extends**: [<code>BaseParameter</code>](#BaseParameter)  

* [Parameter](#Parameter)
    * [new Parameter(name, value, dataType)](#new-Parameter)
    * [getDataType() ⇒ <code>any</code>](#getDataType)
    * [getValue(mode) ⇒ <code>any</code>](#getValue)
    * [setClean(value)](#setClean)
    * [setValue(value, mode)](#setValue)
    * [setValueDone(value, mode)](#setValueDone)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)
    * [getName() ⇒ <code>string</code>](#getName)
    * [setName(name)](#setName)
    * [getOwner() ⇒ <code>any</code>](#getOwner)
    * [setOwner(ownerItem)](#setOwner)
    * [getPath() ⇒ <code>any</code>](#getPath)
    * [setFlag(flag)](#setFlag)
    * [clearFlag(flag)](#clearFlag)
    * [testFlag(flag) ⇒ <code>boolean</code>](#testFlag)
    * [setEnabled(state)](#setEnabled)
    * [isEnabled()](#isEnabled)
    * [bindOperator(op)](#bindOperator)
    * [unbindOperator(op) ⇒ <code>boolean</code>](#unbindOperator)
    * [setDirty(cleanerFn) ⇒ <code>boolean</code>](#setDirty)
    * [setDirtyFromOp()](#setDirtyFromOp)
    * [isDirty() ⇒ <code>boolean</code>](#isDirty)
    * [removeCleanerFn(cleanerFn) ⇒ <code>number</code>](#removeCleanerFn)
    * [destroy()](#destroy)

<a name="new_Parameter_new"></a>

### new Parameter
Create a parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the parameter. |
| value | <code>any</code> | The value of the parameter. |
| dataType | <code>any</code> | The data type of the parameter. |

<a name="Parameter+getDataType"></a>

### getDataType
The getDataType method.


**Returns**: <code>any</code> - - The return value.  
<a name="Parameter+getValue"></a>

### getValue
The getValue method.


**Overrides**: [<code>getValue</code>](#BaseParameter+getValue)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| mode | <code>number</code> | The mode value. |

<a name="Parameter+setClean"></a>

### setClean
The setClean method.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |

<a name="Parameter+setValue"></a>

### setValue
The getValue method.


**Overrides**: [<code>setValue</code>](#BaseParameter+setValue)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>number</code> | The mode param. |

<a name="Parameter+setValueDone"></a>

### setValueDone
At the end of an interaction session of setting a value.
E.g. moving a slider handle, or typing in some values
this method should be called to notify that that interaction is complete
Code can listed to this event to trigger longer running actions like
saving a file or heavy computation.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>any</code> | The value param. |
| mode | <code>any</code> | The mode param. |

<a name="Parameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Parameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

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


**Overrides**: [<code>clone</code>](#BaseParameter+clone)  
**Returns**: [<code>Parameter</code>](#Parameter) - - Returns a new cloned parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

<a name="BaseParameter+getName"></a>

### getName
Getter for the base parameter name.


**Overrides**: [<code>getName</code>](#BaseParameter+getName)  
**Returns**: <code>string</code> - - Returns the name.  
<a name="BaseParameter+setName"></a>

### setName
Setter for the base parameter name.


**Overrides**: [<code>setName</code>](#BaseParameter+setName)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The base parameter name. |

<a name="BaseParameter+getOwner"></a>

### getOwner
Getter for the owner of the parameter.


**Overrides**: [<code>getOwner</code>](#BaseParameter+getOwner)  
**Returns**: <code>any</code> - - The return value.  
<a name="BaseParameter+setOwner"></a>

### setOwner
Sets the owner of the parameter.


**Overrides**: [<code>setOwner</code>](#BaseParameter+setOwner)  

| Param | Type | Description |
| --- | --- | --- |
| ownerItem | <code>any</code> | The ownerItem value. |

<a name="BaseParameter+getPath"></a>

### getPath
Getter for the parameter path.


**Overrides**: [<code>getPath</code>](#BaseParameter+getPath)  
**Returns**: <code>any</code> - - The return value.  
<a name="BaseParameter+setFlag"></a>

### setFlag
The setFlag method.


**Overrides**: [<code>setFlag</code>](#BaseParameter+setFlag)  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag value. |

<a name="BaseParameter+clearFlag"></a>

### clearFlag
The clearFlag method.


**Overrides**: [<code>clearFlag</code>](#BaseParameter+clearFlag)  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag value. |

<a name="BaseParameter+testFlag"></a>

### testFlag
Returns true if the flag if set, otherwise returns false.


**Overrides**: [<code>testFlag</code>](#BaseParameter+testFlag)  
**Returns**: <code>boolean</code> - - Returns a boolean indicating if the flag is set.  

| Param | Type | Description |
| --- | --- | --- |
| flag | <code>number</code> | The flag to test. |

<a name="BaseParameter+setEnabled"></a>

### setEnabled
The setEnabled method.


**Overrides**: [<code>setEnabled</code>](#BaseParameter+setEnabled)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>any</code> | The state value. |

<a name="BaseParameter+isEnabled"></a>

### isEnabled
The isEnabled method.


**Overrides**: [<code>isEnabled</code>](#BaseParameter+isEnabled)  
<a name="BaseParameter+bindOperator"></a>

### bindOperator
The bindOperator method.


**Overrides**: [<code>bindOperator</code>](#BaseParameter+bindOperator)  

| Param | Type | Description |
| --- | --- | --- |
| op | <code>Operator</code> | The cleanerFn value. |

<a name="BaseParameter+unbindOperator"></a>

### unbindOperator
The unbindOperator method.


**Overrides**: [<code>unbindOperator</code>](#BaseParameter+unbindOperator)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| op | <code>Operator</code> | The cleanerFn value. |

<a name="BaseParameter+setDirty"></a>

### setDirty
The setDirty method.


**Overrides**: [<code>setDirty</code>](#BaseParameter+setDirty)  
**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| cleanerFn | <code>any</code> | The cleanerFn value. |

<a name="BaseParameter+setDirtyFromOp"></a>

### setDirtyFromOp
The setDirtyFromOp method.


**Overrides**: [<code>setDirtyFromOp</code>](#BaseParameter+setDirtyFromOp)  
<a name="BaseParameter+isDirty"></a>

### isDirty
The isDirty method.


**Overrides**: [<code>isDirty</code>](#BaseParameter+isDirty)  
**Returns**: <code>boolean</code> - - Returns a boolean.  
<a name="BaseParameter+removeCleanerFn"></a>

### removeCleanerFn
The removeCleanerFn method.


**Overrides**: [<code>removeCleanerFn</code>](#BaseParameter+removeCleanerFn)  
**Returns**: <code>number</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| cleanerFn | <code>any</code> | The cleanerFn value. |

<a name="BaseParameter+destroy"></a>

### destroy
The destroy method.


**Overrides**: [<code>destroy</code>](#BaseParameter+destroy)  
