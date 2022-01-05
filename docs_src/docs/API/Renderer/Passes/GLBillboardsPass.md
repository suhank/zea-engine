---
id: "Renderer_Passes_GLBillboardsPass.GLBillboardsPass"
title: "Class: GLBillboardsPass"
sidebar_label: "GLBillboardsPass"
custom_edit_url: null
---



Class representing a GL billboards pass.

## Hierarchy

- [`GLPass`](Renderer_Passes_GLPass.GLPass)

  ↳ **`GLBillboardsPass`**

## Constructors

### constructor

• **new GLBillboardsPass**()

Create a GL billboards pass.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[constructor](Renderer_Passes_GLPass.GLPass#constructor)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:48](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L48)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) = `null`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[__gl](Renderer_Passes_GLPass.GLPass#__gl)

#### Defined in

[src/Renderer/Passes/GLPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L22)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[__id](Renderer_Passes_GLPass.GLPass#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[__renderer](Renderer_Passes_GLPass.GLPass#__renderer)

#### Defined in

[src/Renderer/Passes/GLPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L24)

___

### atlas

• `Protected` **atlas**: [`GLImageAtlas`](../Renderer_GLImageAtlas.GLImageAtlas) = `null`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:29](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L29)

___

### billboardDataArray

• `Protected` **billboardDataArray**: `any`[][] = `[]`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:40](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L40)

___

### billboards

• `Protected` **billboards**: `any`[]

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L22)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[deprecatedParamMapping](Renderer_Passes_GLPass.GLPass#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L25)

___

### dirtyBillboards

• `Protected` **dirtyBillboards**: `Set`<`any`\>

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:23](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L23)

___

### drawCount

• `Protected` **drawCount**: `number`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:25](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L25)

___

### drawItemsTexture

• `Protected` **drawItemsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:44](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L44)

___

### enabled

• **enabled**: `boolean` = `true`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[enabled](Renderer_Passes_GLPass.GLPass#enabled)

#### Defined in

[src/Renderer/Passes/GLPass.ts:19](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L19)

___

### enabledParam

• **enabledParam**: [`BooleanParameter`](../../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[enabledParam](Renderer_Passes_GLPass.GLPass#enabledparam)

#### Defined in

[src/Renderer/Passes/GLPass.ts:26](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L26)

___

### freeIndices

• `Protected` **freeIndices**: `number`[]

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L24)

___

### glshader

• `Protected` **glshader**: [`GLShader`](../Renderer_GLShader.GLShader) = `null`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:34](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L34)

___

### indexArray

• `Protected` **indexArray**: `Float32Array`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:32](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L32)

___

### indexArrayUpdateNeeded

• `Protected` **indexArrayUpdateNeeded**: `boolean` = `false`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:30](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L30)

___

### instanceIdsBuffer

• `Protected` **instanceIdsBuffer**: `WebGLBuffer` = `null`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:31](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L31)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[listeners](Renderer_Passes_GLPass.GLPass#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L26)

___

### modelMatrixArray

• `Protected` **modelMatrixArray**: `Float32Array`[] = `[]`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:39](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L39)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[paramEventListenerIDs](Renderer_Passes_GLPass.GLPass#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[paramMapping](Renderer_Passes_GLPass.GLPass#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[params](Renderer_Passes_GLPass.GLPass#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L24)

___

### passIndex

• `Protected` **passIndex**: `number` = `-1`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[passIndex](Renderer_Passes_GLPass.GLPass#passindex)

#### Defined in

[src/Renderer/Passes/GLPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L20)

___

### prevSortCameraPos

• `Protected` **prevSortCameraPos**: [`Vec3`](../../Math/Math_Vec3.Vec3)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:28](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L28)

___

### renderer

• **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[renderer](Renderer_Passes_GLPass.GLPass#renderer)

#### Defined in

[src/Renderer/Passes/GLPass.ts:23](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L23)

___

### shaderBinding

• `Protected` **shaderBinding**: [`IGeomShaderBinding`](../Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:37](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L37)

___

### shaderComp

• `Protected` **shaderComp**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:35](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L35)

___

### threshold

• `Protected` **threshold**: `number`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:26](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L26)

___

### tintColorArray

• `Protected` **tintColorArray**: `number`[][] = `[]`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:41](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L41)

___

### updateRequested

• `Protected` **updateRequested**: `boolean`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:27](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L27)

___

### width

• `Protected` **width**: `number` = `0`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:43](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L43)

## Methods

### \_\_draw

▸ **__draw**(`renderstate`, `key`): `void`

Invoke the drawing of each item, compiling the shader using the provided key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `key` | `string` | The key to cache the compiler results against. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:473](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L473)

___

### addBillboard

▸ **addBillboard**(`billboard`): `void`

The addBillboard method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `billboard` | `any` | The billboard value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:131](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L131)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[addParameter](Renderer_Passes_GLPass.GLPass#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L135)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[addParameterDeprecationMapping](Renderer_Passes_GLPass.GLPass#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L92)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../../SceneTree/SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[copyFrom](Renderer_Passes_GLPass.GLPass#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L316)

___

### draw

▸ **draw**(`renderstate`): `void`

The sort method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[draw](Renderer_Passes_GLPass.GLPass#draw)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:534](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L534)

___

### drawGeomData

▸ **drawGeomData**(`renderstate`): `void`

The drawGeomData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`GeomDataRenderState`](../types/Renderer_types_renderer.GeomDataRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[drawGeomData](Renderer_Passes_GLPass.GLPass#drawgeata)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:598](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L598)

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[drawHighlightedGeoms](Renderer_Passes_GLPass.GLPass#drawhighlightedgeoms)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:589](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L589)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[emit](Renderer_Passes_GLPass.GLPass#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L154)

___

### filterRenderTree

▸ **filterRenderTree**(): `void`

The filterRenderTree method.

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:125](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L125)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[fromJSON](Renderer_Passes_GLPass.GLPass#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L241)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[getClassName](Renderer_Passes_GLPass.GLPass#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/BaseClass.ts#L33)

___

### getGeomItemAndDist

▸ **getGeomItemAndDist**(`geomData`): [`GeomItemAndDist`](../../Utilities/Utilities_IntersectionData.GeomItemAndDist)

The getGeomItemAndDist method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomData` | `Float32Array` \| `Uint8Array` | The geomData value. |

#### Returns

[`GeomItemAndDist`](../../Utilities/Utilities_IntersectionData.GeomItemAndDist)

- The return value.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[getGeomItemAndDist](Renderer_Passes_GLPass.GLPass#getgeomitemanddist)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:608](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L608)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[getId](Renderer_Passes_GLPass.GLPass#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/BaseClass.ts#L25)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[getNumParameters](Renderer_Passes_GLPass.GLPass#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L41)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[getParameter](Renderer_Passes_GLPass.GLPass#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L102)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[getParameterByIndex](Renderer_Passes_GLPass.GLPass#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L70)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[getParameterIndex](Renderer_Passes_GLPass.GLPass#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[getParameters](Renderer_Passes_GLPass.GLPass#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L50)

___

### getPassType

▸ **getPassType**(): `number`

Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.

#### Returns

`number`

- The pass type value.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[getPassType](Renderer_Passes_GLPass.GLPass#getpasstype)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:82](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L82)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[hasParameter](Renderer_Passes_GLPass.GLPass#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L80)

___

### init

▸ **init**(`renderer`, `passIndex`): `void`

The init method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer value. |
| `passIndex` | `number` | The index of the pass in the GLBAseRenderer |

#### Returns

`void`

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[init](Renderer_Passes_GLPass.GLPass#init)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:66](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L66)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[insertParameter](Renderer_Passes_GLPass.GLPass#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L149)

___

### itemAddedToScene

▸ **itemAddedToScene**(`treeItem`, `rargs`): `boolean`

The itemAddedToScene method is called on each pass when a new item
is added to the scene, and the renderer must decide how to render it.
It allows Passes to select geometries to handle the drawing of.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) | The treeItem value. |
| `rargs` | `Record`<`string`, `any`\> | Extra return values are passed back in this object. The object contains a parameter 'continueInSubTree', which can be set to false, so the subtree of this node will not be traversed after this node is handled. |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[itemAddedToScene](Renderer_Passes_GLPass.GLPass#itemaddedtoscene)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:96](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L96)

___

### itemRemovedFromScene

▸ **itemRemovedFromScene**(`treeItem`, `rargs`): `boolean`

The itemRemovedFromScene method is called on each pass when aa item
is removed to the scene, and the pass must handle cleaning up any resources.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) | The treeItem value. |
| `rargs` | `Record`<`string`, `any`\> | Extra return values are passed back in this object. |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[itemRemovedFromScene](Renderer_Passes_GLPass.GLPass#itemremovedfromscene)

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:111](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L111)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[off](Renderer_Passes_GLPass.GLPass#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L97)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[on](Renderer_Passes_GLPass.GLPass#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L44)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[once](Renderer_Passes_GLPass.GLPass#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

The __parameterValueChanged method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event object. |

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[parameterValueChanged](Renderer_Passes_GLPass.GLPass#parametervaluechanged)

#### Defined in

[src/Renderer/Passes/GLPass.ts:44](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L44)

___

### populateBillboardDataArray

▸ `Private` **populateBillboardDataArray**(`billboardData`, `index`, `dataArray`): `void`

The populateBillboardDataArray method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `billboardData` | `any` | The billboardData value. |
| `index` | `number` | The index value. |
| `dataArray` | `any` | The dataArray value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:221](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L221)

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
| `context` | [`AssetLoadContext`](../../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[readBinary](Renderer_Passes_GLPass.GLPass#readbinary)

#### Defined in

[src/SceneTree/ParameterOwner.ts:276](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L276)

___

### removeBillboard

▸ **removeBillboard**(`billboard`): `void`

The removeBillboard method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `billboard` | `any` | The billboard value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:183](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L183)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[removeListenerById](Renderer_Passes_GLPass.GLPass#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L134)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[removeParameter](Renderer_Passes_GLPass.GLPass#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L176)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[replaceParameter](Renderer_Passes_GLPass.GLPass#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L198)

___

### reqUpdateIndexArray

▸ `Private` **reqUpdateIndexArray**(): `void`

The reqUpdateIndexArray method.

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:276](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L276)

___

### requestUpdate

▸ `Private` **requestUpdate**(): `void`

The requestUpdate method.

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:265](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L265)

___

### setPassIndex

▸ **setPassIndex**(`passIndex`): `void`

The setPassIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `passIndex` | `number` | The index of the pass in the GLBAseRenderer |

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[setPassIndex](Renderer_Passes_GLPass.GLPass#setpassindex)

#### Defined in

[src/Renderer/Passes/GLPass.ts:67](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L67)

___

### sort

▸ **sort**(`cameraPos`): `void`

The sort method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cameraPos` | `any` | The cameraPos value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:443](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L443)

___

### startPresenting

▸ **startPresenting**(): `void`

The startPresenting method.

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[startPresenting](Renderer_Passes_GLPass.GLPass#startpresenting)

#### Defined in

[src/Renderer/Passes/GLPass.ts:109](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L109)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[stopPresenting](Renderer_Passes_GLPass.GLPass#stoppresenting)

#### Defined in

[src/Renderer/Passes/GLPass.ts:114](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLPass.ts#L114)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[toJSON](Renderer_Passes_GLPass.GLPass#tojson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:218](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L218)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[toString](Renderer_Passes_GLPass.GLPass#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/ParameterOwner.ts#L303)

___

### updateBillboard

▸ `Private` **updateBillboard**(`index`): `void`

The updateBillboard method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the Billboard to update . |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:409](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L409)

___

### updateBillboards

▸ `Private` **updateBillboards**(`renderstate`): `void`

The updateBillboards method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:311](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L311)

___

### updateIndexArray

▸ **updateIndexArray**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLBillboardsPass.ts:283](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Passes/GLBillboardsPass.ts#L283)

