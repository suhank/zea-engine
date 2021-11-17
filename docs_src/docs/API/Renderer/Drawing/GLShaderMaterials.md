---
id: "Renderer_Drawing_GLShaderMaterials.GLShaderMaterials"
title: "Class: GLShaderMaterials"
sidebar_label: "GLShaderMaterials"
custom_edit_url: null
---



Class representing GL shader materials.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLShaderMaterials`**

## Constructors

### constructor

• **new GLShaderMaterials**(`gl`, `pass`, `shaders`)

Create a GL shader material.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The WebGL Context value. |
| `pass` | [`GLPass`](../Passes/Renderer_Passes_GLPass.GLPass) | The pass that owns this GLShaderMaterials object. |
| `shaders` | `Record`<`string`, `any`\> | The shaders value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:25](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L25)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/BaseClass.ts#L11)

___

### gl

• `Protected` **gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:13](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L13)

___

### glMaterialGeomItemSets

• `Protected` **glMaterialGeomItemSets**: `any`[]

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:18](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L18)

___

### glShader

• `Protected` **glShader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:15](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L15)

___

### glgeomdatashader

• `Protected` **glgeomdatashader**: `any`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:16](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L16)

___

### glselectedshader

• `Protected` **glselectedshader**: `any`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:17](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L17)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/EventEmitter.ts#L26)

___

### pass

• `Protected` **pass**: `any`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:14](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L14)

## Methods

### addGLGeomItem

▸ **addGLGeomItem**(`glGeomItem`, `glGeom`, `glMaterial`): `void`

The addGLGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |
| `glGeom` | [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom) | The glGeomItem value. |
| `glMaterial` | [`GLMaterial`](Renderer_Drawing_GLMaterial.GLMaterial) | The glMaterial value. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:52](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L52)

___

### addMaterialGeomItemSets

▸ **addMaterialGeomItemSets**(`glMaterialGeomItemSets`): `void`

The addMaterialGeomItemSets method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glMaterialGeomItemSets` | `any` | The glMaterialGeomItemSets value. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:66](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L66)

___

### draw

▸ **draw**(`renderstate`): `void`

Draws all elements, binding the shader and continuing into the GLMaterialGeomItemSets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The render state for the current draw traversal |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:106](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L106)

___

### drawGeomData

▸ **drawGeomData**(`renderstate`): `void`

The drawGeomData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `GeomDataRenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:136](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L136)

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:122](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L122)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/EventEmitter.ts#L154)

___

### findMaterialGeomItemSets

▸ **findMaterialGeomItemSets**(`glMaterial`): `any`

The findMaterialGeomItemSets method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glMaterial` | [`GLMaterial`](Renderer_Drawing_GLMaterial.GLMaterial) | The glMaterial value. |

#### Returns

`any`

- The return value.

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:40](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L40)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/BaseClass.ts#L33)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/BaseClass.ts#L25)

___

### getMaterialGeomItemSets

▸ **getMaterialGeomItemSets**(): `any`[]

The getMaterialGeomItemSets method.

#### Returns

`any`[]

- The return value.

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:98](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L98)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[off](../../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/EventEmitter.ts#L44)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/EventEmitter.ts#L82)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Utilities/EventEmitter.ts#L134)

___

### removeMaterialGeomItemSets

▸ **removeMaterialGeomItemSets**(`glMaterialGeomItemSets`): `void`

The removeMaterialGeomItemSets method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glMaterialGeomItemSets` | [`GLMaterialGeomItemSets`](Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets) | The glMaterialGeomItemSets value. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLShaderMaterials.ts:89](https://github.com/ZeaInc/zea-engine/blob/cafd1585c/src/Renderer/Drawing/GLShaderMaterials.ts#L89)

