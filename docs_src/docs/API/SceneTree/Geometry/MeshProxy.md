---
id: "SceneTree_Geometry_GeomProxies.MeshProxy"
title: "Class: MeshProxy"
sidebar_label: "MeshProxy"
custom_edit_url: null
---



Class representing a mesh proxy.

## Hierarchy

- [`BaseProxy`](SceneTree_Geometry_GeomProxies.BaseProxy)

  ↳ **`MeshProxy`**

## Constructors

### constructor

• **new MeshProxy**(`data`)

Create a mesh proxy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `any` | The data value. |

#### Overrides

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[constructor](SceneTree_Geometry_GeomProxies.BaseProxy#constructor)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:150](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L150)

## Properties

### \_\_buffers

• **\_\_buffers**: `any`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[__buffers](SceneTree_Geometry_GeomProxies.BaseProxy#__buffers)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:11](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L11)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[__id](SceneTree_Geometry_GeomProxies.BaseProxy#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `any`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[__metaData](SceneTree_Geometry_GeomProxies.BaseProxy#__metadata)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:13](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L13)

___

### boundingBox

• `Protected` **boundingBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[boundingBox](SceneTree_Geometry_GeomProxies.BaseProxy#boundingbox)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:12](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L12)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[listeners](SceneTree_Geometry_GeomProxies.BaseProxy#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L26)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[name](SceneTree_Geometry_GeomProxies.BaseProxy#name)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:10](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L10)

## Methods

### deleteMetadata

▸ **deleteMetadata**(`key`): `void`

Removes metadata for a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`void`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[deleteMetadata](SceneTree_Geometry_GeomProxies.BaseProxy#deletemetadata)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:99](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L99)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[emit](SceneTree_Geometry_GeomProxies.BaseProxy#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L154)

___

### genBuffers

▸ **genBuffers**(): `any`

The genBuffers method.

#### Returns

`any`

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[genBuffers](SceneTree_Geometry_GeomProxies.BaseProxy#genbuffers)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:60](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L60)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getBoundingBox](SceneTree_Geometry_GeomProxies.BaseProxy#getboundingbox)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:52](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L52)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getClassName](SceneTree_Geometry_GeomProxies.BaseProxy#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L33)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getId](SceneTree_Geometry_GeomProxies.BaseProxy#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L25)

___

### getMetadata

▸ **getMetadata**(`key`): `any`

The getMetadata method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`any`

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getMetadata](SceneTree_Geometry_GeomProxies.BaseProxy#getmetadata)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:72](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L72)

___

### getNumTriangles

▸ **getNumTriangles**(): `number`

Returns the number of triangles in this mesh proxy geometry.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:159](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L159)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getNumVertices](SceneTree_Geometry_GeomProxies.BaseProxy#getnumvertices)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:44](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L44)

___

### hasMetadata

▸ **hasMetadata**(`key`): `any`

The hasMetadata method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`any`

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[hasMetadata](SceneTree_Geometry_GeomProxies.BaseProxy#hasmetadata)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:81](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L81)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[off](SceneTree_Geometry_GeomProxies.BaseProxy#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L97)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[on](SceneTree_Geometry_GeomProxies.BaseProxy#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L44)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[once](SceneTree_Geometry_GeomProxies.BaseProxy#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L82)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[removeListenerById](SceneTree_Geometry_GeomProxies.BaseProxy#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L134)

___

### setMetadata

▸ **setMetadata**(`key`, `metaData`): `void`

The setMetadata method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |
| `metaData` | `any` | The metaData value. |

#### Returns

`void`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[setMetadata](SceneTree_Geometry_GeomProxies.BaseProxy#setmetadata)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:90](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Geometry/GeomProxies.ts#L90)

