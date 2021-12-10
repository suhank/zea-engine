---
id: "Renderer_GLViewport.GLViewport"
title: "Class: GLViewport"
sidebar_label: "GLViewport"
custom_edit_url: null
---



Class representing a GL viewport.

**Events**
* **resized:** Emitted when the GLViewport resizes
* **updated:** Emitted when the GLViewport needs updating. The Renderer will trigger a redraw when this occurs.
* **viewChanged:** Emitted when the view changes. Usually caused by the camera moving.
* **pointerDoublePressed:** Emitted when the user double clicks with the mouse, or double taps in the viewport.
* **pointerDown:** Emitted when the user presses a pointer
* **pointerUp:** Emitted when the user releases a pointer
* **pointerOverGeom:** Emitted when the pointer is moved over a geometry
* **pointerLeaveGeom:** Emitted when the pointer is moved off a geometry
* **pointerMove:** Emitted when the pointer is moved
* **pointerEnter:** Emitted when the pointer is moved into thg viewport
* **pointerLeave:** Emitted when the mouse leaves the viewport.
* **keyDown:** Emitted when the user presses a key on the keyboard
* **keyUp:** Emitted when the user releases a key on the keyboard
* **touchCancel:** Emitted when the user cancels a touch interaction

## Hierarchy

- [`GLBaseViewport`](Renderer_GLBaseViewport.GLBaseViewport)

  ↳ **`GLViewport`**

## Constructors

### constructor

• **new GLViewport**(`renderer`, `name`, `width`, `height`)

Create a GL viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLRenderer`](Renderer_GLRenderer.GLRenderer) | The renderer value. |
| `name` | `string` | The name value. |
| `width` | `number` | The width of the viewport |
| `height` | `number` | The height of the viewport |

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[constructor](Renderer_GLBaseViewport.GLBaseViewport#constructor)

#### Defined in

[Renderer/GLViewport.ts:77](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L77)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[EXT_frag_depth](Renderer_GLBaseViewport.GLBaseViewport#ext_frag_depth)

#### Defined in

[Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L45)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__backgroundGLTexture](Renderer_GLBaseViewport.GLBaseViewport#__backgroundgltexture)

#### Defined in

[Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L36)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__backgroundTexture](Renderer_GLBaseViewport.GLBaseViewport#__backgroundtexture)

#### Defined in

[Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L35)

___

### \_\_bl

• `Protected` **\_\_bl**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[Renderer/GLViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L47)

___

### \_\_camera

• `Protected` **\_\_camera**: [`Camera`](../SceneTree/SceneTree_Camera.Camera)

#### Defined in

[Renderer/GLViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L45)

___

### \_\_cameraMat

• `Protected` **\_\_cameraMat**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/GLViewport.ts:61](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L61)

___

### \_\_cameraXfo

• `Protected` **\_\_cameraXfo**: [`Xfo`](../Math/Math_Xfo.Xfo)

#### Defined in

[Renderer/GLViewport.ts:60](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L60)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__canvasHeight](Renderer_GLBaseViewport.GLBaseViewport#__canvasheight)

#### Defined in

[Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L41)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__canvasWidth](Renderer_GLBaseViewport.GLBaseViewport#__canvaswidth)

#### Defined in

[Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L40)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__fbo](Renderer_GLBaseViewport.GLBaseViewport#__fbo)

#### Defined in

[Renderer/GLBaseViewport.ts:29](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L29)

___

### \_\_frustumDim

• `Protected` **\_\_frustumDim**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[Renderer/GLViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L44)

___

### \_\_geomDataBuffer

• `Protected` **\_\_geomDataBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[Renderer/GLViewport.ts:50](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L50)

___

### \_\_geomDataBufferFbo

• `Protected` **\_\_geomDataBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Defined in

[Renderer/GLViewport.ts:52](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L52)

___

### \_\_geomDataBufferInvalid

• `Protected` **\_\_geomDataBufferInvalid**: `boolean` = `true`

#### Defined in

[Renderer/GLViewport.ts:64](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L64)

___

### \_\_geomDataBufferSizeFactor

• `Protected` **\_\_geomDataBufferSizeFactor**: `number`

#### Defined in

[Renderer/GLViewport.ts:51](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L51)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__gl](Renderer_GLBaseViewport.GLBaseViewport#__gl)

#### Defined in

[Renderer/GLBaseViewport.ts:26](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L26)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__height](Renderer_GLBaseViewport.GLBaseViewport#__height)

#### Defined in

[Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L39)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__id](Renderer_GLBaseViewport.GLBaseViewport#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/BaseClass.ts#L11)

___

### \_\_intersectionData

• `Protected` **\_\_intersectionData**: [`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

#### Defined in

[Renderer/GLViewport.ts:66](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L66)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[Renderer/GLViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L42)

___

### \_\_prevDownTime

• `Protected` **\_\_prevDownTime**: `number`

#### Defined in

[Renderer/GLViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L49)

___

### \_\_projectionMatrix

• `Protected` **\_\_projectionMatrix**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/GLViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L43)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__renderer](Renderer_GLBaseViewport.GLBaseViewport#__renderer)

#### Defined in

[Renderer/GLBaseViewport.ts:28](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L28)

___

### \_\_screenPos

• `Protected` **\_\_screenPos**: [`Vec2`](../Math/Math_Vec2.Vec2) = `null`

#### Defined in

[Renderer/GLViewport.ts:65](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L65)

___

### \_\_tr

• `Protected` **\_\_tr**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[Renderer/GLViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L48)

___

### \_\_viewMat

• `Protected` **\_\_viewMat**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/GLViewport.ts:62](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L62)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__width](Renderer_GLBaseViewport.GLBaseViewport#__width)

#### Defined in

[Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L38)

___

### \_\_x

• `Protected` **\_\_x**: `number` = `0`

#### Defined in

[Renderer/GLViewport.ts:56](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L56)

___

### \_\_y

• `Protected` **\_\_y**: `number` = `0`

#### Defined in

[Renderer/GLViewport.ts:57](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L57)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[backgroundColorParam](Renderer_GLBaseViewport.GLBaseViewport#backgroundcolorparam)

#### Defined in

[Renderer/GLBaseViewport.ts:52](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L52)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `any`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[colorRenderbuffer](Renderer_GLBaseViewport.GLBaseViewport#colorrenderbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L43)

___

### debugGeomShader

• `Protected` **debugGeomShader**: `boolean`

#### Defined in

[Renderer/GLViewport.ts:53](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L53)

___

### debugHighlightedGeomsBuffer

• `Protected` **debugHighlightedGeomsBuffer**: `boolean` = `false`

#### Defined in

[Renderer/GLViewport.ts:54](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L54)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[deprecatedParamMapping](Renderer_GLBaseViewport.GLBaseViewport#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L23)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthBuffer](Renderer_GLBaseViewport.GLBaseViewport#depthbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L44)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthRange](Renderer_GLBaseViewport.GLBaseViewport#depthrange)

#### Defined in

[Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L47)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthTexture](Renderer_GLBaseViewport.GLBaseViewport#depthtexture)

#### Defined in

[Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L32)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[doubleClickTimeParam](Renderer_GLBaseViewport.GLBaseViewport#doubleclicktimeparam)

#### Defined in

[Renderer/GLBaseViewport.ts:57](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L57)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[fb](Renderer_GLBaseViewport.GLBaseViewport#fb)

#### Defined in

[Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L42)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBuffer](Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L33)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBufferFbo](Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbufferfbo)

#### Defined in

[Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L34)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[listeners](Renderer_GLBaseViewport.GLBaseViewport#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: `any`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[manipulator](Renderer_GLBaseViewport.GLBaseViewport#manipulator)

#### Defined in

[Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L46)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[offscreenBuffer](Renderer_GLBaseViewport.GLBaseViewport#offscreenbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L31)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[offscreenBufferFbo](Renderer_GLBaseViewport.GLBaseViewport#offscreenbufferfbo)

#### Defined in

[Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L37)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[paramEventListenerIDs](Renderer_GLBaseViewport.GLBaseViewport#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[paramMapping](Renderer_GLBaseViewport.GLBaseViewport#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[params](Renderer_GLBaseViewport.GLBaseViewport#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L22)

___

### pointerOverItem

• `Protected` **pointerOverItem**: [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[Renderer/GLViewport.ts:68](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L68)

___

### quad

• `Protected` **quad**: [`GLMesh`](Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[quad](Renderer_GLBaseViewport.GLBaseViewport#quad)

#### Defined in

[Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L30)

___

### region

• `Protected` **region**: `number`[]

#### Defined in

[Renderer/GLViewport.ts:58](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L58)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[renderer](Renderer_GLBaseViewport.GLBaseViewport#renderer)

#### Defined in

[Renderer/GLBaseViewport.ts:27](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L27)

## Methods

### \_\_getPointerPos

▸ `Private` **__getPointerPos**(`rendererX`, `rendererY`): [`Vec2`](../Math/Math_Vec2.Vec2)

Calculates the event coordinates relative to the viewport.
There could be multiple viewports connected to the current renderer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rendererX` | `number` | The rendererX value |
| `rendererY` | `number` | The rendererY value |

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[Renderer/GLViewport.ts:543](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L543)

___

### \_\_initRenderState

▸ `Private` **__initRenderState**(`renderstate`): `void`

The __initRenderState method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:841](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L841)

___

### \_\_updateProjectionMatrix

▸ **__updateProjectionMatrix**(): `void`

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:252](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L252)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[addParameter](Renderer_GLBaseViewport.GLBaseViewport#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L133)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[addParameterDeprecationMapping](Renderer_GLBaseViewport.GLBaseViewport#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L90)

___

### calcRayFromScreenPos

▸ **calcRayFromScreenPos**(`screenPos`): [`Ray`](../Math/Math_Ray.Ray)

Compute a ray into the scene based on a mouse coordinate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `screenPos` | [`Vec2`](../Math/Math_Vec2.Vec2) | The screen position. |

#### Returns

[`Ray`](../Math/Math_Ray.Ray)

- The return value.

#### Defined in

[Renderer/GLViewport.ts:298](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L298)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[copyFrom](Renderer_GLBaseViewport.GLBaseViewport#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L314)

___

### draw

▸ **draw**(): `void`

The draw method.

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[draw](Renderer_GLBaseViewport.GLBaseViewport#draw)

#### Defined in

[Renderer/GLViewport.ts:864](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L864)

___

### drawHighlights

▸ `Private` **drawHighlights**(`renderstate`): `void`

Draws the highlights around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[drawHighlights](Renderer_GLBaseViewport.GLBaseViewport#drawhighlights)

#### Defined in

[Renderer/GLBaseViewport.ts:401](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L401)

___

### drawSilhouettes

▸ `Private` **drawSilhouettes**(`renderstate`): `void`

Draws the Silhouettes around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[drawSilhouettes](Renderer_GLBaseViewport.GLBaseViewport#drawsilhouettes)

#### Defined in

[Renderer/GLBaseViewport.ts:334](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L334)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[emit](Renderer_GLBaseViewport.GLBaseViewport#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/EventEmitter.ts#L154)

___

### frameView

▸ **frameView**(`treeItems?`): `void`

Calculates a new camera position that frames all the items passed in `treeItems` array, moving
the camera to a point where we can see all of them.
> See Camera.frameView

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItems?` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)[] | The array of TreeItem. |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:283](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L283)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[fromJSON](Renderer_GLBaseViewport.GLBaseViewport#fromjson)

#### Defined in

[SceneTree/ParameterOwner.ts:239](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L239)

___

### getBl

▸ **getBl**(): [`Vec2`](../Math/Math_Vec2.Vec2)

The getBl method.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[Renderer/GLViewport.ts:122](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L122)

___

### getCamera

▸ **getCamera**(): [`Camera`](../SceneTree/SceneTree_Camera.Camera)

Returns current camera object

#### Returns

[`Camera`](../SceneTree/SceneTree_Camera.Camera)

- The return value.

#### Defined in

[Renderer/GLViewport.ts:215](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L215)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getClassName](Renderer_GLBaseViewport.GLBaseViewport#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/BaseClass.ts#L33)

___

### getGeomDataAtPos

▸ **getGeomDataAtPos**(`screenPos`, `pointerRay`): [`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

The getGeomDataAtPos method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `screenPos` | [`Vec2`](../Math/Math_Vec2.Vec2) | The screen position. |
| `pointerRay` | [`Ray`](../Math/Math_Ray.Ray) | The pointerRay value. |

#### Returns

[`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

- The return value.

#### Defined in

[Renderer/GLViewport.ts:376](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L376)

___

### getGeomItemsInRect

▸ **getGeomItemsInRect**(`tl`, `br`): `Set`<[`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)\>

getGeomItemsInRect
Gathers all the geoms renders in a given rectangle of the viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tl` | [`Vec2`](../Math/Math_Vec2.Vec2) | The top left value of the rectangle. |
| `br` | [`Vec2`](../Math/Math_Vec2.Vec2) | The bottom right corner of the rectangle. |

#### Returns

`Set`<[`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)\>

- The return value.

#### Defined in

[Renderer/GLViewport.ts:474](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L474)

___

### getHeight

▸ **getHeight**(): `number`

The getHeight method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getHeight](Renderer_GLBaseViewport.GLBaseViewport#getheight)

#### Defined in

[Renderer/GLBaseViewport.ts:152](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L152)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getId](Renderer_GLBaseViewport.GLBaseViewport#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/BaseClass.ts#L25)

___

### getManipulator

▸ **getManipulator**(): [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

The getManipulator method.

#### Returns

[`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getManipulator](Renderer_GLBaseViewport.GLBaseViewport#getmanipulator)

#### Defined in

[Renderer/GLBaseViewport.ts:452](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L452)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getNumParameters](Renderer_GLBaseViewport.GLBaseViewport#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L39)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameter](Renderer_GLBaseViewport.GLBaseViewport#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameterByIndex](Renderer_GLBaseViewport.GLBaseViewport#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L68)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameterIndex](Renderer_GLBaseViewport.GLBaseViewport#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameters](Renderer_GLBaseViewport.GLBaseViewport#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L48)

___

### getPosX

▸ **getPosX**(): `number`

The getPosX method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLViewport.ts:158](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L158)

___

### getPosY

▸ **getPosY**(): `number`

The getPosY method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLViewport.ts:166](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L166)

___

### getProjectionMatrix

▸ **getProjectionMatrix**(): [`Mat4`](../Math/Math_Mat4.Mat4)

The getProjectionMatrix method.

#### Returns

[`Mat4`](../Math/Math_Mat4.Mat4)

- The return projection matrix for the viewport.

#### Defined in

[Renderer/GLViewport.ts:265](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L265)

___

### getTr

▸ **getTr**(): [`Vec2`](../Math/Math_Vec2.Vec2)

The getTr method.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[Renderer/GLViewport.ts:140](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L140)

___

### getViewMatrix

▸ **getViewMatrix**(): [`Mat4`](../Math/Math_Mat4.Mat4)

The getProjectionMatrix method.

#### Returns

[`Mat4`](../Math/Math_Mat4.Mat4)

- The return projection matrix for the viewport.

#### Defined in

[Renderer/GLViewport.ts:273](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L273)

___

### getWidth

▸ **getWidth**(): `number`

The getWidth method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getWidth](Renderer_GLBaseViewport.GLBaseViewport#getwidth)

#### Defined in

[Renderer/GLBaseViewport.ts:144](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L144)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[hasParameter](Renderer_GLBaseViewport.GLBaseViewport#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L78)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[insertParameter](Renderer_GLBaseViewport.GLBaseViewport#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L147)

___

### invalidateGeomDataBuffer

▸ **invalidateGeomDataBuffer**(): `void`

The invalidateGeomDataBuffer method.

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:366](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L366)

___

### off

▸ **off**(`eventName`, `listener?`): `void`

Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function or the id number. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[off](Renderer_GLBaseViewport.GLBaseViewport#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/EventEmitter.ts#L97)

___

### on

▸ **on**(`eventName`, `listener?`): `number`

Adds a listener function for a given event name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function(callback). |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[on](Renderer_GLBaseViewport.GLBaseViewport#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Causes an event to occur when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onKeyDown](Renderer_GLBaseViewport.GLBaseViewport#onkeydown)

#### Defined in

[Renderer/GLViewport.ts:767](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L767)

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Causes an event to occur  when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onKeyUp](Renderer_GLBaseViewport.GLBaseViewport#onkeyup)

#### Defined in

[Renderer/GLViewport.ts:780](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L780)

___

### onMouseLeave

▸ **onMouseLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onMouseLeave](Renderer_GLBaseViewport.GLBaseViewport#onmouseleave)

#### Defined in

[Renderer/GLBaseViewport.ts:523](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L523)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Handler of the `pointerdown` event fired when the pointer device is initially pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerDown](Renderer_GLBaseViewport.GLBaseViewport#onpointerdown)

#### Defined in

[Renderer/GLViewport.ts:562](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L562)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Causes an event to occur when the mouse pointer is moved into this viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerEnter](Renderer_GLBaseViewport.GLBaseViewport#onpointerenter)

#### Defined in

[Renderer/GLViewport.ts:737](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L737)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Causes an event to occur when the mouse pointer is moved out of this viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerLeave](Renderer_GLBaseViewport.GLBaseViewport#onpointerleave)

#### Defined in

[Renderer/GLViewport.ts:752](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L752)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Causes an event to occur when the pointer device is moving.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerMove](Renderer_GLBaseViewport.GLBaseViewport#onpointermove)

#### Defined in

[Renderer/GLViewport.ts:667](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L667)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Causes an event to occur when a user releases a mouse button over a element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerUp](Renderer_GLBaseViewport.GLBaseViewport#onpointerup)

#### Defined in

[Renderer/GLViewport.ts:624](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L624)

___

### onTouchCancel

▸ **onTouchCancel**(`event`): `void`

Causes an event to occur when the touch event gets interrupted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The event that occurs. |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:818](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L818)

___

### onWheel

▸ **onWheel**(`event`): `void`

Causes an event to occur when the mouse wheel is rolled up or down over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaWheelEvent`](../Utilities/Events/Utilities_Events_ZeaWheelEvent.ZeaWheelEvent) | The event that occurs. |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:793](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L793)

___

### once

▸ **once**(`eventName`, `listener`): `number`

Similar to the `on` method with the difference that when the event is triggered,
it is automatically unregistered meaning that the event listener will be triggered at most one time.

Useful for events that we expect to trigger one time, such as when assets load.
```javascript
const asset = new Asset();
asset.once('loaded', () => {
  console.log("Yay! the asset is loaded")
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The eventName value |
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[once](Renderer_GLBaseViewport.GLBaseViewport#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[parameterValueChanged](Renderer_GLBaseViewport.GLBaseViewport#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L122)

___

### prepareUIEvent

▸ `Private` **prepareUIEvent**(`event`): `void`

Prepares pointer event by adding properties of the engine to it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The event that occurs in the canvas |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:553](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L553)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.

In each iteration of the array, propType and propName are extracted and
used to build the right `Parameter` class. Then all of them are added to the object.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[readBinary](Renderer_GLBaseViewport.GLBaseViewport#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:274](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L274)

___

### removeListenerById

▸ **removeListenerById**(`eventName`, `id`): `void`

remove listener by ID returned from #on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `id` | `number` | The id returned by addListener |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[removeListenerById](Renderer_GLBaseViewport.GLBaseViewport#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Utilities/EventEmitter.ts#L134)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[removeParameter](Renderer_GLBaseViewport.GLBaseViewport#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L174)

___

### renderGeomDataFbo

▸ **renderGeomDataFbo**(): `void`

Renders the scene geometry to the viewport's geom data buffer
in preparation for mouse picking.

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:347](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L347)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[replaceParameter](Renderer_GLBaseViewport.GLBaseViewport#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L196)

___

### resize

▸ **resize**(`canvasWidth`, `canvasHeight`): `void`

Dynamically resizes viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvasWidth` | `number` | The canvasWidth value. |
| `canvasHeight` | `number` | The canvasHeight value. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[resize](Renderer_GLBaseViewport.GLBaseViewport#resize)

#### Defined in

[Renderer/GLViewport.ts:176](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L176)

___

### resizeRenderTargets

▸ **resizeRenderTargets**(`width`, `height`): `void`

Resize any offscreen render targets.
> Note: Values ,ay not be the entire canvas with if multiple viewports exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The width used by this viewport. |
| `height` | `number` | The height  used by this viewport. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[resizeRenderTargets](Renderer_GLBaseViewport.GLBaseViewport#resizerendertargets)

#### Defined in

[Renderer/GLViewport.ts:198](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L198)

___

### setBl

▸ **setBl**(`bl`): `void`

The setBl method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bl` | `number` | The bl value. |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:130](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L130)

___

### setCamera

▸ **setCamera**(`camera`): `void`

Sets current camera object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](../SceneTree/SceneTree_Camera.Camera) | The camera value. |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:224](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L224)

___

### setManipulator

▸ **setManipulator**(`tool`): `void`

Sets the tool that will receive mouse, touch and keyboard events from the viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) | The manipulator value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[setManipulator](Renderer_GLBaseViewport.GLBaseViewport#setmanipulator)

#### Defined in

[Renderer/GLBaseViewport.ts:460](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLBaseViewport.ts#L460)

___

### setTr

▸ **setTr**(`tr`): `void`

The setTr method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tr` | `number` | The tr value. |

#### Returns

`void`

#### Defined in

[Renderer/GLViewport.ts:148](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/Renderer/GLViewport.ts#L148)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[toJSON](Renderer_GLBaseViewport.GLBaseViewport#tojson)

#### Defined in

[SceneTree/ParameterOwner.ts:216](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L216)

___

### toString

▸ **toString**(`context`): `string`

Converts object's JSON value and converts it to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- String of object's parameter list state.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[toString](Renderer_GLBaseViewport.GLBaseViewport#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/ad29d1184/src/SceneTree/ParameterOwner.ts#L301)

