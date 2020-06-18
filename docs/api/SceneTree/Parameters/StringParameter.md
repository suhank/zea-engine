<a name="StringParameter"></a>

### StringParameter 
Class representing a string parameter.

**Kind**: global class  
**Extends**: <code>Parameter</code>  

* [StringParameter ⇐ <code>Parameter</code>](#StringParameter)
    * [new StringParameter(name, value)](#new-StringParameter)
    * [setMultiLine(multiLine)](#setMultiLine)
    * [getMultiLine() ⇒ <code>any</code>](#getMultiLine)
    * [readBinary(reader, context)](#readBinary)
    * [clone(flags)](#clone)

<a name="new_StringParameter_new"></a>

### new StringParameter
Create a string parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the material color parameter. |
| value | <code>any</code> | The value of the parameter. |

<a name="StringParameter+setMultiLine"></a>

### setMultiLine
The setMultiLine method.

**Kind**: instance method of [<code>StringParameter</code>](#StringParameter)  

| Param | Type | Description |
| --- | --- | --- |
| multiLine | <code>any</code> | The multiLine value. |

<a name="StringParameter+getMultiLine"></a>

### getMultiLine
The getMultiLine method.

**Kind**: instance method of [<code>StringParameter</code>](#StringParameter)  
**Returns**: <code>any</code> - - The return value.  
<a name="StringParameter+readBinary"></a>

### readBinary
The readBinary method.

**Kind**: instance method of [<code>StringParameter</code>](#StringParameter)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
| context | <code>object</code> | The context value. |

<a name="StringParameter+clone"></a>

### clone
The clone method constructs a new string parameter, copies its values
from this parameter and returns it.

**Kind**: instance method of [<code>StringParameter</code>](#StringParameter)  
**Returns**: [<code>StringParameter</code>](#StringParameter) - - Returns a new string parameter.  

| Param | Type | Description |
| --- | --- | --- |
| flags | <code>number</code> | The flags value. |

