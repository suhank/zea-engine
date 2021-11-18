"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[9809],{3905:function(e,t,r){r.d(t,{Zo:function(){return m},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},m=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),s=c(r),d=a,f=s["".concat(p,".").concat(d)]||s[d]||u[d]||i;return r?n.createElement(f,l(l({ref:t},m),{},{components:r})):n.createElement(f,l({ref:t},m))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,l=new Array(i);l[0]=s;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<i;c++)l[c]=r[c];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},9187:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return m},default:function(){return s}});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),l=["components"],o={id:"SceneTree_Owner.Owner",title:"Interface: Owner",sidebar_label:"Owner",custom_edit_url:null},p=void 0,c={unversionedId:"API/SceneTree/SceneTree_Owner.Owner",id:"API/SceneTree/SceneTree_Owner.Owner",isDocsHomePage:!1,title:"Interface: Owner",description:"Implemented by",source:"@site/docs/API/SceneTree/Owner.md",sourceDirName:"API/SceneTree",slug:"/API/SceneTree/SceneTree_Owner.Owner",permalink:"/zea-engine/API/SceneTree/SceneTree_Owner.Owner",editUrl:null,tags:[],version:"current",frontMatter:{id:"SceneTree_Owner.Owner",title:"Interface: Owner",sidebar_label:"Owner",custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"ObjAsset",permalink:"/zea-engine/API/SceneTree/SceneTree_ObjAsset.ObjAsset"},next:{title:"ParameterOwner",permalink:"/zea-engine/API/SceneTree/SceneTree_ParameterOwner.ParameterOwner"}},m=[{value:"Implemented by",id:"implemented-by",children:[]},{value:"Methods",id:"methods",children:[{value:"getPath",id:"getpath",children:[]},{value:"resolvePath",id:"resolvepath",children:[]}]}],u={toc:m};function s(e){var t=e.components,r=(0,a.Z)(e,l);return(0,i.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"implemented-by"},"Implemented by"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"SceneTree_BaseItem.BaseItem"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseItem"))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"SceneTree_MaterialLibrary.MaterialLibrary"},(0,i.kt)("inlineCode",{parentName:"a"},"MaterialLibrary")))),(0,i.kt)("h2",{id:"methods"},"Methods"),(0,i.kt)("h3",{id:"getpath"},"getPath"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"getPath"),"(): ",(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,i.kt)("p",null,"Returns the current path of the item in the tree as an array of names."),(0,i.kt)("h4",{id:"returns"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"string"),"[]"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Returns an array.")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/SceneTree/Owner.ts#L10"},"SceneTree/Owner.ts:10")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"resolvepath"},"resolvePath"),(0,i.kt)("p",null,"\u25b8 ",(0,i.kt)("strong",{parentName:"p"},"resolvePath"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"path"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"index?"),"): ",(0,i.kt)("a",{parentName:"p",href:"SceneTree_BaseItem.BaseItem"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseItem"))," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"Parameters/SceneTree_Parameters_Parameter.Parameter"},(0,i.kt)("inlineCode",{parentName:"a"},"Parameter")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"path")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"),"[]")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"index?")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"number"))))),(0,i.kt)("h4",{id:"returns-1"},"Returns"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"SceneTree_BaseItem.BaseItem"},(0,i.kt)("inlineCode",{parentName:"a"},"BaseItem"))," ","|"," ",(0,i.kt)("a",{parentName:"p",href:"Parameters/SceneTree_Parameters_Parameter.Parameter"},(0,i.kt)("inlineCode",{parentName:"a"},"Parameter")),"<",(0,i.kt)("inlineCode",{parentName:"p"},"any"),">"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/ZeaInc/zea-engine/blob/434f018d2/src/SceneTree/Owner.ts#L12"},"SceneTree/Owner.ts:12")))}s.isMDXComponent=!0}}]);