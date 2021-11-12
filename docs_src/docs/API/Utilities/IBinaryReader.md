---
id: "Utilities_IBinaryReader.IBinaryReader"
title: "Interface: IBinaryReader"
sidebar_label: "IBinaryReader"
custom_edit_url: null
---



## Implemented by

- [`BooleanParameter`](../SceneTree/Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)
- [`BoundingBoxParameter`](../SceneTree/Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)
- [`ColorParameter`](../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)
- [`Mat3Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Mat3Parameter.Mat3Parameter)
- [`Mat4Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Mat4Parameter.Mat4Parameter)
- [`MaterialFloatParam`](../SceneTree/Parameters/SceneTree_Parameters_MaterialFloatParam.MaterialFloatParam)
- [`NumberParameter`](../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)
- [`QuatParameter`](../SceneTree/Parameters/SceneTree_Parameters_QuatParameter.QuatParameter)
- [`StringListParameter`](../SceneTree/Parameters/SceneTree_Parameters_StringListParameter.StringListParameter)
- [`StringParameter`](../SceneTree/Parameters/SceneTree_Parameters_StringParameter.StringParameter)
- [`Vec2Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Vec2Parameter.Vec2Parameter)
- [`Vec3Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Vec3Parameter.Vec3Parameter)
- [`Vec4Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Vec4Parameter.Vec4Parameter)
- [`XfoParameter`](../SceneTree/Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

## Methods

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

The readBinary method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`void`

#### Defined in

[Utilities/IBinaryReader.ts:10](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/IBinaryReader.ts#L10)

