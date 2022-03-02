"use strict";(self.webpackChunk_griffel_website=self.webpackChunk_griffel_website||[]).push([[514,366],{5152:(e,t,n)=>{n.d(t,{Z:()=>T});var a=n(7896),r=n(2784),o=n(6277);const l={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]};var c={Prism:n(7175).default,theme:l};function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s.apply(this,arguments)}var u=/\r\n|\r|\n/,d=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},m=function(e,t){var n=e.length;return n>0&&e[n-1]===t?e:e.concat(t)},p=function(e,t){var n=e.plain,a=Object.create(null),r=e.styles.reduce((function(e,n){var a=n.languages,r=n.style;return a&&!a.includes(t)||n.types.forEach((function(t){var n=s({},e[t],r);e[t]=n})),e}),a);return r.root=n,r.plain=s({},n,{backgroundColor:null}),r};function f(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}const h=function(e){function t(){for(var t=this,n=[],a=arguments.length;a--;)n[a]=arguments[a];e.apply(this,n),i(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var n=e.theme?p(e.theme,e.language):void 0;return t.themeDict=n})),i(this,"getLineProps",(function(e){var n=e.key,a=e.className,r=e.style,o=s({},f(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),l=t.getThemeDict(t.props);return void 0!==l&&(o.style=l.plain),void 0!==r&&(o.style=void 0!==o.style?s({},o.style,r):r),void 0!==n&&(o.key=n),a&&(o.className+=" "+a),o})),i(this,"getStyleForToken",(function(e){var n=e.types,a=e.empty,r=n.length,o=t.getThemeDict(t.props);if(void 0!==o){if(1===r&&"plain"===n[0])return a?{display:"inline-block"}:void 0;if(1===r&&!a)return o[n[0]];var l=a?{display:"inline-block"}:{},c=n.map((function(e){return o[e]}));return Object.assign.apply(Object,[l].concat(c))}})),i(this,"getTokenProps",(function(e){var n=e.key,a=e.className,r=e.style,o=e.token,l=s({},f(e,["key","className","style","token"]),{className:"token "+o.types.join(" "),children:o.content,style:t.getStyleForToken(o),key:void 0});return void 0!==r&&(l.style=void 0!==l.style?s({},l.style,r):r),void 0!==n&&(l.key=n),a&&(l.className+=" "+a),l})),i(this,"tokenize",(function(e,t,n,a){var r={code:t,grammar:n,language:a,tokens:[]};e.hooks.run("before-tokenize",r);var o=r.tokens=e.tokenize(r.code,r.grammar,r.language);return e.hooks.run("after-tokenize",r),o}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,n=e.language,a=e.code,r=e.children,o=this.getThemeDict(this.props),l=t.languages[n];return r({tokens:function(e){for(var t=[[]],n=[e],a=[0],r=[e.length],o=0,l=0,c=[],i=[c];l>-1;){for(;(o=a[l]++)<r[l];){var s=void 0,p=t[l],f=n[l][o];if("string"==typeof f?(p=l>0?p:["plain"],s=f):(p=m(p,f.type),f.alias&&(p=m(p,f.alias)),s=f.content),"string"==typeof s){var h=s.split(u),b=h.length;c.push({types:p,content:h[0]});for(var v=1;v<b;v++)d(c),i.push(c=[]),c.push({types:p,content:h[v]})}else l++,t.push(p),n.push(s),a.push(0),r.push(s.length)}l--,t.pop(),n.pop(),a.pop(),r.pop()}return d(c),i}(void 0!==l?this.tokenize(t,a,l,n):[a]),className:"prism-code language-"+n,style:void 0!==o?o.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(r.Component);var b=n(8004),v=n(4499);const y="codeBlockContainer_iq8S",g="codeBlockContent_U58x",E="codeBlockTitle_bZYx",k="codeBlock_UzyX",Z="codeBlockStandalone_TOuF",N="copyButton_YRtT",C="codeBlockLines_WYyR";function T(e){var t,n=e.children,l=e.className,i=void 0===l?"":l,s=e.metastring,u=e.title,d=e.language,m=(0,v.LU)().prism,p=(0,r.useState)(!1),f=p[0],T=p[1],_=(0,r.useState)(!1),S=_[0],O=_[1];(0,r.useEffect)((function(){O(!0)}),[]);var x=(0,v.bc)(s)||u,P=(0,v.pJ)();if(r.Children.toArray(n).some((function(e){return(0,r.isValidElement)(e)})))return r.createElement(h,(0,a.Z)({},c,{key:String(S),theme:P,code:"",language:"text"}),(function(e){var t=e.className,a=e.style;return r.createElement("pre",{tabIndex:0,className:(0,o.Z)(t,Z,"thin-scrollbar",y,i,v.kM.common.codeBlock),style:a},r.createElement("code",{className:C},n))}));var I=Array.isArray(n)?n.join(""):n,L=null!=(t=null!=d?d:(0,v.Vo)(i))?t:m.defaultLanguage,w=(0,v.nZ)(I,s,L),M=w.highlightLines,A=w.code,j=function(){!function(e,t){var n=(void 0===t?{}:t).target,a=void 0===n?document.body:n,r=document.createElement("textarea"),o=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";var l=document.getSelection(),c=!1;l.rangeCount>0&&(c=l.getRangeAt(0)),a.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;var i=!1;try{i=document.execCommand("copy")}catch(s){}r.remove(),c&&(l.removeAllRanges(),l.addRange(c)),o&&o.focus()}(A),T(!0),setTimeout((function(){return T(!1)}),2e3)};return r.createElement(h,(0,a.Z)({},c,{key:String(S),theme:P,code:A,language:null!=L?L:"text"}),(function(e){var t,n=e.className,l=e.style,c=e.tokens,s=e.getLineProps,u=e.getTokenProps;return r.createElement("div",{className:(0,o.Z)(y,i,(t={},t["language-"+L]=L&&!i.includes("language-"+L),t),v.kM.common.codeBlock)},x&&r.createElement("div",{style:l,className:E},x),r.createElement("div",{className:(0,o.Z)(g,L)},r.createElement("pre",{tabIndex:0,className:(0,o.Z)(n,k,"thin-scrollbar"),style:l},r.createElement("code",{className:C},c.map((function(e,t){1===e.length&&"\n"===e[0].content&&(e[0].content="");var n=s({line:e,key:t});return M.includes(t)&&(n.className+=" docusaurus-highlight-code-line"),r.createElement("span",(0,a.Z)({key:t},n),e.map((function(e,t){return r.createElement("span",(0,a.Z)({key:t},u({token:e,key:t})))})),r.createElement("br",null))})))),r.createElement("button",{type:"button","aria-label":(0,b.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,o.Z)(N,"clean-btn"),onClick:j},f?r.createElement(b.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):r.createElement(b.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}},419:(e,t,n)=>{n.r(t),n.d(t,{default:()=>oe});var a=n(2784),r=n(876),o=n(4246),l=n(7112),c=n(6277),i=n(4499),s=n(3505),u=n(7896);const d=function(e){return a.createElement("svg",(0,u.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))};var m=n(8004),p=n(1461),f=n(2896),h=n(8949),b=n(1022);const v="menuLinkText_LasM",y="hasHref_YNL7";var g=n(6930),E=["item"],k=["item","onItemClick","activePath","level","index"],Z=["item","onItemClick","activePath","level","index"];function N(e){var t=e.item,n=(0,p.Z)(e,E);return"category"===t.type?0===t.items.length?null:a.createElement(C,(0,u.Z)({item:t},n)):a.createElement(T,(0,u.Z)({item:t},n))}function C(e){var t,n=e.item,r=e.onItemClick,o=e.activePath,l=e.level,s=e.index,d=(0,p.Z)(e,k),h=n.items,b=n.label,E=n.collapsible,Z=n.className,N=n.href,C=function(e){var t=(0,g.Z)();return(0,a.useMemo)((function(){return e.href?e.href:!t&&e.collapsible?(0,i.Wl)(e):void 0}),[e,t])}(n),T=(0,i._F)(n,o),_=(0,i.uR)({initialState:function(){return!!E&&(!T&&n.collapsed)}}),S=_.collapsed,x=_.setCollapsed;!function(e){var t=e.isActive,n=e.collapsed,r=e.setCollapsed,o=(0,i.D9)(t);(0,a.useEffect)((function(){t&&!o&&n&&r(!1)}),[t,o,n,r])}({isActive:T,collapsed:S,setCollapsed:x});var P=(0,i.fP)(),I=P.expandedItem,L=P.setExpandedItem;function w(e){void 0===e&&(e=!S),L(e?null:s),x(e)}var M=(0,i.LU)().autoCollapseSidebarCategories;return(0,a.useEffect)((function(){E&&I&&I!==s&&M&&x(!0)}),[E,I,s,x,M]),a.createElement("li",{className:(0,c.Z)(i.kM.docs.docSidebarItemCategory,i.kM.docs.docSidebarItemCategoryLevel(l),"menu__list-item",{"menu__list-item--collapsed":S},Z)},a.createElement("div",{className:"menu__list-item-collapsible"},a.createElement(f.Z,(0,u.Z)({className:(0,c.Z)("menu__link",(t={"menu__link--sublist":E&&!N,"menu__link--active":T},t[v]=!E,t[y]=!!C,t)),onClick:E?function(e){null==r||r(n),N?w(!1):(e.preventDefault(),w())}:function(){null==r||r(n)},"aria-current":T?"page":void 0,href:E?null!=C?C:"#":C},d),b),N&&E&&a.createElement("button",{"aria-label":(0,m.I)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:b}),type:"button",className:"clean-btn menu__caret",onClick:function(e){e.preventDefault(),w()}})),a.createElement(i.zF,{lazy:!0,as:"ul",className:"menu__list",collapsed:S},a.createElement(O,{items:h,tabIndex:S?-1:0,onItemClick:r,activePath:o,level:l+1})))}function T(e){var t=e.item,n=e.onItemClick,r=e.activePath,o=e.level,l=(e.index,(0,p.Z)(e,Z)),s=t.href,d=t.label,m=t.className,v=(0,i._F)(t,r);return a.createElement("li",{className:(0,c.Z)(i.kM.docs.docSidebarItemLink,i.kM.docs.docSidebarItemLinkLevel(o),"menu__list-item",m),key:d},a.createElement(f.Z,(0,u.Z)({className:(0,c.Z)("menu__link",{"menu__link--active":v}),"aria-current":v?"page":void 0,to:s},(0,h.Z)(s)&&{onClick:n?function(){return n(t)}:void 0},l),(0,h.Z)(s)?d:a.createElement("span",null,d,a.createElement(b.Z,null))))}var _=["items"];function S(e){var t=e.items,n=(0,p.Z)(e,_);return a.createElement(i.D_,null,t.map((function(e,t){return a.createElement(N,(0,u.Z)({key:t,item:e,index:t},n))})))}const O=(0,a.memo)(S),x="sidebar_Phem",P="sidebarWithHideableNavbar_OgHk",I="sidebarHidden_CDVn",L="sidebarLogo_CQQ7",w="menu_L8R3",M="menuWithAnnouncementBar_pNFu",A="collapseSidebarButton_mKUW",j="collapseSidebarButtonIcon_X2a5";function D(e){var t=e.onClick;return a.createElement("button",{type:"button",title:(0,m.I)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,m.I)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,c.Z)("button button--secondary button--outline",A),onClick:t},a.createElement(d,{className:j}))}function B(e){var t,n,r=e.path,o=e.sidebar,l=e.onCollapse,u=e.isHidden,d=function(){var e=(0,i.nT)().isActive,t=(0,a.useState)(e),n=t[0],r=t[1];return(0,i.RF)((function(t){var n=t.scrollY;e&&r(0===n)}),[e]),e&&n}(),m=(0,i.LU)(),p=m.navbar.hideOnScroll,f=m.hideableSidebar;return a.createElement("div",{className:(0,c.Z)(x,(t={},t[P]=p,t[I]=u,t))},p&&a.createElement(s.Z,{tabIndex:-1,className:L}),a.createElement("nav",{className:(0,c.Z)("menu thin-scrollbar",w,(n={},n[M]=d,n))},a.createElement("ul",{className:(0,c.Z)(i.kM.docs.docSidebarMenu,"menu__list")},a.createElement(O,{items:o,activePath:r,level:1}))),f&&a.createElement(D,{onClick:l}))}var F=function(e){var t=e.toggleSidebar,n=e.sidebar,r=e.path;return a.createElement("ul",{className:(0,c.Z)(i.kM.docs.docSidebarMenu,"menu__list")},a.createElement(O,{items:n,activePath:r,onItemClick:function(e){"category"===e.type&&e.href&&t(),"link"===e.type&&t()},level:1}))};function R(e){return a.createElement(i.Cv,{component:F,props:e})}var H=a.memo(B),W=a.memo(R);function z(e){var t=(0,i.iP)(),n="desktop"===t||"ssr"===t,r="mobile"===t;return a.createElement(a.Fragment,null,n&&a.createElement(H,e),r&&a.createElement(W,e))}var U=n(4283),Y=n(5152),V=n(9773);const q="details_ZdG1";function J(e){var t=Object.assign({},e);return a.createElement(i.PO,(0,u.Z)({},t,{className:(0,c.Z)("alert alert--info",q,t.className)}))}var X=["mdxType","originalType"];const K={head:function(e){var t=a.Children.map(e.children,(function(e){return function(e){var t,n;if(null!=e&&null!=(t=e.props)&&t.mdxType&&null!=e&&null!=(n=e.props)&&n.originalType){var r=e.props,o=(r.mdxType,r.originalType,(0,p.Z)(r,X));return a.createElement(e.props.originalType,o)}return e}(e)}));return a.createElement(U.Z,e,t)},code:function(e){return a.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")}))?a.createElement("code",e):a.createElement(Y.Z,e)},a:function(e){return a.createElement(f.Z,e)},pre:function(e){var t;return a.createElement(Y.Z,(0,a.isValidElement)(e.children)&&"code"===e.children.props.originalType?null==(t=e.children)?void 0:t.props:Object.assign({},e))},details:function(e){var t=a.Children.toArray(e.children),n=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),r=a.createElement(a.Fragment,null,t.filter((function(e){return e!==n})));return a.createElement(J,(0,u.Z)({},e,{summary:n}),r)},h1:function(e){return a.createElement(V.Z,(0,u.Z)({as:"h1"},e))},h2:function(e){return a.createElement(V.Z,(0,u.Z)({as:"h2"},e))},h3:function(e){return a.createElement(V.Z,(0,u.Z)({as:"h3"},e))},h4:function(e){return a.createElement(V.Z,(0,u.Z)({as:"h4"},e))},h5:function(e){return a.createElement(V.Z,(0,u.Z)({as:"h5"},e))},h6:function(e){return a.createElement(V.Z,(0,u.Z)({as:"h6"},e))}};var Q=n(7366);const G="backToTopButton_EOoS",$="backToTopButtonShow_Iijp";function ee(){var e=(0,a.useRef)(null);return{smoothScrollTop:function(){var t;e.current=(t=null,function e(){var n=document.documentElement.scrollTop;n>0&&(t=requestAnimationFrame(e),window.scrollTo(0,Math.floor(.85*n)))}(),function(){return t&&cancelAnimationFrame(t)})},cancelScrollToTop:function(){return null==e.current?void 0:e.current()}}}const te=function(){var e,t=(0,a.useState)(!1),n=t[0],r=t[1],o=(0,a.useRef)(!1),l=ee(),s=l.smoothScrollTop,u=l.cancelScrollToTop;return(0,i.RF)((function(e,t){var n=e.scrollY,a=null==t?void 0:t.scrollY;if(a)if(o.current)o.current=!1;else{var l=n<a;if(l||u(),n<300)r(!1);else if(l){var c=document.documentElement.scrollHeight;n+window.innerHeight<c&&r(!0)}else r(!1)}})),(0,i.SL)((function(e){e.location.hash&&(o.current=!0,r(!1))})),a.createElement("button",{"aria-label":(0,m.I)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,c.Z)("clean-btn",i.kM.common.backToTopButton,G,(e={},e[$]=n,e)),type:"button",onClick:function(){return s()}})};var ne=n(3181);const ae={docPage:"docPage_CtYO",docMainContainer:"docMainContainer_MzcF",docSidebarContainer:"docSidebarContainer_RZnn",docMainContainerEnhanced:"docMainContainerEnhanced_iNMK",docSidebarContainerHidden:"docSidebarContainerHidden_fip4",collapsedDocSidebar:"collapsedDocSidebar_Jm0e",expandSidebarButtonIcon:"expandSidebarButtonIcon_JZ7J",docItemWrapperEnhanced:"docItemWrapperEnhanced_rnx6"};function re(e){var t,n,o,s=e.currentDocRoute,u=e.versionMetadata,p=e.children,f=e.sidebarName,h=(0,i.Vq)(),b=u.pluginId,v=u.version,y=(0,a.useState)(!1),g=y[0],E=y[1],k=(0,a.useState)(!1),Z=k[0],N=k[1],C=(0,a.useCallback)((function(){Z&&N(!1),E((function(e){return!e}))}),[Z]);return a.createElement(l.Z,{wrapperClassName:i.kM.wrapper.docsPages,pageClassName:i.kM.page.docsDocPage,searchMetadata:{version:v,tag:(0,i.os)(b,v)}},a.createElement("div",{className:ae.docPage},a.createElement(te,null),h&&a.createElement("aside",{className:(0,c.Z)(i.kM.docs.docSidebarContainer,ae.docSidebarContainer,(t={},t[ae.docSidebarContainerHidden]=g,t)),onTransitionEnd:function(e){e.currentTarget.classList.contains(ae.docSidebarContainer)&&g&&N(!0)}},a.createElement(z,{key:f,sidebar:h,path:s.path,onCollapse:C,isHidden:Z}),Z&&a.createElement("div",{className:ae.collapsedDocSidebar,title:(0,m.I)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,m.I)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:C,onClick:C},a.createElement(d,{className:ae.expandSidebarButtonIcon}))),a.createElement("main",{className:(0,c.Z)(ae.docMainContainer,(n={},n[ae.docMainContainerEnhanced]=g||!h,n))},a.createElement("div",{className:(0,c.Z)("container padding-top--md padding-bottom--lg",ae.docItemWrapper,(o={},o[ae.docItemWrapperEnhanced]=g,o))},a.createElement(r.Zo,{components:K},p)))))}const oe=function(e){var t=e.route.routes,n=e.versionMetadata,r=e.location,l=t.find((function(e){return(0,ne.LX)(r.pathname,e)}));if(!l)return a.createElement(Q.default,null);var c=l.sidebar,s=c?n.docsSidebars[c]:null;return a.createElement(a.Fragment,null,a.createElement(U.Z,null,a.createElement("html",{className:n.className})),a.createElement(i.qu,{version:n},a.createElement(i.bT,{sidebar:s},a.createElement(re,{currentDocRoute:l,versionMetadata:n,sidebarName:c},(0,o.Z)(t,{versionMetadata:n})))))}},9773:(e,t,n)=>{n.d(t,{Z:()=>f});var a=n(7896),r=n(1461),o=n(2784),l=n(6277),c=n(8004),i=n(4499);const s="anchorWithStickyNavbar_UUsI",u="anchorWithHideOnScrollNavbar_oSsD";var d=["as","id"],m=["as"];function p(e){var t,n=e.as,m=e.id,p=(0,r.Z)(e,d),f=(0,i.LU)().navbar.hideOnScroll;return m?o.createElement(n,(0,a.Z)({},p,{className:(0,l.Z)("anchor",(t={},t[u]=f,t[s]=!f,t)),id:m}),p.children,o.createElement("a",{className:"hash-link",href:"#"+m,title:(0,c.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):o.createElement(n,p)}function f(e){var t=e.as,n=(0,r.Z)(e,m);return"h1"===t?o.createElement("h1",(0,a.Z)({},n,{id:void 0}),n.children):o.createElement(p,(0,a.Z)({as:t},n))}},7366:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var a=n(2784),r=n(7112),o=n(8004);const l=function(){return a.createElement(r.Z,{title:(0,o.I)({id:"theme.NotFound.title",message:"Page Not Found"})},a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(o.Z,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(o.Z,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."))))))}},876:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>p});var a=n(2784);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=s(n),p=r,f=m["".concat(i,".").concat(p)]||m[p]||d[p]||o;return n?a.createElement(f,l(l({ref:t},u),{},{components:n})):a.createElement(f,l({ref:t},u))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,l[1]=c;for(var s=2;s<o;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);