---
id: "SceneTree_CAD_PMIView.PMIView"
title: "Class: PMIView"
sidebar_label: "PMIView"
custom_edit_url: null
---



Represents a view of PMI data. within a CAD assembly.

## Hierarchy

- [`PMIItem`](SceneTree_CAD_PMIItem.PMIItem)

  ↳ **`PMIView`**

## Constructors

### constructor

• **new PMIView**(`name?`)

Creates an instance of PMIView setting up the initial configuration for Material and Color parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name value. |

#### Overrides

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[constructor](SceneTree_CAD_PMIItem.PMIItem#constructor)

#### Defined in

[src/SceneTree/CAD/PMIView.ts:18](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L18)

## Properties

### \_\_childItems

• `Protected` **\_\_childItems**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)[] = `[]`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__childItems](SceneTree_CAD_PMIItem.PMIItem#__childitems)

#### Defined in

[src/SceneTree/TreeItem.ts:50](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L50)

___

### \_\_childItemsEventHandlers

• `Protected` **\_\_childItemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__childItemsEventHandlers](SceneTree_CAD_PMIItem.PMIItem#__childitemseventhandlers)

#### Defined in

[src/SceneTree/TreeItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L51)

___

### \_\_childItemsMapping

• `Protected` **\_\_childItemsMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__childItemsMapping](SceneTree_CAD_PMIItem.PMIItem#__childitemsmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:52](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L52)

___

### \_\_highlightMapping

• `Protected` **\_\_highlightMapping**: `Record`<`string`, [`Color`](../../Math/Math_Color.Color)\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__highlightMapping](SceneTree_CAD_PMIItem.PMIItem#__highlightmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:77](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L77)

___

### \_\_highlights

• `Protected` **\_\_highlights**: `string`[] = `[]`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__highlights](SceneTree_CAD_PMIItem.PMIItem#__highlights)

#### Defined in

[src/SceneTree/TreeItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L78)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__id](SceneTree_CAD_PMIItem.PMIItem#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__metaData](SceneTree_CAD_PMIItem.PMIItem#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__name](SceneTree_CAD_PMIItem.PMIItem#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__ownerItem](SceneTree_CAD_PMIItem.PMIItem#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__path](SceneTree_CAD_PMIItem.PMIItem#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__selectable](SceneTree_CAD_PMIItem.PMIItem#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__selected](SceneTree_CAD_PMIItem.PMIItem#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L40)

___

### \_\_visible

• `Protected` **\_\_visible**: `boolean` = `true`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__visible](SceneTree_CAD_PMIItem.PMIItem#__visible)

#### Defined in

[src/SceneTree/TreeItem.ts:80](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L80)

___

### \_\_visibleCounter

• `Protected` **\_\_visibleCounter**: `number` = `1`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[__visibleCounter](SceneTree_CAD_PMIItem.PMIItem#__visiblecounter)

#### Defined in

[src/SceneTree/TreeItem.ts:81](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L81)

___

### boundingBoxParam

• **boundingBoxParam**: [`BoundingBoxParameter`](../Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

**`member`** boundingBoxParam - Stores the bounding box for this tree item

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[boundingBoxParam](SceneTree_CAD_PMIItem.PMIItem#boundingboxparam)

#### Defined in

[src/SceneTree/TreeItem.ts:69](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L69)

___

### camera

• **camera**: `any`

#### Defined in

[src/SceneTree/CAD/PMIView.ts:12](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L12)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[deprecatedParamMapping](SceneTree_CAD_PMIItem.PMIItem#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L25)

___

### disableBoundingBox

• **disableBoundingBox**: `boolean` = `false`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[disableBoundingBox](SceneTree_CAD_PMIItem.PMIItem#disableboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:48](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L48)

___

### globalXfoOp

• `Protected` **globalXfoOp**: [`Operator`](../Operators/SceneTree_Operators_Operator.Operator)

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[globalXfoOp](SceneTree_CAD_PMIItem.PMIItem#globalxfoop)

#### Defined in

[src/SceneTree/TreeItem.ts:83](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L83)

___

### globalXfoParam

• **globalXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** globalXfoParam - Stores the global Xfo for this tree item.
global xfos are calculated from the localXfo and parentXfo.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[globalXfoParam](SceneTree_CAD_PMIItem.PMIItem#globalxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:58](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L58)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[listeners](SceneTree_CAD_PMIItem.PMIItem#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L26)

___

### localXfoParam

• **localXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** localXfoParam - Stores the local Xfo for this tree item.
local Xfos are the offset from the parent's coordinate frame.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[localXfoParam](SceneTree_CAD_PMIItem.PMIItem#localxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L64)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[paramEventListenerIDs](SceneTree_CAD_PMIItem.PMIItem#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[paramMapping](SceneTree_CAD_PMIItem.PMIItem#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[params](SceneTree_CAD_PMIItem.PMIItem#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L24)

___

### visibleParam

• **visibleParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** visibleParam - Whether this tree item is visible or not.
Any given tree item is also is affected by parent's visibility.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[visibleParam](SceneTree_CAD_PMIItem.PMIItem#visibleparam)

#### Defined in

[src/SceneTree/TreeItem.ts:75](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L75)

## Methods

### \_cleanBoundingBox

▸ `Private` **_cleanBoundingBox**(`bbox`): [`Box3`](../../Math/Math_Box3.Box3)

The _cleanBoundingBox method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bbox` | [`Box3`](../../Math/Math_Box3.Box3) | The bounding box value. |

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[_cleanBoundingBox](SceneTree_CAD_PMIItem.PMIItem#_cleanboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:340](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L340)

___

### activate

▸ **activate**(): `void`

Activates the PMIView, adjusting visibility of the PMI items and the camera Xfo

#### Returns

`void`

#### Overrides

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[activate](SceneTree_CAD_PMIItem.PMIItem#activate)

#### Defined in

[src/SceneTree/CAD/PMIView.ts:61](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L61)

___

### addChild

▸ **addChild**(`childItem`, `maintainXfo?`, `fixCollisions?`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Adds a child.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The child TreeItem to add. |
| `maintainXfo` | `boolean` | `true` | Boolean that determines if the Global Xfo value is maintained. If true, when moving items in the hierarchy from one parent to another, the local Xfo of the item will be modified to maintain and the Global Xfo. Note: this option defaults to false because we expect that is the behavior users would expect when manipulating the tree in code. To be safe and unambiguous, always try to specify this value. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions with other children of the same parent. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

childItem - The child TreeItem that was added.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[addChild](SceneTree_CAD_PMIItem.PMIItem#addchild)

#### Defined in

[src/SceneTree/TreeItem.ts:536](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L536)

___

### addHighlight

▸ **addHighlight**(`name?`, `color?`, `propagateToChildren?`): `void`

Adds a highlight to the tree item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name?` | `string` | `undefined` | The name of the tree item. |
| `color?` | [`Color`](../../Math/Math_Color.Color) | `undefined` | The color of the highlight. |
| `propagateToChildren` | `boolean` | `false` | A boolean indicating whether to propagate to children. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[addHighlight](SceneTree_CAD_PMIItem.PMIItem#addhighlight)

#### Defined in

[src/SceneTree/CAD/PMIItem.ts:67](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIItem.ts#L67)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[addParameter](SceneTree_CAD_PMIItem.PMIItem#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L135)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[addParameterDeprecationMapping](SceneTree_CAD_PMIItem.PMIItem#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L92)

___

### childBBoxChanged

▸ `Private` **childBBoxChanged**(): `void`

The _childBBoxChanged method.

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[childBBoxChanged](SceneTree_CAD_PMIItem.PMIItem#childbboxchanged)

#### Defined in

[src/SceneTree/TreeItem.ts:357](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L357)

___

### childNameChanged

▸ `Private` **childNameChanged**(`event`): `void`

When a child's name changed, we update our acceleration structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The start value. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[childNameChanged](SceneTree_CAD_PMIItem.PMIItem#childnamechanged)

#### Defined in

[src/SceneTree/TreeItem.ts:462](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L462)

___

### clone

▸ **clone**(`context?`): [`PMIView`](SceneTree_CAD_PMIView.PMIView)

The clone method constructs a new PMIView, copies its values
from this item and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The clone context. |

#### Returns

[`PMIView`](SceneTree_CAD_PMIView.PMIView)

- The return value.

#### Overrides

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[clone](SceneTree_CAD_PMIItem.PMIItem#clone)

#### Defined in

[src/SceneTree/CAD/PMIView.ts:30](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L30)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies current TreeItem with all its children.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The tree item to copy from. |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[copyFrom](SceneTree_CAD_PMIItem.PMIItem#copyfrom)

#### Defined in

[src/SceneTree/TreeItem.ts:1077](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L1077)

___

### deactivate

▸ **deactivate**(): `void`

Deactivates the PMIItem

#### Returns

`void`

#### Overrides

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[deactivate](SceneTree_CAD_PMIItem.PMIItem#deactivate)

#### Defined in

[src/SceneTree/CAD/PMIView.ts:102](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L102)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[deleteMetadata](SceneTree_CAD_PMIItem.PMIItem#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L263)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[emit](SceneTree_CAD_PMIItem.PMIItem#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`, `onDone?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |
| `onDone?` | `any` | - |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[fromJSON](SceneTree_CAD_PMIItem.PMIItem#fromjson)

#### Defined in

[src/SceneTree/TreeItem.ts:909](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L909)

___

### generateUniqueName

▸ **generateUniqueName**(`name`): `string`

Verifies if there's a child with the specified name.
If there's one, modifiers are applied to the name and returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

`string`

- Returns a unique name.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[generateUniqueName](SceneTree_CAD_PMIItem.PMIItem#generateuniquename)

#### Defined in

[src/SceneTree/TreeItem.ts:410](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L410)

___

### getChild

▸ **getChild**(`index`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns child element in the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to remove the child TreeItem. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Return the child TreeItem.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getChild](SceneTree_CAD_PMIItem.PMIItem#getchild)

#### Defined in

[src/SceneTree/TreeItem.ts:548](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L548)

___

### getChildByName

▸ **getChildByName**(`name`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns child element with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Return the child TreeItem.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getChildByName](SceneTree_CAD_PMIItem.PMIItem#getchildbyname)

#### Defined in

[src/SceneTree/TreeItem.ts:558](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L558)

___

### getChildIndex

▸ **getChildIndex**(`childItem`): `number`

Returns index position of the specified item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The child TreeItem value. |

#### Returns

`number`

- Child index in children array.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getChildIndex](SceneTree_CAD_PMIItem.PMIItem#getchildindex)

#### Defined in

[src/SceneTree/TreeItem.ts:660](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L660)

___

### getChildNames

▸ **getChildNames**(): `string`[]

Returns children names as an array of strings.

#### Returns

`string`[]

- An array of names for each child.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getChildNames](SceneTree_CAD_PMIItem.PMIItem#getchildnames)

#### Defined in

[src/SceneTree/TreeItem.ts:571](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L571)

___

### getChildren

▸ **getChildren**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)[]

Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
Meaning that it could be another kind of item than `TreeItem`.

i.e. **BaseImage**

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)[]

- List of `TreeItem` owned by current TreeItem.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getChildren](SceneTree_CAD_PMIItem.PMIItem#getchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:390](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L390)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getClassName](SceneTree_CAD_PMIItem.PMIItem#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L33)

___

### getHighlight

▸ **getHighlight**(): [`Color`](../../Math/Math_Color.Color)

Returns the color of the current highlight.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The color value.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getHighlight](SceneTree_CAD_PMIItem.PMIItem#gethighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:314](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L314)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getId](SceneTree_CAD_PMIItem.PMIItem#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L25)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getMetadata](SceneTree_CAD_PMIItem.PMIItem#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getName](SceneTree_CAD_PMIItem.PMIItem#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L76)

___

### getNumChildren

▸ **getNumChildren**(): `number`

Returns the number of child elements current `TreeItem` has.

#### Returns

`number`

- The return value.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getNumChildren](SceneTree_CAD_PMIItem.PMIItem#getnumchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:399](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L399)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getNumParameters](SceneTree_CAD_PMIItem.PMIItem#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getOwner](SceneTree_CAD_PMIItem.PMIItem#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L156)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getParameter](SceneTree_CAD_PMIItem.PMIItem#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L102)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getParameterByIndex](SceneTree_CAD_PMIItem.PMIItem#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L70)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getParameterIndex](SceneTree_CAD_PMIItem.PMIItem#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getParameters](SceneTree_CAD_PMIItem.PMIItem#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L50)

___

### getParentItem

▸ **getParentItem**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns the parent of current TreeItem.

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Returns the parent item.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getParentItem](SceneTree_CAD_PMIItem.PMIItem#getparentitem)

#### Defined in

[src/SceneTree/TreeItem.ts:164](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L164)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getPath](SceneTree_CAD_PMIItem.PMIItem#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L113)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[hasMetadata](SceneTree_CAD_PMIItem.PMIItem#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L244)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[hasParameter](SceneTree_CAD_PMIItem.PMIItem#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L80)

___

### insertChild

▸ **insertChild**(`childItem`, `index`, `maintainXfo?`, `fixCollisions?`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Inserts a child. It accepts all kind of `TreeItem`, not only `TreeItem`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The child TreeItem to insert. |
| `index` | `number` | `undefined` | The index to add the child item. |
| `maintainXfo` | `boolean` | `false` | Boolean that determines if the Xfo value is maintained. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The index of the child item in this items children array.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[insertChild](SceneTree_CAD_PMIItem.PMIItem#insertchild)

#### Defined in

[src/SceneTree/TreeItem.ts:479](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L479)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[insertParameter](SceneTree_CAD_PMIItem.PMIItem#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L149)

___

### isHighlighted

▸ **isHighlighted**(): `boolean`

Returns `true` if this items has a highlight color assigned.

#### Returns

`boolean`

- `True` if this item is highlighted.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[isHighlighted](SceneTree_CAD_PMIItem.PMIItem#ishighlighted)

#### Defined in

[src/SceneTree/TreeItem.ts:327](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L327)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[isSelectable](SceneTree_CAD_PMIItem.PMIItem#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[isSelected](SceneTree_CAD_PMIItem.PMIItem#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L209)

___

### isVisible

▸ **isVisible**(): `boolean`

Returns visible parameter value for current TreeItem.

#### Returns

`boolean`

- The visible param value.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[isVisible](SceneTree_CAD_PMIItem.PMIItem#isvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L185)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[off](SceneTree_CAD_PMIItem.PMIItem#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L97)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[on](SceneTree_CAD_PMIItem.PMIItem#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L44)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Called by the Viewport when events are received by the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerDown', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event value |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onPointerDown](SceneTree_CAD_PMIItem.PMIItem#onpointerdown)

#### Defined in

[src/SceneTree/TreeItem.ts:763](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L763)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Called by the Viewport when the mouse or other pointer enters the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerEnter', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onPointerEnter](SceneTree_CAD_PMIItem.PMIItem#onpointerenter)

#### Defined in

[src/SceneTree/TreeItem.ts:814](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L814)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Called by the Viewport when the mouse or other pointer leaves the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerLeave', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onPointerLeave](SceneTree_CAD_PMIItem.PMIItem#onpointerleave)

#### Defined in

[src/SceneTree/TreeItem.ts:831](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L831)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Called by the Viewport when events are received by the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerMove', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onPointerMove](SceneTree_CAD_PMIItem.PMIItem#onpointermove)

#### Defined in

[src/SceneTree/TreeItem.ts:797](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L797)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Called by the Viewport when events are received by the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerDown', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onPointerUp](SceneTree_CAD_PMIItem.PMIItem#onpointerup)

#### Defined in

[src/SceneTree/TreeItem.ts:780](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L780)

___

### onTouchCancel

▸ **onTouchCancel**(`event`): `void`

Called by the Viewport when the touch cancel event is received by the canvas element.
Emits the ZeaTouchEvent with the key 'touchCancel', and Propagates is up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The wheel event that occurs. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onTouchCancel](SceneTree_CAD_PMIItem.PMIItem#ontouchcancel)

#### Defined in

[src/SceneTree/TreeItem.ts:859](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L859)

___

### onWheel

▸ **onWheel**(`event`): `void`

Called by the Viewport when the mouse wheel event is received by the canvas element.
Emits the ZeaWheelEvent with the key 'mouseWheel', and Propagates is up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaWheelEvent`](../../Utilities/Events/Utilities_Events_ZeaWheelEvent.ZeaWheelEvent) | The wheel event that occurs. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[onWheel](SceneTree_CAD_PMIItem.PMIItem#onwheel)

#### Defined in

[src/SceneTree/TreeItem.ts:845](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L845)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[once](SceneTree_CAD_PMIItem.PMIItem#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L82)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[parameterValueChanged](SceneTree_CAD_PMIItem.PMIItem#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L124)

___

### propagateVisibility

▸ **propagateVisibility**(`val`): `void`

Updates current TreeItem visible state and propagates its value to children elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[propagateVisibility](SceneTree_CAD_PMIItem.PMIItem#propagatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:204](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L204)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Load the binary data for this class

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader param. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context param. |

#### Returns

`void`

#### Overrides

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[readBinary](SceneTree_CAD_PMIItem.PMIItem#readbinary)

#### Defined in

[src/SceneTree/CAD/PMIView.ts:132](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L132)

___

### removeAllChildren

▸ **removeAllChildren**(): `void`

Removes all children Items.

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeAllChildren](SceneTree_CAD_PMIItem.PMIItem#removeallchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:646](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L646)

___

### removeChild

▸ **removeChild**(`index`): `void`

Removes a child TreeItem by specifying its index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeChild](SceneTree_CAD_PMIItem.PMIItem#removechild)

#### Defined in

[src/SceneTree/TreeItem.ts:608](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L608)

___

### removeChildByHandle

▸ **removeChildByHandle**(`childItem`): `void`

Removes the provided item from this TreeItem if it is one of its children.
An exception is thrown if the item is not a child of this tree item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The child TreeItem to remove. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeChildByHandle](SceneTree_CAD_PMIItem.PMIItem#removechildbyhandle)

#### Defined in

[src/SceneTree/TreeItem.ts:637](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L637)

___

### removeChildByName

▸ **removeChildByName**(`name`): `void`

Removes a child TreeItem by specifying its name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name param. |

#### Returns

`void`

- Return the child TreeItem.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeChildByName](SceneTree_CAD_PMIItem.PMIItem#removechildbyname)

#### Defined in

[src/SceneTree/TreeItem.ts:624](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L624)

___

### removeHighlight

▸ **removeHighlight**(`name`, `propagateToChildren?`): `void`

Removes a highlight to the tree item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the tree item. |
| `propagateToChildren` | `boolean` | `false` | A boolean indicating whether to propagate to children. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeHighlight](SceneTree_CAD_PMIItem.PMIItem#removehighlight)

#### Defined in

[src/SceneTree/CAD/PMIItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIItem.ts#L99)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeListenerById](SceneTree_CAD_PMIItem.PMIItem#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L134)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[removeParameter](SceneTree_CAD_PMIItem.PMIItem#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L176)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[replaceParameter](SceneTree_CAD_PMIItem.PMIItem#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L198)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`, `displayError?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem) \| [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` \| `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |
| `displayError` | `boolean` | `false` | - |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem) \| [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- The return value.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[resolvePath](SceneTree_CAD_PMIItem.PMIItem#resolvepath)

#### Defined in

[src/SceneTree/TreeItem.ts:680](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L680)

___

### setBoundingBoxDirty

▸ `Private` **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setBoundingBoxDirty](SceneTree_CAD_PMIItem.PMIItem#setboundingboxdirty)

#### Defined in

[src/SceneTree/TreeItem.ts:365](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L365)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setMetadata](SceneTree_CAD_PMIItem.PMIItem#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L254)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setName](SceneTree_CAD_PMIItem.PMIItem#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L86)

___

### setOwner

▸ **setOwner**(`parentItem`): `void`

Sets the owner (another TreeItem) of the current TreeItem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The parent item. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setOwner](SceneTree_CAD_PMIItem.PMIItem#setowner)

#### Defined in

[src/SceneTree/TreeItem.ts:121](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L121)

___

### setParentItem

▸ **setParentItem**(`parentItem`): `void`

Sets the parent of current TreeItem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The parent item. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setParentItem](SceneTree_CAD_PMIItem.PMIItem#setparentitem)

#### Defined in

[src/SceneTree/TreeItem.ts:173](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L173)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setSelectable](SceneTree_CAD_PMIItem.PMIItem#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L195)

___

### setSelected

▸ **setSelected**(`sel`): `void`

Changes the current state of the selection of this item.
Note: the PMIView also ajusts the camera when activated.
The camera should have been provided in the AssetLoadContext when the CADAsset was loaded.
```
const asset = new CADAsset()
const context = new AssetLoadContext()
context.camera = renderer.getViewport().getCamera()
asset.load(zcad, context).then(() => {
  console.log("Done")
})
```

**`emits`** `selectedChanged` with selected state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sel` | `boolean` | Boolean indicating the new selection state. |

#### Returns

`void`

#### Overrides

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setSelected](SceneTree_CAD_PMIItem.PMIItem#setselected)

#### Defined in

[src/SceneTree/CAD/PMIView.ts:52](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/PMIView.ts#L52)

___

### setVisible

▸ **setVisible**(`visible`): `void`

Sets visible parameter value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible` | `boolean` |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[setVisible](SceneTree_CAD_PMIItem.PMIItem#setvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L195)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[toJSON](SceneTree_CAD_PMIItem.PMIItem#tojson)

#### Defined in

[src/SceneTree/TreeItem.ts:877](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L877)

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

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[toString](SceneTree_CAD_PMIItem.PMIItem#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L303)

___

### traverse

▸ **traverse**(`callback`, `includeThis?`): `void`

Traverse the tree structure from this point down
and fire the callback for each visited item.
Note: Depth only used by selection sets for now.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callback` | (`treeItem`: [`TreeItem`](../SceneTree_TreeItem.TreeItem), `depth`: `number`) => `unknown` | `undefined` | The callback value. |
| `includeThis` | `boolean` | `true` | Fire the callback for this item. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[traverse](SceneTree_CAD_PMIItem.PMIItem#traverse)

#### Defined in

[src/SceneTree/TreeItem.ts:732](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L732)

___

### unbindChild

▸ `Private` **unbindChild**(`index`, `childItem`): `void`

UnBind an item from the group. This method is called
automatically when an item is removed from the group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | item to unbind. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[unbindChild](SceneTree_CAD_PMIItem.PMIItem#unbindchild)

#### Defined in

[src/SceneTree/TreeItem.ts:587](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L587)

___

### updateChildNameMapping

▸ `Private` **updateChildNameMapping**(`start`): `void`

Updates the internal acceleration structure that speeds up looking up children by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The start value. |

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[updateChildNameMapping](SceneTree_CAD_PMIItem.PMIItem#updatechildnamemapping)

#### Defined in

[src/SceneTree/TreeItem.ts:449](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L449)

___

### updatePath

▸ `Private` **updatePath**(): `void`

The updatePath method.

#### Returns

`void`

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[updatePath](SceneTree_CAD_PMIItem.PMIItem#updatepath)

#### Defined in

[src/SceneTree/TreeItem.ts:152](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L152)

___

### updateVisibility

▸ `Private` **updateVisibility**(): `boolean`

The updateVisibility method.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[updateVisibility](SceneTree_CAD_PMIItem.PMIItem#updatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:214](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L214)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[PMIItem](SceneTree_CAD_PMIItem.PMIItem).[getNumBaseItems](SceneTree_CAD_PMIItem.PMIItem#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L64)

