"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[6449],{3905:function(e,n,t){t.d(n,{Zo:function(){return s},kt:function(){return g}});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var o=r.createContext({}),p=function(e){var n=r.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):d(d({},n),e)),t},s=function(e){var n=p(e.components);return r.createElement(o.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=p(t),g=a,m=c["".concat(o,".").concat(g)]||c[g]||u[g]||i;return t?r.createElement(m,d(d({ref:n},s),{},{components:t})):r.createElement(m,d({ref:n},s))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,d=new Array(i);d[0]=c;var l={};for(var o in n)hasOwnProperty.call(n,o)&&(l[o]=n[o]);l.originalType=e,l.mdxType="string"==typeof e?e:a,d[1]=l;for(var p=2;p<i;p++)d[p]=t[p];return r.createElement.apply(null,d)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5522:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return o},metadata:function(){return p},toc:function(){return s},default:function(){return c}});var r=t(7462),a=t(3366),i=(t(7294),t(3905)),d=["components"],l={id:"Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding",title:"Class: MaterialShaderBinding",sidebar_label:"MaterialShaderBinding",custom_edit_url:null},o=void 0,p={unversionedId:"API/Renderer/Drawing/Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding",id:"API/Renderer/Drawing/Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding",isDocsHomePage:!1,title:"Class: MaterialShaderBinding",description:"Class representing material shader binding.",source:"@site/docs/API/Renderer/Drawing/MaterialShaderBinding.md",sourceDirName:"API/Renderer/Drawing",slug:"/API/Renderer/Drawing/Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding",permalink:"/zea-engine/API/Renderer/Drawing/Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding",editUrl:null,tags:[],version:"current",frontMatter:{id:"Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding",title:"Class: MaterialShaderBinding",sidebar_label:"MaterialShaderBinding",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"IGeomShaderBinding",permalink:"/zea-engine/API/Renderer/Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding"},next:{title:"GLAudioItemsPass",permalink:"/zea-engine/API/Renderer/Passes/Renderer_Passes_GLAudioItemsPass.GLAudioItemsPass"}},s=[{value:"Constructors",id:"constructors",children:[{value:"constructor",id:"constructor",children:[]}]},{value:"Properties",id:"properties",children:[{value:"uniformBindings",id:"uniformbindings",children:[]}]},{value:"Methods",id:"methods",children:[{value:"bind",id:"bind",children:[]},{value:"destroy",id:"destroy",children:[]},{value:"unbind",id:"unbind",children:[]}]}],u={toc:s};function c(e){var n=e.components,t=(0,a.Z)(e,d);return(0,i.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Class representing material shader binding."),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new MaterialShaderBinding"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"gl"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"glMaterial"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"unifs"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"warnMissingUnifs"),")"),(0,i.kt)("p",null,"Create material shader binding."),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"gl")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("a",{parentName:"td",href:"../types/Renderer_types_webgl.WebGL12RenderingContext"},(0,i.kt)("inlineCode",{parentName:"a"},"WebGL12RenderingContext"))),(0,i.kt)("td",{parentName:"tr",align:"left"},"The webgl rendering context.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"glMaterial")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"any")),(0,i.kt)("td",{parentName:"tr",align:"left"},"The glMaterial value.")))),(0,i.kt)("p",null,"| ",(0,i.kt)("inlineCode",{parentName:"p"},"warnMissingUnifs")," | ",(0,i.kt)("inlineCode",{parentName:"p"},"any")," | The warnMissingUnifs value. |"),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Drawing/MaterialShaderBinding.ts#L501"},"src/Renderer/Drawing/MaterialShaderBinding.ts:501")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"uniformbindings"},"uniformBindings"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Protected")," ",(0,i.kt)("strong",{parentName:"p"},"uniformBindings"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"ParamUniformBinding"),"[] = ",(0,i.kt)("inlineCode",{parentName:"p"},"[]")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Drawing/MaterialShaderBinding.ts#L493"},"src/Renderer/Drawing/MaterialShaderBinding.ts:493")),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"bind"},"bind"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"bind"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("p",null,"The bind method."),(0,i.kt)("h4",{id:"parameters-1"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Description")))),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The return value.")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Drawing/MaterialShaderBinding.ts#L583"},"src/Renderer/Drawing/MaterialShaderBinding.ts:583")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"destroy"},"destroy"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"destroy"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The destroy is called by the system to cause explicit resources cleanup.\nUsers should never need to call this method directly."),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Drawing/MaterialShaderBinding.ts#L603"},"src/Renderer/Drawing/MaterialShaderBinding.ts:603")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"unbind"},"unbind"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"unbind"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"renderstate"),"): ",(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("p",null,"The unbind method."),(0,i.kt)("h4",{id:"parameters-2"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type")))),(0,i.kt)("h4",{id:"returns-2"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"void")),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/0a2901eeb/src/Renderer/Drawing/MaterialShaderBinding.ts#L593"},"src/Renderer/Drawing/MaterialShaderBinding.ts:593")))}c.isMDXComponent=!0}}]);