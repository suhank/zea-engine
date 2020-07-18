<a name="BillboardItem"></a>

### BillboardItem 
A special type of TreeItem(Item with hierarchical abilities) class that represents a banner in a 2D dimension.
Can own any type of `BaseImage`.
<br>
<br>
**Parameters**
* **Image(`ImageParameter`):** Is the BaseImage you want to display on the board.
* **PixelsPerMeter(`NumberParameter`):** Quality and Size of the board. The bigger the number, the smaller the board.
* **Alpha(`NumberParameter`):** Transparency of the board, from 0 to 1.
* **AlignedToCamera(`BooleanParameter`):** Faces or not the board to the camera at all time(Moves with camera movement).
* **DrawOnTop(`BooleanParameter`):** _todo_


**Extends**: <code>TreeItem</code>  
<a name="new_BillboardItem_new"></a>

### new BillboardItem
Creates a billboard item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the billboard item. |
| image | <code>BaseImage</code> | The image value. |

