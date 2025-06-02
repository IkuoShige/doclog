/**
 * 画像プレースホルダーを生成するユーティリティ関数
 */

/**
 * Base64エンコードされたプレースホルダー画像を生成
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(229,231,235);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(243,244,246);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * ダークモード用のプレースホルダー画像を生成
 */
export function generateDarkBlurDataURL(width: number = 10, height: number = 10): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="darkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(31,41,55);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(55,65,81);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#darkGrad)" />
    </svg>
  `
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * カラー付きのプレースホルダー画像を生成
 */
export function generateColoredBlurDataURL(
  color1: string = '#e5e7eb',
  color2: string = '#f3f4f6',
  width: number = 10,
  height: number = 10
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="colorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#colorGrad)" />
    </svg>
  `
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * 画像URLから最適化されたサイズを計算
 */
export function calculateOptimalSize(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number = 800,
  maxHeight: number = 600
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight
  
  let width = originalWidth
  let height = originalHeight
  
  if (width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }
  
  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}

/**
 * レスポンシブ画像のsizes属性を生成
 */
export function generateSizes(breakpoints: Record<string, string>): string {
  const entries = Object.entries(breakpoints)
  
  return entries
    .map(([breakpoint, size], index) => {
      if (index === entries.length - 1) {
        return size // 最後のエントリは条件なし
      }
      return `(max-width: ${breakpoint}) ${size}`
    })
    .join(', ')
}

/**
 * 事前定義されたレスポンシブsizes
 */
export const responsiveSizes = {
  // フルワイズ画像
  full: '100vw',
  
  // コンテナ内の画像
  container: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
  
  // カード内の画像
  card: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px',
  
  // サムネイル画像
  thumbnail: '(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px',
  
  // ヒーロー画像
  hero: '100vw',
  
  // アバター画像
  avatar: '(max-width: 768px) 64px, 80px'
} as const

/**
 * basePathを考慮した画像URLを生成
 */
export function getImageUrl(imagePath: string): string {
  // 外部URLの場合はそのまま返す
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // 開発環境では basePath を適用しない
  if (process.env.NODE_ENV === 'development') {
    return imagePath;
  }
  
  // プロダクション環境では basePath を適用
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  
  // 既に basePath が含まれている場合は重複を避ける
  if (imagePath.startsWith(basePath)) {
    return imagePath;
  }
  
  // パスが / で始まらない場合は追加
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  return `${basePath}${normalizedPath}`;
}

/**
 * 画像が存在するかどうかを確認する関数（クライアントサイド用）
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * フォールバック画像パスを取得
 */
export function getFallbackImagePath(): string {
  return getImageUrl('/images/placeholder.svg');
}

/**
 * 画像の存在確認とフォールバック処理
 */
export function getImageWithFallback(imagePath: string, fallback: string = '/images/placeholder.svg'): string {
  if (!imagePath) {
    return getImageUrl(fallback);
  }
  
  return getImageUrl(imagePath);
}
