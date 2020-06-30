<a name="Label"></a>

### Label 
Represents a 2D label item the scene.
Since displaying text in the scene is not an easy task,
we've abstracted the complicated logic behind this class, transforming any text into a 2D image(`DataImage`).

**Library List:**
* LabelPack

**Parameters**
* **Library(`StringParameter`):** Library you wan to use for your label, see **Library List** above.
* **Text(`StringParameter`):**
* **FontColor(`ColorParameter`):**
* **Margin(`NumberParameter`):**
* **BorderWidth(`NumberParameter`):**
* **BorderRadius(`NumberParameter`):**
* **Outline(`BooleanParameter`):**
* **OutlineColor(`BooleanParameter`):**
* **Background(`BooleanParameter`):**
* **ColorParameter(`BackgroundColor`):**
* **FillBackground(`BooleanParameter`):**
* **StrokeBackgroundOutline(`BooleanParameter`):**
* **FontSize(`NumberParameter`):**
* **Font(`StringParameter`):**

**Events**
* **loaded:** Triggered when label's data is loaded.
* **updated:** Triggered when label's data changes.
* **labelRendered:** Triggered when the text image is rendered. Contains `width`, `height` and data of the image.


**Extends**: <code>DataImage</code>  

* [Label ⇐ <code>DataImage</code>](#Label)
    * [new Label(name, library)](#new-Label)
    * [loadLabelData()](#loadLabelData)
    * [renderLabelToImage()](#renderLabelToImage)
    * [getParams() ⇒ <code>object</code>](#getParams)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j, context, flags)](#fromJSON)

<a name="new_Label_new"></a>

### new Label
Creates a label instance. Creating a canvas element that hosts the specified text.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name value. |
| library | <code>string</code> | The library value. |

<a name="Label+loadLabelData"></a>

### loadLabelData
Method in charge of basically do everything, set text, load/update it, get the library, load the font, etc.


<a name="Label+renderLabelToImage"></a>

### renderLabelToImage
Renders the label text to a canvas element ready to display.
Here is where all parameters are applied to the canvas containing the text,
then the image data is extracted from the canvas context.


<a name="Label+getParams"></a>

### getParams
Returns all parameters and class state values(Including data).


**Returns**: <code>object</code> - - The return value.  
<a name="Label+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.


**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="Label+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.



| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

