<a name="FlatSurfaceShader"></a>

### FlatSurfaceShader


* [FlatSurfaceShader](#FlatSurfaceShader)
    * [new FlatSurfaceShader(gl)](#new-FlatSurfaceShader)
    * _instance_
        * [bind(renderstate, key) ⇒ <code>boolean</code>](#bind)
        * [unbind(renderstate) ⇒ <code>any</code>](#unbind)
    * _static_
        * [getPackedMaterialData(material) ⇒ <code>any</code>](#getPackedMaterialData)

<a name="new_FlatSurfaceShader_new"></a>

### new FlatSurfaceShader
Create a GL shader.


| Param | Type | Description |
| --- | --- | --- |
| gl | <code>WebGLRenderingContext</code> | The webgl rendering context. |

<a name="FlatSurfaceShader+bind"></a>

### bind
The bind method.


**Returns**: <code>boolean</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |
| key | <code>string</code> | The key value. |

<a name="FlatSurfaceShader+unbind"></a>

### unbind
The unbind method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| renderstate | <code>object</code> | The object tracking the current state of the renderer |

<a name="FlatSurfaceShader.getPackedMaterialData"></a>

### getPackedMaterialData
The getPackedMaterialData method.


**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| material | <code>any</code> | The material param. |

