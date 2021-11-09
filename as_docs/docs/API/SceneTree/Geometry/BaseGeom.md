---
id: "SceneTree_Geometry_BaseGeom.BaseGeom"
title: "Class: BaseGeom"
sidebar_label: "BaseGeom"
custom_edit_url: null
---



Represents a base class for 3D geometry items.

**Events**
* **boundingBoxChanged:** Triggered when the bounding box changes.
* **geomDataChanged:** Emitted when the geometry attributes have changed. The topology did not change. The Renderer will upload the new attributes to the GPU.
* **geomDataTopologyChanged:** Emitted when the geometry attributes and topology have changed.  The Renderer will upload the new attributes and topology to the GPU.

## Hierarchy

- [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

  ↳ **`BaseGeom`**

  ↳↳ [`Lines`](SceneTree_Geometry_Lines.Lines)

  ↳↳ [`Mesh`](SceneTree_Geometry_Mesh.Mesh)

  ↳↳ [`Points`](SceneTree_Geometry_Points.Points)

## Constructors

### constructor

• **new BaseGeom**()

Create a base geom.

#### Overrides

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[constructor](../SceneTree_ParameterOwner.ParameterOwner#constructor)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:32](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L32)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L20)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L21)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[__id](../SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L22)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L23)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:24](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L24)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L25)

___

### debugColor

• **debugColor**: [`Color`](../../Math/Math_Color.Color)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L26)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](../SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L23)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[listeners](../SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L27)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](../SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[paramMapping](../SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[params](../SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L22)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L100)

## Methods

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[addParameter](../SceneTree_ParameterOwner.ParameterOwner#addparameter)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[addParameterDeprecationMapping](../SceneTree_ParameterOwner.ParameterOwner#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L90)

___

### addVertexAttribute

▸ **addVertexAttribute**(`name`, `attr`): `void`

Adds a new vertex attribute to the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |
| `attr` | [`Attribute`](SceneTree_Geometry_Attribute.Attribute) | - |

#### Returns

`void`

- Returns an attribute.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:60](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L60)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:40](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L40)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[copyFrom](../SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:312](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L312)

___

### deleteMetadata

▸ **deleteMetadata**(`key`): `void`

Removes metadata value from the geometry with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:207](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L207)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[emit](../SceneTree_ParameterOwner.ParameterOwner#emit)

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

#### Overrides

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[fromJSON](../SceneTree_ParameterOwner.ParameterOwner#fromjson)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:405](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L405)

___

### genBuffers

▸ **genBuffers**(`opts?`): `Record`<`string`, `any`\>

Returns vertex attributes buffers and its count.

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts?` | `Record`<`string`, `any`\> |

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:218](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L218)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:140](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L140)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getClassName](../SceneTree_ParameterOwner.ParameterOwner#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getId](../SceneTree_ParameterOwner.ParameterOwner#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

___

### getMetadata

▸ **getMetadata**(`key`): `any`

Returns metadata value of the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`any`

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:178](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L178)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getNumParameters](../SceneTree_ParameterOwner.ParameterOwner#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L39)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:118](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L118)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getParameter](../SceneTree_ParameterOwner.ParameterOwner#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getParameterByIndex](../SceneTree_ParameterOwner.ParameterOwner#getparameterbyindex)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getParameterIndex](../SceneTree_ParameterOwner.ParameterOwner#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[getParameters](../SceneTree_ParameterOwner.ParameterOwner#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L48)

___

### getVertexAttribute

▸ **getVertexAttribute**(`name`): [`Attribute`](SceneTree_Geometry_Attribute.Attribute)

Returns vertex attribute with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |

#### Returns

[`Attribute`](SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:81](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L81)

___

### getVertexAttributes

▸ **getVertexAttributes**(): `Record`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

Returns all vertex attributes in an object with their names.

#### Returns

`Record`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L90)

___

### hasMetadata

▸ **hasMetadata**(`key`): `boolean`

Verifies if geometry's metadata contains a value with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:188](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L188)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[hasParameter](../SceneTree_ParameterOwner.ParameterOwner#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L78)

___

### hasVertexAttribute

▸ **hasVertexAttribute**(`name`): `boolean`

Checks if the the geometry has an attribute with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |

#### Returns

`boolean`

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L71)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[insertParameter](../SceneTree_ParameterOwner.ParameterOwner#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L147)

___

### loadBaseGeomBinary

▸ **loadBaseGeomBinary**(`reader`): `void`

Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:236](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L236)

___

### numVertices

▸ **numVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:109](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L109)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[off](../SceneTree_ParameterOwner.ParameterOwner#off)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[on](../SceneTree_ParameterOwner.ParameterOwner#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[once](../SceneTree_ParameterOwner.ParameterOwner#once)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[parameterValueChanged](../SceneTree_ParameterOwner.ParameterOwner#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L122)

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
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[readBinary](../SceneTree_ParameterOwner.ParameterOwner#readbinary)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[removeListenerById](../SceneTree_ParameterOwner.ParameterOwner#removelistenerbyid)

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

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[removeParameter](../SceneTree_ParameterOwner.ParameterOwner#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L174)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[replaceParameter](../SceneTree_ParameterOwner.ParameterOwner#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L196)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:148](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L148)

___

### setDebugName

▸ **setDebugName**(`name`): `void`

Establishes a name for the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The debug name value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:49](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L49)

___

### setMetadata

▸ **setMetadata**(`key`, `metaData`): `void`

Sets metadata value to the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |
| `metaData` | `Record`<`string`, `any`\> | The metaData value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:198](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L198)

___

### setNumVertices

▸ **setNumVertices**(`count`): `void`

Sets the number of vertices the geometry has.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The count value. |

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:127](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L127)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Overrides

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[toJSON](../SceneTree_ParameterOwner.ParameterOwner#tojson)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:384](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L384)

___

### toString

▸ **toString**(): `string`

Returns geometry data value in json format.

#### Returns

`string`

- The return value.

#### Overrides

[ParameterOwner](../SceneTree_ParameterOwner.ParameterOwner).[toString](../SceneTree_ParameterOwner.ParameterOwner#tostring)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:434](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L434)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:156](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L156)

