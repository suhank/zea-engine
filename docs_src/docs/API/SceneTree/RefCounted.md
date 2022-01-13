---
id: "SceneTree_RefCounted.RefCounted"
title: "Class: RefCounted"
sidebar_label: "RefCounted"
custom_edit_url: null
---



Class representing a ref counted object. RefCounted
 objects track ownership and allow explicit cleanup
 of resources. This is necessary when JavaScript
 objects own references to GPU resources that need to
 be cleaned up when the JavaScript object is destroyed.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`RefCounted`**

  ↳↳ [`GLGeom`](../Renderer/Drawing/Renderer_Drawing_GLGeom.GLGeom)

  ↳↳ [`GLTexture2D`](../Renderer/Renderer_GLTexture2D.GLTexture2D)

## Constructors

### constructor

• **new RefCounted**()

Create a ref counted object.

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/RefCounted.ts:19](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L19)

## Properties

### \_\_destroyed

• `Protected` **\_\_destroyed**: `boolean`

#### Defined in

[src/SceneTree/RefCounted.ts:15](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L15)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/BaseClass.ts#L11)

___

### \_\_refs

• `Protected` **\_\_refs**: [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)[]

#### Defined in

[src/SceneTree/RefCounted.ts:14](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L14)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L26)

## Methods

### addRef

▸ **addRef**(`referer`): `boolean`

The addRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/RefCounted.ts:51](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L51)

___

### destroy

▸ **destroy**(): `void`

The destroy method is invoked when the last owner
is removed from a RefCounted object. Derived objects can
override this method to perform explicit cleanup.
The destructing signal is triggered so observers can
respond to this objects destruction.

#### Returns

`void`

#### Defined in

[src/SceneTree/RefCounted.ts:108](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L108)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L154)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/BaseClass.ts#L33)

___

### getId

▸ **getId**(): `number`

Returns the unique id of the object. Every Object has a unique
identifier which is based on a counter that is incremented.

#### Returns

`number`

- The return value.

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/SceneTree/RefCounted.ts:34](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L34)

___

### getRefIndex

▸ **getRefIndex**(`referer`): `number`

The getRefIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/RefCounted.ts:89](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L89)

___

### getRefer

▸ **getRefer**(`index`): [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)

The getRefer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)

- The return value.

#### Defined in

[src/SceneTree/RefCounted.ts:80](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L80)

___

### isDestroyed

▸ **isDestroyed**(): `boolean`

Returns true if this object has already been destroyed.

#### Returns

`boolean`

- Returns true or false.

#### Defined in

[src/SceneTree/RefCounted.ts:97](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L97)

___

### numRefs

▸ **numRefs**(): `number`

The numRefs method.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/RefCounted.ts:42](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L42)

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

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L97)

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

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L44)

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

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L82)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L134)

___

### removeRef

▸ **removeRef**(`referer`): `void`

The removeRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/RefCounted.ts:64](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/RefCounted.ts#L64)

