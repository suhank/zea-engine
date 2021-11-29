---
id: "Renderer_Drawing_GLGeom.GLGeom"
title: "Class: GLGeom"
sidebar_label: "GLGeom"
custom_edit_url: null
---



Class representing a GL geom.

## Hierarchy

- [`RefCounted`](../../SceneTree/SceneTree_RefCounted.RefCounted)

  ↳ **`GLGeom`**

  ↳↳ [`GLLines`](Renderer_Drawing_GLLines.GLLines)

  ↳↳ [`GLMesh`](Renderer_Drawing_GLMesh.GLMesh)

  ↳↳ [`GLPoints`](Renderer_Drawing_GLPoints.GLPoints)

## Constructors

### constructor

• **new GLGeom**(`gl`, `geom`)

Create a GL geom.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | `WebGL12RenderingContext` | The webgl rendering context. |
| `geom` | [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) | A geometry object |

#### Overrides

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[constructor](../../SceneTree/SceneTree_RefCounted.RefCounted#constructor)

#### Defined in

[Renderer/Drawing/GLGeom.ts:20](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L20)

## Properties

### \_\_destroyed

• `Protected` **\_\_destroyed**: `boolean`

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[__destroyed](../../SceneTree/SceneTree_RefCounted.RefCounted#__destroyed)

#### Defined in

[SceneTree/RefCounted.ts:15](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L15)

___

### \_\_geom

• `Protected` **\_\_geom**: [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) \| [`Mesh`](../../SceneTree/Geometry/SceneTree_Geometry_Mesh.Mesh)

#### Defined in

[Renderer/Drawing/GLGeom.ts:9](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L9)

___

### \_\_gl

• `Protected` **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/Drawing/GLGeom.ts:8](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L8)

___

### \_\_glattrbuffers

• `Protected` **\_\_glattrbuffers**: `Record`<`string`, `any`\>

#### Defined in

[Renderer/Drawing/GLGeom.ts:10](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L10)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[__id](../../SceneTree/SceneTree_RefCounted.RefCounted#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L11)

___

### \_\_indexBuffer

• `Protected` **\_\_indexBuffer**: `WebGLBuffer` = `null`

#### Defined in

[Renderer/Drawing/GLGeom.ts:14](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L14)

___

### \_\_refs

• `Protected` **\_\_refs**: [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)[]

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[__refs](../../SceneTree/SceneTree_RefCounted.RefCounted#__refs)

#### Defined in

[SceneTree/RefCounted.ts:14](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L14)

___

### \_\_shaderBindings

• `Protected` **\_\_shaderBindings**: `Record`<`string`, `any`\>

#### Defined in

[Renderer/Drawing/GLGeom.ts:11](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L11)

___

### buffersDirty

• `Protected` **buffersDirty**: `boolean`

#### Defined in

[Renderer/Drawing/GLGeom.ts:12](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L12)

___

### genBufferOpts

• `Protected` **genBufferOpts**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[Renderer/Drawing/GLGeom.ts:13](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L13)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[listeners](../../SceneTree/SceneTree_RefCounted.RefCounted#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L26)

## Methods

### addRef

▸ **addRef**(`referer`): `boolean`

The addRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[addRef](../../SceneTree/SceneTree_RefCounted.RefCounted#addref)

#### Defined in

[SceneTree/RefCounted.ts:51](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L51)

___

### bind

▸ **bind**(`renderstate`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`boolean`

- returns false if the binding failed.

#### Defined in

[Renderer/Drawing/GLGeom.ts:85](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L85)

___

### bindAndDraw

▸ **bindAndDraw**(`renderstate`): `void`

The bindAndDraw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:138](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L138)

___

### clearBuffers

▸ **clearBuffers**(): `void`

The clearBuffers method.

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:146](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L146)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[destroy](../../SceneTree/SceneTree_RefCounted.RefCounted#destroy)

#### Defined in

[Renderer/Drawing/GLGeom.ts:168](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L168)

___

### dirtyBuffers

▸ **dirtyBuffers**(`opts`): `void`

The dirtyBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Record`<`string`, `any`\> | options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool) |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:56](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L56)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:121](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L121)

___

### drawInstanced

▸ **drawInstanced**(`renderstate`, `instanceCount`): `void`

The drawInstanced method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |
| `instanceCount` | `number` | The instanceCount param. |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:130](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L130)

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

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[emit](../../SceneTree/SceneTree_RefCounted.RefCounted#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L154)

___

### genBuffers

▸ **genBuffers**(`renderstate?`): `any`

The genBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`any`

#### Defined in

[Renderer/Drawing/GLGeom.ts:66](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L66)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[getClassName](../../SceneTree/SceneTree_RefCounted.RefCounted#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/BaseClass.ts#L33)

___

### getGeom

▸ **getGeom**(): [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)

Returns the owned Geometry object

#### Returns

[`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)

- The geometry object.

#### Defined in

[Renderer/Drawing/GLGeom.ts:45](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L45)

___

### getId

▸ **getId**(): `number`

Returns the unique id of the object. Every Object has a unique
identifier which is based on a counter that is incremented.

#### Returns

`number`

- The return value.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[getId](../../SceneTree/SceneTree_RefCounted.RefCounted#getid)

#### Defined in

[SceneTree/RefCounted.ts:34](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L34)

___

### getRefIndex

▸ **getRefIndex**(`referer`): `number`

The getRefIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`number`

- The return value.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[getRefIndex](../../SceneTree/SceneTree_RefCounted.RefCounted#getrefindex)

#### Defined in

[SceneTree/RefCounted.ts:89](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L89)

___

### getRefer

▸ **getRefer**(`index`): [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)

The getRefer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)

- The return value.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[getRefer](../../SceneTree/SceneTree_RefCounted.RefCounted#getrefer)

#### Defined in

[SceneTree/RefCounted.ts:80](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L80)

___

### isDestroyed

▸ **isDestroyed**(): `boolean`

Returns true if this object has already been destroyed.

#### Returns

`boolean`

- Returns true or false.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[isDestroyed](../../SceneTree/SceneTree_RefCounted.RefCounted#isdestroyed)

#### Defined in

[SceneTree/RefCounted.ts:97](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L97)

___

### numRefs

▸ **numRefs**(): `number`

The numRefs method.

#### Returns

`number`

- The return value.

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[numRefs](../../SceneTree/SceneTree_RefCounted.RefCounted#numrefs)

#### Defined in

[SceneTree/RefCounted.ts:42](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L42)

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

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[off](../../SceneTree/SceneTree_RefCounted.RefCounted#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L97)

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

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[on](../../SceneTree/SceneTree_RefCounted.RefCounted#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L44)

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

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[once](../../SceneTree/SceneTree_RefCounted.RefCounted#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L82)

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

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[removeListenerById](../../SceneTree/SceneTree_RefCounted.RefCounted#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Utilities/EventEmitter.ts#L134)

___

### removeRef

▸ **removeRef**(`referer`): `void`

The removeRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`void`

#### Inherited from

[RefCounted](../../SceneTree/SceneTree_RefCounted.RefCounted).[removeRef](../../SceneTree/SceneTree_RefCounted.RefCounted#removeref)

#### Defined in

[SceneTree/RefCounted.ts:64](https://github.com/ZeaInc/zea-engine/blob/339201283/src/SceneTree/RefCounted.ts#L64)

___

### unbind

▸ **unbind**(`renderstate`): `void`

The unbind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:104](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L104)

___

### updateBuffers

▸ **updateBuffers**(`renderstate?`): `void`

The updateBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | `RenderState` | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[Renderer/Drawing/GLGeom.ts:72](https://github.com/ZeaInc/zea-engine/blob/339201283/src/Renderer/Drawing/GLGeom.ts#L72)

