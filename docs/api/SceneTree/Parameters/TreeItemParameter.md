<a name="TreeItemParameter"></a>

### TreeItemParameter 
Represents a specific type of parameter, that only stores `TreeItem` values.

i.e.:
```javascript
const treeItem = new TreeItem('tree1')
const treeItemParam = new TreeItemParameter('MyTreeItem', treeItem)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(treeItemParam)
```

**Events**
* **treeItemGlobalXfoChanged:** Triggered when computed world Xfo of parameter's `TreeItem` changes.
* **valueChanged:** Triggered when parameter's value changes.


**Extends**: <code>[Parameter](api/SceneTree/Parameters/Parameter.md)</code>  

* [TreeItemParameter ⇐ <code>Parameter</code>](#TreeItemParameter)
    * [new TreeItemParameter(name, filterFn)](#new-TreeItemParameter)
    * [setOwner(owner)](#setOwner)
    * [getOwner() ⇒ <code>TreeItem</code>](#getOwner)
    * [setFilterFn(flterFn)](#setFilterFn)
    * [getFilterFn() ⇒ <code>function</code>](#getFilterFn)
    * [setValue(treeItem) ⇒ <code>boolean</code>](#setValue)
    * [toJSON(context) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context)](#fromJSON)
    * [clone()](#clone)
    * [destroy()](#destroy)

<a name="new_TreeItemParameter_new"></a>

### new TreeItemParameter
Create a tree item parameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the tree item parameter. |
| filterFn | <code>function</code> | The filterFn value. |

<a name="TreeItemParameter+setOwner"></a>

### setOwner
Sets parameter value's owner `TreeItem`.



| Param | Type | Description |
| --- | --- | --- |
| owner | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | The owner value. |

<a name="TreeItemParameter+getOwner"></a>

### getOwner
Returns parameter value's owner `TreeItem`.


**Returns**: <code>[TreeItem](api/SceneTree/TreeItem.md)</code> - - The return value.  
<a name="TreeItemParameter+setFilterFn"></a>

### setFilterFn
The setFilterFn method.



| Param | Type | Description |
| --- | --- | --- |
| flterFn | <code>function</code> | The flterFn value. |

<a name="TreeItemParameter+getFilterFn"></a>

### getFilterFn
The getFilterFn method.


**Returns**: <code>function</code> - - The return value.  
<a name="TreeItemParameter+setValue"></a>

### setValue
Sets parameter's `TreeItem` value.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | The treeItem value |

<a name="TreeItemParameter+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistence.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |

<a name="TreeItemParameter+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |

<a name="TreeItemParameter+clone"></a>

### clone
The clone method constructs a new tree item parameter, copies its values
from this parameter and returns it.


**Returns**: [<code>TreeItemParameter</code>](#TreeItemParameter) - - Returns a new tree item parameter.  
<a name="TreeItemParameter+destroy"></a>

### destroy
The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.




### [Class Tests](api/SceneTree/Parameters/TreeItemParameter.test)