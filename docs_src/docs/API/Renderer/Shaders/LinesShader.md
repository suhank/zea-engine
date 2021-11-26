---
id: "Renderer_Shaders_LinesShader.LinesShader"
title: "Class: LinesShader"
sidebar_label: "LinesShader"
custom_edit_url: null
---



## Hierarchy

- [`GLShader`](../Renderer_GLShader.GLShader)

  ↳ **`LinesShader`**

## Constructors

### constructor

• **new LinesShader**(`gl?`)

Create a GL shader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl?` | `WebGL12RenderingContext` | The webgl rendering context. |

#### Overrides

[GLShader](../Renderer_GLShader.GLShader).[constructor](../Renderer_GLShader.GLShader#constructor)

#### Defined in

[Renderer/Shaders/LinesShader.ts:19](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Shaders/LinesShader.ts#L19)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__gl](../Renderer_GLShader.GLShader#__gl)

#### Defined in

[Renderer/GLShader.ts:26](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L26)

___

### \_\_gltextures

• `Protected` **\_\_gltextures**: `Record`<`string`, `any`\>

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__gltextures](../Renderer_GLShader.GLShader#__gltextures)

#### Defined in

[Renderer/GLShader.ts:30](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L30)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__id](../Renderer_GLShader.GLShader#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__metaData](../Renderer_GLShader.GLShader#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__name](../Renderer_GLShader.GLShader#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../../SceneTree/SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__ownerItem](../Renderer_GLShader.GLShader#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__path](../Renderer_GLShader.GLShader#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__selectable](../Renderer_GLShader.GLShader#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__selected](../Renderer_GLShader.GLShader#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L38)

___

### \_\_shaderCompilationAttempted

• `Protected` **\_\_shaderCompilationAttempted**: `boolean`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__shaderCompilationAttempted](../Renderer_GLShader.GLShader#__shadercompilationattempted)

#### Defined in

[Renderer/GLShader.ts:33](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L33)

___

### \_\_shaderProgramHdls

• `Protected` **\_\_shaderProgramHdls**: `Record`<`string`, `any`\>

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__shaderProgramHdls](../Renderer_GLShader.GLShader#__shaderprogramhdls)

#### Defined in

[Renderer/GLShader.ts:29](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L29)

___

### \_\_shaderStages

• `Protected` **\_\_shaderStages**: `Record`<`string`, `ShaderParseResult`\>

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__shaderStages](../Renderer_GLShader.GLShader#__shaderstages)

#### Defined in

[Renderer/GLShader.ts:28](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L28)

___

### \_\_shaderStagesGLSL

• `Protected` **\_\_shaderStagesGLSL**: `Record`<`string`, `string`\>

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__shaderStagesGLSL](../Renderer_GLShader.GLShader#__shaderstagesglsl)

#### Defined in

[Renderer/GLShader.ts:27](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L27)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[deprecatedParamMapping](../Renderer_GLShader.GLShader#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L23)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[listeners](../Renderer_GLShader.GLShader#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[paramEventListenerIDs](../Renderer_GLShader.GLShader#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[paramMapping](../Renderer_GLShader.GLShader#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[params](../Renderer_GLShader.GLShader#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L22)

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
| `shaderopts` | `Shaderopts` | The shaderopts value. |

#### Returns

`WebGLShader`

- The return value.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__compileShaderStage](../Renderer_GLShader.GLShader#__compileshaderstage)

#### Defined in

[Renderer/GLShader.ts:122](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L122)

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

[GLShader](../Renderer_GLShader.GLShader).[__createProgram](../Renderer_GLShader.GLShader#__createprogram)

#### Defined in

[Renderer/GLShader.ts:211](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L211)

___

### \_\_extractAttributeAndUniformLocations

▸ `Private` **__extractAttributeAndUniformLocations**(`shaderProgramHdl`, `shaderopts`): `Record`<`string`, `any`\>

The __extractAttributeAndUniformLocations method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderProgramHdl` | `WebGLProgram` | The shaderProgramHdl value. |
| `shaderopts` | `Shaderopts` | The shaderopts value. |

#### Returns

`Record`<`string`, `any`\>

- The dictionary of attributes and uniform values

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[__extractAttributeAndUniformLocations](../Renderer_GLShader.GLShader#__extractattributeanduniformlocations)

#### Defined in

[Renderer/GLShader.ts:295](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L295)

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

[GLShader](../Renderer_GLShader.GLShader).[addParameter](../Renderer_GLShader.GLShader#addparameter)

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

[GLShader](../Renderer_GLShader.GLShader).[addParameterDeprecationMapping](../Renderer_GLShader.GLShader#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L90)

___

### bind

▸ **bind**(`renderstate`, `key?`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `key?` | `string` | The key value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[bind](../Renderer_GLShader.GLShader#bind)

#### Defined in

[Renderer/GLShader.ts:425](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L425)

___

### clearProgramsCache

▸ **clearProgramsCache**(): `void`

Clears all cached shader compilations for this shader.

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[clearProgramsCache](../Renderer_GLShader.GLShader#clearprogramscache)

#### Defined in

[Renderer/GLShader.ts:81](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L81)

___

### clone

▸ **clone**(`context?`): [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

[`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[clone](../Renderer_GLShader.GLShader#clone)

#### Defined in

[SceneTree/BaseItem.ts:317](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L317)

___

### compile

▸ **compile**(): `void`

The compile method.

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[compile](../Renderer_GLShader.GLShader#compile)

#### Defined in

[Renderer/GLShader.ts:415](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L415)

___

### compileForTarget

▸ **compileForTarget**(`key?`, `shaderopts?`): `Record`<`string`, `any`\>

The compileForTarget method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key?` | `string` | The key value. |
| `shaderopts?` | `Shaderopts` | The shaderopts value. |

#### Returns

`Record`<`string`, `any`\>

- The result of the shader compilation.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[compileForTarget](../Renderer_GLShader.GLShader#compilefortarget)

#### Defined in

[Renderer/GLShader.ts:398](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L398)

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
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[copyFrom](../Renderer_GLShader.GLShader#copyfrom)

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

[GLShader](../Renderer_GLShader.GLShader).[deleteMetadata](../Renderer_GLShader.GLShader#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L261)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[destroy](../Renderer_GLShader.GLShader#destroy)

#### Defined in

[Renderer/GLShader.ts:524](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L524)

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

[GLShader](../Renderer_GLShader.GLShader).[emit](../Renderer_GLShader.GLShader#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/EventEmitter.ts#L154)

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

[GLShader](../Renderer_GLShader.GLShader).[fromJSON](../Renderer_GLShader.GLShader#fromjson)

#### Defined in

[SceneTree/BaseItem.ts:287](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L287)

___

### getAttributes

▸ **getAttributes**(): `Record`<`string`, `any`\>

The getAttributes method.

#### Returns

`Record`<`string`, `any`\>

- The dictionary of attributes that this shader expects to be bound.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getAttributes](../Renderer_GLShader.GLShader#getattributes)

#### Defined in

[Renderer/GLShader.ts:359](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L359)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getClassName](../Renderer_GLShader.GLShader#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Utilities/BaseClass.ts#L33)

___

### getGeomDataShaderName

▸ **getGeomDataShaderName**(): `string`

The getGeomDataShaderName method.

#### Returns

`string`

- an array of param declarations that the shader expects the material tp provide.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getGeomDataShaderName](../Renderer_GLShader.GLShader#getgeatashadername)

#### Defined in

[Renderer/GLShader.ts:478](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L478)

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

[GLShader](../Renderer_GLShader.GLShader).[getId](../Renderer_GLShader.GLShader#getid)

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

[GLShader](../Renderer_GLShader.GLShader).[getMetadata](../Renderer_GLShader.GLShader#getmetadata)

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

[GLShader](../Renderer_GLShader.GLShader).[getName](../Renderer_GLShader.GLShader#getname)

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

[GLShader](../Renderer_GLShader.GLShader).[getNumParameters](../Renderer_GLShader.GLShader#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L39)

___

### getOwner

▸ **getOwner**(): [`Owner`](../../SceneTree/SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../../SceneTree/SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getOwner](../Renderer_GLShader.GLShader#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L154)

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

[GLShader](../Renderer_GLShader.GLShader).[getParameter](../Renderer_GLShader.GLShader#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L100)

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

[GLShader](../Renderer_GLShader.GLShader).[getParameterByIndex](../Renderer_GLShader.GLShader#getparameterbyindex)

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

[GLShader](../Renderer_GLShader.GLShader).[getParameterIndex](../Renderer_GLShader.GLShader#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getParameters](../Renderer_GLShader.GLShader#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L48)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getPath](../Renderer_GLShader.GLShader#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L111)

___

### getSelectedShaderName

▸ **getSelectedShaderName**(): `string`

The getSelectedShaderName method.

#### Returns

`string`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getSelectedShaderName](../Renderer_GLShader.GLShader#getselectedshadername)

#### Defined in

[Renderer/GLShader.ts:485](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L485)

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

[GLShader](../Renderer_GLShader.GLShader).[getShaderStage](../Renderer_GLShader.GLShader#getshaderstage)

#### Defined in

[Renderer/GLShader.ts:74](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L74)

___

### getUniforms

▸ **getUniforms**(): `Record`<`string`, `string`\>

The getUniforms method.

#### Returns

`Record`<`string`, `string`\>

- The dictionary of uniforms that this shader expects to be bound.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getUniforms](../Renderer_GLShader.GLShader#getuniforms)

#### Defined in

[Renderer/GLShader.ts:373](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L373)

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

[GLShader](../Renderer_GLShader.GLShader).[hasMetadata](../Renderer_GLShader.GLShader#hasmetadata)

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

[GLShader](../Renderer_GLShader.GLShader).[hasParameter](../Renderer_GLShader.GLShader#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L78)

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

[GLShader](../Renderer_GLShader.GLShader).[insertParameter](../Renderer_GLShader.GLShader#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L147)

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

[GLShader](../Renderer_GLShader.GLShader).[isCompiledForTarget](../Renderer_GLShader.GLShader#iscompiledfortarget)

#### Defined in

[Renderer/GLShader.ts:387](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L387)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[isSelectable](../Renderer_GLShader.GLShader#isselectable)

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

[GLShader](../Renderer_GLShader.GLShader).[isSelected](../Renderer_GLShader.GLShader#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L207)

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

[GLShader](../Renderer_GLShader.GLShader).[off](../Renderer_GLShader.GLShader#off)

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

[GLShader](../Renderer_GLShader.GLShader).[on](../Renderer_GLShader.GLShader#on)

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

[GLShader](../Renderer_GLShader.GLShader).[once](../Renderer_GLShader.GLShader#once)

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

[GLShader](../Renderer_GLShader.GLShader).[parameterValueChanged](../Renderer_GLShader.GLShader#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L122)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[readBinary](../Renderer_GLShader.GLShader#readbinary)

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

[GLShader](../Renderer_GLShader.GLShader).[removeListenerById](../Renderer_GLShader.GLShader#removelistenerbyid)

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

[GLShader](../Renderer_GLShader.GLShader).[removeParameter](../Renderer_GLShader.GLShader#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L174)

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

[GLShader](../Renderer_GLShader.GLShader).[replaceParameter](../Renderer_GLShader.GLShader#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L196)

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

[GLShader](../Renderer_GLShader.GLShader).[resolvePath](../Renderer_GLShader.GLShader#resolvepath)

#### Defined in

[SceneTree/BaseItem.ts:126](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L126)

___

### setGLContext

▸ **setGLContext**(`gl`): `void`

Sets the GL context to the shader.
> Note: normally the context should be passed to the constructor. This method us used when using the Registry to construct shaders.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The webgl rendering context. |

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[setGLContext](../Renderer_GLShader.GLShader#setglcontext)

#### Defined in

[Renderer/GLShader.ts:55](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L55)

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

[GLShader](../Renderer_GLShader.GLShader).[setMetadata](../Renderer_GLShader.GLShader#setmetadata)

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

[GLShader](../Renderer_GLShader.GLShader).[setName](../Renderer_GLShader.GLShader#setname)

#### Defined in

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L84)

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

[GLShader](../Renderer_GLShader.GLShader).[setOwner](../Renderer_GLShader.GLShader#setowner)

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

[GLShader](../Renderer_GLShader.GLShader).[setSelectable](../Renderer_GLShader.GLShader#setselectable)

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

[GLShader](../Renderer_GLShader.GLShader).[setSelected](../Renderer_GLShader.GLShader#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L217)

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

[GLShader](../Renderer_GLShader.GLShader).[setShaderStage](../Renderer_GLShader.GLShader#setshaderstage)

#### Defined in

[Renderer/GLShader.ts:64](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L64)

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

[GLShader](../Renderer_GLShader.GLShader).[toJSON](../Renderer_GLShader.GLShader#tojson)

#### Defined in

[SceneTree/BaseItem.ts:274](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L274)

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

[GLShader](../Renderer_GLShader.GLShader).[toString](../Renderer_GLShader.GLShader#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/ParameterOwner.ts#L301)

___

### unbind

▸ **unbind**(`renderstate`): `boolean`

The unbind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[unbind](../Renderer_GLShader.GLShader#unbind)

#### Defined in

[Renderer/GLShader.ts:463](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L463)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[updatePath](../Renderer_GLShader.GLShader#updatepath)

#### Defined in

[SceneTree/BaseItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L99)

___

### getMaterialTemplate

▸ `Static` **getMaterialTemplate**(): [`Material`](../../SceneTree/SceneTree_Material.Material)

Each shader provides a template material that each material instance is
based on. The shader specifies the parameters needed by the shader, and
the material provides values to the shader during rendering.

#### Returns

[`Material`](../../SceneTree/SceneTree_Material.Material)

- The template material value.

#### Overrides

[GLShader](../Renderer_GLShader.GLShader).[getMaterialTemplate](../Renderer_GLShader.GLShader#getmaterialtemplate)

#### Defined in

[Renderer/Shaders/LinesShader.ts:54](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Shaders/LinesShader.ts#L54)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[getNumBaseItems](../Renderer_GLShader.GLShader#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/SceneTree/BaseItem.ts#L62)

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

#### Overrides

[GLShader](../Renderer_GLShader.GLShader).[getPackedMaterialData](../Renderer_GLShader.GLShader#getpackedmaterialdata)

#### Defined in

[Renderer/Shaders/LinesShader.ts:30](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/Shaders/LinesShader.ts#L30)

___

### isOverlay

▸ `Static` **isOverlay**(): `boolean`

The isOverlay method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[isOverlay](../Renderer_GLShader.GLShader#isoverlay)

#### Defined in

[Renderer/GLShader.ts:106](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L106)

___

### isTransparent

▸ `Static` **isTransparent**(): `boolean`

The isTransparent method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[isTransparent](../Renderer_GLShader.GLShader#istransparent)

#### Defined in

[Renderer/GLShader.ts:98](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L98)

___

### supportsInstancing

▸ `Static` **supportsInstancing**(): `boolean`

The supportsInstancing method.

#### Returns

`boolean`

- return false for shaders that cannot be rendered in instanced mode.

#### Inherited from

[GLShader](../Renderer_GLShader.GLShader).[supportsInstancing](../Renderer_GLShader.GLShader#supportsinstancing)

#### Defined in

[Renderer/GLShader.ts:493](https://github.com/ZeaInc/zea-engine/blob/7209671e2/src/Renderer/GLShader.ts#L493)

