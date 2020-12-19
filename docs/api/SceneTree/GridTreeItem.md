<a name="GridTreeItem"></a>

### GridTreeItem 
The GridTreeItem displays a grid of a given size and resolution. The Grid is oriented on the XY plane
and highlights the X and Y axes with Red and Green lines. Grids are useful in displaying scene scale and coordinate system.
The Grid geometry does not return a bounding box and so does not effect the bounding of the scene.


**Extends**: <code>[TreeItem](api/SceneTree\TreeItem.md)</code>  
<a name="new_GridTreeItem_new"></a>

### new GridTreeItem
Creates an instance of GridTree.


| Param | Type | Default |
| --- | --- | --- |
| [gridSize] | <code>number</code> | <code>5</code> | 
| [resolution] | <code>number</code> | <code>50</code> | 
| [gridColor] | <code>string</code> | <code>&quot;new Color(&#x27;#DCDCDC&#x27;)&quot;</code> | 



### [Class Tests](api/SceneTree/GridTreeItem.test)