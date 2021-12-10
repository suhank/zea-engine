---
id: "SceneTree_Materials_FlatSurfaceMaterial.FlatSurfaceMaterial"
title: "Class: FlatSurfaceMaterial"
sidebar_label: "FlatSurfaceMaterial"
custom_edit_url: null
---



## Hierarchy

- [`Material`](../SceneTree_Material.Material)

  ↳ **`FlatSurfaceMaterial`**

## Constructors

### constructor

• **new FlatSurfaceMaterial**(`name?`)

Create a material

#### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

#### Overrides

[Material](../SceneTree_Material.Material).[constructor](../SceneTree_Material.Material#constructor)

#### Defined in

[SceneTree/Materials/FlatSurfaceMaterial.ts:8](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Materials/FlatSurfaceMaterial.ts#L8)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[Material](../SceneTree_Material.Material).[__id](../SceneTree_Material.Material#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/BaseClass.ts#L11)

___

### \_\_isTextured

• `Protected` **\_\_isTextured**: `boolean` = `false`

#### Inherited from

[Material](../SceneTree_Material.Material).[__isTextured](../SceneTree_Material.Material#__istextured)

#### Defined in

[SceneTree/Material.ts:32](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L32)

___

### \_\_isTransparent

• `Protected` **\_\_isTransparent**: `boolean` = `false`

#### Inherited from

[Material](../SceneTree_Material.Material).[__isTransparent](../SceneTree_Material.Material#__istransparent)

#### Defined in

[SceneTree/Material.ts:31](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L31)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[Material](../SceneTree_Material.Material).[__metaData](../SceneTree_Material.Material#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[Material](../SceneTree_Material.Material).[__name](../SceneTree_Material.Material#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[Material](../SceneTree_Material.Material).[__ownerItem](../SceneTree_Material.Material#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[Material](../SceneTree_Material.Material).[__path](../SceneTree_Material.Material#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[Material](../SceneTree_Material.Material).[__selectable](../SceneTree_Material.Material#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[Material](../SceneTree_Material.Material).[__selected](../SceneTree_Material.Material#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L38)

___

### \_\_shaderName

• `Protected` **\_\_shaderName**: `string` = `''`

#### Inherited from

[Material](../SceneTree_Material.Material).[__shaderName](../SceneTree_Material.Material#__shadername)

#### Defined in

[SceneTree/Material.ts:33](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L33)

___

### baseColorParam

• **baseColorParam**: [`MaterialColorParam`](../Parameters/SceneTree_Parameters_MaterialColorParam.MaterialColorParam)

#### Defined in

[SceneTree/Materials/FlatSurfaceMaterial.ts:7](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Materials/FlatSurfaceMaterial.ts#L7)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[Material](../SceneTree_Material.Material).[deprecatedParamMapping](../SceneTree_Material.Material#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L23)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[Material](../SceneTree_Material.Material).[listeners](../SceneTree_Material.Material#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[Material](../SceneTree_Material.Material).[paramEventListenerIDs](../SceneTree_Material.Material#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[Material](../SceneTree_Material.Material).[paramMapping](../SceneTree_Material.Material#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[Material](../SceneTree_Material.Material).[params](../SceneTree_Material.Material#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L22)

## Methods

### \_\_checkTextures

▸ **__checkTextures**(`event?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[__checkTextures](../SceneTree_Material.Material#__checktextures)

#### Defined in

[SceneTree/Material.ts:180](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L180)

___

### \_\_checkTransparency

▸ **__checkTransparency**(`event?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[__checkTransparency](../SceneTree_Material.Material#__checktransparency)

#### Defined in

[SceneTree/Material.ts:134](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L134)

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

[Material](../SceneTree_Material.Material).[addParameter](../SceneTree_Material.Material#addparameter)

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

[Material](../SceneTree_Material.Material).[addParameterDeprecationMapping](../SceneTree_Material.Material#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L90)

___

### clone

▸ **clone**(`context?`): [`Material`](../SceneTree_Material.Material)

The clone method constructs a new material, copies its values
from this material and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

[`Material`](../SceneTree_Material.Material)

- Returns a new cloned material.

#### Inherited from

[Material](../SceneTree_Material.Material).[clone](../SceneTree_Material.Material#clone)

#### Defined in

[SceneTree/Material.ts:343](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L343)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

When a Material is copied, first runs `BaseItem` copyFrom method, then sets shader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`Material`](../SceneTree_Material.Material) | The material to copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[copyFrom](../SceneTree_Material.Material#copyfrom)

#### Defined in

[SceneTree/Material.ts:355](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L355)

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

[Material](../SceneTree_Material.Material).[deleteMetadata](../SceneTree_Material.Material#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L261)

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

[Material](../SceneTree_Material.Material).[emit](../SceneTree_Material.Material#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/EventEmitter.ts#L154)

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

#### Inherited from

[Material](../SceneTree_Material.Material).[fromJSON](../SceneTree_Material.Material#fromjson)

#### Defined in

[SceneTree/Material.ts:248](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L248)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[Material](../SceneTree_Material.Material).[getClassName](../SceneTree_Material.Material#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/Utilities/BaseClass.ts#L33)

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

[Material](../SceneTree_Material.Material).[getId](../SceneTree_Material.Material#getid)

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

[Material](../SceneTree_Material.Material).[getMetadata](../SceneTree_Material.Material#getmetadata)

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

[Material](../SceneTree_Material.Material).[getName](../SceneTree_Material.Material#getname)

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

[Material](../SceneTree_Material.Material).[getNumParameters](../SceneTree_Material.Material#getnumparameters)

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

[Material](../SceneTree_Material.Material).[getOwner](../SceneTree_Material.Material#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L154)

___

### getParamTextures

▸ **getParamTextures**(): `Record`<`string`, `any`\>

Returns all texture parameters in current Material.

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[Material](../SceneTree_Material.Material).[getParamTextures](../SceneTree_Material.Material#getparamtextures)

#### Defined in

[SceneTree/Material.ts:113](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L113)

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

[Material](../SceneTree_Material.Material).[getParameter](../SceneTree_Material.Material#getparameter)

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

[Material](../SceneTree_Material.Material).[getParameterByIndex](../SceneTree_Material.Material#getparameterbyindex)

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

[Material](../SceneTree_Material.Material).[getParameterIndex](../SceneTree_Material.Material#getparameterindex)

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

[Material](../SceneTree_Material.Material).[getParameters](../SceneTree_Material.Material#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L48)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[Material](../SceneTree_Material.Material).[getPath](../SceneTree_Material.Material#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L111)

___

### getShaderClass

▸ **getShaderClass**(): typeof [`GLShader`](../../Renderer/Renderer_GLShader.GLShader)

Returns shaders class of current material, if set. Otherwise it returns `undefined`

#### Returns

typeof [`GLShader`](../../Renderer/Renderer_GLShader.GLShader)

- The return value.

#### Inherited from

[Material](../SceneTree_Material.Material).[getShaderClass](../SceneTree_Material.Material#getshaderclass)

#### Defined in

[SceneTree/Material.ts:222](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L222)

___

### getShaderName

▸ **getShaderName**(): `string`

Getter for the shader name.

#### Returns

`string`

- Returns the shader name.

#### Inherited from

[Material](../SceneTree_Material.Material).[getShaderName](../SceneTree_Material.Material#getshadername)

#### Defined in

[SceneTree/Material.ts:48](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L48)

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

[Material](../SceneTree_Material.Material).[hasMetadata](../SceneTree_Material.Material#hasmetadata)

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

[Material](../SceneTree_Material.Material).[hasParameter](../SceneTree_Material.Material#hasparameter)

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

[Material](../SceneTree_Material.Material).[insertParameter](../SceneTree_Material.Material#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/ParameterOwner.ts#L147)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[Material](../SceneTree_Material.Material).[isSelectable](../SceneTree_Material.Material#isselectable)

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

[Material](../SceneTree_Material.Material).[isSelected](../SceneTree_Material.Material#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L207)

___

### isTextured

▸ **isTextured**(): `boolean`

Checks if the material has a texture applied. The renderer can use this to optimize rendering of non-textured objects

#### Returns

`boolean`

- Returns true if the material is textured.

#### Inherited from

[Material](../SceneTree_Material.Material).[isTextured](../SceneTree_Material.Material#istextured)

#### Defined in

[SceneTree/Material.ts:176](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L176)

___

### isTransparent

▸ **isTransparent**(): `boolean`

Checks if the material is transparent by checking the `Opacity` parameter.

#### Returns

`boolean`

- Returns true if the material is transparent.

#### Inherited from

[Material](../SceneTree_Material.Material).[isTransparent](../SceneTree_Material.Material#istransparent)

#### Defined in

[SceneTree/Material.ts:130](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L130)

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

[Material](../SceneTree_Material.Material).[off](../SceneTree_Material.Material#off)

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

[Material](../SceneTree_Material.Material).[on](../SceneTree_Material.Material#on)

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

[Material](../SceneTree_Material.Material).[once](../SceneTree_Material.Material#once)

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
| `event` | `Record`<`string`, `any`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[parameterValueChanged](../SceneTree_Material.Material#parametervaluechanged)

#### Defined in

[SceneTree/Material.ts:211](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L211)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including Shaders and Materials) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[readBinary](../SceneTree_Material.Material#readbinary)

#### Defined in

[SceneTree/Material.ts:274](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L274)

___

### removeAllTextures

▸ **removeAllTextures**(): `void`

Remove all textures from Material's parameters.

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[removeAllTextures](../SceneTree_Material.Material#removealltextures)

#### Defined in

[SceneTree/Material.ts:95](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L95)

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

[Material](../SceneTree_Material.Material).[removeListenerById](../SceneTree_Material.Material#removelistenerbyid)

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

[Material](../SceneTree_Material.Material).[removeParameter](../SceneTree_Material.Material#removeparameter)

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

[Material](../SceneTree_Material.Material).[replaceParameter](../SceneTree_Material.Material#replaceparameter)

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

[Material](../SceneTree_Material.Material).[resolvePath](../SceneTree_Material.Material#resolvepath)

#### Defined in

[SceneTree/BaseItem.ts:126](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L126)

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

[Material](../SceneTree_Material.Material).[setMetadata](../SceneTree_Material.Material#setmetadata)

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

[Material](../SceneTree_Material.Material).[setName](../SceneTree_Material.Material#setname)

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

[Material](../SceneTree_Material.Material).[setOwner](../SceneTree_Material.Material#setowner)

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

[Material](../SceneTree_Material.Material).[setSelectable](../SceneTree_Material.Material#setselectable)

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

[Material](../SceneTree_Material.Material).[setSelected](../SceneTree_Material.Material#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L217)

___

### setShaderName

▸ **setShaderName**(`shaderName`): `void`

Sets shader by using the name of the class with the script.
It is important that the shader is registered in `Registry`, otherwise it will error.
See all classes that extend from `GLShader`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |

#### Returns

`void`

#### Inherited from

[Material](../SceneTree_Material.Material).[setShaderName](../SceneTree_Material.Material#setshadername)

#### Defined in

[SceneTree/Material.ts:59](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L59)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes the current object as a json object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Inherited from

[Material](../SceneTree_Material.Material).[toJSON](../SceneTree_Material.Material#tojson)

#### Defined in

[SceneTree/Material.ts:235](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/Material.ts#L235)

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

[Material](../SceneTree_Material.Material).[toString](../SceneTree_Material.Material#tostring)

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

[Material](../SceneTree_Material.Material).[updatePath](../SceneTree_Material.Material#updatepath)

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

[Material](../SceneTree_Material.Material).[getNumBaseItems](../SceneTree_Material.Material#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/999d3f1c8/src/SceneTree/BaseItem.ts#L62)

