
import React from "react";
import { Code, Database, Server, Cpu } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code className="h-6 w-6 text-accent" />,
      skills: [
        "Python", "PyTorch", "TensorFlow", "SQL", 
        "LangChain", "Scikit-learn", "React", "FastAPI"
      ],
    },
    {
      title: "AI & ML",
      icon: <Cpu className="h-6 w-6 text-accent" />,
      skills: [
        "Large Language Models", "Natural Language Processing", 
        "Computer Vision", "Reinforcement Learning", 
        "Generative AI", "Deep Learning", 
        "Machine Learning", "MLOps"
      ],
    },
    {
      title: "Data Engineering",
      icon: <Database className="h-6 w-6 text-accent" />,
      skills: [
        "Data Pipelines", "ETL", "Spark", "Pandas", 
        "PostgreSQL", "MongoDB", "Redis", "AWS S3"
      ],
    },
    {
      title: "Infrastructure & DevOps",
      icon: <Server className="h-6 w-6 text-accent" />,
      skills: [
        "Docker", "Kubernetes", "AWS", "GCP", 
        "MLflow", "CI/CD", "Terraform", "Git"
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container">
        <h2 className="section-title text-center mb-16">
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-lg animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="p-2 rounded-md bg-accent/10 mr-3">{category.icon}</span>
                <span>{category.title}</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="bg-background/50 rounded-md p-2.5 text-center border border-border/30 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                  >
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-6">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex",
              "OpenAI", "BERT", "GPT", "RAG", "Pandas", "NumPy", "Scikit-learn",
              "Matplotlib", "Streamlit", "FastAPI", "Docker", "Kubernetes",
              "AWS", "GCP", "Azure", "Git", "GitHub", "MLflow", "Weights & Biases",
              "DVC", "SQL", "NoSQL", "Airflow", "Luigi", "Spark", "Kafka"
            ].map((tool, index) => (
              <span 
                key={index} 
                className="badge badge-accent animate-fade-in px-3 py-1 bg-background/50 border border-border/30 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
