---
id: "SceneTree_CAD_XRef.XRef"
title: "Class: XRef"
sidebar_label: "XRef"
custom_edit_url: null
---



Represents a view of PMI data. within a CAD assembly.

## Hierarchy

- [`CADAsset`](SceneTree_CAD_CADAsset.CADAsset)

  ↳ **`XRef`**

## Constructors

### constructor

• **new XRef**(`name?`)

Create a CAD asset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[constructor](SceneTree_CAD_CADAsset.CADAsset#constructor)

#### Defined in

[src/SceneTree/CAD/XRef.ts:21](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/XRef.ts#L21)

## Properties

### \_\_childItems

• `Protected` **\_\_childItems**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItems](SceneTree_CAD_CADAsset.CADAsset#__childitems)

#### Defined in

[src/SceneTree/TreeItem.ts:50](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L50)

___

### \_\_childItemsEventHandlers

• `Protected` **\_\_childItemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItemsEventHandlers](SceneTree_CAD_CADAsset.CADAsset#__childitemseventhandlers)

#### Defined in

[src/SceneTree/TreeItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L51)

___

### \_\_childItemsMapping

• `Protected` **\_\_childItemsMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItemsMapping](SceneTree_CAD_CADAsset.CADAsset#__childitemsmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:52](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L52)

___

### \_\_datafileLoaded

• **\_\_datafileLoaded**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__datafileLoaded](SceneTree_CAD_CADAsset.CADAsset#__datafileloaded)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:23](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L23)

___

### \_\_datafileParam

• **\_\_datafileParam**: `any`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__datafileParam](SceneTree_CAD_CADAsset.CADAsset#__datafileparam)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:24](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L24)

___

### \_\_highlightMapping

• `Protected` **\_\_highlightMapping**: `Record`<`string`, [`Color`](../../Math/Math_Color.Color)\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__highlightMapping](SceneTree_CAD_CADAsset.CADAsset#__highlightmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:77](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L77)

___

### \_\_highlights

• `Protected` **\_\_highlights**: `string`[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__highlights](SceneTree_CAD_CADAsset.CADAsset#__highlights)

#### Defined in

[src/SceneTree/TreeItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L78)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__id](SceneTree_CAD_CADAsset.CADAsset#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L11)

___

### \_\_loadPromise

• **\_\_loadPromise**: `any`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__loadPromise](SceneTree_CAD_CADAsset.CADAsset#__loadpromise)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:21](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L21)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__metaData](SceneTree_CAD_CADAsset.CADAsset#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__name](SceneTree_CAD_CADAsset.CADAsset#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__ownerItem](SceneTree_CAD_CADAsset.CADAsset#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__path](SceneTree_CAD_CADAsset.CADAsset#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__selectable](SceneTree_CAD_CADAsset.CADAsset#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__selected](SceneTree_CAD_CADAsset.CADAsset#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L40)

___

### \_\_visible

• `Protected` **\_\_visible**: `boolean` = `true`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__visible](SceneTree_CAD_CADAsset.CADAsset#__visible)

#### Defined in

[src/SceneTree/TreeItem.ts:80](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L80)

___

### \_\_visibleCounter

• `Protected` **\_\_visibleCounter**: `number` = `1`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__visibleCounter](SceneTree_CAD_CADAsset.CADAsset#__visiblecounter)

#### Defined in

[src/SceneTree/TreeItem.ts:81](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L81)

___

### boundingBoxParam

• **boundingBoxParam**: [`BoundingBoxParameter`](../Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

**`member`** boundingBoxParam - Stores the bounding box for this tree item

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[boundingBoxParam](SceneTree_CAD_CADAsset.CADAsset#boundingboxparam)

#### Defined in

[src/SceneTree/TreeItem.ts:69](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L69)

___

### cadfileVersion

• **cadfileVersion**: [`Version`](../SceneTree_Version.Version)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[cadfileVersion](SceneTree_CAD_CADAsset.CADAsset#cadfileversion)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:19](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L19)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[deprecatedParamMapping](SceneTree_CAD_CADAsset.CADAsset#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L25)

___

### disableBoundingBox

• **disableBoundingBox**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[disableBoundingBox](SceneTree_CAD_CADAsset.CADAsset#disableboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:48](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L48)

___

### engineDataVersion

• `Protected` `Optional` **engineDataVersion**: [`Version`](../SceneTree_Version.Version)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[engineDataVersion](SceneTree_CAD_CADAsset.CADAsset#enginedataversion)

#### Defined in

[src/SceneTree/AssetItem.ts:52](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L52)

___

### geomLibrary

• **geomLibrary**: [`GeomLibrary`](../SceneTree_GeomLibrary.GeomLibrary)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[geomLibrary](SceneTree_CAD_CADAsset.CADAsset#geomlibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:48](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L48)

___

### globalXfoOp

• `Protected` **globalXfoOp**: [`Operator`](../Operators/SceneTree_Operators_Operator.Operator)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[globalXfoOp](SceneTree_CAD_CADAsset.CADAsset#globalxfoop)

#### Defined in

[src/SceneTree/TreeItem.ts:83](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L83)

___

### globalXfoParam

• **globalXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** globalXfoParam - Stores the global Xfo for this tree item.
global xfos are calculated from the localXfo and parentXfo.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[globalXfoParam](SceneTree_CAD_CADAsset.CADAsset#globalxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:58](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L58)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[listeners](SceneTree_CAD_CADAsset.CADAsset#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[loaded](SceneTree_CAD_CADAsset.CADAsset#loaded)

#### Defined in

[src/SceneTree/AssetItem.ts:50](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L50)

___

### localXfoParam

• **localXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

Creates an instance of XRef setting up the initial configuration for Material and Color parameters.

**`param`** The name value.

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[localXfoParam](SceneTree_CAD_CADAsset.CADAsset#localxfoparam)

#### Defined in

[src/SceneTree/CAD/XRef.ts:20](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/XRef.ts#L20)

___

### materialLibrary

• **materialLibrary**: [`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[materialLibrary](SceneTree_CAD_CADAsset.CADAsset#materiallibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:49](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L49)

___

### numCADBodyItems

• **numCADBodyItems**: `number`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[numCADBodyItems](SceneTree_CAD_CADAsset.CADAsset#numcadbodyitems)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:20](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L20)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[paramEventListenerIDs](SceneTree_CAD_CADAsset.CADAsset#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[paramMapping](SceneTree_CAD_CADAsset.CADAsset#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[params](SceneTree_CAD_CADAsset.CADAsset#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L24)

___

### units

• `Protected` **units**: `string` = `'meters'`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[units](SceneTree_CAD_CADAsset.CADAsset#units)

#### Defined in

[src/SceneTree/AssetItem.ts:54](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L54)

___

### unitsScale

• `Protected` **unitsScale**: `number` = `1.0`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[unitsScale](SceneTree_CAD_CADAsset.CADAsset#unitsscale)

#### Defined in

[src/SceneTree/AssetItem.ts:53](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L53)

___

### url

• **url**: `string`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[url](SceneTree_CAD_CADAsset.CADAsset#url)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:22](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L22)

___

### visibleParam

• **visibleParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** visibleParam - Whether this tree item is visible or not.
Any given tree item is also is affected by parent's visibility.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[visibleParam](SceneTree_CAD_CADAsset.CADAsset#visibleparam)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[_cleanBoundingBox](SceneTree_CAD_CADAsset.CADAsset#_cleanboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:340](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L340)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addChild](SceneTree_CAD_CADAsset.CADAsset#addchild)

#### Defined in

[src/SceneTree/TreeItem.ts:536](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L536)

___

### addHighlight

▸ **addHighlight**(`name`, `color`, `propagateToChildren?`): `void`

Adds a highlight to the tree item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the tree item. |
| `color` | [`Color`](../../Math/Math_Color.Color) | `undefined` | The color of the highlight. |
| `propagateToChildren` | `boolean` | `false` | A boolean indicating whether to propagate to children. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addHighlight](SceneTree_CAD_CADAsset.CADAsset#addhighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L244)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addParameter](SceneTree_CAD_CADAsset.CADAsset#addparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addParameterDeprecationMapping](SceneTree_CAD_CADAsset.CADAsset#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/ParameterOwner.ts#L92)

___

### childBBoxChanged

▸ `Private` **childBBoxChanged**(): `void`

The _childBBoxChanged method.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[childBBoxChanged](SceneTree_CAD_CADAsset.CADAsset#childbboxchanged)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[childNameChanged](SceneTree_CAD_CADAsset.CADAsset#childnamechanged)

#### Defined in

[src/SceneTree/TreeItem.ts:462](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L462)

___

### clone

▸ **clone**(`context?`): [`XRef`](SceneTree_CAD_XRef.XRef)

The clone method constructs a new XRef, copies its values
from this item and returns it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) |

#### Returns

[`XRef`](SceneTree_CAD_XRef.XRef)

- The return value.

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[clone](SceneTree_CAD_CADAsset.CADAsset#clone)

#### Defined in

[src/SceneTree/CAD/XRef.ts:32](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/XRef.ts#L32)

___

### copyFrom

▸ **copyFrom**(`src?`, `context?`): `void`

Copies data from the source XRef onto this XRef.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src?` | [`XRef`](SceneTree_CAD_XRef.XRef) | The XRef to copy from. |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

`void`

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[copyFrom](SceneTree_CAD_CADAsset.CADAsset#copyfrom)

#### Defined in

[src/SceneTree/CAD/XRef.ts:44](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/XRef.ts#L44)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[deleteMetadata](SceneTree_CAD_CADAsset.CADAsset#deletemetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[emit](SceneTree_CAD_CADAsset.CADAsset#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context param. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[fromJSON](SceneTree_CAD_CADAsset.CADAsset#fromjson)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:175](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L175)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[generateUniqueName](SceneTree_CAD_CADAsset.CADAsset#generateuniquename)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChild](SceneTree_CAD_CADAsset.CADAsset#getchild)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildByName](SceneTree_CAD_CADAsset.CADAsset#getchildbyname)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildIndex](SceneTree_CAD_CADAsset.CADAsset#getchildindex)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildNames](SceneTree_CAD_CADAsset.CADAsset#getchildnames)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildren](SceneTree_CAD_CADAsset.CADAsset#getchildren)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getClassName](SceneTree_CAD_CADAsset.CADAsset#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L33)

___

### getEngineDataVersion

▸ **getEngineDataVersion**(): [`Version`](../SceneTree_Version.Version)

Returns the zea engine version as an array with major, minor, patch order.

#### Returns

[`Version`](../SceneTree_Version.Version)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getEngineDataVersion](SceneTree_CAD_CADAsset.CADAsset#getenginedataversion)

#### Defined in

[src/SceneTree/AssetItem.ts:87](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L87)

___

### getGeometryLibrary

▸ **getGeometryLibrary**(): [`GeomLibrary`](../SceneTree_GeomLibrary.GeomLibrary)

Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.

#### Returns

[`GeomLibrary`](../SceneTree_GeomLibrary.GeomLibrary)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getGeometryLibrary](SceneTree_CAD_CADAsset.CADAsset#getgeometrylibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:96](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L96)

___

### getHighlight

▸ **getHighlight**(): [`Color`](../../Math/Math_Color.Color)

Returns the color of the current highlight.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The color value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getHighlight](SceneTree_CAD_CADAsset.CADAsset#gethighlight)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getId](SceneTree_CAD_CADAsset.CADAsset#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L25)

___

### getMaterialLibrary

▸ **getMaterialLibrary**(): [`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary)

Returns `MaterialLibrary` that is in charge of storing all materials of current Item.

#### Returns

[`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getMaterialLibrary](SceneTree_CAD_CADAsset.CADAsset#getmateriallibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:105](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L105)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getMetadata](SceneTree_CAD_CADAsset.CADAsset#getmetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getName](SceneTree_CAD_CADAsset.CADAsset#getname)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getNumChildren](SceneTree_CAD_CADAsset.CADAsset#getnumchildren)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getNumParameters](SceneTree_CAD_CADAsset.CADAsset#getnumparameters)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getOwner](SceneTree_CAD_CADAsset.CADAsset#getowner)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameter](SceneTree_CAD_CADAsset.CADAsset#getparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameterByIndex](SceneTree_CAD_CADAsset.CADAsset#getparameterbyindex)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameterIndex](SceneTree_CAD_CADAsset.CADAsset#getparameterindex)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameters](SceneTree_CAD_CADAsset.CADAsset#getparameters)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParentItem](SceneTree_CAD_CADAsset.CADAsset#getparentitem)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getPath](SceneTree_CAD_CADAsset.CADAsset#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L113)

___

### getUnitsConversion

▸ **getUnitsConversion**(): `number`

Returns the scale factor of current item.

#### Returns

`number`

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getUnitsConversion](SceneTree_CAD_CADAsset.CADAsset#getunitsconversion)

#### Defined in

[src/SceneTree/AssetItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L113)

___

### getVersion

▸ **getVersion**(): [`Version`](../SceneTree_Version.Version)

Returns the versioon of the data loaded by thie CADAsset.

#### Returns

[`Version`](../SceneTree_Version.Version)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getVersion](SceneTree_CAD_CADAsset.CADAsset#getversion)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:55](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L55)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[hasMetadata](SceneTree_CAD_CADAsset.CADAsset#hasmetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[hasParameter](SceneTree_CAD_CADAsset.CADAsset#hasparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[insertChild](SceneTree_CAD_CADAsset.CADAsset#insertchild)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[insertParameter](SceneTree_CAD_CADAsset.CADAsset#insertparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isHighlighted](SceneTree_CAD_CADAsset.CADAsset#ishighlighted)

#### Defined in

[src/SceneTree/TreeItem.ts:327](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L327)

___

### isLoaded

▸ **isLoaded**(): `boolean`

Returns the loaded status of current item.

#### Returns

`boolean`

- Returns true if the asset has already loaded its data.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isLoaded](SceneTree_CAD_CADAsset.CADAsset#isloaded)

#### Defined in

[src/SceneTree/AssetItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L78)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isSelectable](SceneTree_CAD_CADAsset.CADAsset#isselectable)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isSelected](SceneTree_CAD_CADAsset.CADAsset#isselected)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isVisible](SceneTree_CAD_CADAsset.CADAsset#isvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L185)

___

### load

▸ **load**(`url`, `context?`): `any`

Loads all the geometries and metadata from the asset file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the asset to load |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The load context object that provides additional data such as paths to external references. |

#### Returns

`any`

- Returns a promise that resolves once the load of the tree is complete. Geometries, textures and other resources might still be loading.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[load](SceneTree_CAD_CADAsset.CADAsset#load)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:83](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L83)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[off](SceneTree_CAD_CADAsset.CADAsset#off)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[on](SceneTree_CAD_CADAsset.CADAsset#on)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerDown](SceneTree_CAD_CADAsset.CADAsset#onpointerdown)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerEnter](SceneTree_CAD_CADAsset.CADAsset#onpointerenter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerLeave](SceneTree_CAD_CADAsset.CADAsset#onpointerleave)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerMove](SceneTree_CAD_CADAsset.CADAsset#onpointermove)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerUp](SceneTree_CAD_CADAsset.CADAsset#onpointerup)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onTouchCancel](SceneTree_CAD_CADAsset.CADAsset#ontouchcancel)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onWheel](SceneTree_CAD_CADAsset.CADAsset#onwheel)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[once](SceneTree_CAD_CADAsset.CADAsset#once)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[parameterValueChanged](SceneTree_CAD_CADAsset.CADAsset#parametervaluechanged)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[propagateVisibility](SceneTree_CAD_CADAsset.CADAsset#propagatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:204](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L204)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Initializes XRef's asset, material, version and layers; adding current `XRef` Geometry Item toall the layers in reader

**`paramreader`** - The reader param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | - |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The load context param. |

#### Returns

`void`

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[readBinary](SceneTree_CAD_CADAsset.CADAsset#readbinary)

#### Defined in

[src/SceneTree/CAD/XRef.ts:62](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/XRef.ts#L62)

___

### readRootLevelBinary

▸ **readRootLevelBinary**(`reader`, `context`): `void`

Initializes CADAsset's asset, material, version and layers; adding current `CADAsset` Geometry Item toall the layers in reader

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader param. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The load context object that provides additional data such as the units of the scene we are loading into. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[readRootLevelBinary](SceneTree_CAD_CADAsset.CADAsset#readrootlevelbinary)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:65](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/CAD/CADAsset.ts#L65)

___

### removeAllChildren

▸ **removeAllChildren**(): `void`

Removes all children Items.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeAllChildren](SceneTree_CAD_CADAsset.CADAsset#removeallchildren)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeChild](SceneTree_CAD_CADAsset.CADAsset#removechild)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeChildByHandle](SceneTree_CAD_CADAsset.CADAsset#removechildbyhandle)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeChildByName](SceneTree_CAD_CADAsset.CADAsset#removechildbyname)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeHighlight](SceneTree_CAD_CADAsset.CADAsset#removehighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:280](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L280)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeListenerById](SceneTree_CAD_CADAsset.CADAsset#removelistenerbyid)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeParameter](SceneTree_CAD_CADAsset.CADAsset#removeparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[replaceParameter](SceneTree_CAD_CADAsset.CADAsset#replaceparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[resolvePath](SceneTree_CAD_CADAsset.CADAsset#resolvepath)

#### Defined in

[src/SceneTree/TreeItem.ts:680](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L680)

___

### setBoundingBoxDirty

▸ `Private` **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setBoundingBoxDirty](SceneTree_CAD_CADAsset.CADAsset#setboundingboxdirty)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setMetadata](SceneTree_CAD_CADAsset.CADAsset#setmetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setName](SceneTree_CAD_CADAsset.CADAsset#setname)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setOwner](SceneTree_CAD_CADAsset.CADAsset#setowner)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setParentItem](SceneTree_CAD_CADAsset.CADAsset#setparentitem)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setSelectable](SceneTree_CAD_CADAsset.CADAsset#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L195)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setSelected](SceneTree_CAD_CADAsset.CADAsset#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L219)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setVisible](SceneTree_CAD_CADAsset.CADAsset#setvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L195)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[toJSON](SceneTree_CAD_CADAsset.CADAsset#tojson)

#### Defined in

[src/SceneTree/AssetItem.ts:235](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/AssetItem.ts#L235)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[toString](SceneTree_CAD_CADAsset.CADAsset#tostring)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[traverse](SceneTree_CAD_CADAsset.CADAsset#traverse)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[unbindChild](SceneTree_CAD_CADAsset.CADAsset#unbindchild)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updateChildNameMapping](SceneTree_CAD_CADAsset.CADAsset#updatechildnamemapping)

#### Defined in

[src/SceneTree/TreeItem.ts:449](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/TreeItem.ts#L449)

___

### updatePath

▸ `Private` **updatePath**(): `void`

The updatePath method.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updatePath](SceneTree_CAD_CADAsset.CADAsset#updatepath)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updateVisibility](SceneTree_CAD_CADAsset.CADAsset#updatevisibility)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getNumBaseItems](SceneTree_CAD_CADAsset.CADAsset#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/BaseItem.ts#L64)

