import React, { useState } from "react";
import { FileText, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(blogPosts.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const currentBlogs = blogPosts.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section id="blog" className="py-24 bg-muted/20">
      <div className="container">
        <h2 className="section-title mb-16 text-center">
          <FileText className="h-8 w-8 text-accent mr-2" />
          <span>Latest Articles</span>
        </h2>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8">
            {currentBlogs.map((post, idx) => (
              <div 
                key={post.id} 
                className="glass-card overflow-hidden group animate-scale-in block"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag, i) => (
                      <span key={i} className="badge badge-accent text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-foreground/80 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-foreground/60 mb-4">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <Link 
                    to={{ pathname: `/blog/${post.slug}` }}
                    state={{ from: 'home' }}
                    className="flex items-center font-medium text-accent group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* Navigation Buttons - Desktop */}
          {currentPage > 1 && (
            <button 
              onClick={handlePreviousPage}
              className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
              aria-label="Previous articles"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
          )}
          {currentPage < totalPages && (
            <button 
              onClick={handleNextPage}
              className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
              aria-label="Next articles"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
          {/* Navigation Buttons - Mobile (below grid) */}
          <div className="flex md:hidden justify-center gap-4 mt-8">
            {currentPage > 1 && (
              <button
                onClick={handlePreviousPage}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
                aria-label="Previous articles"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={handleNextPage}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
                aria-label="Next articles"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/blog" className="btn-outline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
