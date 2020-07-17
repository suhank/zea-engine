<a name="SGFactory"></a>

### SGFactory
Factory class desinged build objects from persisted data.
Class name as a string is required because on minification processes class names changes.



* [SGFactory](#SGFactory)
    * [new SGFactory()](#new-SGFactory)
    * [registerClass(classname, cls)](#registerClass)
    * [getClass(classname) ⇒ <code>function</code> \| <code>undefined</code>](#getClass)
    * [getClassName(inst) ⇒ <code>string</code>](#getClassName)
    * [constructClass(classname) ⇒ <code>object</code> \| <code>null</code>](#constructClass)

<a name="new_SGFactory_new"></a>

### new SGFactory
Create a SG factory.

<a name="SGFactory+registerClass"></a>

### registerClass
Registers a new class in the factory.



| Param | Type | Description |
| --- | --- | --- |
| classname | <code>string</code> | The classname value. |
| cls | <code>function</code> | The class function. |

<a name="SGFactory+getClass"></a>

### getClass
Returns class function by specifying its name.


**Returns**: <code>function</code> \| <code>undefined</code> - - Returns class function if exists.  

| Param | Type | Description |
| --- | --- | --- |
| classname | <code>string</code> | The class name value. |

<a name="SGFactory+getClassName"></a>

### getClassName
Returns class name using passing an instantiated object.
If it is not registered, the name in constructor is returned.


**Returns**: <code>string</code> - - Returns class name.  

| Param | Type | Description |
| --- | --- | --- |
| inst | <code>object</code> | Instanciated class |

<a name="SGFactory+constructClass"></a>

### constructClass
Accepting the class name and N number of arguments, instantiates a new object of the specified class.
If the class is not registered, then `null` is returned. <br>
**Note:** Although the class arguments are not literally specified in the parameters,
you can pass them(As many as needed).


**Returns**: <code>object</code> \| <code>null</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| classname | <code>string</code> | The classname value. |

