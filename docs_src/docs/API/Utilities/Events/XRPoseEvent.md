---
id: "Utilities_Events_XRPoseEvent.XRPoseEvent"
title: "Class: XRPoseEvent"
sidebar_label: "XRPoseEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`XRPoseEvent`**

## Constructors

### constructor

• **new XRPoseEvent**(`viewport`, `viewXfo`, `controllers`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`VRViewport`](../../Renderer/VR/Renderer_VR_VRViewport.VRViewport) |
| `viewXfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) |
| `controllers` | [`VRController`](../../Renderer/VR/Renderer_VR_VRController.VRController)[] |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[Utilities/Events/XRPoseEvent.ts:21](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/XRPoseEvent.ts#L21)

## Properties

### controllers

• **controllers**: [`VRController`](../../Renderer/VR/Renderer_VR_VRController.VRController)[] = `[]`

#### Defined in

[Utilities/Events/XRPoseEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/XRPoseEvent.ts#L19)

___

### intersectionData

• **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[Utilities/Events/XRPoseEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/XRPoseEvent.ts#L20)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L14)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:16](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L16)

___

### viewXfo

• **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[Utilities/Events/XRPoseEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/XRPoseEvent.ts#L18)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:15](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L15)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L38)

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

[Utilities/Events/ZeaPointerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L30)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/Events/ZeaPointerEvent.ts#L26)

