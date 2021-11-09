<a name="KinematicGroup"></a>

### KinematicGroup 
The KinematicGroup is used to control the transform of a collection of objects int eh scene.
Objects can be added to a kinematic group and then the group can be transformed, causing each
of the members to be transformed as one.

*Parameters**
**InitialXfoMode([`MultiChoiceParameter`](api/SceneTree\Parameters\MultiChoiceParameter.md)):** _todo_
**GroupTransform([`XfoParameter`](api/SceneTree\Parameters\XfoParameter.md)):** _todo_


**Extends**: <code>[BaseGroup](api/SceneTree\Groups\BaseGroup.md)</code>  

* [KinematicGroup ⇐ <code>BaseGroup</code>](#KinematicGroup)
    * [new KinematicGroup(name)](#new-KinematicGroup)
    * _instance_
        * [setSelected(sel)](#setSelected)
        * [addItem(item, emit)](#addItem)
        * [removeItem(item, emit)](#removeItem)
        * [setItems(items)](#setItems)
        * [clearItems(emit)](#clearItems)
        * [clone(context)](#clone)
    * _static_
        * [INITIAL_XFO_MODES](#INITIAL_XFO_MODES)

<a name="new_KinematicGroup_new"></a>

### new KinematicGroup
Creates an instance of a group.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the group. |

<a name="KinematicGroup+setSelected"></a>

### setSelected
Changes selection's state of the group with all items it owns.



| Param | Type | Description |
| --- | --- | --- |
| sel | <code>boolean</code> | Boolean indicating the new selection state. |

<a name="KinematicGroup+addItem"></a>

### addItem
Adds an item to the group(See `Items` parameter).



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>[BaseItem](api/SceneTree\BaseItem.md)</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="KinematicGroup+removeItem"></a>

### removeItem
Removes an item from the group(See `Items` parameter).



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | <code>[BaseItem](api/SceneTree\BaseItem.md)</code> |  | The item value. |
| emit | <code>boolean</code> | <code>true</code> | The emit value. |

<a name="KinematicGroup+setItems"></a>

### setItems
Sets an entire new array of items to the BaseGroup replacing any previous items.



| Param | Type | Description |
| --- | --- | --- |
| items | <code>array</code> | List of `BaseItem` you want to add to the group |

<a name="KinematicGroup+clearItems"></a>

### clearItems
Removes all items from the group.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| emit | <code>boolean</code> | <code>true</code> | `true` triggers `valueChanged` event. |

<a name="KinematicGroup+clone"></a>

### clone
The clone method constructs a new group,
copies its values and returns it.


**Returns**: [<code>KinematicGroup</code>](#KinematicGroup) - - Returns a new cloned group.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="KinematicGroup.INITIAL_XFO_MODES"></a>

### INITIAL
Returns enum of available xfo modes.

| Name | Default |
| --- | --- |
| manual | <code>0</code> |
| first | <code>1</code> |
| average | <code>2</code> |
| globalOri | <code>3</code> |




### [Class Tests](api/SceneTree\Groups/KinematicGroup.test)