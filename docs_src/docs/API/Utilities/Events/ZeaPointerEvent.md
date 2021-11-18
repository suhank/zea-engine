---
id: "Utilities_Events_ZeaPointerEvent.ZeaPointerEvent"
title: "Class: ZeaPointerEvent"
sidebar_label: "ZeaPointerEvent"
custom_edit_url: null
---



## Hierarchy

- [`BaseEvent`](../Utilities_BaseEvent.BaseEvent)

  ↳ **`ZeaPointerEvent`**

  ↳↳ [`XRControllerEvent`](Utilities_Events_XRControllerEvent.XRControllerEvent)

  ↳↳ [`XRPoseEvent`](Utilities_Events_XRPoseEvent.XRPoseEvent)

  ↳↳ [`ZeaUIEvent`](Utilities_Events_ZeaUIEvent.ZeaUIEvent)

## Constructors

### constructor

• **new ZeaPointerEvent**(`pointerType`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerType` | `string` |

#### Overrides

[BaseEvent](../Utilities_BaseEvent.BaseEvent).[constructor](../Utilities_BaseEvent.BaseEvent#constructor)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:21](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L21)

## Properties

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerType

• **pointerType**: `string`

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L14)

___

### propagating

• **propagating**: `boolean` = `true`

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:16](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L16)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:15](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L15)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L38)

___

### setCapture

▸ **setCapture**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) |

#### Returns

`void`

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L30)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/9080cb30e/src/Utilities/Events/ZeaPointerEvent.ts#L26)

