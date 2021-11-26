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

[SceneTree/Images/Label.ts:190](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L190)

## Properties

### \_\_data

• `Protected` **\_\_data**: `Uint8Array` \| `ImageData`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__data](SceneTree_Images_DataImage.DataImage#__data)

#### Defined in

[SceneTree/Images/DataImage.ts:16](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/DataImage.ts#L16)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__id](SceneTree_Images_DataImage.DataImage#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L11)

___

### \_\_loaded

• `Protected` **\_\_loaded**: `boolean`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__loaded](SceneTree_Images_DataImage.DataImage#__loaded)

#### Defined in

[SceneTree/Images/DataImage.ts:15](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/DataImage.ts#L15)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__metaData](SceneTree_Images_DataImage.DataImage#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__name](SceneTree_Images_DataImage.DataImage#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__ownerItem](SceneTree_Images_DataImage.DataImage#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__path](SceneTree_Images_DataImage.DataImage#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__selectable](SceneTree_Images_DataImage.DataImage#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[__selected](SceneTree_Images_DataImage.DataImage#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L38)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:178](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L178)

___

### backgroundParam

• **backgroundParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** backgroundParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:173](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L173)

___

### borderRadiusParam

• **borderRadiusParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

#### Defined in

[SceneTree/Images/Label.ts:128](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L128)

___

### borderWidthParam

• **borderWidthParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** borderWidthParam - Border around the label

#### Defined in

[SceneTree/Images/Label.ts:158](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L158)

___

### canvasElem

• `Protected` **canvasElem**: `HTMLCanvasElement`

#### Defined in

[SceneTree/Images/Label.ts:118](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L118)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[deprecatedParamMapping](SceneTree_Images_DataImage.DataImage#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L23)

___

### fillBackgroundParam

• **fillBackgroundParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** fillBackgroundParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:183](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L183)

___

### fontColorParam

• **fontColorParam**: [`ColorParameter`](../Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** fontColorParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:143](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L143)

___

### fontParam

• **fontParam**: [`StringParameter`](../Parameters/SceneTree_Parameters_StringParameter.StringParameter)

**`member`** fontParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:153](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L153)

___

### fontSizeParam

• **fontSizeParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** - TODO

#### Defined in

[SceneTree/Images/Label.ts:148](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L148)

___

### format

• **format**: `string` = `'RGB'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[format](SceneTree_Images_DataImage.DataImage#format)

#### Defined in

[SceneTree/BaseImage.ts:14](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L14)

___

### height

• **height**: `number` = `0`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[height](SceneTree_Images_DataImage.DataImage#height)

#### Defined in

[SceneTree/BaseImage.ts:13](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L13)

___

### libraryParam

• **libraryParam**: [`StringParameter`](../Parameters/SceneTree_Parameters_StringParameter.StringParameter)

**`member`** libraryParam - Library you wan to use for your label, see **Library List** above.

#### Defined in

[SceneTree/Images/Label.ts:133](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L133)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[listeners](SceneTree_Images_DataImage.DataImage#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[loaded](SceneTree_Images_DataImage.DataImage#loaded)

#### Defined in

[SceneTree/BaseImage.ts:22](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L22)

___

### magFilter

• `Protected` **magFilter**: `string` = `'LINEAR'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[magFilter](SceneTree_Images_DataImage.DataImage#magfilter)

#### Defined in

[SceneTree/BaseImage.ts:21](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L21)

___

### marginParam

• **marginParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

Creates a label instance. Creating a canvas element that hosts the specified text.

**`param`** The name value.

**`param`** The library value.

#### Defined in

[SceneTree/Images/Label.ts:127](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L127)

___

### minFilter

• `Protected` **minFilter**: `string` = `'LINEAR'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[minFilter](SceneTree_Images_DataImage.DataImage#minfilter)

#### Defined in

[SceneTree/BaseImage.ts:20](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L20)

___

### mipMapped

• **mipMapped**: `boolean` = `true`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[mipMapped](SceneTree_Images_DataImage.DataImage#mipmapped)

#### Defined in

[SceneTree/BaseImage.ts:16](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L16)

___

### needsRender

• `Protected` **needsRender**: `boolean`

#### Defined in

[SceneTree/Images/Label.ts:117](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L117)

___

### outlineColorParam

• **outlineColorParam**: [`ColorParameter`](../Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** outlineColorParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:168](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L168)

___

### outlineParam

• **outlineParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** outlineParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:163](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L163)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[paramEventListenerIDs](SceneTree_Images_DataImage.DataImage#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[paramMapping](SceneTree_Images_DataImage.DataImage#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[params](SceneTree_Images_DataImage.DataImage#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L22)

___

### requestedReRender

• `Protected` **requestedReRender**: `boolean` = `false`

#### Defined in

[SceneTree/Images/Label.ts:119](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L119)

___

### strokeBackgroundOutlineParam

• **strokeBackgroundOutlineParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** strokeBackgroundOutlineParam - TODO

#### Defined in

[SceneTree/Images/Label.ts:188](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L188)

___

### textParam

• **textParam**: [`StringParameter`](../Parameters/SceneTree_Parameters_StringParameter.StringParameter)

**`member`** textParam - text to display on the label

#### Defined in

[SceneTree/Images/Label.ts:138](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L138)

___

### type

• **type**: `string` = `'UNSIGNED_BYTE'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[type](SceneTree_Images_DataImage.DataImage#type)

#### Defined in

[SceneTree/BaseImage.ts:15](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L15)

___

### width

• **width**: `number` = `0`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[width](SceneTree_Images_DataImage.DataImage#width)

#### Defined in

[SceneTree/BaseImage.ts:12](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L12)

___

### wrapS

• `Protected` **wrapS**: `string` = `'REPEAT'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[wrapS](SceneTree_Images_DataImage.DataImage#wraps)

#### Defined in

[SceneTree/BaseImage.ts:18](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L18)

___

### wrapT

• `Protected` **wrapT**: `string` = `'REPEAT'`

#### Inherited from

[DataImage](SceneTree_Images_DataImage.DataImage).[wrapT](SceneTree_Images_DataImage.DataImage#wrapt)

#### Defined in

[SceneTree/BaseImage.ts:19](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseImage.ts#L19)

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

[SceneTree/Images/Label.ts:234](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L234)

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

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L133)

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

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L90)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[clone](SceneTree_Images_DataImage.DataImage#clone)

#### Defined in

[SceneTree/BaseItem.ts:317](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L317)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[copyFrom](SceneTree_Images_DataImage.DataImage#copyfrom)

#### Defined in

[SceneTree/BaseItem.ts:333](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L333)

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

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L261)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[DataImage](SceneTree_Images_DataImage.DataImage).[fromJSON](SceneTree_Images_DataImage.DataImage#fromjson)

#### Defined in

[SceneTree/Images/Label.ts:428](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L428)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L33)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L25)

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

[SceneTree/BaseItem.ts:232](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L232)

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

[SceneTree/BaseItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L74)

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

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L39)

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

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L154)

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

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L100)

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

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L68)

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

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L58)

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

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L48)

___

### getParams

▸ **getParams**(): `Record`<`string`, `any`\>

 Returns all parameters and class state values(Including data).

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Overrides

[DataImage](SceneTree_Images_DataImage.DataImage).[getParams](SceneTree_Images_DataImage.DataImage#getparams)

#### Defined in

[SceneTree/Images/Label.ts:403](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L403)

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

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L111)

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

[SceneTree/BaseItem.ts:242](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L242)

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

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L78)

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

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L147)

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

[SceneTree/Images/DataImage.ts:39](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/DataImage.ts#L39)

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

[SceneTree/BaseItem.ts:183](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L183)

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

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L207)

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

[SceneTree/Images/DataImage.ts:49](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/DataImage.ts#L49)

___

### loadLabelData

▸ **loadLabelData**(): `void`

Method in charge of basically do everything, set text, load/update it, get the library, load the font, etc.

#### Returns

`void`

#### Defined in

[SceneTree/Images/Label.ts:245](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L245)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L82)

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

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L122)

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

[DataImage](SceneTree_Images_DataImage.DataImage).[readBinary](SceneTree_Images_DataImage.DataImage#readbinary)

#### Defined in

[SceneTree/BaseItem.ts:298](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L298)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L134)

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

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L174)

___

### renderLabelToImage

▸ **renderLabelToImage**(): `void`

Renders the label text to a canvas element ready to display.
Here is where all parameters are applied to the canvas containing the text,
then the image data is extracted from the canvas context.

#### Returns

`void`

#### Defined in

[SceneTree/Images/Label.ts:314](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L314)

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

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L196)

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

[SceneTree/BaseItem.ts:126](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L126)

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

[SceneTree/Images/DataImage.ts:60](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/DataImage.ts#L60)

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

[SceneTree/BaseItem.ts:252](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L252)

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

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L84)

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

[SceneTree/BaseItem.ts:164](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L164)

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

[SceneTree/BaseItem.ts:193](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L193)

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

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L217)

___

### toJSON

▸ **toJSON**(`context`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Overrides

[DataImage](SceneTree_Images_DataImage.DataImage).[toJSON](SceneTree_Images_DataImage.DataImage#tojson)

#### Defined in

[SceneTree/Images/Label.ts:417](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/Images/Label.ts#L417)

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

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L301)

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

[SceneTree/BaseItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L99)

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

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L62)

