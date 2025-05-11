
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
      company: "TechCorp",
      location: "San Francisco, CA",
      period: "2022 - Present",
      description: "Leading the development of generative AI applications and MLOps infrastructure. Mentoring junior engineers and architecting scalable ML systems.",
      projects: [
        {
          title: "Enterprise LLM Platform",
          description: "Built a scalable platform for fine-tuning and deploying large language models, reducing costs by 45% and improving model performance by 35%."
        },
        {
          title: "Intelligent Document Processing",
          description: "Developed an end-to-end document processing system using OCR, NER, and LLMs with 95% accuracy."
        }
      ]
    },
    {
      title: "Data Scientist",
      company: "DataInnovate",
      location: "New York, NY",
      period: "2019 - 2022",
      description: "Developed and deployed machine learning models for fintech applications. Improved data pipelines and built recommendation systems.",
      projects: [
        {
          title: "Fraud Detection System",
          description: "Implemented ML models that reduced fraud by 67% and saved the company $2.3M annually."
        },
        {
          title: "Customer Segmentation Engine",
          description: "Created a dynamic clustering algorithm that increased marketing campaign effectiveness by 41%."
        }
      ]
    },
    {
      title: "ML Research Intern",
      company: "AI Research Lab",
      location: "Boston, MA",
      period: "2018 - 2019",
      description: "Conducted research on deep learning methods for computer vision applications. Published 2 papers in top-tier conferences.",
      projects: [
        {
          title: "Advanced Object Detection",
          description: "Developed a novel approach for real-time object detection on edge devices, achieving 30 FPS on Raspberry Pi."
        },
        {
          title: "Transfer Learning Benchmark",
          description: "Created a comprehensive benchmark for transfer learning techniques across various computer vision tasks."
        }
      ]
    }
  ];

  const handleDownloadResume = () => {
    // This would typically download a PDF file
    // For now, we'll just log a message
    console.log("Resume download initiated");
    alert("Resume download would start now. This is a placeholder for the actual download functionality.");
  };

  return (
    <section id="experience" className="py-24">
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-16">
          <h2 className="section-title">
            <Briefcase className="h-8 w-8 text-accent" />
            <span>Experience</span>
          </h2>
          
          <Button 
            onClick={handleDownloadResume} 
            className="flex items-center gap-2 self-start sm:self-auto" 
            variant="outline"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
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
