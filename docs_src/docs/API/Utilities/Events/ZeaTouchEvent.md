---
id: "Utilities_Events_ZeaTouchEvent.ZeaTouchEvent"
title: "Class: ZeaTouchEvent"
sidebar_label: "ZeaTouchEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaUIEvent`](Utilities_Events_ZeaUIEvent.ZeaUIEvent)

  ↳ **`ZeaTouchEvent`**

## Constructors

### constructor

• **new ZeaTouchEvent**(`sourceEvent`, `rect`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceEvent` | `TouchEvent` |
| `rect` | `DOMRect` |

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[constructor](Utilities_Events_ZeaUIEvent.ZeaUIEvent#constructor)

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:69

## Properties

### altKey

• **altKey**: `boolean` = `false`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:62

___

### changedTouches

• **changedTouches**: [`Touch`](Utilities_Events_ZeaTouchEvent.Touch)[] = `[]`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:60

___

### ctrlKey

• **ctrlKey**: `boolean` = `false`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:64

___

### detail

• **detail**: `number`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[detail](Utilities_Events_ZeaUIEvent.ZeaUIEvent#detail)

#### Defined in

Utilities/Events/ZeaUIEvent.ts:8

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[intersectionData](Utilities_Events_ZeaUIEvent.ZeaUIEvent#intersectiondata)

#### Defined in

Utilities/Events/ZeaPointerEvent.ts:18

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[leftGeometry](Utilities_Events_ZeaUIEvent.ZeaUIEvent#leftgeometry)

#### Defined in

Utilities/Events/ZeaPointerEvent.ts:19

___

### metaKey

• **metaKey**: `boolean` = `false`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:63

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[pointerPos](Utilities_Events_ZeaUIEvent.ZeaUIEvent#pointerpos)

#### Defined in

Utilities/Events/ZeaUIEvent.ts:9

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[pointerRay](Utilities_Events_ZeaUIEvent.ZeaUIEvent#pointerray)

#### Defined in

Utilities/Events/ZeaUIEvent.ts:10

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[pointerType](Utilities_Events_ZeaUIEvent.ZeaUIEvent#pointertype)

#### Defined in

Utilities/Events/ZeaPointerEvent.ts:14

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[propagating](Utilities_Events_ZeaUIEvent.ZeaUIEvent#propagating)

#### Defined in

Utilities/Events/ZeaPointerEvent.ts:16

___

### shiftKey

• **shiftKey**: `boolean` = `false`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:65

___

### sourceEvent

• `Private` **sourceEvent**: `TouchEvent`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:67

___

### targetTouches

• **targetTouches**: [`Touch`](Utilities_Events_ZeaTouchEvent.Touch)[] = `[]`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:61

___

### touches

• **touches**: [`Touch`](Utilities_Events_ZeaTouchEvent.Touch)[] = `[]`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:59

___

### viewport

• **viewport**: [`GLViewport`](../../Renderer/Renderer_GLViewport.GLViewport)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[viewport](Utilities_Events_ZeaUIEvent.ZeaUIEvent#viewport)

#### Defined in

Utilities/Events/ZeaUIEvent.ts:7

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[getCapture](Utilities_Events_ZeaUIEvent.ZeaUIEvent#getcapture)

#### Defined in

Utilities/Events/ZeaPointerEvent.ts:34

___

### preventDefault

▸ **preventDefault**(): `void`

#### Returns

`void`

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:100

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[releaseCapture](Utilities_Events_ZeaUIEvent.ZeaUIEvent#releasecapture)

#### Defined in

Utilities/Events/ZeaPointerEvent.ts:38

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

Utilities/Events/ZeaPointerEvent.ts:30

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[stopPropagation](Utilities_Events_ZeaUIEvent.ZeaUIEvent#stoppropagation)

#### Defined in

Utilities/Events/ZeaTouchEvent.ts:93

