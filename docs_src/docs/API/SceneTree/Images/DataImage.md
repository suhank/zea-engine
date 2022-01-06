---
id: "SceneTree_Images_DataImage.DataImage"
title: "Class: DataImage"
sidebar_label: "DataImage"
custom_edit_url: null
---



Represents a BaseImage with the ability to load data.

**Events**
* **loaded:** Triggered when the data is loaded.
* **updated:** Triggered when the data is updated.

## Hierarchy

- [`BaseImage`](../SceneTree_BaseImage.BaseImage)

  ↳ **`DataImage`**

  ↳↳ [`Label`](SceneTree_Images_Label.Label)

## Constructors

### constructor

• **new DataImage**(`name?`)

Create a data image.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name value. |

#### Overrides

[BaseImage](../SceneTree_BaseImage.BaseImage).[constructor](../SceneTree_BaseImage.BaseImage#constructor)

#### Defined in

[src/SceneTree/Images/DataImage.ts:20](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/Images/DataImage.ts#L20)

## Properties

### \_\_data

• `Protected` **\_\_data**: `Uint8Array` \| `ImageData`

#### Defined in

[src/SceneTree/Images/DataImage.ts:15](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/Images/DataImage.ts#L15)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__id](../SceneTree_BaseImage.BaseImage#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__metaData](../SceneTree_BaseImage.BaseImage#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__name](../SceneTree_BaseImage.BaseImage#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__ownerItem](../SceneTree_BaseImage.BaseImage#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__path](../SceneTree_BaseImage.BaseImage#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__selectable](../SceneTree_BaseImage.BaseImage#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[__selected](../SceneTree_BaseImage.BaseImage#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L40)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[deprecatedParamMapping](../SceneTree_BaseImage.BaseImage#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L25)

___

### format

• **format**: `string` = `'RGB'`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[format](../SceneTree_BaseImage.BaseImage#format)

#### Defined in

[src/SceneTree/BaseImage.ts:31](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L31)

___

### height

• **height**: `number` = `0`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[height](../SceneTree_BaseImage.BaseImage#height)

#### Defined in

[src/SceneTree/BaseImage.ts:30](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L30)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[listeners](../SceneTree_BaseImage.BaseImage#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[loaded](../SceneTree_BaseImage.BaseImage#loaded)

#### Defined in

[src/SceneTree/BaseImage.ts:33](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L33)

___

### magFilter

• **magFilter**: `string` = `'LINEAR'`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[magFilter](../SceneTree_BaseImage.BaseImage#magfilter)

#### Defined in

[src/SceneTree/BaseImage.ts:38](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L38)

___

### minFilter

• **minFilter**: `string` = `'LINEAR'`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[minFilter](../SceneTree_BaseImage.BaseImage#minfilter)

#### Defined in

[src/SceneTree/BaseImage.ts:37](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L37)

___

### mipMapped

• **mipMapped**: `boolean` = `true`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[mipMapped](../SceneTree_BaseImage.BaseImage#mipmapped)

#### Defined in

[src/SceneTree/BaseImage.ts:34](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L34)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[paramEventListenerIDs](../SceneTree_BaseImage.BaseImage#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[paramMapping](../SceneTree_BaseImage.BaseImage#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[params](../SceneTree_BaseImage.BaseImage#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L24)

___

### type

• **type**: `string` = `'UNSIGNED_BYTE'`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[type](../SceneTree_BaseImage.BaseImage#type)

#### Defined in

[src/SceneTree/BaseImage.ts:32](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L32)

___

### width

• **width**: `number` = `0`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[width](../SceneTree_BaseImage.BaseImage#width)

#### Defined in

[src/SceneTree/BaseImage.ts:29](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L29)

___

### wrapS

• **wrapS**: `string` = `'REPEAT'`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[wrapS](../SceneTree_BaseImage.BaseImage#wraps)

#### Defined in

[src/SceneTree/BaseImage.ts:35](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L35)

___

### wrapT

• **wrapT**: `string` = `'REPEAT'`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[wrapT](../SceneTree_BaseImage.BaseImage#wrapt)

#### Defined in

[src/SceneTree/BaseImage.ts:36](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseImage.ts#L36)

## Methods

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[addParameter](../SceneTree_BaseImage.BaseImage#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L135)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[addParameterDeprecationMapping](../SceneTree_BaseImage.BaseImage#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L92)

___

### clone

▸ **clone**(`context?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[clone](../SceneTree_BaseImage.BaseImage#clone)

#### Defined in

[src/SceneTree/BaseItem.ts:319](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L319)

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
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[copyFrom](../SceneTree_BaseImage.BaseImage#copyfrom)

#### Defined in

[src/SceneTree/BaseItem.ts:335](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L335)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[deleteMetadata](../SceneTree_BaseImage.BaseImage#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L263)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[emit](../SceneTree_BaseImage.BaseImage#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L154)

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

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[fromJSON](../SceneTree_BaseImage.BaseImage#fromjson)

#### Defined in

[src/SceneTree/BaseItem.ts:289](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L289)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getClassName](../SceneTree_BaseImage.BaseImage#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L33)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[getId](../SceneTree_BaseImage.BaseImage#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L25)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[getMetadata](../SceneTree_BaseImage.BaseImage#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getName](../SceneTree_BaseImage.BaseImage#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L76)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getNumParameters](../SceneTree_BaseImage.BaseImage#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getOwner](../SceneTree_BaseImage.BaseImage#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L156)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[getParameter](../SceneTree_BaseImage.BaseImage#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L102)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[getParameterByIndex](../SceneTree_BaseImage.BaseImage#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L70)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[getParameterIndex](../SceneTree_BaseImage.BaseImage#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getParameters](../SceneTree_BaseImage.BaseImage#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L50)

___

### getParams

▸ **getParams**(): [`ImageParams`](../SceneTree_BaseImage.ImageParams)

Returns all parameters and class state values(Including data).

#### Returns

[`ImageParams`](../SceneTree_BaseImage.ImageParams)

- The return value.

#### Overrides

[BaseImage](../SceneTree_BaseImage.BaseImage).[getParams](../SceneTree_BaseImage.BaseImage#getparams)

#### Defined in

[src/SceneTree/Images/DataImage.ts:70](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/Images/DataImage.ts#L70)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getPath](../SceneTree_BaseImage.BaseImage#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L113)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[hasMetadata](../SceneTree_BaseImage.BaseImage#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L244)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[hasParameter](../SceneTree_BaseImage.BaseImage#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L80)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[insertParameter](../SceneTree_BaseImage.BaseImage#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L149)

___

### isLoaded

▸ **isLoaded**(): `boolean`

Returns an indicator of current item's loaded state.

#### Returns

`boolean`

- `true` if bytes data is fully loaded, `false` otherwise.

#### Overrides

[BaseImage](../SceneTree_BaseImage.BaseImage).[isLoaded](../SceneTree_BaseImage.BaseImage#isloaded)

#### Defined in

[src/SceneTree/Images/DataImage.ts:33](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/Images/DataImage.ts#L33)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[isSelectable](../SceneTree_BaseImage.BaseImage#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[isSelected](../SceneTree_BaseImage.BaseImage#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L209)

___

### isStream

▸ **isStream**(): `boolean`

Images are static content, so the value for this method is always going to be `false`

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/Images/DataImage.ts:43](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/Images/DataImage.ts#L43)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[off](../SceneTree_BaseImage.BaseImage#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L97)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[on](../SceneTree_BaseImage.BaseImage#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L44)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[once](../SceneTree_BaseImage.BaseImage#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L82)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[parameterValueChanged](../SceneTree_BaseImage.BaseImage#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L124)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[readBinary](../SceneTree_BaseImage.BaseImage#readbinary)

#### Defined in

[src/SceneTree/BaseItem.ts:300](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L300)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[removeListenerById](../SceneTree_BaseImage.BaseImage#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L134)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[removeParameter](../SceneTree_BaseImage.BaseImage#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L176)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[replaceParameter](../SceneTree_BaseImage.BaseImage#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L198)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[resolvePath](../SceneTree_BaseImage.BaseImage#resolvepath)

#### Defined in

[src/SceneTree/BaseItem.ts:128](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L128)

___

### setData

▸ **setData**(`width`, `height`, `data`): `void`

Sets Image's data by recieving an bytes array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The width value. |
| `height` | `number` | The height value. |
| `data` | `Uint8Array` | The data value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/DataImage.ts:54](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/Images/DataImage.ts#L54)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[setMetadata](../SceneTree_BaseImage.BaseImage#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L254)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[setName](../SceneTree_BaseImage.BaseImage#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L86)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[setOwner](../SceneTree_BaseImage.BaseImage#setowner)

#### Defined in

[src/SceneTree/BaseItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L166)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[setSelectable](../SceneTree_BaseImage.BaseImage#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L195)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[setSelected](../SceneTree_BaseImage.BaseImage#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L219)

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

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[toJSON](../SceneTree_BaseImage.BaseImage#tojson)

#### Defined in

[src/SceneTree/BaseItem.ts:276](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L276)

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

[BaseImage](../SceneTree_BaseImage.BaseImage).[toString](../SceneTree_BaseImage.BaseImage#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L303)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[updatePath](../SceneTree_BaseImage.BaseImage#updatepath)

#### Defined in

[src/SceneTree/BaseItem.ts:101](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L101)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[BaseImage](../SceneTree_BaseImage.BaseImage).[getNumBaseItems](../SceneTree_BaseImage.BaseImage#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L64)

