---
id: "Renderer_GLBaseViewport.GLBaseViewport"
title: "Class: GLBaseViewport"
sidebar_label: "GLBaseViewport"
custom_edit_url: null
---



Class representing a GL base viewport.

## Hierarchy

- [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner)

  ↳ **`GLBaseViewport`**

  ↳↳ [`GLViewport`](Renderer_GLViewport.GLViewport)

  ↳↳ [`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)

## Constructors

### constructor

• **new GLBaseViewport**(`renderer`)

Create a GL base viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLRenderer`](Renderer_GLRenderer.GLRenderer) | The renderer value. |

#### Overrides

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[constructor](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#constructor)

#### Defined in

[src/Renderer/GLBaseViewport.ts:65](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L65)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L47)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L38)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L37)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Defined in

[src/Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L43)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Defined in

[src/Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L42)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L31)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLBaseViewport.ts:28](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L28)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Defined in

[src/Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L41)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[__id](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L30)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Defined in

[src/Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L40)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Defined in

[src/Renderer/GLBaseViewport.ts:54](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L54)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `any`

#### Defined in

[src/Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L45)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L25)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L46)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Defined in

[src/Renderer/GLBaseViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L49)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L34)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Defined in

[src/Renderer/GLBaseViewport.ts:59](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L59)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L44)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[src/Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L35)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L36)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[listeners](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: `any`

#### Defined in

[src/Renderer/GLBaseViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L48)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L33)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo) = `null`

#### Defined in

[src/Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L39)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[params](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L24)

___

### quad

• `Protected` **quad**: [`GLMesh`](Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Defined in

[src/Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L32)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:29](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L29)

## Methods

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L135)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameterDeprecationMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L92)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../SceneTree/SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[copyFrom](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L316)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`ColorRenderState`](types/Renderer_types_renderer.ColorRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:259](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L259)

___

### drawHighlights

▸ `Private` **drawHighlights**(`renderstate`): `void`

Draws the highlights around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:403](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L403)

___

### drawSilhouettes

▸ `Private` **drawSilhouettes**(`renderstate`): `void`

Draws the Silhouettes around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:336](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L336)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[emit](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L154)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[fromJSON](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L241)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getClassName](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L33)

___

### getHeight

▸ **getHeight**(): `number`

The getHeight method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLBaseViewport.ts:154](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L154)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getId](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L25)

___

### getManipulator

▸ **getManipulator**(): [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

The getManipulator method.

#### Returns

[`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

- The return value.

#### Defined in

[src/Renderer/GLBaseViewport.ts:454](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L454)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getNumParameters](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L41)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L102)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterByIndex](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L70)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterIndex](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameters](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L50)

___

### getWidth

▸ **getWidth**(): `number`

The getWidth method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLBaseViewport.ts:146](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L146)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[hasParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L80)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[insertParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L149)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[off](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L97)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[on](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Invoked when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:531](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L531)

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

#### Defined in

[src/Renderer/GLBaseViewport.ts:537](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L537)

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

#### Defined in

[src/Renderer/GLBaseViewport.ts:525](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L525)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Handler of the `pointerdown` event fired when the pointer device is initially pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:481](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L481)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Invoked when the mouse pointer is moved into this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:508](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L508)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:517](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L517)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:499](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L499)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Handler of the `pointerup` event fired when the pointer device is finally released.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseViewport.ts:490](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L490)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[once](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L82)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[parameterValueChanged](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L124)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[readBinary](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#readbinary)

#### Defined in

[src/SceneTree/ParameterOwner.ts:276](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L276)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeListenerById](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L134)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L176)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[replaceParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L198)

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

#### Defined in

[src/Renderer/GLBaseViewport.ts:163](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L163)

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

#### Defined in

[src/Renderer/GLBaseViewport.ts:180](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L180)

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

#### Defined in

[src/Renderer/GLBaseViewport.ts:462](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Renderer/GLBaseViewport.ts#L462)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toJSON](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tojson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:218](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L218)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toString](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/ParameterOwner.ts#L303)

