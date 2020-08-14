<a name="Version"></a>

### Version
Class designed to store version data. Widely used in the zea engine for backwards compatibility.



* [Version](#Version)
    * [new Version(versionStr)](#new-Version)
    * [compare(numbers) ⇒ <code>number</code>](#compare)
    * [equals(numbers) ⇒ <code>boolean</code>](#equals)
    * [lessThan(numbers) ⇒ <code>boolean</code>](#lessThan)
    * [greaterThan(numbers) ⇒ <code>boolean</code>](#greaterThan)
    * [greaterOrEqualThan(numbers) ⇒ <code>boolean</code>](#greaterOrEqualThan)

<a name="new_Version_new"></a>

### new Version
Creates a version.
The version string should have the following structure: <br>
major, minor and patch separated by a dot(`.`) and parts separated by a dash(`-`).


| Param | Type | Description |
| --- | --- | --- |
| versionStr | <code>str</code> | The version string value. |

<a name="Version+compare"></a>

### compare
Compare a version object against a version numbers array.


**Returns**: <code>number</code> - - return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>array</code> | An array containing 3 version numbers. [Major, Minor, Patch] |

<a name="Version+equals"></a>

### equals
Compare a version object against a version numbers array.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>array</code> | The numbers value. |

<a name="Version+lessThan"></a>

### lessThan
Compare a version object against a version numbers array.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>array</code> | The numbers value. |

<a name="Version+greaterThan"></a>

### greaterThan
Compare a version object against a version numbers array.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>array</code> | The numbers value. |

<a name="Version+greaterOrEqualThan"></a>

### greaterOrEqualThan
Compare a version object against a version numbers array.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| numbers | <code>array</code> | The numbers value. |

