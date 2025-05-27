"use strict";exports.id=372,exports.ids=[372],exports.modules={10064:(e,t,s)=>{s.d(t,{OptimizedImage:()=>o});var r=s(60687),a=s(30474),n=s(43210),i=s(4780);let o=(0,n.forwardRef)(({src:e,alt:t,width:s,height:n,className:o,sizes:c="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",priority:l=!1,quality:d=75,placeholder:u="empty",blurDataURL:m,fill:p=!1,objectFit:g="cover",loading:x="lazy",...f},h)=>{let v={src:e,alt:t,sizes:c,priority:l,quality:d,placeholder:u,loading:l?"eager":x,className:(0,i.cn)("transition-opacity duration-300",p&&"object-cover",o),...m&&{blurDataURL:m},...p?{fill:!0}:{width:s,height:n},style:p?{objectFit:g}:void 0};return p?(0,r.jsx)("div",{ref:h,className:(0,i.cn)("relative overflow-hidden",o),...f,children:(0,r.jsx)(a.default,{...v,alt:t})}):(0,r.jsx)(a.default,{...v,alt:t,...f})});o.displayName="OptimizedImage"},26876:(e,t,s)=>{s.d(t,{z:()=>n});var r=s(37413),a=s(10974);function n({title:e,description:t,className:s}){return(0,r.jsxs)("div",{className:(0,a.cn)("text-center space-y-4",s),children:[(0,r.jsx)("h1",{className:"text-4xl font-bold tracking-tight sm:text-5xl",children:e}),t&&(0,r.jsx)("p",{className:"text-lg text-muted-foreground max-w-2xl mx-auto",children:t})]})}},39645:(e,t,s)=>{s.d(t,{BlogGrid:()=>j});var r=s(60687),a=s(43210),n=s(85814),i=s.n(n),o=s(96834),c=s(44493),l=s(10064),d=s(40228),u=s(48730),m=s(58869),p=s(4780);function g({post:e,className:t}){let s=new Date(e.date).toLocaleDateString("ja-JP",{year:"numeric",month:"long",day:"numeric"});return(0,r.jsxs)(c.Zp,{className:(0,p.cn)("group hover:shadow-lg transition-all duration-300",t),children:[e.image&&(0,r.jsxs)("div",{className:"relative overflow-hidden rounded-t-lg",children:[(0,r.jsx)(l.OptimizedImage,{src:e.image,alt:e.title,width:400,height:200,className:"w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"}),e.featured&&(0,r.jsx)(o.E,{className:"absolute top-2 left-2",children:"Featured"})]}),(0,r.jsxs)(c.aR,{className:"space-y-2",children:[e.category&&(0,r.jsx)(o.E,{variant:"secondary",className:"w-fit",children:e.category}),(0,r.jsx)("h3",{className:"text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors",children:(0,r.jsx)(i(),{href:`/blog/${e.slug}`,className:"hover:underline",children:e.title})}),(0,r.jsx)("p",{className:"text-muted-foreground line-clamp-3 text-sm",children:e.description})]}),(0,r.jsxs)(c.Wu,{className:"space-y-4",children:[e.tags&&e.tags.length>0&&(0,r.jsxs)("div",{className:"flex flex-wrap gap-1",children:[e.tags.slice(0,3).map(e=>(0,r.jsx)(o.E,{variant:"outline",className:"text-xs",children:e},e)),e.tags.length>3&&(0,r.jsxs)(o.E,{variant:"outline",className:"text-xs",children:["+",e.tags.length-3]})]}),(0,r.jsxs)("div",{className:"flex items-center justify-between text-xs text-muted-foreground",children:[(0,r.jsxs)("div",{className:"flex items-center gap-4",children:[(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(d.A,{className:"h-3 w-3"}),(0,r.jsx)("time",{dateTime:e.date,children:s})]}),(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(u.A,{className:"h-3 w-3"}),(0,r.jsx)("span",{children:e.readingTime.text})]})]}),(0,r.jsxs)("div",{className:"flex items-center gap-1",children:[(0,r.jsx)(m.A,{className:"h-3 w-3"}),(0,r.jsx)("span",{children:e.author})]})]}),(0,r.jsx)(i(),{href:`/blog/${e.slug}`,className:"inline-flex items-center text-sm font-medium text-primary hover:underline",children:"続きを読む →"})]})]})}var x=s(29523),f=s(47033),h=s(14952);function v({currentPage:e,totalPages:t,onPageChange:s,className:a}){let n=(()=>{let s=[];s.push(1);let r=Math.max(2,e-2),a=Math.min(t-1,e+2);r>2&&s.push("...");for(let e=r;e<=a;e++)s.push(e);return a<t-1&&s.push("..."),t>1&&s.push(t),s})();return(0,r.jsxs)("div",{className:(0,p.cn)("flex items-center justify-center gap-2",a),children:[(0,r.jsxs)(x.$,{variant:"outline",size:"sm",disabled:1===e,onClick:()=>s(e-1),className:"flex items-center gap-1",children:[(0,r.jsx)(f.A,{className:"h-4 w-4"}),"前へ"]}),(0,r.jsx)("div",{className:"flex items-center gap-1",children:n.map((t,a)=>{if("..."===t)return(0,r.jsx)("span",{className:"px-2 py-1 text-muted-foreground",children:"..."},`ellipsis-${a}`);let n=t===e;return(0,r.jsx)(x.$,{variant:n?"default":"outline",size:"sm",onClick:()=>s(t),className:(0,p.cn)("min-w-[2.25rem]",n&&"pointer-events-none"),children:t},t)})}),(0,r.jsxs)(x.$,{variant:"outline",size:"sm",disabled:e===t,onClick:()=>s(e+1),className:"flex items-center gap-1",children:["次へ",(0,r.jsx)(h.A,{className:"h-4 w-4"})]})]})}function j({posts:e}){let[t,s]=(0,a.useState)(1),n=Math.ceil(e.length/6),i=(t-1)*6,o=e.slice(i,i+6);return 0===e.length?(0,r.jsx)("div",{className:"text-center py-12",children:(0,r.jsxs)("div",{className:"max-w-md mx-auto",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-foreground mb-2",children:"記事が見つかりませんでした"}),(0,r.jsx)("p",{className:"text-muted-foreground",children:"検索条件を変更して再度お試しください。"})]})}):(0,r.jsxs)("div",{className:"space-y-8",children:[(0,r.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:o.map(e=>(0,r.jsx)(g,{post:e},e.slug))}),n>1&&(0,r.jsx)(v,{currentPage:t,totalPages:n,onPageChange:e=>{s(e),window.scrollTo({top:0,behavior:"smooth"})}}),(0,r.jsxs)("div",{className:"text-center text-sm text-muted-foreground",children:[e.length,"件の記事が見つかりました"]})]})}},44493:(e,t,s)=>{s.d(t,{Wu:()=>o,Zp:()=>n,aR:()=>i});var r=s(60687);s(43210);var a=s(4780);function n({className:e,...t}){return(0,r.jsx)("div",{"data-slot":"card",className:(0,a.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",e),...t})}function i({className:e,...t}){return(0,r.jsx)("div",{"data-slot":"card-header",className:(0,a.cn)("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",e),...t})}function o({className:e,...t}){return(0,r.jsx)("div",{"data-slot":"card-content",className:(0,a.cn)("px-6",e),...t})}},46068:(e,t,s)=>{s.d(t,{bp:()=>g,mg:()=>x});var r=s(29021),a=s.n(r),n=s(33873),i=s.n(n),o=s(99379),c=s.n(o),l=s(20702),d=s.n(l);let u=i().join(process.cwd(),"content/blog");function m(){return a().existsSync(u)?a().readdirSync(u).filter(e=>e.endsWith(".mdx")):[]}function p(e){let t=e.replace(/\.mdx$/,""),{frontMatter:s,content:r,readingTime:n}=function(e){let t=i().join(u,e),s=a().readFileSync(t,"utf8"),{data:r,content:n}=c()(s);return{frontMatter:r,content:n,readingTime:d()(n)}}(e);return{id:s.id||t,slug:t,title:s.title||"",description:s.description||"",content:r,date:s.date||"",author:s.author||"Developer",category:s.category||"",tags:s.tags||[],image:s.image,featured:s.featured||!1,published:!1!==s.published,readingTime:n}}function g(){return m().map(p).filter(e=>e.published).sort((e,t)=>new Date(t.date).getTime()-new Date(e.date).getTime())}function x(e){let t=`${e}.mdx`;return m().includes(t)?p(t):null}},76187:(e,t,s)=>{function r(){return[{id:"nextjs-15-features",slug:"nextjs-15-features",title:"Next.js 15の新機能とパフォーマンス向上",description:"Next.js 15で追加された新機能とパフォーマンス改善について詳しく解説します。App Router、Server Components、そしてTurbopackの活用方法を学びましょう。",date:"2024-01-20",author:"Developer",category:"Next.js",tags:["Next.js","React","フロントエンド"],featured:!0,published:!0,readingTime:{text:"5 min read",minutes:5,words:1e3,time:3e5},content:`
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
`}]}function a(){try{console.log("[Server] Loading MDX blog posts...");let e=s(46068).bp();return console.log(`[Server] Loaded ${e.length} blog posts:`,e.map(e=>e.slug)),e}catch(e){return console.error("MDXファイルの読み込みに失敗しました:",e),console.log("[Server] Falling back to static data"),r()}}function n(e){try{return s(46068).mg(e)}catch(t){return console.error(`[Server] MDXファイル ${e} の読み込みに失敗しました:`,t),r().find(t=>t.slug===e)||null}}function i(e,t=3){return a().filter(t=>t.slug!==e.slug).map(t=>{let s=0;return t.category===e.category&&(s+=2),s+=(t.tags?.filter(t=>e.tags?.includes(t))||[]).length,{post:t,score:s}}).sort((e,t)=>t.score-e.score).slice(0,t).map(({post:e})=>e)}function o(){return Array.from(new Set(a().map(e=>e.category).filter(e=>!!e)))}function c(){return Array.from(new Set(a().flatMap(e=>e.tags||[])))}s.d(t,{Ls:()=>c,fv:()=>n,g6:()=>a,jX:()=>i,sI:()=>o})},92145:(e,t,s)=>{s.r(t),s.d(t,{default:()=>a});var r=s(31658);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},96834:(e,t,s)=>{s.d(t,{E:()=>c});var r=s(60687);s(43210);var a=s(8730),n=s(24224),i=s(4780);let o=(0,n.F)("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",secondary:"border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",destructive:"border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"}},defaultVariants:{variant:"default"}});function c({className:e,variant:t,asChild:s=!1,...n}){let c=s?a.DX:"span";return(0,r.jsx)(c,{"data-slot":"badge",className:(0,i.cn)(o({variant:t}),e),...n})}}};