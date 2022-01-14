---
id: "SceneTree_Operators_OperatorInput.Vec4OperatorInput"
title: "Class: Vec4OperatorInput"
sidebar_label: "Vec4OperatorInput"
custom_edit_url: null
---



## Hierarchy

- [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<[`Vec4`](../../Math/Math_Vec4.Vec4)\>

  ↳ **`Vec4OperatorInput`**

## Constructors

### constructor

• **new Vec4OperatorInput**(`name`)

Create an operator input.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[constructor](SceneTree_Operators_OperatorInput.OperatorInput#constructor)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:20](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L20)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[__id](SceneTree_Operators_OperatorInput.OperatorInput#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/BaseClass.ts#L11)

___

### \_op

• `Optional` **\_op**: [`Operator`](SceneTree_Operators_Operator.Operator)

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[_op](SceneTree_Operators_OperatorInput.OperatorInput#_op)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:12](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L12)

___

### detached

• **detached**: `boolean` = `false`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[detached](SceneTree_Operators_OperatorInput.OperatorInput#detached)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:14](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L14)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[listeners](SceneTree_Operators_OperatorInput.OperatorInput#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[name](SceneTree_Operators_OperatorInput.OperatorInput#name)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:11](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L11)

___

### param

• `Optional` **param**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Vec4`](../../Math/Math_Vec4.Vec4)\>

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[param](SceneTree_Operators_OperatorInput.OperatorInput#param)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:13](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L13)

## Methods

### detach

▸ **detach**(): `void`

The detach method is called when an operator is being removed from the scene tree.
It removes all connections to parameters in the scene.

#### Returns

`void`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[detach](SceneTree_Operators_OperatorInput.OperatorInput#detach)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:161](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L161)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[emit](SceneTree_Operators_OperatorInput.OperatorInput#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L154)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[fromJSON](SceneTree_Operators_OperatorInput.OperatorInput#fromjson)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:140](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L140)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[getClassName](SceneTree_Operators_OperatorInput.OperatorInput#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/BaseClass.ts#L33)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[getId](SceneTree_Operators_OperatorInput.OperatorInput#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/BaseClass.ts#L25)

___

### getName

▸ **getName**(): `string`

The getName method.

#### Returns

`string`

- The return value.

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[getName](SceneTree_Operators_OperatorInput.OperatorInput#getname)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:29](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L29)

___

### getOperator

▸ **getOperator**(): [`Operator`](SceneTree_Operators_Operator.Operator)

Returns operator that owns this input.

#### Returns

[`Operator`](SceneTree_Operators_Operator.Operator)

- The operator object.

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[getOperator](SceneTree_Operators_OperatorInput.OperatorInput#getoperator)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:45](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L45)

___

### getParam

▸ **getParam**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Vec4`](../../Math/Math_Vec4.Vec4)\>

The getParam method.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Vec4`](../../Math/Math_Vec4.Vec4)\>

- The return value.

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[getParam](SceneTree_Operators_OperatorInput.OperatorInput#getparam)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:61](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L61)

___

### getValue

▸ **getValue**(): [`Vec4`](../../Math/Math_Vec4.Vec4)

The getValue method.

#### Returns

[`Vec4`](../../Math/Math_Vec4.Vec4)

- The return value.

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[getValue](SceneTree_Operators_OperatorInput.OperatorInput#getvalue)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:93](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L93)

___

### isConnected

▸ **isConnected**(): `boolean`

Returns true if this input is connected to a parameter.

#### Returns

`boolean`

- The return value.

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[isConnected](SceneTree_Operators_OperatorInput.OperatorInput#isconnected)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:53](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L53)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[off](SceneTree_Operators_OperatorInput.OperatorInput#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L97)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[on](SceneTree_Operators_OperatorInput.OperatorInput#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L44)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[once](SceneTree_Operators_OperatorInput.OperatorInput#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L82)

___

### paramValueChanged

▸ `Private` **paramValueChanged**(): `void`

#### Returns

`void`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[paramValueChanged](SceneTree_Operators_OperatorInput.OperatorInput#paramvaluechanged)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:70](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L70)

___

### reattach

▸ **reattach**(): `void`

The reattach method can be called when re-instating an operator in the scene.

#### Returns

`void`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[reattach](SceneTree_Operators_OperatorInput.OperatorInput#reattach)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:174](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L174)

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

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[removeListenerById](SceneTree_Operators_OperatorInput.OperatorInput#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/Utilities/EventEmitter.ts#L134)

___

### setDirty

▸ **setDirty**(): `void`

Propagates from the upstream parameter to the connected operator.

#### Returns

`void`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[setDirty](SceneTree_Operators_OperatorInput.OperatorInput#setdirty)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:111](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L111)

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

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[setOperator](SceneTree_Operators_OperatorInput.OperatorInput#setoperator)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:37](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L37)

___

### setParam

▸ **setParam**(`param?`): `void`

Assigns the Paramter to be used to provide the input value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param?` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<[`Vec4`](../../Math/Math_Vec4.Vec4)\> | The param value. |

#### Returns

`void`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[setParam](SceneTree_Operators_OperatorInput.OperatorInput#setparam)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:78](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L78)

___

### setValue

▸ **setValue**(`value`): `void`

The setValue method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Vec4`](../../Math/Math_Vec4.Vec4) | The value param. |

#### Returns

`void`

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[setValue](SceneTree_Operators_OperatorInput.OperatorInput#setvalue)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:102](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L102)

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

#### Inherited from

[OperatorInput](SceneTree_Operators_OperatorInput.OperatorInput).[toJSON](SceneTree_Operators_OperatorInput.OperatorInput#tojson)

#### Defined in

[src/SceneTree/Operators/OperatorInput.ts:126](https://github.com/ZeaInc/zea-engine/blob/a1fd0b47a/src/SceneTree/Operators/OperatorInput.ts#L126)

