---
id: "SceneTree_Images_Label.Label"
title: "Class: Label"
sidebar_label: "Label"
custom_edit_url: null
---



Represents a 2D label item the scene.
Since displaying text in the scene is not an easy task,
we've abstracted the complicated logic behind this class, transforming any text into a 2D image(`DataImage`).

**Library List**
* LabelPack

**Parameters**
* **Library(`StringParameter`):** Library you wan to use for your label, see **Library List** above.
* **Text(`StringParameter`):**
* **FontColor(`ColorParameter`):**
* **Margin(`NumberParameter`):**
* **BorderWidth(`NumberParameter`):**
* **BorderRadius(`NumberParameter`):**
* **Outline(`BooleanParameter`):**
* **OutlineColor(`BooleanParameter`):**
* **Background(`BooleanParameter`):**
* **ColorParameter(`BackgroundColor`):**
* **FillBackground(`BooleanParameter`):**
* **StrokeBackgroundOutline(`BooleanParameter`):**
* **FontSize(`NumberParameter`):** Represents FontSize of the label
* **Font(`StringParameter`):**

**Events**
* **loaded:** Triggered when label's data is loaded.
* **updated:** Triggered when label's data changes.
* **labelRendered:** Triggered when the text image is rendered. Contains `width`, `height` and data of the image.

## Hierarchy

- [`DataImage`](SceneTree_Images_DataImage.DataImage)

  ↳ **`Label`**

## Constructors

### constructor

• **new Label**(`name?`, `library?`)

Create a data image.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |
| `library?` | `string` |

#### Overrides

[DataImage](SceneTree_Images_DataImage.DataImage).[constructor](SceneTree_Images_DataImage.DataImage#constructor)

#### Defined in

[src/SceneTree/Images/Label.ts:191](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L191)

## Properties

### \_\_data

• `Protected` **\_\_data**: `Uint8Array` \| `ImageData`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__data](SceneTree_Images_DataImage.DataImage#__data)

#### Defined in

[src/SceneTree/Images/DataImage.ts:15](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/DataImage.ts#L15)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__id](SceneTree_Images_DataImage.DataImage#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__metaData](SceneTree_Images_DataImage.DataImage#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__name](SceneTree_Images_DataImage.DataImage#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__ownerItem](SceneTree_Images_DataImage.DataImage#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__path](SceneTree_Images_DataImage.DataImage#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__selectable](SceneTree_Images_DataImage.DataImage#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__selected](SceneTree_Images_DataImage.DataImage#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L40)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:179](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L179)

___

### backgroundParam

• **backgroundParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** backgroundParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:174](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L174)

___

### borderRadiusParam

• **borderRadiusParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

#### Defined in

[src/SceneTree/Images/Label.ts:129](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L129)

___

### borderWidthParam

• **borderWidthParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** borderWidthParam - Border around the label

#### Defined in

[src/SceneTree/Images/Label.ts:159](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L159)

___

### canvasElem

• `Protected` **canvasElem**: `HTMLCanvasElement`

#### Defined in

[src/SceneTree/Images/Label.ts:119](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L119)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[deprecatedParamMapping](SceneTree_Images_DataImage.DataImage#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L25)

___

### fillBackgroundParam

• **fillBackgroundParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** fillBackgroundParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:184](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L184)

___

### fontColorParam

• **fontColorParam**: [`ColorParameter`](../Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** fontColorParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:144](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L144)

___

### fontParam

• **fontParam**: [`StringParameter`](../Parameters/SceneTree_Parameters_StringParameter.StringParameter)

**`member`** fontParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:154](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L154)

___

### fontSizeParam

• **fontSizeParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:149](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L149)

___

### format

• **format**: `string` = `'RGB'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[format](SceneTree_Images_DataImage.DataImage#format)

#### Defined in

[src/SceneTree/BaseImage.ts:31](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L31)

___

### height

• **height**: `number` = `0`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[height](SceneTree_Images_DataImage.DataImage#height)

#### Defined in

[src/SceneTree/BaseImage.ts:30](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L30)

___

### libraryParam

• **libraryParam**: [`StringParameter`](../Parameters/SceneTree_Parameters_StringParameter.StringParameter)

**`member`** libraryParam - Library you wan to use for your label, see **Library List** above.

#### Defined in

[src/SceneTree/Images/Label.ts:134](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L134)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[listeners](SceneTree_Images_DataImage.DataImage#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[loaded](SceneTree_Images_DataImage.DataImage#loaded)

#### Defined in

[src/SceneTree/BaseImage.ts:33](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L33)

___

### magFilter

• **magFilter**: `string` = `'LINEAR'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[magFilter](SceneTree_Images_DataImage.DataImage#magfilter)

#### Defined in

[src/SceneTree/BaseImage.ts:38](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L38)

___

### marginParam

• **marginParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

Creates a label instance. Creating a canvas element that hosts the specified text.

**`param`** The name value.

**`param`** The library value.

#### Defined in

[src/SceneTree/Images/Label.ts:128](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L128)

___

### minFilter

• **minFilter**: `string` = `'LINEAR'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[minFilter](SceneTree_Images_DataImage.DataImage#minfilter)

#### Defined in

[src/SceneTree/BaseImage.ts:37](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L37)

___

### mipMapped

• **mipMapped**: `boolean` = `true`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[mipMapped](SceneTree_Images_DataImage.DataImage#mipmapped)

#### Defined in

[src/SceneTree/BaseImage.ts:34](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L34)

___

### needsRender

• `Protected` **needsRender**: `boolean`

#### Defined in

[src/SceneTree/Images/Label.ts:118](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L118)

___

### outlineColorParam

• **outlineColorParam**: [`ColorParameter`](../Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** outlineColorParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:169](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L169)

___

### outlineParam

• **outlineParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** outlineParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:164](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L164)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[paramEventListenerIDs](SceneTree_Images_DataImage.DataImage#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[paramMapping](SceneTree_Images_DataImage.DataImage#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[params](SceneTree_Images_DataImage.DataImage#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L24)

___

### requestedReRender

• `Protected` **requestedReRender**: `boolean` = `false`

#### Defined in

[src/SceneTree/Images/Label.ts:120](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L120)

___

### strokeBackgroundOutlineParam

• **strokeBackgroundOutlineParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** strokeBackgroundOutlineParam - TODO

#### Defined in

[src/SceneTree/Images/Label.ts:189](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L189)

___

### textParam

• **textParam**: [`StringParameter`](../Parameters/SceneTree_Parameters_StringParameter.StringParameter)

**`member`** textParam - text to display on the label

#### Defined in

[src/SceneTree/Images/Label.ts:139](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L139)

___

### type

• **type**: `string` = `'UNSIGNED_BYTE'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[type](SceneTree_Images_DataImage.DataImage#type)

#### Defined in

[src/SceneTree/BaseImage.ts:32](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L32)

___

### width

• **width**: `number` = `0`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[width](SceneTree_Images_DataImage.DataImage#width)

#### Defined in

[src/SceneTree/BaseImage.ts:29](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L29)

___

### wrapS

• **wrapS**: `string` = `'REPEAT'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[wrapS](SceneTree_Images_DataImage.DataImage#wraps)

#### Defined in

[src/SceneTree/BaseImage.ts:35](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L35)

___

### wrapT

• **wrapT**: `string` = `'REPEAT'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[wrapT](SceneTree_Images_DataImage.DataImage#wrapt)

#### Defined in

[src/SceneTree/BaseImage.ts:36](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseImage.ts#L36)

## Methods

### \_\_parameterValueChanged

▸ `Private` **__parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event object. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/Label.ts:235](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L235)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[addParameter](SceneTree_Images_DataImage.DataImage#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L135)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[addParameterDeprecationMapping](SceneTree_Images_DataImage.DataImage#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L92)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[clone](SceneTree_Images_DataImage.DataImage#clone)

#### Defined in

[src/SceneTree/BaseItem.ts:319](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L319)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[copyFrom](SceneTree_Images_DataImage.DataImage#copyfrom)

#### Defined in

[src/SceneTree/BaseItem.ts:335](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L335)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[deleteMetadata](SceneTree_Images_DataImage.DataImage#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L263)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[emit](SceneTree_Images_DataImage.DataImage#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L154)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[fromJSON](SceneTree_Images_DataImage.DataImage#fromjson)

#### Defined in

[src/SceneTree/BaseItem.ts:289](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L289)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getClassName](SceneTree_Images_DataImage.DataImage#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L33)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[getId](SceneTree_Images_DataImage.DataImage#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/BaseClass.ts#L25)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[getMetadata](SceneTree_Images_DataImage.DataImage#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getName](SceneTree_Images_DataImage.DataImage#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L76)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getNumParameters](SceneTree_Images_DataImage.DataImage#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getOwner](SceneTree_Images_DataImage.DataImage#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L156)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[getParameter](SceneTree_Images_DataImage.DataImage#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L102)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[getParameterByIndex](SceneTree_Images_DataImage.DataImage#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L70)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[getParameterIndex](SceneTree_Images_DataImage.DataImage#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getParameters](SceneTree_Images_DataImage.DataImage#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L50)

___

### getParams

▸ **getParams**(): [`ImageParams`](../SceneTree_BaseImage.ImageParams)

 Returns all parameters and class state values(Including data).

#### Returns

[`ImageParams`](../SceneTree_BaseImage.ImageParams)

- The return value.

#### Overrides

[DataImage](SceneTree_Images_DataImage.DataImage).[getParams](SceneTree_Images_DataImage.DataImage#getparams)

#### Defined in

[src/SceneTree/Images/Label.ts:404](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L404)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getPath](SceneTree_Images_DataImage.DataImage#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L113)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[hasMetadata](SceneTree_Images_DataImage.DataImage#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L244)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[hasParameter](SceneTree_Images_DataImage.DataImage#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L80)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[insertParameter](SceneTree_Images_DataImage.DataImage#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L149)

___

### isLoaded

▸ **isLoaded**(): `boolean`

Returns an indicator of current item's loaded state.

#### Returns

`boolean`

- `true` if bytes data is fully loaded, `false` otherwise.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[isLoaded](SceneTree_Images_DataImage.DataImage#isloaded)

#### Defined in

[src/SceneTree/Images/DataImage.ts:33](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/DataImage.ts#L33)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[isSelectable](SceneTree_Images_DataImage.DataImage#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[isSelected](SceneTree_Images_DataImage.DataImage#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L209)

___

### isStream

▸ **isStream**(): `boolean`

Images are static content, so the value for this method is always going to be `false`

#### Returns

`boolean`

- The return value.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[isStream](SceneTree_Images_DataImage.DataImage#isstream)

#### Defined in

[src/SceneTree/Images/DataImage.ts:43](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/DataImage.ts#L43)

___

### loadLabelData

▸ **loadLabelData**(): `void`

Method in charge of basically do everything, set text, load/update it, get the library, load the font, etc.

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/Label.ts:246](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L246)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[off](SceneTree_Images_DataImage.DataImage#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L97)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[on](SceneTree_Images_DataImage.DataImage#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L44)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[once](SceneTree_Images_DataImage.DataImage#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L82)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[parameterValueChanged](SceneTree_Images_DataImage.DataImage#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L124)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[readBinary](SceneTree_Images_DataImage.DataImage#readbinary)

#### Defined in

[src/SceneTree/BaseItem.ts:300](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L300)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[removeListenerById](SceneTree_Images_DataImage.DataImage#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/Utilities/EventEmitter.ts#L134)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[removeParameter](SceneTree_Images_DataImage.DataImage#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L176)

___

### renderLabelToImage

▸ **renderLabelToImage**(): `void`

Renders the label text to a canvas element ready to display.
Here is where all parameters are applied to the canvas containing the text,
then the image data is extracted from the canvas context.

#### Returns

`void`

#### Defined in

[src/SceneTree/Images/Label.ts:315](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/Label.ts#L315)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[replaceParameter](SceneTree_Images_DataImage.DataImage#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L198)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[resolvePath](SceneTree_Images_DataImage.DataImage#resolvepath)

#### Defined in

[src/SceneTree/BaseItem.ts:128](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L128)

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

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[setData](SceneTree_Images_DataImage.DataImage#setdata)

#### Defined in

[src/SceneTree/Images/DataImage.ts:54](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/Images/DataImage.ts#L54)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[setMetadata](SceneTree_Images_DataImage.DataImage#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L254)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[setName](SceneTree_Images_DataImage.DataImage#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L86)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[setOwner](SceneTree_Images_DataImage.DataImage#setowner)

#### Defined in

[src/SceneTree/BaseItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L166)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[setSelectable](SceneTree_Images_DataImage.DataImage#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L195)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[setSelected](SceneTree_Images_DataImage.DataImage#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L219)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[toJSON](SceneTree_Images_DataImage.DataImage#tojson)

#### Defined in

[src/SceneTree/BaseItem.ts:276](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L276)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[toString](SceneTree_Images_DataImage.DataImage#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/ParameterOwner.ts#L303)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[updatePath](SceneTree_Images_DataImage.DataImage#updatepath)

#### Defined in

[src/SceneTree/BaseItem.ts:101](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L101)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[getNumBaseItems](SceneTree_Images_DataImage.DataImage#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/716e8606e/src/SceneTree/BaseItem.ts#L64)

