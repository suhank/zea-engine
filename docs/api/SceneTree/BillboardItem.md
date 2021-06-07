<a name="BillboardItem"></a>

### BillboardItem 
A special type of TreeItem(Item with hierarchical abilities) class that represents a banner in a 2D dimension.
Can own any type of `BaseImage`.
<br>
<br>
**Parameters**
* **Image([`ImageParameter`](api/SceneTree/Parameters/ImageParameter.md)):** Is the BaseImage you want to display on the board.
* **PixelsPerMeter([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Quality and Size of the board. The bigger the number, the smaller the board.
* **Alpha([`NumberParameter`](api/SceneTree/Parameters/NumberParameter.md)):** Transparency of the board, from 0 to 1.
* **AlignedToCamera([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** Faces or not the board to the camera at all time(Moves with camera movement).
* **DrawOnTop([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** The billboards are rendered overlaid on the scene.
* **FixedSizeOnscreen([`BooleanParameter`](api/SceneTree/Parameters/BooleanParameter.md)):** The billboards are rendered at a fixed size on screen, regardless of the distance to the billboard.


**Extends**: <code>[TreeItem](api/SceneTree/TreeItem.md)</code>  
<a name="new_BillboardItem_new"></a>

### new BillboardItem
Creates a billboard item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the billboard item. |
| image | <code>[BaseImage](api/SceneTree/BaseImage.md)</code> | The image value. |

