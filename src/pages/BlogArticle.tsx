import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { blogPosts as importedBlogPosts } from "@/data/blogPosts";

const blogPosts = importedBlogPosts.map(post => ({
  ...post,
  content: post.content || '', // fallback if content is not present in the data file
}));

export default function BlogArticle() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;
  const article = blogPosts.find(post => post.slug === slug);

  const handleBack = React.useCallback(() => {
    if (from === 'list') {
      navigate(-2);
    } else {
      navigate(-1);
    }
  }, [from, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <button onClick={handleBack} className="btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full h-96 relative">
        <img 
          src={`/${article.image}`} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8">
          <div className="container">
            <button onClick={handleBack} className="inline-flex items-center text-foreground/70 hover:text-accent mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime}
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
      
      <div className="container py-12">
        <div className="max-w-3xl mx-auto glass-card p-8">
          <ScrollArea className="h-[70vh]">
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </ScrollArea>
          
          <div className="border-t border-border/50 mt-8 pt-8 flex justify-between">
            <button onClick={handleBack} className="btn-outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            
            <a 
              href="#" 
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                window.open('/resume.pdf', '_blank');
              }}
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
