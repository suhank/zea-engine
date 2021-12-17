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

[src/Renderer/GLViewport.ts:78](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L78)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[EXT_frag_depth](Renderer_GLBaseViewport.GLBaseViewport#ext_frag_depth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L47)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__backgroundGLTexture](Renderer_GLBaseViewport.GLBaseViewport#__backgroundgltexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L38)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__backgroundTexture](Renderer_GLBaseViewport.GLBaseViewport#__backgroundtexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L37)

___

### \_\_bl

• `Protected` **\_\_bl**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[src/Renderer/GLViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L48)

___

### \_\_camera

• `Protected` **\_\_camera**: [`Camera`](../SceneTree/SceneTree_Camera.Camera)

#### Defined in

[src/Renderer/GLViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L46)

___

### \_\_cameraMat

• `Protected` **\_\_cameraMat**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/GLViewport.ts:62](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L62)

___

### \_\_cameraXfo

• `Protected` **\_\_cameraXfo**: [`Xfo`](../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/GLViewport.ts:61](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L61)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__canvasHeight](Renderer_GLBaseViewport.GLBaseViewport#__canvasheight)

#### Defined in

[src/Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L43)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__canvasWidth](Renderer_GLBaseViewport.GLBaseViewport#__canvaswidth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L42)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__fbo](Renderer_GLBaseViewport.GLBaseViewport#__fbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L31)

___

### \_\_frustumDim

• `Protected` **\_\_frustumDim**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[src/Renderer/GLViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L45)

___

### \_\_geomDataBuffer

• `Protected` **\_\_geomDataBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[src/Renderer/GLViewport.ts:51](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L51)

___

### \_\_geomDataBufferFbo

• `Protected` **\_\_geomDataBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Defined in

[src/Renderer/GLViewport.ts:53](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L53)

___

### \_\_geomDataBufferInvalid

• `Protected` **\_\_geomDataBufferInvalid**: `boolean` = `true`

#### Defined in

[src/Renderer/GLViewport.ts:65](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L65)

___

### \_\_geomDataBufferSizeFactor

• `Protected` **\_\_geomDataBufferSizeFactor**: `number`

#### Defined in

[src/Renderer/GLViewport.ts:52](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L52)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__gl](Renderer_GLBaseViewport.GLBaseViewport#__gl)

#### Defined in

[src/Renderer/GLBaseViewport.ts:28](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L28)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__height](Renderer_GLBaseViewport.GLBaseViewport#__height)

#### Defined in

[src/Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L41)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__id](Renderer_GLBaseViewport.GLBaseViewport#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L11)

___

### \_\_intersectionData

• `Protected` **\_\_intersectionData**: [`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

#### Defined in

[src/Renderer/GLViewport.ts:67](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L67)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[src/Renderer/GLViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L43)

___

### \_\_prevDownTime

• `Protected` **\_\_prevDownTime**: `number`

#### Defined in

[src/Renderer/GLViewport.ts:50](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L50)

___

### \_\_projectionMatrix

• `Protected` **\_\_projectionMatrix**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/GLViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L44)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__renderer](Renderer_GLBaseViewport.GLBaseViewport#__renderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L30)

___

### \_\_screenPos

• `Protected` **\_\_screenPos**: [`Vec2`](../Math/Math_Vec2.Vec2) = `null`

#### Defined in

[src/Renderer/GLViewport.ts:66](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L66)

___

### \_\_tr

• `Protected` **\_\_tr**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[src/Renderer/GLViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L49)

___

### \_\_viewMat

• `Protected` **\_\_viewMat**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/GLViewport.ts:63](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L63)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__width](Renderer_GLBaseViewport.GLBaseViewport#__width)

#### Defined in

[src/Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L40)

___

### \_\_x

• `Protected` **\_\_x**: `number` = `0`

#### Defined in

[src/Renderer/GLViewport.ts:57](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L57)

___

### \_\_y

• `Protected` **\_\_y**: `number` = `0`

#### Defined in

[src/Renderer/GLViewport.ts:58](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L58)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[backgroundColorParam](Renderer_GLBaseViewport.GLBaseViewport#backgroundcolorparam)

#### Defined in

[src/Renderer/GLBaseViewport.ts:54](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L54)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `any`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[colorRenderbuffer](Renderer_GLBaseViewport.GLBaseViewport#colorrenderbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L45)

___

### debugGeomShader

• `Protected` **debugGeomShader**: `boolean`

#### Defined in

[src/Renderer/GLViewport.ts:54](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L54)

___

### debugHighlightedGeomsBuffer

• `Protected` **debugHighlightedGeomsBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/GLViewport.ts:55](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L55)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[deprecatedParamMapping](Renderer_GLBaseViewport.GLBaseViewport#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L24)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthBuffer](Renderer_GLBaseViewport.GLBaseViewport#depthbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L46)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthRange](Renderer_GLBaseViewport.GLBaseViewport#depthrange)

#### Defined in

[src/Renderer/GLBaseViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L49)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthTexture](Renderer_GLBaseViewport.GLBaseViewport#depthtexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L34)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[doubleClickTimeParam](Renderer_GLBaseViewport.GLBaseViewport#doubleclicktimeparam)

#### Defined in

[src/Renderer/GLBaseViewport.ts:59](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L59)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[fb](Renderer_GLBaseViewport.GLBaseViewport#fb)

#### Defined in

[src/Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L44)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBuffer](Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L35)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBufferFbo](Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbufferfbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L36)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[listeners](Renderer_GLBaseViewport.GLBaseViewport#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: `any`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[manipulator](Renderer_GLBaseViewport.GLBaseViewport#manipulator)

#### Defined in

[src/Renderer/GLBaseViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L48)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[offscreenBuffer](Renderer_GLBaseViewport.GLBaseViewport#offscreenbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L33)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[offscreenBufferFbo](Renderer_GLBaseViewport.GLBaseViewport#offscreenbufferfbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L39)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[paramEventListenerIDs](Renderer_GLBaseViewport.GLBaseViewport#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L21)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[paramMapping](Renderer_GLBaseViewport.GLBaseViewport#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L22)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[params](Renderer_GLBaseViewport.GLBaseViewport#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L23)

___

### pointerOverItem

• `Protected` **pointerOverItem**: [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[src/Renderer/GLViewport.ts:69](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L69)

___

### quad

• `Protected` **quad**: [`GLMesh`](Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[quad](Renderer_GLBaseViewport.GLBaseViewport#quad)

#### Defined in

[src/Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L32)

___

### region

• `Protected` **region**: `number`[]

#### Defined in

[src/Renderer/GLViewport.ts:59](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L59)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[renderer](Renderer_GLBaseViewport.GLBaseViewport#renderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:29](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L29)

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

[src/Renderer/GLViewport.ts:544](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L544)

___

### \_\_initRenderState

▸ `Private` **__initRenderState**(`renderstate`): `void`

The __initRenderState method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:856](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L856)

___

### \_\_updateProjectionMatrix

▸ **__updateProjectionMatrix**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:253](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L253)

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

[src/SceneTree/ParameterOwner.ts:134](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L134)

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

[src/SceneTree/ParameterOwner.ts:91](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L91)

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

[src/Renderer/GLViewport.ts:299](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L299)

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

[src/SceneTree/ParameterOwner.ts:315](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L315)

___

### draw

▸ **draw**(): `void`

The draw method.

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[draw](Renderer_GLBaseViewport.GLBaseViewport#draw)

#### Defined in

[src/Renderer/GLViewport.ts:879](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L879)

___

### drawHighlights

▸ `Private` **drawHighlights**(`renderstate`): `void`

Draws the highlights around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[drawHighlights](Renderer_GLBaseViewport.GLBaseViewport#drawhighlights)

#### Defined in

[src/Renderer/GLBaseViewport.ts:403](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L403)

___

### drawSilhouettes

▸ `Private` **drawSilhouettes**(`renderstate`): `void`

Draws the Silhouettes around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[drawSilhouettes](Renderer_GLBaseViewport.GLBaseViewport#drawsilhouettes)

#### Defined in

[src/Renderer/GLBaseViewport.ts:336](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L336)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L154)

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

[src/Renderer/GLViewport.ts:284](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L284)

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

[src/SceneTree/ParameterOwner.ts:240](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L240)

___

### getBl

▸ **getBl**(): [`Vec2`](../Math/Math_Vec2.Vec2)

The getBl method.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:123](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L123)

___

### getCamera

▸ **getCamera**(): [`Camera`](../SceneTree/SceneTree_Camera.Camera)

Returns current camera object

#### Returns

[`Camera`](../SceneTree/SceneTree_Camera.Camera)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:216](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L216)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L33)

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

[src/Renderer/GLViewport.ts:377](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L377)

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

[src/Renderer/GLViewport.ts:475](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L475)

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

[src/Renderer/GLBaseViewport.ts:154](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L154)

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

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L25)

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

[src/Renderer/GLBaseViewport.ts:454](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L454)

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

[src/SceneTree/ParameterOwner.ts:40](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L40)

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

[src/SceneTree/ParameterOwner.ts:101](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L101)

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

[src/SceneTree/ParameterOwner.ts:69](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L69)

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

[src/SceneTree/ParameterOwner.ts:59](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L59)

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

[src/SceneTree/ParameterOwner.ts:49](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L49)

___

### getPosX

▸ **getPosX**(): `number`

The getPosX method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:159](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L159)

___

### getPosY

▸ **getPosY**(): `number`

The getPosY method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:167](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L167)

___

### getProjectionMatrix

▸ **getProjectionMatrix**(): [`Mat4`](../Math/Math_Mat4.Mat4)

The getProjectionMatrix method.

#### Returns

[`Mat4`](../Math/Math_Mat4.Mat4)

- The return projection matrix for the viewport.

#### Defined in

[src/Renderer/GLViewport.ts:266](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L266)

___

### getTr

▸ **getTr**(): [`Vec2`](../Math/Math_Vec2.Vec2)

The getTr method.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:141](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L141)

___

### getViewMatrix

▸ **getViewMatrix**(): [`Mat4`](../Math/Math_Mat4.Mat4)

The getProjectionMatrix method.

#### Returns

[`Mat4`](../Math/Math_Mat4.Mat4)

- The return projection matrix for the viewport.

#### Defined in

[src/Renderer/GLViewport.ts:274](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L274)

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

[src/Renderer/GLBaseViewport.ts:146](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L146)

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

[src/SceneTree/ParameterOwner.ts:79](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L79)

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

[src/SceneTree/ParameterOwner.ts:148](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L148)

___

### invalidateGeomDataBuffer

▸ **invalidateGeomDataBuffer**(): `void`

The invalidateGeomDataBuffer method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:367](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L367)

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

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L97)

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

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L44)

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

[src/Renderer/GLViewport.ts:779](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L779)

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

[src/Renderer/GLViewport.ts:792](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L792)

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

[src/Renderer/GLBaseViewport.ts:525](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L525)

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

[src/Renderer/GLViewport.ts:563](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L563)

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

[src/Renderer/GLViewport.ts:749](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L749)

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

[src/Renderer/GLViewport.ts:764](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L764)

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

[src/Renderer/GLViewport.ts:674](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L674)

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

[src/Renderer/GLViewport.ts:628](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L628)

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

[src/Renderer/GLViewport.ts:830](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L830)

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

[src/Renderer/GLViewport.ts:805](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L805)

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

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L82)

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

[src/SceneTree/ParameterOwner.ts:123](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L123)

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

[src/Renderer/GLViewport.ts:554](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L554)

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
| `context` | [`AssetLoadContext`](../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[readBinary](Renderer_GLBaseViewport.GLBaseViewport#readbinary)

#### Defined in

[src/SceneTree/ParameterOwner.ts:275](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L275)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L134)

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

[src/SceneTree/ParameterOwner.ts:175](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L175)

___

### renderGeomDataFbo

▸ **renderGeomDataFbo**(): `void`

Renders the scene geometry to the viewport's geom data buffer
in preparation for mouse picking.

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:348](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L348)

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

[src/SceneTree/ParameterOwner.ts:197](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L197)

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

[src/Renderer/GLViewport.ts:177](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L177)

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

[src/Renderer/GLViewport.ts:199](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L199)

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

[src/Renderer/GLViewport.ts:131](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L131)

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

[src/Renderer/GLViewport.ts:225](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L225)

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

[src/Renderer/GLBaseViewport.ts:462](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLBaseViewport.ts#L462)

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

[src/Renderer/GLViewport.ts:149](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/GLViewport.ts#L149)

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

[src/SceneTree/ParameterOwner.ts:217](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L217)

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

[src/SceneTree/ParameterOwner.ts:302](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L302)

