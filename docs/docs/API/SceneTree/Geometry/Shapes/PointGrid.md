---
id: "SceneTree_Geometry_Shapes_PointGrid.PointGrid"
title: "Class: PointGrid"
sidebar_label: "PointGrid"
custom_edit_url: null
---



Represents an ordered grid of points along `X` and `Y` axes.

```
const pointGrid = new PointGrid(2.2, 1.5, 12, 12)
```

**Parameters**
* **X(`NumberParameter`):** Length of the grid along the `X` axis.
* **Y(`NumberParameter`):** Length of the grid along the `Y` axis.
* **XDivisions(`NumberParameter`):** Number of divisions along `X` axis
* **YDivisions(`NumberParameter`):** Number of divisions along `Y` axis

## Hierarchy

- [`ProceduralPoints`](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints)

  ↳ **`PointGrid`**

## Constructors

### constructor

• **new PointGrid**(`x?`, `y?`, `xDivisions?`, `yDivisions?`, `addTextureCoords?`)

Creates an instance of PointGrid.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` | `1.0` | The length of the point grid along the X axis. |
| `y` | `number` | `1.0` | The length of the point grid along the Y axis. |
| `xDivisions` | `number` | `1` | The number of divisions along the X axis. |
| `yDivisions` | `number` | `1` | The number of divisions along the Y axis. |
| `addTextureCoords` | `boolean` | `false` | The addTextureCoords value. |

#### Overrides

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[constructor](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#constructor)

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:52](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L52)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../../Math/Math_Box3.Box3)

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__boundingBox](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__boundingbox)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L20)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__boundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__boundingboxdirty)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L21)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__id](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__metaData](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__metadata)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L22)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__name](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__name)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L23)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__numVertices](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__numvertices)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:24](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L24)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[__vertexAttributes](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#__vertexattributes)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L25)

___

### debugColor

• **debugColor**: [`Color`](../../../Math/Math_Color.Color)

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[debugColor](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#debugcolor)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L26)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[deprecatedParamMapping](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L23)

___

### dirtyTopology

• **dirtyTopology**: `boolean`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[dirtyTopology](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#dirtytopology)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L11)

___

### dirtyVertices

• **dirtyVertices**: `boolean`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[dirtyVertices](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#dirtyvertices)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:12](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L12)

___

### divisionsXParam

• **divisionsXParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** divisionsXParam - Number of divisions along `X` axis

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:30](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L30)

___

### divisionsYParam

• **divisionsYParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** divisionsYParam - Number of divisions along `Y` axis

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:40](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L40)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[listeners](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[name](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#name)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L27)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[paramEventListenerIDs](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[paramMapping](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[params](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L22)

___

### sizeXParam

• **sizeXParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** sizeXParam - Length of the grid along the `X` axis.

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L25)

___

### sizeYParam

• **sizeYParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** sizeYParam - Length of the grid along the `Y` axis.

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:35](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L35)

___

### topologyParams

• **topologyParams**: `string`[]

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[topologyParams](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#topologyparams)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:13](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L13)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L100)

## Methods

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[addParameter](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#addparameter)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[addParameterDeprecationMapping](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#addparameterdeprecationmapping)

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
| `attr` | [`Attribute`](../SceneTree_Geometry_Attribute.Attribute) | - |

#### Returns

`void`

- Returns an attribute.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[addVertexAttribute](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#addvertexattribute)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:60](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L60)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[clear](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#clear)

#### Defined in

[SceneTree/Geometry/Points.ts:31](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Points.ts#L31)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[copyFrom](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#copyfrom)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[deleteMetadata](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#deletemetadata)

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
| `event` | [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[emit](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#emit)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[fromJSON](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#fromjson)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:405](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L405)

___

### genBuffers

▸ **genBuffers**(`opts?`): `Record`<`string`, `any`\>

The genBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts?` | `Record`<`string`, `any`\> | The opts value. |

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[genBuffers](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#genbuffers)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:96](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L96)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getBoundingBox](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getboundingbox)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:73](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L73)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getClassName](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getclassname)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getId](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getid)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getMetadata](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getmetadata)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getNumParameters](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L39)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getNumVertices](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getnumvertices)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:83](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L83)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getParameter](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getParameterByIndex](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getparameterbyindex)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getParameterIndex](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getParameters](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L48)

___

### getVertexAttribute

▸ **getVertexAttribute**(`name`): [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

Returns vertex attribute with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |

#### Returns

[`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getVertexAttribute](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getvertexattribute)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:81](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L81)

___

### getVertexAttributes

▸ **getVertexAttributes**(): `Record`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

Returns all vertex attributes in an object with their names.

#### Returns

`Record`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[getVertexAttributes](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#getvertexattributes)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[hasMetadata](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#hasmetadata)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[hasParameter](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#hasparameter)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[hasVertexAttribute](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#hasvertexattribute)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L71)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[insertParameter](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L147)

___

### loadBaseGeomBinary

▸ **loadBaseGeomBinary**(`reader`): `void`

Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree_BinReader.BinReader) | The reader value. |

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[loadBaseGeomBinary](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#loadbasegeombinary)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:236](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L236)

___

### loadBin

▸ **loadBin**(`reader`): `void`

Loads and populates `Points` object from a binary reader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree_BinReader.BinReader) | The reader value. |

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[loadBin](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#loadbin)

#### Defined in

[SceneTree/Geometry/Points.ts:41](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Points.ts#L41)

___

### numVertices

▸ **numVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[numVertices](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#numvertices)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[off](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#off)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[on](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#on)

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
| `listener` | (`event`: [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[once](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#once)

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
| `event` | `Record`<`string`, `any`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[parameterValueChanged](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#parametervaluechanged)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:37](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L37)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current geometry(Including line segments) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[readBinary](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#readbinary)

#### Defined in

[SceneTree/Geometry/Points.ts:99](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Points.ts#L99)

___

### rebuild

▸ `Private` **rebuild**(): `void`

The rebuild method.

#### Returns

`void`

#### Overrides

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[rebuild](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#rebuild)

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L71)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[removeListenerById](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#removelistenerbyid)

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

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[removeParameter](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L174)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[replaceParameter](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L196)

___

### resize

▸ `Private` **resize**(): `void`

The resize method.

#### Returns

`void`

#### Overrides

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[resize](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#resize)

#### Defined in

[SceneTree/Geometry/Shapes/PointGrid.ts:93](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/PointGrid.ts#L93)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[setBoundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#setboundingboxdirty)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[setDebugName](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#setdebugname)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[setMetadata](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#setmetadata)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[setNumVertices](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#setnumvertices)

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

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[toJSON](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#tojson)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:110](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L110)

___

### toString

▸ **toString**(): `string`

Returns geometry data value in json format.

#### Returns

`string`

- The return value.

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[toString](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#tostring)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:434](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L434)

___

### update

▸ **update**(): `void`

If the Procedural geometry is out of date, for example if a parameter has been changed,
this method explicitly forces the geometry to be recomputed.

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[update](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#update)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralPoints.ts:56](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/Shapes/ProceduralPoints.ts#L56)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Inherited from

[ProceduralPoints](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints).[updateBoundingBox](SceneTree_Geometry_Shapes_ProceduralPoints.ProceduralPoints#updateboundingbox)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:156](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Geometry/BaseGeom.ts#L156)

