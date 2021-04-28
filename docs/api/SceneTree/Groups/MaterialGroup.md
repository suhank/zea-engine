<a name="MaterialGroup"></a>

### MaterialGroup 
**Parameters**
* **Material([`MaterialParameter`](api/SceneTree/Parameters/MaterialParameter.md)):** _todo_


**Extends**: <code>[BaseGroup](api/SceneTree/Groups/BaseGroup.md)</code>  

* [MaterialGroup ⇐ <code>BaseGroup</code>](#MaterialGroup)
    * [new MaterialGroup(name)](#new-MaterialGroup)
    * [setSelected(sel)](#setSelected)
    * [clone(context)](#clone)

<a name="new_MaterialGroup_new"></a>

### new MaterialGroup
Creates an instance of a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="MaterialGroup+setSelected"></a>

### setSelected
Changes selection's state of the group with all items it owns.



| Param | Type | Description |
| --- | --- | --- |
| sel | <code>boolean</code> | Boolean indicating the new selection state. |

<a name="MaterialGroup+clone"></a>

### clone
The clone method constructs a new group,
copies its values and returns it.


**Returns**: [<code>MaterialGroup</code>](#MaterialGroup) - - Returns a new cloned group.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |



### [Class Tests](api/SceneTree/Groups/MaterialGroup.test)