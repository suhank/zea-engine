---
id: "Renderer_VR_VRHead.VRHead"
title: "Class: VRHead"
sidebar_label: "VRHead"
custom_edit_url: null
---



Class representing a VR head.

## Constructors

### constructor

• **new VRHead**(`xrvp`, `stageTreeItem`)

Create a VR head.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrvp` | `any` | The VR viewport. |
| `stageTreeItem` | `any` | The stageTreeItem value. |

#### Defined in

[Renderer/VR/VRHead.ts:18](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L18)

## Properties

### \_\_localXfo

• `Protected` **\_\_localXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[Renderer/VR/VRHead.ts:11](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L11)

___

### \_\_mat4

• `Protected` **\_\_mat4**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[Renderer/VR/VRHead.ts:10](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L10)

___

### \_\_treeItem

• `Protected` **\_\_treeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[Renderer/VR/VRHead.ts:9](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L9)

___

### \_\_xrvp

• `Protected` **\_\_xrvp**: `any`

#### Defined in

[Renderer/VR/VRHead.ts:8](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L8)

___

### hmdGeomItem

• `Protected` **hmdGeomItem**: `any`

#### Defined in

[Renderer/VR/VRHead.ts:12](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L12)

## Methods

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[Renderer/VR/VRHead.ts:78](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L78)

___

### getXfo

▸ **getXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[Renderer/VR/VRHead.ts:86](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L86)

___

### setVisible

▸ **setVisible**(`state`): `void`

The Set wether the HMB is visible in rendering or not. Used in spectator rendering.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `boolean` | The visibility value. |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRHead.ts:31](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L31)

___

### update

▸ **update**(`pose`): `void`

The update method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pose` | `any` | The pose value. |

#### Returns

`void`

#### Defined in

[Renderer/VR/VRHead.ts:57](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/VR/VRHead.ts#L57)

