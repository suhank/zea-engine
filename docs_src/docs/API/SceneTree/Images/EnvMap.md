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

- [`VLHImage`](SceneTree_Images_VLHImage.VLHImage)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[constructor](SceneTree_Images_VLHImage.VLHImage#constructor)

#### Defined in

[SceneTree/Images/EnvMap.ts:29](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L29)

## Properties

### \_\_ambientLightFactor

• `Protected` **\_\_ambientLightFactor**: `number`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__ambientLightFactor](SceneTree_Images_VLHImage.VLHImage#__ambientlightfactor)

#### Defined in

[SceneTree/Images/VLHImage.ts:18](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L18)

___

### \_\_data

• `Protected` **\_\_data**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__data](SceneTree_Images_VLHImage.VLHImage#__data)

#### Defined in

[SceneTree/Images/VLHImage.ts:21](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L21)

___

### \_\_exposure

• `Protected` **\_\_exposure**: `number`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__exposure](SceneTree_Images_VLHImage.VLHImage#__exposure)

#### Defined in

[SceneTree/Images/VLHImage.ts:17](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L17)

___

### \_\_hdrTint

• `Protected` **\_\_hdrTint**: [`Color`](../../Math/Math_Color.Color)

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__hdrTint](SceneTree_Images_VLHImage.VLHImage#__hdrtint)

#### Defined in

[SceneTree/Images/VLHImage.ts:19](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L19)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__id](SceneTree_Images_VLHImage.VLHImage#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__metaData](SceneTree_Images_VLHImage.VLHImage#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__name](SceneTree_Images_VLHImage.VLHImage#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__ownerItem](SceneTree_Images_VLHImage.VLHImage#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__path](SceneTree_Images_VLHImage.VLHImage#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__selectable](SceneTree_Images_VLHImage.VLHImage#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__selected](SceneTree_Images_VLHImage.VLHImage#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L38)

___

### \_\_stream

• `Protected` **\_\_stream**: `boolean`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__stream](SceneTree_Images_VLHImage.VLHImage#__stream)

#### Defined in

[SceneTree/Images/VLHImage.ts:20](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L20)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[deprecatedParamMapping](SceneTree_Images_VLHImage.VLHImage#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L23)

___

### format

• **format**: `string` = `'RGB'`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[format](SceneTree_Images_VLHImage.VLHImage#format)

#### Defined in

[SceneTree/BaseImage.ts:14](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L14)

___

### headlightModeParam

• **headlightModeParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Defined in

[SceneTree/Images/EnvMap.ts:23](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L23)

___

### height

• **height**: `number` = `0`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[height](SceneTree_Images_VLHImage.VLHImage#height)

#### Defined in

[SceneTree/BaseImage.ts:13](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L13)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[listeners](SceneTree_Images_VLHImage.VLHImage#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[loaded](SceneTree_Images_VLHImage.VLHImage#loaded)

#### Defined in

[SceneTree/BaseImage.ts:22](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L22)

___

### luminanceData

• `Protected` **luminanceData**: `any`

#### Defined in

[SceneTree/Images/EnvMap.ts:21](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L21)

___

### magFilter

• `Protected` **magFilter**: `string` = `'LINEAR'`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[magFilter](SceneTree_Images_VLHImage.VLHImage#magfilter)

#### Defined in

[SceneTree/BaseImage.ts:21](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L21)

___

### minFilter

• `Protected` **minFilter**: `string` = `'LINEAR'`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[minFilter](SceneTree_Images_VLHImage.VLHImage#minfilter)

#### Defined in

[SceneTree/BaseImage.ts:20](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L20)

___

### mipMapped

• **mipMapped**: `boolean` = `true`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[mipMapped](SceneTree_Images_VLHImage.VLHImage#mipmapped)

#### Defined in

[SceneTree/BaseImage.ts:16](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L16)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[paramEventListenerIDs](SceneTree_Images_VLHImage.VLHImage#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[paramMapping](SceneTree_Images_VLHImage.VLHImage#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[params](SceneTree_Images_VLHImage.VLHImage#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L22)

___

### shCoeffs

• `Protected` **shCoeffs**: `any`[]

#### Defined in

[SceneTree/Images/EnvMap.ts:20](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L20)

___

### type

• **type**: `string` = `'UNSIGNED_BYTE'`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[type](SceneTree_Images_VLHImage.VLHImage#type)

#### Defined in

[SceneTree/BaseImage.ts:15](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L15)

___

### utf8decoder

• `Protected` **utf8decoder**: `TextDecoder`

#### Defined in

[SceneTree/Images/EnvMap.ts:19](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L19)

___

### width

• **width**: `number` = `0`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[width](SceneTree_Images_VLHImage.VLHImage#width)

#### Defined in

[SceneTree/BaseImage.ts:12](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L12)

___

### wrapS

• `Protected` **wrapS**: `string` = `'REPEAT'`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[wrapS](SceneTree_Images_VLHImage.VLHImage#wraps)

#### Defined in

[SceneTree/BaseImage.ts:18](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L18)

___

### wrapT

• `Protected` **wrapT**: `string` = `'REPEAT'`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[wrapT](SceneTree_Images_VLHImage.VLHImage#wrapt)

#### Defined in

[SceneTree/BaseImage.ts:19](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L19)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[__decodeData](SceneTree_Images_VLHImage.VLHImage#__decodedata)

#### Defined in

[SceneTree/Images/EnvMap.ts:44](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L44)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[addParameter](SceneTree_Images_VLHImage.VLHImage#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L133)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[addParameterDeprecationMapping](SceneTree_Images_VLHImage.VLHImage#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L90)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[clone](SceneTree_Images_VLHImage.VLHImage#clone)

#### Defined in

[SceneTree/BaseItem.ts:317](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L317)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[copyFrom](SceneTree_Images_VLHImage.VLHImage#copyfrom)

#### Defined in

[SceneTree/BaseItem.ts:333](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L333)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[deleteMetadata](SceneTree_Images_VLHImage.VLHImage#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L261)

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

[SceneTree/Images/EnvMap.ts:69](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/EnvMap.ts#L69)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[emit](SceneTree_Images_VLHImage.VLHImage#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L154)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[fromJSON](SceneTree_Images_VLHImage.VLHImage#fromjson)

#### Defined in

[SceneTree/Images/VLHImage.ts:179](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L179)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getClassName](SceneTree_Images_VLHImage.VLHImage#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/BaseClass.ts#L33)

___

### getHDRTint

▸ `Private` **getHDRTint**(): [`Color`](../../Math/Math_Color.Color)

The getHDRTint method.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The return value.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getHDRTint](SceneTree_Images_VLHImage.VLHImage#gethdrtint)

#### Defined in

[SceneTree/Images/VLHImage.ts:157](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L157)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getId](SceneTree_Images_VLHImage.VLHImage#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/BaseClass.ts#L25)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getMetadata](SceneTree_Images_VLHImage.VLHImage#getmetadata)

#### Defined in

[SceneTree/BaseItem.ts:232](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L232)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getName](SceneTree_Images_VLHImage.VLHImage#getname)

#### Defined in

[SceneTree/BaseItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L74)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getNumParameters](SceneTree_Images_VLHImage.VLHImage#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L39)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getOwner](SceneTree_Images_VLHImage.VLHImage#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L154)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getParameter](SceneTree_Images_VLHImage.VLHImage#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L100)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getParameterByIndex](SceneTree_Images_VLHImage.VLHImage#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L68)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getParameterIndex](SceneTree_Images_VLHImage.VLHImage#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getParameters](SceneTree_Images_VLHImage.VLHImage#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L48)

___

### getParams

▸ **getParams**(): `Record`<`string`, `any`\>

Returns all parameters and class state values.

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getParams](SceneTree_Images_VLHImage.VLHImage#getparams)

#### Defined in

[SceneTree/Images/VLHImage.ts:134](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L134)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getPath](SceneTree_Images_VLHImage.VLHImage#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L111)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[hasMetadata](SceneTree_Images_VLHImage.VLHImage#hasmetadata)

#### Defined in

[SceneTree/BaseItem.ts:242](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L242)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[hasParameter](SceneTree_Images_VLHImage.VLHImage#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L78)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[insertParameter](SceneTree_Images_VLHImage.VLHImage#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L147)

___

### isLoaded

▸ `Private` **isLoaded**(): `boolean`

Returns true if loaded.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[isLoaded](SceneTree_Images_VLHImage.VLHImage#isloaded)

#### Defined in

[SceneTree/BaseImage.ts:48](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseImage.ts#L48)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[isSelectable](SceneTree_Images_VLHImage.VLHImage#isselectable)

#### Defined in

[SceneTree/BaseItem.ts:183](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L183)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[isSelected](SceneTree_Images_VLHImage.VLHImage#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L207)

___

### isStream

▸ **isStream**(): `boolean`

Returns if the data is a stream or not.

#### Returns

`boolean`

- The return value.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[isStream](SceneTree_Images_VLHImage.VLHImage#isstream)

#### Defined in

[SceneTree/Images/VLHImage.ts:125](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L125)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[load](SceneTree_Images_VLHImage.VLHImage#load)

#### Defined in

[SceneTree/Images/VLHImage.ts:85](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L85)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[off](SceneTree_Images_VLHImage.VLHImage#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L97)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[on](SceneTree_Images_VLHImage.VLHImage#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L44)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[once](SceneTree_Images_VLHImage.VLHImage#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L82)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[parameterValueChanged](SceneTree_Images_VLHImage.VLHImage#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L122)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[readBinary](SceneTree_Images_VLHImage.VLHImage#readbinary)

#### Defined in

[SceneTree/Images/VLHImage.ts:189](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L189)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[removeListenerById](SceneTree_Images_VLHImage.VLHImage#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L134)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[removeParameter](SceneTree_Images_VLHImage.VLHImage#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L174)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[replaceParameter](SceneTree_Images_VLHImage.VLHImage#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L196)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[resolvePath](SceneTree_Images_VLHImage.VLHImage#resolvepath)

#### Defined in

[SceneTree/BaseItem.ts:126](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L126)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[setHDRTint](SceneTree_Images_VLHImage.VLHImage#sethdrtint)

#### Defined in

[SceneTree/Images/VLHImage.ts:148](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L148)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[setMetadata](SceneTree_Images_VLHImage.VLHImage#setmetadata)

#### Defined in

[SceneTree/BaseItem.ts:252](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L252)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[setName](SceneTree_Images_VLHImage.VLHImage#setname)

#### Defined in

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L84)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[setOwner](SceneTree_Images_VLHImage.VLHImage#setowner)

#### Defined in

[SceneTree/BaseItem.ts:164](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L164)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[setSelectable](SceneTree_Images_VLHImage.VLHImage#setselectable)

#### Defined in

[SceneTree/BaseItem.ts:193](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L193)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[setSelected](SceneTree_Images_VLHImage.VLHImage#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L217)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[toJSON](SceneTree_Images_VLHImage.VLHImage#tojson)

#### Defined in

[SceneTree/Images/VLHImage.ts:169](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Images/VLHImage.ts#L169)

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

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[toString](SceneTree_Images_VLHImage.VLHImage#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L301)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[updatePath](SceneTree_Images_VLHImage.VLHImage#updatepath)

#### Defined in

[SceneTree/BaseItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L99)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[VLHImage](SceneTree_Images_VLHImage.VLHImage).[getNumBaseItems](SceneTree_Images_VLHImage.VLHImage#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L62)

