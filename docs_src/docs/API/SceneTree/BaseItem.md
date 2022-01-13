---
id: "SceneTree_BaseItem.BaseItem"
title: "Class: BaseItem"
sidebar_label: "BaseItem"
custom_edit_url: null
---



Base class for Items in the scene. It can be parameterized and can emit events.

**Events**
* **nameChanged:** Emitted every time the Item's name is change. mostly in `setName` method.
* **selectedChanged:** Emitted `selected` status changes, mostly in `setSelected` method.

## Hierarchy

- [`ParameterOwner`](SceneTree_ParameterOwner.ParameterOwner)

  ↳ **`BaseItem`**

  ↳↳ [`GLShader`](../Renderer/Renderer_GLShader.GLShader)

  ↳↳ [`BaseImage`](SceneTree_BaseImage.BaseImage)

  ↳↳ [`Material`](SceneTree_Material.Material)

  ↳↳ [`Operator`](Operators/SceneTree_Operators_Operator.Operator)

  ↳↳ [`TreeItem`](SceneTree_TreeItem.TreeItem)

## Implements

- [`Owner`](SceneTree_Owner.Owner)

## Constructors

### constructor

• **new BaseItem**(`name?`)

Create a base item by defining its name.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the base item. |

#### Overrides

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[constructor](SceneTree_ParameterOwner.ParameterOwner#constructor)

#### Defined in

[src/SceneTree/BaseItem.ts:48](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L48)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[__id](SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](SceneTree_Owner.Owner) = `undefined`

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L40)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L25)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[listeners](SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[paramMapping](SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[params](SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L24)

## Methods

### addParameter

▸ **addParameter**(`param`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[addParameter](SceneTree_ParameterOwner.ParameterOwner#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L135)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[addParameterDeprecationMapping](SceneTree_ParameterOwner.ParameterOwner#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L92)

___

### clone

▸ **clone**(`context?`): [`BaseItem`](SceneTree_BaseItem.BaseItem)

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`CloneContext`](SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem)

#### Defined in

[src/SceneTree/BaseItem.ts:319](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L319)

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
| `src` | [`BaseItem`](SceneTree_BaseItem.BaseItem) | The BaseItem to copy from. |
| `context?` | [`CloneContext`](SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Overrides

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[copyFrom](SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[src/SceneTree/BaseItem.ts:335](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L335)

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

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L263)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[emit](SceneTree_ParameterOwner.ParameterOwner#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

Decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[fromJSON](SceneTree_ParameterOwner.ParameterOwner#fromjson)

#### Defined in

[src/SceneTree/BaseItem.ts:289](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L289)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getClassName](SceneTree_ParameterOwner.ParameterOwner#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/BaseClass.ts#L33)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getId](SceneTree_ParameterOwner.ParameterOwner#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/BaseClass.ts#L25)

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

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L76)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getNumParameters](SceneTree_ParameterOwner.ParameterOwner#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](SceneTree_Owner.Owner)

- Returns the current owner.

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L156)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getParameter](SceneTree_ParameterOwner.ParameterOwner#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getParameterByIndex](SceneTree_ParameterOwner.ParameterOwner#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L70)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getParameterIndex](SceneTree_ParameterOwner.ParameterOwner#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[getParameters](SceneTree_ParameterOwner.ParameterOwner#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L50)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Implementation of

[Owner](SceneTree_Owner.Owner).[getPath](SceneTree_Owner.Owner#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L113)

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

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L244)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[hasParameter](SceneTree_ParameterOwner.ParameterOwner#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L80)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[insertParameter](SceneTree_ParameterOwner.ParameterOwner#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L149)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L209)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[off](SceneTree_ParameterOwner.ParameterOwner#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L97)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[on](SceneTree_ParameterOwner.ParameterOwner#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[once](SceneTree_ParameterOwner.ParameterOwner#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[parameterValueChanged](SceneTree_ParameterOwner.ParameterOwner#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L124)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Overrides

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[readBinary](SceneTree_ParameterOwner.ParameterOwner#readbinary)

#### Defined in

[src/SceneTree/BaseItem.ts:300](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L300)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[removeListenerById](SceneTree_ParameterOwner.ParameterOwner#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Utilities/EventEmitter.ts#L134)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[removeParameter](SceneTree_ParameterOwner.ParameterOwner#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[replaceParameter](SceneTree_ParameterOwner.ParameterOwner#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L198)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`): [`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- The return value.

#### Implementation of

[Owner](SceneTree_Owner.Owner).[resolvePath](SceneTree_Owner.Owner#resolvepath)

#### Defined in

[src/SceneTree/BaseItem.ts:128](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L128)

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

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L254)

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

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L86)

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

The setOwner method assigns a new owner to the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Owner`](SceneTree_Owner.Owner) | The new owner item. |

#### Returns

`void`

#### Defined in

[src/SceneTree/BaseItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L166)

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

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L195)

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

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L219)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

Encodes the current object as a json object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Overrides

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[toJSON](SceneTree_ParameterOwner.ParameterOwner#tojson)

#### Defined in

[src/SceneTree/BaseItem.ts:276](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L276)

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

[ParameterOwner](SceneTree_ParameterOwner.ParameterOwner).[toString](SceneTree_ParameterOwner.ParameterOwner#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/ParameterOwner.ts#L303)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Defined in

[src/SceneTree/BaseItem.ts:101](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L101)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/SceneTree/BaseItem.ts#L64)

