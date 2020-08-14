<a name="BoundingBoxParameter"></a>

### BoundingBoxParameter 
Represents a specific type of parameter, that only stores `Box3` values.

i.e.:
```javascript
const boundingBox = new BoundingBoxParameter('MyBBox', new TreeItem())
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(boundingBox)
```


**Extends**: <code>Parameter</code>  

* [BoundingBoxParameter ⇐ <code>Parameter</code>](#BoundingBoxParameter)
    * [new BoundingBoxParameter(name, treeItem)](#new-BoundingBoxParameter)
    * [setDirty()](#setDirty)
    * [getValue() ⇒ <code>Box3</code>](#getValue)

<a name="new_BoundingBoxParameter_new"></a>

### new BoundingBoxParameter
Creates an instance of BoundingBoxParameter.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name of the parameter |
| treeItem | <code>TreeItem</code> | `TreeItem` that contains `Box3` representing the Bounding Box |

<a name="BoundingBoxParameter+setDirty"></a>

### setDirty
Makes parameter value be dirty, so when `getValue` is called,
an evaluation is then executed to re-calculate the BoundingBox


<a name="BoundingBoxParameter+getValue"></a>

### getValue
Returns bounding box value


**Returns**: <code>Box3</code> - - The return value.  
