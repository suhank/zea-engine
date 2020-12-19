<a name="CodeParameter"></a>

### CodeParameter 
Represents a specific type of parameter, that only stores `string` values.

i.e.:
```javascript
const codeStr = `const sayHello = () => console.log('Hello World')`
const codeParam = new CodeParameter('MyCode', codeStr)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(codeParam)
```


**Extends**: <code>[StringParameter](api/SceneTree\Parameters\StringParameter.md)</code>  

* [CodeParameter ⇐ <code>StringParameter</code>](#CodeParameter)
    * [new CodeParameter(name, value)](#new-CodeParameter)
    * [setLanguage(lang)](#setLanguage)
    * [getLanguage() ⇒ <code>string</code>](#getLanguage)
    * [clone()](#clone)

<a name="new_CodeParameter_new"></a>

### new CodeParameter
Creates a code parameter.
The default language is `js`.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the code parameter. |
| value | <code>string</code> | The value of the parameter. |

<a name="CodeParameter+setLanguage"></a>

### setLanguage
Sets code language for parameter.



| Param | Type | Description |
| --- | --- | --- |
| lang | <code>string</code> | The language value. |

<a name="CodeParameter+getLanguage"></a>

### getLanguage
Returns code language of parameter.


**Returns**: <code>string</code> - - Returns the language.  
<a name="CodeParameter+clone"></a>

### clone
The clone method constructs a new code parameter,
copies its values from this parameter and returns it.


**Returns**: [<code>CodeParameter</code>](#CodeParameter) - - Returns a new cloned code parameter.  


### [Class Tests](api/SceneTree\Parameters/CodeParameter.test)