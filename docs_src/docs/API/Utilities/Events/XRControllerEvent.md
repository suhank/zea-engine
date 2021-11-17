---
id: "Utilities_Events_XRControllerEvent.XRControllerEvent"
title: "Class: XRControllerEvent"
sidebar_label: "XRControllerEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`XRControllerEvent`**

## Constructors

### constructor

• **new XRControllerEvent**(`button`, `controller`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `button` | `number` |
| `controller` | [`VRController`](../../Renderer/VR/Renderer_VR_VRController.VRController) |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[Utilities/Events/XRControllerEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/XRControllerEvent.ts#L8)

## Properties

### button

• **button**: `number`

#### Defined in

[Utilities/Events/XRControllerEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/XRControllerEvent.ts#L6)

___

### buttonPressed

• **buttonPressed**: `boolean`

#### Defined in

[Utilities/Events/XRControllerEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/XRControllerEvent.ts#L7)

___

### controller

• **controller**: [`VRController`](../../Renderer/VR/Renderer_VR_VRController.VRController)

#### Defined in

[Utilities/Events/XRControllerEvent.ts:5](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/XRControllerEvent.ts#L5)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L14)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:16](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L16)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:15](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L15)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L38)

___

### setCapture

▸ **setCapture**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) |

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[setCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#setcapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L30)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/f5f8fb8b9/src/Utilities/Events/ZeaPointerEvent.ts#L26)

