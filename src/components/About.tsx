import { TrendingUp, Building2, Layers } from "lucide-react";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const proofCards = [
  {
    icon: TrendingUp,
    title: "80%+ Productivity Lift",
    desc: "Delivered measurable efficiency gains through enterprise AI-driven QA automation.",
  },
  {
    icon: Building2,
    title: "3 Enterprise Deployments",
    desc: "Contributed to scaling AI systems across real client environments and production workflows.",
  },
  {
    icon: Layers,
    title: "Multi-Module AI Platform",
    desc: "Built and scaled AI capabilities across UI testing, API testing, data validation, user story intelligence, and agentic automation.",
  },
];

const focusTags = [
  "Multi-Agent Systems",
  "LLMOps & Evaluation",
  "Enterprise AI Platforms",
  "RAG & Workflow Automation",
];

export default function About() {
  return (
    <section id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20 items-start">
          {/* Left Column — Narrative */}
          <div className="lg:col-span-3">
            <FadeIn>
              <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
                About / Identity
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-8 leading-tight"
                style={{ letterSpacing: "-0.035em" }}
              >
                Building Production-Grade
                <br />
                AI Systems
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
                I am a Senior AI Engineer focused on designing and scaling
                intelligent systems that move beyond prototypes into real
                business environments. My work spans multi-agent orchestration,
                LLM-powered platforms, retrieval systems, and enterprise AI
                automation.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-10">
                I work at the intersection of system architecture, reliability,
                evaluation, and applied intelligence — building solutions that
                are not only technically strong, but usable, measurable, and
                production-ready across complex workflows.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-2">
                {focusTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1.5 rounded border border-border/50 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right Column — Proof Cards */}
          <div className="lg:col-span-2">
            <Stagger className="flex flex-col gap-4" staggerDelay={0.15}>
              {proofCards.map((card) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={card.title}>
                    <motion.div
                      className="p-5 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded bg-accent/10 text-accent shrink-0 mt-0.5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
                            {card.title}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
