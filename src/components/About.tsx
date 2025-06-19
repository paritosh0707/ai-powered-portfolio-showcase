
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
                <li>• Led a team of 5 AI engineers at Incedo</li>
                <li>• Built an AI-powered QA automation system boosting productivity by 63%</li>
                <li>• Developed a GenAI data validation platform with a 77% productivity gain</li>
                {/* <li>• Mentored 20+ junior data scientists</li> */}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Book className="h-5 w-5 mr-2 text-accent" />
                Education
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>• B.E. Computer Science – Thapar University</li>
                <li>• NLP & Deep Learning Specialization – Coursera</li>
                <li>• Generative AI Bootcamp – LLMOps Focus</li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2 text-accent" />
              Fun Facts
            </h3>
            <ul className="grid md:grid-cols-2 gap-2 text-foreground/80">
              <li>• If I weren’t an AI engineer, I’d probably be a full-time AI teacher.</li>
              <li>• I love teaching complex AI concepts in a way that even non-tech folks can understand.</li>
              <li>• I enjoy turning cutting-edge research into hands-on lessons—one slide deck at a time.</li>
              <li>• I’ve mentored 20+ junior data scientists and love breaking down tough AI topics into ‘aha’ moments.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
