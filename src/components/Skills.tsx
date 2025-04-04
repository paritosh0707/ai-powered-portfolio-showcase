
import React from "react";
import { Code, Database, Server, Cpu } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages & Frameworks",
      icon: <Code className="h-6 w-6 text-accent" />,
      skills: [
        { name: "Python", level: 95 },
        { name: "PyTorch", level: 90 },
        { name: "TensorFlow", level: 85 },
        { name: "SQL", level: 80 },
        { name: "LangChain", level: 90 },
        { name: "Scikit-learn", level: 95 },
        { name: "React", level: 75 },
        { name: "FastAPI", level: 85 },
      ],
    },
    {
      title: "AI & ML",
      icon: <Cpu className="h-6 w-6 text-accent" />,
      skills: [
        { name: "Large Language Models", level: 90 },
        { name: "Natural Language Processing", level: 95 },
        { name: "Computer Vision", level: 85 },
        { name: "Reinforcement Learning", level: 80 },
        { name: "Generative AI", level: 90 },
        { name: "Deep Learning", level: 90 },
        { name: "Machine Learning", level: 95 },
        { name: "MLOps", level: 85 },
      ],
    },
    {
      title: "Data Engineering",
      icon: <Database className="h-6 w-6 text-accent" />,
      skills: [
        { name: "Data Pipelines", level: 85 },
        { name: "ETL", level: 80 },
        { name: "Spark", level: 75 },
        { name: "Pandas", level: 95 },
        { name: "PostgreSQL", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "Redis", level: 75 },
        { name: "AWS S3", level: 85 },
      ],
    },
    {
      title: "Infrastructure & DevOps",
      icon: <Server className="h-6 w-6 text-accent" />,
      skills: [
        { name: "Docker", level: 90 },
        { name: "Kubernetes", level: 80 },
        { name: "AWS", level: 85 },
        { name: "GCP", level: 80 },
        { name: "MLflow", level: 85 },
        { name: "CI/CD", level: 80 },
        { name: "Terraform", level: 75 },
        { name: "Git", level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-muted/20">
      <div className="container">
        <h2 className="section-title text-center mb-16">
          Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass-card p-6 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                {category.icon}
                <span className="ml-2">{category.title}</span>
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-foreground/90">
                        {skill.name}
                      </span>
                      <span className="text-sm font-medium text-foreground/60">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-secondary to-accent h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
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
                className="badge badge-accent animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
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
