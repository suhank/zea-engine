---
id: "Renderer_VR_VRController.VRController"
title: "Class: VRController"
sidebar_label: "VRController"
custom_edit_url: null
---



Class representing a VR controller.

## Constructors

### constructor

• **new VRController**(`xrvp`, `inputSource`, `id`)

Create a VR controller.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrvp` | `any` | The Vr viewport. |
| `inputSource` | `any` | The input source. |
| `id` | `number` | The id value. |

#### Defined in

Renderer/VR/VRController.ts:30

## Properties

### activeVolumeSize

• `Protected` **activeVolumeSize**: `number` = `0.04`

#### Defined in

Renderer/VR/VRController.ts:18

___

### buttonPressed

• **buttonPressed**: `boolean`

#### Defined in

Renderer/VR/VRController.ts:11

___

### hitTested

• `Protected` **hitTested**: `boolean`

#### Defined in

Renderer/VR/VRController.ts:21

___

### id

• **id**: `number`

#### Defined in

Renderer/VR/VRController.ts:10

___

### inputSource

• `Protected` **inputSource**: `any`

#### Defined in

Renderer/VR/VRController.ts:13

___

### intersectionData

• `Protected` **intersectionData**: [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

#### Defined in

Renderer/VR/VRController.ts:23

___

### mat4

• `Protected` **mat4**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

Renderer/VR/VRController.ts:14

___

### pointerOverItem

• `Protected` **pointerOverItem**: `any`

#### Defined in

Renderer/VR/VRController.ts:22

___

### tick

• `Protected` **tick**: `number`

#### Defined in

Renderer/VR/VRController.ts:19

___

### tipItem

• `Protected` **tipItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

Renderer/VR/VRController.ts:17

___

### touchpadValue

• `Protected` **touchpadValue**: `any`

#### Defined in

Renderer/VR/VRController.ts:20

___

### treeItem

• `Protected` **treeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

Renderer/VR/VRController.ts:16

___

### xfo

• `Protected` **xfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

Renderer/VR/VRController.ts:15

___

### xrvp

• `Protected` **xrvp**: [`VRViewport`](Renderer_VR_VRViewport.VRViewport)

#### Defined in

Renderer/VR/VRController.ts:12

## Methods

### getControllerStageLocalXfo

▸ **getControllerStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

Renderer/VR/VRController.ts:194

___

### getControllerTipStageLocalXfo

▸ **getControllerTipStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerTipStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

Renderer/VR/VRController.ts:202

___

### getGeomItemAtTip

▸ **getGeomItemAtTip**(): [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

The getGeomItemAtTip method.

#### Returns

[`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

- The return value.

#### Defined in

Renderer/VR/VRController.ts:272

___

### getHandedness

▸ **getHandedness**(): `any`

The getHandedness method.

#### Returns

`any`

- The return value.

#### Defined in

Renderer/VR/VRController.ts:138

___

### getId

▸ **getId**(): `number`

The getId method.

#### Returns

`number`

- The return value.

#### Defined in

Renderer/VR/VRController.ts:146

___

### getTipItem

▸ **getTipItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTipItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

Renderer/VR/VRController.ts:162

___

### getTipXfo

▸ **getTipXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getTipXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

Renderer/VR/VRController.ts:170

___

### getTouchPadValue

▸ **getTouchPadValue**(): `any`

The getTouchPadValue method.

#### Returns

`any`

- The return value.

#### Defined in

Renderer/VR/VRController.ts:178

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

Renderer/VR/VRController.ts:154

___

### isButtonPressed

▸ **isButtonPressed**(): `boolean`

The isButtonPressed method.

#### Returns

`boolean`

- The return value.

#### Defined in

Renderer/VR/VRController.ts:186

___

### updatePose

▸ **updatePose**(`refSpace`, `xrFrame`, `inputSource`, `event`): `void`

The updatePose method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refSpace` | `any` | The refSpace value. |
| `xrFrame` | `any` | The xrFrame value. |
| `inputSource` | `any` | The inputSource value. |
| `event` | [`XRPoseEvent`](../../Utilities/Events/Utilities_Events_XRPoseEvent.XRPoseEvent) | The event object. |

#### Returns

`void`

#### Defined in

Renderer/VR/VRController.ts:215

