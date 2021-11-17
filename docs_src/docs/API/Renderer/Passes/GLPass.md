---
id: "Renderer_Passes_GLPass.GLPass"
title: "Class: GLPass"
sidebar_label: "GLPass"
custom_edit_url: null
---



This class abstracts the rendering of a collection of geometries to screen.

## Hierarchy

- [`ParameterOwner`](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner)

  ↳ **`GLPass`**

  ↳↳ [`GLAudioItemsPass`](Renderer_Passes_GLAudioItemsPass.GLAudioItemsPass)

  ↳↳ [`GLBillboardsPass`](Renderer_Passes_GLBillboardsPass.GLBillboardsPass)

  ↳↳ [`GLBoundingBoxPass`](Renderer_Passes_GLBoundingBoxPass.GLBoundingBoxPass)

  ↳↳ [`GLStandardGeomsPass`](Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass)

## Constructors

### constructor

• **new GLPass**()

Create a GL pass.

#### Overrides

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[constructor](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#constructor)

#### Defined in

[Renderer/Passes/GLPass.ts:28](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L28)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext` = `null`

#### Defined in

[Renderer/Passes/GLPass.ts:20](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L20)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[__id](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Defined in

[Renderer/Passes/GLPass.ts:22](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L22)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L23)

___

### enabled

• **enabled**: `boolean` = `true`

#### Defined in

[Renderer/Passes/GLPass.ts:17](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L17)

___

### enabledParam

• **enabledParam**: [`BooleanParameter`](../../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Defined in

[Renderer/Passes/GLPass.ts:24](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[listeners](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramMapping](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[params](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L22)

___

### passIndex

• `Protected` **passIndex**: `number` = `-1`

#### Defined in

[Renderer/Passes/GLPass.ts:18](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L18)

___

### renderer

• **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) = `null`

#### Defined in

[Renderer/Passes/GLPass.ts:21](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L21)

## Methods

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameter](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameter)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameterDeprecationMapping](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L90)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[copyFrom](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L314)

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

#### Defined in

[Renderer/Passes/GLPass.ts:121](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L121)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[emit](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#emit)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[fromJSON](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#fromjson)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getClassName](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getclassname)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getId](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getid)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getNumParameters](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getnumparameters)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameter](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameter)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterByIndex](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterbyindex)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterIndex](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterindex)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameters](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L48)

___

### getPassType

▸ **getPassType**(): `number`

Returns the pass type. OPAQUE passes are always rendered first, followed by TRANSPARENT passes, and finally OVERLAY.

#### Returns

`number`

- The pass type value.

#### Defined in

[Renderer/Passes/GLPass.ts:73](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L73)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[hasParameter](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#hasparameter)

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

#### Defined in

[Renderer/Passes/GLPass.ts:52](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L52)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[insertParameter](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#insertparameter)

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

#### Defined in

[Renderer/Passes/GLPass.ts:87](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L87)

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

#### Defined in

[Renderer/Passes/GLPass.ts:99](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L99)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[off](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#off)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[on](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#on)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[once](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#once)

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

#### Overrides

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[parameterValueChanged](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parametervaluechanged)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[readBinary](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#readbinary)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeListenerById](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removelistenerbyid)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeParameter](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removeparameter)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[replaceParameter](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#replaceparameter)

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

#### Defined in

[Renderer/Passes/GLPass.ts:65](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L65)

___

### startPresenting

▸ **startPresenting**(): `void`

The startPresenting method.

#### Returns

`void`

#### Defined in

[Renderer/Passes/GLPass.ts:107](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Renderer/Passes/GLPass.ts#L107)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toJSON](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tojson)

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

[ParameterOwner](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toString](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/SceneTree/ParameterOwner.ts#L301)

