// MDXファイルの読み込みをテストするスクリプト
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentDirectory = path.join(process.cwd(), 'content/blog')

console.log('Content directory:', contentDirectory)
console.log('Directory exists:', fs.existsSync(contentDirectory))

if (fs.existsSync(contentDirectory)) {
  const files = fs.readdirSync(contentDirectory)
  console.log('All files:', files)
  
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))
  console.log('MDX files:', mdxFiles)
  
  mdxFiles.forEach(file => {
    try {
      const filePath = path.join(contentDirectory, file)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      console.log(`\n--- ${file} ---`)
      console.log('Title:', data.title)
      console.log('Published:', data.published)
      console.log('Date:', data.date)
      console.log('Category:', data.category)
      console.log('Tags:', data.tags)
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message)
    }
  })
}
