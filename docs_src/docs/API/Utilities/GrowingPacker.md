---
id: "Utilities_GrowingPacker.GrowingPacker"
title: "Class: GrowingPacker"
sidebar_label: "GrowingPacker"
custom_edit_url: null
---



This is a binary tree based bin packing algorithm that is more complex than
the simple Packer (packer.js). Instead of starting off with a fixed width and
height, it starts with the width and height of the first block passed and then
grows as necessary to accommodate each subsequent block. As it grows it attempts
to maintain a roughly square ratio by making 'smart' choices about whether to
grow right or down.

When growing, the algorithm can only grow to the right OR down. Therefore, if
the new block is BOTH wider and taller than the current target then it will be
rejected. This makes it very important to initialize with a sensible starting
width and height. If you are providing sorted input (largest first) then this
will not be an issue.

A potential way to solve this limitation would be to allow growth in BOTH
directions at once, but this requires maintaining a more complex tree
with 3 children (down, right and center) and that complexity can be avoided
by simply choosing a sensible starting block.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

blocks: array of any objects that have .w and .h attributes

Outputs:
-------

marks each block that fits with a .fit attribute pointing to a
node with .x and .y coordinates

Example:
-------

var blocks = [
{ w: 100, h: 100 },
{ w: 100, h: 100 },
{ w:  80, h:  80 },
{ w:  80, h:  80 },
etc
etc
];

var packer = new GrowingPacker();
packer.fit(blocks);

for(var n = 0 ; n < blocks.length ; n++) {
var block = blocks[n];
if (block.fit) {
Draw(block.fit.x, block.fit.y, block.w, block.h);
}
}

## Hierarchy

- [`EventEmitter`](Utilities_EventEmitter.EventEmitter)

  ↳ **`GrowingPacker`**

## Constructors

### constructor

• **new GrowingPacker**(`w?`, `h?`)

Initializes an empty `listeners` map that will host all the events,
which implies that it doesn't allow multiple events with the same name.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `w` | `number` | `0` |
| `h` | `number` | `0` |

#### Overrides

[EventEmitter](Utilities_EventEmitter.EventEmitter).[constructor](Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Utilities/GrowingPacker.ts:67](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L67)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[__id](Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L11)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[listeners](Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L26)

___

### root

• **root**: `Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:66](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L66)

## Methods

### \_\_addBlock

▸ **__addBlock**(`block`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `Record`<`string`, `any`\> |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:99](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L99)

___

### addBlock

▸ **addBlock**(`block`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `block` | `Record`<`string`, `any`\> |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:105](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L105)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L154)

___

### findNode

▸ **findNode**(`root`, `w`, `h`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `Record`<`string`, `any`\> |
| `w` | `number` |
| `h` | `number` |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:124](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L124)

___

### fit

▸ **fit**(`blocks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `blocks` | `Record`<`string`, `any`\>[] |

#### Returns

`void`

#### Defined in

[src/Utilities/GrowingPacker.ts:77](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L77)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[getId](Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L25)

___

### growDown

▸ **growDown**(`w`, `h`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | `number` |
| `h` | `number` |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:184](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L184)

___

### growNode

▸ **growNode**(`w`, `h`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | `number` |
| `h` | `number` |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:147](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L147)

___

### growRight

▸ **growRight**(`w`, `h`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | `number` |
| `h` | `number` |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:161](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L161)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[on](Utilities_EventEmitter.EventEmitter#on)

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
| `listener` | (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[once](Utilities_EventEmitter.EventEmitter#once)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[removeListenerById](Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L134)

___

### splitNode

▸ **splitNode**(`node`, `w`, `h`): `Record`<`string`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `Record`<`string`, `any`\> |
| `w` | `number` |
| `h` | `number` |

#### Returns

`Record`<`string`, `any`\>

#### Defined in

[src/Utilities/GrowingPacker.ts:130](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/GrowingPacker.ts#L130)

