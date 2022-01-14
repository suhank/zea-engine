---
id: "Renderer_VR_XRController.XRController"
title: "Class: XRController"
sidebar_label: "XRController"
custom_edit_url: null
---



Class representing a VR controller.

The XRController class wraps the XRInputSource provided by the WebXR API.

https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource

The XRController provides a tree item that can be used to attach geometries to represenet
the controllers or tools that the user may have in thier hands.
```javascript
renderer.getXRViewport().then((xrvp) => {
  xrvp.on('controllerAdded', (event) => {
    const controller = event.controller

    // Configure the distance of the ray cast performed by the controller into the scene.
    // Note: setting to 0 disables ray casting.
    controller.raycastDist = 20.0

    // Remove the green ball added by the VRViewManipulator.
    controller.tipItem.removeAllChildren()

    // Add a visual indication of the ray.
    const pointerItem = new GeomItem('PointerRay', line, pointermat)
    pointerItem.setSelectable(false)
    const pointerXfo = new Xfo()
    pointerXfo.sc.set(1, 1, controller.raycastDist)
    pointerItem.localXfoParam.value = pointerXfo
    controller.tipItem.addChild(pointerItem, false)

    // The tip items needs to be rotated down a little to make it
    // point in the right direction.
    const tipItemXfo = controller.tipItem.localXfoParam.value
    tipItemXfo.ori.setFromAxisAndAngle(new Vec3(1, 0, 0), -0.8)
    controller.tipItem.localXfoParam.value = tipItemXfo

    controller.on('buttonPressed', (event) => {
      console.log('buttonPressed', event)
    })
    controller.on('buttonReleased', (event) => {
      console.log('buttonReleased', event)
    })
  })
})
```

**Events**
* **buttonPressed:** Emitted when the user presses any of the buttons aside from the trigger button.
* **buttonReleased:** Emitted when the user release any of the buttons aside from the trigger button.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`XRController`**

## Constructors

### constructor

• **new XRController**(`xrvp`, `inputSource`, `id`)

Create a VR controller.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrvp` | `any` | The Vr viewport. |
| `inputSource` | `any` | The input source. |
| `id` | `number` | The id value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/VR/XRController.ts:105](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L105)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/BaseClass.ts#L11)

___

### buttonPressed

• **buttonPressed**: `boolean`

#### Defined in

[src/Renderer/VR/XRController.ts:73](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L73)

___

### capturedItem

• **capturedItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) = `null`

#### Defined in

[src/Renderer/VR/XRController.ts:97](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L97)

___

### hitTested

• `Private` **hitTested**: `boolean`

#### Defined in

[src/Renderer/VR/XRController.ts:92](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L92)

___

### id

• **id**: `number`

#### Defined in

[src/Renderer/VR/XRController.ts:72](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L72)

___

### inputSource

• `Private` **inputSource**: `any`

#### Defined in

[src/Renderer/VR/XRController.ts:75](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L75)

___

### intersectionData

• `Private` **intersectionData**: [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

#### Defined in

[src/Renderer/VR/XRController.ts:94](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L94)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L26)

___

### mat4

• `Private` **mat4**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/VR/XRController.ts:77](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L77)

___

### pointerOverItem

• `Private` **pointerOverItem**: `any`

#### Defined in

[src/Renderer/VR/XRController.ts:93](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L93)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Defined in

[src/Renderer/VR/XRController.ts:86](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L86)

___

### pressedButtons

• `Private` **pressedButtons**: `boolean`[] = `[]`

#### Defined in

[src/Renderer/VR/XRController.ts:76](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L76)

___

### rayCastRenderTargetProjMatrix

• `Private` **rayCastRenderTargetProjMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/VR/XRController.ts:89](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L89)

___

### raycastArea

• **raycastArea**: `number` = `0.005`

#### Defined in

[src/Renderer/VR/XRController.ts:84](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L84)

___

### raycastAreaCache

• `Private` **raycastAreaCache**: `number` = `0`

#### Defined in

[src/Renderer/VR/XRController.ts:87](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L87)

___

### raycastDist

• **raycastDist**: `number` = `0.04`

#### Defined in

[src/Renderer/VR/XRController.ts:85](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L85)

___

### raycastDistCache

• `Private` **raycastDistCache**: `number` = `0`

#### Defined in

[src/Renderer/VR/XRController.ts:88](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L88)

___

### raycastTick

• **raycastTick**: `number` = `5`

#### Defined in

[src/Renderer/VR/XRController.ts:83](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L83)

___

### tick

• `Private` **tick**: `number`

#### Defined in

[src/Renderer/VR/XRController.ts:90](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L90)

___

### tipItem

• `Private` **tipItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[src/Renderer/VR/XRController.ts:80](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L80)

___

### touchpadValue

• `Private` **touchpadValue**: `any`

#### Defined in

[src/Renderer/VR/XRController.ts:91](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L91)

___

### treeItem

• `Private` **treeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[src/Renderer/VR/XRController.ts:79](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L79)

___

### xfo

• `Private` **xfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/VR/XRController.ts:78](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L78)

___

### xrvp

• `Private` **xrvp**: [`XRViewport`](Renderer_VR_XRViewport.XRViewport)

#### Defined in

[src/Renderer/VR/XRController.ts:74](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L74)

## Methods

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/BaseClass.ts#L33)

___

### getControllerStageLocalXfo

▸ **getControllerStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:285](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L285)

___

### getControllerTipStageLocalXfo

▸ **getControllerTipStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerTipStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:293](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L293)

___

### getGeomItemAtTip

▸ **getGeomItemAtTip**(): [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

The getGeomItemAtTip method.

#### Returns

[`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:385](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L385)

___

### getHandedness

▸ **getHandedness**(): `any`

The getHandedness method.

#### Returns

`any`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:229](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L229)

___

### getId

▸ **getId**(): `number`

The getId method.

#### Returns

`number`

- The return value.

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Renderer/VR/XRController.ts:237](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L237)

___

### getTipItem

▸ **getTipItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTipItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:253](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L253)

___

### getTipXfo

▸ **getTipXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getTipXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:261](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L261)

___

### getTouchPadValue

▸ **getTouchPadValue**(): `any`

The getTouchPadValue method.

#### Returns

`any`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:269](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L269)

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:245](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L245)

___

### isButtonPressed

▸ **isButtonPressed**(): `boolean`

The isButtonPressed method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:277](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L277)

___

### off

▸ **off**(`eventName`, `listener?`): `void`

Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function or the id number. |

#### Returns

`void`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[off](../../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L97)

___

### on

▸ **on**(`eventName`, `listener?`): `number`

Adds a listener function for a given event name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function(callback). |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L44)

___

### once

▸ **once**(`eventName`, `listener`): `number`

Similar to the `on` method with the difference that when the event is triggered,
it is automatically unregistered meaning that the event listener will be triggered at most one time.

Useful for events that we expect to trigger one time, such as when assets load.
```javascript
const asset = new Asset();
asset.once('loaded', () => {
  console.log("Yay! the asset is loaded")
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The eventName value |
| `listener` | (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L82)

___

### removeListenerById

▸ **removeListenerById**(`eventName`, `id`): `void`

remove listener by ID returned from #on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `id` | `number` | The id returned by addListener |

#### Returns

`void`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L134)

___

### updatePose

▸ **updatePose**(`refSpace`, `xrFrame`, `inputSource`): `void`

The updatePose method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refSpace` | `any` | The refSpace value. |
| `xrFrame` | `any` | The xrFrame value. |
| `inputSource` | `any` | The inputSource value. |

#### Returns

`void`

#### Defined in

[src/Renderer/VR/XRController.ts:305](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Renderer/VR/XRController.ts#L305)

