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

• **new XRControllerEvent**(`viewport`, `controller`, `button`, `buttonPressed`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`XRViewport`](../../Renderer/VR/Renderer_VR_XRViewport.XRViewport) |
| `controller` | [`XRController`](../../Renderer/VR/Renderer_VR_XRController.XRController) |
| `button` | `number` |
| `buttonPressed` | `number` |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L10)

## Properties

### button

• **button**: `number`

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L8)

___

### buttonPressed

• **buttonPressed**: `number` = `0`

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L9)

___

### controller

• **controller**: [`XRController`](../../Renderer/VR/Renderer_VR_XRController.XRController)

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L7)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:22](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/ZeaPointerEvent.ts#L22)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerRay](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:17](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/ZeaPointerEvent.ts#L17)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/ZeaPointerEvent.ts#L19)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L26)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L30)

___

### setCapture

▸ **setCapture**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) |

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[setCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#setcapture)

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:22](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L22)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[src/Utilities/Events/XRControllerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/Events/XRControllerEvent.ts#L18)

