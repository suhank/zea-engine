---
id: "Utilities_Events_ViewChangedEvent.ViewChangedEvent"
title: "Class: ViewChangedEvent"
sidebar_label: "ViewChangedEvent"
custom_edit_url: null
---



## Hierarchy

- [`BaseEvent`](../Utilities_BaseEvent.BaseEvent)

  ↳ **`ViewChangedEvent`**

  ↳↳ [`VRViewChangedEvent`](Utilities_Events_VRViewChangedEvent.VRViewChangedEvent)

## Constructors

### constructor

• **new ViewChangedEvent**(`interfaceType`, `viewXfo`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `interfaceType` | `string` |
| `viewXfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) |

#### Overrides

[BaseEvent](../Utilities_BaseEvent.BaseEvent).[constructor](../Utilities_BaseEvent.BaseEvent#constructor)

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/Events/ViewChangedEvent.ts#L10)

## Properties

### interfaceType

• **interfaceType**: `string`

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/Events/ViewChangedEvent.ts#L6)

___

### viewXfo

• **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/Events/ViewChangedEvent.ts#L7)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/Events/ViewChangedEvent.ts#L8)

