---
id: "SceneTree_CloneContext.CloneContext"
title: "Class: CloneContext"
sidebar_label: "CloneContext"
custom_edit_url: null
---



Provides a context for loading assets. This context can provide the units of the loading scene.
E.g. you can specify the scene units as 'millimeters' in the context object.
To load external references, you can also provide a dictionary that maps filenames to URLs that are used
to resolve the URL of an external reference that a given asset is expecting to find.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`CloneContext`**

## Constructors

### constructor

• **new CloneContext**()

Create a AssetLoadContext

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/CloneContext.ts:21](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/CloneContext.ts#L21)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L11)

___

### assetItem

• **assetItem**: [`AssetItem`](SceneTree_AssetItem.AssetItem)

#### Defined in

[src/SceneTree/CloneContext.ts:15](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/CloneContext.ts#L15)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L26)

## Methods

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L33)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L25)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[off](../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[once](../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L82)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L134)

