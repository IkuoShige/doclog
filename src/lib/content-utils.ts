// reading-timeライブラリのような機能を自作
export function calculateReadingTime(content: string): number {
  // 日本語の場合、1分間に400-600文字読めるとして計算
  const wordsPerMinute = 500;
  
  // 日本語と英語の混在文章を考慮
  const japaneseChars = (content.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
  const englishWords = content.split(/\s+/).filter(word => /[a-zA-Z]/.test(word)).length;
  
  // 日本語文字数 + 英語単語数で総文字数を概算
  const totalChars = japaneseChars + (englishWords * 5); // 英語1単語≒5文字として換算
  
  const minutes = Math.ceil(totalChars / wordsPerMinute);
  return Math.max(1, minutes); // 最低1分
}

// 日付フォーマット関数
export function formatDate(date: string, locale: string = 'ja-JP'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// タグの正規化
export function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

// スラッグ生成
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // 特殊文字を除去
    .replace(/\s+/g, '-') // スペースをハイフンに
    .replace(/-+/g, '-') // 連続するハイフンを一つに
    .trim();
}

// コンテンツの抜粋生成
export function generateExcerpt(content: string, maxLength: number = 150): string {
  // MDXマークアップを除去
  const plainText = content
    .replace(/^---[\s\S]*?---/m, '') // フロントマターを除去
    .replace(/```[\s\S]*?```/g, '') // コードブロックを除去
    .replace(/`[^`]*`/g, '') // インラインコードを除去
    .replace(/#{1,6}\s+/g, '') // 見出しマークアップを除去
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold markdown を除去
    .replace(/\*([^*]+)\*/g, '$1') // Italic markdown を除去
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンクを除去
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // 画像を除去
    .replace(/\n\s*\n/g, ' ') // 改行を除去
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).replace(/\s+\S*$/, '...'); // 単語の途中で切らない
}
