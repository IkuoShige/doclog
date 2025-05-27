/**
 * Utility function to handle basePath for images and assets
 */
export function withBasePath(path: string): string {
  // In development, return the path as-is
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // In production (GitHub Pages), prepend the basePath
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/portfolio';
  return `${basePath}${path}`;
}

/**
 * Get the current basePath value
 */
export function getBasePath(): string {
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  return process.env.NEXT_PUBLIC_BASE_PATH || '/portfolio';
}
