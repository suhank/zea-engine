---
id: "SceneTree_Parameters_Parameter.Parameter"
title: "Class: Parameter<T>"
sidebar_label: "Parameter"
custom_edit_url: null
---



Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.

**Events**
* **nameChanged:** Triggered when the name of the parameter changes.
* **valueChanged:** Triggered when the value of the parameter changes.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`Parameter`**

  ↳↳ [`BooleanParameter`](SceneTree_Parameters_BooleanParameter.BooleanParameter)

  ↳↳ [`BoundingBoxParameter`](SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

  ↳↳ [`ColorParameter`](SceneTree_Parameters_ColorParameter.ColorParameter)

  ↳↳ [`FilePathParameter`](SceneTree_Parameters_FilePathParameter.FilePathParameter)

  ↳↳ [`GeometryParameter`](SceneTree_Parameters_GeometryParameter.GeometryParameter)

  ↳↳ [`ImageParameter`](SceneTree_Parameters_ImageParameter.ImageParameter)

  ↳↳ [`ItemSetParameter`](SceneTree_Parameters_ItemSetParameter.ItemSetParameter)

  ↳↳ [`ListParameter`](SceneTree_Parameters_ListParameter.ListParameter)

  ↳↳ [`Mat3Parameter`](SceneTree_Parameters_Mat3Parameter.Mat3Parameter)

  ↳↳ [`Mat4Parameter`](SceneTree_Parameters_Mat4Parameter.Mat4Parameter)

  ↳↳ [`MaterialParameter`](SceneTree_Parameters_MaterialParameter.MaterialParameter)

  ↳↳ [`NumberParameter`](SceneTree_Parameters_NumberParameter.NumberParameter)

  ↳↳ [`QuatParameter`](SceneTree_Parameters_QuatParameter.QuatParameter)

  ↳↳ [`StringListParameter`](SceneTree_Parameters_StringListParameter.StringListParameter)

  ↳↳ [`StringParameter`](SceneTree_Parameters_StringParameter.StringParameter)

  ↳↳ [`StructParameter`](SceneTree_Parameters_StructParameter.StructParameter)

  ↳↳ [`TreeItemParameter`](SceneTree_Parameters_TreeItemParameter.TreeItemParameter)

  ↳↳ [`Vec2Parameter`](SceneTree_Parameters_Vec2Parameter.Vec2Parameter)

  ↳↳ [`Vec3Parameter`](SceneTree_Parameters_Vec3Parameter.Vec3Parameter)

  ↳↳ [`Vec4Parameter`](SceneTree_Parameters_Vec4Parameter.Vec4Parameter)

  ↳↳ [`XfoParameter`](SceneTree_Parameters_XfoParameter.XfoParameter)

## Implements

- [`ICloneable`](../../Utilities/Utilities_ICloneable.ICloneable)
- [`ISerializable`](../../Utilities/Utilities_ISerializable.ISerializable)

## Constructors

### constructor

• **new Parameter**<`T`\>(`name?`, `value`, `dataType`)

When initializing a new parameter, the passed in value could be anything.
If it is a new type of value, just ensure you register it in the `Registry`.

How to use it:

```javascript
 // Creating a parameter object
 const param = new Parameter('Title', 'Awesome Parameter Value', 'String')

  // Capturing events
 param.on('valueChanged', (...params) => console.log('Value changed!'))

 // Changing parameter's value will cause `valueChanged` event to trigger.
 param.setValue('A New Awesome Parameter Value')
 // As result the console log code will execute: Value Changed!
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the parameter. |
| `value` | `T` | `undefined` | The value of the parameter. |
| `dataType` | `string` | `undefined` | The data type of the parameter. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

SceneTree/Parameters/Parameter.ts:51

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

Utilities/BaseClass.ts:11

___

### \_\_value

• **\_\_value**: `T`

#### Defined in

SceneTree/Parameters/Parameter.ts:25

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Defined in

SceneTree/Parameters/Parameter.ts:19

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Defined in

SceneTree/Parameters/Parameter.ts:20

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Defined in

SceneTree/Parameters/Parameter.ts:21

___

### dataType

• `Protected` **dataType**: `string`

#### Defined in

SceneTree/Parameters/Parameter.ts:26

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Defined in

SceneTree/Parameters/Parameter.ts:18

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Defined in

SceneTree/Parameters/Parameter.ts:22

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Defined in

SceneTree/Parameters/Parameter.ts:23

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

Utilities/EventEmitter.ts:26

___

### name

• `Protected` **name**: `string`

#### Defined in

SceneTree/Parameters/Parameter.ts:24

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Defined in

SceneTree/Parameters/Parameter.ts:27

## Accessors

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Defined in

SceneTree/Parameters/Parameter.ts:399

• `set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:403

## Methods

### \_\_findFirstOP\_WRITE

▸ `Private` **__findFirstOP_WRITE**(): `void`

Find the first operator in our stack which writes using an OP_WRITE connection.
All operators before this op can be ignored during dirty propagation.

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:198

___

### \_clean

▸ **_clean**(`index`): `void`

Cleans the parameter up tp the index of the specified index of the bound OperatorOutput

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:328

___

### bindOperatorInput

▸ **bindOperatorInput**(`operatorInput`): `void`

When an Operator is reading from a parameter, it must be dirtied when the parameter value
changes. The Parameter maintains a list of bound inputs and will propagate dirty to
them explicitly.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorInput` | [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\> | The output that we are unbinding from the Parameter |

#### Returns

`void`

- The index of the bound output.

#### Defined in

SceneTree/Parameters/Parameter.ts:136

___

### bindOperatorOutput

▸ **bindOperatorOutput**(`operatorOutput`, `index?`): `number`

When an Operator writes to a parameter, it binds its outputs to the parameter at a given
index. Then when the operator is dirtied by one of its inputs, it explicitly dirties
the output parameters.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `operatorOutput` | [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\> | `undefined` | The output that we are unbinding from the Parameter |
| `index` | `number` | `-1` | The index(optional) that the output is being bound at. |

#### Returns

`number`

- The index of the bound output.

#### Defined in

SceneTree/Parameters/Parameter.ts:161

___

### clone

▸ `Abstract` **clone**(): [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`unknown`\>

#### Returns

[`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`unknown`\>

#### Implementation of

[ICloneable](../../Utilities/Utilities_ICloneable.ICloneable).[clone](../../Utilities/Utilities_ICloneable.ICloneable#clone)

#### Defined in

SceneTree/Parameters/Parameter.ts:423

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:441

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

Utilities/EventEmitter.ts:154

___

### fromJSON

▸ `Abstract` **fromJSON**(`j`, `context?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `j` | `Record`<`string`, `any`\> |
| `context?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Implementation of

[ISerializable](../../Utilities/Utilities_ISerializable.ISerializable).[fromJSON](../../Utilities/Utilities_ISerializable.ISerializable#fromjson)

#### Defined in

SceneTree/Parameters/Parameter.ts:421

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

Utilities/BaseClass.ts:33

___

### getDataType

▸ **getDataType**(): `string`

Returns parameter's data type.

#### Returns

`string`

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:120

___

### getDirtyBindingIndex

▸ **getDirtyBindingIndex**(): `number`

Returns the index of the first 'dirty' binding in the stack. This will be the index of the
first operator that will evaluate when the parameter needs to be cleaned.

#### Returns

`number`

- The index of the dirty binding in the binding stack.

#### Defined in

SceneTree/Parameters/Parameter.ts:257

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

Utilities/BaseClass.ts:25

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Defined in

SceneTree/Parameters/Parameter.ts:63

___

### getOwner

▸ **getOwner**(): [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

Returns the owner item of the current parameter.

#### Returns

[`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:88

___

### getPath

▸ **getPath**(): `string`[]

Returns the parameter's path as an array of strings.
Includes owner's path in case it is owned by a `ParameterOwner`.

#### Returns

`string`[]

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:107

___

### getValue

▸ **getValue**(): `T`

Returns parameter's value.

#### Returns

`T`

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:359

___

### getValueFromOp

▸ **getValueFromOp**(`index`): `T`

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`T`

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:313

___

### isDirty

▸ **isDirty**(): `boolean`

Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.

#### Returns

`boolean`

- Returns a boolean.

#### Defined in

SceneTree/Parameters/Parameter.ts:247

___

### loadValue

▸ **loadValue**(`value`): `void`

The loadValue is used to change the value of a parameter, without triggering a
valueChanges, or setting the USER_EDITED state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The context value. |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:415

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

Utilities/EventEmitter.ts:97

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

Utilities/EventEmitter.ts:44

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

Utilities/EventEmitter.ts:82

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

The readBinary method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:431

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

Utilities/EventEmitter.ts:134

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:266

___

### setDirty

▸ **setDirty**(`index`): `boolean`

Dirties this Parameter so subsequent calls to `getValue` will cause an evaluation of its bound operators.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index of the operator |

#### Returns

`boolean`

- `true` if the Parameter was made dirty, else `false` if it was already dirty.

#### Defined in

SceneTree/Parameters/Parameter.ts:214

___

### setName

▸ **setName**(`name`): `void`

Sets the name of the current parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The base parameter name. |

#### Returns

`void`

- The instance itself.

#### Defined in

SceneTree/Parameters/Parameter.ts:73

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

Sets the owner item of the current parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner) | The ownerItem value. |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:97

___

### setValue

▸ **setValue**(`value`): `void`

Sets value of the parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value param. |

#### Returns

`void`

#### Defined in

SceneTree/Parameters/Parameter.ts:371

___

### toJSON

▸ `Abstract` **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `Record`<`string`, `any`\> |

#### Returns

`Record`<`string`, `any`\>

#### Implementation of

[ISerializable](../../Utilities/Utilities_ISerializable.ISerializable).[toJSON](../../Utilities/Utilities_ISerializable.ISerializable#tojson)

#### Defined in

SceneTree/Parameters/Parameter.ts:419

___

### unbindOperatorInput

▸ **unbindOperatorInput**(`operatorInput`): `void`

When an operator is being removed from reading from a Parameter, the Input is removed
This means the operator will no longer receive updates when the operator changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorInput` | [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\> | The output that we are unbinding from the Parameter |

#### Returns

`void`

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:147

___

### unbindOperatorOutput

▸ **unbindOperatorOutput**(`operatorOutput`): `number`

When an operator is unbinding from a parameter, it removes its self from the list maintained
by the parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorOutput` | [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\> | The output that we are unbinding from the Parameter |

#### Returns

`number`

- The return value.

#### Defined in

SceneTree/Parameters/Parameter.ts:181

