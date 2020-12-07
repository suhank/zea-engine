<a name="LibsRegistry"></a>

### LibsRegistry
Libraries registry.



* [LibsRegistry](#LibsRegistry)
    * [new LibsRegistry(version)](#new-LibsRegistry)
    * [registerLib(packageJson)](#registerLib)
    * [listLibs() ⇒ <code>object</code>](#listLibs)

<a name="new_LibsRegistry_new"></a>

### new LibsRegistry
Construct a new libraries registry for the specific version.


| Param | Type | Description |
| --- | --- | --- |
| version | <code>string</code> | The version of the Zea Engine that will be validated against the registered libraries. |

<a name="LibsRegistry+registerLib"></a>

### registerLib
Validate and register a library.



| Param | Type | Description |
| --- | --- | --- |
| packageJson | <code>object</code> | The package.json of the library to register. |

<a name="LibsRegistry+listLibs"></a>

### listLibs
List the registered libraries with their versions.


**Returns**: <code>object</code> - Libraries list.  


### [Class Tests](api/./LibsRegistry.test)