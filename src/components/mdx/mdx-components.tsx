import { DocumentLink, DocumentLinks } from '@/components/documents/document-link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { ExternalLink, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

// MDX content で使用できるコンポーネント
export const mdxComponents = {
  // カスタムコンポーネント
  DocumentLink,
  DocumentLinks,
  
  // UI コンポーネント
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
  AlertTitle,
  Separator,
  Button,
  
  // アイコン
  ExternalLink,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  
  // カスタムアラートコンポーネント
  InfoAlert: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50">
      <Info className="h-4 w-4" />
      {title && <AlertTitle className="text-blue-800 dark:text-blue-200">{title}</AlertTitle>}
      <AlertDescription className="text-blue-700 dark:text-blue-300">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  WarningAlert: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/50">
      <AlertTriangle className="h-4 w-4" />
      {title && <AlertTitle className="text-yellow-800 dark:text-yellow-200">{title}</AlertTitle>}
      <AlertDescription className="text-yellow-700 dark:text-yellow-300">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  SuccessAlert: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
      <CheckCircle className="h-4 w-4" />
      {title && <AlertTitle className="text-green-800 dark:text-green-200">{title}</AlertTitle>}
      <AlertDescription className="text-green-700 dark:text-green-300">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  ErrorAlert: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <Alert className="my-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
      <XCircle className="h-4 w-4" />
      {title && <AlertTitle className="text-red-800 dark:text-red-200">{title}</AlertTitle>}
      <AlertDescription className="text-red-700 dark:text-red-300">
        {children}
      </AlertDescription>
    </Alert>
  ),
  
  // コードブロック用のタイトル付きコンテナ
  CodeBlock: ({ 
    title, 
    language, 
    children 
  }: { 
    title?: string; 
    language?: string; 
    children: React.ReactNode 
  }) => (
    <div className="my-6">
      {title && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b rounded-t-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
            {language && (
              <Badge variant="secondary" className="text-xs">
                {language}
              </Badge>
            )}
          </div>
        </div>
      )}
      <div className={title ? "rounded-t-none" : ""}>
        {children}
      </div>
    </div>
  ),
  
  // ヒントボックス
  TipBox: ({ children, title = "💡 ヒント" }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-blue-800 dark:text-blue-200">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-blue-700 dark:text-blue-300">
        {children}
      </CardContent>
    </Card>
  ),
  
  // 重要な注意点
  ImportantBox: ({ children, title = "⚠️ 重要" }: { children: React.ReactNode; title?: string }) => (
    <Card className="my-6 border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm text-yellow-800 dark:text-yellow-200">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 text-yellow-700 dark:text-yellow-300">
        {children}
      </CardContent>
    </Card>
  ),
  
  // クイックリファレンス
  QuickRef: ({ 
    items 
  }: { 
    items: Array<{ label: string; value: string; description?: string }> 
  }) => (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-sm">クイックリファレンス</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <dl className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="border-b border-gray-100 dark:border-gray-800 pb-2 last:border-b-0">
              <dt className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.label}</dt>
              <dd className="text-sm text-gray-600 dark:text-gray-400 font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded mt-1">
                {item.value}
              </dd>
              {item.description && (
                <dd className="text-xs text-gray-500 dark:text-gray-500 mt-1">{item.description}</dd>
              )}
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  ),
}
