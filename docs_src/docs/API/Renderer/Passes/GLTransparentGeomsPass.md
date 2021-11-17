---
id: "Renderer_Passes_GLTransparentGeomsPass.GLTransparentGeomsPass"
title: "Class: GLTransparentGeomsPass"
sidebar_label: "GLTransparentGeomsPass"
custom_edit_url: null
---



Class representing a GL transparent geoms pass.

## Hierarchy

- [`GLStandardGeomsPass`](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass)

  ↳ **`GLTransparentGeomsPass`**

## Constructors

### constructor

• **new GLTransparentGeomsPass**()

Create GL transparent geoms pass.

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[constructor](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#constructor)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:28](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L28)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext` = `null`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[__gl](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#__gl)

#### Defined in

[Renderer/Passes/GLPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L20)

___

### \_\_glShaderGeomSets

• `Protected` **\_\_glShaderGeomSets**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:16](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L16)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[__id](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[__renderer](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#__renderer)

#### Defined in

[Renderer/Passes/GLPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L22)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[deprecatedParamMapping](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L23)

___

### enabled

• **enabled**: `boolean` = `true`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[enabled](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#enabled)

#### Defined in

[Renderer/Passes/GLPass.ts:17](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L17)

___

### enabledParam

• **enabledParam**: [`BooleanParameter`](../../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[enabledParam](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#enabledparam)

#### Defined in

[Renderer/Passes/GLPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L24)

___

### freeList

• `Protected` **freeList**: `any`[] = `[]`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:19](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L19)

___

### itemCount

• `Protected` **itemCount**: `number` = `0`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:15](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L15)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`number`, `Record`<`string`, `number`\>\> = `{}`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:14](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L14)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[listeners](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[paramEventListenerIDs](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[paramMapping](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[params](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L22)

___

### passIndex

• `Protected` **passIndex**: `number` = `-1`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[passIndex](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#passindex)

#### Defined in

[Renderer/Passes/GLPass.ts:18](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L18)

___

### prevSortCameraPos

• `Protected` **prevSortCameraPos**: [`Vec3`](../../Math/Math_Vec3.Vec3)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:21](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L21)

___

### reSort

• `Protected` **reSort**: `boolean` = `false`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:23](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L23)

___

### renderer

• **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[renderer](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#renderer)

#### Defined in

[Renderer/Passes/GLPass.ts:21](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L21)

___

### sortCameraMovementDistance

• `Protected` **sortCameraMovementDistance**: `number` = `0`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L22)

___

### transparentItemIndices

• `Protected` **transparentItemIndices**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:18](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L18)

___

### transparentItems

• `Protected` **transparentItems**: `any`[] = `[]`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:17](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L17)

___

### visibleItems

• `Protected` **visibleItems**: `any`[] = `[]`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L20)

## Methods

### \_drawItem

▸ **_drawItem**(`renderstate`, `transparentItem`, `cache`): `void`

Draw n individual item, binding the shader and material if necessary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | current renderstad |
| `transparentItem` | `Record`<`string`, `any`\> | current item to render |
| `cache` | `Record`<`string`, `any`\> | cache tracking which material/shader is currently bound. |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:255](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L255)

___

### \_drawItems

▸ `Private` **_drawItems**(`renderstate`): `void`

The _drawItems method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:283](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L283)

___

### addGeomItem

▸ **addGeomItem**(`geomItem`): `void`

The addGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

`void`

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[addGeomItem](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#addgeomitem)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:83](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L83)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[addParameterDeprecationMapping](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L90)

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

[Renderer/Passes/GLStandardGeomsPass.ts:104](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLStandardGeomsPass.ts#L104)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[copyFrom](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L314)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[draw](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#draw)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:341](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L341)

___

### drawGeomData

▸ **drawGeomData**(`renderstate`): `void`

The drawGeomData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `GeomDataRenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[drawGeomData](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#drawgeata)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:457](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L457)

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[drawHighlightedGeoms](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#drawhighlightedgeoms)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:408](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L408)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L154)

___

### filterGeomItem

▸ **filterGeomItem**(`geomItem`): `boolean`

The init method.

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

[Renderer/Passes/GLTransparentGeomsPass.ts:64](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L64)

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

[SceneTree/ParameterOwner.ts:239](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L239)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L33)

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

[Renderer/Passes/GLStandardGeomsPass.ts:131](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLStandardGeomsPass.ts#L131)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L25)

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

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L39)

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

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L100)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[getParameterIndex](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L58)

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

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L48)

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

[Renderer/Passes/GLTransparentGeomsPass.ts:55](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L55)

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

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L78)

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

[Renderer/Passes/GLTransparentGeomsPass.ts:37](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L37)

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

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L147)

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

[Renderer/Passes/GLStandardGeomsPass.ts:38](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLStandardGeomsPass.ts#L38)

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

[Renderer/Passes/GLStandardGeomsPass.ts:65](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLStandardGeomsPass.ts#L65)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[on](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L82)

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

[Renderer/Passes/GLPass.ts:42](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L42)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[readBinary](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:274](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L274)

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

#### Overrides

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[removeGeomItem](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#removegeomitem)

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:191](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L191)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[removeParameter](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L174)

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

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L196)

___

### resortNeeded

▸ **resortNeeded**(): `void`

When an item visibility changes, we trigger this method, as new items become visible

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:75](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L75)

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

[Renderer/Passes/GLPass.ts:65](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L65)

___

### sortItems

▸ **sortItems**(`viewPos`): `void`

Sorts the drawn items in order furthest to nearest when rendering transparent objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewPos` | [`Vec3`](../../Math/Math_Vec3.Vec3) | The position of the camera that we are sorting relative to. |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLTransparentGeomsPass.ts:235](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLTransparentGeomsPass.ts#L235)

___

### startPresenting

▸ **startPresenting**(): `void`

The startPresenting method.

#### Returns

`void`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[startPresenting](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#startpresenting)

#### Defined in

[Renderer/Passes/GLPass.ts:107](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L107)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Inherited from

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[stopPresenting](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#stoppresenting)

#### Defined in

[Renderer/Passes/GLPass.ts:112](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Renderer/Passes/GLPass.ts#L112)

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

[GLStandardGeomsPass](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass).[toString](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/ParameterOwner.ts#L301)

