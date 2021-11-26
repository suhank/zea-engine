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

[SceneTree/MaterialLibrary.ts:25](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L25)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L11)

___

### \_\_images

• `Protected` **\_\_images**: `Record`<`string`, [`BaseImage`](SceneTree_BaseImage.BaseImage)\> = `{}`

#### Defined in

[SceneTree/MaterialLibrary.ts:18](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L18)

___

### \_\_materials

• `Protected` **\_\_materials**: `Record`<`string`, [`Material`](SceneTree_Material.Material)\> = `{}`

#### Defined in

[SceneTree/MaterialLibrary.ts:19](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L19)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[SceneTree/MaterialLibrary.ts:17](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L17)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L26)

___

### lod

• `Protected` **lod**: `number`

#### Defined in

[SceneTree/MaterialLibrary.ts:16](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L16)

___

### name

• `Protected` **name**: `string` = `''`

#### Defined in

[SceneTree/MaterialLibrary.ts:20](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L20)

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

[SceneTree/MaterialLibrary.ts:139](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L139)

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

[SceneTree/MaterialLibrary.ts:107](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L107)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Defined in

[SceneTree/MaterialLibrary.ts:37](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L37)

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

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L154)

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

[SceneTree/MaterialLibrary.ts:212](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L212)

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

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L33)

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

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/BaseClass.ts#L25)

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

[SceneTree/MaterialLibrary.ts:150](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L150)

___

### getImageNames

▸ **getImageNames**(): `any`[]

The getImageNames method.

#### Returns

`any`[]

- The return value.

#### Defined in

[SceneTree/MaterialLibrary.ts:162](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L162)

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

[SceneTree/MaterialLibrary.ts:118](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L118)

___

### getMaterialNames

▸ **getMaterialNames**(): `any`[]

The getMaterialNames method.

#### Returns

`any`[]

- The return value.

#### Defined in

[SceneTree/MaterialLibrary.ts:85](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L85)

___

### getMaterials

▸ **getMaterials**(): [`Material`](SceneTree_Material.Material)[]

The getMaterials method.

#### Returns

[`Material`](SceneTree_Material.Material)[]

- The return value.

#### Defined in

[SceneTree/MaterialLibrary.ts:77](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L77)

___

### getNumMaterials

▸ **getNumMaterials**(): `number`

The getNumMaterials method.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/MaterialLibrary.ts:69](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L69)

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

[SceneTree/MaterialLibrary.ts:48](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L48)

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

[SceneTree/MaterialLibrary.ts:131](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L131)

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

[SceneTree/MaterialLibrary.ts:99](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L99)

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

[SceneTree/MaterialLibrary.ts:178](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L178)

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

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L97)

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

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L44)

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

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L82)

___

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

The readBinary method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Defined in

[SceneTree/MaterialLibrary.ts:233](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L233)

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

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/Utilities/EventEmitter.ts#L134)

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

[SceneTree/MaterialLibrary.ts:61](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L61)

___

### toJSON

▸ **toJSON**(`context?`): `Object`

The toJSON method encodes the current object as a json object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Object`

- Returns the json object.

| Name | Type |
| :------ | :------ |
| `numMaterials` | `number` |

#### Defined in

[SceneTree/MaterialLibrary.ts:201](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L201)

___

### toString

▸ **toString**(): `string`

The toString method.

#### Returns

`string`

- The return value.

#### Defined in

[SceneTree/MaterialLibrary.ts:295](https://github.com/ZeaInc/zea-engine/blob/edee5b48/src/SceneTree/MaterialLibrary.ts#L295)

