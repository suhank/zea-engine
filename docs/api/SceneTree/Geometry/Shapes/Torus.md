<a name="Torus"></a>

### Torus 
A class for generating a torus geometry.

**Kind**: global class  
**Extends**: <code>Mesh</code>  

* [Torus ⇐ <code>Mesh</code>](#Torus)
    * [new Torus(innerRadius, outerRadius, detail)](#new-Torus)
    * [innerRadius ⇒ <code>number</code>](#innerRadius)
    * [innerRadius](#innerRadius)
    * [outerRadius ⇒ <code>number</code>](#outerRadius)
    * [outerRadius](#outerRadius)
    * [detail ⇒ <code>number</code>](#detail)
    * [detail](#detail)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Torus_new"></a>

### new Torus
Create a torus.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| innerRadius | <code>number</code> | <code>0.5</code> | The inner radius of the torus. |
| outerRadius | <code>number</code> | <code>1</code> | The outer radius of the torus. |
| detail | <code>number</code> | <code>32</code> | The detail of the cone. |

<a name="Torus+innerRadius"></a>

### innerRadius 
Getter for the inner radius.

**Kind**: instance property of [<code>Torus</code>](#Torus)  
**Returns**: <code>number</code> - - Returns the radius.  
<a name="Torus+innerRadius"></a>

### innerRadius
Setter for the inner radius.

**Kind**: instance property of [<code>Torus</code>](#Torus)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The radius value. |

<a name="Torus+outerRadius"></a>

### outerRadius 
Getter for the outer radius.

**Kind**: instance property of [<code>Torus</code>](#Torus)  
**Returns**: <code>number</code> - - Returns the radius.  
<a name="Torus+outerRadius"></a>

### outerRadius
Setter for the outer radius.

**Kind**: instance property of [<code>Torus</code>](#Torus)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The radius value. |

<a name="Torus+detail"></a>

### detail 
Getter for the torus detail.

**Kind**: instance property of [<code>Torus</code>](#Torus)  
**Returns**: <code>number</code> - - Returns the detail.  
<a name="Torus+detail"></a>

### detail
Setter for the torus detail.

**Kind**: instance property of [<code>Torus</code>](#Torus)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The detail value. |

<a name="Torus+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Torus</code>](#Torus)  
**Returns**: <code>object</code> - - Returns the json object.  
