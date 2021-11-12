---
id: "SceneTree_Operators_OperatorOutput.QuatOperatorOutput"
title: "Class: QuatOperatorOutput"
sidebar_label: "QuatOperatorOutput"
custom_edit_url: null
---



## Hierarchy

- [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<[`Quat`](../../Math/Math_Quat.Quat)\>

  ↳ **`QuatOperatorOutput`**

## Constructors

### constructor

• **new QuatOperatorOutput**(`name`, `operatorOutputMode?`)

Create an operator output.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name value. |
| `operatorOutputMode` | [`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode) | `OperatorOutputMode.OP_WRITE` | The mode which the OperatorOutput uses to bind to its target parameter. |

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[constructor](SceneTree_Operators_OperatorOutput.OperatorOutput#constructor)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L25)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[__id](SceneTree_Operators_OperatorOutput.OperatorOutput#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L11)

___

### \_\_name

• **\_\_name**: `string`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[__name](SceneTree_Operators_OperatorOutput.OperatorOutput#__name)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:13](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L13)

___

### \_mode

• **\_mode**: [`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode)

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[_mode](SceneTree_Operators_OperatorOutput.OperatorOutput#_mode)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:14](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L14)

___

### \_op

• **\_op**: [`Operator`](SceneTree_Operators_Operator.Operator) = `null`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[_op](SceneTree_Operators_OperatorOutput.OperatorOutput#_op)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:15](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L15)

___

### \_paramBindIndex

• **\_paramBindIndex**: `number`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[_paramBindIndex](SceneTree_Operators_OperatorOutput.OperatorOutput#_parambindindex)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:17](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L17)

___

### detached

• **detached**: `boolean`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[detached](SceneTree_Operators_OperatorOutput.OperatorOutput#detached)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:18](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L18)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[listeners](SceneTree_Operators_OperatorOutput.OperatorOutput#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L26)

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

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[backPropagateValue](SceneTree_Operators_OperatorOutput.OperatorOutput#backpropagatevalue)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:148](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L148)

___

### detach

▸ **detach**(): `void`

The detach method is called when an operator is being removed from the scene tree.
It removes all connections to parameters in the scene.

#### Returns

`void`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[detach](SceneTree_Operators_OperatorOutput.OperatorOutput#detach)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:208](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L208)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[emit](SceneTree_Operators_OperatorOutput.OperatorOutput#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L154)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[fromJSON](SceneTree_Operators_OperatorOutput.OperatorOutput#fromjson)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:187](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L187)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getClassName](SceneTree_Operators_OperatorOutput.OperatorOutput#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L33)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getId](SceneTree_Operators_OperatorOutput.OperatorOutput#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/BaseClass.ts#L25)

___

### getMode

▸ **getMode**(): [`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode)

Returns mode that the output writes to be parameter. Must be a number from OperatorOutputMode

#### Returns

[`OperatorOutputMode`](../Parameters/SceneTree_Parameters_OperatorOutputMode.OperatorOutputMode)

- The mode value.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getMode](SceneTree_Operators_OperatorOutput.OperatorOutput#getmode)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:62](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L62)

___

### getName

▸ **getName**(): `string`

Returns name of the output.

#### Returns

`string`

- The name string.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getName](SceneTree_Operators_OperatorOutput.OperatorOutput#getname)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:38](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L38)

___

### getOperator

▸ **getOperator**(): [`Operator`](SceneTree_Operators_Operator.Operator)

Returns operator that owns this output.

#### Returns

[`Operator`](SceneTree_Operators_Operator.Operator)

- The operator object.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getOperator](SceneTree_Operators_OperatorOutput.OperatorOutput#getoperator)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:54](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L54)

___

### getParam

▸ **getParam**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Quat`](../../Math/Math_Quat.Quat)\>

The getParam method.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Quat`](../../Math/Math_Quat.Quat)\>

- The return value.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getParam](SceneTree_Operators_OperatorOutput.OperatorOutput#getparam)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:78](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L78)

___

### getParamBindIndex

▸ **getParamBindIndex**(): `number`

Returns the index of the binding on the parameter of this OperatorOutput
up to date.

#### Returns

`number`

index - The index of the binding on the parameter.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getParamBindIndex](SceneTree_Operators_OperatorOutput.OperatorOutput#getparambindindex)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:103](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L103)

___

### getValue

▸ **getValue**(): [`Quat`](../../Math/Math_Quat.Quat)

The getValue method.

#### Returns

[`Quat`](../../Math/Math_Quat.Quat)

- The return value.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[getValue](SceneTree_Operators_OperatorOutput.OperatorOutput#getvalue)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:129](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L129)

___

### isConnected

▸ **isConnected**(): `boolean`

Returns true if this output is connected to a parameter.

#### Returns

`boolean`

- The return value.

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[isConnected](SceneTree_Operators_OperatorOutput.OperatorOutput#isconnected)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:70](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L70)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[off](SceneTree_Operators_OperatorOutput.OperatorOutput#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L97)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[on](SceneTree_Operators_OperatorOutput.OperatorOutput#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L44)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[once](SceneTree_Operators_OperatorOutput.OperatorOutput#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L82)

___

### reattach

▸ **reattach**(): `void`

The reattach method can be called when re-instating an operator in the scene.

#### Returns

`void`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[reattach](SceneTree_Operators_OperatorOutput.OperatorOutput#reattach)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:220](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L220)

___

### rebind

▸ **rebind**(): `void`

The rebind rebinds the outputs to be at the top of the stack for its parameter.

#### Returns

`void`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[rebind](SceneTree_Operators_OperatorOutput.OperatorOutput#rebind)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:230](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L230)

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

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[removeListenerById](SceneTree_Operators_OperatorOutput.OperatorOutput#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/Utilities/EventEmitter.ts#L134)

___

### setClean

▸ **setClean**(`value`): `void`

The setClean method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Quat`](../../Math/Math_Quat.Quat) | The value param. |

#### Returns

`void`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[setClean](SceneTree_Operators_OperatorOutput.OperatorOutput#setclean)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:159](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L159)

___

### setDirty

▸ **setDirty**(): `void`

Propagates dirty to the connected parameter.

#### Returns

`void`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[setDirty](SceneTree_Operators_OperatorOutput.OperatorOutput#setdirty)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:119](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L119)

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

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[setOperator](SceneTree_Operators_OperatorOutput.OperatorOutput#setoperator)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:46](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L46)

___

### setParam

▸ **setParam**(`param?`, `index?`): `void`

Sets the Parameter for this output to write to.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `param?` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Quat`](../../Math/Math_Quat.Quat)\> | `undefined` | The param value. |
| `index` | `number` | `-1` | The index to bind at in the Parameter. |

#### Returns

`void`

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[setParam](SceneTree_Operators_OperatorOutput.OperatorOutput#setparam)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:87](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L87)

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

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[setParamBindIndex](SceneTree_Operators_OperatorOutput.OperatorOutput#setparambindindex)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:112](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L112)

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

#### Inherited from

[OperatorOutput](SceneTree_Operators_OperatorOutput.OperatorOutput).[toJSON](SceneTree_Operators_OperatorOutput.OperatorOutput#tojson)

#### Defined in

[SceneTree/Operators/OperatorOutput.ts:173](https://github.com/ZeaInc/zea-engine/blob/9a102c0d/src/SceneTree/Operators/OperatorOutput.ts#L173)

