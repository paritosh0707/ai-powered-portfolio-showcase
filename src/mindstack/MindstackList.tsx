import React, { Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import { getAllArticles, getAllCategories } from './articles'

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
        <p className="text-foreground/60">Loading articles...</p>
      </div>
    </div>
  )
}

export default function MindstackList() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const articles = getAllArticles()
  const categories = getAllCategories()
  const navigate = useNavigate()

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles

  return (
    <>
      <Helmet>
        <title>Mindstack - Articles & Resources</title>
        <meta name="description" content="Explore articles, books, and posts about AI, technology, and more." />
      </Helmet>

      <div className="min-h-screen">
        <div className="container py-12">
          <button
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center gap-2 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-4xl font-bold mb-8">Mindstack</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`btn ${!selectedCategory ? 'btn-primary' : 'btn-outline'}`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
              >
                {category}
              </button>
            ))}
          </div>

          <Suspense fallback={<LoadingState />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Link
                  key={article.slug}
                  to={article.url}
                  className="glass-card p-6 hover:scale-105 transition-transform"
                >
                  <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  <p className="text-foreground/70 mb-4">{article.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60">
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
                </Link>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </>
  )
} 