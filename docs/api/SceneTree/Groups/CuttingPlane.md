<a name="CuttingPlane"></a>

### CuttingPlane 
Groups are a special type of `BaseGroup` that allows you to gather/classify/organize/modify
multiple items contained within the group. Items can be added to the group directly, or using
its path.
All parameters set to the group are also set to the children; in other words, it's a faster way
to apply common things to multiple items.

**Parameters**
* **CutAwayEnabled([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** _todo_
* **CutPlaneNormal([`Vec3Parameter`](api/SceneTree/Parameters/Vec3Parameter.md)):** _todo_
* **CutPlaneDist([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** _todo_


**Extends**: <code>[BaseGroup](api/SceneTree/Groups/BaseGroup.md)</code>  

* [CuttingPlane ⇐ <code>BaseGroup</code>](#CuttingPlane)
    * [new CuttingPlane(name)](#new-CuttingPlane)
    * [clone(context)](#clone)

<a name="new_CuttingPlane_new"></a>

### new CuttingPlane
Creates an instance of a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="CuttingPlane+clone"></a>

### clone
The clone method constructs a new group,
copies its values and returns it.


**Returns**: [<code>CuttingPlane</code>](#CuttingPlane) - - Returns a new cloned group.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

