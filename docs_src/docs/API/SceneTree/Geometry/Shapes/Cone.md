---
id: "SceneTree_Geometry_Shapes_Cone.Cone"
title: "Class: Cone"
sidebar_label: "Cone"
custom_edit_url: null
---



Represents a cone geometry.

```
const cone = new Cone(1.2, 4.0)
```

**Parameters**
* **Radius(`NumberParameter`):** Specifies the radius of the base of the cone.
* **Height(`NumberParameter`):** Specifies the height of the cone.
* **Detail(`NumberParameter`):** Specifies the number of subdivisions around the `Z` axis.
* **Cap(`BooleanParameter`):** Specifies whether the base of the cone is capped or open.

## Hierarchy

- [`ProceduralMesh`](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh)

  ↳ **`Cone`**

## Constructors

### constructor

• **new Cone**(`radius?`, `height?`, `detail?`, `cap?`, `addNormals?`, `addTextureCoords?`)

Create a cone.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `radius` | `number` | `0.5` | The radius of the base of the cone. |
| `height` | `number` | `1.0` | The height of the cone. |
| `detail` | `number` | `32` | The detail of the cone. |
| `cap` | `boolean` | `true` | A boolean indicating whether the base of the cone is capped or open. |
| `addNormals` | `boolean` | `true` | Compute vertex normals for the geometry |
| `addTextureCoords` | `boolean` | `true` | Compute texture coordinates for the geometry |

#### Overrides

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[constructor](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#constructor)

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:55](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L55)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../../Math/Math_Box3.Box3)

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__boundingBox](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__boundingbox)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:20](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L20)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__boundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__boundingboxdirty)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:21](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L21)

___

### \_\_edgeAttributes

• `Protected` **\_\_edgeAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__edgeAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__edgeattributes)

#### Defined in

[SceneTree/Geometry/Mesh.ts:33](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L33)

___

### \_\_faceAttributes

• `Protected` **\_\_faceAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__faceAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__faceattributes)

#### Defined in

[SceneTree/Geometry/Mesh.ts:34](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L34)

___

### \_\_faceVertexIndices

• `Protected` **\_\_faceVertexIndices**: `Uint32Array`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__faceVertexIndices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__facevertexindices)

#### Defined in

[SceneTree/Geometry/Mesh.ts:30](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L30)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__id](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/BaseClass.ts#L11)

___

### \_\_logTopologyWarnings

• `Protected` **\_\_logTopologyWarnings**: `boolean`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__logTopologyWarnings](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__logtopologywarnings)

#### Defined in

[SceneTree/Geometry/Mesh.ts:31](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L31)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__metaData](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__metadata)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:22](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L22)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__name](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__name)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:23](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L23)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__numVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__numvertices)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:24](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L24)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[__vertexAttributes](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#__vertexattributes)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:25](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L25)

___

### capParam

• **capParam**: [`BooleanParameter`](../../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** capParam - Specifies whether the base of the cone is capped or open.

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:28](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L28)

___

### debugColor

• **debugColor**: [`Color`](../../../Math/Math_Color.Color)

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[debugColor](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#debugcolor)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:26](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L26)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[deprecatedParamMapping](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L23)

___

### detailParam

• **detailParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** detailParam - Specifies the number of subdivisions around the `Z` axis.

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:33](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L33)

___

### dirtyTopology

• **dirtyTopology**: `boolean`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[dirtyTopology](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#dirtytopology)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:11](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L11)

___

### dirtyVertices

• **dirtyVertices**: `boolean`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[dirtyVertices](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#dirtyvertices)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:12](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L12)

___

### edgeAngles

• `Protected` **edgeAngles**: `Float32Array`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeAngles](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgeangles)

#### Defined in

[SceneTree/Geometry/Mesh.ts:38](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L38)

___

### edgeFaces

• `Protected` **edgeFaces**: `number`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeFaces](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgefaces)

#### Defined in

[SceneTree/Geometry/Mesh.ts:40](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L40)

___

### edgeVecs

• `Protected` **edgeVecs**: [`Vec3`](../../../Math/Math_Vec3.Vec3)[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeVecs](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgevecs)

#### Defined in

[SceneTree/Geometry/Mesh.ts:39](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L39)

___

### edgeVerts

• **edgeVerts**: `number`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[edgeVerts](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#edgeverts)

#### Defined in

[SceneTree/Geometry/Mesh.ts:37](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L37)

___

### faceCounts

• `Protected` **faceCounts**: `number`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[faceCounts](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#facecounts)

#### Defined in

[SceneTree/Geometry/Mesh.ts:29](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L29)

___

### faceEdges

• `Protected` **faceEdges**: `number`[][]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[faceEdges](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#faceedges)

#### Defined in

[SceneTree/Geometry/Mesh.ts:41](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L41)

___

### heightParam

• **heightParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** heightParam - Specifies the height of the cone.

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:38](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L38)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[listeners](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[name](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#name)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:27](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L27)

___

### numEdges

• `Protected` **numEdges**: `number`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[numEdges](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#numedges)

#### Defined in

[SceneTree/Geometry/Mesh.ts:36](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L36)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[paramEventListenerIDs](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[paramMapping](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[params](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L22)

___

### radiusParam

• **radiusParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** radiusParam - Specifies the radius of the base of the cone.

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:43](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L43)

___

### topologyParams

• **topologyParams**: `string`[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[topologyParams](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#topologyparams)

#### Defined in

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:13](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L13)

___

### vertexEdges

• `Protected` **vertexEdges**: `Set`<`number`\>[]

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[vertexEdges](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#vertexedges)

#### Defined in

[SceneTree/Geometry/Mesh.ts:42](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L42)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Inherited from

ProceduralMesh.positions

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:100](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L100)

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

[SceneTree/Geometry/Mesh.ts:307](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L307)

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

[SceneTree/Geometry/Mesh.ts:214](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L214)

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

[SceneTree/Geometry/Mesh.ts:275](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L275)

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

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L133)

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

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L90)

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

[SceneTree/Geometry/Mesh.ts:94](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L94)

___

### calculateEdgeAngles

▸ **calculateEdgeAngles**(): `void`

Calculates the angles at each edge between the adjoining faces

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[calculateEdgeAngles](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#calculateedgeangles)

#### Defined in

[SceneTree/Geometry/Mesh.ts:464](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L464)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[clear](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#clear)

#### Defined in

[SceneTree/Geometry/Mesh.ts:76](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L76)

___

### computeFaceNormals

▸ **computeFaceNormals**(): `void`

Computes a normal value per face by averaging the triangle normals of the face.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[computeFaceNormals](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#computefacenormals)

#### Defined in

[SceneTree/Geometry/Mesh.ts:433](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L433)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:103](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L103)

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

[SceneTree/Geometry/Mesh.ts:823](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L823)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:93](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L93)

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

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[copyFrom](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L314)

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

[SceneTree/Geometry/BaseGeom.ts:208](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L208)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/EventEmitter.ts#L154)

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

[SceneTree/Geometry/Mesh.ts:991](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L991)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:115](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L115)

___

### genTopologyInfo

▸ **genTopologyInfo**(): `void`

The genTopologyInfo method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[genTopologyInfo](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#gentopologyinfo)

#### Defined in

[SceneTree/Geometry/Mesh.ts:335](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L335)

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

[SceneTree/Geometry/Mesh.ts:842](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L842)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:73](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L73)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/BaseClass.ts#L33)

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

[SceneTree/Geometry/Mesh.ts:326](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L326)

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

[SceneTree/Geometry/Mesh.ts:295](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L295)

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

[SceneTree/Geometry/Mesh.ts:103](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L103)

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

[SceneTree/Geometry/Mesh.ts:159](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L159)

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

[SceneTree/Geometry/Mesh.ts:262](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L262)

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

[SceneTree/Geometry/Mesh.ts:246](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L246)

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

[SceneTree/Geometry/Mesh.ts:178](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L178)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/BaseClass.ts#L25)

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

[SceneTree/Geometry/BaseGeom.ts:179](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L179)

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

[SceneTree/Geometry/Mesh.ts:111](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L111)

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

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L39)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:83](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L83)

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

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L100)

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

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L68)

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

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L58)

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

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L48)

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

[SceneTree/Geometry/BaseGeom.ts:81](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L81)

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

[SceneTree/Geometry/BaseGeom.ts:90](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L90)

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

[SceneTree/Geometry/Mesh.ts:317](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L317)

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

[SceneTree/Geometry/Mesh.ts:286](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L286)

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

[SceneTree/Geometry/BaseGeom.ts:189](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L189)

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

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L78)

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

[SceneTree/Geometry/BaseGeom.ts:71](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L71)

___

### init

▸ `Private` **init**(): `void`

The init method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[init](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#init)

#### Defined in

[SceneTree/Geometry/Mesh.ts:71](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L71)

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

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L147)

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

[SceneTree/Geometry/BaseGeom.ts:237](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L237)

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

[SceneTree/Geometry/BaseGeom.ts:109](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L109)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/EventEmitter.ts#L82)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:38](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L38)

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

[SceneTree/Geometry/Mesh.ts:885](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L885)

___

### rebuild

▸ `Private` **rebuild**(): `void`

The rebuild method.

#### Returns

`void`

#### Overrides

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[rebuild](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#rebuild)

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:78](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L78)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/Utilities/EventEmitter.ts#L134)

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

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L174)

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

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/ParameterOwner.ts#L196)

___

### resize

▸ `Private` **resize**(): `void`

The resize method.

#### Returns

`void`

#### Overrides

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[resize](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#resize)

#### Defined in

[SceneTree/Geometry/Shapes/Cone.ts:150](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/Cone.ts#L150)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[setBoundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#setboundingboxdirty)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:149](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L149)

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

[SceneTree/Geometry/BaseGeom.ts:49](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L49)

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

[SceneTree/Geometry/Mesh.ts:121](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L121)

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

[SceneTree/Geometry/Mesh.ts:198](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Mesh.ts#L198)

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

[SceneTree/Geometry/BaseGeom.ts:199](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L199)

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

[SceneTree/Geometry/BaseGeom.ts:127](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L127)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:129](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L129)

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

[SceneTree/Geometry/BaseGeom.ts:435](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L435)

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

[SceneTree/Geometry/Shapes/ProceduralMesh.ts:56](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/Shapes/ProceduralMesh.ts#L56)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Inherited from

[ProceduralMesh](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh).[updateBoundingBox](SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh#updateboundingbox)

#### Defined in

[SceneTree/Geometry/BaseGeom.ts:157](https://github.com/ZeaInc/zea-engine/blob/a43ac923/src/SceneTree/Geometry/BaseGeom.ts#L157)

