---
id: "SceneTree_Geometry_Points.Points"
title: "Class: Points"
sidebar_label: "Points"
custom_edit_url: null
---



Class representing a point primitive drawing type, every vertex specified is a point.

```
const points = new Points()
```

* **Events**
* **boundingBoxChanged:** Triggered when the bounding box changes.

## Hierarchy

- [`BaseGeom`](SceneTree_Geometry_BaseGeom.BaseGeom)

  ↳ **`Points`**

  ↳↳ [`ProceduralPoints`](Shapes/SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints)

## Constructors

### constructor

• **new Points**()

Create points.

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[constructor](SceneTree_Geometry_BaseGeom.BaseGeom#constructor)

#### Defined in

[src/SceneTree/Geometry/Points.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/Points.ts#L25)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__boundingBox](SceneTree_Geometry_BaseGeom.BaseGeom#__boundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:20](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L20)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__boundingBoxDirty](SceneTree_Geometry_BaseGeom.BaseGeom#__boundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:21](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L21)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__id](SceneTree_Geometry_BaseGeom.BaseGeom#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__metaData](SceneTree_Geometry_BaseGeom.BaseGeom#__metadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:22](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L22)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__name](SceneTree_Geometry_BaseGeom.BaseGeom#__name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:23](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L23)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__numVertices](SceneTree_Geometry_BaseGeom.BaseGeom#__numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:24](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L24)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__vertexAttributes](SceneTree_Geometry_BaseGeom.BaseGeom#__vertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L25)

___

### debugColor

• **debugColor**: [`Color`](../../Math/Math_Color.Color)

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[debugColor](SceneTree_Geometry_BaseGeom.BaseGeom#debugcolor)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L26)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[deprecatedParamMapping](SceneTree_Geometry_BaseGeom.BaseGeom#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[listeners](SceneTree_Geometry_BaseGeom.BaseGeom#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[name](SceneTree_Geometry_BaseGeom.BaseGeom#name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:27](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L27)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[paramEventListenerIDs](SceneTree_Geometry_BaseGeom.BaseGeom#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L21)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[paramMapping](SceneTree_Geometry_BaseGeom.BaseGeom#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L22)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[params](SceneTree_Geometry_BaseGeom.BaseGeom#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L23)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Inherited from

BaseGeom.positions

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:100](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L100)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[addParameter](SceneTree_Geometry_BaseGeom.BaseGeom#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:134](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L134)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[addParameterDeprecationMapping](SceneTree_Geometry_BaseGeom.BaseGeom#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:91](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L91)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[addVertexAttribute](SceneTree_Geometry_BaseGeom.BaseGeom#addvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:60](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L60)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[clear](SceneTree_Geometry_BaseGeom.BaseGeom#clear)

#### Defined in

[src/SceneTree/Geometry/Points.ts:32](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/Points.ts#L32)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[copyFrom](SceneTree_Geometry_BaseGeom.BaseGeom#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:315](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L315)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[deleteMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#deletemetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:208](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L208)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[emit](SceneTree_Geometry_BaseGeom.BaseGeom#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L154)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[fromJSON](SceneTree_Geometry_BaseGeom.BaseGeom#fromjson)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:406](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L406)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[genBuffers](SceneTree_Geometry_BaseGeom.BaseGeom#genbuffers)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:219](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L219)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getBoundingBox](SceneTree_Geometry_BaseGeom.BaseGeom#getboundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:141](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L141)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getClassName](SceneTree_Geometry_BaseGeom.BaseGeom#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L33)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getId](SceneTree_Geometry_BaseGeom.BaseGeom#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/BaseClass.ts#L25)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#getmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:179](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L179)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getNumParameters](SceneTree_Geometry_BaseGeom.BaseGeom#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:40](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L40)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getNumVertices](SceneTree_Geometry_BaseGeom.BaseGeom#getnumvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:118](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L118)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameter](SceneTree_Geometry_BaseGeom.BaseGeom#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:101](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L101)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameterByIndex](SceneTree_Geometry_BaseGeom.BaseGeom#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:69](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L69)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameterIndex](SceneTree_Geometry_BaseGeom.BaseGeom#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:59](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L59)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameters](SceneTree_Geometry_BaseGeom.BaseGeom#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:49](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L49)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getVertexAttribute](SceneTree_Geometry_BaseGeom.BaseGeom#getvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:81](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L81)

___

### getVertexAttributes

▸ **getVertexAttributes**(): `Record`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

Returns all vertex attributes in an object with their names.

#### Returns

`Record`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getVertexAttributes](SceneTree_Geometry_BaseGeom.BaseGeom#getvertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:90](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L90)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[hasMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#hasmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:189](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L189)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[hasParameter](SceneTree_Geometry_BaseGeom.BaseGeom#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:79](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L79)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[hasVertexAttribute](SceneTree_Geometry_BaseGeom.BaseGeom#hasvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:71](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L71)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[insertParameter](SceneTree_Geometry_BaseGeom.BaseGeom#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:148](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L148)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[loadBaseGeomBinary](SceneTree_Geometry_BaseGeom.BaseGeom#loadbasegeombinary)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:237](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L237)

___

### loadBin

▸ **loadBin**(`reader`): `void`

Loads and populates `Points` object from a binary reader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Points.ts:42](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/Points.ts#L42)

___

### numVertices

▸ **numVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[numVertices](SceneTree_Geometry_BaseGeom.BaseGeom#numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:109](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L109)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[off](SceneTree_Geometry_BaseGeom.BaseGeom#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L97)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[on](SceneTree_Geometry_BaseGeom.BaseGeom#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L44)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[once](SceneTree_Geometry_BaseGeom.BaseGeom#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L82)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[parameterValueChanged](SceneTree_Geometry_BaseGeom.BaseGeom#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:123](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L123)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current geometry(Including line segments) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[readBinary](SceneTree_Geometry_BaseGeom.BaseGeom#readbinary)

#### Defined in

[src/SceneTree/Geometry/Points.ts:100](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/Points.ts#L100)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[removeListenerById](SceneTree_Geometry_BaseGeom.BaseGeom#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/EventEmitter.ts#L134)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[removeParameter](SceneTree_Geometry_BaseGeom.BaseGeom#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:175](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L175)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[replaceParameter](SceneTree_Geometry_BaseGeom.BaseGeom#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:197](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/ParameterOwner.ts#L197)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setBoundingBoxDirty](SceneTree_Geometry_BaseGeom.BaseGeom#setboundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:149](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L149)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setDebugName](SceneTree_Geometry_BaseGeom.BaseGeom#setdebugname)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:49](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L49)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#setmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:199](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L199)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setNumVertices](SceneTree_Geometry_BaseGeom.BaseGeom#setnumvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:127](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L127)

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

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[toJSON](SceneTree_Geometry_BaseGeom.BaseGeom#tojson)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:385](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L385)

___

### toString

▸ **toString**(): `string`

Returns geometry data value in json format.

#### Returns

`string`

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[toString](SceneTree_Geometry_BaseGeom.BaseGeom#tostring)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:435](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L435)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[updateBoundingBox](SceneTree_Geometry_BaseGeom.BaseGeom#updateboundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:157](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/SceneTree/Geometry/BaseGeom.ts#L157)

