<a name="Points"></a>

### Points 
Class representing a point primitive drawing type, every vertex specified is a point.

```
const points = new Points()
```

* **Events**
* **boundingBoxChanged:** Triggered when the bounding box changes.


**Extends**: <code>[BaseGeom](api/SceneTree\Geometry\BaseGeom.md)</code>  

* [Points ⇐ <code>BaseGeom</code>](#Points)
    * [new Points()](#new-Points)
    * [clear()](#clear)
    * [loadBin(reader)](#loadBin)
    * [readBinary(reader, context)](#readBinary)

<a name="new_Points_new"></a>

### new Points
Create points.

<a name="Points+clear"></a>

### clear
The clear method.


<a name="Points+loadBin"></a>

### loadBin
Loads and populates `Points` object from a binary reader.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |

<a name="Points+readBinary"></a>

### readBinary
Sets state of current geometry(Including line segments) using a binary reader object.



| Param | Type | Description |
| --- | --- | --- |
| reader | <code>[BinReader](api/SceneTree\BinReader.md)</code> | The reader value. |
| context | <code>object</code> | The context value. |



### [Class Tests](api/SceneTree\Geometry/Points.test)