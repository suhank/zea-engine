---
id: "SceneTree_Groups_CuttingPlane.CuttingPlane"
title: "Class: CuttingPlane"
sidebar_label: "CuttingPlane"
custom_edit_url: null
---



Groups are a special type of `BaseGroup` that allows you to gather/classify/organize/modify
multiple items contained within the group. Items can be added to the group directly, or using
its path.
All parameters set to the group are also set to the children; in other words, it's a faster way
to apply common things to multiple items.

**Parameters**
* **CutAwayEnabled(`BooleanParameter`):** _todo_
* **CutPlaneNormal(`Vec3Parameter`):** _todo_
* **CutPlaneDist(`NumberParameter`):** _todo_

## Hierarchy

- [`BaseGroup`](SceneTree_Groups_BaseGroup.BaseGroup)

  ↳ **`CuttingPlane`**

## Constructors

### constructor

• **new CuttingPlane**(`name?`)

Creates an instance of a group.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the group. |

#### Overrides

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[constructor](SceneTree_Groups_BaseGroup.BaseGroup#constructor)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L39)

## Properties

### \_\_childItems

• `Protected` **\_\_childItems**: [`BaseItem`](../SceneTree_BaseItem.BaseItem)[] = `[]`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__childItems](SceneTree_Groups_BaseGroup.BaseGroup#__childitems)

#### Defined in

[SceneTree/TreeItem.ts:43](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L43)

___

### \_\_childItemsEventHandlers

• `Protected` **\_\_childItemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__childItemsEventHandlers](SceneTree_Groups_BaseGroup.BaseGroup#__childitemseventhandlers)

#### Defined in

[SceneTree/TreeItem.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L44)

___

### \_\_childItemsMapping

• `Protected` **\_\_childItemsMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__childItemsMapping](SceneTree_Groups_BaseGroup.BaseGroup#__childitemsmapping)

#### Defined in

[SceneTree/TreeItem.ts:45](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L45)

___

### \_\_highlightMapping

• `Protected` **\_\_highlightMapping**: `Record`<`string`, [`Color`](../../Math/Math_Color.Color)\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__highlightMapping](SceneTree_Groups_BaseGroup.BaseGroup#__highlightmapping)

#### Defined in

[SceneTree/TreeItem.ts:70](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L70)

___

### \_\_highlights

• `Protected` **\_\_highlights**: `string`[] = `[]`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__highlights](SceneTree_Groups_BaseGroup.BaseGroup#__highlights)

#### Defined in

[SceneTree/TreeItem.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L71)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__id](SceneTree_Groups_BaseGroup.BaseGroup#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_itemsEventHandlers

• `Protected` **\_\_itemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__itemsEventHandlers](SceneTree_Groups_BaseGroup.BaseGroup#__itemseventhandlers)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:27](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L27)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__metaData](SceneTree_Groups_BaseGroup.BaseGroup#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__name](SceneTree_Groups_BaseGroup.BaseGroup#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner)

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__ownerItem](SceneTree_Groups_BaseGroup.BaseGroup#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__path](SceneTree_Groups_BaseGroup.BaseGroup#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__selectable](SceneTree_Groups_BaseGroup.BaseGroup#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__selected](SceneTree_Groups_BaseGroup.BaseGroup#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L38)

___

### \_\_visible

• `Protected` **\_\_visible**: `boolean` = `true`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__visible](SceneTree_Groups_BaseGroup.BaseGroup#__visible)

#### Defined in

[SceneTree/TreeItem.ts:73](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L73)

___

### \_\_visibleCounter

• `Protected` **\_\_visibleCounter**: `number` = `1`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[__visibleCounter](SceneTree_Groups_BaseGroup.BaseGroup#__visiblecounter)

#### Defined in

[SceneTree/TreeItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L74)

___

### boundingBoxParam

• **boundingBoxParam**: [`BoundingBoxParameter`](../Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

**`member`** boundingBoxParam - Stores the bounding box for this tree item

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[boundingBoxParam](SceneTree_Groups_BaseGroup.BaseGroup#boundingboxparam)

#### Defined in

[SceneTree/TreeItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L62)

___

### cutAwayEnabledParam

• **cutAwayEnabledParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:31](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L31)

___

### cutPlaneOp

• **cutPlaneOp**: [`CuttingPlaneOperator`](../Operators/SceneTree_Operators_CuttingPlaneOperator.CuttingPlaneOperator)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:30](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L30)

___

### cutPlaneParam

• **cutPlaneParam**: [`Vec4Parameter`](../Parameters/SceneTree_Parameters_Vec4Parameter.Vec4Parameter)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:32](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L32)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[deprecatedParamMapping](SceneTree_Groups_BaseGroup.BaseGroup#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L23)

___

### disableBoundingBox

• **disableBoundingBox**: `boolean` = `false`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[disableBoundingBox](SceneTree_Groups_BaseGroup.BaseGroup#disableboundingbox)

#### Defined in

[SceneTree/TreeItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L41)

___

### globalXfoOp

• `Protected` **globalXfoOp**: [`Operator`](../Operators/SceneTree_Operators_Operator.Operator)

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[globalXfoOp](SceneTree_Groups_BaseGroup.BaseGroup#globalxfoop)

#### Defined in

[SceneTree/TreeItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L76)

___

### globalXfoParam

• **globalXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** globalXfoParam - Stores the global Xfo for this tree item.
global xfos are calculated from the localXfo and parentXfo.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[globalXfoParam](SceneTree_Groups_BaseGroup.BaseGroup#globalxfoparam)

#### Defined in

[SceneTree/TreeItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L51)

___

### itemsParam

• **itemsParam**: [`ItemSetParameter`](../Parameters/SceneTree_Parameters_ItemSetParameter.ItemSetParameter)

**`member`** itemsParam - TODO

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[itemsParam](SceneTree_Groups_BaseGroup.BaseGroup#itemsparam)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L25)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[listeners](SceneTree_Groups_BaseGroup.BaseGroup#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### localXfoParam

• **localXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** localXfoParam - Stores the local Xfo for this tree item.
local Xfos are the offset from the parent's coordinate frame.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[localXfoParam](SceneTree_Groups_BaseGroup.BaseGroup#localxfoparam)

#### Defined in

[SceneTree/TreeItem.ts:57](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L57)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[paramEventListenerIDs](SceneTree_Groups_BaseGroup.BaseGroup#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[paramMapping](SceneTree_Groups_BaseGroup.BaseGroup#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[params](SceneTree_Groups_BaseGroup.BaseGroup#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L22)

___

### searchRoot

• `Optional` **searchRoot**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[searchRoot](SceneTree_Groups_BaseGroup.BaseGroup#searchroot)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:28](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L28)

___

### visibleParam

• **visibleParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** visibleParam - Whether this tree item is visible or not.
Any given tree item is also is affected by parent's visibility.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[visibleParam](SceneTree_Groups_BaseGroup.BaseGroup#visibleparam)

#### Defined in

[SceneTree/TreeItem.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L68)

## Methods

### \_\_updateCutaway

▸ `Private` **__updateCutaway**(`item`): `void`

The __updateCutaway method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The item in the group. |

#### Returns

`void`

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:75](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L75)

___

### \_\_updateCutawayHelper

▸ `Private` **__updateCutawayHelper**(`item`): `void`

The __updateCutaway method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The item in the group. |

#### Returns

`void`

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L90)

___

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[_cleanBoundingBox](SceneTree_Groups_BaseGroup.BaseGroup#_cleanboundingbox)

#### Defined in

[SceneTree/TreeItem.ts:333](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L333)

___

### addChild

▸ **addChild**(`childItem`, `maintainXfo?`, `fixCollisions?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Adds a child. It accepts all kind of `BaseItem`, not only `TreeItem`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | `undefined` | The child BaseItem to add. |
| `maintainXfo` | `boolean` | `true` | Boolean that determines if the Global Xfo value is maintained. If true, when moving items in the hierarchy from one parent to another, the local Xfo of the item will be modified to maintain and the Global Xfo. Note: this option defaults to false because we expect that is the behavior users would expect when manipulating the tree in code. To be safe and unambiguous, always try to specify this value. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions with other children of the same parent. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

childItem - The child BaseItem that was added.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[addChild](SceneTree_Groups_BaseGroup.BaseGroup#addchild)

#### Defined in

[SceneTree/TreeItem.ts:532](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L532)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[addHighlight](SceneTree_Groups_BaseGroup.BaseGroup#addhighlight)

#### Defined in

[SceneTree/TreeItem.ts:237](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L237)

___

### addItem

▸ **addItem**(`item`, `emit?`): `void`

Adds an item to the group(See `Items` parameter).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The item value. |
| `emit` | `boolean` | `true` | The emit value. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[addItem](SceneTree_Groups_BaseGroup.BaseGroup#additem)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:127](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L127)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[addParameter](SceneTree_Groups_BaseGroup.BaseGroup#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L133)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[addParameterDeprecationMapping](SceneTree_Groups_BaseGroup.BaseGroup#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L90)

___

### bindItem

▸ `Private` **bindItem**(`item`, `index`): `void`

The __bindItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | The item value. |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Overrides

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[bindItem](SceneTree_Groups_BaseGroup.BaseGroup#binditem)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:121](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L121)

___

### childBBoxChanged

▸ `Private` **childBBoxChanged**(): `void`

The _childBBoxChanged method.

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[childBBoxChanged](SceneTree_Groups_BaseGroup.BaseGroup#childbboxchanged)

#### Defined in

[SceneTree/TreeItem.ts:351](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L351)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[childNameChanged](SceneTree_Groups_BaseGroup.BaseGroup#childnamechanged)

#### Defined in

[SceneTree/TreeItem.ts:456](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L456)

___

### clearItems

▸ **clearItems**(`emit?`): `void`

Removes all items from the group.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `emit` | `boolean` | `true` | `true` triggers `valueChanged` event. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[clearItems](SceneTree_Groups_BaseGroup.BaseGroup#clearitems)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L154)

___

### clone

▸ **clone**(`context`): [`CuttingPlane`](SceneTree_Groups_CuttingPlane.CuttingPlane)

The clone method constructs a new group,
copies its values and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

[`CuttingPlane`](SceneTree_Groups_CuttingPlane.CuttingPlane)

- Returns a new cloned group.

#### Overrides

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[clone](SceneTree_Groups_BaseGroup.BaseGroup#clone)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:179](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L179)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies current BaseGroup with all owned items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`BaseGroup`](SceneTree_Groups_BaseGroup.BaseGroup) | The group to copy from. |
| `context?` | `Record`<`string`, `any`\> | The group to copy from. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[copyFrom](SceneTree_Groups_BaseGroup.BaseGroup#copyfrom)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:295](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L295)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[deleteMetadata](SceneTree_Groups_BaseGroup.BaseGroup#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L261)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[emit](SceneTree_Groups_BaseGroup.BaseGroup#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[fromJSON](SceneTree_Groups_BaseGroup.BaseGroup#fromjson)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:251](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L251)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[generateUniqueName](SceneTree_Groups_BaseGroup.BaseGroup#generateuniquename)

#### Defined in

[SceneTree/TreeItem.ts:404](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L404)

___

### getChild

▸ **getChild**(`index`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Returns child element in the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to remove the child TreeItem. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

- Return the child TreeItem.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getChild](SceneTree_Groups_BaseGroup.BaseGroup#getchild)

#### Defined in

[SceneTree/TreeItem.ts:544](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L544)

___

### getChildByName

▸ **getChildByName**(`name`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Returns child element with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

- Return the child BaseItem.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getChildByName](SceneTree_Groups_BaseGroup.BaseGroup#getchildbyname)

#### Defined in

[SceneTree/TreeItem.ts:554](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L554)

___

### getChildIndex

▸ **getChildIndex**(`childItem`): `number`

Returns index position of the specified item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | The child TreeItem value. |

#### Returns

`number`

- Child index in children array.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getChildIndex](SceneTree_Groups_BaseGroup.BaseGroup#getchildindex)

#### Defined in

[SceneTree/TreeItem.ts:659](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L659)

___

### getChildNames

▸ **getChildNames**(): `string`[]

Returns children names as an array of strings.

#### Returns

`string`[]

- An array of names for each child.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getChildNames](SceneTree_Groups_BaseGroup.BaseGroup#getchildnames)

#### Defined in

[SceneTree/TreeItem.ts:567](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L567)

___

### getChildren

▸ **getChildren**(): [`BaseItem`](../SceneTree_BaseItem.BaseItem)[]

Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
Meaning that it could be another kind of item than `TreeItem`.

i.e. **BaseImage**

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)[]

- List of `BaseItem` owned by current TreeItem.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getChildren](SceneTree_Groups_BaseGroup.BaseGroup#getchildren)

#### Defined in

[SceneTree/TreeItem.ts:384](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L384)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getClassName](SceneTree_Groups_BaseGroup.BaseGroup#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

___

### getHighlight

▸ **getHighlight**(): [`Color`](../../Math/Math_Color.Color)

Returns the color of the current highlight.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The color value.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getHighlight](SceneTree_Groups_BaseGroup.BaseGroup#gethighlight)

#### Defined in

[SceneTree/TreeItem.ts:307](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L307)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getId](SceneTree_Groups_BaseGroup.BaseGroup#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

___

### getItems

▸ **getItems**(): `Set`<[`BaseItem`](../SceneTree_BaseItem.BaseItem)\>

Returns the list of `BaseItem` objects owned by the group.

#### Returns

`Set`<[`BaseItem`](../SceneTree_BaseItem.BaseItem)\>

- The return value.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getItems](SceneTree_Groups_BaseGroup.BaseGroup#getitems)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:171](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L171)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getMetadata](SceneTree_Groups_BaseGroup.BaseGroup#getmetadata)

#### Defined in

[SceneTree/BaseItem.ts:232](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L232)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getName](SceneTree_Groups_BaseGroup.BaseGroup#getname)

#### Defined in

[SceneTree/BaseItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L74)

___

### getNumChildren

▸ **getNumChildren**(): `number`

Returns the number of child elements current `TreeItem` has.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getNumChildren](SceneTree_Groups_BaseGroup.BaseGroup#getnumchildren)

#### Defined in

[SceneTree/TreeItem.ts:393](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L393)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getNumParameters](SceneTree_Groups_BaseGroup.BaseGroup#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L39)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getOwner](SceneTree_Groups_BaseGroup.BaseGroup#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L154)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getParameter](SceneTree_Groups_BaseGroup.BaseGroup#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L100)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getParameterByIndex](SceneTree_Groups_BaseGroup.BaseGroup#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L68)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getParameterIndex](SceneTree_Groups_BaseGroup.BaseGroup#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getParameters](SceneTree_Groups_BaseGroup.BaseGroup#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L48)

___

### getParentItem

▸ **getParentItem**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns the parent of current TreeItem.

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Returns the parent item.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getParentItem](SceneTree_Groups_BaseGroup.BaseGroup#getparentitem)

#### Defined in

[SceneTree/TreeItem.ts:157](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L157)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getPath](SceneTree_Groups_BaseGroup.BaseGroup#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L111)

___

### getSelectable

▸ **getSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getSelectable](SceneTree_Groups_BaseGroup.BaseGroup#getselectable)

#### Defined in

[SceneTree/BaseItem.ts:183](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L183)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[hasMetadata](SceneTree_Groups_BaseGroup.BaseGroup#hasmetadata)

#### Defined in

[SceneTree/BaseItem.ts:242](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L242)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[hasParameter](SceneTree_Groups_BaseGroup.BaseGroup#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L78)

___

### insertChild

▸ **insertChild**(`childItem`, `index`, `maintainXfo?`, `fixCollisions?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Inserts a child. It accepts all kind of `BaseItem`, not only `TreeItem`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | `undefined` | The child BaseItem to insert. |
| `index` | `number` | `undefined` | The index to add the child item. |
| `maintainXfo` | `boolean` | `false` | Boolean that determines if the Xfo value is maintained. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

- The index of the child item in this items children array.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[insertChild](SceneTree_Groups_BaseGroup.BaseGroup#insertchild)

#### Defined in

[SceneTree/TreeItem.ts:473](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L473)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[insertParameter](SceneTree_Groups_BaseGroup.BaseGroup#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L147)

___

### isHighlighted

▸ **isHighlighted**(): `boolean`

Returns `true` if this items has a highlight color assigned.

#### Returns

`boolean`

- `True` if this item is highlighted.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[isHighlighted](SceneTree_Groups_BaseGroup.BaseGroup#ishighlighted)

#### Defined in

[SceneTree/TreeItem.ts:320](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L320)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[isSelected](SceneTree_Groups_BaseGroup.BaseGroup#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L207)

___

### isVisible

▸ **isVisible**(): `boolean`

Returns visible parameter value for current TreeItem.

#### Returns

`boolean`

- The visible param value.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[isVisible](SceneTree_Groups_BaseGroup.BaseGroup#isvisible)

#### Defined in

[SceneTree/TreeItem.ts:178](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L178)

___

### loadDone

▸ `Private` **loadDone**(): `void`

called once loading is done.

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[loadDone](SceneTree_Groups_BaseGroup.BaseGroup#loaddone)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:285](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L285)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[off](SceneTree_Groups_BaseGroup.BaseGroup#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L97)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[on](SceneTree_Groups_BaseGroup.BaseGroup#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

___

### onPointerDown

▸ `Private` **onPointerDown**(`event`): `void`

Occurs when a user presses a mouse button over an element.
Note: these methods are useful for debugging mouse event propagation to groups

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `MouseEvent` \| `TouchEvent` | The mouse event that occurs. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[onPointerDown](SceneTree_Groups_BaseGroup.BaseGroup#onpointerdown)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:195](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L195)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Causes an event to occur when the mouse pointer is moved onto an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The mouse event that occurs. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[onPointerEnter](SceneTree_Groups_BaseGroup.BaseGroup#onpointerenter)

#### Defined in

[SceneTree/TreeItem.ts:797](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L797)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Causes an event to occur when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The mouse event that occurs. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[onPointerLeave](SceneTree_Groups_BaseGroup.BaseGroup#onpointerleave)

#### Defined in

[SceneTree/TreeItem.ts:810](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L810)

___

### onPointerMove

▸ `Private` **onPointerMove**(`event`): `void`

Occur when the mouse pointer is moving  while over an element.
Note: these methods are useful for debugging mouse event propagation to groups

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `MouseEvent` \| `TouchEvent` | The mouse event that occurs. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[onPointerMove](SceneTree_Groups_BaseGroup.BaseGroup#onpointermove)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:216](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L216)

___

### onPointerUp

▸ `Private` **onPointerUp**(`event`): `void`

Occurs when a user releases a mouse button over an element.
Note: these methods are useful for debugging mouse event propagation to groups

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `MouseEvent` \| `TouchEvent` | The mouse event that occurs. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[onPointerUp](SceneTree_Groups_BaseGroup.BaseGroup#onpointerup)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:206](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L206)

___

### onWheel

▸ **onWheel**(`event`): `void`

Causes an event to occur when the mouse wheel is rolled up or down over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The wheel event that occurs. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[onWheel](SceneTree_Groups_BaseGroup.BaseGroup#onwheel)

#### Defined in

[SceneTree/TreeItem.ts:823](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L823)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[once](SceneTree_Groups_BaseGroup.BaseGroup#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L82)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[parameterValueChanged](SceneTree_Groups_BaseGroup.BaseGroup#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L122)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[propagateVisibility](SceneTree_Groups_BaseGroup.BaseGroup#propagatevisibility)

#### Defined in

[SceneTree/TreeItem.ts:197](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L197)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters & children) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[readBinary](SceneTree_Groups_BaseGroup.BaseGroup#readbinary)

#### Defined in

[SceneTree/TreeItem.ts:962](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L962)

___

### removeAllChildren

▸ **removeAllChildren**(): `void`

Removes all children Items.

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeAllChildren](SceneTree_Groups_BaseGroup.BaseGroup#removeallchildren)

#### Defined in

[SceneTree/TreeItem.ts:645](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L645)

___

### removeChild

▸ **removeChild**(`index`): `void`

Removes a child BaseItem by specifying its index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeChild](SceneTree_Groups_BaseGroup.BaseGroup#removechild)

#### Defined in

[SceneTree/TreeItem.ts:606](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L606)

___

### removeChildByHandle

▸ **removeChildByHandle**(`childItem`): `void`

Removes the provided item from this TreeItem if it is one of its children.
An exception is thrown if the item is not a child of this tree item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | The child TreeItem to remove. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeChildByHandle](SceneTree_Groups_BaseGroup.BaseGroup#removechildbyhandle)

#### Defined in

[SceneTree/TreeItem.ts:635](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L635)

___

### removeChildByName

▸ **removeChildByName**(`name`): `void`

Removes a child BaseItem by specifying its name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name param. |

#### Returns

`void`

- Return the child TreeItem.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeChildByName](SceneTree_Groups_BaseGroup.BaseGroup#removechildbyname)

#### Defined in

[SceneTree/TreeItem.ts:622](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L622)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeHighlight](SceneTree_Groups_BaseGroup.BaseGroup#removehighlight)

#### Defined in

[SceneTree/TreeItem.ts:273](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L273)

___

### removeItem

▸ **removeItem**(`item`, `emit?`): `void`

Removes an item from the group(See `Items` parameter).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The item value. |
| `emit` | `boolean` | `true` | The emit value. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeItem](SceneTree_Groups_BaseGroup.BaseGroup#removeitem)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:141](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L141)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeListenerById](SceneTree_Groups_BaseGroup.BaseGroup#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[removeParameter](SceneTree_Groups_BaseGroup.BaseGroup#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L174)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[replaceParameter](SceneTree_Groups_BaseGroup.BaseGroup#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L196)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[resolvePath](SceneTree_Groups_BaseGroup.BaseGroup#resolvepath)

#### Defined in

[SceneTree/TreeItem.ts:679](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L679)

___

### setBoundingBoxDirty

▸ `Private` **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setBoundingBoxDirty](SceneTree_Groups_BaseGroup.BaseGroup#setboundingboxdirty)

#### Defined in

[SceneTree/TreeItem.ts:359](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L359)

___

### setItems

▸ **setItems**(`items`): `void`

Sets an entire new array of items to the BaseGroup replacing any previous items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | `Set`<[`BaseItem`](../SceneTree_BaseItem.BaseItem)\> | List of `BaseItem` you want to add to the group |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setItems](SceneTree_Groups_BaseGroup.BaseGroup#setitems)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:180](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L180)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setMetadata](SceneTree_Groups_BaseGroup.BaseGroup#setmetadata)

#### Defined in

[SceneTree/BaseItem.ts:252](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L252)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setName](SceneTree_Groups_BaseGroup.BaseGroup#setname)

#### Defined in

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L84)

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

The setOwner method assigns a new owner to the item. The owner of a group becomes its search root unless another search root is already set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The new owner item. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setOwner](SceneTree_Groups_BaseGroup.BaseGroup#setowner)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:64](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L64)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setParentItem](SceneTree_Groups_BaseGroup.BaseGroup#setparentitem)

#### Defined in

[SceneTree/TreeItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L166)

___

### setSearchRoot

▸ **setSearchRoot**(`treeItem`): `void`

 sets the root item to be used as the search root.

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setSearchRoot](SceneTree_Groups_BaseGroup.BaseGroup#setsearchroot)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:55](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L55)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setSelectable](SceneTree_Groups_BaseGroup.BaseGroup#setselectable)

#### Defined in

[SceneTree/BaseItem.ts:193](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L193)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setSelected](SceneTree_Groups_BaseGroup.BaseGroup#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L217)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[setVisible](SceneTree_Groups_BaseGroup.BaseGroup#setvisible)

#### Defined in

[SceneTree/TreeItem.ts:188](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L188)

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

- Returns the json object.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[toJSON](SceneTree_Groups_BaseGroup.BaseGroup#tojson)

#### Defined in

[SceneTree/Groups/BaseGroup.ts:229](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/BaseGroup.ts#L229)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[toString](SceneTree_Groups_BaseGroup.BaseGroup#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:299](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L299)

___

### traverse

▸ **traverse**(`callback`, `includeThis?`): `void`

Traverse the tree structure from this point down
and fire the callback for each visited item.
Note: Depth only used by selection sets for now.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callback` | (...`args`: `any`[]) => `unknown` | `undefined` | The callback value. |
| `includeThis` | `boolean` | `true` | Fire the callback for this item. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[traverse](SceneTree_Groups_BaseGroup.BaseGroup#traverse)

#### Defined in

[SceneTree/TreeItem.ts:731](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L731)

___

### unbindChild

▸ `Private` **unbindChild**(`index`, `childItem`): `void`

UnBind an item from the group. This method is called
automatically when an item is removed from the group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `childItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | item to unbind. |

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[unbindChild](SceneTree_Groups_BaseGroup.BaseGroup#unbindchild)

#### Defined in

[SceneTree/TreeItem.ts:583](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L583)

___

### unbindItem

▸ `Private` **unbindItem**(`item`, `index`): `void`

The unbindItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | The item value. |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Overrides

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[unbindItem](SceneTree_Groups_BaseGroup.BaseGroup#unbinditem)

#### Defined in

[SceneTree/Groups/CuttingPlane.ts:157](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/Groups/CuttingPlane.ts#L157)

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

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[updateChildNameMapping](SceneTree_Groups_BaseGroup.BaseGroup#updatechildnamemapping)

#### Defined in

[SceneTree/TreeItem.ts:443](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L443)

___

### updatePath

▸ `Private` **updatePath**(): `void`

The updatePath method.

#### Returns

`void`

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[updatePath](SceneTree_Groups_BaseGroup.BaseGroup#updatepath)

#### Defined in

[SceneTree/TreeItem.ts:145](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L145)

___

### updateVisibility

▸ `Private` **updateVisibility**(): `boolean`

The __updateVisibility method.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[updateVisibility](SceneTree_Groups_BaseGroup.BaseGroup#updatevisibility)

#### Defined in

[SceneTree/TreeItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L207)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[BaseGroup](SceneTree_Groups_BaseGroup.BaseGroup).[getNumBaseItems](SceneTree_Groups_BaseGroup.BaseGroup#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L62)
