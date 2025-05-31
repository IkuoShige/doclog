import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Twitter, Mail, MapPin, Calendar } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            このサイトと開発者について
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* プロフィール */}
          <Card className="p-8">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Dev</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Developer
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Software Engineer
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Japan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>2025年開設</span>
              </div>
            </div>

            <div className="flex gap-3 justify-center mt-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </Card>

          {/* サイトについて */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              このサイトについて
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              技術ドキュメント、ブログ記事、ポートフォリオを統合した個人サイトです。
              開発で得た知見や経験を共有し、技術コミュニティに貢献することを目的としています。
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  技術スタック
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">MDX</Badge>
                  <Badge variant="secondary">Shadcn/ui</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  主なコンテンツ
                </h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• 技術ドキュメント</li>
                  <li>• ブログ記事</li>
                  <li>• プロジェクトポートフォリオ</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* 連絡先 */}
        <Card className="mt-8 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            お問い合わせ
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ご質問やご相談がございましたら、お気軽にお声かけください。
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              メールでお問い合わせ
            </a>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
