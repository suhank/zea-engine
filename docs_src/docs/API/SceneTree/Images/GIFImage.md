---
id: "SceneTree_Images_GIFImage.GIFImage"
title: "Class: GIFImage"
sidebar_label: "GIFImage"
custom_edit_url: null
---



Class representing a GIF image.

```
const image = new GIFImage()
image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.gif")
```

**Parameters**
* **StreamAtlasDesc:**
* **StreamAtlasIndex:**

**Events**
* **loaded:** Triggered when the gif data is loaded.

**File Types:** gif

## Hierarchy

- [`FileImage`](SceneTree_Images_FileImage.FileImage)

  ↳ **`GIFImage`**

## Constructors

### constructor

• **new GIFImage**(`name?`, `filePath?`, `params?`)

Create a GIF image.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name?` | `string` | `undefined` | The name value. |
| `filePath` | `string` | `''` | The filePath value. |
| `params` | `Object` | `{}` | The params value. |

#### Overrides

[FileImage](SceneTree_Images_FileImage.FileImage).[constructor](SceneTree_Images_FileImage.FileImage#constructor)

#### Defined in

[SceneTree/Images/GIFImage.ts:49](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L49)

## Properties

### \_\_data

• `Protected` **\_\_data**: `HTMLImageElement` = `null`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__data](SceneTree_Images_FileImage.FileImage#__data)

#### Defined in

[SceneTree/Images/FileImage.ts:14](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L14)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__id](SceneTree_Images_FileImage.FileImage#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__metaData](SceneTree_Images_FileImage.FileImage#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__name](SceneTree_Images_FileImage.FileImage#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__ownerItem](SceneTree_Images_FileImage.FileImage#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__path](SceneTree_Images_FileImage.FileImage#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L36)

___

### \_\_resourcePromise

• `Protected` **\_\_resourcePromise**: `any`

#### Defined in

[SceneTree/Images/GIFImage.ts:37](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L37)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__selectable](SceneTree_Images_FileImage.FileImage#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[__selected](SceneTree_Images_FileImage.FileImage#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L38)

___

### \_\_streamAtlas

• `Protected` **\_\_streamAtlas**: `any`

#### Defined in

[SceneTree/Images/GIFImage.ts:34](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L34)

___

### \_\_unpackedData

• `Protected` **\_\_unpackedData**: `any`

#### Defined in

[SceneTree/Images/GIFImage.ts:38](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L38)

___

### crossOrigin

• **crossOrigin**: `string`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[crossOrigin](SceneTree_Images_FileImage.FileImage#crossorigin)

#### Defined in

[SceneTree/Images/FileImage.ts:12](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L12)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[deprecatedParamMapping](SceneTree_Images_FileImage.FileImage#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L23)

___

### format

• **format**: `string` = `'RGB'`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[format](SceneTree_Images_FileImage.FileImage#format)

#### Defined in

[SceneTree/BaseImage.ts:14](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L14)

___

### height

• **height**: `number` = `0`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[height](SceneTree_Images_FileImage.FileImage#height)

#### Defined in

[SceneTree/BaseImage.ts:13](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L13)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[listeners](SceneTree_Images_FileImage.FileImage#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[loaded](SceneTree_Images_FileImage.FileImage#loaded)

#### Defined in

[SceneTree/BaseImage.ts:22](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L22)

___

### magFilter

• `Protected` **magFilter**: `string` = `'LINEAR'`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[magFilter](SceneTree_Images_FileImage.FileImage#magfilter)

#### Defined in

[SceneTree/BaseImage.ts:21](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L21)

___

### minFilter

• `Protected` **minFilter**: `string` = `'LINEAR'`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[minFilter](SceneTree_Images_FileImage.FileImage#minfilter)

#### Defined in

[SceneTree/BaseImage.ts:20](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L20)

___

### mipMapped

• **mipMapped**: `boolean` = `true`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[mipMapped](SceneTree_Images_FileImage.FileImage#mipmapped)

#### Defined in

[SceneTree/BaseImage.ts:16](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L16)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[paramEventListenerIDs](SceneTree_Images_FileImage.FileImage#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[paramMapping](SceneTree_Images_FileImage.FileImage#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[params](SceneTree_Images_FileImage.FileImage#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L22)

___

### play

• `Protected` **play**: `any`

#### Defined in

[SceneTree/Images/GIFImage.ts:35](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L35)

___

### stop

• `Protected` **stop**: `any`

#### Defined in

[SceneTree/Images/GIFImage.ts:36](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L36)

___

### streamAtlasDescParam

• **streamAtlasDescParam**: [`Vec4Parameter`](../Parameters/SceneTree_Parameters_Vec4Parameter.Vec4Parameter)

#### Defined in

[SceneTree/Images/GIFImage.ts:40](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L40)

___

### streamAtlasIndexParam

• **streamAtlasIndexParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

#### Defined in

[SceneTree/Images/GIFImage.ts:41](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L41)

___

### type

• **type**: `string` = `'UNSIGNED_BYTE'`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[type](SceneTree_Images_FileImage.FileImage#type)

#### Defined in

[SceneTree/BaseImage.ts:15](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L15)

___

### url

• **url**: `string`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[url](SceneTree_Images_FileImage.FileImage#url)

#### Defined in

[SceneTree/Images/FileImage.ts:13](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L13)

___

### width

• **width**: `number` = `0`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[width](SceneTree_Images_FileImage.FileImage#width)

#### Defined in

[SceneTree/BaseImage.ts:12](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L12)

___

### wrapS

• `Protected` **wrapS**: `string` = `'REPEAT'`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[wrapS](SceneTree_Images_FileImage.FileImage#wraps)

#### Defined in

[SceneTree/BaseImage.ts:18](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L18)

___

### wrapT

• `Protected` **wrapT**: `string` = `'REPEAT'`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[wrapT](SceneTree_Images_FileImage.FileImage#wrapt)

#### Defined in

[SceneTree/BaseImage.ts:19](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L19)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[addParameter](SceneTree_Images_FileImage.FileImage#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L133)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[addParameterDeprecationMapping](SceneTree_Images_FileImage.FileImage#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L90)

___

### clone

▸ **clone**(`context?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[clone](SceneTree_Images_FileImage.FileImage#clone)

#### Defined in

[SceneTree/BaseItem.ts:317](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L317)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[copyFrom](SceneTree_Images_FileImage.FileImage#copyfrom)

#### Defined in

[SceneTree/BaseItem.ts:333](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L333)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[deleteMetadata](SceneTree_Images_FileImage.FileImage#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L261)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[emit](SceneTree_Images_FileImage.FileImage#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[fromJSON](SceneTree_Images_FileImage.FileImage#fromjson)

#### Defined in

[SceneTree/Images/FileImage.ts:146](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L146)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getClassName](SceneTree_Images_FileImage.FileImage#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/BaseClass.ts#L33)

___

### getDOMElement

▸ **getDOMElement**(): `HTMLImageElement`

Returns the HTML DOM element used to load the image file.
Be

#### Returns

`HTMLImageElement`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getDOMElement](SceneTree_Images_FileImage.FileImage#getdomelement)

#### Defined in

[SceneTree/Images/FileImage.ts:51](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L51)

___

### getFrameDelay

▸ **getFrameDelay**(`index`): `number`

The getFrameDelay method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/Images/GIFImage.ts:92](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L92)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[getId](SceneTree_Images_FileImage.FileImage#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/BaseClass.ts#L25)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[getMetadata](SceneTree_Images_FileImage.FileImage#getmetadata)

#### Defined in

[SceneTree/BaseItem.ts:232](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L232)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getName](SceneTree_Images_FileImage.FileImage#getname)

#### Defined in

[SceneTree/BaseItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L74)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getNumParameters](SceneTree_Images_FileImage.FileImage#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L39)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getOwner](SceneTree_Images_FileImage.FileImage#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L154)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[getParameter](SceneTree_Images_FileImage.FileImage#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L100)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[getParameterByIndex](SceneTree_Images_FileImage.FileImage#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L68)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[getParameterIndex](SceneTree_Images_FileImage.FileImage#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getParameters](SceneTree_Images_FileImage.FileImage#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L48)

___

### getParams

▸ **getParams**(): `Record`<`string`, `any`\>

The getParams method.

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getParams](SceneTree_Images_FileImage.FileImage#getparams)

#### Defined in

[SceneTree/Images/FileImage.ts:122](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L122)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getPath](SceneTree_Images_FileImage.FileImage#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L111)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[hasMetadata](SceneTree_Images_FileImage.FileImage#hasmetadata)

#### Defined in

[SceneTree/BaseItem.ts:242](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L242)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[hasParameter](SceneTree_Images_FileImage.FileImage#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L78)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[insertParameter](SceneTree_Images_FileImage.FileImage#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L147)

___

### isLoaded

▸ `Private` **isLoaded**(): `boolean`

Returns true if loaded.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[isLoaded](SceneTree_Images_FileImage.FileImage#isloaded)

#### Defined in

[SceneTree/BaseImage.ts:48](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseImage.ts#L48)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[isSelectable](SceneTree_Images_FileImage.FileImage#isselectable)

#### Defined in

[SceneTree/BaseItem.ts:183](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L183)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[isSelected](SceneTree_Images_FileImage.FileImage#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L207)

___

### load

▸ **load**(`url`, `format?`): `Promise`<`void`\>

Uses the specify url to load an Image element and adds it to the data library.
Sets the state of the current object.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `undefined` | The url value. |
| `format` | `string` | `'RGB'` | The format value. |

#### Returns

`Promise`<`void`\>

Returns a promise that resolves once the image is loaded.

#### Overrides

[FileImage](SceneTree_Images_FileImage.FileImage).[load](SceneTree_Images_FileImage.FileImage#load)

#### Defined in

[SceneTree/Images/GIFImage.ts:105](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/GIFImage.ts#L105)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[off](SceneTree_Images_FileImage.FileImage#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/EventEmitter.ts#L97)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[on](SceneTree_Images_FileImage.FileImage#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/EventEmitter.ts#L44)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[once](SceneTree_Images_FileImage.FileImage#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/EventEmitter.ts#L82)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[parameterValueChanged](SceneTree_Images_FileImage.FileImage#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L122)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

The readBinary method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader param. |
| `context` | `Record`<`string`, `any`\> | The context param. |

#### Returns

`void`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[readBinary](SceneTree_Images_FileImage.FileImage#readbinary)

#### Defined in

[SceneTree/Images/FileImage.ts:153](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L153)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[removeListenerById](SceneTree_Images_FileImage.FileImage#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/Utilities/EventEmitter.ts#L134)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[removeParameter](SceneTree_Images_FileImage.FileImage#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L174)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[replaceParameter](SceneTree_Images_FileImage.FileImage#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L196)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[resolvePath](SceneTree_Images_FileImage.FileImage#resolvepath)

#### Defined in

[SceneTree/BaseItem.ts:126](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L126)

___

### setCrossOrigin

▸ **setCrossOrigin**(`crossOrigin`): `void`

Defines how to handle cross origin request.

**Possible values:**
* **anonymous** - CORS requests for this element will have the credentials flag set to 'same-origin'.
* **use-credentials** - CORS requests for this element will have the credentials flag set to 'include'.
* **""** - Setting the attribute name to an empty value, like crossorigin or crossorigin="", is the same as anonymous.

**`default`** anonymous

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `crossOrigin` | `string` | The crossOrigin value. |

#### Returns

`void`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[setCrossOrigin](SceneTree_Images_FileImage.FileImage#setcrossorigin)

#### Defined in

[SceneTree/Images/FileImage.ts:42](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L42)

___

### setImageURL

▸ **setImageURL**(`url`, `format?`): `void`

Loads in Image file using the given URL

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `url` | `string` | `undefined` | The url value. |
| `format` | `string` | `'RGB'` | The format value. Can be 'RGB' or 'RGBA' for files that contain an alpha channel. This will cause objects to be drawn using the Transparent pass. |

#### Returns

`void`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[setImageURL](SceneTree_Images_FileImage.FileImage#setimageurl)

#### Defined in

[SceneTree/Images/FileImage.ts:114](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L114)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[setMetadata](SceneTree_Images_FileImage.FileImage#setmetadata)

#### Defined in

[SceneTree/BaseItem.ts:252](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L252)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[setName](SceneTree_Images_FileImage.FileImage#setname)

#### Defined in

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L84)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[setOwner](SceneTree_Images_FileImage.FileImage#setowner)

#### Defined in

[SceneTree/BaseItem.ts:164](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L164)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[setSelectable](SceneTree_Images_FileImage.FileImage#setselectable)

#### Defined in

[SceneTree/BaseItem.ts:193](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L193)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[setSelected](SceneTree_Images_FileImage.FileImage#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L217)

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

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[toJSON](SceneTree_Images_FileImage.FileImage#tojson)

#### Defined in

[SceneTree/Images/FileImage.ts:137](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/Images/FileImage.ts#L137)

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

[FileImage](SceneTree_Images_FileImage.FileImage).[toString](SceneTree_Images_FileImage.FileImage#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/ParameterOwner.ts#L301)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[updatePath](SceneTree_Images_FileImage.FileImage#updatepath)

#### Defined in

[SceneTree/BaseItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L99)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[FileImage](SceneTree_Images_FileImage.FileImage).[getNumBaseItems](SceneTree_Images_FileImage.FileImage#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/8dadca029/src/SceneTree/BaseItem.ts#L62)

