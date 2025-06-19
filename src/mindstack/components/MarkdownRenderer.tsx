import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import rehypeHighlight from 'rehype-highlight'

export interface Heading {
  id: string
  text: string
  level: number
}

export function extractHeadings(markdown: string): Heading[] {
  // Simple regex-based extraction for h1, h2, h3
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    // Generate a slug/id (simple, can be improved)
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ id, text, level })
  }
  return headings
}

interface MarkdownRendererProps {
  content: string
  className?: string
}

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Error rendering markdown content. Please try refreshing the page.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  if (!content) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-yellow-600 dark:text-yellow-400">
          No content available.
        </p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Customize heading styles
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold mb-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-bold mb-4 mt-8" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-2xl font-bold mb-3 mt-6" {...props} />
            ),
            // Add custom styling for code blocks
            pre: ({ node, ...props }) => (
              <pre className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto" {...props} />
            ),
            code: ({ node, inline, className, children, ...props }: CodeProps) => (
              <code
                className={`${className} ${inline ? 'bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded' : ''}`}
                {...props}
              >
                {children}
              </code>
            ),
            // Style links
            a: ({ node, ...props }) => (
              <a className="text-accent hover:text-accent/80 transition-colors" {...props} />
            ),
            // Style blockquotes
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-accent pl-4 italic" {...props} />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </ErrorBoundary>
  )
} 