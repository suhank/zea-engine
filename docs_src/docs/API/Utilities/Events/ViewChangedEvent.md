---
id: "Utilities_Events_ViewChangedEvent.ViewChangedEvent"
title: "Class: ViewChangedEvent"
sidebar_label: "ViewChangedEvent"
custom_edit_url: null
---



## Hierarchy

- [`BaseEvent`](../Utilities_BaseEvent.BaseEvent)

  ↳ **`ViewChangedEvent`**

  ↳↳ [`XRViewChangedEvent`](Utilities_Events_XRViewChangedEvent.XRViewChangedEvent)

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

[src/Utilities/Events/ViewChangedEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/Events/ViewChangedEvent.ts#L10)

## Properties

### interfaceType

• **interfaceType**: `string`

#### Defined in

[src/Utilities/Events/ViewChangedEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/Events/ViewChangedEvent.ts#L6)

___

### viewXfo

• **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Utilities/Events/ViewChangedEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/Events/ViewChangedEvent.ts#L7)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[src/Utilities/Events/ViewChangedEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Utilities/Events/ViewChangedEvent.ts#L8)

