declare module '*.mdx' {
  import React from 'react';
  const MDXComponent: React.ComponentType<Record<string, unknown>>;
  export default MDXComponent;
}
