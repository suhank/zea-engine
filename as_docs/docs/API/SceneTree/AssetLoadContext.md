---
id: "SceneTree_AssetItem.AssetLoadContext"
title: "Class: AssetLoadContext"
sidebar_label: "AssetLoadContext"
custom_edit_url: null
---



Provides a context for loading assets. This context can provide the units of the loading scene.
E.g. you can specify the scene units as 'millimeters' in the context object.
To load external references, you can also provide a dictionary that maps filenames to URLs that are used
to resolve the URL of an external reference that a given asset is expecting to find.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`AssetLoadContext`**

## Constructors

### constructor

• **new AssetLoadContext**(`context?`)

Create a AssetLoadContext

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`AssetLoadContext`](SceneTree_AssetItem.AssetLoadContext) | The source context to base this context on. |

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[SceneTree/AssetItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L39)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### addGeomToLayer

• **addGeomToLayer**: `any`

#### Defined in

[SceneTree/AssetItem.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L33)

___

### assetItem

• **assetItem**: `any`

#### Defined in

[SceneTree/AssetItem.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L27)

___

### assets

• `Protected` **assets**: `Record`<`string`, `any`\>

#### Defined in

[SceneTree/AssetItem.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L21)

___

### asyncCount

• `Protected` **asyncCount**: `number`

#### Defined in

[SceneTree/AssetItem.ts:31](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L31)

___

### folder

• **folder**: `string`

#### Defined in

[SceneTree/AssetItem.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L25)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### numGeomItems

• **numGeomItems**: `number`

#### Defined in

[SceneTree/AssetItem.ts:29](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L29)

___

### numTreeItems

• **numTreeItems**: `number`

#### Defined in

[SceneTree/AssetItem.ts:28](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L28)

___

### postLoadCallbacks

• `Protected` **postLoadCallbacks**: `any`[]

#### Defined in

[SceneTree/AssetItem.ts:30](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L30)

___

### resources

• `Protected` **resources**: `Record`<`string`, `any`\>

#### Defined in

[SceneTree/AssetItem.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L22)

___

### sdk

• `Protected` **sdk**: `string`

#### Defined in

[SceneTree/AssetItem.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L26)

___

### units

• **units**: `string`

#### Defined in

[SceneTree/AssetItem.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L20)

___

### url

• **url**: `string`

#### Defined in

[SceneTree/AssetItem.ts:24](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L24)

___

### versions

• **versions**: `Record`<`string`, [`Version`](SceneTree_Version.Version)\>

#### Defined in

[SceneTree/AssetItem.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L23)

## Methods

### addPLCB

▸ **addPLCB**(`postLoadCallback`): `void`

Adds a function to be called back once the main load call stack exists.
This is used to connect parts of the tree together after loading.
e.g. an instance will

#### Parameters

| Name | Type |
| :------ | :------ |
| `postLoadCallback` | `any` |

#### Returns

`void`

#### Defined in

[SceneTree/AssetItem.ts:120](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L120)

___

### decrementAsync

▸ **decrementAsync**(): `void`

As each external reference completes loading, it decrements this counter allowing the owning
asset to know that the subtrees are loaded.

#### Returns

`void`

#### Defined in

[SceneTree/AssetItem.ts:70](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L70)

___

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[fromJSON](../Utilities/Utilities_EventEmitter.EventEmitter#fromjson)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

___

### incrementAsync

▸ **incrementAsync**(): `void`

During loading, asynchronous processes may be launched, and subsequently completed.
These method helps the Asset track how many asynchronous loading operations may be
occurring with the tree during load.
As each external reference starts to load, it increments this counter, letting the owning
Asset know to wait till the children are loaded before emitting its own 'loaded' event.

#### Returns

`void`

#### Defined in

[SceneTree/AssetItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L62)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

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
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[once](../Utilities/Utilities_EventEmitter.EventEmitter#once)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

___

### resolvePath

▸ **resolvePath**(`path`, `onSucceed`, `onFail`): `void`

Resolves a path within the loading asset. This is used to connect
items within the tree to other items. e.g. a Group can find its members.
or an instance can find its source tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string`[] | the path within the tree relative to the loading asset |
| `onSucceed` | (`result`: [`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>) => `void` | called with the successful result of the path resolution. |
| `onFail` | () => `void` | called when the path resolution fails. |

#### Returns

`void`

#### Defined in

[SceneTree/AssetItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/AssetItem.ts#L86)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[toJSON](../Utilities/Utilities_EventEmitter.EventEmitter#tojson)

#### Defined in

[Utilities/BaseClass.ts:46](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L46)

