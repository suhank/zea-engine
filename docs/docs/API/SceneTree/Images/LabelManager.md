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

[SceneTree/Images/LabelManager.ts:56](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L56)

## Properties

### \_\_foundLabelLibraries

• `Protected` **\_\_foundLabelLibraries**: `Record`<`string`, `any`\>

#### Defined in

[SceneTree/Images/LabelManager.ts:51](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L51)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_labelLibraries

• `Protected` **\_\_labelLibraries**: `Record`<`string`, `any`\>

#### Defined in

[SceneTree/Images/LabelManager.ts:52](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L52)

___

### \_\_language

• `Protected` **\_\_language**: `any`

#### Defined in

[SceneTree/Images/LabelManager.ts:50](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L50)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[fromJSON](../../Utilities/Utilities_EventEmitter.EventEmitter#fromjson)

#### Defined in

[Utilities/BaseClass.ts:59](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L59)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

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

[SceneTree/Images/LabelManager.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L134)

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

[SceneTree/Images/LabelManager.ts:115](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L115)

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

[SceneTree/Images/LabelManager.ts:124](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L124)

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

[SceneTree/Images/LabelManager.ts:69](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L69)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L82)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

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

[SceneTree/Images/LabelManager.ts:171](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L171)

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

[SceneTree/Images/LabelManager.ts:186](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Images/LabelManager.ts#L186)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[toJSON](../../Utilities/Utilities_EventEmitter.EventEmitter#tojson)

#### Defined in

[Utilities/BaseClass.ts:46](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L46)

