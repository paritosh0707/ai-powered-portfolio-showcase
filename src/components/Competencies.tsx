import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const competencies = [
  {
    title: "Multi-Agent Architecture",
    body: "Designing agentic systems with orchestration, tool integration, memory, reasoning flows, and feedback-driven execution for complex automation.",
    tags: ["LangGraph", "Agent Workflows", "Tool Use", "Orchestration"],
  },
  {
    title: "LLMOps & AI Reliability",
    body: "Building evaluation-aware AI pipelines with prompt lifecycle control, observability, deployment discipline, and production quality safeguards.",
    tags: ["Evaluation", "PromptOps", "Observability", "Deployment"],
  },
  {
    title: "Retrieval & Knowledge Systems",
    body: "Developing grounded AI systems using embeddings, vector search, ranking, and context engineering to improve trust, relevance, and response quality.",
    tags: ["RAG", "Embeddings", "Vector DB", "Retrieval"],
  },
  {
    title: "Enterprise AI Platform Engineering",
    body: "Creating internal and client-facing AI products that integrate with business workflows across automation, testing, and decision-support systems.",
    tags: ["AI Platforms", "Workflow Automation", "Productization", "Enterprise Systems"],
  },
];

export default function Competencies() {
  return (
    <section className="bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Core Competencies
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            What I Build
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            I specialize in building AI systems that combine orchestration,
            reliability, retrieval, and product thinking — designed for
            real-world deployment rather than isolated experimentation.
          </p>
        </FadeIn>

        {/* 2x2 Capability Grid */}
        <Stagger
          className="grid md:grid-cols-2 gap-5"
          staggerDelay={0.12}
        >
          {competencies.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                className="relative p-6 md:p-7 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors overflow-hidden"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {/* Emerald left accent */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-accent/60" />

                <div className="pl-4">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {item.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
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
