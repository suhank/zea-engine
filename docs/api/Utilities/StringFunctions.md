<a name="StringFunctions"></a>

### StringFunctions
String functions



* [StringFunctions](#StringFunctions)
    * [replaceAll(str, pattern, replacement) ⇒ <code>string</code>](#replaceAll)
    * [stringifyJSONWithFixedPrecision(val, [space], [precision]) ⇒ <code>string</code>](#stringifyJSONWithFixedPrecision)
    * [hashStr(str) ⇒ <code>number</code>](#hashStr)

<a name="StringFunctions.replaceAll"></a>

### replaceAll
Replaces all matches in a string.


**Returns**: <code>string</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | - |
| pattern | <code>string</code> \| <code>RegExp</code> | - |
| replacement | <code>string</code> | - |

<a name="StringFunctions.stringifyJSONWithFixedPrecision"></a>

### stringifyJSONWithFixedPrecision
Returns JSON object as a formatted string, but the numeric values are fixed to the specified precision.


**Returns**: <code>string</code> - -  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>object</code> |  | - |
| [space] | <code>number</code> | <code>0</code> | - |
| [precision] | <code>number</code> | <code>5</code> | - |

<a name="StringFunctions.hashStr"></a>

### hashStr
Transforms the given string into a numeric value.


**Returns**: <code>number</code> - -  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>\*</code> | - |

