---
id: "Renderer_Passes_GLBoundingBoxPass.GLBoundingBoxPass"
title: "Class: GLBoundingBoxPass"
sidebar_label: "GLBoundingBoxPass"
custom_edit_url: null
---



Class representing a GL treeitems pass.

## Hierarchy

- [`GLPass`](Renderer_Passes_GLPass.GLPass)

  ↳ **`GLBoundingBoxPass`**

## Constructors

### constructor

• **new GLBoundingBoxPass**()

Create a GL treeitems pass.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[constructor](Renderer_Passes_GLPass.GLPass#constructor)

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:41](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L41)

## Properties

### \_\_drawItemsTexture

• `Protected` `Optional` **\_\_drawItemsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:36](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L36)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext` = `null`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[__gl](Renderer_Passes_GLPass.GLPass#__gl)

#### Defined in

[Renderer/Passes/GLPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L20)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[__id](Renderer_Passes_GLPass.GLPass#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L11)

___

### \_\_indexArray

• `Protected` **\_\_indexArray**: `Float32Array`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:35](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L35)

___

### \_\_instanceIdsBuffer

• `Protected` `Optional` **\_\_instanceIdsBuffer**: `WebGLBuffer`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:33](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L33)

___

### \_\_modelMatrixArray

• `Protected` **\_\_modelMatrixArray**: `Float32Array`[] = `[]`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:29](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L29)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[__renderer](Renderer_Passes_GLPass.GLPass#__renderer)

#### Defined in

[Renderer/Passes/GLPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L22)

___

### \_\_tintColorArray

• `Protected` **\_\_tintColorArray**: `number`[][] = `[]`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:31](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L31)

___

### \_\_treeitemDataArray

• `Protected` **\_\_treeitemDataArray**: `number`[][] = `[]`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:30](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L30)

___

### \_\_updateRequested

• `Protected` **\_\_updateRequested**: `boolean` = `false`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:25](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L25)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:37](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L37)

___

### boxes

• `Protected` **boxes**: `any`[] = `[]`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:19](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L19)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[deprecatedParamMapping](Renderer_Passes_GLPass.GLPass#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L23)

___

### dirtyBoxes

• `Protected` **dirtyBoxes**: `Set`<`any`\>

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L20)

___

### drawCount

• `Protected` **drawCount**: `number` = `0`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:23](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L23)

___

### enabled

• **enabled**: `boolean` = `true`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[enabled](Renderer_Passes_GLPass.GLPass#enabled)

#### Defined in

[Renderer/Passes/GLPass.ts:17](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L17)

___

### enabledParam

• **enabledParam**: [`BooleanParameter`](../../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[enabledParam](Renderer_Passes_GLPass.GLPass#enabledparam)

#### Defined in

[Renderer/Passes/GLPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L24)

___

### freeIndices

• `Protected` **freeIndices**: `number`[] = `[]`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:21](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L21)

___

### glgeom

• `Protected` `Optional` **glgeom**: [`GLGeom`](../Drawing/Renderer_Drawing_GLGeom.GLGeom)

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:26](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L26)

___

### glshader

• `Protected` `Optional` **glshader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:27](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L27)

___

### idToIndex

• `Protected` **idToIndex**: `number`[] = `[]`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L22)

___

### indexArrayUpdateNeeded

• `Protected` **indexArrayUpdateNeeded**: `boolean` = `false`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[listeners](Renderer_Passes_GLPass.GLPass#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[paramEventListenerIDs](Renderer_Passes_GLPass.GLPass#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[paramMapping](Renderer_Passes_GLPass.GLPass#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[params](Renderer_Passes_GLPass.GLPass#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L22)

___

### passIndex

• `Protected` **passIndex**: `number` = `-1`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[passIndex](Renderer_Passes_GLPass.GLPass#passindex)

#### Defined in

[Renderer/Passes/GLPass.ts:18](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L18)

___

### renderer

• **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[renderer](Renderer_Passes_GLPass.GLPass#renderer)

#### Defined in

[Renderer/Passes/GLPass.ts:21](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L21)

## Methods

### \_\_populateBoxesDataArray

▸ `Private` **__populateBoxesDataArray**(`treeitemData`, `index`, `dataArray`): `void`

The __populateBoxesDataArray method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeitemData` | `any` | The treeitemData value. |
| `index` | `number` | The index value. |
| `dataArray` | `any` | The dataArray value. |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:207](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L207)

___

### \_\_updateBox

▸ `Private` **__updateBox**(`index`): `void`

The __updateBoxes method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:309](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L309)

___

### \_\_updateBoxes

▸ `Private` **__updateBoxes**(): `void`

The __updateBoxes method.

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:259](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L259)

___

### \_\_updateIndexArray

▸ **__updateIndexArray**(): `void`

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:232](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L232)

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

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L133)

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

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L90)

___

### addTreeItem

▸ **addTreeItem**(`treeItem`, `continueIntoSubTree?`): `void`

Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) | `undefined` | The tree item to add. |
| `continueIntoSubTree` | `boolean` | `true` | - |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:107](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L107)

___

### bindTreeItem

▸ **bindTreeItem**(`treeitem`): `void`

The bindTreeItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeitem` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) | The treeitem value. |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:132](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L132)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[copyFrom](Renderer_Passes_GLPass.GLPass#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L314)

___

### draw

▸ **draw**(`renderstate`): `void`

The sort method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[draw](Renderer_Passes_GLPass.GLPass#draw)

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:343](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L343)

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

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[drawGeomData](Renderer_Passes_GLPass.GLPass#drawgeata)

#### Defined in

[Renderer/Passes/GLPass.ts:135](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L135)

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

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[drawHighlightedGeoms](Renderer_Passes_GLPass.GLPass#drawhighlightedgeoms)

#### Defined in

[Renderer/Passes/GLPass.ts:129](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L129)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L154)

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

[SceneTree/ParameterOwner.ts:239](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L239)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L33)

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

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[getGeomItemAndDist](Renderer_Passes_GLPass.GLPass#getgeomitemanddist)

#### Defined in

[Renderer/Passes/GLPass.ts:141](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L141)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L25)

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

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L39)

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

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L100)

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

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L68)

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

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L58)

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

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L48)

___

### getPassType

▸ **getPassType**(): `number`

The getPassType method.

#### Returns

`number`

- The pass type value.

#### Overrides

[GLPass](Renderer_Passes_GLPass.GLPass).[getPassType](Renderer_Passes_GLPass.GLPass#getpasstype)

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:49](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L49)

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

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L78)

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

[Renderer/Passes/GLBoundingBoxPass.ts:58](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L58)

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

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L147)

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

[Renderer/Passes/GLBoundingBoxPass.ts:76](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L76)

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

[Renderer/Passes/GLBoundingBoxPass.ts:91](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L91)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L82)

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

[Renderer/Passes/GLPass.ts:42](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L42)

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

[GLPass](Renderer_Passes_GLPass.GLPass).[readBinary](Renderer_Passes_GLPass.GLPass#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:274](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L274)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L134)

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

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L174)

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

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L196)

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

[Renderer/Passes/GLPass.ts:65](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L65)

___

### startPresenting

▸ **startPresenting**(): `void`

The startPresenting method.

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[startPresenting](Renderer_Passes_GLPass.GLPass#startpresenting)

#### Defined in

[Renderer/Passes/GLPass.ts:107](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L107)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Inherited from

[GLPass](Renderer_Passes_GLPass.GLPass).[stopPresenting](Renderer_Passes_GLPass.GLPass#stoppresenting)

#### Defined in

[Renderer/Passes/GLPass.ts:112](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L112)

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

[SceneTree/ParameterOwner.ts:216](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L216)

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

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L301)

___

### unbindTreeItem

▸ **unbindTreeItem**(`treeitem`): `void`

The unbindTreeItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeitem` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) | The treeitem value. |

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLBoundingBoxPass.ts:176](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLBoundingBoxPass.ts#L176)

