---
id: "SceneTree_Images_LabelManager.LabelManager"
title: "Class: LabelManager"
sidebar_label: "LabelManager"
custom_edit_url: null
---



Class representing a label manager.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`LabelManager`**

## Constructors

### constructor

• **new LabelManager**()

Create a label manager.

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/Images/LabelManager.ts:62](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L62)

## Properties

### \_\_foundLabelLibraries

• `Protected` **\_\_foundLabelLibraries**: `Record`<`string`, `any`\>

#### Defined in

[src/SceneTree/Images/LabelManager.ts:57](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L57)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/BaseClass.ts#L11)

___

### \_\_labelLibraries

• `Protected` **\_\_labelLibraries**: `Record`<`string`, `any`\>

#### Defined in

[src/SceneTree/Images/LabelManager.ts:58](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L58)

___

### \_\_language

• `Protected` **\_\_language**: `any`

#### Defined in

[src/SceneTree/Images/LabelManager.ts:56](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L56)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L26)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L154)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/BaseClass.ts#L33)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/BaseClass.ts#L25)

___

### getLabelText

▸ **getLabelText**(`libraryName`, `labelName`): `any`

The getLabelText method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `libraryName` | `string` | The name of the library. |
| `labelName` | `string` | The name of the label. |

#### Returns

`any`

- The return value.

#### Defined in

[src/SceneTree/Images/LabelManager.ts:140](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L140)

___

### isLibraryFound

▸ **isLibraryFound**(`name`): `boolean`

Checks if the library is found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the library. |

#### Returns

`boolean`

- Returns true if the library is found.

#### Defined in

[src/SceneTree/Images/LabelManager.ts:121](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L121)

___

### isLibraryLoaded

▸ **isLibraryLoaded**(`name`): `boolean`

Checks if the library is loaded.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the library. |

#### Returns

`boolean`

- Returns true if the library is loaded.

#### Defined in

[src/SceneTree/Images/LabelManager.ts:130](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L130)

___

### loadLibrary

▸ **loadLibrary**(`name`, `url`): `void`

Load a label library into the manager.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the library. |
| `url` | `string` | - |

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/LabelManager.ts:75](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L75)

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

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L97)

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

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L44)

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

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L82)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Utilities/EventEmitter.ts#L134)

___

### setLabelText

▸ **setLabelText**(`libraryName`, `labelName`, `labelText`): `void`

The setLabelText method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `libraryName` | `string` | The name of the library. |
| `labelName` | `string` | The name of the label. |
| `labelText` | `string` | The text of the label. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/LabelManager.ts:177](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L177)

___

### setLanguage

▸ **setLanguage**(`ln`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ln` | `any` |

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/LabelManager.ts:192](https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/SceneTree/Images/LabelManager.ts#L192)

