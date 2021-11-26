---
id: "Renderer_GLBaseRenderer.GLBaseRenderer"
title: "Class: GLBaseRenderer"
sidebar_label: "GLBaseRenderer"
custom_edit_url: null
---



Class representing a GL base renderer.

## Hierarchy

- [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner)

  ↳ **`GLBaseRenderer`**

  ↳↳ [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

## Constructors

### constructor

• **new GLBaseRenderer**(`$canvas`, `options?`)

Create a GL base renderer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$canvas` | `HTMLCanvasElement` | The canvas element. |
| `options` | `Record`<`string`, `any`\> | The options value. |

#### Overrides

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[constructor](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#constructor)

#### Defined in

[Renderer/GLBaseRenderer.ts:79](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L79)

## Properties

### \_\_activeViewport

• `Protected` **\_\_activeViewport**: [`GLViewport`](Renderer_GLViewport.GLViewport) = `undefined`

#### Defined in

[Renderer/GLBaseRenderer.ts:53](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L53)

___

### \_\_continuousDrawing

• `Protected` **\_\_continuousDrawing**: `boolean` = `false`

#### Defined in

[Renderer/GLBaseRenderer.ts:54](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L54)

___

### \_\_drawSuspensionLevel

• `Protected` **\_\_drawSuspensionLevel**: `number` = `0`

#### Defined in

[Renderer/GLBaseRenderer.ts:57](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L57)

___

### \_\_gl

• **\_\_gl**: `WebGL12RenderingContext`

#### Defined in

[Renderer/GLBaseRenderer.ts:41](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L41)

___

### \_\_glcanvas

• `Protected` **\_\_glcanvas**: `HTMLCanvasElement` = `null`

#### Defined in

[Renderer/GLBaseRenderer.ts:42](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L42)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[__id](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/BaseClass.ts#L11)

___

### \_\_isMobile

• `Protected` **\_\_isMobile**: `boolean` = `false`

#### Defined in

[Renderer/GLBaseRenderer.ts:56](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L56)

___

### \_\_passCallbacks

• `Protected` **\_\_passCallbacks**: `any`[] = `[]`

#### Defined in

[Renderer/GLBaseRenderer.ts:50](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L50)

___

### \_\_passes

• `Protected` **\_\_passes**: `Record`<`number`, [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)[]\> = `{}`

#### Defined in

[Renderer/GLBaseRenderer.ts:48](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L48)

___

### \_\_passesRegistrationOrder

• `Protected` **\_\_passesRegistrationOrder**: [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)[] = `[]`

#### Defined in

[Renderer/GLBaseRenderer.ts:49](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L49)

___

### \_\_redrawRequested

• `Protected` **\_\_redrawRequested**: `boolean` = `false`

#### Defined in

[Renderer/GLBaseRenderer.ts:55](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L55)

___

### \_\_renderGeomDataFbosRequested

• `Protected` **\_\_renderGeomDataFbosRequested**: `boolean` = `false`

#### Defined in

[Renderer/GLBaseRenderer.ts:46](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L46)

___

### \_\_scene

• `Protected` **\_\_scene**: [`Scene`](../SceneTree/SceneTree_Scene.Scene) = `null`

#### Defined in

[Renderer/GLBaseRenderer.ts:43](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L43)

___

### \_\_shaderDirectives

• `Protected` **\_\_shaderDirectives**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[Renderer/GLBaseRenderer.ts:45](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L45)

___

### \_\_shaders

• `Protected` **\_\_shaders**: `Record`<`string`, [`GLShader`](Renderer_GLShader.GLShader)\> = `{}`

#### Defined in

[Renderer/GLBaseRenderer.ts:47](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L47)

___

### \_\_supportXR

• `Protected` **\_\_supportXR**: `boolean` = `false`

#### Defined in

[Renderer/GLBaseRenderer.ts:61](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L61)

___

### \_\_viewports

• `Protected` **\_\_viewports**: [`GLViewport`](Renderer_GLViewport.GLViewport)[] = `[]`

#### Defined in

[Renderer/GLBaseRenderer.ts:52](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L52)

___

### \_\_xrViewport

• `Protected` **\_\_xrViewport**: [`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport) = `undefined`

#### Defined in

[Renderer/GLBaseRenderer.ts:62](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L62)

___

### \_\_xrViewportPresenting

• **\_\_xrViewportPresenting**: `boolean` = `false`

#### Defined in

[Renderer/GLBaseRenderer.ts:58](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L58)

___

### \_\_xrViewportPromise

• `Protected` **\_\_xrViewportPromise**: `Promise`<[`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)\>

#### Defined in

[Renderer/GLBaseRenderer.ts:63](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L63)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L23)

___

### directives

• `Protected` **directives**: `string`[] = `[]`

#### Defined in

[Renderer/GLBaseRenderer.ts:38](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L38)

___

### floatGeomBuffer

• **floatGeomBuffer**: `boolean` = `true`

#### Defined in

[Renderer/GLBaseRenderer.ts:59](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L59)

___

### glGeomItemLibrary

• **glGeomItemLibrary**: [`GLGeomItemLibrary`](Drawing/Renderer_Drawing_GLGeomItemLibrary.GLGeomItemLibrary)

#### Defined in

[Renderer/GLBaseRenderer.ts:66](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L66)

___

### glGeomLibrary

• **glGeomLibrary**: [`GLGeomLibrary`](Drawing/Renderer_Drawing_GLGeomLibrary.GLGeomLibrary)

#### Defined in

[Renderer/GLBaseRenderer.ts:67](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L67)

___

### glMaterialLibrary

• **glMaterialLibrary**: `GLMaterialLibrary`

#### Defined in

[Renderer/GLBaseRenderer.ts:65](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L65)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`number`, `Record`<`string`, `number`\>\> = `{}`

#### Defined in

[Renderer/GLBaseRenderer.ts:37](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L37)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[listeners](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[params](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L22)

___

### resizeObserver

• `Private` `Optional` **resizeObserver**: `ResizeObserver`

#### Defined in

[Renderer/GLBaseRenderer.ts:72](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L72)

___

### screenQuad

• **screenQuad**: [`GLScreenQuad`](Renderer_GLScreenQuad.GLScreenQuad) = `null`

#### Defined in

[Renderer/GLBaseRenderer.ts:69](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L69)

___

### solidAngleLimit

• **solidAngleLimit**: `number` = `0.004`

#### Defined in

[Renderer/GLBaseRenderer.ts:39](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L39)

## Accessors

### gl

• `get` **gl**(): `WebGL12RenderingContext`

Getter for gl.

#### Returns

`WebGL12RenderingContext`

#### Defined in

[Renderer/GLBaseRenderer.ts:486](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L486)

## Methods

### \_\_setupXRViewport

▸ `Private` **__setupXRViewport**(): [`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)

The __setupXRViewport method.

#### Returns

[`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:957](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L957)

___

### activateViewport

▸ **activateViewport**(`vp`): `void`

Sets as `active` the specified viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vp` | [`GLViewport`](Renderer_GLViewport.GLViewport) | The viewport. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:255](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L255)

___

### activateViewportAtPos

▸ **activateViewportAtPos**(`offsetX`, `offsetY`): `void`

Sets as àctive` the viewport under the specified XY coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetX` | `number` | The viewport offset in the X axis. |
| `offsetY` | `number` | The viewport offset in the Y axis. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:267](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L267)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L133)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameterDeprecationMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L90)

___

### addPass

▸ **addPass**(`pass`, `passType?`, `updateIndices?`): `number`

The addPass method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pass` | [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass) | `undefined` | The pass value. |
| `passType` | `number` | `-1` | The passType value. |
| `updateIndices` | `boolean` | `true` | The updateIndices value. |

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:886](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L886)

___

### addShaderPreprocessorDirective

▸ **addShaderPreprocessorDirective**(`name`, `value?`): `void`

The addShaderPreprocessorDirective method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |
| `value?` | `string` | The value param. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:163](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L163)

___

### addTreeItem

▸ **addTreeItem**(`treeItem`): `void`

Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem) | The tree item to add. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:344](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L344)

___

### addViewport

▸ **addViewport**(`name`): [`GLViewport`](Renderer_GLViewport.GLViewport)

Adds a new viewport(viewing region) to the scene.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the viewport. |

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:201](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L201)

___

### assignTreeItemToGLPass

▸ **assignTreeItemToGLPass**(`treeItem`): `void`

Searches through the passes and finds the appropriate pass to draw the given tree items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem) | The tree item to assign. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:388](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L388)

___

### bindEventHandlers

▸ **bindEventHandlers**(): `void`

Binds IO event handlers to the canvas

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:652](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L652)

___

### bindGLBaseRenderer

▸ **bindGLBaseRenderer**(`renderstate`): `void`

The bindGLBaseRenderer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1121](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1121)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[copyFrom](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[SceneTree/ParameterOwner.ts:314](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L314)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1270](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1270)

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1213](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1213)

___

### drawItemChanged

▸ **drawItemChanged**(): `void`

The drawItemChanged method.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1071](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1071)

___

### drawScene

▸ **drawScene**(`renderstate`): `void`

The drawScene method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | `RenderState` | The renderstate value. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1195](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1195)

___

### drawSceneGeomData

▸ **drawSceneGeomData**(`renderstate`, `mask?`): `void`

The drawSceneGeomData method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `renderstate` | `GeomDataRenderState` | `undefined` | The renderstate value. |
| `mask` | `number` | `255` | The mask value |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1232](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1232)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[emit](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L154)

___

### forceRender

▸ **forceRender**(): `void`

Forces a redraw of the viewports

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1105](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1105)

___

### frameAll

▸ **frameAll**(`viewportIndex?`): `void`

Frames the specified viewport to the entire scene.
> See also: ${Viewport#frameView}

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `viewportIndex` | `number` | `0` | The viewportIndex value. If multiple viewports are configured, a viewport index will need to be provided. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:855](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L855)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[fromJSON](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#fromjson)

#### Defined in

[SceneTree/ParameterOwner.ts:239](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L239)

___

### getActiveViewport

▸ **getActiveViewport**(): [`GLViewport`](Renderer_GLViewport.GLViewport)

Returns current active viewport.

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:278](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L278)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getClassName](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/BaseClass.ts#L33)

___

### getDiv

▸ **getDiv**(): `HTMLElement`

Returns host div of the canvas element.

#### Returns

`HTMLElement`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:531](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L531)

___

### getGL

▸ **getGL**(): `WebGL12RenderingContext`

The getGL method.

#### Returns

`WebGL12RenderingContext`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:494](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L494)

___

### getGLCanvas

▸ **getGLCanvas**(): `HTMLCanvasElement`

Returns canvas that was used to generate the gl context.

#### Returns

`HTMLCanvasElement`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:846](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L846)

___

### getHeight

▸ **getHeight**(): `number`

Returns HTMLCanvasElement's Height

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:188](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L188)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getId](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/BaseClass.ts#L25)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getNumParameters](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L39)

___

### getOrCreateShader

▸ **getOrCreateShader**(`shaderName`): [`GLShader`](Renderer_GLShader.GLShader)

A factory function used to construct new shader objects. If that specified shader has already been constructed, it returns the existing shader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |

#### Returns

[`GLShader`](Renderer_GLShader.GLShader)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:867](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L867)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterByIndex](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L68)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterIndex](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameters](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L48)

___

### getPass

▸ **getPass**(`index`): [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)

The getPass method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:930](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L930)

___

### getScene

▸ **getScene**(): [`Scene`](../SceneTree/SceneTree_Scene.Scene)

Returns current scene(Environment where all assets live) object.

#### Returns

[`Scene`](../SceneTree/SceneTree_Scene.Scene)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:322](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L322)

___

### getVRViewport

▸ **getVRViewport**(): [`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)

The getVRViewport method.

#### Returns

[`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:1004](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1004)

___

### getViewport

▸ **getViewport**(`index?`): [`GLViewport`](Renderer_GLViewport.GLViewport)

Returns a viewport element by specifying its index in the list of viewports.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `0` | The index value. |

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:228](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L228)

___

### getViewportAtPos

▸ **getViewportAtPos**(`offsetX`, `offsetY`): [`GLViewport`](Renderer_GLViewport.GLViewport)

Returns a viewport element under the specified XY coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetX` | `number` | The viewport offset in the X axis. |
| `offsetY` | `number` | The viewport offset in the Y axis. |

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:239](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L239)

___

### getWidth

▸ **getWidth**(): `number`

Returns HTMLCanvasElement's width

#### Returns

`number`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:180](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L180)

___

### getXRViewport

▸ **getXRViewport**(): `Promise`<[`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)\>

The getXRViewport method.

#### Returns

`Promise`<[`VRViewport`](VR/Renderer_VR_VRViewport.VRViewport)\>

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:1012](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1012)

___

### handleResize

▸ `Private` **handleResize**(`newWidth`, `newHeight`): `void`

Handle the canvas's parent resizing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newWidth` | `number` | The new width of the canvas. |
| `newHeight` | `number` | The new height of the canvas. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:506](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L506)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[hasParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L78)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[insertParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L147)

___

### isContinuouslyDrawing

▸ **isContinuouslyDrawing**(): `boolean`

The isContinuouslyDrawing method.

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:1031](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1031)

___

### isXRViewportPresenting

▸ **isXRViewportPresenting**(): `boolean`

The isXRViewportPresenting method.

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:1020](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1020)

___

### off

▸ **off**(`eventName`, `listener?`): `void`

Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function or the id number. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[off](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L97)

___

### on

▸ **on**(`eventName`, `listener?`): `number`

Adds a listener function for a given event name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function(callback). |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[on](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L44)

___

### once

▸ **once**(`eventName`, `listener`): `number`

Similar to the `on` method with the difference that when the event is triggered,
it is automatically unregistered meaning that the event listener will be triggered at most one time.

Useful for events that we expect to trigger one time, such as when assets load.
```javascript
const asset = new Asset();
asset.once('loaded', () => {
  console.log("Yay! the asset is loaded")
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The eventName value |
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[once](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[parameterValueChanged](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L122)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.

In each iteration of the array, propType and propName are extracted and
used to build the right `Parameter` class. Then all of them are added to the object.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[readBinary](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#readbinary)

#### Defined in

[SceneTree/ParameterOwner.ts:274](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L274)

___

### removeListenerById

▸ **removeListenerById**(`eventName`, `id`): `void`

remove listener by ID returned from #on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `id` | `number` | The id returned by addListener |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeListenerById](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Utilities/EventEmitter.ts#L134)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L174)

___

### removeTreeItem

▸ **removeTreeItem**(`treeItem`): `void`

Remove tree items from the scene.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem) | The tree item to remove. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:427](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L427)

___

### renderGeomDataFbos

▸ **renderGeomDataFbos**(): `void`

The renderGeomDataFbos method. Frame buffer (FBO).

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:303](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L303)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[replaceParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L196)

___

### requestRedraw

▸ **requestRedraw**(): `boolean`

Request a single redraw, usually in response to a signal/event.

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:1080](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1080)

___

### resumeDrawing

▸ **resumeDrawing**(): `void`

The resumeDrawing method.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:292](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L292)

___

### setScene

▸ **setScene**(`scene`): `void`

Sets scene to the renderer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scene` | [`Scene`](../SceneTree/SceneTree_Scene.Scene) | The scene value. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:331](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L331)

___

### setupWebGL

▸ `Private` **setupWebGL**(`$canvas`, `webglOptions`): `WebGL12RenderingContext`

Setups the WebGL configuration for the renderer, specifying the canvas element where our

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$canvas` | `HTMLCanvasElement` | The $canvas element. |
| `webglOptions` | `Record`<`string`, `any`\> | The webglOptions value. |

#### Returns

`WebGL12RenderingContext`

#### Defined in

[Renderer/GLBaseRenderer.ts:541](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L541)

___

### startContinuousDrawing

▸ **startContinuousDrawing**(): `void`

The startContinuousDrawing method.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1038](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1038)

___

### stopContinuousDrawing

▸ **stopContinuousDrawing**(): `void`

The stopContinuousDrawing method.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1053](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1053)

___

### supportsVR

▸ **supportsVR**(): `boolean`

The supportsVR method.

#### Returns

`boolean`

- The return value.

#### Defined in

[Renderer/GLBaseRenderer.ts:947](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L947)

___

### suspendDrawing

▸ **suspendDrawing**(): `void`

The suspendDrawing method.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:285](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L285)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toJSON](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tojson)

#### Defined in

[SceneTree/ParameterOwner.ts:216](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L216)

___

### toString

▸ **toString**(`context`): `string`

Converts object's JSON value and converts it to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- String of object's parameter list state.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toString](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:301](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/SceneTree/ParameterOwner.ts#L301)

___

### toggleContinuousDrawing

▸ **toggleContinuousDrawing**(): `void`

The toggleContinuousDrawing method.

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1060](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1060)

___

### registerPass

▸ `Static` **registerPass**(`cls`, `passType`): `void`

The registerPass method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cls` | `any` | The cls value. |
| `passType` | `any` | The passType value. |

#### Returns

`void`

#### Defined in

[Renderer/GLBaseRenderer.ts:1261](https://github.com/ZeaInc/zea-engine/blob/cc691d16b/src/Renderer/GLBaseRenderer.ts#L1261)

