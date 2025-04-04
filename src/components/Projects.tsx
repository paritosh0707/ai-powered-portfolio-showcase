
import React, { useState } from "react";
import { ArrowUpRight, Github, Terminal, Layers, Brain, FileCode, Eye, ArrowRight } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "nlp", label: "NLP" },
    { id: "llm", label: "LLMs" },
    { id: "cv", label: "Computer Vision" },
    { id: "mlops", label: "MLOps" },
    { id: "genai", label: "Generative AI" },
  ];

  const projects = [
    {
      id: 1,
      title: "Intelligent Document Processing System",
      description: "Built an end-to-end document processing system using OCR, NER, and LLMs to extract structured data from unstructured documents with 95% accuracy.",
      image: "placeholder.svg",
      demo: "#",
      github: "#",
      categories: ["nlp", "llm"],
      stack: ["PyTorch", "Hugging Face", "FastAPI", "React", "Docker"],
      impact: "Reduced manual processing time by 85% for a Fortune 500 client"
    },
    {
      id: 2,
      title: "Multi-Agent RAG Framework",
      description: "Developed a retrieval-augmented generation framework with multiple specialist agents that collaborate to provide more accurate and contextual responses.",
      image: "placeholder.svg",
      demo: "#",
      github: "#",
      categories: ["llm", "genai"],
      stack: ["LangChain", "LlamaIndex", "OpenAI", "Pinecone", "FastAPI"],
      impact: "Improved answer accuracy by 42% over standard RAG systems"
    },
    {
      id: 3,
      title: "Real-time Object Detection System",
      description: "Implemented a highly optimized object detection system for edge devices that processes video streams in real-time with minimal latency.",
      image: "placeholder.svg",
      demo: "#",
      github: "#",
      categories: ["cv", "mlops"],
      stack: ["TensorFlow Lite", "OpenCV", "Python", "ONNX Runtime", "TensorRT"],
      impact: "Achieved 30 FPS on Raspberry Pi with 91% mAP score"
    },
    {
      id: 4,
      title: "Automated ML Pipeline Orchestrator",
      description: "Created a platform for automating the deployment, monitoring, and governance of machine learning models in production environments.",
      image: "placeholder.svg",
      demo: "#",
      github: "#",
      categories: ["mlops"],
      stack: ["Kubernetes", "Airflow", "MLflow", "Prometheus", "Grafana"],
      impact: "Cut deployment time from weeks to hours for 30+ data science teams"
    },
    {
      id: 5,
      title: "Neural Text-to-Image Generator",
      description: "Built a custom text-to-image diffusion model specialized for generating photorealistic product images from textual descriptions.",
      image: "placeholder.svg",
      demo: "#",
      github: "#",
      categories: ["genai", "cv"],
      stack: ["PyTorch", "Diffusers", "CLIP", "React", "FastAPI"],
      impact: "Reduced product photography costs by 70% for e-commerce clients"
    },
    {
      id: 6,
      title: "LLM Fine-tuning Framework",
      description: "Developed a framework for efficiently fine-tuning large language models on domain-specific data with parameter-efficient techniques.",
      image: "placeholder.svg",
      demo: "#",
      github: "#",
      categories: ["llm", "nlp", "mlops"],
      stack: ["PyTorch", "Hugging Face", "PEFT", "DeepSpeed", "Weights & Biases"],
      impact: "Achieved 92% domain accuracy with only 5% of full fine-tuning cost"
    },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

  return (
    <section id="projects" className="py-24">
      <div className="container">
        <h2 className="section-title mb-16 text-center">
          <Layers className="h-8 w-8 text-accent mr-2" />
          <span>Projects & Case Studies</span>
        </h2>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category.id
                  ? "bg-accent text-white"
                  : "bg-muted hover:bg-muted/80 text-foreground/80"
              }`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="glass-card overflow-hidden group animate-scale-in"
                style={{ animationDelay: `${(project.id - 1) * 100}ms` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.categories.map((category, i) => (
                      <span key={i} className="badge badge-secondary text-xs">
                        {categories.find(c => c.id === category)?.label}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  
                  <p className="text-foreground/80 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-sm text-accent mb-1">
                      <Brain className="h-4 w-4" />
                      <span className="font-medium">Impact:</span>
                    </div>
                    <p className="text-sm text-foreground/80">{project.impact}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-sm text-accent mb-1">
                      <Terminal className="h-4 w-4" />
                      <span className="font-medium">Tech Stack:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.stack.map((tech, i) => (
                        <span key={i} className="badge text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-1 text-sm hover:text-accent transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-10 hidden lg:flex"
            aria-label="Previous projects"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </button>
          
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-10 hidden lg:flex"
            aria-label="Next projects"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://github.com/username" 
            className="btn-outline inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            <span>See More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
