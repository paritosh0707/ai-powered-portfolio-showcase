import React from "react";
import { Briefcase, Download, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  projects: {
    title: string;
    description: string;
  }[];
};

export default function Experience() {
  const isMobile = useIsMobile();
  const experiences: ExperienceItem[] = [
    {
      title: "Senior AI Engineer",
      company: "Incedo Solutions Ltd",
      location: "Gurugram",
      period: "2024 - Present",
      description:
        "Orchestrated the scale-up and enterprise rollout of an LLM-powered QA automation platform for 3 major clients. Led a cross-functional team to deliver multi-agent user story intelligence, agentic API testing, and multimodal QA chatbot solutions. Championed developer enablement and standardized GenAI infrastructure across the org.",
      projects: [
        {
          title: "User Story Intelligence System",
          description:
            "Production-ready, multi-agent system that parsed 50-page PRDs into clustered epics and sprint-ready stories; generated 180+ user stories in under 3 minutes."
        },
        {
          title: "Agentic API Testing Framework",
          description:
            "Automated test generation and batch execution for OpenAPI, Postman, and legacy SOAP; 850+ test cases generated in under 2 minutes."
        },
        {
          title: "UI Testing Pipeline & MCP Server",
          description:
            "Dynamic test generation and codebase-aware artifact reuse via in-house Model Context Protocol server; improved productivity by 83% (manual) and 78% (automation)."
        },
        {
          title: "Multimodal QA Chatbot",
          description:
            "Deployed chatbot supporting documents, screenshots, and contextual queries with long-memory tracking and semantic context handling."
        },
        {
          title: "Agent Builder Platform",
          description:
            "No-code platform enabling non-AI engineers to assemble LangGraph workflows with self-improvement loops and shared toolsets."
        },
        {
          title: "GenAI Infrastructure & Frameworks",
          description:
            "Standardized internal AI framework: RagTune (configurable RAG engine), FineTune (modular LLM fine-tuning toolkit), embedding validators, agent tracing, and unified MCP servers."
        },
        {
          title: "Developer Enablement & Strategy Alignment",
          description:
            "Documented prompt patterns, agent chaining, and RAG tuning; reduced onboarding time and aligned GenAI-driven test pipelines with domain-specific QA strategy."
        }
      ]
    },
    {
      title: "AI Engineer",
      company: "Incedo Solutions Ltd",
      location: "Gurugram",
      period: "2022 - 2024",
      description:
        "Conceptualized and architected the company’s first LLM-powered QA automation platform from scratch. Implemented scalable backend APIs and engineered foundational test generation, data testing, and agentic workflow modules.",
      projects: [
        {
          title: "LLM-powered QA Automation Platform",
          description:
            "Built from scratch using FastAPI, Docker, and Kubernetes; enabled scalable backend APIs and platform extensibility."
        },
        {
          title: "Test Case Generation Engine",
          description:
            "Engineered initial engine using Corrective RAG with hierarchical embeddings; integrated JIRA workflows and TestRail for scenario coverage."
        },
        {
          title: "LangChain Agent Prototypes",
          description:
            "Prototyped agents for document parsing, prompt chaining, and semantic story mapping—laying the foundation for agentic workflow orchestration."
        },
        {
          title: "Data Testing Module",
          description:
            "Developed PySpark and SQL transformation logic for mapping specs; implemented auto-mapping, record comparison, and end-to-end validation reporting."
        },
        {
          title: "API Testing Engine",
          description:
            "Built first version capable of parsing Swagger/Postman inputs, auto-generating payloads, and executing one-click test runs with structured logs."
        },
        {
          title: "Enterprise POC & Impact",
          description:
            "Piloted and delivered the platform’s first enterprise POC, achieving a 43% reduction in manual QA effort within 2 sprints and securing leadership approval to scale." 
        }
      ]
    },
    // {
    //   title: "AI Intern",
    //   company: "Incedo Solutions Ltd",
    //   location: "Gurugram",
    //   period: "2018 - 2019",
    //   description: "Conducted research on deep learning methods for computer vision applications. Published 2 papers in top-tier conferences.",
    //   projects: [
    //     {
    //       title: "Advanced Object Detection",
    //       description: "Developed a novel approach for real-time object detection on edge devices, achieving 30 FPS on Raspberry Pi."
    //     },
    //     {
    //       title: "Transfer Learning Benchmark",
    //       description: "Created a comprehensive benchmark for transfer learning techniques across various computer vision tasks."
    //     }
    //   ]
    // }
  ];

  return (
    <section id="experience" className="py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-16">
          <h2 className="section-title">
            <Briefcase className="h-8 w-8 text-accent" />
            <span>Experience</span>
          </h2>
          
          <a 
            href="/Paritosh_Sharma_Senior_AI_Engineer.pdf" 
            download
            className="flex items-center gap-2 self-start sm:self-auto btn-outline"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>

        <div className="timeline-container relative">
          {/* Only show the vertical line on larger screens */}
          <div className="timeline-line hidden md:block"></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`timeline-item ${isMobile ? 'flex flex-col mb-12 pb-8 border-b border-border/30 last:border-0' : 'md:grid md:grid-cols-2 gap-8 mb-16'} animate-fade-in`} 
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot (only visible on larger screens) */}
              <div className="timeline-dot hidden md:block"></div>
              
              {/* Date and Location (arranged differently on mobile vs desktop) */}
              <div className={`timeline-date ${isMobile ? 'mb-2' : 'md:text-right flex flex-col justify-center items-start md:items-end'}`}>
                <span className="text-lg font-bold text-accent">{exp.period}</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{exp.location}</span>
                </div>
              </div>
              
              {/* Experience Content */}
              <div className={`timeline-content ${isMobile ? 'mt-4' : 'md:col-start-2'} glass-card p-6 rounded-lg`}>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <h4 className="text-lg font-medium text-accent mb-2">{exp.company}</h4>
                <p className="text-foreground/80 mb-4">{exp.description}</p>
                
                <h5 className="text-sm font-bold mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-secondary" />
                  Key Projects
                </h5>
                
                <div className="space-y-3">
                  {exp.projects.map((project, idx) => (
                    <div key={idx} className="bg-background/50 p-3 rounded-md">
                      <h6 className="font-medium">{project.title}</h6>
                      <p className="text-sm text-foreground/80">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
