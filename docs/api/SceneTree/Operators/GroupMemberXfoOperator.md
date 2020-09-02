<a name="GroupTransformXfoOperator"></a>

### GroupTransformXfoOperator 
An operator for aiming items at targets.


**Extends**: <code>[Operator](api/SceneTree/Operators/Operator.md)</code>  

* [GroupTransformXfoOperator ⇐ <code>Operator</code>](#GroupTransformXfoOperator)
    * [new GroupTransformXfoOperator(groupGlobalXfoParam, groupTransformXfoParam)](#new-GroupTransformXfoOperator)
    * [setBindXfo(bindXfo)](#setBindXfo)
    * [evaluate()](#evaluate)

<a name="new_GroupTransformXfoOperator_new"></a>

### new GroupTransformXfoOperator
Create a GroupMemberXfoOperator operator.


| Param | Type | Description |
| --- | --- | --- |
| groupGlobalXfoParam | <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code> | The GlobalXfo param found on the Group. |
| groupTransformXfoParam | <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code> | The parameter on the Group which defines the displacement to apply to the members. |

<a name="GroupTransformXfoOperator+setBindXfo"></a>

### setBindXfo
Create a GroupMemberXfoOperator operator.



| Param | Type | Description |
| --- | --- | --- |
| bindXfo | <code>[Xfo](api/Math/Xfo.md)</code> | The Bind Xfo calculated from the initial Transforms of the Group Members. |

<a name="GroupTransformXfoOperator+evaluate"></a>

### evaluate
The evaluate method.


