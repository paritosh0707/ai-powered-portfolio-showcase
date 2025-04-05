
import React from "react";
import { User, Briefcase, Book, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container max-w-4xl">
        <h2 className="section-title">
          <User className="h-8 w-8 text-accent" />
          <span>About Me</span>
        </h2>

        <div className="glass-card p-6 md:p-8 animate-scale-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Professional Bio</h3>
            <p className="text-foreground/80 mb-4">
            With over 3 years of experience in data science and a strong focus on Generative AI, I specialize in building scalable, production-ready solutions that drive real-world impact.
            My expertise spans LangChain, LLMOps, MLOps, and deep learning, with hands-on experience in building multi-agent systems, RAG pipelines, and automated data workflows.
            </p>
            <p className="text-foreground/80">
            Currently, I work as a Senior Data Scientist at Incedo Solutions Ltd, where I lead the development of innovative AI-driven tools—ranging from QA automation systems that generate 
            Gherkin-based test cases to enterprise-ready APIs that streamline business operations. My projects have led to measurable improvements, including a 36% boost in QA productivity and a 44% gain in data validation efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-accent" />
                Experience Highlights
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• Led a team of 5 ML engineers at Incedo</li>
                <li>• Deployed 12+ ML models to production</li>
                <li>• Reduced inference costs by 45% through optimization</li>
                <li>• Mentored 20+ junior data scientists</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Book className="h-5 w-5 mr-2 text-accent" />
                Education
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• MSc in Machine Learning, Stanford University</li>
                <li>• BSc in Computer Science, MIT</li>
                <li>• Deep Learning Specialization, Coursera</li>
                <li>• MLOps Certification, Google Cloud</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-accent" />
              Fun Facts
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 text-foreground/80">
              <li>• Avid rock climber and outdoor enthusiast</li>
              <li>• Published author on MLOps best practices</li>
              <li>• Open-source contributor to Hugging Face and LangChain</li>
              <li>• Built my first neural network at age 16</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
