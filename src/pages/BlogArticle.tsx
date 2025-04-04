
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Example blog posts data (in a real app, this would be fetched from a backend)
const blogPosts = [
  {
    slug: "building-rag-systems",
    title: "Building RAG Systems That Actually Work",
    date: "April 15, 2025",
    readTime: "12 min read",
    author: "John Doe",
    tags: ["LLMs", "RAG", "NLP"],
    image: "placeholder.svg",
    content: `
      <h2>Introduction to Retrieval-Augmented Generation</h2>
      <p>Retrieval-Augmented Generation (RAG) has emerged as one of the most practical and powerful approaches for building LLM-powered applications that require domain-specific knowledge. By combining the strengths of retrieval systems with generative language models, RAG addresses key limitations like hallucinations and knowledge cutoffs.</p>
      
      <p>However, building effective RAG systems that deliver consistent, accurate responses in production environments requires careful consideration of numerous factors that go beyond basic implementations.</p>
      
      <h2>The Architecture of Production-Ready RAG Systems</h2>
      
      <p>Production-grade RAG systems typically consist of several carefully engineered components:</p>
      
      <ul>
        <li><strong>Document Processing Pipeline:</strong> Converting raw documents into clean, properly chunked pieces of text</li>
        <li><strong>Vector Database:</strong> Storing embeddings efficiently for fast similarity search</li>
        <li><strong>Retrieval System:</strong> Finding the most relevant context for a given query</li>
        <li><strong>Generation System:</strong> Using the retrieved context to produce accurate, helpful responses</li>
      </ul>
      
      <h2>Key Challenges in RAG Systems</h2>
      
      <p>Despite the conceptual simplicity of RAG, implementing effective systems involves addressing several challenges:</p>
      
      <h3>1. Document Processing and Chunking</h3>
      <p>The way documents are processed and chunked significantly impacts retrieval quality. Large chunks provide more context but may dilute relevance signals, while small chunks might miss important context.</p>
      
      <code>
      # Example recursive chunking strategy
      def chunk_document(document, max_chunk_size=500, overlap=50):
          if len(document) <= max_chunk_size:
              return [document]
              
          chunks = []
          start = 0
          
          while start < len(document):
              end = min(start + max_chunk_size, len(document))
              
              # Try to find a natural breakpoint
              if end < len(document):
                  # Look for paragraph break, sentence break, or word break
                  paragraph_break = document.rfind('\\n\\n', start, end)
                  sentence_break = document.rfind('. ', start, end)
                  word_break = document.rfind(' ', start, end)
                  
                  if paragraph_break > start:
                      end = paragraph_break + 2
                  elif sentence_break > start:
                      end = sentence_break + 2
                  elif word_break > start:
                      end = word_break + 1
              
              chunks.append(document[start:end])
              start = end - overlap
              
          return chunks
      </code>
      
      <h3>2. Retrieval Strategy</h3>
      <p>Simple similarity search often falls short. Hybrid retrieval combining lexical and semantic search, re-ranking, and query transformations can dramatically improve results.</p>
      
      <h3>3. Prompt Engineering</h3>
      <p>The way context is incorporated into prompts matters significantly. Effective prompting strategies include clear instructions, deliberate thinking steps, and structural guidance.</p>
      
      <h2>Evaluation and Monitoring</h2>
      
      <p>Effective RAG systems require continuous evaluation across multiple dimensions:</p>
      
      <ul>
        <li><strong>Retrieval Accuracy:</strong> How relevant is the retrieved context?</li>
        <li><strong>Generation Quality:</strong> Is the generated response accurate, helpful, and coherent?</li>
        <li><strong>End-to-End Performance:</strong> Does the system solve the user's problem?</li>
      </ul>
      
      <p>Regular evaluation using ground truth datasets, relevance metrics, and human feedback loops are essential for maintaining system quality.</p>
      
      <h2>Advanced RAG Techniques</h2>
      
      <h3>Multi-Document RAG</h3>
      <p>Handling multiple documents with potentially conflicting information requires sophisticated reconciliation strategies and evidence weighing mechanisms.</p>
      
      <h3>Hierarchical RAG</h3>
      <p>Using a multi-stage approach where a high-level retrieval first identifies relevant document sections, followed by more focused retrieval within those sections.</p>
      
      <h3>Recursive Retrieval</h3>
      <p>Implementing multiple rounds of retrieval, where the model can ask for additional information when needed to build a more complete understanding.</p>
      
      <h2>Conclusion</h2>
      
      <p>Building effective RAG systems is both an art and a science. The most successful implementations carefully tune each component of the pipeline, implement rigorous evaluation frameworks, and continuously refine based on real-world performance.</p>
      
      <p>As the field evolves, we're seeing increasingly sophisticated RAG architectures that push the boundaries of what's possible with current technology. By following the principles outlined in this article, you'll be well-positioned to build RAG systems that truly work in production environments.</p>
    `
  },
  {
    slug: "fine-tuning-llms-efficiently",
    title: "Fine-tuning LLMs Without Breaking the Bank",
    date: "March 24, 2025",
    readTime: "9 min read",
    author: "John Doe",
    tags: ["LLMs", "Fine-tuning", "PEFT"],
    image: "placeholder.svg",
    content: `
      <h2>Introduction to Efficient LLM Fine-tuning</h2>
      <p>Fine-tuning large language models has traditionally been an expensive and resource-intensive process. In this article, we explore parameter-efficient fine-tuning techniques that can dramatically reduce costs without sacrificing performance.</p>
      
      <h2>Understanding PEFT Techniques</h2>
      <p>Parameter-Efficient Fine-Tuning (PEFT) methods allow us to adapt large pre-trained models to specific tasks while updating only a small subset of parameters. This approach significantly reduces computational and memory requirements.</p>
      
      <h3>Key PEFT Methods</h3>
      <ul>
        <li><strong>LoRA (Low-Rank Adaptation):</strong> Adds trainable rank decomposition matrices to existing weights</li>
        <li><strong>QLoRA:</strong> Combines quantization with LoRA for even greater efficiency</li>
        <li><strong>Prefix Tuning:</strong> Prepends trainable continuous vectors to the input</li>
        <li><strong>Prompt Tuning:</strong> Optimizes continuous prompts in the embedding space</li>
      </ul>
      
      <h2>Implementing LoRA for Efficient Fine-tuning</h2>
      <p>Here's how to implement LoRA using the PEFT library from Hugging Face:</p>
      
      <h2>Conclusion</h2>
      <p>With parameter-efficient fine-tuning techniques, you can now adapt state-of-the-art LLMs to your specific use cases without requiring massive computational resources or breaking your budget.</p>
    `
  },
  {
    slug: "mlops-best-practices",
    title: "MLOps Best Practices for LLM Applications",
    date: "February 10, 2025",
    readTime: "15 min read",
    author: "John Doe",
    tags: ["MLOps", "LLMs", "Production"],
    image: "placeholder.svg",
    content: `
      <h2>Introduction to MLOps for LLMs</h2>
      <p>Deploying LLM-based applications in production presents unique challenges compared to traditional machine learning models. This article outlines best practices for building robust MLOps pipelines specifically designed for LLM applications.</p>
      
      <h2>The LLM Deployment Lifecycle</h2>
      <p>A comprehensive MLOps pipeline for LLMs includes several crucial stages:</p>
      
      <ul>
        <li><strong>Model Selection and Adaptation:</strong> Choosing and customizing the right foundation model</li>
        <li><strong>Evaluation and Testing:</strong> Rigorous assessment across multiple dimensions</li>
        <li><strong>Deployment Architecture:</strong> Optimizing for latency, throughput, and cost</li>
        <li><strong>Monitoring and Observability:</strong> Tracking key performance metrics</li>
        <li><strong>Feedback Loops:</strong> Continuously improving based on real-world performance</li>
      </ul>
      
      <h2>Key MLOps Challenges for LLMs</h2>
      
      <h3>1. Handling Model Weight Updates</h3>
      <p>Large model weights require special consideration for CI/CD pipelines, version control, and deployment strategies.</p>
      
      <h3>2. Infrastructure Optimization</h3>
      <p>LLMs have significant resource requirements that necessitate careful hardware selection and scaling strategies.</p>
      
      <h3>3. Monitoring Beyond Traditional Metrics</h3>
      <p>LLM applications require monitoring not just for technical performance but also for output quality, safety, and alignment.</p>
      
      <h2>Building a Robust Evaluation Framework</h2>
      <p>Effective LLM evaluation requires testing across multiple dimensions:</p>
      
      <ul>
        <li><strong>Functional Testing:</strong> Does the model perform the core task correctly?</li>
        <li><strong>Safety Testing:</strong> Does the model resist misuse and avoid harmful outputs?</li>
        <li><strong>Robustness Testing:</strong> How does the model handle edge cases and adversarial inputs?</li>
        <li><strong>Fairness Testing:</strong> Does the model exhibit biases or disparate performance across groups?</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building robust MLOps pipelines for LLM applications requires careful consideration of the unique challenges these models present. By following the best practices outlined in this article, you can deploy LLM applications that are reliable, maintainable, and continuously improving.</p>
    `
  }
];

export default function BlogArticle() {
  const { slug } = useParams();
  const article = blogPosts.find(post => post.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
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
            <Link to="/blog" className="inline-flex items-center text-foreground/70 hover:text-accent mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
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
            <Link to="/blog" className="btn-outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
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
