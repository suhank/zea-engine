---
id: "Renderer_Shaders_EnvProjectionShader.LatLongEnvProjectionShader"
title: "Class: LatLongEnvProjectionShader"
sidebar_label: "LatLongEnvProjectionShader"
custom_edit_url: null
---



## Hierarchy

- [`EnvProjectionShader`](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader)

  ↳ **`LatLongEnvProjectionShader`**

## Constructors

### constructor

• **new LatLongEnvProjectionShader**(`gl`)

Create a GL shader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |

#### Overrides

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[constructor](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#constructor)

#### Defined in

[src/Renderer/Shaders/EnvProjectionShader.ts:46](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/Shaders/EnvProjectionShader.ts#L46)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__gl](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__gl)

#### Defined in

[src/Renderer/GLShader.ts:28](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L28)

___

### \_\_gltextures

• `Protected` **\_\_gltextures**: `Record`<`string`, `any`\>

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__gltextures](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__gltextures)

#### Defined in

[src/Renderer/GLShader.ts:32](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L32)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__id](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__metaData](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__name](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../../SceneTree/SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__ownerItem](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__path](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__selectable](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__selected](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L40)

___

### \_\_shaderCompilationAttempted

• `Protected` **\_\_shaderCompilationAttempted**: `boolean`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__shaderCompilationAttempted](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__shadercompilationattempted)

#### Defined in

[src/Renderer/GLShader.ts:35](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L35)

___

### \_\_shaderProgramHdls

• `Protected` **\_\_shaderProgramHdls**: `Record`<`string`, `any`\>

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__shaderProgramHdls](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__shaderprogramhdls)

#### Defined in

[src/Renderer/GLShader.ts:31](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L31)

___

### \_\_shaderStages

• `Protected` **\_\_shaderStages**: `Record`<`string`, [`ShaderParseResult`](../types/Renderer_types_renderer.ShaderParseResult)\>

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__shaderStages](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__shaderstages)

#### Defined in

[src/Renderer/GLShader.ts:30](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L30)

___

### \_\_shaderStagesGLSL

• `Protected` **\_\_shaderStagesGLSL**: `Record`<`string`, `string`\>

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__shaderStagesGLSL](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__shaderstagesglsl)

#### Defined in

[src/Renderer/GLShader.ts:29](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L29)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[deprecatedParamMapping](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L25)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[listeners](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[paramEventListenerIDs](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[paramMapping](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[params](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L24)

## Methods

### \_\_compileShaderStage

▸ `Private` **__compileShaderStage**(`glsl`, `stageID`, `name`, `shaderopts`): `WebGLShader`

The __compileShaderStage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glsl` | `string` | The glsl value. |
| `stageID` | `number` | The stageID value. |
| `name` | `string` | The name value. |


#### Returns

`WebGLShader`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__compileShaderStage](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__compileshaderstage)

#### Defined in

[src/Renderer/GLShader.ts:124](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L124)

___

### \_\_createProgram

▸ `Private` **__createProgram**(`shaderopts`): ``false`` \| `Record`<`string`, `any`\>

The __createProgram method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderopts` | `Record`<`string`, `any`\> | The shaderopts value. |

#### Returns

``false`` \| `Record`<`string`, `any`\>

- The program value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__createProgram](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__createprogram)

#### Defined in

[src/Renderer/GLShader.ts:213](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L213)

___

### \_\_extractAttributeAndUniformLocations

▸ `Private` **__extractAttributeAndUniformLocations**(`shaderProgramHdl`, `shaderopts`): `Record`<`string`, `any`\>

The __extractAttributeAndUniformLocations method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderProgramHdl` | `WebGLProgram` | The shaderProgramHdl value. |


#### Returns

`Record`<`string`, `any`\>

- The dictionary of attributes and uniform values

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[__extractAttributeAndUniformLocations](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#__extractattributeanduniformlocations)

#### Defined in

[src/Renderer/GLShader.ts:297](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L297)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[addParameter](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L135)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[addParameterDeprecationMapping](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L92)

___

### bind

▸ **bind**(`renderstate`, `key?`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `key?` | `string` | The key value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[bind](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#bind)

#### Defined in

[src/Renderer/GLShader.ts:427](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L427)

___

### clearProgramsCache

▸ **clearProgramsCache**(): `void`

Clears all cached shader compilations for this shader.

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[clearProgramsCache](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#clearprogramscache)

#### Defined in

[src/Renderer/GLShader.ts:83](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L83)

___

### clone

▸ **clone**(`context?`): [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`CloneContext`](../../SceneTree/SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

[`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[clone](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#clone)

#### Defined in

[src/SceneTree/BaseItem.ts:319](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L319)

___

### compile

▸ **compile**(): `void`

The compile method.

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[compile](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#compile)

#### Defined in

[src/Renderer/GLShader.ts:417](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L417)

___

### compileForTarget

▸ **compileForTarget**(`key?`, `shaderopts?`): `Record`<`string`, `any`\>

The compileForTarget method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key value. |


#### Returns

`Record`<`string`, `any`\>

- The result of the shader compilation.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[compileForTarget](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#compilefortarget)

#### Defined in

[src/Renderer/GLShader.ts:400](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L400)

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
| `src` | [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem) | The BaseItem to copy from. |
| `context?` | [`CloneContext`](../../SceneTree/SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[copyFrom](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#copyfrom)

#### Defined in

[src/SceneTree/BaseItem.ts:335](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L335)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[deleteMetadata](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L263)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[destroy](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#destroy)

#### Defined in

[src/Renderer/GLShader.ts:526](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L526)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[emit](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L154)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[fromJSON](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#fromjson)

#### Defined in

[src/SceneTree/BaseItem.ts:289](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L289)

___

### getAttributes

▸ **getAttributes**(): `Record`<`string`, `any`\>

The getAttributes method.

#### Returns

`Record`<`string`, `any`\>

- The dictionary of attributes that this shader expects to be bound.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getAttributes](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getattributes)

#### Defined in

[src/Renderer/GLShader.ts:361](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L361)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getClassName](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L33)

___

### getGeomDataShaderName

▸ **getGeomDataShaderName**(): `string`

The getGeomDataShaderName method.

#### Returns

`string`

- an array of param declarations that the shader expects the material tp provide.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getGeomDataShaderName](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getgeatashadername)

#### Defined in

[src/Renderer/GLShader.ts:480](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L480)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getId](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/BaseClass.ts#L25)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getMetadata](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getName](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L76)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getNumParameters](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../../SceneTree/SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../../SceneTree/SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getOwner](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L156)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getParameter](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getParameterByIndex](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L70)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getParameterIndex](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getParameters](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L50)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getPath](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L113)

___

### getSelectedShaderName

▸ **getSelectedShaderName**(): `string`

The getSelectedShaderName method.

#### Returns

`string`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getSelectedShaderName](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getselectedshadername)

#### Defined in

[src/Renderer/GLShader.ts:487](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L487)

___

### getShaderStage

▸ **getShaderStage**(`stageName`): `string`

Gets the GLSL code for a given shader stage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stageName` | `string` | The name of the stage. currently only 'VERTEX_SHADER' or 'FRAGMENT_SHADER' are supported. |

#### Returns

`string`

- The GLSL code for the shader stage.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getShaderStage](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getshaderstage)

#### Defined in

[src/Renderer/GLShader.ts:76](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L76)

___

### getUniforms

▸ **getUniforms**(): `Record`<`string`, `string`\>

The getUniforms method.

#### Returns

`Record`<`string`, `string`\>

- The dictionary of uniforms that this shader expects to be bound.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getUniforms](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getuniforms)

#### Defined in

[src/Renderer/GLShader.ts:375](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L375)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[hasMetadata](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L244)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[hasParameter](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L80)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[insertParameter](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L149)

___

### isCompiledForTarget

▸ **isCompiledForTarget**(`key`): `boolean`

Checks to see if the engine is compiled for the target specified by the key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[isCompiledForTarget](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#iscompiledfortarget)

#### Defined in

[src/Renderer/GLShader.ts:389](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L389)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[isSelectable](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[isSelected](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L209)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[off](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L97)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[on](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L44)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[once](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L82)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[parameterValueChanged](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L124)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[readBinary](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#readbinary)

#### Defined in

[src/SceneTree/BaseItem.ts:300](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L300)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[removeListenerById](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Utilities/EventEmitter.ts#L134)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[removeParameter](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[replaceParameter](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L198)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`): [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem) \| [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |

#### Returns

[`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem) \| [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[resolvePath](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#resolvepath)

#### Defined in

[src/SceneTree/BaseItem.ts:128](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L128)

___

### setGLContext

▸ **setGLContext**(`gl`): `void`

Sets the GL context to the shader.
> Note: normally the context should be passed to the constructor. This method us used when using the Registry to construct shaders.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setGLContext](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setglcontext)

#### Defined in

[src/Renderer/GLShader.ts:57](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L57)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setMetadata](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L254)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setName](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L86)

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

The setOwner method assigns a new owner to the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem) \| [`Owner`](../../SceneTree/SceneTree_Owner.Owner) | The new owner item. |

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setOwner](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setowner)

#### Defined in

[src/SceneTree/BaseItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L166)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setSelectable](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L195)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setSelected](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L219)

___

### setShaderStage

▸ **setShaderStage**(`stageName`, `glsl`): `void`

Sets the GLSL code for a given shader stage.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stageName` | `string` | The name of the stage. currently only 'VERTEX_SHADER' or 'FRAGMENT_SHADER' are supported. |
| `glsl` | `string` | The GLSL code for the shader stage. |

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[setShaderStage](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#setshaderstage)

#### Defined in

[src/Renderer/GLShader.ts:66](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L66)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[toJSON](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#tojson)

#### Defined in

[src/SceneTree/BaseItem.ts:276](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L276)

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

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[toString](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/ParameterOwner.ts#L303)

___

### unbind

▸ **unbind**(`renderstate`): `boolean`

The unbind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`boolean`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[unbind](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#unbind)

#### Defined in

[src/Renderer/GLShader.ts:465](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L465)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[updatePath](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#updatepath)

#### Defined in

[src/SceneTree/BaseItem.ts:101](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L101)

___

### getMaterialTemplate

▸ `Static` **getMaterialTemplate**(): [`Material`](../../SceneTree/SceneTree_Material.Material)

Each shader provides a template material that each material instance is
based on. The shader specifies the parameters needed by the shader, and
the material provides values to the shader during rendering.

#### Returns

[`Material`](../../SceneTree/SceneTree_Material.Material)

- The template material value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getMaterialTemplate](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getmaterialtemplate)

#### Defined in

[src/Renderer/GLShader.ts:515](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L515)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getNumBaseItems](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/SceneTree/BaseItem.ts#L64)

___

### getPackedMaterialData

▸ `Static` **getPackedMaterialData**(`material`): `Float32Array`

The getPackedMaterialData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `material` | [`Material`](../../SceneTree/SceneTree_Material.Material) | The material param. |

#### Returns

`Float32Array`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[getPackedMaterialData](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#getpackedmaterialdata)

#### Defined in

[src/Renderer/GLShader.ts:504](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L504)

___

### isOverlay

▸ `Static` **isOverlay**(): `boolean`

The isOverlay method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[isOverlay](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#isoverlay)

#### Defined in

[src/Renderer/GLShader.ts:108](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L108)

___

### isTransparent

▸ `Static` **isTransparent**(): `boolean`

The isTransparent method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[isTransparent](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#istransparent)

#### Defined in

[src/Renderer/GLShader.ts:100](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L100)

___

### supportsInstancing

▸ `Static` **supportsInstancing**(): `boolean`

The supportsInstancing method.

#### Returns

`boolean`

- return false for shaders that cannot be rendered in instanced mode.

#### Inherited from

[EnvProjectionShader](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader).[supportsInstancing](Renderer_Shaders_EnvProjectionShader.EnvProjectionShader#supportsinstancing)

#### Defined in

[src/Renderer/GLShader.ts:495](https://github.com/ZeaInc/zea-engine/blob/455b10853/src/Renderer/GLShader.ts#L495)

