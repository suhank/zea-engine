---
id: "SceneTree_Parameters_TreeItemParameter.TreeItemParameter"
title: "Class: TreeItemParameter"
sidebar_label: "TreeItemParameter"
custom_edit_url: null
---



Represents a specific type of parameter, that only stores `TreeItem` values.

i.e.:
```javascript
const treeItem = new TreeItem('tree1')
const treeItemParam = new TreeItemParameter('MyTreeItem', treeItem)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(treeItemParam)
```

**Events**
* **treeItemGlobalXfoChanged:** Triggered when computed world Xfo of parameter's `TreeItem` changes.
* **valueChanged:** Triggered when parameter's value changes.

## Hierarchy

- [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<[`TreeItem`](../SceneTree_TreeItem.TreeItem) \| `undefined`\>

  ↳ **`TreeItemParameter`**

## Constructors

### constructor

• **new TreeItemParameter**(`name?`, `filterFn?`)

Create a tree item parameter.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the tree item parameter. |
| `filterFn?` | (...`args`: []) => `unknown` | `undefined` | The filterFn value. |

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[constructor](SceneTree_Parameters_Parameter.Parameter#constructor)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:36](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L36)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[__id](SceneTree_Parameters_Parameter.Parameter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/BaseClass.ts#L11)

___

### \_\_value

• **\_\_value**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[__value](SceneTree_Parameters_Parameter.Parameter#__value)

#### Defined in

[SceneTree/Parameters/Parameter.ts:25](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L25)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[boundInputs](SceneTree_Parameters_Parameter.Parameter#boundinputs)

#### Defined in

[SceneTree/Parameters/Parameter.ts:19](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L19)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[boundOutputs](SceneTree_Parameters_Parameter.Parameter#boundoutputs)

#### Defined in

[SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L20)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[cleaning](SceneTree_Parameters_Parameter.Parameter#cleaning)

#### Defined in

[SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L21)

___

### dataType

• `Protected` **dataType**: `string`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[dataType](SceneTree_Parameters_Parameter.Parameter#datatype)

#### Defined in

[SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L26)

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[dirty](SceneTree_Parameters_Parameter.Parameter#dirty)

#### Defined in

[SceneTree/Parameters/Parameter.ts:18](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L18)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[dirtyOpIndex](SceneTree_Parameters_Parameter.Parameter#dirtyopindex)

#### Defined in

[SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L22)

___

### filterFn

• `Protected` `Optional` **filterFn**: (...`args`: `any`[]) => `unknown`

#### Type declaration

▸ (...`args`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`unknown`

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L27)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[firstOP_WRITE](SceneTree_Parameters_Parameter.Parameter#firstop_write)

#### Defined in

[SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L23)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:29](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L29)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[listeners](SceneTree_Parameters_Parameter.Parameter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L26)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[name](SceneTree_Parameters_Parameter.Parameter#name)

#### Defined in

[SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L24)

___

### owner

• `Protected` **owner**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L28)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[ownerItem](SceneTree_Parameters_Parameter.Parameter#owneritem)

#### Defined in

[SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L27)

## Accessors

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Inherited from

Parameter.value

#### Defined in

[SceneTree/Parameters/Parameter.ts:405](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L405)

• `set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Inherited from

Parameter.value

#### Defined in

[SceneTree/Parameters/Parameter.ts:409](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L409)

## Methods

### \_clean

▸ **_clean**(`index`): `void`

Cleans the parameter up tp the index of the specified index of the bound OperatorOutput

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[_clean](SceneTree_Parameters_Parameter.Parameter#_clean)

#### Defined in

[SceneTree/Parameters/Parameter.ts:334](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L334)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[bindOperatorInput](SceneTree_Parameters_Parameter.Parameter#bindoperatorinput)

#### Defined in

[SceneTree/Parameters/Parameter.ts:136](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L136)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[bindOperatorOutput](SceneTree_Parameters_Parameter.Parameter#bindoperatoroutput)

#### Defined in

[SceneTree/Parameters/Parameter.ts:161](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L161)

___

### clone

▸ **clone**(`context?`): [`TreeItemParameter`](SceneTree_Parameters_TreeItemParameter.TreeItemParameter)

The clone method constructs a new tree item parameter, copies its values
from this parameter and returns it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> |

#### Returns

[`TreeItemParameter`](SceneTree_Parameters_TreeItemParameter.TreeItemParameter)

- Returns a new tree item parameter.

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[clone](SceneTree_Parameters_Parameter.Parameter#clone)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:150](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L150)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[destroy](SceneTree_Parameters_Parameter.Parameter#destroy)

#### Defined in

[SceneTree/Parameters/Parameter.ts:447](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L447)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[emit](SceneTree_Parameters_Parameter.Parameter#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L154)

___

### emitTreeItemGlobalXfoChanged

▸ `Private` **emitTreeItemGlobalXfoChanged**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> |

#### Returns

`void`

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:42](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L42)

___

### fromJSON

▸ **fromJSON**(`j`, `context`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `unknown`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[fromJSON](SceneTree_Parameters_Parameter.Parameter#fromjson)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:125](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L125)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getClassName](SceneTree_Parameters_Parameter.Parameter#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/BaseClass.ts#L33)

___

### getDataType

▸ **getDataType**(): `string`

Returns parameter's data type.

#### Returns

`string`

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getDataType](SceneTree_Parameters_Parameter.Parameter#getdatatype)

#### Defined in

[SceneTree/Parameters/Parameter.ts:120](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L120)

___

### getDirtyBindingIndex

▸ **getDirtyBindingIndex**(): `number`

Returns the index of the first 'dirty' binding in the stack. This will be the index of the
first operator that will evaluate when the parameter needs to be cleaned.

#### Returns

`number`

- The index of the dirty binding in the binding stack.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getDirtyBindingIndex](SceneTree_Parameters_Parameter.Parameter#getdirtybindingindex)

#### Defined in

[SceneTree/Parameters/Parameter.ts:263](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L263)

___

### getFilterFn

▸ **getFilterFn**(): (...`args`: `any`[]) => `unknown`

The getFilterFn method.

#### Returns

`fn`

- The return value.

▸ (...`args`): `unknown`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`unknown`

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:76](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L76)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getId](SceneTree_Parameters_Parameter.Parameter#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/BaseClass.ts#L25)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getName](SceneTree_Parameters_Parameter.Parameter#getname)

#### Defined in

[SceneTree/Parameters/Parameter.ts:63](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L63)

___

### getOwner

▸ **getOwner**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns parameter value's owner `TreeItem`.

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The return value.

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getOwner](SceneTree_Parameters_Parameter.Parameter#getowner)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:60](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L60)

___

### getPath

▸ **getPath**(): `string`[]

Returns the parameter's path as an array of strings.
Includes owner's path in case it is owned by a `ParameterOwner`.

#### Returns

`string`[]

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getPath](SceneTree_Parameters_Parameter.Parameter#getpath)

#### Defined in

[SceneTree/Parameters/Parameter.ts:107](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L107)

___

### getValue

▸ **getValue**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns parameter's value.

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getValue](SceneTree_Parameters_Parameter.Parameter#getvalue)

#### Defined in

[SceneTree/Parameters/Parameter.ts:365](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L365)

___

### getValueFromOp

▸ **getValueFromOp**(`index`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getValueFromOp](SceneTree_Parameters_Parameter.Parameter#getvaluefromop)

#### Defined in

[SceneTree/Parameters/Parameter.ts:319](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L319)

___

### isDirty

▸ **isDirty**(): `boolean`

Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[isDirty](SceneTree_Parameters_Parameter.Parameter#isdirty)

#### Defined in

[SceneTree/Parameters/Parameter.ts:253](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L253)

___

### loadValue

▸ **loadValue**(`value`): `void`

The loadValue is used to change the value of a parameter, without triggering a
valueChanges, or setting the USER_EDITED state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The context value. |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[loadValue](SceneTree_Parameters_Parameter.Parameter#loadvalue)

#### Defined in

[SceneTree/Parameters/Parameter.ts:421](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L421)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[off](SceneTree_Parameters_Parameter.Parameter#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L97)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[on](SceneTree_Parameters_Parameter.Parameter#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L44)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[once](SceneTree_Parameters_Parameter.Parameter#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L82)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[readBinary](SceneTree_Parameters_Parameter.Parameter#readbinary)

#### Defined in

[SceneTree/Parameters/Parameter.ts:437](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L437)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[removeListenerById](SceneTree_Parameters_Parameter.Parameter#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L134)

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setCleanFromOp](SceneTree_Parameters_Parameter.Parameter#setcleanfromop)

#### Defined in

[SceneTree/Parameters/Parameter.ts:272](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L272)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setDirty](SceneTree_Parameters_Parameter.Parameter#setdirty)

#### Defined in

[SceneTree/Parameters/Parameter.ts:219](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L219)

___

### setFilterFn

▸ **setFilterFn**(`filterFn`): `void`

The setFilterFn method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterFn` | (...`args`: []) => `unknown` | The filterFn value. |

#### Returns

`void`

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:68](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L68)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setName](SceneTree_Parameters_Parameter.Parameter#setname)

#### Defined in

[SceneTree/Parameters/Parameter.ts:73](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L73)

___

### setOwner

▸ **setOwner**(`owner`): `void`

Sets parameter value's owner `TreeItem`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The owner value. |

#### Returns

`void`

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setOwner](SceneTree_Parameters_Parameter.Parameter#setowner)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:51](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L51)

___

### setValue

▸ **setValue**(`treeItem`): `void`

Sets parameter's `TreeItem` value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The treeItem value |

#### Returns

`void`

- The return value.

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setValue](SceneTree_Parameters_Parameter.Parameter#setvalue)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:86](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L86)

___

### toJSON

▸ **toJSON**(`context`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[toJSON](SceneTree_Parameters_Parameter.Parameter#tojson)

#### Defined in

[SceneTree/Parameters/TreeItemParameter.ts:113](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/TreeItemParameter.ts#L113)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[unbindOperatorInput](SceneTree_Parameters_Parameter.Parameter#unbindoperatorinput)

#### Defined in

[SceneTree/Parameters/Parameter.ts:147](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L147)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[unbindOperatorOutput](SceneTree_Parameters_Parameter.Parameter#unbindoperatoroutput)

#### Defined in

[SceneTree/Parameters/Parameter.ts:185](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/Parameters/Parameter.ts#L185)

