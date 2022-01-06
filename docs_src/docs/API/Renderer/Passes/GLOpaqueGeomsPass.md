---
id: "Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass"
title: "Class: GLOpaqueGeomsPass"
sidebar_label: "GLOpaqueGeomsPass"
custom_edit_url: null
---



Class representing a GL opaque geoms pass.

## Hierarchy

- [`GLStandardGeomsPass`](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass)

  ↳ **`GLOpaqueGeomsPass`**

  ↳↳ [`GLLinesPass`](Renderer_Passes_GLLinesPass.GLLinesPass)

  ↳↳ [`GLOverlayPass`](Renderer_Passes_GLOverlayPass.GLOverlayPass)

## Constructors

### constructor

• **new GLOpaqueGeomsPass**()

Create a GL opaque geoms pass.

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[constructor](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#constructor)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:23](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L23)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) = `null`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[__gl](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#__gl)

#### Defined in

[src/Renderer/Passes/GLPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L22)

___

### \_\_glShaderGeomSets

• `Protected` **\_\_glShaderGeomSets**: `Record`<`string`, [`GLShaderGeomSets`](../Drawing/Renderer_Drawing_GLShaderGeomSets.GLShaderGeomSets)\>

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:19](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L19)

___

### \_\_glshadermaterials

• `Protected` **\_\_glshadermaterials**: `Record`<`string`, [`GLShaderMaterials`](../Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials)\>

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:18](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L18)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[__id](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[__renderer](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#__renderer)

#### Defined in

[src/Renderer/Passes/GLPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L24)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[deprecatedParamMapping](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L25)

___

### enabled

• **enabled**: `boolean` = `true`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[enabled](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#enabled)

#### Defined in

[src/Renderer/Passes/GLPass.ts:19](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L19)

___

### enabledParam

• **enabledParam**: [`BooleanParameter`](../../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[enabledParam](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#enabledparam)

#### Defined in

[src/Renderer/Passes/GLPass.ts:26](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L26)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[listeners](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[paramEventListenerIDs](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[paramMapping](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[params](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L24)

___

### passIndex

• `Protected` **passIndex**: `number` = `-1`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[passIndex](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#passindex)

#### Defined in

[src/Renderer/Passes/GLPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L20)

___

### renderer

• **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[renderer](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#renderer)

#### Defined in

[src/Renderer/Passes/GLPass.ts:23](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L23)

## Methods

### \_\_traverseTreeAndDraw

▸ `Private` **__traverseTreeAndDraw**(`renderstate`): `void`

The __traverseTreeAndDraw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:204](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L204)

___

### addGeomItem

▸ **addGeomItem**(`geomItem`): `boolean`

The addGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[addGeomItem](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#addgeomitem)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:86](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L86)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[addParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L135)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[addParameterDeprecationMapping](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L92)

___

### checkMaterial

▸ **checkMaterial**(`material`): `boolean`

Checks the material to see if it is not transparent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `material` | [`Material`](../../SceneTree/SceneTree_Material.Material) | The geomItem value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:68](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L68)

___

### constructShaders

▸ **constructShaders**(`shaderName`): `Record`<`string`, `any`\>

The constructShaders method.
Given a material, generate the various shaders required to render objects
using this material. There should always be at least a single glShader
and optionally a glgeomdatashader for rendering the goem data buffer
and a glselectedshader for rendering selection hilghlights

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The name of the base shader. |

#### Returns

`Record`<`string`, `any`\>

- The object containing the shader instances.

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[constructShaders](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#constructshaders)

#### Defined in

[src/Renderer/Passes/GLStandardGeomsPass.ts:104](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLStandardGeomsPass.ts#L104)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[copyFrom](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L316)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[draw](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#draw)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:223](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L223)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[drawGeomData](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#drawgeata)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:275](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L275)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[drawHighlightedGeoms](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#drawhighlightedgeoms)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:252](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L252)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[emit](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L154)

___

### filterGeomItem

▸ **filterGeomItem**(`geomItem`): `boolean`

The filterGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[filterGeomItem](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#filtergeomitem)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:58](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L58)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[fromJSON](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L241)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getClassName](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L33)

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

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getGeomItemAndDist](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getgeomitemanddist)

#### Defined in

[src/Renderer/Passes/GLStandardGeomsPass.ts:131](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLStandardGeomsPass.ts#L131)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getId](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L25)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getNumParameters](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L41)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L102)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getParameterByIndex](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L70)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getParameterIndex](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getParameters](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L50)

___

### getPassType

▸ **getPassType**(): `number`

Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.

#### Returns

`number`

- The pass type value.

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getPassType](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getpasstype)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:46](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L46)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[hasParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L80)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[init](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#init)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:38](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L38)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[insertParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L149)

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

- Returns true if the item is now added to the pass.

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[itemAddedToScene](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#itemaddedtoscene)

#### Defined in

[src/Renderer/Passes/GLStandardGeomsPass.ts:38](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLStandardGeomsPass.ts#L38)

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

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[itemRemovedFromScene](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#itemremovedfromscene)

#### Defined in

[src/Renderer/Passes/GLStandardGeomsPass.ts:65](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLStandardGeomsPass.ts#L65)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[off](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L97)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[on](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L44)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[once](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L82)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[parameterValueChanged](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#parametervaluechanged)

#### Defined in

[src/Renderer/Passes/GLPass.ts:44](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L44)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[readBinary](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#readbinary)

#### Defined in

[src/SceneTree/ParameterOwner.ts:276](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L276)

___

### removeAndReAddGeomItem

▸ **removeAndReAddGeomItem**(`geomItem`): `void`

Removes the GeomITem from this pass, and then asks the renderer to re-add it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:76](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L76)

___

### removeGeomItem

▸ **removeGeomItem**(`geomItem`): `boolean`

The removeGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[removeGeomItem](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#removegeomitem)

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:156](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L156)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[removeListenerById](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L134)

___

### removeMaterial

▸ **removeMaterial**(`material`): `void`

The removeMaterial method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `material` | [`Material`](../../SceneTree/SceneTree_Material.Material) | The material value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Passes/GLOpaqueGeomsPass.ts:187](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLOpaqueGeomsPass.ts#L187)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[removeParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L176)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[replaceParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L198)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[setPassIndex](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#setpassindex)

#### Defined in

[src/Renderer/Passes/GLPass.ts:67](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L67)

___

### startPresenting

▸ **startPresenting**(): `void`

The startPresenting method.

#### Returns

`void`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[startPresenting](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#startpresenting)

#### Defined in

[src/Renderer/Passes/GLPass.ts:109](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L109)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[stopPresenting](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#stoppresenting)

#### Defined in

[src/Renderer/Passes/GLPass.ts:114](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Passes/GLPass.ts#L114)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[toJSON](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#tojson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:218](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L218)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[toString](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L303)

