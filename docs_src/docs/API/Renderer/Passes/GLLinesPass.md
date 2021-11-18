---
id: "Renderer_Passes_GLLinesPass.GLLinesPass"
title: "Class: GLLinesPass"
sidebar_label: "GLLinesPass"
custom_edit_url: null
---



Class representing a GL opaque geoms pass.

## Hierarchy

- [`GLOpaqueGeomsPass`](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass)

  ↳ **`GLLinesPass`**

## Constructors

### constructor

• **new GLLinesPass**()

Create a GL opaque geoms pass.

#### Overrides

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[constructor](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#constructor)

#### Defined in

Renderer/Passes/GLLinesPass.ts:23

## Properties

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext` = `null`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[__gl](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#__gl)

#### Defined in

Renderer/Passes/GLPass.ts:20

___

### \_\_glShaderGeomSets

• `Protected` **\_\_glShaderGeomSets**: `Record`<`string`, [`GLShaderGeomSets`](../Drawing/Renderer_Drawing_GLShaderGeomSets.GLShaderGeomSets)\>

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[__glShaderGeomSets](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#__glshadergeomsets)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:18

___

### \_\_glshadermaterials

• `Protected` **\_\_glshadermaterials**: `Record`<`string`, [`GLShaderMaterials`](../Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials)\>

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[__glshadermaterials](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#__glshadermaterials)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:17

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[__id](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[__renderer](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#__renderer)

#### Defined in

Renderer/Passes/GLPass.ts:22

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[deprecatedParamMapping](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#deprecatedparammapping)

#### Defined in

SceneTree/ParameterOwner.ts:23

___

### enabled

• **enabled**: `boolean` = `true`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[enabled](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#enabled)

#### Defined in

Renderer/Passes/GLPass.ts:17

___

### enabledParam

• **enabledParam**: [`BooleanParameter`](../../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[enabledParam](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#enabledparam)

#### Defined in

Renderer/Passes/GLPass.ts:24

___

### fattenLinesShader

• `Protected` **fattenLinesShader**: [`FattenLinesShader`](../Shaders/Renderer_Shaders_FattenLinesShader.FattenLinesShader) = `null`

#### Defined in

Renderer/Passes/GLLinesPass.ts:17

___

### fbo

• `Protected` **fbo**: `WebGLFramebuffer` = `null`

#### Defined in

Renderer/Passes/GLLinesPass.ts:19

___

### linesGeomDataBuffer

• `Protected` **linesGeomDataBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

Renderer/Passes/GLLinesPass.ts:16

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[listeners](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[paramEventListenerIDs](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#parameventlistenerids)

#### Defined in

SceneTree/ParameterOwner.ts:20

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[paramMapping](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#parammapping)

#### Defined in

SceneTree/ParameterOwner.ts:21

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[params](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#params)

#### Defined in

SceneTree/ParameterOwner.ts:22

___

### passIndex

• `Protected` **passIndex**: `number` = `-1`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[passIndex](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#passindex)

#### Defined in

Renderer/Passes/GLPass.ts:18

___

### quad

• `Protected` **quad**: [`GLMesh`](../Drawing/Renderer_Drawing_GLMesh.GLMesh) = `null`

#### Defined in

Renderer/Passes/GLLinesPass.ts:18

___

### renderer

• **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[renderer](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#renderer)

#### Defined in

Renderer/Passes/GLPass.ts:21

## Methods

### \_\_checkFramebuffer

▸ `Private` **__checkFramebuffer**(`width`, `height`): `void`

The __checkFramebuffer method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

Renderer/Passes/GLLinesPass.ts:52

___

### \_\_traverseTreeAndDraw

▸ `Private` **__traverseTreeAndDraw**(`renderstate`): `void`

The __traverseTreeAndDraw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[__traverseTreeAndDraw](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#__traversetreeanddraw)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:203

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

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[addGeomItem](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#addgeomitem)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:85

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[addParameter](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#addparameter)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[addParameterDeprecationMapping](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#addparameterdeprecationmapping)

#### Defined in

SceneTree/ParameterOwner.ts:90

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

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[checkMaterial](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#checkmaterial)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:67

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[constructShaders](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#constructshaders)

#### Defined in

Renderer/Passes/GLStandardGeomsPass.ts:104

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[copyFrom](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#copyfrom)

#### Defined in

SceneTree/ParameterOwner.ts:314

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[draw](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#draw)

#### Defined in

Renderer/Passes/GLLinesPass.ts:88

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[drawGeomData](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#drawgeata)

#### Defined in

Renderer/Passes/GLLinesPass.ts:106

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[drawHighlightedGeoms](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#drawhighlightedgeoms)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:251

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[emit](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#emit)

#### Defined in

Utilities/EventEmitter.ts:154

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[filterGeomItem](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#filtergeomitem)

#### Defined in

Renderer/Passes/GLLinesPass.ts:40

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[fromJSON](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#fromjson)

#### Defined in

SceneTree/ParameterOwner.ts:239

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getClassName](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getclassname)

#### Defined in

Utilities/BaseClass.ts:33

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getGeomItemAndDist](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getgeomitemanddist)

#### Defined in

Renderer/Passes/GLStandardGeomsPass.ts:131

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getId](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getid)

#### Defined in

Utilities/BaseClass.ts:25

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getNumParameters](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getnumparameters)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getParameter](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getparameter)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getParameterByIndex](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getparameterbyindex)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getParameterIndex](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getparameterindex)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getParameters](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getparameters)

#### Defined in

SceneTree/ParameterOwner.ts:48

___

### getPassType

▸ **getPassType**(): `number`

Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.

#### Returns

`number`

- The pass type value.

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[getPassType](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#getpasstype)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:45

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[hasParameter](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#hasparameter)

#### Defined in

SceneTree/ParameterOwner.ts:78

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[init](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#init)

#### Defined in

Renderer/Passes/GLLinesPass.ts:32

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[insertParameter](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#insertparameter)

#### Defined in

SceneTree/ParameterOwner.ts:147

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[itemAddedToScene](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#itemaddedtoscene)

#### Defined in

Renderer/Passes/GLStandardGeomsPass.ts:38

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[itemRemovedFromScene](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#itemremovedfromscene)

#### Defined in

Renderer/Passes/GLStandardGeomsPass.ts:65

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[off](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#off)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[on](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#on)

#### Defined in

Utilities/EventEmitter.ts:44

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[once](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#once)

#### Defined in

Utilities/EventEmitter.ts:82

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[parameterValueChanged](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#parametervaluechanged)

#### Defined in

Renderer/Passes/GLPass.ts:42

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[readBinary](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#readbinary)

#### Defined in

SceneTree/ParameterOwner.ts:274

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

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[removeAndReAddGeomItem](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#removeandreaddgeomitem)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:75

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

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[removeGeomItem](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#removegeomitem)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:155

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[removeListenerById](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#removelistenerbyid)

#### Defined in

Utilities/EventEmitter.ts:134

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

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[removeMaterial](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#removematerial)

#### Defined in

Renderer/Passes/GLOpaqueGeomsPass.ts:186

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[removeParameter](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#removeparameter)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[replaceParameter](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#replaceparameter)

#### Defined in

SceneTree/ParameterOwner.ts:196

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[setPassIndex](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#setpassindex)

#### Defined in

Renderer/Passes/GLPass.ts:65

___

### startPresenting

▸ **startPresenting**(): `void`

The startPresenting method.

#### Returns

`void`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[startPresenting](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#startpresenting)

#### Defined in

Renderer/Passes/GLPass.ts:107

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Inherited from

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[stopPresenting](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#stoppresenting)

#### Defined in

Renderer/Passes/GLPass.ts:112

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[toJSON](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#tojson)

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

[GLOpaqueGeomsPass](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass).[toString](Renderer_Passes_GLOpaqueGeomsPass.GLOpaqueGeomsPass#tostring)

#### Defined in

SceneTree/ParameterOwner.ts:301

