---
id: "Renderer_VR_VRViewport.VRViewport"
title: "Class: VRViewport"
sidebar_label: "VRViewport"
custom_edit_url: null
---



This Viewport class is used for rendering stereoscopic views to VR controllers using the WebXR api.
 When the GLRenderer class detects a valid WebXF capable device is plugged in, this class is automatically
 instantiated ready for XR sessions

**Events**
* **presentingChanged:** Emitted when presenting is started or stopped
* **controllerAdded:** Emitted when a new XR controller is detected.
* **viewChanged:** Emitted during presentation each time the frame is rendered.
* **pointerDoublePressed:** Emitted when the user double clicks with an XR pointer.
* **pointerDown:** Emitted when the user presses an XR pointer
* **pointerUp:** Emitted when the user releases an XR pointer

## Hierarchy

- [`GLBaseViewport`](../Renderer_GLBaseViewport.GLBaseViewport)

  ↳ **`VRViewport`**

## Constructors

### constructor

• **new VRViewport**(`renderer`)

Create a VR viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | `any` | The renderer value. |

#### Overrides

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[constructor](../Renderer_GLBaseViewport.GLBaseViewport#constructor)

#### Defined in

[Renderer/VR/VRViewport.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L71)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[EXT_frag_depth](../Renderer_GLBaseViewport.GLBaseViewport#ext_frag_depth)

#### Defined in

[Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L46)

___

### \_\_backgroundColor

• `Protected` **\_\_backgroundColor**: [`Color`](../../Math/Math_Color.Color)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__backgroundColor](../Renderer_GLBaseViewport.GLBaseViewport#__backgroundcolor)

#### Defined in

[Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L30)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](../Renderer_GLHDRImage.GLHDRImage) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__backgroundGLTexture](../Renderer_GLBaseViewport.GLBaseViewport#__backgroundgltexture)

#### Defined in

[Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L37)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__backgroundTexture](../Renderer_GLBaseViewport.GLBaseViewport#__backgroundtexture)

#### Defined in

[Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L36)

___

### \_\_cameraMatrices

• `Protected` **\_\_cameraMatrices**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:66](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L66)

___

### \_\_canPresent

• `Protected` **\_\_canPresent**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:50](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L50)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__canvasHeight](../Renderer_GLBaseViewport.GLBaseViewport#__canvasheight)

#### Defined in

[Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L42)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__canvasWidth](../Renderer_GLBaseViewport.GLBaseViewport#__canvaswidth)

#### Defined in

[Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L41)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__fbo](../Renderer_GLBaseViewport.GLBaseViewport#__fbo)

#### Defined in

[Renderer/GLBaseViewport.ts:28](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L28)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__gl](../Renderer_GLBaseViewport.GLBaseViewport#__gl)

#### Defined in

[Renderer/GLBaseViewport.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L25)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__height](../Renderer_GLBaseViewport.GLBaseViewport#__height)

#### Defined in

[Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L40)

___

### \_\_hmd

• `Protected` **\_\_hmd**: `string` = `''`

#### Defined in

[Renderer/VR/VRViewport.ts:52](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L52)

___

### \_\_hmdAssetPromise

• `Protected` `Optional` **\_\_hmdAssetPromise**: `Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

#### Defined in

[Renderer/VR/VRViewport.ts:53](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L53)

___

### \_\_hmdCanvasSize

• `Protected` **\_\_hmdCanvasSize**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:64](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L64)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__id](../Renderer_GLBaseViewport.GLBaseViewport#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_leftProjectionMatrix

• `Protected` **\_\_leftProjectionMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L41)

___

### \_\_leftViewMatrix

• `Protected` **\_\_leftViewMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L40)

___

### \_\_ongoingPointers

• `Protected` **\_\_ongoingPointers**: `any`[]

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__ongoingPointers](../Renderer_GLBaseViewport.GLBaseViewport#__ongoingpointers)

#### Defined in

[Renderer/GLBaseViewport.ts:29](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L29)

___

### \_\_projectionMatrices

• `Protected` **\_\_projectionMatrices**: [`Mat4`](../../Math/Math_Mat4.Mat4)[] = `[]`

#### Defined in

[Renderer/VR/VRViewport.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L62)

___

### \_\_projectionMatricesUpdated

• `Protected` **\_\_projectionMatricesUpdated**: `boolean`

#### Defined in

[Renderer/VR/VRViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L30)

___

### \_\_refSpace

• `Protected` **\_\_refSpace**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:56](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L56)

___

### \_\_region

• `Protected` **\_\_region**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:54](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L54)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__renderer](../Renderer_GLBaseViewport.GLBaseViewport#__renderer)

#### Defined in

[Renderer/GLBaseViewport.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L27)

___

### \_\_rightProjectionMatrix

• `Protected` **\_\_rightProjectionMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L43)

___

### \_\_rightViewMatrix

• `Protected` **\_\_rightViewMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L42)

___

### \_\_stageMatrix

• `Protected` **\_\_stageMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L47)

___

### \_\_stageScale

• `Protected` **\_\_stageScale**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L48)

___

### \_\_stageTreeItem

• `Protected` **\_\_stageTreeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[Renderer/VR/VRViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L31)

___

### \_\_stageXfo

• `Protected` **\_\_stageXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[Renderer/VR/VRViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L45)

___

### \_\_viewMatrices

• `Protected` **\_\_viewMatrices**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:65](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L65)

___

### \_\_vrAsset

• `Protected` `Optional` **\_\_vrAsset**: [`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

#### Defined in

[Renderer/VR/VRViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L44)

___

### \_\_vrhead

• `Protected` **\_\_vrhead**: [`VRHead`](Renderer_VR_VRHead.VRHead)

#### Defined in

[Renderer/VR/VRViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L33)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__width](../Renderer_GLBaseViewport.GLBaseViewport#__width)

#### Defined in

[Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L39)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[backgroundColorParam](../Renderer_GLBaseViewport.GLBaseViewport#backgroundcolorparam)

#### Defined in

[Renderer/GLBaseViewport.ts:53](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L53)

___

### capturedElement

• `Protected` `Optional` **capturedElement**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[Renderer/VR/VRViewport.ts:61](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L61)

___

### capturedItem

• `Protected` **capturedItem**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L58)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `any`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[colorRenderbuffer](../Renderer_GLBaseViewport.GLBaseViewport#colorrenderbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L44)

___

### controllerPointerDownTime

• `Protected` **controllerPointerDownTime**: `any`[]

#### Defined in

[Renderer/VR/VRViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L36)

___

### controllers

• `Protected` **controllers**: `any`[]

#### Defined in

[Renderer/VR/VRViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L35)

___

### controllersMap

• `Protected` **controllersMap**: `Record`<`string`, `any`\>

#### Defined in

[Renderer/VR/VRViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L34)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[deprecatedParamMapping](../Renderer_GLBaseViewport.GLBaseViewport#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L23)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[depthBuffer](../Renderer_GLBaseViewport.GLBaseViewport#depthbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L45)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[depthRange](../Renderer_GLBaseViewport.GLBaseViewport#depthrange)

#### Defined in

[Renderer/GLBaseViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L48)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[depthTexture](../Renderer_GLBaseViewport.GLBaseViewport#depthtexture)

#### Defined in

[Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L33)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[doubleClickTimeParam](../Renderer_GLBaseViewport.GLBaseViewport#doubleclicktimeparam)

#### Defined in

[Renderer/GLBaseViewport.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L58)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[fb](../Renderer_GLBaseViewport.GLBaseViewport#fb)

#### Defined in

[Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L43)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBuffer](../Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L34)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBufferFbo](../Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbufferfbo)

#### Defined in

[Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L35)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[listeners](../Renderer_GLBaseViewport.GLBaseViewport#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: `any`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[manipulator](../Renderer_GLBaseViewport.GLBaseViewport#manipulator)

#### Defined in

[Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L47)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[offscreenBuffer](../Renderer_GLBaseViewport.GLBaseViewport#offscreenbuffer)

#### Defined in

[Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L32)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[offscreenBufferFbo](../Renderer_GLBaseViewport.GLBaseViewport#offscreenbufferfbo)

#### Defined in

[Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L38)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[paramEventListenerIDs](../Renderer_GLBaseViewport.GLBaseViewport#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[paramMapping](../Renderer_GLBaseViewport.GLBaseViewport#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[params](../Renderer_GLBaseViewport.GLBaseViewport#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L22)

___

### quad

• `Protected` **quad**: [`GLMesh`](../Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[quad](../Renderer_GLBaseViewport.GLBaseViewport#quad)

#### Defined in

[Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L31)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[renderer](../Renderer_GLBaseViewport.GLBaseViewport#renderer)

#### Defined in

[Renderer/GLBaseViewport.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L26)

___

### session

• `Protected` **session**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L49)

___

### spectatorMode

• `Protected` **spectatorMode**: `boolean`

#### Defined in

[Renderer/VR/VRViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L37)

___

### stroke

• `Protected` **stroke**: `any`

#### Defined in

[Renderer/VR/VRViewport.ts:59](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L59)

___

### tick

• `Protected` **tick**: `number`

#### Defined in

[Renderer/VR/VRViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L38)

## Methods

### \_\_startSession

▸ `Private` **__startSession**(): `void`

The __startSession method.

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:203](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L203)

___

### \_getOngoingPointerIndexById

▸ **_getOngoingPointerIndexById**(`pointerId`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerId` | `number` |

#### Returns

`number`

- index result of the find.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[_getOngoingPointerIndexById](../Renderer_GLBaseViewport.GLBaseViewport#_getongoingpointerindexbyid)

#### Defined in

[Renderer/GLBaseViewport.ts:568](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L568)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[addParameter](../Renderer_GLBaseViewport.GLBaseViewport#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L133)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[addParameterDeprecationMapping](../Renderer_GLBaseViewport.GLBaseViewport#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L90)

___

### canPresent

▸ **canPresent**(): `any`

The canPresent method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:168](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L168)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[copyFrom](../Renderer_GLBaseViewport.GLBaseViewport#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:312](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L312)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `ColorRenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[draw](../Renderer_GLBaseViewport.GLBaseViewport#draw)

#### Defined in

[Renderer/GLBaseViewport.ts:283](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L283)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[drawHighlights](../Renderer_GLBaseViewport.GLBaseViewport#drawhighlights)

#### Defined in

[Renderer/GLBaseViewport.ts:427](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L427)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[drawSilhouettes](../Renderer_GLBaseViewport.GLBaseViewport#drawsilhouettes)

#### Defined in

[Renderer/GLBaseViewport.ts:360](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L360)

___

### drawXRFrame

▸ **drawXRFrame**(`xrFrame`): `void`

The drawXRFrame method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrFrame` | `any` | The xrFrame value. |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:487](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L487)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[emit](../Renderer_GLBaseViewport.GLBaseViewport#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L154)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[fromJSON](../Renderer_GLBaseViewport.GLBaseViewport#fromjson)

#### Defined in

[SceneTree/ParameterOwner.ts:237](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L237)

___

### getAsset

▸ **getAsset**(): [`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

The getAsset method.

#### Returns

[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:113](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L113)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getClassName](../Renderer_GLBaseViewport.GLBaseViewport#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

___

### getControllers

▸ **getControllers**(): `any`[]

The getControllers method.

#### Returns

`any`[]

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:157](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L157)

___

### getHMDCanvasSize

▸ **getHMDCanvasSize**(): `any`

The getHMDCanvasSize method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:453](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L453)

___

### getHeight

▸ **getHeight**(): `number`

The getHeight method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getHeight](../Renderer_GLBaseViewport.GLBaseViewport#getheight)

#### Defined in

[Renderer/GLBaseViewport.ts:178](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L178)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getId](../Renderer_GLBaseViewport.GLBaseViewport#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

___

### getManipulator

▸ **getManipulator**(): [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

The getManipulator method.

#### Returns

[`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

- The return value.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getManipulator](../Renderer_GLBaseViewport.GLBaseViewport#getmanipulator)

#### Defined in

[Renderer/GLBaseViewport.ts:478](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L478)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getNumParameters](../Renderer_GLBaseViewport.GLBaseViewport#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L39)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getParameter](../Renderer_GLBaseViewport.GLBaseViewport#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getParameterByIndex](../Renderer_GLBaseViewport.GLBaseViewport#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L68)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getParameterIndex](../Renderer_GLBaseViewport.GLBaseViewport#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getParameters](../Renderer_GLBaseViewport.GLBaseViewport#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L48)

___

### getRenderer

▸ **getRenderer**(): [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

The getRenderer method.

#### Returns

[`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

- The return value.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getRenderer](../Renderer_GLBaseViewport.GLBaseViewport#getrenderer)

#### Defined in

[Renderer/GLBaseViewport.ts:162](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L162)

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:121](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L121)

___

### getVRHead

▸ **getVRHead**(): [`VRHead`](Renderer_VR_VRHead.VRHead)

The getVRHead method.

#### Returns

[`VRHead`](Renderer_VR_VRHead.VRHead)

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:129](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L129)

___

### getWidth

▸ **getWidth**(): `number`

The getWidth method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[getWidth](../Renderer_GLBaseViewport.GLBaseViewport#getwidth)

#### Defined in

[Renderer/GLBaseViewport.ts:170](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L170)

___

### getXfo

▸ **getXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:137](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L137)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[hasParameter](../Renderer_GLBaseViewport.GLBaseViewport#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L78)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[insertParameter](../Renderer_GLBaseViewport.GLBaseViewport#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L147)

___

### isPresenting

▸ **isPresenting**(): `any`

The isPresenting method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:176](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L176)

___

### loadHMDResources

▸ **loadHMDResources**(): `Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

The loadHMDResources method.

#### Returns

`Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

- The return value.

#### Defined in

[Renderer/VR/VRViewport.ts:217](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L217)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[off](../Renderer_GLBaseViewport.GLBaseViewport#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L97)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[on](../Renderer_GLBaseViewport.GLBaseViewport#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Invoked when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onKeyDown](../Renderer_GLBaseViewport.GLBaseViewport#onkeydown)

#### Defined in

[Renderer/GLBaseViewport.ts:555](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L555)

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Causes an event to occur  when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onKeyUp](../Renderer_GLBaseViewport.GLBaseViewport#onkeyup)

#### Defined in

[Renderer/GLBaseViewport.ts:561](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L561)

___

### onMouseLeave

▸ **onMouseLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onMouseLeave](../Renderer_GLBaseViewport.GLBaseViewport#onmouseleave)

#### Defined in

[Renderer/GLBaseViewport.ts:549](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L549)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Handler of the `pointerdown` event fired when the pointer device is initially pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The DOM event produced by a pointer |

#### Returns

`void`

#### Overrides

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerDown](../Renderer_GLBaseViewport.GLBaseViewport#onpointerdown)

#### Defined in

[Renderer/VR/VRViewport.ts:632](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L632)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Invoked when the mouse pointer is moved into this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerEnter](../Renderer_GLBaseViewport.GLBaseViewport#onpointerenter)

#### Defined in

[Renderer/GLBaseViewport.ts:532](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L532)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerLeave](../Renderer_GLBaseViewport.GLBaseViewport#onpointerleave)

#### Defined in

[Renderer/GLBaseViewport.ts:541](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L541)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerMove](../Renderer_GLBaseViewport.GLBaseViewport#onpointermove)

#### Defined in

[Renderer/GLBaseViewport.ts:523](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L523)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Causes an event to occur when a user releases a mouse button over a element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerUp](../Renderer_GLBaseViewport.GLBaseViewport#onpointerup)

#### Defined in

[Renderer/VR/VRViewport.ts:678](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L678)

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
| `listener` | (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[once](../Renderer_GLBaseViewport.GLBaseViewport#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L82)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[parameterValueChanged](../Renderer_GLBaseViewport.GLBaseViewport#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L122)

___

### preparePointerEvent

▸ `Private` **preparePointerEvent**(`event`): `void`

Prepares pointer event by adding properties of the engine to it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event that occurs in the canvas |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:605](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L605)

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
| `reader` | [`BinReader`](../../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[readBinary](../Renderer_GLBaseViewport.GLBaseViewport#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:272](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L272)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[removeListenerById](../Renderer_GLBaseViewport.GLBaseViewport#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[removeParameter](../Renderer_GLBaseViewport.GLBaseViewport#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L174)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[replaceParameter](../Renderer_GLBaseViewport.GLBaseViewport#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L196)

___

### resize

▸ **resize**(`canvasWidth`, `canvasHeight`): `void`

The resize method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvasWidth` | `number` | The canvasWidth value. |
| `canvasHeight` | `number` | The canvasHeight value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[resize](../Renderer_GLBaseViewport.GLBaseViewport#resize)

#### Defined in

[Renderer/GLBaseViewport.ts:187](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L187)

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

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[resizeRenderTargets](../Renderer_GLBaseViewport.GLBaseViewport#resizerendertargets)

#### Defined in

[Renderer/GLBaseViewport.ts:204](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L204)

___

### setManipulator

▸ **setManipulator**(`tool`): `void`

Sets the tool that will receive mouse, touch and keyboard events from the viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) | The manipulator value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[setManipulator](../Renderer_GLBaseViewport.GLBaseViewport#setmanipulator)

#### Defined in

[Renderer/GLBaseViewport.ts:486](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/GLBaseViewport.ts#L486)

___

### setSpectatorMode

▸ **setSpectatorMode**(`state`): `void`

Turns on and off the spectator mode.
Note: specator mode renders the scene an extra time to our regular viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `boolean` | true for enabling spectator mode, else false |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:185](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L185)

___

### setXfo

▸ **setXfo**(`xfo`): `void`

The setXfo method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) | The xfo value. |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:145](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L145)

___

### startPresenting

▸ **startPresenting**(): `Promise`<`void`\>

The startPresenting method.

#### Returns

`Promise`<`void`\>

#### Defined in

[Renderer/VR/VRViewport.ts:280](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L280)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:435](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L435)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[toJSON](../Renderer_GLBaseViewport.GLBaseViewport#tojson)

#### Defined in

[SceneTree/ParameterOwner.ts:216](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L216)

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

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[toString](../Renderer_GLBaseViewport.GLBaseViewport#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:299](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L299)

___

### togglePresenting

▸ **togglePresenting**(): `void`

The togglePresenting method.

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:444](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L444)

___

### updateControllers

▸ **updateControllers**(`xrFrame`, `event`): `void`

The updateControllers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrFrame` | `any` | The xrFrame value. |
| `event` | `Record`<`string`, `any`\> | The pose changed event object that will be emitted for observers such as collab. |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRViewport.ts:465](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRViewport.ts#L465)

