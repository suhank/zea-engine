---
id: "SceneTree_Operators_OperatorInput.OperatorInput"
title: "Class: OperatorInput<T>"
sidebar_label: "OperatorInput"
custom_edit_url: null
---



Class representing an operator input.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`OperatorInput`**

  ↳↳ [`BooleanOperatorInput`](SceneTree_Operators_OperatorInput.BooleanOperatorInput)

  ↳↳ [`NumberOperatorInput`](SceneTree_Operators_OperatorInput.NumberOperatorInput)

  ↳↳ [`Vec2OperatorInput`](SceneTree_Operators_OperatorInput.Vec2OperatorInput)

  ↳↳ [`Vec3OperatorInput`](SceneTree_Operators_OperatorInput.Vec3OperatorInput)

  ↳↳ [`Vec4OperatorInput`](SceneTree_Operators_OperatorInput.Vec4OperatorInput)

  ↳↳ [`ColorOperatorInput`](SceneTree_Operators_OperatorInput.ColorOperatorInput)

  ↳↳ [`QuatOperatorInput`](SceneTree_Operators_OperatorInput.QuatOperatorInput)

  ↳↳ [`XfoOperatorInput`](SceneTree_Operators_OperatorInput.XfoOperatorInput)

  ↳↳ [`Mat3OperatorInput`](SceneTree_Operators_OperatorInput.Mat3OperatorInput)

  ↳↳ [`Mat4OperatorInput`](SceneTree_Operators_OperatorInput.Mat4OperatorInput)

## Constructors

### constructor

• **new OperatorInput**<`T`\>(`name`)

Create an operator input.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:20](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L20)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L11)

___

### \_op

• `Optional` **\_op**: [`Operator`](SceneTree_Operators_Operator.Operator)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:12](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L12)

___

### detached

• **detached**: `boolean` = `false`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:14](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L14)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:11](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L11)

___

### param

• `Optional` **param**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\>

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:13](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L13)

## Methods

### detach

▸ **detach**(): `void`

The detach method is called when an operator is being removed from the scene tree.
It removes all connections to parameters in the scene.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:161](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L161)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L154)

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

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:140](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L140)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L25)

___

### getName

▸ **getName**(): `string`

The getName method.

#### Returns

`string`

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:29](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L29)

___

### getOperator

▸ **getOperator**(): [`Operator`](SceneTree_Operators_Operator.Operator)

Returns operator that owns this input.

#### Returns

[`Operator`](SceneTree_Operators_Operator.Operator)

- The operator object.

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:45](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L45)

___

### getParam

▸ **getParam**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\>

The getParam method.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\>

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:61](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L61)

___

### getValue

▸ **getValue**(): `T`

The getValue method.

#### Returns

`T`

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:93](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L93)

___

### isConnected

▸ **isConnected**(): `boolean`

Returns true if this input is connected to a parameter.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:53](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L53)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

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
| `listener` | (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L82)

___

### paramValueChanged

▸ `Private` **paramValueChanged**(): `void`

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:70](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L70)

___

### reattach

▸ **reattach**(): `void`

The reattach method can be called when re-instating an operator in the scene.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:174](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L174)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L134)

___

### setDirty

▸ **setDirty**(): `void`

Propagates from the upstream parameter to the connected operator.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:111](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L111)

___

### setOperator

▸ **setOperator**(`op`): `void`

Sets operator that owns this input. Called by the operator when adding inputs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | [`Operator`](SceneTree_Operators_Operator.Operator) | The operator object. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:37](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L37)

___

### setParam

▸ **setParam**(`param?`): `void`

Assigns the Paramter to be used to provide the input value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param?` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\> | The param value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:78](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L78)

___

### setValue

▸ **setValue**(`value`): `void`

The setValue method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:102](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L102)

___

### toJSON

▸ **toJSON**(`context?`): `Object`

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Object`

- Returns the json object.

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `paramPath` | `string`[] |

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:126](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Operators/OperatorInput.ts#L126)

