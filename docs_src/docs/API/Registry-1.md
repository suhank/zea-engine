---
id: "Registry.Registry-1"
title: "Class: Registry"
sidebar_label: "Registry"
custom_edit_url: null
---



Registry is a static factory that handles registration/reconstruction of
classes bases on BaseClass. Registered classes can then be constructed by the Registry by name.

Note: className is required because on minification process
the name of classes change and we can't simply use '....constructor.name'.
So, we need a way of relating minified class names to the one stored for persistency.

i.e.
```javascript
// Import registry class
class Foo() extends BaseClass {}

Registry.register('Foo', Foo)
// In case 'Foo' class gets its name changed to 'c' on minification,
// and the persisted data type is 'Foo', we would know how to relate them.
```

**`static`**

## Constructors

### constructor

• **new Registry**()

## Methods

### constructClass

▸ `Static` **constructClass**(`className`): [`BaseClass`](Utilities/Utilities_BaseClass.BaseClass)

The factory function that construct the class registered under the given name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `className` | `string` | Name of the registered class |

#### Returns

[`BaseClass`](Utilities/Utilities_BaseClass.BaseClass)

- Instantiated object of the specified class

#### Defined in

[src/Registry.ts:78](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Registry.ts#L78)

___

### flush

▸ `Static` `Private` **flush**(): `void`

For testing purpose only, never call this outside of the test scope.

#### Returns

`void`

#### Defined in

[src/Registry.ts:90](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Registry.ts#L90)

___

### getClassDefinition

▸ `Static` **getClassDefinition**(`className`): typeof [`BaseClass`](Utilities/Utilities_BaseClass.BaseClass)

Returns class definition using the name it was registered with.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `className` | `string` | Name of the registered class |

#### Returns

typeof [`BaseClass`](Utilities/Utilities_BaseClass.BaseClass)

- Class representation(Class function, type)

#### Defined in

[src/Registry.ts:55](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Registry.ts#L55)

___

### getClassName

▸ `Static` **getClassName**(`classDefinition`): `string`

Returns class name registered for the instantiated object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `classDefinition` | typeof [`BaseClass`](Utilities/Utilities_BaseClass.BaseClass) | Class type definition. |

#### Returns

`string`

- Name of the registered class

#### Defined in

[src/Registry.ts:65](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Registry.ts#L65)

___

### register

▸ `Static` **register**(`className`, `classDef`): `void`

Registers a new class to the factory.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `className` | `string` | Name of the registered class |
| `classDef` | typeof [`BaseClass`](Utilities/Utilities_BaseClass.BaseClass) | Class representation(Class function, type) |

#### Returns

`void`

#### Defined in

[src/Registry.ts:36](https://github.com/ZeaInc/zea-engine/blob/22cb841fb/src/Registry.ts#L36)

