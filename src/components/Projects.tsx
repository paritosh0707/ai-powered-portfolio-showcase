import React, { useState } from "react";
import { ArrowUpRight, Github, Terminal, Layers, Brain, FileCode, Eye, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const categories = [
    { id: "all", label: "All" },
    { id: "nlp", label: "NLP" },
    { id: "llm", label: "LLMs" },
    { id: "cv", label: "Computer Vision" },
    { id: "mlops", label: "MLOps" },
    { id: "genai", label: "Generative AI" },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

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
            {currentProjects.map((project, idx) => (
              <div 
                key={project.id} 
                className="glass-card overflow-hidden group animate-scale-in"
                style={{ animationDelay: `${idx * 100}ms` }}
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
          {/* Navigation Buttons - Desktop */}
          {currentPage > 1 && (
            <button 
              onClick={handlePreviousPage}
              className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
              aria-label="Previous projects"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </button>
          )}
          {currentPage < totalPages && (
            <button 
              onClick={handleNextPage}
              className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
              aria-label="Next projects"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          )}
          {/* Navigation Buttons - Mobile (below grid) */}
          <div className="flex lg:hidden justify-center gap-4 mt-8">
            {currentPage > 1 && (
              <button
                onClick={handlePreviousPage}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
                aria-label="Previous projects"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <ArrowRight className="h-5 w-5 rotate-180" />
              </button>
            )}
            {currentPage < totalPages && (
              <button
                onClick={handleNextPage}
                className="bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-border hover:bg-accent/10 transition-colors z-20"
                aria-label="Next projects"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
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
