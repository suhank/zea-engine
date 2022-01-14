---
id: "SceneTree_MaterialLibrary.MaterialLibrary"
title: "Class: MaterialLibrary"
sidebar_label: "MaterialLibrary"
custom_edit_url: null
---



Class representing a material library in a scene tree.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`MaterialLibrary`**

## Implements

- [`Owner`](SceneTree_Owner.Owner)

## Constructors

### constructor

• **new MaterialLibrary**(`name?`)

Create a material library.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `'MaterialLibrary'` | The name of the material library. |

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/MaterialLibrary.ts:26](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L26)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L11)

___

### \_\_images

• `Protected` **\_\_images**: `Record`<`string`, [`BaseImage`](SceneTree_BaseImage.BaseImage)\> = `{}`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:19](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L19)

___

### \_\_materials

• `Protected` **\_\_materials**: `Record`<`string`, [`Material`](SceneTree_Material.Material)\> = `{}`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:20](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L20)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:18](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L18)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L26)

___

### lod

• `Protected` **lod**: `number`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:17](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L17)

___

### name

• `Protected` **name**: `string` = `''`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:21](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L21)

## Methods

### addImage

▸ **addImage**(`image`): `void`

The addImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | [`BaseImage`](SceneTree_BaseImage.BaseImage) | The image value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:140](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L140)

___

### addMaterial

▸ **addMaterial**(`material`): `void`

Add a material.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `material` | [`Material`](SceneTree_Material.Material) | The material value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:108](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L108)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:38](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L38)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:213](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L213)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L33)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/BaseClass.ts#L25)

___

### getImage

▸ **getImage**(`name`, `assert?`): [`BaseImage`](SceneTree_BaseImage.BaseImage)

The getImage method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The material name. |
| `assert` | `boolean` | `true` | The assert value. |

#### Returns

[`BaseImage`](SceneTree_BaseImage.BaseImage)

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:151](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L151)

___

### getImageNames

▸ **getImageNames**(): `string`[]

The getImageNames method.

#### Returns

`string`[]

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:163](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L163)

___

### getMaterial

▸ **getMaterial**(`name`, `assert?`): [`Material`](SceneTree_Material.Material)

The getMaterial method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The material name. |
| `assert` | `boolean` | `true` | The assert value. |

#### Returns

[`Material`](SceneTree_Material.Material)

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:119](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L119)

___

### getMaterialNames

▸ **getMaterialNames**(): `string`[]

The getMaterialNames method.

#### Returns

`string`[]

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:86](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L86)

___

### getMaterials

▸ **getMaterials**(): [`Material`](SceneTree_Material.Material)[]

The getMaterials method.

#### Returns

[`Material`](SceneTree_Material.Material)[]

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:78](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L78)

___

### getNumMaterials

▸ **getNumMaterials**(): `number`

The getNumMaterials method.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:70](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L70)

___

### getPath

▸ **getPath**(): `string`[]

The getPath method.

#### Returns

`string`[]

- The return value.

#### Implementation of

[Owner](SceneTree_Owner.Owner).[getPath](SceneTree_Owner.Owner#getpath)

#### Defined in

[src/SceneTree/MaterialLibrary.ts:49](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L49)

___

### hasImage

▸ **hasImage**(`name`): `boolean`

The hasImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The material name. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:132](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L132)

___

### hasMaterial

▸ **hasMaterial**(`name`): `boolean`

The hasMaterial method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:100](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L100)

___

### load

▸ **load**(`filePath`): `void`

The load method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filePath` | `string` | The file path. |

#### Returns

`void`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:179](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L179)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[off](../Utilities/Utilities_EventEmitter.EventEmitter#off)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L44)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[once](../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L82)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

The readBinary method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/MaterialLibrary.ts:234](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L234)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/Utilities/EventEmitter.ts#L134)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`): [`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` \| `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- The return value.

#### Implementation of

[Owner](SceneTree_Owner.Owner).[resolvePath](SceneTree_Owner.Owner#resolvepath)

#### Defined in

[src/SceneTree/MaterialLibrary.ts:62](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L62)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes the current object as a json object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:202](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L202)

___

### toString

▸ **toString**(): `string`

The toString method.

#### Returns

`string`

- The return value.

#### Defined in

[src/SceneTree/MaterialLibrary.ts:292](https://github.com/ZeaInc/zea-engine/blob/92469dc96/src/SceneTree/MaterialLibrary.ts#L292)

