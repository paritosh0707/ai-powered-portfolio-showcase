import React, { Suspense, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { getArticleBySlug } from './articles'
import MarkdownRenderer, { extractHeadings, Heading } from './components/MarkdownRenderer'

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
        <p className="text-foreground/60">Loading article...</p>
      </div>
    </div>
  )
}

function TableOfContents({ headings }: { headings: Heading[] }) {
  return (
    <nav className="sticky top-24 max-h-[80vh] overflow-auto p-4 bg-background/80 rounded-lg shadow-md border border-border/40 ml-8 min-w-[220px]">
      <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading, idx) => (
          <li key={idx} className={`ml-${(heading.level - 1) * 4}`}>
            <a
              href={`#${heading.id}`}
              className={`block text-foreground/80 hover:text-accent transition-colors text-sm font-${heading.level === 1 ? 'bold' : heading.level === 2 ? 'semibold' : 'normal'}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function ArticlePage() {
  const { category, slug } = useParams()
  const navigate = useNavigate()
  const article = getArticleBySlug(category as any, slug as string)

  // Extract ToC headings
  const tocHeadings = useMemo(() => article ? extractHeadings(article.content) : [], [article])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://yourdomain.com${article.url}`} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <div className="w-full h-96 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="container">
              <button 
                onClick={() => navigate(-1)} 
                className="inline-flex items-center text-foreground/70 hover:text-accent mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readingTime} min read
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {article.tags.map((tag, index) => (
                  <span key={index} className="badge badge-accent">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container py-12 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-3xl mx-auto glass-card p-8">
            <Suspense fallback={<LoadingState />}>
              <MarkdownRenderer content={article.content} />
            </Suspense>
            
            <div className="border-t border-border/50 mt-8 pt-8 flex justify-between">
              <button onClick={() => navigate(-1)} className="btn-outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </div>
          </div>
          {tocHeadings.length > 0 && (
            <div className="hidden lg:block min-w-[260px]">
              <TableOfContents headings={tocHeadings} />
            </div>
          )}
        </div>
      </div>
    </>
  )
} 