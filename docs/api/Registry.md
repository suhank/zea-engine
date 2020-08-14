<a name="Registry"></a>

## .Registry


* [Registry](#Registry)
    * [new Registry()](#new-Registry)
    * [register(blueprintName, blueprint)](#register)
    * [getBlueprint(blueprintName) ⇒ <code>function</code> \| <code>number</code> \| <code>any</code>](#getBlueprint)
    * [getBlueprintName(blueprintInstance) ⇒ <code>string</code>](#getBlueprintName)
    * [constructClass(blueprintName) ⇒ <code>object</code> \| <code>null</code>](#constructClass)

<a name="new_Registry_new"></a>

### new Registry
Registry is a static factory that handles registration/reconstruction of
persisted type of data, this includes classes and types.

Note: blueprintName is required because on minification process
the name of classes change and we can't simply use '....constructor.name'.
So, we need a way of relating minified blueprint names to the one stored for persistency.
<br>
i.e.
```javascript
// Import registry class
class Foo() {}

Registry.register('Foo', Foo)
// In case 'Foo' class gets its name changed to 'c' on minification,
// and the persisted data type is 'Foo', we would know how to relate them.
```

<a name="Registry.register"></a>

### register
Registers a new blueprint in the factory.



| Param | Type | Description |
| --- | --- | --- |
| blueprintName | <code>string</code> | Name of the registered blueprint(Class, type, etc) |
| blueprint | <code>function</code> \| <code>number</code> \| <code>any</code> | Blueprint representation(Class function, type) |

<a name="Registry.getBlueprint"></a>

### getBlueprint
Returns blueprint function/type by specifying its name.


**Returns**: <code>function</code> \| <code>number</code> \| <code>any</code> - - Blueprint representation(Class function, type)  

| Param | Type | Description |
| --- | --- | --- |
| blueprintName | <code>string</code> | Name of the registered blueprint(Class, type, etc) |

<a name="Registry.getBlueprintName"></a>

### getBlueprintName
Returns class name using passing an instantiated object.
If it is not registered, the name in constructor is returned.


**Returns**: <code>string</code> - - Name of the registered blueprint(Class, type, etc)  

| Param | Type | Description |
| --- | --- | --- |
| blueprintInstance | <code>function</code> \| <code>number</code> \| <code>any</code> \| <code>undefined</code> | Blueprint representation(Class function, type) |

<a name="Registry.constructClass"></a>

### constructClass
Accepting the class name and `N` number of arguments, instantiates a new object of the specified class.
If the class is not registered, then `null` is returned.
<br>
**Note:** Although the class arguments are not literally specified in the parameters,
you can pass them(As many as needed).


**Returns**: <code>object</code> \| <code>null</code> - - Instantiated object of the specified class  

| Param | Type | Description |
| --- | --- | --- |
| blueprintName | <code>string</code> | Name of the registered blueprint(Class, type, etc) |

