<a name="CuttingPlaneOperator"></a>

### CuttingPlaneOperator 
An operator that calculates the delta transform of the group since items were bound to it.


**Extends**: <code>[Operator](api/SceneTree\Operators\Operator.md)</code>  

* [CuttingPlaneOperator ⇐ <code>Operator</code>](#CuttingPlaneOperator)
    * [new CuttingPlaneOperator(groupGlobalXfoParam, cuttingPlaneParam)](#new-CuttingPlaneOperator)
    * [evaluate()](#evaluate)

<a name="new_CuttingPlaneOperator_new"></a>

### new CuttingPlaneOperator
Create a GroupMemberXfoOperator operator.


| Param | Type | Description |
| --- | --- | --- |
| groupGlobalXfoParam | <code>[Parameter](api/SceneTree\Parameters\Parameter.md)</code> | The GlobalXfo param found on the Group. |
| cuttingPlaneParam | <code>[Parameter](api/SceneTree\Parameters\Parameter.md)</code> | The parameter on the Group which defines the displacement to apply to the members. |

<a name="CuttingPlaneOperator+evaluate"></a>

### evaluate
The evaluate method.


