<a name="MultiChoiceParameter"></a>

### MultiChoiceParameter 
Represents a specific type of parameter, that stores multiple choice(array) values.

i.e.:
```javascript
const multiChoiceParameter =  new MultiChoiceParameter('InitialXfoMode', GROUP_INITIAL_XFO_MODES.average, [
                                 'manual',
                                 'first',
                                 'average',
                                 'global',
                               ])
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(multiChoiceParameter)
```


**Extends**: <code>[NumberParameter](api/SceneTree\Parameters\NumberParameter.md)</code>  

* [MultiChoiceParameter ⇐ <code>NumberParameter</code>](#MultiChoiceParameter)
    * [new MultiChoiceParameter(name, index, choices)](#new-MultiChoiceParameter)
    * [getChoices() ⇒ <code>array</code>](#getChoices)
    * [setValue(value)](#setValue)

<a name="new_MultiChoiceParameter_new"></a>

### new MultiChoiceParameter
Create a multi choice parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the multi choice parameter. |
| index | <code>number</code> | The index value. |
| choices | <code>array</code> | The choices value. |

<a name="MultiChoiceParameter+getChoices"></a>

### getChoices
Returns choices array.


**Returns**: <code>array</code> - - The return value.  
<a name="MultiChoiceParameter+setValue"></a>

### setValue
Sets parameter index value.



| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> \| <code>number</code> | The value param. |



### [Class Tests](api/SceneTree\Parameters/MultiChoiceParameter.test)