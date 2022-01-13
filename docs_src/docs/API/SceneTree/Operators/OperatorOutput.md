---
id: "SceneTree_Operators_OperatorOutput.OperatorOutput"
title: "Class: OperatorOutput<T>"
sidebar_label: "OperatorOutput"
custom_edit_url: null
---



Class representing an operator output.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`OperatorOutput`**

  ↳↳ [`BooleanOperatorOutput`](SceneTree_Operators_OperatorOutput.BooleanOperatorOutput)

  ↳↳ [`NumberOperatorOutput`](SceneTree_Operators_OperatorOutput.NumberOperatorOutput)

  ↳↳ [`Vec2OperatorOutput`](SceneTree_Operators_OperatorOutput.Vec2OperatorOutput)

  ↳↳ [`Vec3OperatorOutput`](SceneTree_Operators_OperatorOutput.Vec3OperatorOutput)

  ↳↳ [`Vec4OperatorOutput`](SceneTree_Operators_OperatorOutput.Vec4OperatorOutput)

  ↳↳ [`ColorOperatorOutput`](SceneTree_Operators_OperatorOutput.ColorOperatorOutput)

  ↳↳ [`QuatOperatorOutput`](SceneTree_Operators_OperatorOutput.QuatOperatorOutput)

  ↳↳ [`XfoOperatorOutput`](SceneTree_Operators_OperatorOutput.XfoOperatorOutput)

  ↳↳ [`Mat3OperatorOutput`](SceneTree_Operators_OperatorOutput.Mat3OperatorOutput)

  ↳↳ [`Mat4OperatorOutput`](SceneTree_Operators_OperatorOutput.Mat4OperatorOutput)

## Constructors

### constructor

• **new OperatorOutput**<`T`\>(`name`, `operatorOutputMode?`)

Create an operator output.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name value. |
| `operatorOutputMode` | [`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode) | `OperatorOutputMode.OP_WRITE` | The mode which the OperatorOutput uses to bind to its target parameter. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:25](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L25)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L11)

___

### \_\_name

• **\_\_name**: `string`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:13](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L13)

___

### \_mode

• **\_mode**: [`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode)

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:14](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L14)

___

### \_op

• **\_op**: [`Operator`](SceneTree_Operators_Operator.Operator) = `null`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:15](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L15)

___

### \_param

• `Private` `Optional` **\_param**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\>

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:16](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L16)

___

### \_paramBindIndex

• **\_paramBindIndex**: `number`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:17](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L17)

___

### detached

• **detached**: `boolean`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:18](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L18)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L26)

## Methods

### backPropagateValue

▸ **backPropagateValue**(`value`): `any`

When the value on a Parameter is modified by a user by calling 'setValue,
then if any operators are bound, the value of the Parameter cannot be modified
directly as it is the result of a computation. Instead, the Parameter calls
'backPropagateValue' on the Operator to cause the Operator to handle propagating
the value to one or more of its inputs.
to its inputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The value param. |

#### Returns

`any`

- The modified value.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:148](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L148)

___

### detach

▸ **detach**(): `void`

The detach method is called when an operator is being removed from the scene tree.
It removes all connections to parameters in the scene.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:208](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L208)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L154)

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

[src/SceneTree/Operators/OperatorOutput.ts:187](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L187)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L33)

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

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/BaseClass.ts#L25)

___

### getMode

▸ **getMode**(): [`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode)

Returns mode that the output writes to be parameter. Must be a number from OperatorOutputMode

#### Returns

[`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode)

- The mode value.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:62](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L62)

___

### getName

▸ **getName**(): `string`

Returns name of the output.

#### Returns

`string`

- The name string.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:38](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L38)

___

### getOperator

▸ **getOperator**(): [`Operator`](SceneTree_Operators_Operator.Operator)

Returns operator that owns this output.

#### Returns

[`Operator`](SceneTree_Operators_Operator.Operator)

- The operator object.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:54](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L54)

___

### getParam

▸ **getParam**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\>

The getParam method.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\>

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:78](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L78)

___

### getParamBindIndex

▸ **getParamBindIndex**(): `number`

Returns the index of the binding on the parameter of this OperatorOutput
up to date.

#### Returns

`number`

index - The index of the binding on the parameter.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:103](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L103)

___

### getValue

▸ **getValue**(): `T`

The getValue method.

#### Returns

`T`

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:129](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L129)

___

### isConnected

▸ **isConnected**(): `boolean`

Returns true if this output is connected to a parameter.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:70](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L70)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

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
| `listener` | (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L82)

___

### reattach

▸ **reattach**(): `void`

The reattach method can be called when re-instating an operator in the scene.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:220](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L220)

___

### rebind

▸ **rebind**(): `void`

The rebind rebinds the outputs to be at the top of the stack for its parameter.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:230](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L230)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/Utilities/EventEmitter.ts#L134)

___

### setClean

▸ **setClean**(`value`): `void`

The setClean method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:159](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L159)

___

### setDirty

▸ **setDirty**(): `void`

Propagates dirty to the connected parameter.

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:119](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L119)

___

### setOperator

▸ **setOperator**(`op`): `void`

Sets operator that owns this output. Called by the operator when adding outputs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `op` | [`Operator`](SceneTree_Operators_Operator.Operator) | The operator object. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:46](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L46)

___

### setParam

▸ **setParam**(`param?`, `index?`): `void`

Sets the Parameter for this output to write to.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `param?` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`T`\> | `undefined` | The param value. |
| `index` | `number` | `-1` | The index to bind at in the Parameter. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:87](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L87)

___

### setParamBindIndex

▸ **setParamBindIndex**(`index`): `void`

If bindings change on a Parameter, it will call this method to ensure the output index is
up to date.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the binding on the parameter. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:112](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L112)

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
| `paramBindIndex` | `number` |
| `paramPath` | `string`[] |

#### Defined in

[src/SceneTree/Operators/OperatorOutput.ts:173](https://github.com/ZeaInc/zea-engine/blob/ab3250ece/src/SceneTree/Operators/OperatorOutput.ts#L173)

