import fm from 'front-matter'

export interface Article {
  title: string
  slug: string
  category: 'blog' | 'books' | 'posts'
  date: string
  description: string
  tags: string[]
  readingTime: number
  content: string
  url: string
}

// Load all markdown files
const articles = import.meta.glob('./content/**/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
})

// Parse articles and their frontmatter
export const parsedArticles: Article[] = Object.entries(articles).map(([path, content]) => {
  try {
    const { attributes: data, body: markdownContent } = fm(content as string)
    const category = path.split('/')[2] as Article['category']
    const slug = path.split('/').pop()?.replace('.md', '') || ''

    // Validate required fields
    if (!data.title || !data.slug || !data.category || !data.date || !data.description || !data.tags || !data.readingTime) {
      console.warn(`Article ${path} is missing required frontmatter fields`)
      return null
    }

    return {
      ...data,
      content: markdownContent,
      url: `/mindstack/${category}/${slug}`,
    } as Article
  } catch (error) {
    console.error(`Error parsing article ${path}:`, error)
    return null
  }
}).filter((article): article is Article => article !== null)

// Helper functions
export function getAllArticles(): Article[] {
  return parsedArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticlesByCategory(category: Article['category']): Article[] {
  return getAllArticles().filter(article => article.category === category)
}

export function getArticleBySlug(category: Article['category'], slug: string): Article | undefined {
  return parsedArticles.find(
    article => article.category === category && article.slug === slug
  )
}

export function getAllCategories(): Article['category'][] {
  return Array.from(new Set(parsedArticles.map(article => article.category)))
}

export function getAllTags(): string[] {
  return Array.from(new Set(parsedArticles.flatMap(article => article.tags))).sort()
} 