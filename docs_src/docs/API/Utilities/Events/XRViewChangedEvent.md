---
id: "Utilities_Events_XRViewChangedEvent.XRViewChangedEvent"
title: "Class: XRViewChangedEvent"
sidebar_label: "XRViewChangedEvent"
custom_edit_url: null
---



## Hierarchy

- [`ViewChangedEvent`](Utilities_Events_ViewChangedEvent.ViewChangedEvent)

  ↳ **`XRViewChangedEvent`**

## Constructors

### constructor

• **new XRViewChangedEvent**(`viewXfo`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewXfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) |

#### Overrides

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[constructor](Utilities_Events_ViewChangedEvent.ViewChangedEvent#constructor)

#### Defined in

[src/Utilities/Events/XRViewChangedEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/XRViewChangedEvent.ts#L11)

## Properties

### controllers

• **controllers**: [`XRController`](../../Renderer/VR/Renderer_VR_XRController.XRController)[] = `[]`

#### Defined in

[src/Utilities/Events/XRViewChangedEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/XRViewChangedEvent.ts#L8)

___

### hmd

• **hmd**: `string` = `''`

#### Defined in

[src/Utilities/Events/XRViewChangedEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/XRViewChangedEvent.ts#L7)

___

### interfaceType

• **interfaceType**: `string`

#### Inherited from

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[interfaceType](Utilities_Events_ViewChangedEvent.ViewChangedEvent#interfacetype)

#### Defined in

[src/Utilities/Events/ViewChangedEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/ViewChangedEvent.ts#L6)

___

### viewXfo

• **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[viewXfo](Utilities_Events_ViewChangedEvent.ViewChangedEvent#viewxfo)

#### Defined in

[src/Utilities/Events/ViewChangedEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/ViewChangedEvent.ts#L7)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[viewport](Utilities_Events_ViewChangedEvent.ViewChangedEvent#viewport)

#### Defined in

[src/Utilities/Events/ViewChangedEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/ViewChangedEvent.ts#L8)

___

### vrviewport

• `Optional` **vrviewport**: [`XRViewport`](../../Renderer/VR/Renderer_VR_XRViewport.XRViewport)

#### Defined in

[src/Utilities/Events/XRViewChangedEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Events/XRViewChangedEvent.ts#L9)

