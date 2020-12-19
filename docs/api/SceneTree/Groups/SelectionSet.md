<a name="SelectionSet"></a>

### SelectionSet 
**Parameters**
* **Highlighted([`BooleanParameter`](api/SceneTree\Parameters\BooleanParameter.md)):** _todo_
* **HighlightColor([`ColorParameter`](api/SceneTree\Parameters\ColorParameter.md)):** _todo_
* **HighlightFill([`NumberParameter`](api/SceneTree\Parameters\NumberParameter.md)):** _todo_


**Extends**: <code>[BaseGroup](api/SceneTree\Groups\BaseGroup.md)</code>  

* [SelectionSet ⇐ <code>BaseGroup</code>](#SelectionSet)
    * [new SelectionSet(name)](#new-SelectionSet)
    * [setSelected(sel)](#setSelected)
    * [clone(context)](#clone)

<a name="new_SelectionSet_new"></a>

### new SelectionSet
Creates an instance of a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="SelectionSet+setSelected"></a>

### setSelected
Changes selection's state of the group with all items it owns.



| Param | Type | Description |
| --- | --- | --- |
| sel | <code>boolean</code> | Boolean indicating the new selection state. |

<a name="SelectionSet+clone"></a>

### clone
The clone method constructs a new group,
copies its values and returns it.


**Returns**: [<code>SelectionSet</code>](#SelectionSet) - - Returns a new cloned group.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |



### [Class Tests](api/SceneTree\Groups/SelectionSet.test)