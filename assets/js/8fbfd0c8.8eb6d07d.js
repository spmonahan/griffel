"use strict";(self.webpackChunk_griffel_website=self.webpackChunk_griffel_website||[]).push([[428],{6325:(e,t,n)=>{n.d(t,{Z:()=>r});var s=n(2784),a=n(2600);const i="container_Knlc";const r=function(e){return s.createElement("div",{className:i},s.createElement(a.i,null),s.createElement("span",null,e.children))}},3342:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>c,default:()=>d,frontMatter:()=>l,metadata:()=>f,toc:()=>m});var s=n(7896),a=n(1461),i=(n(2784),n(876)),r=(n(465),n(6325)),o=["components"],l={sidebar_position:4},c="makeStaticStyles",f={unversionedId:"react/api/make-static-styles",id:"react/api/make-static-styles",title:"makeStaticStyles",description:"Creates styles with a global selector. This is especially useful for CSS resets, for example normalize.css.",source:"@site/docs/react/api/make-static-styles.md",sourceDirName:"react/api",slug:"/react/api/make-static-styles",permalink:"/react/api/make-static-styles",draft:!1,editUrl:"https://github.com/microsoft/griffel/tree/main/apps/website/docs/react/api/make-static-styles.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"reactSidebar",previous:{title:"shorthands",permalink:"/react/api/shorthands"},next:{title:"makeResetStyles",permalink:"/react/api/make-reset-styles"}},p={},m=[{value:"Defining styles with objects",id:"defining-styles-with-objects",level:2},{value:"Defining multiple styles",id:"defining-multiple-styles",level:2}],u={toc:m};function d(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,s.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"makestaticstyles"},"makeStaticStyles"),(0,i.kt)("p",null,"Creates styles with a global selector. This is especially useful for CSS resets, for example ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/necolas/normalize.css/"},"normalize.css"),"."),(0,i.kt)("h2",{id:"defining-styles-with-objects"},"Defining styles with objects"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { makeStaticStyles } from '@griffel/react';\n\nconst useStaticStyles = makeStaticStyles({\n  '@font-face': {\n    fontFamily: 'Open Sans',\n    src: `url(\"/fonts/OpenSans-Regular-webfont.woff2\") format(\"woff2\"),\n         url(\"/fonts/OpenSans-Regular-webfont.woff\") format(\"woff\")`,\n  },\n  body: {\n    backgroundColor: 'red',\n  },\n});\n\nfunction App() {\n  useStaticStyles();\n\n  return <div />;\n}\n")),(0,i.kt)(r.Z,{mdxType:"OutputTitle"},"Produces following CSS..."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-css"},"@font-face {\n  font-family: 'Open Sans';\n  src: url('/fonts/OpenSans-Regular-webfont.woff2') format('woff2'), url('/fonts/OpenSans-Regular-webfont.woff') format('woff');\n}\nbody {\n  background-color: red;\n}\n")),(0,i.kt)("admonition",{title:"Limited support for nested selectors",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"Nested selectors are not supported for this scenario via nesting of JavaScript objects."),(0,i.kt)("pre",{parentName:"admonition"},(0,i.kt)("code",{parentName:"pre",className:"language-js"},"import { makeStaticStyles } from '@griffel/react';\n\nconst useStaticStyles = makeStaticStyles({\n  // \ud83d\udd34 Not supported\n  '.some': {\n    '.class': {\n      /* ... */\n    },\n    ':hover': {\n      /* ... */\n    },\n  },\n\n  // \u2705 Supported\n  '.some.class': {\n    /* ... */\n  },\n  '.some.class:hover': {\n    /* ... */\n  },\n});\n"))),(0,i.kt)("h2",{id:"defining-multiple-styles"},"Defining multiple styles"),(0,i.kt)("p",null,"Static styles can be defined with strings & arrays of strings/objects:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"import { makeStaticStyles } from '@griffel/react';\n\nconst useStaticStyles1 = makeStaticStyles('body { background: red; } .foo { color: green; }');\nconst useStaticStyles2 = makeStaticStyles([\n  {\n    '@font-face': {\n      fontFamily: 'My Font',\n      src: `url(my_font.woff)`,\n    },\n  },\n  'html { line-height: 20px; }',\n]);\n\nfunction App() {\n  useStaticStyles1();\n  useStaticStyles2();\n\n  return <div />;\n}\n")))}d.isMDXComponent=!0}}]);