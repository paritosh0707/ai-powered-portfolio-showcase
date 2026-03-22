import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const layers = [
  {
    title: "Agent Systems & Orchestration",
    desc: "Designing multi-agent systems with structured workflows, tool integration, memory handling, and reasoning loops for complex automation.",
    tags: ["LangGraph", "CrewAI", "MCP", "Tool Integration"],
    primary: true,
  },
  {
    title: "LLM Systems & Retrieval",
    desc: "Building grounded AI systems using RAG pipelines, embeddings, vector search, and context engineering to improve response quality and reliability.",
    tags: ["LangChain", "RAG", "Embeddings", "Vector DB"],
  },
  {
    title: "LLMOps & Evaluation",
    desc: "Developing production pipelines with prompt lifecycle management, evaluation frameworks, observability, and deployment control for reliable AI systems.",
    tags: ["Evaluation", "PromptOps", "Observability", "Deployment"],
  },
  {
    title: "AI Platform Engineering",
    desc: "Designing end-to-end AI platforms integrating APIs, workflows, and automation systems to support real business use cases at scale.",
    tags: ["FastAPI", "APIs", "Workflow Systems", "Automation"],
  },
  {
    title: "Infrastructure & Data Systems",
    desc: "Scaling AI systems using cloud infrastructure, containerization, and data pipelines to support performance, reliability, and production workloads.",
    tags: ["Docker", "Kubernetes", "Azure", "PySpark"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Technical Stack
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            AI System Stack
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            A layered view of how I design and scale production-grade AI
            systems — from agent orchestration to infrastructure.
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

                <div className="pl-5">
                  <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-2">
                    {layer.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
                    {layer.desc}
                  </p>
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
