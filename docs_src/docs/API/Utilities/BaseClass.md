---
id: "Utilities_BaseClass.BaseClass"
title: "Class: BaseClass"
sidebar_label: "BaseClass"
custom_edit_url: null
---



Class representing a BaseClass.
The BaseClass is the foundation class of the SceneTree, as almost all classes derive from it.

## Hierarchy

- **`BaseClass`**

  ↳ [`Attribute`](../SceneTree/Geometry/SceneTree_Geometry_Attribute.Attribute)

  ↳ [`EventEmitter`](Utilities_EventEmitter.EventEmitter)

## Constructors

### constructor

• **new BaseClass**()

Create an BaseClass.

#### Defined in

[src/Utilities/BaseClass.ts:15](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L15)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L11)

## Methods

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L33)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/1fac85723/src/Utilities/BaseClass.ts#L25)

