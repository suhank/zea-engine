---
id: "SceneTree_GeomLibrary.GeomLibrary"
title: "Class: GeomLibrary"
sidebar_label: "GeomLibrary"
custom_edit_url: null
---



Class representing a geometry library.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GeomLibrary`**

## Constructors

### constructor

• **new GeomLibrary**()

Create a geom library.

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[SceneTree/GeomLibrary.ts:93](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L93)

## Properties

### \_\_genBuffersOpts

• `Protected` **\_\_genBuffersOpts**: `Record`<`string`, `any`\>

#### Defined in

[SceneTree/GeomLibrary.ts:82](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L82)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/BaseClass.ts#L11)

___

### \_\_loadedCount

• `Protected` **\_\_loadedCount**: `number` = `0`

#### Defined in

[SceneTree/GeomLibrary.ts:89](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L89)

___

### \_\_numGeoms

• `Protected` **\_\_numGeoms**: `number` = `-1`

#### Defined in

[SceneTree/GeomLibrary.ts:86](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L86)

___

### \_\_streamInfos

• `Protected` **\_\_streamInfos**: `Record`<`string`, `StreamInfo`\>

#### Defined in

[SceneTree/GeomLibrary.ts:81](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L81)

___

### basePath

• `Protected` **basePath**: `string` = `''`

#### Defined in

[SceneTree/GeomLibrary.ts:88](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L88)

___

### geoms

• `Protected` **geoms**: [`BaseGeom`](Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)[] = `[]`

#### Defined in

[SceneTree/GeomLibrary.ts:87](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L87)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[SceneTree/GeomLibrary.ts:80](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L80)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L26)

___

### loadContext

• `Protected` `Optional` **loadContext**: [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext)

#### Defined in

[SceneTree/GeomLibrary.ts:85](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L85)

___

### loadCount

• `Protected` **loadCount**: `number`

#### Defined in

[SceneTree/GeomLibrary.ts:83](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L83)

___

### queue

• `Protected` **queue**: `any`[]

#### Defined in

[SceneTree/GeomLibrary.ts:84](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L84)

## Methods

### \_\_receiveGeomDatas

▸ `Private` **__receiveGeomDatas**(`data`): `boolean`

The __receiveGeomDatas method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `object` | The data received back from the web worker |

#### Returns

`boolean`

- returns true once all data for this geom library has been loaded.

#### Defined in

[SceneTree/GeomLibrary.ts:329](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L329)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Defined in

[SceneTree/GeomLibrary.ts:116](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L116)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L154)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/BaseClass.ts#L33)

___

### getGeom

▸ **getGeom**(`index`): [`BaseGeom`](Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)

The getGeom method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseGeom`](Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)

- The stored geometry

#### Defined in

[SceneTree/GeomLibrary.ts:217](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L217)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/BaseClass.ts#L25)

___

### getNumGeoms

▸ **getNumGeoms**(): `number`

Returns the number of geometries the GeomLibrary has, or will have at the end of loading.

#### Returns

`number`

- The number of geometries.

#### Defined in

[SceneTree/GeomLibrary.ts:208](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L208)

___

### isLoaded

▸ **isLoaded**(): `boolean`

The returns true if all the geometries have been loaded and the loaded event has already been emitted.

#### Returns

`boolean`

- True if all geometries are already loaded, else false.

#### Defined in

[SceneTree/GeomLibrary.ts:126](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L126)

___

### loadGeomFile

▸ `Private` **loadGeomFile**(`geomFileID`, `incrementProgress?`): `Promise`<`void`\>

Loads a single geometry file for this GeomLibrary.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `geomFileID` | `number` | `undefined` | The index of the file to load |
| `incrementProgress` | `boolean` | `false` | If true, the progress bar is incremented and decremented. |

#### Returns

`Promise`<`void`\>

the promise resolves once the file is loaded, but not parsed.

#### Defined in

[SceneTree/GeomLibrary.ts:139](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L139)

___

### loadGeomFilesStream

▸ **loadGeomFilesStream**(`geomLibraryJSON`, `basePath`, `context`): `void`

Loads the geometry files for this GeomLibrary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomLibraryJSON` | `Record`<`string`, `any`\> | The json data describing the data needed to be loaded by the geom library |
| `basePath` | `string` | The base path of the file. (this is theURL of the zcad file without its extension.) |
| `context` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) | The value param. |

#### Returns

`void`

#### Defined in

[SceneTree/GeomLibrary.ts:174](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L174)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L82)

___

### readBinaryBuffer

▸ **readBinaryBuffer**(`geomFileID`, `buffer`, `context`): `void`

The readBinaryBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomFileID` | `string` | The key value. |
| `buffer` | `ArrayBuffer` | The buffer value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Defined in

[SceneTree/GeomLibrary.ts:231](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L231)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/Utilities/EventEmitter.ts#L134)

___

### setGenBufferOption

▸ **setGenBufferOption**(`key`, `value`): `void`

The setGenBufferOption method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |
| `value` | `any` | The value param. |

#### Returns

`void`

#### Defined in

[SceneTree/GeomLibrary.ts:192](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L192)

___

### setNumGeoms

▸ **setNumGeoms**(`expectedNumGeoms`): `void`

The setNumGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expectedNumGeoms` | `number` | The expectedNumGeoms value. |

#### Returns

`void`

#### Defined in

[SceneTree/GeomLibrary.ts:200](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L200)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Defined in

[SceneTree/GeomLibrary.ts:398](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L398)

___

### toString

▸ **toString**(): `string`

The toString method.

#### Returns

`string`

- The return value.

#### Defined in

[SceneTree/GeomLibrary.ts:408](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L408)

___

### shutDownWorkers

▸ `Static` **shutDownWorkers**(): `void`

#### Returns

`void`

#### Defined in

[SceneTree/GeomLibrary.ts:412](https://github.com/ZeaInc/zea-engine/blob/2a869013/src/SceneTree/GeomLibrary.ts#L412)

