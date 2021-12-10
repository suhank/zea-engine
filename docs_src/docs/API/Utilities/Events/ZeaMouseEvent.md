---
id: "Utilities_Events_ZeaMouseEvent.ZeaMouseEvent"
title: "Class: ZeaMouseEvent"
sidebar_label: "ZeaMouseEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaUIEvent`](Utilities_Events_ZeaUIEvent.ZeaUIEvent)

  ↳ **`ZeaMouseEvent`**

  ↳↳ [`ZeaWheelEvent`](Utilities_Events_ZeaWheelEvent.ZeaWheelEvent)

## Constructors

### constructor

• **new ZeaMouseEvent**(`sourceEvent`, `rect`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceEvent` | `MouseEvent` |
| `rect` | `DOMRect` |

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[constructor](Utilities_Events_ZeaUIEvent.ZeaUIEvent#constructor)

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:16](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L16)

## Properties

### altKey

• **altKey**: `boolean`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L11)

___

### button

• **button**: `number`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L6)

___

### clientX

• **clientX**: `number`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L7)

___

### clientY

• **clientY**: `number`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L8)

___

### ctrlKey

• **ctrlKey**: `boolean`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:13](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L13)

___

### detail

• **detail**: `number`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[detail](Utilities_Events_ZeaUIEvent.ZeaUIEvent#detail)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaUIEvent.ts#L8)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[intersectionData](Utilities_Events_ZeaUIEvent.ZeaUIEvent#intersectiondata)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[leftGeometry](Utilities_Events_ZeaUIEvent.ZeaUIEvent#leftgeometry)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### metaKey

• **metaKey**: `boolean`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:12](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L12)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[pointerPos](Utilities_Events_ZeaUIEvent.ZeaUIEvent#pointerpos)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaUIEvent.ts#L9)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[pointerRay](Utilities_Events_ZeaUIEvent.ZeaUIEvent#pointerray)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaUIEvent.ts#L10)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[pointerType](Utilities_Events_ZeaUIEvent.ZeaUIEvent#pointertype)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L14)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[propagating](Utilities_Events_ZeaUIEvent.ZeaUIEvent#propagating)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:16](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L16)

___

### rendererX

• **rendererX**: `number`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L9)

___

### rendererY

• **rendererY**: `number`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L10)

___

### shiftKey

• **shiftKey**: `boolean`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L14)

___

### sourceEvent

• `Private` **sourceEvent**: `MouseEvent`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:15](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L15)

___

### viewport

• **viewport**: [`GLViewport`](../../Renderer/Renderer_GLViewport.GLViewport)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[viewport](Utilities_Events_ZeaUIEvent.ZeaUIEvent#viewport)

#### Defined in

[Utilities/Events/ZeaUIEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaUIEvent.ts#L7)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[getCapture](Utilities_Events_ZeaUIEvent.ZeaUIEvent#getcapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### preventDefault

▸ **preventDefault**(): `void`

#### Returns

`void`

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:45](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L45)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[releaseCapture](Utilities_Events_ZeaUIEvent.ZeaUIEvent#releasecapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L38)

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

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[setCapture](Utilities_Events_ZeaUIEvent.ZeaUIEvent#setcapture)

#### Defined in

[Utilities/Events/ZeaPointerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaPointerEvent.ts#L30)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[stopPropagation](Utilities_Events_ZeaUIEvent.ZeaUIEvent#stoppropagation)

#### Defined in

[Utilities/Events/ZeaMouseEvent.ts:41](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/Events/ZeaMouseEvent.ts#L41)

