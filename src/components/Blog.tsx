
import React from "react";
import { FileText, ArrowRight, Clock } from "lucide-react";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Building RAG Systems That Actually Work",
      excerpt: "A deep dive into retrieval-augmented generation architectures and how to optimize them for production use cases.",
      image: "placeholder.svg",
      date: "April 15, 2025",
      readTime: "12 min read",
      tags: ["LLMs", "RAG", "NLP"],
      link: "#"
    },
    {
      id: 2,
      title: "Fine-tuning LLMs Without Breaking the Bank",
      excerpt: "Practical strategies for efficiently fine-tuning large language models with parameter-efficient techniques like LoRA and QLoRA.",
      image: "placeholder.svg",
      date: "March 24, 2025",
      readTime: "9 min read",
      tags: ["LLMs", "Fine-tuning", "PEFT"],
      link: "#"
    },
    {
      id: 3,
      title: "MLOps Best Practices for LLM Applications",
      excerpt: "How to build robust MLOps pipelines specifically designed for deploying and monitoring LLM-based applications.",
      image: "placeholder.svg",
      date: "February 10, 2025",
      readTime: "15 min read",
      tags: ["MLOps", "LLMs", "Production"],
      link: "#"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-muted/20">
      <div className="container">
        <h2 className="section-title mb-16 text-center">
          <FileText className="h-8 w-8 text-accent mr-2" />
          <span>Latest Articles</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={post.link}
              className="glass-card overflow-hidden group animate-scale-in block"
              style={{ animationDelay: `${(post.id - 1) * 100}ms` }}
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
                
                <div className="flex items-center font-medium text-accent group-hover:translate-x-1 transition-transform">
                  <span>Read more</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="btn-outline">
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
}
