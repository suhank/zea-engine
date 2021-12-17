---
id: "Renderer_VR_XRController.XRController"
title: "Class: XRController"
sidebar_label: "XRController"
custom_edit_url: null
---



Class representing a VR controller.

## Constructors

### constructor

• **new XRController**(`xrvp`, `inputSource`, `id`)

Create a VR controller.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrvp` | `any` | The Vr viewport. |
| `inputSource` | `any` | The input source. |
| `id` | `number` | The id value. |

#### Defined in

[src/Renderer/VR/XRController.ts:52](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L52)

## Properties

### buttonPressed

• **buttonPressed**: `boolean`

#### Defined in

[src/Renderer/VR/XRController.ts:21](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L21)

___

### capturedItem

• **capturedItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) = `null`

#### Defined in

[src/Renderer/VR/XRController.ts:44](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L44)

___

### hitTested

• `Private` **hitTested**: `boolean`

#### Defined in

[src/Renderer/VR/XRController.ts:39](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L39)

___

### id

• **id**: `number`

#### Defined in

[src/Renderer/VR/XRController.ts:20](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L20)

___

### inputSource

• `Private` **inputSource**: `any`

#### Defined in

[src/Renderer/VR/XRController.ts:23](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L23)

___

### intersectionData

• `Private` **intersectionData**: [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

#### Defined in

[src/Renderer/VR/XRController.ts:41](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L41)

___

### mat4

• `Private` **mat4**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/VR/XRController.ts:24](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L24)

___

### pointerOverItem

• `Private` **pointerOverItem**: `any`

#### Defined in

[src/Renderer/VR/XRController.ts:40](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L40)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Defined in

[src/Renderer/VR/XRController.ts:33](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L33)

___

### rayCastRenderTargetProjMatrix

• `Private` **rayCastRenderTargetProjMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/VR/XRController.ts:36](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L36)

___

### raycastArea

• **raycastArea**: `number` = `0.04`

#### Defined in

[src/Renderer/VR/XRController.ts:31](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L31)

___

### raycastAreaCache

• `Private` **raycastAreaCache**: `number` = `0`

#### Defined in

[src/Renderer/VR/XRController.ts:34](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L34)

___

### raycastDist

• **raycastDist**: `number` = `0.04`

#### Defined in

[src/Renderer/VR/XRController.ts:32](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L32)

___

### raycastDistCache

• `Private` **raycastDistCache**: `number` = `0`

#### Defined in

[src/Renderer/VR/XRController.ts:35](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L35)

___

### raycastTick

• **raycastTick**: `number` = `5`

#### Defined in

[src/Renderer/VR/XRController.ts:30](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L30)

___

### tick

• `Private` **tick**: `number`

#### Defined in

[src/Renderer/VR/XRController.ts:37](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L37)

___

### tipItem

• `Private` **tipItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[src/Renderer/VR/XRController.ts:27](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L27)

___

### touchpadValue

• `Private` **touchpadValue**: `any`

#### Defined in

[src/Renderer/VR/XRController.ts:38](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L38)

___

### treeItem

• `Private` **treeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[src/Renderer/VR/XRController.ts:26](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L26)

___

### xfo

• `Private` **xfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/VR/XRController.ts:25](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L25)

___

### xrvp

• `Private` **xrvp**: [`XRViewport`](Renderer_VR_XRViewport.XRViewport)

#### Defined in

[src/Renderer/VR/XRController.ts:22](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L22)

## Methods

### getControllerStageLocalXfo

▸ **getControllerStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:226](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L226)

___

### getControllerTipStageLocalXfo

▸ **getControllerTipStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerTipStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:234](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L234)

___

### getGeomItemAtTip

▸ **getGeomItemAtTip**(): [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

The getGeomItemAtTip method.

#### Returns

[`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:310](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L310)

___

### getHandedness

▸ **getHandedness**(): `any`

The getHandedness method.

#### Returns

`any`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:170](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L170)

___

### getId

▸ **getId**(): `number`

The getId method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:178](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L178)

___

### getTipItem

▸ **getTipItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTipItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:194](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L194)

___

### getTipXfo

▸ **getTipXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getTipXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:202](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L202)

___

### getTouchPadValue

▸ **getTouchPadValue**(): `any`

The getTouchPadValue method.

#### Returns

`any`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:210](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L210)

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:186](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L186)

___

### isButtonPressed

▸ **isButtonPressed**(): `boolean`

The isButtonPressed method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/VR/XRController.ts:218](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L218)

___

### updatePose

▸ **updatePose**(`refSpace`, `xrFrame`, `inputSource`): `void`

The updatePose method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refSpace` | `any` | The refSpace value. |
| `xrFrame` | `any` | The xrFrame value. |
| `inputSource` | `any` | The inputSource value. |

#### Returns

`void`

#### Defined in

[src/Renderer/VR/XRController.ts:246](https://github.com/ZeaInc/zea-engine/blob/976b47e27/src/Renderer/VR/XRController.ts#L246)

