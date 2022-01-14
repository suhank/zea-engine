"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[7354],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return g}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),g=r,m=d["".concat(s,".").concat(g)]||d[g]||c[g]||i;return n?a.createElement(m,o(o({ref:t},u),{},{components:n})):a.createElement(m,o({ref:t},u))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6928:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return u},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={sidebar_position:3,title:"Debugging"},s=void 0,p={unversionedId:"Manual/Getting-Started/debugging",id:"Manual/Getting-Started/debugging",isDocsHomePage:!1,title:"Debugging",description:"this follows the previous part Build your first project",source:"@site/docs/Manual/Getting-Started/debugging.md",sourceDirName:"Manual/Getting-Started",slug:"/Manual/Getting-Started/debugging",permalink:"/zea-engine/Manual/Getting-Started/debugging",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Debugging"},sidebar:"manualSideBar",previous:{title:"Build Your First Project",permalink:"/zea-engine/Manual/Getting-Started/build-first-project"},next:{title:"Supported Platforms",permalink:"/zea-engine/Manual/Getting-Started/supported-platforms"}},u=[{value:"Step 1",id:"step-1",children:[]},{value:"Step 2",id:"step-2",children:[]},{value:"Step 3",id:"step-3",children:[]},{value:"Step 4",id:"step-4",children:[]},{value:"Next steps",id:"next-steps",children:[]}],c={toc:u};function d(e){var t=e.components,l=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},c,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"this follows the previous part ",(0,i.kt)("a",{parentName:"p",href:"../getting-started/build-first-project"},"Build your first project"))),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Please make sure you're already familiar with ",(0,i.kt)("a",{parentName:"p",href:"https://developers.google.com/web/tools/chrome-devtools/javascript"},"debugging JavaScript using Chrome DevTools"),".")),(0,i.kt)("p",null,"Now, let's debug a hypothetical situation. For some reason, your grid is not rendering, and all you get is a strange looking white plane, like this:"),(0,i.kt)("p",null,"\ud83d\udcf7 A strange looking white plane, Aka, the \ud83d\udc1e:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-strange-plane",src:n(6149).Z,title:":class=screenshot"})),(0,i.kt)("h3",{id:"step-1"},"Step 1"),(0,i.kt)("p",null,"Open the DevTools Sources panel and locate the index.js file:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-sources-panel",src:n(5452).Z,title:":class=screenshot"})),(0,i.kt)("h3",{id:"step-2"},"Step 2"),(0,i.kt)("p",null,"Pause the code with a breakpoint:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-breakpoint-start",src:n(8351).Z,title:":class=screenshot"})),(0,i.kt)("h3",{id:"step-3"},"Step 3"),(0,i.kt)("p",null,"Step through the code until the end of the file:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-breakpoint-end",src:n(7079).Z,title:":class=screenshot"})),(0,i.kt)("p",null,"Aha! Looks like we're so thrilled about learning the Zea Engine ways, that we accidentally left an extra line at the end. It turns out the strange looking white plane is actually a very crammed grid, with 10000 subdivisions in each direction."),(0,i.kt)("h3",{id:"step-4"},"Step 4"),(0,i.kt)("p",null,"Remove or comment the problematic line. Your grid should render again:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-commented-line",src:n(3262).Z,title:":class=screenshot"})),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"getting-started-working-grid",src:n(597).Z,title:":class=screenshot"})),(0,i.kt)("h2",{id:"next-steps"},"Next steps"),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Use the ",(0,i.kt)("a",{parentName:"p",href:"/zea-engine/Tutorials/basic-template"},"Basic Setup Template")," and follow a few ",(0,i.kt)("a",{parentName:"p",href:"/zea-engine/Tutorials/tutorials"},"Tutorials"),".")),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"Learn how to ",(0,i.kt)("a",{parentName:"p",href:"/zea-engine/Tutorials/load-an-asset"},"load assets")," into your Zea Engine App; when you're done with that, view the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.zea.live/zea-cad/#/getting-started/get-started-with-zea-cad"},"Zea CAD")," docs for more advanced use cases.")))}d.isMDXComponent=!0},7079:function(e,t){t.Z="data:image/png;base64,dmVyc2lvbiBodHRwczovL2dpdC1sZnMuZ2l0aHViLmNvbS9zcGVjL3YxCm9pZCBzaGEyNTY6MjVlZTUzMmNjMzkzZDNiOTY4Y2RjZGRlNmUzMzMyMzEyZDVjYzg0N2YwN2EwNmUzNjVmNWRjODg0YTU3ODJhYwpzaXplIDM0NDE5Cg=="},8351:function(e,t){t.Z="data:image/png;base64,dmVyc2lvbiBodHRwczovL2dpdC1sZnMuZ2l0aHViLmNvbS9zcGVjL3YxCm9pZCBzaGEyNTY6N2VlZTM5ZmU2ZDhlNTE3ZGJkODczNTY1NTFlZjEyOWQ2OTYyMjQxOWZhMGI4ZGQ2MWY1MzgzM2RiYmE4OWYzMgpzaXplIDMxODUwCg=="},3262:function(e,t){t.Z="data:image/png;base64,dmVyc2lvbiBodHRwczovL2dpdC1sZnMuZ2l0aHViLmNvbS9zcGVjL3YxCm9pZCBzaGEyNTY6NjkxNDZkMjY1ZWM3N2YzN2JlZDZmYzFjNDlhYzEwMDVkMGMxMTVhYTAwZTU3OTEyMGE1YzVhZjBlY2VhNzlhYQpzaXplIDMxNzE4Cg=="},5452:function(e,t){t.Z="data:image/png;base64,dmVyc2lvbiBodHRwczovL2dpdC1sZnMuZ2l0aHViLmNvbS9zcGVjL3YxCm9pZCBzaGEyNTY6MTU0MjQwMDliNGVmNzY2MjgwYjg2YTMxYmM0NzA4N2VjMDU2NDM1MGZmZmFiMjQ1MTgzODk3NmEzYjBjN2YzNQpzaXplIDM1NTQ2Cg=="},6149:function(e,t){t.Z="data:image/png;base64,dmVyc2lvbiBodHRwczovL2dpdC1sZnMuZ2l0aHViLmNvbS9zcGVjL3YxCm9pZCBzaGEyNTY6OTRkMmEwNDU2MDdjZWU3ODIxNGU5ZDU5ZDQ1ZjVkMjFkNWI1N2MzNTAxZGZkN2Y1MmJkNzY2NmRiZjYzYzk4ZgpzaXplIDExODIzCg=="},597:function(e,t){t.Z="data:image/png;base64,dmVyc2lvbiBodHRwczovL2dpdC1sZnMuZ2l0aHViLmNvbS9zcGVjL3YxCm9pZCBzaGEyNTY6NjllYWI2YzYxMjI0OTU0MDZmZmQwNGFjYmE4ZTM0NDJkOTc0ODY2OTUwZTZiNGFmMWYwZjZkNTA2YzA1Y2EwZQpzaXplIDE4NTYyCg=="}}]);