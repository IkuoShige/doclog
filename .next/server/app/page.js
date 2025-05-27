(()=>{var e={};e.id=974,e.ids=[974],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},8986:(e,t,s)=>{"use strict";s.d(t,{m:()=>i});var r=s(60687),a=s(4780);function i({children:e,className:t,maxWidth:s="lg",padding:i="md"}){return(0,r.jsx)("div",{className:(0,a.cn)("mx-auto w-full",{sm:"max-w-screen-sm",md:"max-w-screen-md",lg:"max-w-screen-lg",xl:"max-w-screen-xl","2xl":"max-w-screen-2xl",full:"max-w-full"}[s],{none:"",sm:"px-4",md:"px-4 sm:px-6",lg:"px-4 sm:px-6 lg:px-8"}[i],t),children:e})}},10022:(e,t,s)=>{"use strict";s.d(t,{A:()=>r});let r=(0,s(62688).A)("file-text",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]])},10064:(e,t,s)=>{"use strict";s.d(t,{OptimizedImage:()=>n});var r=s(60687),a=s(30474),i=s(43210),o=s(4780);let n=(0,i.forwardRef)(({src:e,alt:t,width:s,height:i,className:n,sizes:l="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",priority:c=!1,quality:d=75,placeholder:m="empty",blurDataURL:u,fill:p=!1,objectFit:h="cover",loading:x="lazy",...g},f)=>{let v={src:e,alt:t,sizes:l,priority:c,quality:d,placeholder:m,loading:c?"eager":x,className:(0,o.cn)("transition-opacity duration-300",p&&"object-cover",n),...u&&{blurDataURL:u},...p?{fill:!0}:{width:s,height:i},style:p?{objectFit:h}:void 0};return p?(0,r.jsx)("div",{ref:f,className:(0,o.cn)("relative overflow-hidden",n),...g,children:(0,r.jsx)(a.default,{...v,alt:t})}):(0,r.jsx)(a.default,{...v,alt:t,...g})});n.displayName="OptimizedImage"},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},16293:(e,t,s)=>{"use strict";s.d(t,{RecentActivity:()=>r});let r=(0,s(12907).registerClientReference)(function(){throw Error("Attempted to call RecentActivity() from the server but RecentActivity is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/ikuo/SSG_play/portfolio/src/components/sections/recent-activity.tsx","RecentActivity")},18179:(e,t,s)=>{"use strict";s.d(t,{A:()=>r});let r=(0,s(62688).A)("folder-open",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]])},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21204:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(37413),a=s(58197),i=s(35353),o=s(48595),n=s(16293);function l(){return(0,r.jsxs)("main",{className:"min-h-screen bg-background",children:[(0,r.jsx)(a.HeroSection,{}),(0,r.jsx)("div",{className:"border-t",children:(0,r.jsx)(i.DashboardStats,{})}),(0,r.jsx)("div",{className:"border-t bg-muted/30",children:(0,r.jsx)(o.QuickAccess,{})}),(0,r.jsx)("div",{className:"border-t",children:(0,r.jsx)(n.RecentActivity,{})})]})}},23795:(e,t,s)=>{"use strict";s.d(t,{DashboardStats:()=>m});var r=s(60687),a=s(8986),i=s(75479),o=s(44493),n=s(10022),l=s(18179),c=s(78493),d=s(97753);function m(){let e=(0,c.g6)().filter(e=>e.published),t=(0,d.VT)(),s=[{title:"ブログ投稿",value:e.length,icon:n.A,description:"技術ブログ記事"},{title:"プロジェクト",value:t.length,icon:l.A,description:"学習・研究プロジェクト"}];return(0,r.jsx)("section",{className:"py-8",children:(0,r.jsx)(a.m,{children:(0,r.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:s.map(e=>{let t=e.icon;return(0,r.jsx)(o.Zp,{className:"hover:shadow-md transition-shadow",children:(0,r.jsxs)(o.Wu,{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3 mb-2",children:[(0,r.jsx)("div",{className:"p-2 rounded-md bg-primary/10",children:(0,r.jsx)(t,{className:"h-4 w-4 text-primary"})}),(0,r.jsx)("div",{className:"flex-1 min-w-0",children:(0,r.jsx)(i.o,{variant:"h3",className:"text-2xl font-bold",children:e.value})})]}),(0,r.jsx)(i.o,{variant:"small",className:"font-medium mb-1",children:e.title}),(0,r.jsx)(i.o,{variant:"muted",className:"text-xs",children:e.description})]})},e.title)})})})})}},25334:(e,t,s)=>{"use strict";s.d(t,{A:()=>r});let r=(0,s(62688).A)("external-link",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]])},27675:(e,t,s)=>{Promise.resolve().then(s.bind(s,35353)),Promise.resolve().then(s.bind(s,58197)),Promise.resolve().then(s.bind(s,48595)),Promise.resolve().then(s.bind(s,16293))},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},35097:(e,t,s)=>{"use strict";s.d(t,{QuickAccess:()=>g});var r=s(60687),a=s(8986),i=s(75479),o=s(44493),n=s(29523),l=s(18179),c=s(10022),d=s(8403),m=s(58869),u=s(41550),p=s(25334),h=s(85814),x=s.n(h);function g(){let e=[{title:"プロジェクト",description:"学習・研究プロジェクトの一覧",href:"/portfolio",icon:l.A,color:"bg-blue-500"},{title:"ブログ",description:"技術ブログとノウハウまとめ",href:"/blog",icon:c.A,color:"bg-green-500"},{title:"ドキュメント",description:"技術ドキュメントと学習記録",href:"/documents",icon:d.A,color:"bg-indigo-500"},{title:"プロフィール",description:"詳細な自己紹介とスキル",href:"/about",icon:m.A,color:"bg-purple-500"},{title:"お問い合わせ",description:"連絡先とコンタクトフォーム",href:"/contact",icon:u.A,color:"bg-orange-500"}];return(0,r.jsx)("section",{className:"py-8",children:(0,r.jsxs)(a.m,{children:[(0,r.jsx)(i.o,{variant:"h2",className:"text-xl font-semibold mb-6",children:"クイックアクセス"}),(0,r.jsx)("div",{className:"grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4",children:e.map(e=>{let t=e.icon;return(0,r.jsx)(o.Zp,{className:"hover:shadow-md transition-all duration-200 hover:scale-105",children:(0,r.jsxs)(o.Wu,{className:"p-4",children:[(0,r.jsxs)("div",{className:"flex items-start gap-3 mb-3",children:[(0,r.jsx)("div",{className:`p-2 rounded-md ${e.color}/10`,children:(0,r.jsx)(t,{className:`h-5 w-5 ${e.color.replace("bg-","text-")}`})}),(0,r.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,r.jsx)(i.o,{variant:"h4",className:"font-semibold mb-1",children:e.title}),(0,r.jsx)(i.o,{variant:"muted",className:"text-sm mb-3",children:e.description})]})]}),(0,r.jsx)(n.$,{asChild:!0,size:"sm",variant:"outline",className:"w-full",children:(0,r.jsxs)(x(),{href:e.href,children:[(0,r.jsx)(p.A,{className:"mr-2 h-3 w-3"}),"開く"]})})]})},e.href)})})]})})}},35353:(e,t,s)=>{"use strict";s.d(t,{DashboardStats:()=>r});let r=(0,s(12907).registerClientReference)(function(){throw Error("Attempted to call DashboardStats() from the server but DashboardStats is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/ikuo/SSG_play/portfolio/src/components/sections/dashboard-stats.tsx","DashboardStats")},36607:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,pages:()=>d,routeModule:()=>u,tree:()=>c});var r=s(65239),a=s(48088),i=s(88170),o=s.n(i),n=s(30893),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);s.d(t,l);let c={children:["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,21204)),"/home/ikuo/SSG_play/portfolio/src/app/page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,92145))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,6732)),"/home/ikuo/SSG_play/portfolio/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,92145))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,d=["/home/ikuo/SSG_play/portfolio/src/app/page.tsx"],m={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},41550:(e,t,s)=>{"use strict";s.d(t,{A:()=>r});let r=(0,s(62688).A)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]])},44493:(e,t,s)=>{"use strict";s.d(t,{Wu:()=>n,Zp:()=>i,aR:()=>o});var r=s(60687);s(43210);var a=s(4780);function i({className:e,...t}){return(0,r.jsx)("div",{"data-slot":"card",className:(0,a.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...t})}function o({className:e,...t}){return(0,r.jsx)("div",{"data-slot":"card-header",className:(0,a.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...t})}function n({className:e,...t}){return(0,r.jsx)("div",{"data-slot":"card-content",className:(0,a.cn)("px-6",e),...t})}},48595:(e,t,s)=>{"use strict";s.d(t,{QuickAccess:()=>r});let r=(0,s(12907).registerClientReference)(function(){throw Error("Attempted to call QuickAccess() from the server but QuickAccess is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/ikuo/SSG_play/portfolio/src/components/sections/quick-access.tsx","QuickAccess")},58197:(e,t,s)=>{"use strict";s.d(t,{HeroSection:()=>r});let r=(0,s(12907).registerClientReference)(function(){throw Error("Attempted to call HeroSection() from the server but HeroSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/ikuo/SSG_play/portfolio/src/components/sections/hero-section.tsx","HeroSection")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},73510:(e,t,s)=>{"use strict";s.d(t,{bp:()=>h,mg:()=>x});var r=s(29021),a=s.n(r),i=s(33873),o=s.n(i),n=s(40121),l=s.n(n),c=s(26728),d=s.n(c);let m=o().join(process.cwd(),"content/blog");function u(){return a().existsSync(m)?a().readdirSync(m).filter(e=>e.endsWith(".mdx")):[]}function p(e){let t=e.replace(/\.mdx$/,""),{frontMatter:s,content:r,readingTime:i}=function(e){let t=o().join(m,e),s=a().readFileSync(t,"utf8"),{data:r,content:i}=l()(s);return{frontMatter:r,content:i,readingTime:d()(i)}}(e);return{id:s.id||t,slug:t,title:s.title||"",description:s.description||"",content:r,date:s.date||"",author:s.author||"Developer",category:s.category||"",tags:s.tags||[],image:s.image,featured:s.featured||!1,published:!1!==s.published,readingTime:i}}function h(){return u().map(p).filter(e=>e.published).sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime())}function x(e){let t=`${e}.mdx`;return u().includes(t)?p(t):null}},75479:(e,t,s)=>{"use strict";s.d(t,{o:()=>c});var r=s(60687),a=s(4780),i=s(8730),o=s(24224),n=s(43210);let l=(0,o.F)("text-foreground",{variants:{variant:{h1:"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",h2:"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",h3:"scroll-m-20 text-2xl font-semibold tracking-tight",h4:"scroll-m-20 text-xl font-semibold tracking-tight",h5:"scroll-m-20 text-lg font-semibold tracking-tight",h6:"scroll-m-20 text-base font-semibold tracking-tight",p:"leading-7 [&:not(:first-child)]:mt-6",blockquote:"mt-6 border-l-2 pl-6 italic",table:"my-6 w-full overflow-y-auto",list:"my-6 ml-6 list-disc [&>li]:mt-2",inlineCode:"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",lead:"text-xl text-muted-foreground",large:"text-lg font-semibold",small:"text-sm font-medium leading-none",muted:"text-sm text-muted-foreground"}},defaultVariants:{variant:"p"}}),c=n.forwardRef(({className:e,variant:t,asChild:s=!1,as:o,...c},d)=>{if(s)return(0,r.jsx)(i.DX,{className:(0,a.cn)(l({variant:t,className:e})),ref:d,...c});let m=o||function(e){switch(e){case"h1":return"h1";case"h2":return"h2";case"h3":return"h3";case"h4":return"h4";case"h5":return"h5";case"h6":return"h6";case"blockquote":return"blockquote";case"table":return"table";case"list":return"ul";case"inlineCode":return"code";default:return"p"}}(t);return n.createElement(m,{className:(0,a.cn)(l({variant:t,className:e})),ref:d,...c})});c.displayName="Typography"},78493:(e,t,s)=>{"use strict";s.d(t,{Ls:()=>i,g6:()=>r,sI:()=>a});function r(){try{console.log("[Server] Loading MDX blog posts...");let e=s(73510).bp();return console.log(`[Server] Loaded ${e.length} blog posts:`,e.map(e=>e.slug)),e}catch(e){return console.error("MDXファイルの読み込みに失敗しました:",e),console.log("[Server] Falling back to static data"),[{id:"nextjs-15-features",slug:"nextjs-15-features",title:"Next.js 15の新機能とパフォーマンス向上",description:"Next.js 15で追加された新機能とパフォーマンス改善について詳しく解説します。App Router、Server Components、そしてTurbopackの活用方法を学びましょう。",date:"2024-01-20",author:"Developer",category:"Next.js",tags:["Next.js","React","フロントエンド"],featured:!0,published:!0,readingTime:{text:"5 min read",minutes:5,words:1e3,time:3e5},content:`
# Next.js 15の新機能とパフォーマンス向上

Next.js 15では多くの改善と新機能が追加されました。この記事では、主要なアップデート内容について詳しく説明します。

## 主要な新機能

### 1. パフォーマンスの改善
- バンドルサイズの最適化
- ビルド時間の短縮
- ランタイムパフォーマンスの向上

### 2. 開発者体験の向上
- より詳細なエラーメッセージ
- 改善されたHot Reload
- TypeScript サポートの強化

### 3. Turbopackの統合
Turbopackがより安定し、開発時のビルド時間が大幅に短縮されました。

\`\`\`javascript
// next.config.js
module.exports = {
  experimental: {
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
    },
  },
}
\`\`\`

## まとめ
Next.js 15は開発者とユーザーの両方にとって大きな改善をもたらします。
`},{id:"react-hooks-guide",slug:"react-hooks-guide",title:"React Hooksの実践ガイド",description:"useEffect、useState、useCallbackなど、React Hooksの効果的な使い方とパフォーマンス最適化のテクニックを実例とともに学習します。",date:"2024-01-15",author:"Developer",category:"React",tags:["React","Hooks","JavaScript"],featured:!1,published:!0,readingTime:{text:"8 min read",minutes:8,words:1600,time:48e4},content:`
# React Hooksの実践ガイド

React Hooksは関数コンポーネントでステート管理やライフサイクルメソッドを使用するための機能です。

## useState の基本的な使い方

\`\`\`jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
\`\`\`

## useEffect でのライフサイクル管理

\`\`\`jsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(\`/api/users/\${userId}\`)
      const userData = await response.json()
      setUser(userData)
    }

    fetchUser()
  }, [userId]) // userIdが変わった時のみ実行

  return user ? <div>{user.name}</div> : <div>Loading...</div>
}
\`\`\`

## パフォーマンス最適化

### useCallback の活用
\`\`\`jsx
import { useCallback, useState } from 'react'

function ExpensiveComponent({ onCalculate }) {
  const [value, setValue] = useState(0)

  // 依存配列が変わらない限り、同じ関数インスタンスを返す
  const memoizedCallback = useCallback(() => {
    return onCalculate(value)
  }, [onCalculate, value])

  return (
    <button onClick={memoizedCallback}>
      Calculate
    </button>
  )
}
\`\`\`

React Hooksを効果的に使用することで、より保守性の高いコードを書くことができます。
`},{id:"typescript-performance",slug:"typescript-performance",title:"TypeScriptによるパフォーマンス最適化",description:"TypeScriptプロジェクトでのコンパイル時間短縮、型チェックの最適化、そして効率的な開発環境の構築方法について詳しく解説します。",date:"2024-01-10",author:"Developer",category:"TypeScript",tags:["TypeScript","パフォーマンス","最適化"],featured:!0,published:!0,readingTime:{text:"7 min read",minutes:7,words:1400,time:42e4},content:`
# TypeScriptによるパフォーマンス最適化

大規模なTypeScriptプロジェクトでは、コンパイル時間とパフォーマンスが重要な課題となります。

## tsconfig.json の最適化

\`\`\`json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./buildcache/main.tsbuildinfo",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
\`\`\`

## 型定義の最適化

### ユニオン型より交差型を選ぶ
\`\`\`typescript
// 良い例: 交差型
interface BaseUser {
  id: string
  name: string
}

interface AdminUser extends BaseUser {
  permissions: string[]
}

// 避けるべき: 複雑なユニオン型
type User = 
  | { type: 'admin'; id: string; name: string; permissions: string[] }
  | { type: 'user'; id: string; name: string }
\`\`\`

### 条件付き型の効率的な使用
\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T }

// 使用例
const stringResponse: ApiResponse<string> = { message: "Hello" }
const dataResponse: ApiResponse<number[]> = { data: [1, 2, 3] }
\`\`\`

## コンパイル時間の改善

### Project References の活用
大きなプロジェクトを小さな単位に分割し、個別にコンパイルします。

\`\`\`json
// tsconfig.json
{
  "references": [
    { "path": "./packages/core" },
    { "path": "./packages/ui" },
    { "path": "./packages/utils" }
  ]
}
\`\`\`

これらの最適化により、開発効率を大幅に改善できます。
`}]}}function a(){return Array.from(new Set(r().map(e=>e.category).filter(e=>!!e)))}function i(){return Array.from(new Set(r().flatMap(e=>e.tags||[])))}},79428:e=>{"use strict";e.exports=require("buffer")},79551:e=>{"use strict";e.exports=require("url")},80819:(e,t,s)=>{Promise.resolve().then(s.bind(s,23795)),Promise.resolve().then(s.bind(s,88872)),Promise.resolve().then(s.bind(s,35097)),Promise.resolve().then(s.bind(s,88208))},88208:(e,t,s)=>{"use strict";s.d(t,{RecentActivity:()=>h});var r=s(60687),a=s(8986),i=s(75479),o=s(44493),n=s(96834),l=s(25334),c=s(40228),d=s(85814),m=s.n(d),u=s(78493),p=s(97753);function h(){let e=(0,u.g6)().filter(e=>e.published).sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()).slice(0,3),t=(0,p.VT)().sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime()).slice(0,3);return(0,r.jsx)("section",{className:"py-8",children:(0,r.jsx)(a.m,{children:(0,r.jsxs)("div",{className:"grid lg:grid-cols-2 gap-8",children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsx)(i.o,{variant:"h2",className:"text-xl font-semibold",children:"最近のブログ投稿"}),(0,r.jsxs)(m(),{href:"/blog",className:"text-sm text-primary hover:underline flex items-center gap-1",children:["すべて見る",(0,r.jsx)(l.A,{className:"h-3 w-3"})]})]}),(0,r.jsx)("div",{className:"space-y-3",children:e.map(e=>(0,r.jsx)(o.Zp,{className:"hover:shadow-md transition-shadow",children:(0,r.jsx)(o.Wu,{className:"p-4",children:(0,r.jsx)("div",{className:"flex items-start gap-3",children:(0,r.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,r.jsx)(m(),{href:`/blog/${e.slug}`,className:"hover:text-primary transition-colors",children:(0,r.jsx)(i.o,{variant:"h4",className:"font-medium mb-1 line-clamp-1",children:e.title})}),(0,r.jsx)(i.o,{variant:"muted",className:"text-sm mb-2 line-clamp-2",children:e.description}),(0,r.jsxs)("div",{className:"flex items-center gap-2 text-xs text-muted-foreground",children:[(0,r.jsx)(c.A,{className:"h-3 w-3"}),(0,r.jsx)("span",{children:new Date(e.date).toLocaleDateString("ja-JP")}),(0,r.jsx)(n.E,{variant:"secondary",className:"text-xs",children:e.category})]})]})})})},e.slug))})]}),(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between mb-4",children:[(0,r.jsx)(i.o,{variant:"h2",className:"text-xl font-semibold",children:"最近のプロジェクト"}),(0,r.jsxs)(m(),{href:"/portfolio",className:"text-sm text-primary hover:underline flex items-center gap-1",children:["すべて見る",(0,r.jsx)(l.A,{className:"h-3 w-3"})]})]}),(0,r.jsx)("div",{className:"space-y-3",children:t.map(e=>(0,r.jsx)(o.Zp,{className:"hover:shadow-md transition-shadow",children:(0,r.jsxs)(o.Wu,{className:"p-4",children:[(0,r.jsx)(m(),{href:`/portfolio/${e.slug}`,className:"hover:text-primary transition-colors",children:(0,r.jsx)(i.o,{variant:"h4",className:"font-medium mb-1 line-clamp-1",children:e.title})}),(0,r.jsx)(i.o,{variant:"muted",className:"text-sm mb-2 line-clamp-2",children:e.description}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex gap-1 flex-wrap",children:[e.technologies.slice(0,2).map(e=>(0,r.jsx)(n.E,{variant:"outline",className:"text-xs",children:e},e)),e.technologies.length>2&&(0,r.jsxs)(n.E,{variant:"outline",className:"text-xs",children:["+",e.technologies.length-2]})]}),(0,r.jsxs)("div",{className:"flex items-center gap-1 text-xs text-muted-foreground",children:[(0,r.jsx)(c.A,{className:"h-3 w-3"}),(0,r.jsx)("span",{children:new Date(e.date).toLocaleDateString("ja-JP")})]})]})]})},e.slug))})]})]})})})}},88872:(e,t,s)=>{"use strict";s.d(t,{HeroSection:()=>g});var r=s(60687),a=s(8986),i=s(75479),o=s(29523),n=s(10064),l=s(62688);let c=(0,l.A)("github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]),d=(0,l.A)("linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);var m=s(41550),u=s(25334),p=s(85814),h=s.n(p);let x=[{name:"GitHub",href:"https://github.com",icon:c},{name:"LinkedIn",href:"https://linkedin.com",icon:d},{name:"Email",href:"mailto:hello@example.com",icon:m.A}];function g(){return(0,r.jsx)("section",{className:"py-12 lg:py-16",children:(0,r.jsx)(a.m,{children:(0,r.jsxs)("div",{className:"flex flex-col lg:flex-row lg:items-center gap-8",children:[(0,r.jsx)("div",{className:"flex-shrink-0",children:(0,r.jsx)("div",{className:"w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-muted",children:(0,r.jsx)(n.OptimizedImage,{src:"/images/profile.jpg",alt:"プロフィール画像",width:128,height:128,className:"rounded-full object-cover w-full h-full",placeholder:"blur",blurDataURL:function(e=10,t=10){let s=`
    <svg width="${e}" height="${t}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(229,231,235);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(243,244,246);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;return`data:image/svg+xml;base64,${Buffer.from(s).toString("base64")}`}()})})}),(0,r.jsxs)("div",{className:"flex-1",children:[(0,r.jsx)(i.o,{variant:"h1",className:"text-3xl lg:text-4xl font-bold mb-4",children:"ロボティクス修士学生"}),(0,r.jsx)(i.o,{variant:"large",className:"text-muted-foreground mb-6 max-w-2xl",children:"ソフトウェア開発、機械学習、ウェブ開発を学習中。 研究活動や個人プロジェクトの記録を公開しています。"}),(0,r.jsxs)("div",{className:"flex gap-3",children:[(0,r.jsx)(o.$,{asChild:!0,size:"sm",children:(0,r.jsxs)(h(),{href:"/portfolio",children:[(0,r.jsx)(u.A,{className:"mr-2 h-4 w-4"}),"プロジェクト"]})}),(0,r.jsx)(o.$,{variant:"outline",size:"sm",asChild:!0,children:(0,r.jsx)(h(),{href:"/blog",children:"ブログ"})}),(0,r.jsx)(o.$,{variant:"outline",size:"sm",asChild:!0,children:(0,r.jsxs)(h(),{href:"/contact",children:[(0,r.jsx)(m.A,{className:"mr-2 h-4 w-4"}),"連絡先"]})})]})]}),(0,r.jsx)("div",{className:"flex lg:flex-col gap-2",children:x.map(e=>{let t=e.icon;return(0,r.jsxs)(h(),{href:e.href,className:"p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors",target:"_blank",rel:"noopener noreferrer",children:[(0,r.jsx)(t,{className:"h-4 w-4 text-muted-foreground hover:text-primary transition-colors"}),(0,r.jsx)("span",{className:"sr-only",children:e.name})]},e.name)})})]})})})}},92145:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var r=s(31658);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},96834:(e,t,s)=>{"use strict";s.d(t,{E:()=>l});var r=s(60687);s(43210);var a=s(8730),i=s(24224),o=s(4780);let n=(0,i.F)("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function l({className:e,variant:t,asChild:s=!1,...i}){let l=s?a.DX:"span";return(0,r.jsx)(l,{"data-slot":"badge",className:(0,o.cn)(n({variant:t}),e),...i})}},97753:(e,t,s)=>{"use strict";function r(){return[{id:"realtime-chat-app",slug:"realtime-chat-app",title:"リアルタイム チャットアプリケーション",description:"Socket.ioを使用したリアルタイムチャットアプリケーション。React + Node.js + TypeScript",date:"2024-01-15",category:"ウェブアプリ",tags:["リアルタイム","チャット","Socket.io"],technologies:["React","Socket.io","Node.js","TypeScript","Express"],featured:!0,status:"completed",highlights:["リアルタイム通信","ユーザー認証","レスポンシブデザイン"],published:!0,image:"/images/projects/realtime-chat.jpg",github:"https://github.com/example/repo",demo:"https://demo.example.com"},{id:"ecommerce-platform",slug:"ecommerce-platform",title:"E-commerce プラットフォーム",description:"Next.js と Stripe を使用したフル機能の E-commerce プラットフォーム",date:"2024-01-10",category:"ウェブアプリ",tags:["Ecommerce","Stripe","決済"],technologies:["Next.js","Stripe","TypeScript","Prisma","PostgreSQL"],featured:!0,status:"completed",highlights:["決済システム統合","データベース設計","SEO最適化"],published:!0,image:"/images/projects/ecommerce.jpg",github:"https://github.com/example/repo",demo:"https://demo.example.com"},{id:"task-dashboard",slug:"task-dashboard",title:"タスク管理ダッシュボード",description:"Vue.js と Firebase を使用したタスク管理アプリケーション",date:"2024-01-05",category:"ウェブアプリ",tags:["タスク管理","Vue.js","Firebase"],technologies:["Vue.js","Firebase","TypeScript","Vuetify"],featured:!1,status:"completed",highlights:["状態管理","リアルタイム同期","PWA対応"],published:!0,image:"/images/projects/task-dashboard.jpg",github:"https://github.com/example/repo",demo:"https://demo.example.com"},{id:"chat-app",slug:"chat-app",title:"チャットアプリケーション",description:"React Native を使用したモバイルチャットアプリ",date:"2023-12-20",category:"モバイルアプリ",tags:["モバイル","React Native","チャット"],technologies:["React Native","Firebase","TypeScript","Expo"],featured:!1,status:"in-progress",highlights:["モバイル最適化","プッシュ通知","オフライン対応"],published:!0,image:"/images/projects/chat-app.jpg",github:"https://github.com/example/repo"}]}s.d(t,{VT:()=>a});function a(){return(function(){try{return r()}catch(e){return console.error("Error loading portfolio projects:",e),r()}})().filter(e=>e.published)}}};var t=require("../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[447,106,658,421,760,302],()=>s(36607));module.exports=r})();