---
id: "SceneTree_Geometry_Shapes_Cuboid.Cuboid"
title: "Class: Cuboid"
sidebar_label: "Cuboid"
custom_edit_url: null
---



A class for generating a cuboid geometry.

**Parameters**
* **x(`NumberParameter`):** Length of the line cuboid along the `X` axis
* **y(`NumberParameter`):** Length of the line cuboid along the `Y` axis
* **z(`NumberParameter`):** Length of the line cuboid along the `Z` axis
* **BaseZAtZero(`NumberParameter`):** Property to start or not `Z` axis from position `0.

## Hierarchy

- [`ProceduralMesh`](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh)

  ↳ **`Cuboid`**

## Constructors

### constructor

• **new Cuboid**(`x?`, `y?`, `z?`, `baseZAtZero?`)

Create a cuboid.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` | `1.0` | The length of the cuboid along the X axis. |
| `y` | `number` | `1.0` | The length of the cuboid along the Y axis. |
| `z` | `number` | `1.0` | The length of the cuboid along the Z axis. |
| `baseZAtZero` | `boolean` | `false` | The baseZAtZero value. |

#### Overrides

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[constructor](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#constructor)

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:49](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L49)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../../Math/Math_Box3.Box3)

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__boundingBox](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__boundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:20](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L20)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__boundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__boundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:21](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L21)

___

### \_\_edgeAttributes

• `Protected` **\_\_edgeAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__edgeAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__edgeattributes)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:34](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L34)

___

### \_\_faceAttributes

• `Protected` **\_\_faceAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__faceAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__faceattributes)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:35](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L35)

___

### \_\_faceVertexIndices

• `Protected` **\_\_faceVertexIndices**: `Uint32Array`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__faceVertexIndices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__facevertexindices)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:31](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L31)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__id](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L11)

___

### \_\_logTopologyWarnings

• `Protected` **\_\_logTopologyWarnings**: `boolean`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__logTopologyWarnings](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__logtopologywarnings)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:32](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L32)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__metaData](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__metadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:22](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L22)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__name](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:23](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L23)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__numVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:24](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L24)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__vertexAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__vertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L25)

___

### baseZAtZeroParam

• **baseZAtZeroParam**: [`BooleanParameter`](../../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** baseZAtZeroParam - Property to start or not `Z` axis from position `0.

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L25)

___

### debugColor

• **debugColor**: [`Color`](../../../Math/Math_Color.Color)

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[debugColor](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#debugcolor)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:26](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L26)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[deprecatedParamMapping](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L25)

___

### dirtyTopology

• **dirtyTopology**: `boolean`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[dirtyTopology](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#dirtytopology)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:13](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L13)

___

### dirtyVertices

• **dirtyVertices**: `boolean`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[dirtyVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#dirtyvertices)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:14](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L14)

___

### edgeAngles

• `Protected` **edgeAngles**: `Float32Array`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeAngles](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgeangles)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:39](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L39)

___

### edgeFaces

• `Protected` **edgeFaces**: `number`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeFaces](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgefaces)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:41](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L41)

___

### edgeVecs

• `Protected` **edgeVecs**: [`Vec3`](../../../Math/Math_Vec3.Vec3)[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeVecs](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgevecs)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:40](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L40)

___

### edgeVerts

• **edgeVerts**: `number`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeVerts](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgeverts)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:38](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L38)

___

### faceCounts

• `Protected` **faceCounts**: `number`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[faceCounts](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#facecounts)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:30](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L30)

___

### faceEdges

• `Protected` **faceEdges**: `number`[][]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[faceEdges](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#faceedges)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:42](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L42)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[listeners](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[name](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:27](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L27)

___

### numEdges

• `Protected` **numEdges**: `number`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[numEdges](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#numedges)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:37](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L37)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[paramEventListenerIDs](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[paramMapping](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[params](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L24)

___

### sizeXParam

• **sizeXParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** sizeXParam - Length of the line cuboid along the `X` axis

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:30](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L30)

___

### sizeYParam

• **sizeYParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** sizeYParam - Length of the line cuboid along the `Y` axis

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:35](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L35)

___

### sizeZParam

• **sizeZParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** sizeZParam - Length of the line cuboid along the `Z` axis

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:40](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L40)

___

### topologyParams

• **topologyParams**: `string`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[topologyParams](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#topologyparams)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:15](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L15)

___

### vertexEdges

• `Protected` **vertexEdges**: `Set`<`number`\>[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[vertexEdges](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#vertexedges)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:43](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L43)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Inherited from

ProceduralMesh.positions

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:100](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L100)

## Methods

### addEdgeAttribute

▸ **addEdgeAttribute**(`name`, `attr`): `void`

The addEdgeAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the edge attribute to add. |
| `attr` | [`Attribute`](../SceneTree_Geometry_Attribute.Attribute) | The attr value |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[addEdgeAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#addedgeattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:302](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L302)

___

### addFace

▸ **addFace**(`vertexIndices`): `number`

Adds a new face to the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertexIndices` | `number`[] | The vertex indices of the face. |

#### Returns

`number`

- The index of the face in the mesh.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[addFace](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#addface)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:209](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L209)

___

### addFaceAttribute

▸ **addFaceAttribute**(`name`, `attr`): [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

The addFaceAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the face attribute to add. |
| `attr` | [`Attribute`](../SceneTree_Geometry_Attribute.Attribute) | The attr value |

#### Returns

[`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[addFaceAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#addfaceattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:270](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L270)

___

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[addParameter](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L135)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[addParameterDeprecationMapping](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L92)

___

### addVertexAttribute

▸ **addVertexAttribute**(`name`, `attr`): `void`

Adds a new vertex attribute to the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |
| `attr` | [`Attribute`](../SceneTree_Geometry_Attribute.Attribute) | The attribute to add to the geometry |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[addVertexAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#addvertexattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:89](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L89)

___

### calculateEdgeAngles

▸ **calculateEdgeAngles**(): `void`

Calculates the angles at each edge between the adjoining faces

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[calculateEdgeAngles](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#calculateedgeangles)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:459](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L459)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[clear](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#clear)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:71](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L71)

___

### computeFaceNormals

▸ **computeFaceNormals**(): `void`

Computes a normal value per face by averaging the triangle normals of the face.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[computeFaceNormals](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#computefacenormals)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:428](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L428)

___

### computeHardEdgesIndices

▸ **computeHardEdgesIndices**(`hardAngle?`): `Uint32Array`

The computeHardEdgesIndices method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `hardAngle` | `number` | `1.0` | The hardAngle value in radians. |

#### Returns

`Uint32Array`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[computeHardEdgesIndices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#computehardedgesindices)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:105](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L105)

___

### computeNumTriangles

▸ **computeNumTriangles**(): `number`

Compute the number of triangles. For higher degree polygons, they are divided into multiple triangles for rendering.

#### Returns

`number`

- Returns the number of triangles.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[computeNumTriangles](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#computenumtriangles)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:818](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L818)

___

### computeVertexNormals

▸ **computeVertexNormals**(`hardAngle?`): [`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Compute vertex normals.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `hardAngle` | `number` | `1.0` | The hardAngle value in radians. |

#### Returns

[`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[computeVertexNormals](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#computevertexnormals)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:95](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L95)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../../SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[copyFrom](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L316)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[deleteMetadata](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#deletemetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:208](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L208)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[emit](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

e.g. to load data into the mesh class, provide a json structure similar to the following.
Note: faceCounts is an array of count values, starting with the number of triangles, then the number of quads. See #setFaceCounts
The faceVertexIndices array should also be sorted to contain all the triangles first, followed by the quads, and then the pentagons etc..
```json
// This code will define a mesh made up of 2 triangles and then a quad.
const mesh = new Mesh()
mesh.fromJSON({
  faceCounts:[2, 1],
  faceVertexIndices: [0, 1, 2, 0, 2, 3, 3, 2, 4, 5],
  numVertices: 6,
  vertexAttributes: {
    positions: {
      dataType: 'Vec3'
      defaultScalarValue: 0.0,
      data: [0,0,0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 2, 0, 0]
    }
  }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[fromJSON](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#fromjson)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:986](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L986)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[genBuffers](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#genbuffers)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:117](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L117)

___

### genTopologyInfo

▸ **genTopologyInfo**(): `void`

The genTopologyInfo method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[genTopologyInfo](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#gentopologyinfo)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:330](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L330)

___

### generateTriangulatedIndices

▸ **generateTriangulatedIndices**(`totalNumVertices`, `numUnSplitVertices`, `splitIndices`): `Uint32Array` \| `Uint8Array` \| `Uint16Array`

To prepare data for rendering, the indices for the polygons is used to compute a new index buffer based on
only triangles. This is used during rendering and the resulting indices uploaded ot the GPU  by GLMesh class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `totalNumVertices` | `number` | The total number of vertices. |
| `numUnSplitVertices` | `number` | The total number of un-split vertices. |
| `splitIndices` | `Record`<`number`, `Record`<`number`, `number`\>\> | The splitIndices value. |

#### Returns

`Uint32Array` \| `Uint8Array` \| `Uint16Array`

- Returns a typed array containing the triangulated indices.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[generateTriangulatedIndices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#generatetriangulatedindices)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:837](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L837)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getBoundingBox](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getboundingbox)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:75](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L75)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getClassName](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L33)

___

### getEdgeAttribute

▸ **getEdgeAttribute**(`name`): [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

The getEdgeAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the edge attribute. |

#### Returns

[`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getEdgeAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getedgeattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:321](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L321)

___

### getFaceAttribute

▸ **getFaceAttribute**(`name`): [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

The getFaceAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the face attribute. |

#### Returns

[`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getFaceAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getfaceattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:290](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L290)

___

### getFaceCounts

▸ **getFaceCounts**(): `number`[]

The getFaceCounts method.

#### Returns

`number`[]

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getFaceCounts](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getfacecounts)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:98](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L98)

___

### getFaceVertexCount

▸ **getFaceVertexCount**(`faceIndex`): `number`

Returns the number of vertices indexed by this face

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getFaceVertexCount](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getfacevertexcount)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:154](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L154)

___

### getFaceVertexIndex

▸ **getFaceVertexIndex**(`faceIndex`, `faceVertex`): `number`

Returns a single vertex index for a given face and faceVertex.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |
| `faceVertex` | `number` | The face vertex is the index within the face. So the first vertex index is 0. |

#### Returns

`number`

- The vertex index

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getFaceVertexIndex](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getfacevertexindex)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:257](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L257)

___

### getFaceVertexIndices

▸ **getFaceVertexIndices**(`faceIndex`): `number`[]

Returns the vertex indices of the specified face.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The index of the specified face |

#### Returns

`number`[]

- An array of indices into the vertex attributes

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getFaceVertexIndices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getfacevertexindices)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:241](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L241)

___

### getFaceVertexOffset

▸ **getFaceVertexOffset**(`faceIndex`): `number`

Returns the offset of the face indices within the entire index array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getFaceVertexOffset](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getfacevertexoffset)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:173](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L173)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getId](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L25)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getMetadata](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:179](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L179)

___

### getNumFaces

▸ **getNumFaces**(): `number`

The getNumFaces method.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getNumFaces](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getnumfaces)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:106](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L106)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getNumParameters](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L41)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getNumVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getnumvertices)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:85](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L85)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getParameter](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L102)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getParameterByIndex](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L70)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getParameterIndex](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getParameters](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L50)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getVertexAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:81](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L81)

___

### getVertexAttributes

▸ **getVertexAttributes**(): `Record`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

Returns all vertex attributes in an object with their names.

#### Returns

`Record`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[getVertexAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#getvertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:90](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L90)

___

### hasEdgeAttribute

▸ **hasEdgeAttribute**(`name`): `boolean`

The hasEdgeAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the edge attribute. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[hasEdgeAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#hasedgeattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:312](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L312)

___

### hasFaceAttribute

▸ **hasFaceAttribute**(`name`): `boolean`

The hasFaceAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the face attribute. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[hasFaceAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#hasfaceattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:281](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L281)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[hasMetadata](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#hasmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:189](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L189)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[hasParameter](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L80)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[hasVertexAttribute](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#hasvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:71](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L71)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[insertParameter](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L149)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[loadBaseGeomBinary](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#loadbasegeombinary)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:237](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L237)

___

### numVertices

▸ **numVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[numVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:109](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L109)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[off](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L97)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[on](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L44)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[once](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L82)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[parameterValueChanged](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#parametervaluechanged)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:40](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L40)

___

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

Restores mesh properties from a binary reader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[readBinary](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#readbinary)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:880](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L880)

___

### rebuild

▸ `Private` **rebuild**(): `void`

The rebuild method.

#### Returns

`void`

#### Overrides

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[rebuild](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#rebuild)

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:77](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L77)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[removeListenerById](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L134)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[removeParameter](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L176)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[replaceParameter](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L198)

___

### resize

▸ `Private` **resize**(): `void`

The resize method.

#### Returns

`void`

#### Overrides

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[resize](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#resize)

#### Defined in

[src/SceneTree/Geometry/Shapes/Cuboid.ts:126](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/Cuboid.ts#L126)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setBoundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setboundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:149](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L149)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setDebugName](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setdebugname)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:49](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L49)

___

### setFaceCounts

▸ **setFaceCounts**(`faceCounts`): `void`

Sets the number of faces on the mesh using an array specifying the counts per polygon size.
The first item in the array specifies the number of triangles, the second, the number of quads, the 3rd, the number of 5 sided polygons etc..
e.g. to specify 2 triangles, and 7 quads, we would pass [2, 7]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceCounts` | `number`[] | The faceCounts value. |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setFaceCounts](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setfacecounts)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:116](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L116)

___

### setFaceVertexIndices

▸ **setFaceVertexIndices**(`faceIndex`, `vertexIndices`): `void`

The setFaceVertexIndices method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |
| `vertexIndices` | `number`[] | The array of vertex indices for this face value. |

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setFaceVertexIndices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setfacevertexindices)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:193](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Mesh.ts#L193)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setMetadata](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:199](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L199)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setNumVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setnumvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:127](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L127)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[toJSON](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#tojson)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:131](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L131)

___

### toString

▸ **toString**(): `string`

Returns geometry data value in json format.

#### Returns

`string`

- The return value.

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[toString](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#tostring)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:435](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L435)

___

### update

▸ **update**(): `void`

If the Procedural geometry is out of date, for example if a parameter has been changed,
this method explicitly forces the geometry to be recomputed.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[update](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#update)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralMesh.ts:58](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L58)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[updateBoundingBox](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#updateboundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:157](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/BaseGeom.ts#L157)

