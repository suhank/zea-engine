<a name="GLAudioItemsPass"></a>

### GLAudioItemsPass 
Class representing a GL audio items pass.


**Extends**: <code>[GLPass](api/Renderer/Passes/GLPass.md)</code>  

* [GLAudioItemsPass ⇐ <code>GLPass</code>](#GLAudioItemsPass)
    * [new GLAudioItemsPass()](#new-GLAudioItemsPass)
    * [init(renderer, passIndex)](#init)
    * [itemAddedToScene(treeItem, rargs) ⇒ <code>Boolean</code>](#itemAddedToScene)
    * [itemRemovedFromScene(treeItem, rargs) ⇒ <code>Boolean</code>](#itemRemovedFromScene)
    * [addAudioSource(treeItem, audioSource, parameterOwner)](#addAudioSource)
    * [draw(renderstate)](#draw)

<a name="new_GLAudioItemsPass_new"></a>

### new GLAudioItemsPass
Create a GL audio items pass.

<a name="GLAudioItemsPass+init"></a>

### init
The init method.



| Param | Type | Description |
| --- | --- | --- |
| renderer | <code>[GLBaseRenderer](api/Renderer/GLBaseRenderer.md)</code> | The renderer value. |
| passIndex | <code>number</code> | The index of the pass in the GLBAseRenderer |

<a name="GLAudioItemsPass+itemAddedToScene"></a>

### itemAddedToScene
The itemAddedToScene method is called on each pass when a new item
is added to the scene, and the renderer must decide how to render it.
It allows Passes to select geometries to handle the drawing of.


**Returns**: <code>Boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | The treeItem value. |
| rargs | <code>object</code> | Extra return values are passed back in this object. The object contains a parameter 'continueInSubTree', which can be set to false, so the subtree of this node will not be traversed after this node is handled. |

<a name="GLAudioItemsPass+itemRemovedFromScene"></a>

### itemRemovedFromScene
The itemRemovedFromScene method is called on each pass when aa item
is removed to the scene, and the pass must handle cleaning up any resources.


**Returns**: <code>Boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>[TreeItem](api/SceneTree/TreeItem.md)</code> | The treeItem value. |
| rargs | <code>object</code> | Extra return values are passed back in this object. |

<a name="GLAudioItemsPass+addAudioSource"></a>

### addAudioSource
The addAudioSource method.



| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The treeItem value. |
| audioSource | <code>any</code> | The audioSource value. |
| parameterOwner | <code>any</code> | The parameterOwner value. |

<a name="GLAudioItemsPass+draw"></a>

### draw
The draw method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

