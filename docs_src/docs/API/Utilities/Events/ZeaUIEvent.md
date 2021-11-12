---
id: "Utilities_Events_ZeaUIEvent.ZeaUIEvent"
title: "Class: ZeaUIEvent"
sidebar_label: "ZeaUIEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`ZeaUIEvent`**

  ↳↳ [`ZeaMouseEvent`](Utilities_Events_ZeaMouseEvent.ZeaMouseEvent)

  ↳↳ [`ZeaTouchEvent`](Utilities_Events_ZeaTouchEvent.ZeaTouchEvent)

## Constructors

### constructor

• **new ZeaUIEvent**(`pointerType`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerType` | `string` |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:12](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaUIEvent.ts#L12)

## Properties

### detail

• **detail**: `number`

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaUIEvent.ts#L8)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaUIEvent.ts#L9)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaUIEvent.ts#L10)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L14)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:16](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L16)

___

### viewport

• **viewport**: [`GLViewport`](../../Renderer/Renderer_GLViewport.GLViewport)

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaUIEvent.ts#L7)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L38)

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

[Utilities/Events/ZeaPointerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L30)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/Events/ZeaPointerEvent.ts#L26)

