import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const competencies = [
  {
    title: "Product & Platform Strategy",
    body: "Translating business problems, client feedback, and product opportunities into platform capabilities, technical roadmaps, and phased delivery plans.",
    tags: ["Product Discovery", "Capability Roadmaps", "Use-Case Prioritization", "Platform Thinking"],
  },
  {
    title: "AI Architecture",
    body: "Designing multi-agent, retrieval, evaluation, integration, and execution architectures for reliable enterprise AI systems.",
    tags: ["Multi-Agent Systems", "RAG", "LLMOps", "Distributed Workflows"],
  },
  {
    title: "Engineering Leadership",
    body: "Leading cross-functional teams, defining technical direction, reviewing system designs, and establishing production engineering practices.",
    tags: ["Team Leadership", "Technical Direction", "Engineering Quality", "Delivery Governance"],
  },
  {
    title: "Client Solutioning",
    body: "Participating in client discovery, translating business needs into AI solutions, and building and presenting product demonstrations.",
    tags: ["Client Discovery", "Solution Design", "Technical Pitches", "Product Demos"],
  },
];

export default function Competencies() {
  return (
    <section id="leadership" className="bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Core Leadership Areas
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            How I Create and Scale AI Products
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            My role spans the complete journey from identifying the right product
            problem to designing, building, scaling, and presenting the resulting
            AI platform.
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
