import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const layers = [
  {
    title: "Agent Systems & Orchestration",
    tags: ["LangGraph", "LangChain", "CrewAI", "MCP", "Tool Integration", "Agentic Workflows"],
    primary: true,
  },
  {
    title: "LLM Systems & Knowledge",
    tags: ["Azure OpenAI", "RAG", "Embeddings", "Vector Search", "Context Engineering", "Structured Generation"],
  },
  {
    title: "AI Reliability & LLMOps",
    tags: ["Evaluation", "PromptOps", "Observability", "Tracing", "Guardrails", "Model Monitoring"],
  },
  {
    title: "Platform & Backend Engineering",
    tags: ["Python", "FastAPI", "REST", "SSE", "WebSockets", "Background Processing"],
  },
  {
    title: "Infrastructure & Data",
    tags: ["Docker", "Kubernetes", "Azure", "Redis", "PostgreSQL", "PySpark"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Technical Foundation
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            Architecture and Engineering Stack
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            The technologies and architectural capabilities I use to turn product
            requirements into reliable, production-grade AI platforms.
          </p>
        </FadeIn>

        <Stagger className="flex flex-col gap-4" staggerDelay={0.1}>
          {layers.map((layer) => (
            <StaggerItem key={layer.title}>
              <motion.div
                className="relative p-5 md:p-6 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors overflow-hidden"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={`absolute left-0 top-5 bottom-5 rounded-full bg-accent ${
                    layer.primary ? "w-[3px] opacity-100" : "w-[2px] opacity-50"
                  }`}
                />

                <div className="pl-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h3 className="font-display font-semibold text-base md:text-lg text-foreground shrink-0 sm:w-64">
                    {layer.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {layer.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-1 rounded border border-border/40 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
