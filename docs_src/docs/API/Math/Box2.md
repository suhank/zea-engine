---
id: "Math_Box2.Box2"
title: "Class: Box2"
sidebar_label: "Box2"
custom_edit_url: null
---



Represents a box in 2D space. Needing two Vec2 vectors describing the corners

## Constructors

### constructor

• **new Box2**(`p0?`, `p1?`)

Creates a Box2 object using Vec2s.
In case the parameters are not passed by, their values are pre-defined:

p0 is a Vec2 with [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)

p1 is a Vec2 with [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p0?` | [`Vec2`](Math_Vec2.Vec2) | A point representing the corners of a 2D box. |
| `p1?` | [`Vec2`](Math_Vec2.Vec2) | A point representing the corners of a 2D box. |

#### Defined in

[src/Math/Box2.ts:22](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L22)

## Properties

### p0

• **p0**: [`Vec2`](Math_Vec2.Vec2)

#### Defined in

[src/Math/Box2.ts:8](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L8)

___

### p1

• **p1**: [`Vec2`](Math_Vec2.Vec2)

#### Defined in

[src/Math/Box2.ts:9](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L9)

## Methods

### addPoint

▸ **addPoint**(`point`): `void`

Expands the Box2 to contain the new point.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | [`Vec2`](Math_Vec2.Vec2) | A point represents the corners of a 2D box. |

#### Returns

`void`

#### Defined in

[src/Math/Box2.ts:78](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L78)

___

### center

▸ **center**(): [`Vec2`](Math_Vec2.Vec2)

Returns the center point of a Box2.

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a Vec2.

#### Defined in

[src/Math/Box2.ts:109](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L109)

___

### diagonal

▸ **diagonal**(): [`Vec2`](Math_Vec2.Vec2)

Returns the size of a Box2 - the same as size().

#### Returns

[`Vec2`](Math_Vec2.Vec2)

- Returns a Vec2.

#### Defined in

[src/Math/Box2.ts:100](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L100)

___

### isValid

▸ **isValid**(): `boolean`

Returns `true` if the box has been expanded to contain a point.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Math/Box2.ts:64](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L64)

___

### reset

▸ **reset**(): `void`

Resets the box2 back to an uninitialized state.

**`see`** [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)
and [`Number.NEGATIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)

#### Returns

`void`

#### Defined in

[src/Math/Box2.ts:52](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L52)

___

### set

▸ **set**(`p0`, `p1`): `void`

Sets both Vec2 points

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `p0` | [`Vec2`](Math_Vec2.Vec2) | A point representing the corners of a 2D box. |
| `p1` | [`Vec2`](Math_Vec2.Vec2) | A point representing the corners of a 2D box. |

#### Returns

`void`

#### Defined in

[src/Math/Box2.ts:41](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L41)

___

### size

▸ **size**(): `number`

Returns the length of the diagonal of the box.

#### Returns

`number`

- Returns the distance.

#### Defined in

[src/Math/Box2.ts:91](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L91)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `Record`<`string`, `number`\>\>

Encodes `Box2` Class as a JSON object for persistence.

#### Returns

`Record`<`string`, `Record`<`string`, `number`\>\>

- The json object.

#### Defined in

[src/Math/Box2.ts:124](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L124)

___

### toString

▸ **toString**(): `string`

Calls `toJSON` method and stringifies it.

#### Returns

`string`

- The return value.

#### Defined in

[src/Math/Box2.ts:136](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Math/Box2.ts#L136)

