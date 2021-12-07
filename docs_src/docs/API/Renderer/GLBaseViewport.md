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

  ↳↳ [`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)

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

[Renderer/GLBaseViewport.ts:63](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L63)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L45)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L36)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L35)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Defined in

[Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L41)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Defined in

[Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L40)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:29](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L29)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/GLBaseViewport.ts:26](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L26)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Defined in

[Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L39)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[__id](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Defined in

[Renderer/GLBaseViewport.ts:28](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L28)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Defined in

[Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L38)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Defined in

[Renderer/GLBaseViewport.ts:52](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L52)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `any`

#### Defined in

[Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L43)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L23)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L44)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Defined in

[Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L47)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L32)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Defined in

[Renderer/GLBaseViewport.ts:57](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L57)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L42)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L33)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Defined in

[Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L34)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[listeners](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: `any`

#### Defined in

[Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L46)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L31)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo) = `null`

#### Defined in

[Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L37)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[params](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L22)

___

### quad

• `Protected` **quad**: [`GLMesh`](Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Defined in

[Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L30)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Defined in

[Renderer/GLBaseViewport.ts:27](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L27)

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

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L133)

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

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L90)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[copyFrom](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L314)

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

#### Defined in

[Renderer/GLBaseViewport.ts:257](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L257)

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

#### Defined in

[Renderer/GLBaseViewport.ts:401](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L401)

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

#### Defined in

[Renderer/GLBaseViewport.ts:334](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L334)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L154)

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

[SceneTree/ParameterOwner.ts:239](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L239)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L33)

___

### getHeight

▸ **getHeight**(): `number`

The getHeight method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLBaseViewport.ts:152](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L152)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L25)

___

### getManipulator

▸ **getManipulator**(): [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

The getManipulator method.

#### Returns

[`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

- The return value.

#### Defined in

[Renderer/GLBaseViewport.ts:452](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L452)

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

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L39)

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

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L100)

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

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L68)

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

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L58)

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

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L48)

___

### getWidth

▸ **getWidth**(): `number`

The getWidth method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLBaseViewport.ts:144](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L144)

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

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L78)

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

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L147)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L44)

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

[Renderer/GLBaseViewport.ts:529](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L529)

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

[Renderer/GLBaseViewport.ts:535](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L535)

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

[Renderer/GLBaseViewport.ts:523](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L523)

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

[Renderer/GLBaseViewport.ts:479](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L479)

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

[Renderer/GLBaseViewport.ts:506](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L506)

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

[Renderer/GLBaseViewport.ts:515](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L515)

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

[Renderer/GLBaseViewport.ts:497](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L497)

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

[Renderer/GLBaseViewport.ts:488](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L488)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L82)

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

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L122)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[readBinary](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:274](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L274)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L134)

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

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L174)

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

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L196)

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

[Renderer/GLBaseViewport.ts:161](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L161)

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

[Renderer/GLBaseViewport.ts:178](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L178)

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

[Renderer/GLBaseViewport.ts:460](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/GLBaseViewport.ts#L460)

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

[SceneTree/ParameterOwner.ts:216](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L216)

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

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L301)

