"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7849],{3905:function(e,r,t){t.d(r,{Zo:function(){return o},kt:function(){return m}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function d(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?d(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},d=Object.keys(e);for(n=0;n<d.length;n++)t=d[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(e);for(n=0;n<d.length;n++)t=d[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),l=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},o=function(e){var r=l(e.components);return n.createElement(s.Provider,{value:r},e.children)},h={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},k=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,d=e.originalType,s=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),k=l(t),m=a,u=k["".concat(s,".").concat(m)]||k[m]||h[m]||d;return t?n.createElement(u,i(i({ref:r},o),{},{components:t})):n.createElement(u,i({ref:r},o))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var d=t.length,i=new Array(d);i[0]=k;var p={};for(var s in r)hasOwnProperty.call(r,s)&&(p[s]=r[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var l=2;l<d;l++)i[l]=t[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}k.displayName="MDXCreateElement"},5373:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return p},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return o},default:function(){return k}});var n=t(7462),a=t(3366),d=(t(7294),t(3905)),i=["components"],p={id:"Renderer_types_renderer.GeomDataRenderState",title:"Interface: GeomDataRenderState",sidebar_label:"GeomDataRenderState",custom_edit_url:null},s=void 0,l={unversionedId:"API/Renderer/types/Renderer_types_renderer.GeomDataRenderState",id:"API/Renderer/types/Renderer_types_renderer.GeomDataRenderState",isDocsHomePage:!1,title:"Interface: GeomDataRenderState",description:"Hierarchy",source:"@site/docs/API/Renderer/types/GeomDataRenderState.md",sourceDirName:"API/Renderer/types",slug:"/API/Renderer/types/Renderer_types_renderer.GeomDataRenderState",permalink:"/zea-engine/API/Renderer/types/Renderer_types_renderer.GeomDataRenderState",editUrl:null,tags:[],version:"current",frontMatter:{id:"Renderer_types_renderer.GeomDataRenderState",title:"Interface: GeomDataRenderState",sidebar_label:"GeomDataRenderState",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"ColorRenderState",permalink:"/zea-engine/API/Renderer/types/Renderer_types_renderer.ColorRenderState"},next:{title:"LayoutItem",permalink:"/zea-engine/API/Renderer/types/Renderer_types_renderer.LayoutItem"}},o=[{value:"Hierarchy",id:"hierarchy",children:[]},{value:"Properties",id:"properties",children:[{value:"attrs",id:"attrs",children:[]},{value:"boundRendertarget",id:"boundrendertarget",children:[]},{value:"boundTextures",id:"boundtextures",children:[]},{value:"cameraMatrix",id:"cameramatrix",children:[]},{value:"directives",id:"directives",children:[]},{value:"drawItemsTexture",id:"drawitemstexture",children:[]},{value:"floatGeomBuffer",id:"floatgeombuffer",children:[]},{value:"geomDataFbo",id:"geomdatafbo",children:[]},{value:"gl",id:"gl",children:[]},{value:"glGeom",id:"glgeom",children:[]},{value:"glShader",id:"glshader",children:[]},{value:"pass",id:"pass",children:[]},{value:"passIndex",id:"passindex",children:[]},{value:"region",id:"region",children:[]},{value:"shaderkey",id:"shaderkey",children:[]},{value:"shaderopts",id:"shaderopts",children:[]},{value:"supportsInstancing",id:"supportsinstancing",children:[]},{value:"unifs",id:"unifs",children:[]},{value:"viewScale",id:"viewscale",children:[]},{value:"viewXfo",id:"viewxfo",children:[]},{value:"viewport",id:"viewport",children:[]},{value:"viewports",id:"viewports",children:[]},{value:"vrPresenting",id:"vrpresenting",children:[]},{value:"vrviewport",id:"vrviewport",children:[]}]},{value:"Methods",id:"methods",children:[{value:"bindRendererUnifs",id:"bindrendererunifs",children:[]},{value:"bindViewports",id:"bindviewports",children:[]}]}],h={toc:o};function k(e){var r=e.components,t=(0,a.Z)(e,i);return(0,d.kt)("wrapper",(0,n.Z)({},h,t,{components:r,mdxType:"MDXLayout"}),(0,d.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,d.kt)("ul",null,(0,d.kt)("li",{parentName:"ul"},(0,d.kt)("p",{parentName:"li"},(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},(0,d.kt)("inlineCode",{parentName:"a"},"BaseRenderState"))),(0,d.kt)("p",{parentName:"li"},"\u21b3 ",(0,d.kt)("strong",{parentName:"p"},(0,d.kt)("inlineCode",{parentName:"strong"},"GeomDataRenderState"))))),(0,d.kt)("h2",{id:"properties"},"Properties"),(0,d.kt)("h3",{id:"attrs"},"attrs"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"attrs"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,d.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"Record"),"<",(0,d.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"any"),">",">"),(0,d.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#attrs"},"attrs")),(0,d.kt)("h4",{id:"defined-in"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L17"},"src/Renderer/types/renderer.ts:17")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"boundrendertarget"},"boundRendertarget"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"boundRendertarget"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"WebGLFramebuffer")),(0,d.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#boundrendertarget"},"boundRendertarget")),(0,d.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L39"},"src/Renderer/types/renderer.ts:39")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"boundtextures"},"boundTextures"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"boundTextures"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"number")),(0,d.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#boundtextures"},"boundTextures")),(0,d.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L38"},"src/Renderer/types/renderer.ts:38")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"cameramatrix"},"cameraMatrix"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"cameraMatrix"),": ",(0,d.kt)("a",{parentName:"p",href:"../../Math/Math_Mat4.Mat4"},(0,d.kt)("inlineCode",{parentName:"a"},"Mat4"))),(0,d.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#cameramatrix"},"cameraMatrix")),(0,d.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L44"},"src/Renderer/types/renderer.ts:44")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"directives"},"directives"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"directives"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,d.kt)("h4",{id:"inherited-from-4"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#directives"},"directives")),(0,d.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L19"},"src/Renderer/types/renderer.ts:19")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"drawitemstexture"},"drawItemsTexture"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"drawItemsTexture"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"any")),(0,d.kt)("h4",{id:"inherited-from-5"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#drawitemstexture"},"drawItemsTexture")),(0,d.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L21"},"src/Renderer/types/renderer.ts:21")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"floatgeombuffer"},"floatGeomBuffer"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"floatGeomBuffer"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L52"},"src/Renderer/types/renderer.ts:52")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"geomdatafbo"},"geomDataFbo"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"geomDataFbo"),": ",(0,d.kt)("a",{parentName:"p",href:"../Renderer_GLFbo.GLFbo"},(0,d.kt)("inlineCode",{parentName:"a"},"GLFbo"))),(0,d.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L51"},"src/Renderer/types/renderer.ts:51")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"gl"},"gl"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"gl"),": ",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_webgl.WebGL12RenderingContext"},(0,d.kt)("inlineCode",{parentName:"a"},"WebGL12RenderingContext"))),(0,d.kt)("h4",{id:"inherited-from-6"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#gl"},"gl")),(0,d.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L13"},"src/Renderer/types/renderer.ts:13")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"glgeom"},"glGeom"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"glGeom"),": ",(0,d.kt)("a",{parentName:"p",href:"../Drawing/Renderer_Drawing_GLGeom.GLGeom"},(0,d.kt)("inlineCode",{parentName:"a"},"GLGeom"))),(0,d.kt)("h4",{id:"inherited-from-7"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#glgeom"},"glGeom")),(0,d.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L23"},"src/Renderer/types/renderer.ts:23")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"glshader"},"glShader"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"glShader"),": ",(0,d.kt)("a",{parentName:"p",href:"../Renderer_GLShader.GLShader"},(0,d.kt)("inlineCode",{parentName:"a"},"GLShader"))),(0,d.kt)("h4",{id:"inherited-from-8"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#glshader"},"glShader")),(0,d.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L14"},"src/Renderer/types/renderer.ts:14")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"pass"},"pass"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"pass"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"string")),(0,d.kt)("h4",{id:"inherited-from-9"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#pass"},"pass")),(0,d.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L28"},"src/Renderer/types/renderer.ts:28")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"passindex"},"passIndex"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"passIndex"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"number")),(0,d.kt)("h4",{id:"inherited-from-10"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#passindex"},"passIndex")),(0,d.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L27"},"src/Renderer/types/renderer.ts:27")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"region"},"region"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"region"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"number"),"[]"),(0,d.kt)("h4",{id:"inherited-from-11"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#region"},"region")),(0,d.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L43"},"src/Renderer/types/renderer.ts:43")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"shaderkey"},"shaderkey"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"shaderkey"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"string")),(0,d.kt)("h4",{id:"inherited-from-12"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#shaderkey"},"shaderkey")),(0,d.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L15"},"src/Renderer/types/renderer.ts:15")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"shaderopts"},"shaderopts"),(0,d.kt)("h4",{id:"inherited-from-13"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#shaderopts"},"shaderopts")),(0,d.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L16"},"src/Renderer/types/renderer.ts:16")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"supportsinstancing"},"supportsInstancing"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"supportsInstancing"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("h4",{id:"inherited-from-14"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#supportsinstancing"},"supportsInstancing")),(0,d.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L31"},"src/Renderer/types/renderer.ts:31")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"unifs"},"unifs"),(0,d.kt)("h4",{id:"inherited-from-15"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#unifs"},"unifs")),(0,d.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L18"},"src/Renderer/types/renderer.ts:18")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"viewscale"},"viewScale"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("strong",{parentName:"p"},"viewScale"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"number")),(0,d.kt)("h4",{id:"inherited-from-16"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#viewscale"},"viewScale")),(0,d.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L42"},"src/Renderer/types/renderer.ts:42")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"viewxfo"},"viewXfo"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"viewXfo"),": ",(0,d.kt)("a",{parentName:"p",href:"../../Math/Math_Xfo.Xfo"},(0,d.kt)("inlineCode",{parentName:"a"},"Xfo"))),(0,d.kt)("h4",{id:"inherited-from-17"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#viewxfo"},"viewXfo")),(0,d.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L41"},"src/Renderer/types/renderer.ts:41")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"viewport"},"viewport"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"viewport"),": ",(0,d.kt)("a",{parentName:"p",href:"../Renderer_GLBaseViewport.GLBaseViewport"},(0,d.kt)("inlineCode",{parentName:"a"},"GLBaseViewport"))),(0,d.kt)("h4",{id:"inherited-from-18"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#viewport"},"viewport")),(0,d.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L32"},"src/Renderer/types/renderer.ts:32")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"viewports"},"viewports"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"viewports"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"any")),(0,d.kt)("h4",{id:"inherited-from-19"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#viewports"},"viewports")),(0,d.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L33"},"src/Renderer/types/renderer.ts:33")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"vrpresenting"},"vrPresenting"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"vrPresenting"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"boolean")),(0,d.kt)("h4",{id:"inherited-from-20"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#vrpresenting"},"vrPresenting")),(0,d.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L30"},"src/Renderer/types/renderer.ts:30")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"vrviewport"},"vrviewport"),(0,d.kt)("p",null,"\u2022 ",(0,d.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,d.kt)("strong",{parentName:"p"},"vrviewport"),": ",(0,d.kt)("inlineCode",{parentName:"p"},"any")),(0,d.kt)("h4",{id:"inherited-from-21"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#vrviewport"},"vrviewport")),(0,d.kt)("h4",{id:"defined-in-23"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L25"},"src/Renderer/types/renderer.ts:25")),(0,d.kt)("h2",{id:"methods"},"Methods"),(0,d.kt)("h3",{id:"bindrendererunifs"},"bindRendererUnifs"),(0,d.kt)("p",null,"\u25b8 ",(0,d.kt)("strong",{parentName:"p"},"bindRendererUnifs"),"(",(0,d.kt)("inlineCode",{parentName:"p"},"unifs"),"): ",(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"parameters"},"Parameters"),(0,d.kt)("table",null,(0,d.kt)("thead",{parentName:"table"},(0,d.kt)("tr",{parentName:"thead"},(0,d.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Type")))),(0,d.kt)("h4",{id:"returns"},"Returns"),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"inherited-from-22"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#bindrendererunifs"},"bindRendererUnifs")),(0,d.kt)("h4",{id:"defined-in-24"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L36"},"src/Renderer/types/renderer.ts:36")),(0,d.kt)("hr",null),(0,d.kt)("h3",{id:"bindviewports"},"bindViewports"),(0,d.kt)("p",null,"\u25b8 ",(0,d.kt)("strong",{parentName:"p"},"bindViewports"),"(",(0,d.kt)("inlineCode",{parentName:"p"},"unifs"),", ",(0,d.kt)("inlineCode",{parentName:"p"},"cb"),"): ",(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"parameters-1"},"Parameters"),(0,d.kt)("table",null,(0,d.kt)("thead",{parentName:"table"},(0,d.kt)("tr",{parentName:"thead"},(0,d.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,d.kt)("th",{parentName:"tr",align:"left"},"Type")))),(0,d.kt)("p",null,"| ",(0,d.kt)("inlineCode",{parentName:"p"},"cb")," | ",(0,d.kt)("inlineCode",{parentName:"p"},"any")," |"),(0,d.kt)("h4",{id:"returns-1"},"Returns"),(0,d.kt)("p",null,(0,d.kt)("inlineCode",{parentName:"p"},"void")),(0,d.kt)("h4",{id:"inherited-from-23"},"Inherited from"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState"},"BaseRenderState"),".",(0,d.kt)("a",{parentName:"p",href:"Renderer_types_renderer.BaseRenderState#bindviewports"},"bindViewports")),(0,d.kt)("h4",{id:"defined-in-25"},"Defined in"),(0,d.kt)("p",null,(0,d.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/types/renderer.ts#L35"},"src/Renderer/types/renderer.ts:35")))}k.isMDXComponent=!0}}]);