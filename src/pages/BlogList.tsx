import React from "react";
import { FileText, ArrowLeft, Clock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

export default function BlogList() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-muted/20 min-h-screen relative">
      {/* Fixed top-right back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn-outline flex items-center gap-2 fixed top-8 right-8 z-30"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
      <div className="container">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="section-title flex items-center">
            <FileText className="h-8 w-8 text-accent mr-2" />
            <span>All Articles</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
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
                  className="flex items-center font-medium text-accent group-hover:translate-x-1 transition-transform"
                >
                  <span>Read more</span>
                  <FileText className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom back button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center gap-2"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>
    </section>
  );
} 