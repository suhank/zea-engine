---
id: "SceneTree_Manipulators_CameraManipulator.CameraManipulator"
title: "Class: CameraManipulator"
sidebar_label: "CameraManipulator"
custom_edit_url: null
---



Class for defining and interaction model of the camera.

The CameraManipulator supports a variety of manipulation modes, and hotkeys/modifier keys
that allow the user to rapidly switch between modes, such as 'turntable' and 'pan'.
A detailed explanation of various camera manipulation modes can be found
here: https://www.mattkeeter.com/projects/rotation/

**MANIPULATION_MODES**
* **pan:** Translates the camera sideways according the the camera's current orientation. Activated by the right mouse button, or two fingered touches on mobile.
* **dolly:** Translates the camera forwards and backwards according the the camera's current orientation. Activated by holding the ctrl and alt keys while using the left mouse button, or the mouse wheel, or two fingered touches on mobile.
* **focussing:** Focusses the camera on a specific 3d point in the scene. Activated by double clicking, or double tapping on a geometry in the 3d view.
* **look:** Rotates the camera around its own position. Useful for simulating looking by turning ones head inside a scene. Activated by holding the ctrl key and right mouse button.
* **turntable:** Rotates the camera around the current camera target, using the turntable style manipulation described above. Activated by the left mouse button.
* **tumbler:** Rotates the camera around the current camera target, using the tumbler style manipulation described above. Activated by the left mouse button.
* **trackball:** Rotates the camera around the current camera target, using the trackball style manipulation described above. Activated by the left mouse button.

The default manipulation mode, is the mode that is active with only the left mouse button. The default manipulation mode is currently 'turntable'.

To Assign a different default manipulation mode, retrieve the manipulator from the viewport
and set the default mode.
```
const cameraManipulator = renderer.getViewport().getManipulator()
cameraManipulator.setDefaultManipulationMode(CameraManipulator.MANIPULATION_MODES.trackball);
```

This class is the default manipulator, and can be replaced with custom manipulators.

```
const customManipulator = new CustomCameraManipulator()
renderer.getViewport().setManipulator(customManipulator);
```

The Camera manipulator can focus the view on a point in the view by various gestures.
A single click or touch tap can cause the view to be focussed or a double click or tap.
This behavior can be configured using the 2 values.
e.g. to disable all focus gestures, set both values to zero.
```
const cameraManipulator = renderer.getViewport().getManipulator()
cameraManipulator.aimFocusOnTouchTap = 0
cameraManipulator.aimFocusOnMouseClick = 0
```

**Parameters**
* **OrbitRate(`NumberParameter`):** The rate at which mouse or touch interactions are translated camera orientation changes.
* **DollySpeed(`NumberParameter`):** The rate at which the mouse button or touch interactions are translated camera dolly movement.
* **mouseWheelDollySpeed(`NumberParameter`):** The rate at which the mouse wheel interactions are translated camera dolly movement.

  Note: this value defaults to different values for touch based interfaces to mouse based input.
  For mobile devices, the orbit rate defaults to 0.5, and for mouse based interaction, the value defaults to 1.
  A value of 1 means that the camera will rotate 180 degrees for a mouse interaction that spans from the left border of the viewport to the right border.
  Some applications might require lower, or higher default values

To set different default values for mobile or desktop set a different value based on the SystemDesc.isMobileDevice flag.
```
const cameraManipulator = renderer.getViewport().getManipulator()
cameraManipulator.getParameter('OrbitRate').setValue(SystemDesc.isMobileDevice ? 0.1 : 0.4)
```

**Events**
* **movementFinished:** Emitted when a camera movement is finished. E.g. when the user releases the mouse after a dolly, or after the focussing action has completed.
* **aimingFocus:** Emitted when a camera is being focussed on a target. E.g. when the user double clicks the mouse on a geometry in the view.

## Hierarchy

- [`default`](SceneTree_Manipulators_BaseTool.default)

  ↳ **`CameraManipulator`**

## Constructors

### constructor

• **new CameraManipulator**(`appData`)

Create a camera, mouse and keyboard

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | `Record`<`string`, `any`\> | The object containing the scene and the renderer. |

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[constructor](SceneTree_Manipulators_BaseTool.default#constructor)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:155](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L155)

## Properties

### \_\_activated

• `Protected` **\_\_activated**: `boolean` = `false`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[__activated](SceneTree_Manipulators_BaseTool.default#__activated)

#### Defined in

[SceneTree/Manipulators/BaseTool.ts:33](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/BaseTool.ts#L33)

___

### \_\_defaultManipulationState

• `Protected` **\_\_defaultManipulationState**: `number`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:98](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L98)

___

### \_\_dragging

• `Protected` **\_\_dragging**: `number`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:101](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L101)

___

### \_\_focusIntervalId

• `Protected` **\_\_focusIntervalId**: `any`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:114](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L114)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[__id](SceneTree_Manipulators_BaseTool.default#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/BaseClass.ts#L11)

___

### \_\_keyboardMovement

• `Protected` **\_\_keyboardMovement**: `boolean`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:105](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L105)

___

### \_\_keysPressed

• `Protected` **\_\_keysPressed**: `any`[]

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:106](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L106)

___

### \_\_manipulationState

• `Protected` **\_\_manipulationState**: `any`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:99](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L99)

___

### \_\_mouseWheelMovementDist

• **\_\_mouseWheelMovementDist**: `number` = `0`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:116](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L116)

___

### \_\_mouseWheelZoomCount

• `Protected` **\_\_mouseWheelZoomCount**: `number` = `0`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:118](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L118)

___

### \_\_mouseWheelZoomId

• `Protected` **\_\_mouseWheelZoomId**: `number` = `-1`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:119](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L119)

___

### \_\_ongoingTouches

• `Protected` **\_\_ongoingTouches**: `Record`<`string`, `OngoingTouch`\>

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:109](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L109)

___

### \_\_orbitTarget

• `Protected` **\_\_orbitTarget**: `any`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:111](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L111)

___

### \_\_pointerDown

• `Protected` **\_\_pointerDown**: `boolean`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:100](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L100)

___

### \_\_prevPointerPos

• `Protected` **\_\_prevPointerPos**: `any`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:113](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L113)

___

### \_\_prevVelocityIntegrationTime

• `Protected` **\_\_prevVelocityIntegrationTime**: `number`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:108](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L108)

___

### \_\_velocity

• `Protected` **\_\_velocity**: [`Vec3`](../../Math/Math_Vec3.Vec3)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:107](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L107)

___

### aimFocusOnMouseClick

• `Protected` **aimFocusOnMouseClick**: `number`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:103](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L103)

___

### aimFocusOnTouchTap

• `Protected` **aimFocusOnTouchTap**: `number`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:102](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L102)

___

### appData

• `Protected` **appData**: `Record`<`string`, `any`\>

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:97](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L97)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[deprecatedParamMapping](SceneTree_Manipulators_BaseTool.default#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L23)

___

### dollySpeedParam

• **dollySpeedParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** dollySpeedParam - The rate at which the mouse button or touch interactions are translated camera dolly movement.

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:129](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L129)

___

### enabledWASDWalkMode

• `Protected` **enabledWASDWalkMode**: `boolean`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:104](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L104)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[listeners](SceneTree_Manipulators_BaseTool.default#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L26)

___

### mouseWheelDollySpeedParam

• **mouseWheelDollySpeedParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** mouseWheelDollySpeedParam - The rate at which the mouse wheel interactions are translated camera dolly movement.

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:134](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L134)

___

### orbitAroundCursor

• **orbitAroundCursor**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** orbitAroundCursor - TODO

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:139](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L139)

___

### orbitRateParam

• **orbitRateParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** orbitRateParam - The rate at which mouse or touch interactions are translated camera orientation changes.

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:124](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L124)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[paramEventListenerIDs](SceneTree_Manipulators_BaseTool.default#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[paramMapping](SceneTree_Manipulators_BaseTool.default#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[params](SceneTree_Manipulators_BaseTool.default#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L22)

___

### prevCursor

• `Protected` **prevCursor**: `any`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:112](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L112)

___

### walkModeCollisionDetection

• **walkModeCollisionDetection**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** walkModeCollisionDetection - TODO

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:149](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L149)

___

### walkSpeedParam

• **walkSpeedParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** walkSpeedParam - TODO

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:144](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L144)

## Accessors

### MANIPULATION\_MODES

• `Static` `get` **MANIPULATION_MODES**(): `Object`

Returns a dictionary of support manipulation modes.

#### Returns

`Object`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1188](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1188)

## Methods

### \_\_endTouch

▸ `Private` **__endTouch**(`touch`): `void`

The __endTouch method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `touch` | [`Touch`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.Touch) | The touch value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1131](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1131)

___

### \_\_startTouch

▸ `Private` **__startTouch**(`touch`): `void`

The __startTouch method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `touch` | [`Touch`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.Touch) | The touch value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1119](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1119)

___

### \_onMouseMove

▸ **_onMouseMove**(`event`): `void`

The event that occurs when the user moves the pointer across a screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaMouseEvent`](../../Utilities/Events/Utilities_Events_ZeaMouseEvent.ZeaMouseEvent) | -The event value |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:675](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L675)

___

### \_onTouchMove

▸ `Private` **_onTouchMove**(`event`): `void`

The event that occurs when the user moves pointer across a touch screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The touch event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:713](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L713)

___

### \_onTouchStart

▸ **_onTouchStart**(`event`): `void`

Invoked when the user touches an element on a touch screen.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The touch event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1144](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1144)

___

### activateTool

▸ **activateTool**(): `void`

Enables tools usage.

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[activateTool](SceneTree_Manipulators_BaseTool.default#activatetool)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:185](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L185)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[addParameter](SceneTree_Manipulators_BaseTool.default#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L133)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[addParameterDeprecationMapping](SceneTree_Manipulators_BaseTool.default#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L90)

___

### aimFocus

▸ `Private` **aimFocus**(`camera`, `target`, `distance?`, `duration?`): `void`

The aimFocus method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `camera` | [`Camera`](../SceneTree_Camera.Camera) | `undefined` | The camera that we are aiming |
| `target` | [`Vec3`](../../Math/Math_Vec3.Vec3) | `undefined` | The target to focus on. |
| `distance` | `number` | `-1` | The distance from the target to get to. |
| `duration` | `number` | `400` | The duration in milliseconds to aim the focus. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:454](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L454)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[copyFrom](SceneTree_Manipulators_BaseTool.default#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L314)

___

### deactivateTool

▸ **deactivateTool**(): `void`

Disables tool usage.

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[deactivateTool](SceneTree_Manipulators_BaseTool.default#deactivatetool)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:196](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L196)

___

### dolly

▸ **dolly**(`event`, `dragVec`): `void`

The dolly method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |
| `dragVec` | [`Vec2`](../../Math/Math_Vec2.Vec2) | The drag vector value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:379](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L379)

___

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

[default](SceneTree_Manipulators_BaseTool.default).[emit](SceneTree_Manipulators_BaseTool.default#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L154)

___

### endDrag

▸ `Private` **endDrag**(`event`): `void`

The initDrag method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:439](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L439)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[fromJSON](SceneTree_Manipulators_BaseTool.default#fromjson)

#### Defined in

[SceneTree/ParameterOwner.ts:239](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L239)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getClassName](SceneTree_Manipulators_BaseTool.default#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/BaseClass.ts#L33)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getId](SceneTree_Manipulators_BaseTool.default#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/BaseClass.ts#L25)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getNumParameters](SceneTree_Manipulators_BaseTool.default#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L39)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getParameter](SceneTree_Manipulators_BaseTool.default#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getParameterByIndex](SceneTree_Manipulators_BaseTool.default#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L68)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getParameterIndex](SceneTree_Manipulators_BaseTool.default#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[getParameters](SceneTree_Manipulators_BaseTool.default#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L48)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[hasParameter](SceneTree_Manipulators_BaseTool.default#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L78)

___

### initDrag

▸ `Private` **initDrag**(`event`): `void`

The initDrag method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:411](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L411)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[insertParameter](SceneTree_Manipulators_BaseTool.default#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L147)

___

### integrateVelocityChange

▸ `Private` **integrateVelocityChange**(`event`): `void`

The integrateVelocityChange method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:988](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L988)

___

### look

▸ **look**(`event`, `dragVec`): `void`

The look method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |
| `dragVec` | [`Vec2`](../../Math/Math_Vec2.Vec2) | The drag vector value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:224](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L224)

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

[default](SceneTree_Manipulators_BaseTool.default).[off](SceneTree_Manipulators_BaseTool.default#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L97)

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

[default](SceneTree_Manipulators_BaseTool.default).[on](SceneTree_Manipulators_BaseTool.default#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ `Private` **onKeyDown**(`event`): `void`

Invoked when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The keyboard event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onKeyDown](SceneTree_Manipulators_BaseTool.default#onkeydown)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1044](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1044)

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Invoked when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onKeyUp](SceneTree_Manipulators_BaseTool.default#onkeyup)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1086](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1086)

___

### onPointerDoublePress

▸ **onPointerDoublePress**(`event`): `void`

Invoked when a user double presses a pointer over an element.

**`memberof`** CameraManipulator

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that occurs |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onPointerDoublePress](SceneTree_Manipulators_BaseTool.default#onpointerdoublepress)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:595](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L595)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Event fired when either the mouse button is pressed, or a touch start event occurs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The mouse event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onPointerDown](SceneTree_Manipulators_BaseTool.default#onpointerdown)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:629](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L629)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Causes an event to occur when the mouse pointer is moved into this viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onPointerEnter](SceneTree_Manipulators_BaseTool.default#onpointerenter)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:879](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L879)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Causes an event to occur when the mouse pointer is moved out of this viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onPointerLeave](SceneTree_Manipulators_BaseTool.default#onpointerleave)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:885](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L885)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Event fired when either the mouse cursor is moved, or a touch point moves.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The mouse event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onPointerMove](SceneTree_Manipulators_BaseTool.default#onpointermove)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:660](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L660)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Event fired when either the mouse button is released, or a touch end event occurs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The mouse event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onPointerUp](SceneTree_Manipulators_BaseTool.default#onpointerup)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:814](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L814)

___

### onTouchCancel

▸ **onTouchCancel**(`event`): `void`

Invoked when the touch event gets interrupted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The touch event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onTouchCancel](SceneTree_Manipulators_BaseTool.default#ontouchcancel)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1174](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1174)

___

### onTouchEnd

▸ **onTouchEnd**(`event`): `void`

Invoked when the user removes his/her finger from the touch pad.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The touch event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:1158](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L1158)

___

### onWheel

▸ **onWheel**(`event`): `void`

Invoked when the mouse wheel is rolled up or down over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaWheelEvent`](../../Utilities/Events/Utilities_Events_ZeaWheelEvent.ZeaWheelEvent) | The wheel event that occurs. |

#### Returns

`void`

#### Overrides

[default](SceneTree_Manipulators_BaseTool.default).[onWheel](SceneTree_Manipulators_BaseTool.default#onwheel)

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:900](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L900)

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

[default](SceneTree_Manipulators_BaseTool.default).[once](SceneTree_Manipulators_BaseTool.default#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L82)

___

### orientPointOfView

▸ `Private` **orientPointOfView**(`camera`, `position`, `target`, `distance?`, `duration?`): `void`

The orientPointOfView method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `camera` | [`Camera`](../SceneTree_Camera.Camera) | `undefined` | The camera that we are orienting |
| `position` | [`Vec3`](../../Math/Math_Vec3.Vec3) | `undefined` | The target to focus on. |
| `target` | [`Vec3`](../../Math/Math_Vec3.Vec3) | `undefined` | The target to focus on. |
| `distance` | `number` | `0` | The distance to the specified we want the user to be moved to |
| `duration` | `number` | `400` | The duration in milliseconds to aim the focus. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:552](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L552)

___

### pan

▸ **pan**(`event`, `dragVec`): `void`

Rotates the camera around its own `X`,`Y` axes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |
| `dragVec` | [`Vec2`](../../Math/Math_Vec2.Vec2) | The drag vector value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:346](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L346)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[parameterValueChanged](SceneTree_Manipulators_BaseTool.default#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L122)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.

In each iteration of the array, propType and propName are extracted and
used to build the right `Parameter` class. Then all of them are added to the object.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[readBinary](SceneTree_Manipulators_BaseTool.default#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:274](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L274)

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

[default](SceneTree_Manipulators_BaseTool.default).[removeListenerById](SceneTree_Manipulators_BaseTool.default#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L134)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[removeParameter](SceneTree_Manipulators_BaseTool.default#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L174)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[replaceParameter](SceneTree_Manipulators_BaseTool.default#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L196)

___

### setDefaultManipulationMode

▸ **setDefaultManipulationMode**(`manipulationMode`): `void`

Sets default manipulation mode.
The value can be on of the keys in #CameraManipulator.MANIPULATION_MODES

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `manipulationMode` | `string` | The manipulation mode value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:209](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L209)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[toJSON](SceneTree_Manipulators_BaseTool.default#tojson)

#### Defined in

[SceneTree/ParameterOwner.ts:216](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L216)

___

### toString

▸ **toString**(`context`): `string`

Converts object's JSON value and converts it to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- String of object's parameter list state.

#### Inherited from

[default](SceneTree_Manipulators_BaseTool.default).[toString](SceneTree_Manipulators_BaseTool.default#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/ParameterOwner.ts#L301)

___

### trackball

▸ **trackball**(`event`, `dragVec`): `void`

Rotates viewport camera about the target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |
| `dragVec` | [`Vec2`](../../Math/Math_Vec2.Vec2) | The drag vector value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:313](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L313)

___

### tumbler

▸ **tumbler**(`event`, `dragVec`): `void`

Rotates viewport camera about the target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |
| `dragVec` | [`Vec2`](../../Math/Math_Vec2.Vec2) | The drag vector value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:281](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L281)

___

### turntable

▸ **turntable**(`event`, `dragVec`): `void`

Rotates viewport camera about the target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event value. |
| `dragVec` | [`Vec2`](../../Math/Math_Vec2.Vec2) | The drag vector value. |

#### Returns

`void`

#### Defined in

[SceneTree/Manipulators/CameraManipulator.ts:251](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/Manipulators/CameraManipulator.ts#L251)

