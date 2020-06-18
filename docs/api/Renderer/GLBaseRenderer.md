<a name="GLBaseRenderer"></a>

### GLBaseRenderer 
Class representing a GL base renderer.


**Extends**: <code>ParameterOwner</code>  

* [GLBaseRenderer ⇐ <code>ParameterOwner</code>](#GLBaseRenderer)
    * [new GLBaseRenderer(canvasDiv, options)](#new-GLBaseRenderer)
    * _instance_
        * [gl](#gl)
        * [addShaderPreprocessorDirective(name, value)](#addShaderPreprocessorDirective)
        * [getShaderPreproc() ⇒ <code>any</code>](#getShaderPreproc)
        * [getWidth() ⇒ <code>any</code>](#getWidth)
        * [getHeight() ⇒ <code>any</code>](#getHeight)
        * [addViewport(name) ⇒ <code>GLViewport</code>](#addViewport)
        * [getViewport(index) ⇒ <code>GLViewport</code>](#getViewport)
        * [getViewportAtPos(offsetX, offsetY) ⇒ <code>GLViewport</code>](#getViewportAtPos)
        * [activateViewport(vp)](#activateViewport)
        * [activateViewportAtPos(offsetX, offsetY)](#activateViewportAtPos)
        * [getActiveViewport() ⇒ <code>any</code>](#getActiveViewport)
        * [suspendDrawing()](#suspendDrawing)
        * [resumeDrawing()](#resumeDrawing)
        * [renderGeomDataFbos()](#renderGeomDataFbos)
        * [setupGrid(gridSize, gridColor, resolution, lineThickness) ⇒ <code>any</code>](#setupGrid)
        * [getScene() ⇒ <code>any</code>](#getScene)
        * [setScene(scene)](#setScene)
        * [addTreeItem(treeItem)](#addTreeItem)
        * [removeTreeItem(treeItem)](#removeTreeItem)
        * [getGL() ⇒ <code>any</code>](#getGL)
        * [resizeFbos(width, height)](#resizeFbos)
        * [getDiv() ⇒ <code>any</code>](#getDiv)
        * [setupWebGL(canvasDiv, webglOptions)](#setupWebGL)
        * [bindEventHandlers()](#bindEventHandlers)
        * [setUndoRedoManager(undoRedoManager)](#setUndoRedoManager)
        * [getGLCanvas() ⇒ <code>any</code>](#getGLCanvas)
        * [getScreenQuad() ⇒ <code>any</code>](#getScreenQuad)
        * [onWheel(event)](#onWheel)
        * [frameAll(viewportIndex)](#frameAll)
        * [getOrCreateShader(shaderName) ⇒ <code>any</code>](#getOrCreateShader)
        * [addPass(pass, passtype, updateIndices) ⇒ <code>any</code>](#addPass)
        * [registerPass(itemAddedFn, itemRemovedFn)](#registerPass)
        * [getPass(index) ⇒ <code>any</code>](#getPass)
        * [findPass(constructor) ⇒ <code>any</code>](#findPass)
        * [getGizmoPass() ⇒ <code>any</code>](#getGizmoPass)
        * [supportsVR() ⇒ <code>any</code>](#supportsVR)
        * [getVRViewport() ⇒ <code>any</code>](#getVRViewport)
        * [getXRViewport() ⇒ <code>any</code>](#getXRViewport)
        * [isXRViewportPresenting() ⇒ <code>any</code>](#isXRViewportPresenting)
        * [isContinuouslyDrawing() ⇒ <code>any</code>](#isContinuouslyDrawing)
        * [startContinuousDrawing()](#startContinuousDrawing)
        * [stopContinuousDrawing()](#stopContinuousDrawing)
        * [toggleContinuousDrawing()](#toggleContinuousDrawing)
        * [drawItemChanged()](#drawItemChanged)
        * [requestRedraw() ⇒ <code>boolean</code>](#requestRedraw)
        * [bindGLBaseRenderer(renderstate)](#bindGLBaseRenderer)
        * [drawScene(renderstate)](#drawScene)
        * [drawHighlightedGeoms(renderstate)](#drawHighlightedGeoms)
        * [drawSceneGeomData(renderstate)](#drawSceneGeomData)
    * _static_
        * [registerPass(cls, passtype)](#registerPass)

<a name="new_GLBaseRenderer_new"></a>

### new GLBaseRenderer
Create a GL base renderer.


| Param | Type | Description |
| --- | --- | --- |
| canvasDiv | <code>any</code> | The canvasDiv value. |
| options | <code>any</code> | The options value. |

<a name="GLBaseRenderer+gl"></a>

### gl
Getter for gl.


<a name="GLBaseRenderer+addShaderPreprocessorDirective"></a>

### addShaderPreprocessorDirective
The addShaderPreprocessorDirective method.



| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| value | <code>any</code> | The value param. |

<a name="GLBaseRenderer+getShaderPreproc"></a>

### getShaderPreproc
The getShaderPreproc method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+getWidth"></a>

### getWidth
The getWidth method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+getHeight"></a>

### getHeight
The getHeight method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+addViewport"></a>

### addViewport
Add a viewport.


**Returns**: <code>GLViewport</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the viewport. |

<a name="GLBaseRenderer+getViewport"></a>

### getViewport
The getViewport method.


**Returns**: <code>GLViewport</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| index | <code>number</code> | <code>0</code> | The index value. |

<a name="GLBaseRenderer+getViewportAtPos"></a>

### getViewportAtPos
The getViewportAtPos method.


**Returns**: <code>GLViewport</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| offsetX | <code>number</code> | The viewport offset in the X axis. |
| offsetY | <code>number</code> | The viewport offset in the Y axis. |

<a name="GLBaseRenderer+activateViewport"></a>

### activateViewport
The activateViewport method.



| Param | Type | Description |
| --- | --- | --- |
| vp | <code>GLViewport</code> | The viewport. |

<a name="GLBaseRenderer+activateViewportAtPos"></a>

### activateViewportAtPos
The activateViewportAtPos method.



| Param | Type | Description |
| --- | --- | --- |
| offsetX | <code>number</code> | The viewport offset in the X axis. |
| offsetY | <code>number</code> | The viewport offset in the Y axis. |

<a name="GLBaseRenderer+getActiveViewport"></a>

### getActiveViewport
The getActiveViewport method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+suspendDrawing"></a>

### suspendDrawing
The suspendDrawing method.


<a name="GLBaseRenderer+resumeDrawing"></a>

### resumeDrawing
The resumeDrawing method.


<a name="GLBaseRenderer+renderGeomDataFbos"></a>

### renderGeomDataFbos
The renderGeomDataFbos method. Frame buffer (FBO).


<a name="GLBaseRenderer+setupGrid"></a>

### setupGrid
Setup the grid in the scene.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| gridSize | <code>any</code> | The size of the grid. |
| gridColor | <code>Color</code> | The color of the grid. |
| resolution | <code>any</code> | The resolution of the grid. |
| lineThickness | <code>any</code> | The thickness of the grid lines. |

<a name="GLBaseRenderer+getScene"></a>

### getScene
The getScene method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+setScene"></a>

### setScene
The setScene method.



| Param | Type | Description |
| --- | --- | --- |
| scene | <code>any</code> | The scene value. |

<a name="GLBaseRenderer+addTreeItem"></a>

### addTreeItem
Add tree items to the scene.



| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The tree item to add. |

<a name="GLBaseRenderer+removeTreeItem"></a>

### removeTreeItem
Remove tree items from the scene.



| Param | Type | Description |
| --- | --- | --- |
| treeItem | <code>any</code> | The tree item to remove. |

<a name="GLBaseRenderer+getGL"></a>

### getGL
The getGL method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+resizeFbos"></a>

### resizeFbos
The resizeFbos method. Frame buffer (FBO).



| Param | Type | Description |
| --- | --- | --- |
| width | <code>any</code> | The width of the frame buffer. |
| height | <code>any</code> | The height of the frame buffer. |

<a name="GLBaseRenderer+getDiv"></a>

### getDiv
The getDiv method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+setupWebGL"></a>

### setupWebGL
The setupWebGL method.



| Param | Type | Description |
| --- | --- | --- |
| canvasDiv | <code>any</code> | The canvasDiv value. |
| webglOptions | <code>any</code> | The webglOptions value. |

<a name="GLBaseRenderer+bindEventHandlers"></a>

### bindEventHandlers
The bindEventHandlers method.


<a name="GLBaseRenderer+setUndoRedoManager"></a>

### setUndoRedoManager
The setUndoRedoManager method.



| Param | Type | Description |
| --- | --- | --- |
| undoRedoManager | <code>object</code> | The undoRedoManager state. |

<a name="GLBaseRenderer+getGLCanvas"></a>

### getGLCanvas
The getGLCanvas method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+getScreenQuad"></a>

### getScreenQuad
The getScreenQuad method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+onWheel"></a>

### onWheel
Causes an event to occur when the mouse wheel is rolled up or down over an element.



| Param | Type | Description |
| --- | --- | --- |
| event | <code>any</code> | The event that occurs. |

<a name="GLBaseRenderer+frameAll"></a>

### frameAll
The frameAll method.



| Param | Type | Default | Description |
| --- | --- | --- | --- |
| viewportIndex | <code>number</code> | <code>0</code> | The viewportIndex value. |

<a name="GLBaseRenderer+getOrCreateShader"></a>

### getOrCreateShader
The getOrCreateShader method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| shaderName | <code>string</code> | The shader name. |

<a name="GLBaseRenderer+addPass"></a>

### addPass
The addPass method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| pass | <code>any</code> |  | The pass value. |
| passtype | <code>number</code> | <code>0</code> | The passtype value. |
| updateIndices | <code>boolean</code> | <code>true</code> | The updateIndices value. |

<a name="GLBaseRenderer+registerPass"></a>

### registerPass
The registerPass method.



| Param | Type | Description |
| --- | --- | --- |
| itemAddedFn | <code>any</code> | The itemAddedFn value. |
| itemRemovedFn | <code>any</code> | The itemRemovedFn value. |

<a name="GLBaseRenderer+getPass"></a>

### getPass
The getPass method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The index value. |

<a name="GLBaseRenderer+findPass"></a>

### findPass
The findPass method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| constructor | <code>any</code> | The constructor value. |

<a name="GLBaseRenderer+getGizmoPass"></a>

### getGizmoPass
The getGizmoPass method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+supportsVR"></a>

### supportsVR
The supportsVR method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+getVRViewport"></a>

### getVRViewport
The getVRViewport method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+getXRViewport"></a>

### getXRViewport
The getXRViewport method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+isXRViewportPresenting"></a>

### isXRViewportPresenting
The isXRViewportPresenting method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+isContinuouslyDrawing"></a>

### isContinuouslyDrawing
The isContinuouslyDrawing method.


**Returns**: <code>any</code> - - The return value.  
<a name="GLBaseRenderer+startContinuousDrawing"></a>

### startContinuousDrawing
The startContinuousDrawing method.


<a name="GLBaseRenderer+stopContinuousDrawing"></a>

### stopContinuousDrawing
The stopContinuousDrawing method.


<a name="GLBaseRenderer+toggleContinuousDrawing"></a>

### toggleContinuousDrawing
The toggleContinuousDrawing method.


<a name="GLBaseRenderer+drawItemChanged"></a>

### drawItemChanged
The drawItemChanged method.


<a name="GLBaseRenderer+requestRedraw"></a>

### requestRedraw
Request a single redraw, usually in response to a signal/event.


**Returns**: <code>boolean</code> - - The return value.  
<a name="GLBaseRenderer+bindGLBaseRenderer"></a>

### bindGLBaseRenderer
The bindGLBaseRenderer method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLBaseRenderer+drawScene"></a>

### drawScene
The drawScene method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLBaseRenderer+drawHighlightedGeoms"></a>

### drawHighlightedGeoms
The drawHighlightedGeoms method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLBaseRenderer+drawSceneGeomData"></a>

### drawSceneGeomData
The drawSceneGeomData method.



| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>any</code> | The renderstate value. |

<a name="GLBaseRenderer.registerPass"></a>

### registerPass
The registerPass method.



| Param | Type | Description |
| --- | --- | --- |
| cls | <code>any</code> | The cls value. |
| passtype | <code>any</code> | The passtype value. |

