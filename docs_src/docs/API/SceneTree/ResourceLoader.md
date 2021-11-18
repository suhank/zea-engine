---
id: "SceneTree_resourceLoader.ResourceLoader"
title: "Class: ResourceLoader"
sidebar_label: "ResourceLoader"
custom_edit_url: null
---



Class for delegating resource loading, enabling an abstraction of a cloud file system to be implemented.

The resource loader can be used to load data, where it provides central tracking of loading progress and functionality to load various file types, including compressed archives.
The plugins script must be loaded along with the engine

```html
 <script crossorigin src="libs/zea-engine/dist/plugins.umd.js"></script>
```

To load a 'text' file.
```javascript
  resourceLoader.loadFile('text', url).then((txt) =>{
     console.log(txt)
  })
```

To load a 'JSON' file.
```javascript
  resourceLoader.loadFile('json', url).then((txt) =>{
     console.log(json)
  })
```

To load a 'binary' file.
```javascript
  resourceLoader.loadFile('binary', url).then((arrayBuffer) =>{
     console.log(arrayBuffer.length)
  })
```

To load an 'archive' file that is a compressed archive containing multiple sub-files.
```javascript
  resourceLoader.loadFile('archive', url).then((entries) =>{
     console.log(entries)
  })
```

**Events**
* **loaded:** emitted when a file has finished loading
* **progressIncremented:** emitted when a loading of processing task has been incremented
* **allResourcesLoaded:** emitted when all outstanding resources are loaded. This event can be used to signal the completion of load.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`ResourceLoader`**

## Constructors

### constructor

• **new ResourceLoader**()

Create a resource loader.

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

SceneTree/resourceLoader.ts:60

## Properties

### \_\_doneWork

• `Protected` **\_\_doneWork**: `number`

#### Defined in

SceneTree/resourceLoader.ts:52

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### \_\_totalWork

• `Protected` **\_\_totalWork**: `number`

#### Defined in

SceneTree/resourceLoader.ts:51

___

### baseUrl

• `Protected` **baseUrl**: `string` = `''`

#### Defined in

SceneTree/resourceLoader.ts:53

___

### commonResources

• **commonResources**: `Record`<`string`, [`TreeItem`](SceneTree_TreeItem.TreeItem)\>

#### Defined in

SceneTree/resourceLoader.ts:56

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### plugins

• `Protected` **plugins**: `Record`<`string`, `any`\>

#### Defined in

SceneTree/resourceLoader.ts:54

___

### systemUrls

• **systemUrls**: `Record`<`string`, `string`\>

#### Defined in

SceneTree/resourceLoader.ts:55

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

Utilities/EventEmitter.ts:154

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

Utilities/BaseClass.ts:33

___

### getCommonResource

▸ **getCommonResource**(`resourceId`): [`TreeItem`](SceneTree_TreeItem.TreeItem)

Returns a previously stored common resource. Typically this would be a VR asset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceId` | `string` | The resourceId value. |

#### Returns

[`TreeItem`](SceneTree_TreeItem.TreeItem)

- The common resource if it exists

#### Defined in

SceneTree/resourceLoader.ts:126

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

Utilities/BaseClass.ts:25

___

### incrementWorkDone

▸ **incrementWorkDone**(`amount?`): `void`

Increments the amount of work done causing a 'progressIncremented' event to be emitted.
If 5 items of work have been added using #incrementWorkload, and subsequently 3 items have
been completed and #incrementWorkDone called. The progress will be at 3/5, or 60%

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `amount` | `number` | `1` | The amount value. |

#### Returns

`void`

#### Defined in

SceneTree/resourceLoader.ts:164

___

### incrementWorkload

▸ **incrementWorkload**(`amount?`): `void`

Increments the amount of work to be done causing a 'progressIncremented' event to be emitted
As the workload is incremented, the progress might retract as a lower proportion of the work
is then considered done. Only once this work is completed, and the 'incrementWorkDone', the
progress will increment.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `amount` | `number` | `1` | The amount value. |

#### Returns

`void`

#### Defined in

SceneTree/resourceLoader.ts:151

___

### loadFile

▸ **loadFile**(`type`, `url`): `Promise`<`any`\>

Loads a  file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | - |
| `url` | `string` | The url of the data to load. |

#### Returns

`Promise`<`any`\>

- The promise value.

#### Defined in

SceneTree/resourceLoader.ts:93

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

Utilities/EventEmitter.ts:97

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

Utilities/EventEmitter.ts:44

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

Utilities/EventEmitter.ts:82

___

### registerPlugin

▸ **registerPlugin**(`plugin`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `any` |

#### Returns

`void`

#### Defined in

SceneTree/resourceLoader.ts:82

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

Utilities/EventEmitter.ts:134

___

### setCommonResource

▸ **setCommonResource**(`resourceId`, `resource`): `void`

Saves a common resource for reuse by other tools. Typically this would be a VR asset.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resourceId` | `string` | The resourceId value. |
| `resource` | [`TreeItem`](SceneTree_TreeItem.TreeItem) | The common resource to store |

#### Returns

`void`

#### Defined in

SceneTree/resourceLoader.ts:136

