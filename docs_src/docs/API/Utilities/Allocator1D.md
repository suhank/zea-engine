---
id: "Utilities_Allocator1D.Allocator1D"
title: "Class: Allocator1D"
sidebar_label: "Allocator1D"
custom_edit_url: null
---



An 1D allocator is used to manage packing multiple smaller blocks of data
into a single large block of memory, supporting resizing and re-allocating.
As allocations are changed, fragmentation occurs as blocks must be moved

Example:
```javascript
const allocator = new Allocator1D()

let memory = new Uint32Array(25)
allocator.on('resize', () => {
  memory = new Uint32Array(allocator.reservedSpace)
})
allocator.on('dataReallocated', (event) => {
  // during allocation, a defragment might occur, which means
  // we need to reload some of our data.
})

allocator.allocate(1, 5)
allocator.allocate(2, 10)
allocator.allocate(3, 10)
allocator.allocate(4, 20)
allocator.allocate(3, 20) // resize 3 to grow the allocated space.
allocator.allocate(1, 7) // resize 1 to fit into the previous space of 3, leaving a new free block.
allocator.allocate(1, 10) // resize 1 to fit into the previous space of 3, consuming the free block.
```

## Hierarchy

- [`EventEmitter`](Utilities_EventEmitter.EventEmitter)

  ↳ **`Allocator1D`**

## Constructors

### constructor

• **new Allocator1D**()

Initializes the allocator ready to start work

#### Overrides

[EventEmitter](Utilities_EventEmitter.EventEmitter).[constructor](Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Utilities/Allocator1D.ts:70](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L70)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[__id](Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L11)

___

### allocatedSpace

• **allocatedSpace**: `number`

#### Defined in

[src/Utilities/Allocator1D.ts:64](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L64)

___

### allocations

• **allocations**: `any`[]

#### Defined in

[src/Utilities/Allocator1D.ts:62](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L62)

___

### allocationsMap

• **allocationsMap**: `Record`<`number`, `number`\>

#### Defined in

[src/Utilities/Allocator1D.ts:63](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L63)

___

### freeList

• **freeList**: `any`[]

#### Defined in

[src/Utilities/Allocator1D.ts:61](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L61)

___

### freeSpace

• **freeSpace**: `number`

#### Defined in

[src/Utilities/Allocator1D.ts:66](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L66)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[listeners](Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L26)

___

### reservedSpace

• **reservedSpace**: `number`

#### Defined in

[src/Utilities/Allocator1D.ts:65](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L65)

## Methods

### addBlock

▸ `Private` **addBlock**(`index`, `allocation`): `void`

Adds a new block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index where the block should be inserted. |
| `allocation` | [`Allocation1D`](Utilities_Allocator1D.Allocation1D) | The allocation to insert |

#### Returns

`void`

#### Defined in

[src/Utilities/Allocator1D.ts:202](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L202)

___

### allocate

▸ **allocate**(`id`, `size`): [`Allocation1D`](Utilities_Allocator1D.Allocation1D)

Allocates space for a new or existing item. The id is a handle that the consuming code uses to
track allocations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The unique numerical identifer for the block. |
| `size` | `number` | The name of the event. |

#### Returns

[`Allocation1D`](Utilities_Allocator1D.Allocation1D)

- The new allocation

#### Defined in

[src/Utilities/Allocator1D.ts:98](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L98)

___

### deallocate

▸ **deallocate**(`id`): `void`

Deallocate space for an existing item, making it free for other uses.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The unique numerical identifer for the block. |

#### Returns

`void`

#### Defined in

[src/Utilities/Allocator1D.ts:274](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L274)

___

### defragment

▸ **defragment**(): `void`

Defragment the memory space reducing memory requirements.
TODO: Implement this method.

#### Returns

`void`

#### Defined in

[src/Utilities/Allocator1D.ts:296](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L296)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[emit](Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L154)

___

### freeBlock

▸ `Private` **freeBlock**(`index`): `void`

Frees a block by either growing neighboring blocks or adding a new free block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the block to free. |

#### Returns

`void`

#### Defined in

[src/Utilities/Allocator1D.ts:242](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L242)

___

### getAllocation

▸ **getAllocation**(`id`): [`Allocation1D`](Utilities_Allocator1D.Allocation1D)

Returns the Allocates for the given Id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | The unique numerical identifer for the block. |

#### Returns

[`Allocation1D`](Utilities_Allocator1D.Allocation1D)

- The allocation

#### Defined in

[src/Utilities/Allocator1D.ts:86](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L86)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[getClassName](Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L33)

___

### getFragmentation

▸ **getFragmentation**(): `number`

Returns the ratio of fragmented memory over reserved memory.

#### Returns

`number`

The fragmentation ratio. Between 0 and some value less than 1

#### Defined in

[src/Utilities/Allocator1D.ts:288](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L288)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[getId](Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L25)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[off](Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[on](Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[once](Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L82)

___

### removeBlock

▸ `Private` **removeBlock**(`index`): `void`

Remove a new block

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index where the block should be removed |

#### Returns

`void`

#### Defined in

[src/Utilities/Allocator1D.ts:222](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L222)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[removeListenerById](Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L134)

___

### verifyConsistency

▸ **verifyConsistency**(): `void`

Checks that the allocations are consistent and not corrupt in any way.

#### Returns

`void`

#### Defined in

[src/Utilities/Allocator1D.ts:304](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/Allocator1D.ts#L304)

