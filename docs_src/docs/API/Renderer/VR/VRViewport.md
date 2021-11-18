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

Renderer/VR/VRViewport.ts:73

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[EXT_frag_depth](../Renderer_GLBaseViewport.GLBaseViewport#ext_frag_depth)

#### Defined in

Renderer/GLBaseViewport.ts:45

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](../Renderer_GLHDRImage.GLHDRImage) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__backgroundGLTexture](../Renderer_GLBaseViewport.GLBaseViewport#__backgroundgltexture)

#### Defined in

Renderer/GLBaseViewport.ts:36

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__backgroundTexture](../Renderer_GLBaseViewport.GLBaseViewport#__backgroundtexture)

#### Defined in

Renderer/GLBaseViewport.ts:35

___

### \_\_cameraMatrices

• `Protected` **\_\_cameraMatrices**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:68

___

### \_\_canPresent

• `Protected` **\_\_canPresent**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:52

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__canvasHeight](../Renderer_GLBaseViewport.GLBaseViewport#__canvasheight)

#### Defined in

Renderer/GLBaseViewport.ts:41

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__canvasWidth](../Renderer_GLBaseViewport.GLBaseViewport#__canvaswidth)

#### Defined in

Renderer/GLBaseViewport.ts:40

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__fbo](../Renderer_GLBaseViewport.GLBaseViewport#__fbo)

#### Defined in

Renderer/GLBaseViewport.ts:29

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__gl](../Renderer_GLBaseViewport.GLBaseViewport#__gl)

#### Defined in

Renderer/GLBaseViewport.ts:26

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__height](../Renderer_GLBaseViewport.GLBaseViewport#__height)

#### Defined in

Renderer/GLBaseViewport.ts:39

___

### \_\_hmd

• `Protected` **\_\_hmd**: `string` = `''`

#### Defined in

Renderer/VR/VRViewport.ts:54

___

### \_\_hmdAssetPromise

• `Protected` `Optional` **\_\_hmdAssetPromise**: `Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

#### Defined in

Renderer/VR/VRViewport.ts:55

___

### \_\_hmdCanvasSize

• `Protected` **\_\_hmdCanvasSize**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:66

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__id](../Renderer_GLBaseViewport.GLBaseViewport#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### \_\_leftProjectionMatrix

• `Protected` **\_\_leftProjectionMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

Renderer/VR/VRViewport.ts:43

___

### \_\_leftViewMatrix

• `Protected` **\_\_leftViewMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

Renderer/VR/VRViewport.ts:42

___

### \_\_projectionMatrices

• `Protected` **\_\_projectionMatrices**: [`Mat4`](../../Math/Math_Mat4.Mat4)[] = `[]`

#### Defined in

Renderer/VR/VRViewport.ts:64

___

### \_\_projectionMatricesUpdated

• `Protected` **\_\_projectionMatricesUpdated**: `boolean`

#### Defined in

Renderer/VR/VRViewport.ts:32

___

### \_\_refSpace

• `Protected` **\_\_refSpace**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:58

___

### \_\_region

• `Protected` **\_\_region**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:56

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__renderer](../Renderer_GLBaseViewport.GLBaseViewport#__renderer)

#### Defined in

Renderer/GLBaseViewport.ts:28

___

### \_\_rightProjectionMatrix

• `Protected` **\_\_rightProjectionMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

Renderer/VR/VRViewport.ts:45

___

### \_\_rightViewMatrix

• `Protected` **\_\_rightViewMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

Renderer/VR/VRViewport.ts:44

___

### \_\_stageMatrix

• `Protected` **\_\_stageMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

Renderer/VR/VRViewport.ts:49

___

### \_\_stageScale

• `Protected` **\_\_stageScale**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:50

___

### \_\_stageTreeItem

• `Protected` **\_\_stageTreeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

Renderer/VR/VRViewport.ts:33

___

### \_\_stageXfo

• `Protected` **\_\_stageXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

Renderer/VR/VRViewport.ts:47

___

### \_\_viewMatrices

• `Protected` **\_\_viewMatrices**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:67

___

### \_\_vrAsset

• `Protected` `Optional` **\_\_vrAsset**: [`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

#### Defined in

Renderer/VR/VRViewport.ts:46

___

### \_\_vrhead

• `Protected` **\_\_vrhead**: [`VRHead`](Renderer_VR_VRHead.VRHead)

#### Defined in

Renderer/VR/VRViewport.ts:35

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[__width](../Renderer_GLBaseViewport.GLBaseViewport#__width)

#### Defined in

Renderer/GLBaseViewport.ts:38

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[backgroundColorParam](../Renderer_GLBaseViewport.GLBaseViewport#backgroundcolorparam)

#### Defined in

Renderer/GLBaseViewport.ts:52

___

### capturedElement

• `Protected` `Optional` **capturedElement**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

Renderer/VR/VRViewport.ts:63

___

### capturedItem

• `Protected` **capturedItem**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:60

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `any`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[colorRenderbuffer](../Renderer_GLBaseViewport.GLBaseViewport#colorrenderbuffer)

#### Defined in

Renderer/GLBaseViewport.ts:43

___

### controllerPointerDownTime

• `Protected` **controllerPointerDownTime**: `number`[]

#### Defined in

Renderer/VR/VRViewport.ts:38

___

### controllers

• `Protected` **controllers**: [`VRController`](Renderer_VR_VRController.VRController)[]

#### Defined in

Renderer/VR/VRViewport.ts:37

___

### controllersMap

• `Protected` **controllersMap**: `Record`<`string`, [`VRController`](Renderer_VR_VRController.VRController)\>

#### Defined in

Renderer/VR/VRViewport.ts:36

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[deprecatedParamMapping](../Renderer_GLBaseViewport.GLBaseViewport#deprecatedparammapping)

#### Defined in

SceneTree/ParameterOwner.ts:23

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[depthBuffer](../Renderer_GLBaseViewport.GLBaseViewport#depthbuffer)

#### Defined in

Renderer/GLBaseViewport.ts:44

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[depthRange](../Renderer_GLBaseViewport.GLBaseViewport#depthrange)

#### Defined in

Renderer/GLBaseViewport.ts:47

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[depthTexture](../Renderer_GLBaseViewport.GLBaseViewport#depthtexture)

#### Defined in

Renderer/GLBaseViewport.ts:32

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[doubleClickTimeParam](../Renderer_GLBaseViewport.GLBaseViewport#doubleclicktimeparam)

#### Defined in

Renderer/GLBaseViewport.ts:57

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[fb](../Renderer_GLBaseViewport.GLBaseViewport#fb)

#### Defined in

Renderer/GLBaseViewport.ts:42

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBuffer](../Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbuffer)

#### Defined in

Renderer/GLBaseViewport.ts:33

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBufferFbo](../Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbufferfbo)

#### Defined in

Renderer/GLBaseViewport.ts:34

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[listeners](../Renderer_GLBaseViewport.GLBaseViewport#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### manipulator

• `Protected` **manipulator**: `any`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[manipulator](../Renderer_GLBaseViewport.GLBaseViewport#manipulator)

#### Defined in

Renderer/GLBaseViewport.ts:46

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[offscreenBuffer](../Renderer_GLBaseViewport.GLBaseViewport#offscreenbuffer)

#### Defined in

Renderer/GLBaseViewport.ts:31

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo) = `null`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[offscreenBufferFbo](../Renderer_GLBaseViewport.GLBaseViewport#offscreenbufferfbo)

#### Defined in

Renderer/GLBaseViewport.ts:37

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[paramEventListenerIDs](../Renderer_GLBaseViewport.GLBaseViewport#parameventlistenerids)

#### Defined in

SceneTree/ParameterOwner.ts:20

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[paramMapping](../Renderer_GLBaseViewport.GLBaseViewport#parammapping)

#### Defined in

SceneTree/ParameterOwner.ts:21

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[params](../Renderer_GLBaseViewport.GLBaseViewport#params)

#### Defined in

SceneTree/ParameterOwner.ts:22

___

### quad

• `Protected` **quad**: [`GLMesh`](../Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[quad](../Renderer_GLBaseViewport.GLBaseViewport#quad)

#### Defined in

Renderer/GLBaseViewport.ts:30

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[renderer](../Renderer_GLBaseViewport.GLBaseViewport#renderer)

#### Defined in

Renderer/GLBaseViewport.ts:27

___

### session

• `Protected` **session**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:51

___

### spectatorMode

• `Protected` **spectatorMode**: `boolean`

#### Defined in

Renderer/VR/VRViewport.ts:39

___

### stroke

• `Protected` **stroke**: `any`

#### Defined in

Renderer/VR/VRViewport.ts:61

___

### tick

• `Protected` **tick**: `number`

#### Defined in

Renderer/VR/VRViewport.ts:40

## Methods

### \_\_startSession

▸ `Private` **__startSession**(): `void`

The __startSession method.

#### Returns

`void`

#### Defined in

Renderer/VR/VRViewport.ts:209

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

SceneTree/ParameterOwner.ts:133

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

SceneTree/ParameterOwner.ts:90

___

### canPresent

▸ **canPresent**(): `any`

The canPresent method.

#### Returns

`any`

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:174

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

SceneTree/ParameterOwner.ts:314

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

Renderer/GLBaseViewport.ts:257

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

Renderer/GLBaseViewport.ts:401

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

Renderer/GLBaseViewport.ts:334

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

Renderer/VR/VRViewport.ts:486

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

Utilities/EventEmitter.ts:154

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

SceneTree/ParameterOwner.ts:239

___

### getAsset

▸ **getAsset**(): [`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

The getAsset method.

#### Returns

[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:119

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

Utilities/BaseClass.ts:33

___

### getControllers

▸ **getControllers**(): [`VRController`](Renderer_VR_VRController.VRController)[]

The getControllers method.

#### Returns

[`VRController`](Renderer_VR_VRController.VRController)[]

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:163

___

### getHMDCanvasSize

▸ **getHMDCanvasSize**(): `any`

The getHMDCanvasSize method.

#### Returns

`any`

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:452

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

Renderer/GLBaseViewport.ts:152

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

Utilities/BaseClass.ts:25

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

Renderer/GLBaseViewport.ts:452

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

SceneTree/ParameterOwner.ts:39

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

SceneTree/ParameterOwner.ts:100

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

SceneTree/ParameterOwner.ts:68

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

SceneTree/ParameterOwner.ts:58

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

SceneTree/ParameterOwner.ts:48

___

### getRenderer

▸ **getRenderer**(): [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Returns

[`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Defined in

Renderer/VR/VRViewport.ts:111

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:127

___

### getVRHead

▸ **getVRHead**(): [`VRHead`](Renderer_VR_VRHead.VRHead)

The getVRHead method.

#### Returns

[`VRHead`](Renderer_VR_VRHead.VRHead)

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:135

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

Renderer/GLBaseViewport.ts:144

___

### getXfo

▸ **getXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:143

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

SceneTree/ParameterOwner.ts:78

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

SceneTree/ParameterOwner.ts:147

___

### isPresenting

▸ **isPresenting**(): `any`

The isPresenting method.

#### Returns

`any`

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:182

___

### loadHMDResources

▸ **loadHMDResources**(): `Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

The loadHMDResources method.

#### Returns

`Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

- The return value.

#### Defined in

Renderer/VR/VRViewport.ts:223

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

Utilities/EventEmitter.ts:97

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

Utilities/EventEmitter.ts:44

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Invoked when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onKeyDown](../Renderer_GLBaseViewport.GLBaseViewport#onkeydown)

#### Defined in

Renderer/GLBaseViewport.ts:529

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Causes an event to occur  when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onKeyUp](../Renderer_GLBaseViewport.GLBaseViewport#onkeyup)

#### Defined in

Renderer/GLBaseViewport.ts:535

___

### onMouseLeave

▸ **onMouseLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onMouseLeave](../Renderer_GLBaseViewport.GLBaseViewport#onmouseleave)

#### Defined in

Renderer/GLBaseViewport.ts:523

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Handler of the `pointerdown` event fired when the pointer device is initially pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Overrides

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerDown](../Renderer_GLBaseViewport.GLBaseViewport#onpointerdown)

#### Defined in

Renderer/VR/VRViewport.ts:602

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Invoked when the mouse pointer is moved into this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerEnter](../Renderer_GLBaseViewport.GLBaseViewport#onpointerenter)

#### Defined in

Renderer/GLBaseViewport.ts:506

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerLeave](../Renderer_GLBaseViewport.GLBaseViewport#onpointerleave)

#### Defined in

Renderer/GLBaseViewport.ts:515

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerMove](../Renderer_GLBaseViewport.GLBaseViewport#onpointermove)

#### Defined in

Renderer/GLBaseViewport.ts:497

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Causes an event to occur when a user releases a mouse button over a element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](../Renderer_GLBaseViewport.GLBaseViewport).[onPointerUp](../Renderer_GLBaseViewport.GLBaseViewport#onpointerup)

#### Defined in

Renderer/VR/VRViewport.ts:647

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

Utilities/EventEmitter.ts:82

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

SceneTree/ParameterOwner.ts:122

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

SceneTree/ParameterOwner.ts:274

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

Utilities/EventEmitter.ts:134

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

SceneTree/ParameterOwner.ts:174

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

SceneTree/ParameterOwner.ts:196

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

Renderer/GLBaseViewport.ts:161

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

Renderer/GLBaseViewport.ts:178

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

Renderer/GLBaseViewport.ts:460

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

Renderer/VR/VRViewport.ts:191

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

Renderer/VR/VRViewport.ts:151

___

### startPresenting

▸ **startPresenting**(): `Promise`<`void`\>

The startPresenting method.

#### Returns

`Promise`<`void`\>

#### Defined in

Renderer/VR/VRViewport.ts:286

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Defined in

Renderer/VR/VRViewport.ts:434

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

SceneTree/ParameterOwner.ts:216

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

SceneTree/ParameterOwner.ts:301

___

### togglePresenting

▸ **togglePresenting**(): `void`

The togglePresenting method.

#### Returns

`void`

#### Defined in

Renderer/VR/VRViewport.ts:443

___

### updateControllers

▸ **updateControllers**(`xrFrame`, `event`): `void`

The updateControllers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrFrame` | `any` | The xrFrame value. |
| `event` | [`XRPoseEvent`](../../Utilities/Events/Utilities_Events_XRPoseEvent.XRPoseEvent) | The pose changed event object that will be emitted for observers such as collab. |

#### Returns

`void`

#### Defined in

Renderer/VR/VRViewport.ts:464

