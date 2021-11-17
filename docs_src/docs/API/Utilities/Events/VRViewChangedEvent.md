---
id: "Utilities_Events_VRViewChangedEvent.VRViewChangedEvent"
title: "Class: VRViewChangedEvent"
sidebar_label: "VRViewChangedEvent"
custom_edit_url: null
---



## Hierarchy

- [`ViewChangedEvent`](Utilities_Events_ViewChangedEvent.ViewChangedEvent)

  ↳ **`VRViewChangedEvent`**

## Constructors

### constructor

• **new VRViewChangedEvent**(`viewXfo`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewXfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) |

#### Overrides

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[constructor](Utilities_Events_ViewChangedEvent.ViewChangedEvent#constructor)

#### Defined in

[Utilities/Events/VRViewChangedEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/VRViewChangedEvent.ts#L11)

## Properties

### controllers

• **controllers**: [`VRController`](../../Renderer/VR/Renderer_VR_VRController.VRController)[] = `[]`

#### Defined in

[Utilities/Events/VRViewChangedEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/VRViewChangedEvent.ts#L8)

___

### hmd

• **hmd**: `string` = `''`

#### Defined in

[Utilities/Events/VRViewChangedEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/VRViewChangedEvent.ts#L7)

___

### interfaceType

• **interfaceType**: `string`

#### Inherited from

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[interfaceType](Utilities_Events_ViewChangedEvent.ViewChangedEvent#interfacetype)

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/ViewChangedEvent.ts#L6)

___

### viewXfo

• **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[viewXfo](Utilities_Events_ViewChangedEvent.ViewChangedEvent#viewxfo)

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/ViewChangedEvent.ts#L7)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ViewChangedEvent](Utilities_Events_ViewChangedEvent.ViewChangedEvent).[viewport](Utilities_Events_ViewChangedEvent.ViewChangedEvent#viewport)

#### Defined in

[Utilities/Events/ViewChangedEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/ViewChangedEvent.ts#L8)

___

### vrviewport

• `Optional` **vrviewport**: [`VRViewport`](../../Renderer/VR/Renderer_VR_VRViewport.VRViewport)

#### Defined in

[Utilities/Events/VRViewChangedEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/Events/VRViewChangedEvent.ts#L9)

