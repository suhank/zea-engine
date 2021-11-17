---
id: "Utilities_EventEmitter.EventEmitter"
title: "Class: EventEmitter"
sidebar_label: "EventEmitter"
custom_edit_url: null
---



Provides an interface for emitting events under given names, and registering listeners to those events.
This is a base class for most classes in the Scene Tree and Renderer, enabling observers to listen to changes throughout the system.
The interface exposed is similar to [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) in Node.

Similar to how the DOM event system in the browser works, events are registered by name.
Example: Registering a listener for a custom event, and then emitting that event.
```javascript
 const ee = new EventEmitter()

 const eventID = ee.on('myEvent', (event) => {
   console.log('My Event was emitted:', event)
 })

 ee.emit('myEvent', { data: 42 })
 // We no longer want to listen to this event, so let's remove the listener.
 ee.removeListenerById('myEvent', eventID)
```

## Hierarchy

- [`BaseClass`](Utilities_BaseClass.BaseClass)

  ↳ **`EventEmitter`**

  ↳↳ [`GLGeomItem`](../Renderer/Drawing/Renderer_Drawing_GLGeomItem.GLGeomItem)

  ↳↳ [`GLGeomItemLibrary`](../Renderer/Drawing/Renderer_Drawing_GLGeomItemLibrary.GLGeomItemLibrary)

  ↳↳ [`GLGeomItemSet`](../Renderer/Drawing/Renderer_Drawing_GLGeomItemSet.GLGeomItemSet)

  ↳↳ [`GLGeomItemSetMultiDraw`](../Renderer/Drawing/Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw)

  ↳↳ [`GLGeomLibrary`](../Renderer/Drawing/Renderer_Drawing_GLGeomLibrary.GLGeomLibrary)

  ↳↳ [`GLMaterial`](../Renderer/Drawing/Renderer_Drawing_GLMaterial.GLMaterial)

  ↳↳ [`GLMaterialGeomItemSets`](../Renderer/Drawing/Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets)

  ↳↳ [`GLShaderGeomSets`](../Renderer/Drawing/Renderer_Drawing_GLShaderGeomSets.GLShaderGeomSets)

  ↳↳ [`GLShaderMaterials`](../Renderer/Drawing/Renderer_Drawing_GLShaderMaterials.GLShaderMaterials)

  ↳↳ [`GLProbe`](../Renderer/Renderer_GLProbe.GLProbe)

  ↳↳ [`GLRenderTarget`](../Renderer/Renderer_GLRenderTarget.GLRenderTarget)

  ↳↳ [`AssetLoadContext`](../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext)

  ↳↳ [`BaseProxy`](../SceneTree/Geometry/SceneTree_Geometry_GeomProxies.BaseProxy)

  ↳↳ [`GeomLibrary`](../SceneTree/SceneTree_GeomLibrary.GeomLibrary)

  ↳↳ [`LabelManager`](../SceneTree/Images/SceneTree_Images_LabelManager.LabelManager)

  ↳↳ [`MaterialLibrary`](../SceneTree/SceneTree_MaterialLibrary.MaterialLibrary)

  ↳↳ [`OperatorInput`](../SceneTree/Operators/SceneTree_Operators_OperatorInput.OperatorInput)

  ↳↳ [`OperatorOutput`](../SceneTree/Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)

  ↳↳ [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner)

  ↳↳ [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)

  ↳↳ [`RefCounted`](../SceneTree/SceneTree_RefCounted.RefCounted)

  ↳↳ [`ResourceLoader`](../SceneTree/SceneTree_resourceLoader.ResourceLoader)

  ↳↳ [`Allocator1D`](Utilities_Allocator1D.Allocator1D)

  ↳↳ [`GrowingPacker`](Utilities_GrowingPacker.GrowingPacker)

## Constructors

### constructor

• **new EventEmitter**()

Initializes an empty `listeners` map that will host all the events,
which implies that it doesn't allow multiple events with the same name.

#### Overrides

[BaseClass](Utilities_BaseClass.BaseClass).[constructor](Utilities_BaseClass.BaseClass#constructor)

#### Defined in

[Utilities/EventEmitter.ts:33](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L33)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseClass](Utilities_BaseClass.BaseClass).[__id](Utilities_BaseClass.BaseClass#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/BaseClass.ts#L11)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L26)

## Methods

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseClass](Utilities_BaseClass.BaseClass).[getClassName](Utilities_BaseClass.BaseClass#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/BaseClass.ts#L33)

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

[BaseClass](Utilities_BaseClass.BaseClass).[getId](Utilities_BaseClass.BaseClass#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/BaseClass.ts#L25)

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

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L97)

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

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L82)

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

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/9ada8c18/src/Utilities/EventEmitter.ts#L134)

