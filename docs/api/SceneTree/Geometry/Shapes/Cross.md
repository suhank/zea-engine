<a name="Cross"></a>

### Cross 
A class for generating a cross shape, drawing a line on the `X,Y,Z` axes.
The axis line length is the `size` you specify, but the middle of the line is positioned in the coordinate `(0, 0, 0)` .
Meaning that half of the line goes negative and half goes positive.

```
const cross = new Cross(1.5)
```

**Parameters**
* **size(`NumberParameter`):** Specifies the size of the cross.


**Extends**: <code>Lines</code>  
<a name="new_Cross_new"></a>

### new Cross
Create a cross.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| size | <code>number</code> | <code>1</code> | The size of the cross. |

