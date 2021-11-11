---
id: "SceneTree_Operators_Operator.Operator"
title: "Class: Operator"
sidebar_label: "Operator"
custom_edit_url: null
---



Class representing an operator.

## Hierarchy

- [`BaseItem`](../SceneTree_BaseItem.BaseItem)

  ↳ **`Operator`**

  ↳↳ [`CalcGlobalXfoOperator`](SceneTree_Operators_CalcGlobalXfoOperator.CalcGlobalXfoOperator)

  ↳↳ [`CuttingPlaneOperator`](SceneTree_Operators_CuttingPlaneOperator.CuttingPlaneOperator)

  ↳↳ [`GroupTransformXfoOperator`](SceneTree_Operators_GroupMemberXfoOperator.GroupTransformXfoOperator)

  ↳↳ [`GroupMemberXfoOperator`](SceneTree_Operators_GroupMemberXfoOperator.GroupMemberXfoOperator)

  ↳↳ [`RouterOperator`](SceneTree_Operators_RouterOperator.RouterOperator)

## Constructors

### constructor

• **new Operator**(`name?`)

Create an operator.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name value. |

#### Overrides

[BaseItem](../SceneTree_BaseItem.BaseItem).[constructor](../SceneTree_BaseItem.BaseItem#constructor)

#### Defined in

[SceneTree/Operators/Operator.ts:19](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L19)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__id](../SceneTree_BaseItem.BaseItem#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_inputs

• **\_\_inputs**: `Map`<`string`, [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)\>

#### Defined in

[SceneTree/Operators/Operator.ts:13](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L13)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__metaData](../SceneTree_BaseItem.BaseItem#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__name](../SceneTree_BaseItem.BaseItem#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L34)

___

### \_\_outputs

• **\_\_outputs**: `Map`<`string`, [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)\>

#### Defined in

[SceneTree/Operators/Operator.ts:14](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L14)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner)

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__ownerItem](../SceneTree_BaseItem.BaseItem#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__path](../SceneTree_BaseItem.BaseItem#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__selectable](../SceneTree_BaseItem.BaseItem#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[__selected](../SceneTree_BaseItem.BaseItem#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L38)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[deprecatedParamMapping](../SceneTree_BaseItem.BaseItem#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L23)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[listeners](../SceneTree_BaseItem.BaseItem#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[paramEventListenerIDs](../SceneTree_BaseItem.BaseItem#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[paramMapping](../SceneTree_BaseItem.BaseItem#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[params](../SceneTree_BaseItem.BaseItem#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L22)

## Methods

### addInput

▸ **addInput**(`input`): [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)

The addInput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput) | The name of the input, or the input object |

#### Returns

[`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)

- The return value.

#### Defined in

[SceneTree/Operators/Operator.ts:53](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L53)

___

### addOutput

▸ **addOutput**(`output`): [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)

The addOutput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `output` | `string` \| [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput) | The name of the output, or the output object |

#### Returns

[`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)

- The return value.

#### Defined in

[SceneTree/Operators/Operator.ts:110](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L110)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[addParameter](../SceneTree_BaseItem.BaseItem#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L133)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[addParameterDeprecationMapping](../SceneTree_BaseItem.BaseItem#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L90)

___

### backPropagateValue

▸ **backPropagateValue**(`value`): `unknown`

When the value on a Parameter is modified by a user by calling 'setValue,
then if any operators are bound, the value of the Parameter cannot be modified
directly as it is the result of a computation. Instead, the Parameter calls
'backPropagateValue' on the Operator to cause the Operator to handle propagating
the value to one or more of its inputs.
to its inputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | The value param. |

#### Returns

`unknown`

- The modified value.

#### Defined in

[SceneTree/Operators/Operator.ts:183](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L183)

___

### clone

▸ **clone**(`context?`): `void`

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[clone](../SceneTree_BaseItem.BaseItem#clone)

#### Defined in

[SceneTree/BaseItem.ts:317](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L317)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

When a BaseItem is cloned, initially the constructor is
called to generate a new instance. This instance then copies
its values from the source using this method.
This method copies any relevant data from the source object to
ensure that it represents a valid clone.
Derived classes override this method to copy any relevant
data from the source object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | The BaseItem to copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[copyFrom](../SceneTree_BaseItem.BaseItem#copyfrom)

#### Defined in

[SceneTree/BaseItem.ts:333](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L333)

___

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[deleteMetadata](../SceneTree_BaseItem.BaseItem#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L261)

___

### detach

▸ **detach**(): `void`

The detach method.

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:254](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L254)

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[emit](../SceneTree_BaseItem.BaseItem#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L154)

___

### evaluate

▸ **evaluate**(): `void`

The evaluate method.
Computes the values of each of the outputs based on the values of the inputs
and the values of outputs with mode OP_READ_WRITE.
This method must be implemented by all Operators.

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:169](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L169)

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

#### Overrides

[BaseItem](../SceneTree_BaseItem.BaseItem).[fromJSON](../SceneTree_BaseItem.BaseItem#fromjson)

#### Defined in

[SceneTree/Operators/Operator.ts:219](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L219)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getClassName](../SceneTree_BaseItem.BaseItem#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[getId](../SceneTree_BaseItem.BaseItem#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

___

### getInput

▸ **getInput**(`name`): [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)

The getInput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)

- The return value.

#### Defined in

[SceneTree/Operators/Operator.ts:99](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L99)

___

### getInputByIndex

▸ **getInputByIndex**(`index`): `Record`<`string`, `any`\>

The getInputByIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Defined in

[SceneTree/Operators/Operator.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L90)

___

### getMetadata

▸ **getMetadata**(`key`): `Record`<`string`, `any`\>

Gets Item's meta-data value by passing the `key` string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value under which to check for metadata. |

#### Returns

`Record`<`string`, `any`\>

- Returns the metadata associated with the given key.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getMetadata](../SceneTree_BaseItem.BaseItem#getmetadata)

#### Defined in

[SceneTree/BaseItem.ts:232](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L232)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getName](../SceneTree_BaseItem.BaseItem#getname)

#### Defined in

[SceneTree/BaseItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L74)

___

### getNumInputs

▸ **getNumInputs**(): `number`

Getter for the number of inputs in this operator.

#### Returns

`number`

- Returns the number of inputs.

#### Defined in

[SceneTree/Operators/Operator.ts:81](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L81)

___

### getNumOutputs

▸ **getNumOutputs**(): `number`

Getter for the number of outputs in this operator.

#### Returns

`number`

- Returns the number of outputs.

#### Defined in

[SceneTree/Operators/Operator.ts:139](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L139)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getNumParameters](../SceneTree_BaseItem.BaseItem#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L39)

___

### getOutput

▸ **getOutput**(`name`): [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)

The getOutput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)

- The return value.

#### Defined in

[SceneTree/Operators/Operator.ts:157](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L157)

___

### getOutputByIndex

▸ **getOutputByIndex**(`index`): [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)

The getOutputByIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)

- The return value.

#### Defined in

[SceneTree/Operators/Operator.ts:148](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L148)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getOwner](../SceneTree_BaseItem.BaseItem#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L154)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getParameter](../SceneTree_BaseItem.BaseItem#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getParameterByIndex](../SceneTree_BaseItem.BaseItem#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L68)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getParameterIndex](../SceneTree_BaseItem.BaseItem#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getParameters](../SceneTree_BaseItem.BaseItem#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L48)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getPath](../SceneTree_BaseItem.BaseItem#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L111)

___

### getSelectable

▸ **getSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getSelectable](../SceneTree_BaseItem.BaseItem#getselectable)

#### Defined in

[SceneTree/BaseItem.ts:183](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L183)

___

### hasMetadata

▸ **hasMetadata**(`key`): `boolean`

Checks to see if there is metadata for a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value under which to check for metadata. |

#### Returns

`boolean`

- Returns `true` if metadata exists under the given key, otherwise returns `false`.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[hasMetadata](../SceneTree_BaseItem.BaseItem#hasmetadata)

#### Defined in

[SceneTree/BaseItem.ts:242](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L242)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[hasParameter](../SceneTree_BaseItem.BaseItem#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L78)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[insertParameter](../SceneTree_BaseItem.BaseItem#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L147)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[isSelected](../SceneTree_BaseItem.BaseItem#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L207)

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[off](../SceneTree_BaseItem.BaseItem#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L97)

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[on](../SceneTree_BaseItem.BaseItem#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[once](../SceneTree_BaseItem.BaseItem#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> |

#### Returns

`void`

#### Overrides

[BaseItem](../SceneTree_BaseItem.BaseItem).[parameterValueChanged](../SceneTree_BaseItem.BaseItem#parametervaluechanged)

#### Defined in

[SceneTree/Operators/Operator.ts:43](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L43)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[readBinary](../SceneTree_BaseItem.BaseItem#readbinary)

#### Defined in

[SceneTree/BaseItem.ts:298](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L298)

___

### reattach

▸ **reattach**(): `void`

The reattach method.

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:262](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L262)

___

### rebind

▸ **rebind**(): `void`

The rebind method.

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:270](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L270)

___

### removeInput

▸ **removeInput**(`input`): `void`

The removeInput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput) | The name of the input, or the input object |

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L68)

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

[BaseItem](../SceneTree_BaseItem.BaseItem).[removeListenerById](../SceneTree_BaseItem.BaseItem#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

___

### removeOutput

▸ **removeOutput**(`output`): `void`

The removeOutput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `output` | `string` \| [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput) | The name of the output, or the output object |

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:126](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L126)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[removeParameter](../SceneTree_BaseItem.BaseItem#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L174)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[replaceParameter](../SceneTree_BaseItem.BaseItem#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L196)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem) \| [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem) \| [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- The return value.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[resolvePath](../SceneTree_BaseItem.BaseItem#resolvepath)

#### Defined in

[SceneTree/BaseItem.ts:126](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L126)

___

### setDirty

▸ `Private` **setDirty**(): `void`

This method sets the state of the operator to dirty which propagates
to the outputs of this operator, and which may then propagate to other
operators. When the scene is cleaned, which usually is caused by rendering
then the chain of operators are cleaned by triggering evaluation.

#### Returns

`void`

#### Defined in

[SceneTree/Operators/Operator.ts:32](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L32)

___

### setMetadata

▸ **setMetadata**(`key`, `metaData`): `void`

Assigns metadata to a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value under which the metadata is is going to be saved. |
| `metaData` | `any` | The metaData value. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[setMetadata](../SceneTree_BaseItem.BaseItem#setmetadata)

#### Defined in

[SceneTree/BaseItem.ts:252](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L252)

___

### setName

▸ **setName**(`name`): `void`

Sets the name of the base item(Updates path).

**`emits`** `nameChanged` with `newName` and `oldName` data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The base item name. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[setName](../SceneTree_BaseItem.BaseItem#setname)

#### Defined in

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L84)

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

The setOwner method assigns a new owner to the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) \| [`Owner`](../SceneTree_Owner.Owner) | The new owner item. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[setOwner](../SceneTree_BaseItem.BaseItem#setowner)

#### Defined in

[SceneTree/BaseItem.ts:164](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L164)

___

### setSelectable

▸ **setSelectable**(`val`): `boolean`

Modifies the selectability of this item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `boolean` | A boolean indicating the selectability of the item. |

#### Returns

`boolean`

- Returns true if value changed.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[setSelectable](../SceneTree_BaseItem.BaseItem#setselectable)

#### Defined in

[SceneTree/BaseItem.ts:193](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L193)

___

### setSelected

▸ **setSelected**(`sel`): `void`

Changes the current state of the selection of this item.

**`emits`** `selectedChanged` with selected state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sel` | `boolean` | Boolean indicating the new selection state. |

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[setSelected](../SceneTree_BaseItem.BaseItem#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L217)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Overrides

[BaseItem](../SceneTree_BaseItem.BaseItem).[toJSON](../SceneTree_BaseItem.BaseItem#tojson)

#### Defined in

[SceneTree/Operators/Operator.ts:197](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Operators/Operator.ts#L197)

___

### toString

▸ **toString**(`context`): `string`

Converts object's JSON value and converts it to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- String of object's parameter list state.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[toString](../SceneTree_BaseItem.BaseItem#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:299](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L299)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[updatePath](../SceneTree_BaseItem.BaseItem#updatepath)

#### Defined in

[SceneTree/BaseItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L99)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[BaseItem](../SceneTree_BaseItem.BaseItem).[getNumBaseItems](../SceneTree_BaseItem.BaseItem#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L62)
