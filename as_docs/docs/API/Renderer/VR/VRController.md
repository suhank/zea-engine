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
| `id` | `any` | The id value. |

#### Defined in

[Renderer/VR/VRController.ts:28](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L28)

## Properties

### \_\_activeVolumeSize

• `Protected` **\_\_activeVolumeSize**: `any`

#### Defined in

[Renderer/VR/VRController.ts:14](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L14)

___

### \_\_geomAtTip

• `Protected` **\_\_geomAtTip**: `any`

#### Defined in

[Renderer/VR/VRController.ts:18](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L18)

___

### \_\_hitTested

• `Protected` **\_\_hitTested**: `any`

#### Defined in

[Renderer/VR/VRController.ts:19](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L19)

___

### \_\_inputSource

• `Protected` **\_\_inputSource**: `any`

#### Defined in

[Renderer/VR/VRController.ts:8](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L8)

___

### \_\_intersectionData

• `Protected` **\_\_intersectionData**: `any`

#### Defined in

[Renderer/VR/VRController.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L21)

___

### \_\_mat4

• `Protected` **\_\_mat4**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRController.ts:10](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L10)

___

### \_\_tip

• `Protected` **\_\_tip**: `any`

#### Defined in

[Renderer/VR/VRController.ts:13](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L13)

___

### \_\_touchpadValue

• `Protected` **\_\_touchpadValue**: `any`

#### Defined in

[Renderer/VR/VRController.ts:17](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L17)

___

### \_\_treeItem

• `Protected` **\_\_treeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[Renderer/VR/VRController.ts:12](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L12)

___

### \_\_xfo

• `Protected` **\_\_xfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[Renderer/VR/VRController.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L11)

___

### buttonPressed

• `Protected` **buttonPressed**: `any`

#### Defined in

[Renderer/VR/VRController.ts:16](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L16)

___

### id

• `Protected` **id**: `number`

#### Defined in

[Renderer/VR/VRController.ts:9](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L9)

___

### pointerOverItem

• `Protected` **pointerOverItem**: `any`

#### Defined in

[Renderer/VR/VRController.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L20)

___

### tick

• `Protected` **tick**: `any`

#### Defined in

[Renderer/VR/VRController.ts:15](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L15)

___

### xrvp

• `Protected` **xrvp**: `any`

#### Defined in

[Renderer/VR/VRController.ts:7](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L7)

## Methods

### getControllerStageLocalXfo

▸ **getControllerStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:194](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L194)

___

### getControllerTipStageLocalXfo

▸ **getControllerTipStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerTipStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:202](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L202)

___

### getGeomItemAtTip

▸ **getGeomItemAtTip**(): `any`

The getGeomItemAtTip method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:273](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L273)

___

### getHandedness

▸ **getHandedness**(): `any`

The getHandedness method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:138](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L138)

___

### getId

▸ **getId**(): `number`

The getId method.

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:146](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L146)

___

### getTipItem

▸ **getTipItem**(): `any`

The getTipItem method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:162](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L162)

___

### getTipXfo

▸ **getTipXfo**(): `any`

The getTipXfo method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:170](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L170)

___

### getTouchPadValue

▸ **getTouchPadValue**(): `any`

The getTouchPadValue method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:178](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L178)

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L154)

___

### isButtonPressed

▸ **isButtonPressed**(): `any`

The isButtonPressed method.

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/VR/VRController.ts:186](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L186)

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
| `event` | `any` | The event object. |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRController.ts:215](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Renderer/VR/VRController.ts#L215)

