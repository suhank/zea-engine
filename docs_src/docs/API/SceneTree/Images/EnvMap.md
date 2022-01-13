---
id: "SceneTree_Images_EnvMap.EnvMap"
title: "Class: EnvMap"
sidebar_label: "EnvMap"
custom_edit_url: null
---



An EnvMap can load High Dynamic Range environment map images, necessary for high quality PBR lighting.

**Parameters**
* **HeadLightMode(`BooleanParameter`):** Enables Headlight mode so that the environment lighting is aligned with the camera.
With Headlight mode on, the top of the env map is aligned with the direction of the camera, so a the view is generally well lit.

## Hierarchy

- [`HDRImage`](SceneTree_Images_HDRImage.HDRImage)

  ↳ **`EnvMap`**

## Constructors

### constructor

• **new EnvMap**(`name?`, `params?`)

Create an env map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name value. |
| `params` | `Record`<`string`, `any`\> | The params value. |

#### Overrides

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[constructor](SceneTree_Images_HDRImage.HDRImage#constructor)

#### Defined in

[src/SceneTree/Images/EnvMap.ts:29](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L29)

## Properties

### \_\_data

• `Protected` **\_\_data**: `HDRImageData`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__data](SceneTree_Images_HDRImage.HDRImage#__data)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:24](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L24)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__id](SceneTree_Images_HDRImage.HDRImage#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__metaData](SceneTree_Images_HDRImage.HDRImage#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__name](SceneTree_Images_HDRImage.HDRImage#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__ownerItem](SceneTree_Images_HDRImage.HDRImage#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__path](SceneTree_Images_HDRImage.HDRImage#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__selectable](SceneTree_Images_HDRImage.HDRImage#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__selected](SceneTree_Images_HDRImage.HDRImage#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L40)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[deprecatedParamMapping](SceneTree_Images_HDRImage.HDRImage#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L25)

___

### exposure

• **exposure**: `number` = `1.0`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[exposure](SceneTree_Images_HDRImage.HDRImage#exposure)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:22](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L22)

___

### format

• **format**: `string` = `'RGB'`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[format](SceneTree_Images_HDRImage.HDRImage#format)

#### Defined in

[src/SceneTree/BaseImage.ts:31](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L31)

___

### hdrTint

• **hdrTint**: [`Color`](../../Math/Math_Color.Color)

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[hdrTint](SceneTree_Images_HDRImage.HDRImage#hdrtint)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:23](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L23)

___

### headlightModeParam

• **headlightModeParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Defined in

[src/SceneTree/Images/EnvMap.ts:23](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L23)

___

### height

• **height**: `number` = `0`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[height](SceneTree_Images_HDRImage.HDRImage#height)

#### Defined in

[src/SceneTree/BaseImage.ts:30](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L30)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[listeners](SceneTree_Images_HDRImage.HDRImage#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[loaded](SceneTree_Images_HDRImage.HDRImage#loaded)

#### Defined in

[src/SceneTree/BaseImage.ts:33](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L33)

___

### luminanceData

• `Protected` **luminanceData**: `any`

#### Defined in

[src/SceneTree/Images/EnvMap.ts:21](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L21)

___

### magFilter

• **magFilter**: `string` = `'LINEAR'`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[magFilter](SceneTree_Images_HDRImage.HDRImage#magfilter)

#### Defined in

[src/SceneTree/BaseImage.ts:38](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L38)

___

### minFilter

• **minFilter**: `string` = `'LINEAR'`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[minFilter](SceneTree_Images_HDRImage.HDRImage#minfilter)

#### Defined in

[src/SceneTree/BaseImage.ts:37](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L37)

___

### mipMapped

• **mipMapped**: `boolean` = `true`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[mipMapped](SceneTree_Images_HDRImage.HDRImage#mipmapped)

#### Defined in

[src/SceneTree/BaseImage.ts:34](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L34)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[paramEventListenerIDs](SceneTree_Images_HDRImage.HDRImage#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[paramMapping](SceneTree_Images_HDRImage.HDRImage#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[params](SceneTree_Images_HDRImage.HDRImage#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L24)

___

### shCoeffs

• `Protected` **shCoeffs**: `any`[]

#### Defined in

[src/SceneTree/Images/EnvMap.ts:20](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L20)

___

### type

• **type**: `string` = `'UNSIGNED_BYTE'`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[type](SceneTree_Images_HDRImage.HDRImage#type)

#### Defined in

[src/SceneTree/BaseImage.ts:32](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L32)

___

### utf8decoder

• `Protected` **utf8decoder**: `TextDecoder`

#### Defined in

[src/SceneTree/Images/EnvMap.ts:19](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L19)

___

### width

• **width**: `number` = `0`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[width](SceneTree_Images_HDRImage.HDRImage#width)

#### Defined in

[src/SceneTree/BaseImage.ts:29](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L29)

___

### wrapS

• **wrapS**: `string` = `'REPEAT'`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[wrapS](SceneTree_Images_HDRImage.HDRImage#wraps)

#### Defined in

[src/SceneTree/BaseImage.ts:35](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L35)

___

### wrapT

• **wrapT**: `string` = `'REPEAT'`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[wrapT](SceneTree_Images_HDRImage.HDRImage#wrapt)

#### Defined in

[src/SceneTree/BaseImage.ts:36](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L36)

## Methods

### \_\_decodeData

▸ `Private` **__decodeData**(`entries`): `Promise`<`void`\>

The __decodeData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entries` | `Record`<`string`, `any`\> | The entries value. |

#### Returns

`Promise`<`void`\>

#### Overrides

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[__decodeData](SceneTree_Images_HDRImage.HDRImage#__decodedata)

#### Defined in

[src/SceneTree/Images/EnvMap.ts:44](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L44)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[addParameter](SceneTree_Images_HDRImage.HDRImage#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L135)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[addParameterDeprecationMapping](SceneTree_Images_HDRImage.HDRImage#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L92)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[clone](SceneTree_Images_HDRImage.HDRImage#clone)

#### Defined in

[src/SceneTree/BaseItem.ts:319](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L319)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[copyFrom](SceneTree_Images_HDRImage.HDRImage#copyfrom)

#### Defined in

[src/SceneTree/BaseItem.ts:335](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L335)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[deleteMetadata](SceneTree_Images_HDRImage.HDRImage#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L263)

___

### dirToLuminance

▸ **dirToLuminance**(`dir`): `any`

Calculate the luminance of the Environment in the direction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dir` | [`Vec3`](../../Math/Math_Vec3.Vec3) | The dir value. |

#### Returns

`any`

- The return value.

#### Defined in

[src/SceneTree/Images/EnvMap.ts:69](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/EnvMap.ts#L69)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[emit](SceneTree_Images_HDRImage.HDRImage#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`json`, `context`): `Record`<`string`, `any`\>

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[fromJSON](SceneTree_Images_HDRImage.HDRImage#fromjson)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:178](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L178)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getClassName](SceneTree_Images_HDRImage.HDRImage#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L33)

___

### getHDRTint

▸ `Private` **getHDRTint**(): [`Color`](../../Math/Math_Color.Color)

The getHDRTint method.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The return value.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getHDRTint](SceneTree_Images_HDRImage.HDRImage#gethdrtint)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:156](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L156)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getId](SceneTree_Images_HDRImage.HDRImage#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L25)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getMetadata](SceneTree_Images_HDRImage.HDRImage#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getName](SceneTree_Images_HDRImage.HDRImage#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L76)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getNumParameters](SceneTree_Images_HDRImage.HDRImage#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getOwner](SceneTree_Images_HDRImage.HDRImage#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L156)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getParameter](SceneTree_Images_HDRImage.HDRImage#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L102)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getParameterByIndex](SceneTree_Images_HDRImage.HDRImage#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L70)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getParameterIndex](SceneTree_Images_HDRImage.HDRImage#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getParameters](SceneTree_Images_HDRImage.HDRImage#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L50)

___

### getParams

▸ **getParams**(): [`ImageParams`](../SceneTree_BaseImage.ImageParams)

Returns all parameters and class state values.

#### Returns

[`ImageParams`](../SceneTree_BaseImage.ImageParams)

- The return value.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getParams](SceneTree_Images_HDRImage.HDRImage#getparams)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:133](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L133)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getPath](SceneTree_Images_HDRImage.HDRImage#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L113)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[hasMetadata](SceneTree_Images_HDRImage.HDRImage#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L244)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[hasParameter](SceneTree_Images_HDRImage.HDRImage#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L80)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[insertParameter](SceneTree_Images_HDRImage.HDRImage#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L149)

___

### isLoaded

▸ `Private` **isLoaded**(): `boolean`

Returns true if loaded.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[isLoaded](SceneTree_Images_HDRImage.HDRImage#isloaded)

#### Defined in

[src/SceneTree/BaseImage.ts:56](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseImage.ts#L56)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[isSelectable](SceneTree_Images_HDRImage.HDRImage#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[isSelected](SceneTree_Images_HDRImage.HDRImage#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L209)

___

### isStream

▸ **isStream**(): `boolean`

Returns if the data is a stream or not.

#### Returns

`boolean`

- The return value.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[isStream](SceneTree_Images_HDRImage.HDRImage#isstream)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:124](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L124)

___

### load

▸ **load**(`url`): `Promise`<`void`\>

Loads a vlh file given a URL.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the vlh file to load |

#### Returns

`Promise`<`void`\>

- Returns a promise that resolves once the initial load is complete

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[load](SceneTree_Images_HDRImage.HDRImage#load)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:84](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L84)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[off](SceneTree_Images_HDRImage.HDRImage#off)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[on](SceneTree_Images_HDRImage.HDRImage#on)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[once](SceneTree_Images_HDRImage.HDRImage#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L82)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[parameterValueChanged](SceneTree_Images_HDRImage.HDRImage#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L124)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Image using a binary reader object, and adds it to the resource loader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[readBinary](SceneTree_Images_HDRImage.HDRImage#readbinary)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:188](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L188)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[removeListenerById](SceneTree_Images_HDRImage.HDRImage#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/EventEmitter.ts#L134)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[removeParameter](SceneTree_Images_HDRImage.HDRImage#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L176)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[replaceParameter](SceneTree_Images_HDRImage.HDRImage#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L198)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[resolvePath](SceneTree_Images_HDRImage.HDRImage#resolvepath)

#### Defined in

[src/SceneTree/BaseItem.ts:128](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L128)

___

### setHDRTint

▸ `Private` **setHDRTint**(`hdrTint`): `void`

The setHDRTint method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hdrTint` | [`Color`](../../Math/Math_Color.Color) | The hdrTint value. |

#### Returns

`void`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[setHDRTint](SceneTree_Images_HDRImage.HDRImage#sethdrtint)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:147](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L147)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[setMetadata](SceneTree_Images_HDRImage.HDRImage#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L254)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[setName](SceneTree_Images_HDRImage.HDRImage#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L86)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[setOwner](SceneTree_Images_HDRImage.HDRImage#setowner)

#### Defined in

[src/SceneTree/BaseItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L166)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[setSelectable](SceneTree_Images_HDRImage.HDRImage#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L195)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[setSelected](SceneTree_Images_HDRImage.HDRImage#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L219)

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

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[toJSON](SceneTree_Images_HDRImage.HDRImage#tojson)

#### Defined in

[src/SceneTree/Images/HDRImage.ts:168](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/Images/HDRImage.ts#L168)

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

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[toString](SceneTree_Images_HDRImage.HDRImage#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/ParameterOwner.ts#L303)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[updatePath](SceneTree_Images_HDRImage.HDRImage#updatepath)

#### Defined in

[src/SceneTree/BaseItem.ts:101](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L101)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[HDRImage](SceneTree_Images_HDRImage.HDRImage).[getNumBaseItems](SceneTree_Images_HDRImage.HDRImage#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/SceneTree/BaseItem.ts#L64)

