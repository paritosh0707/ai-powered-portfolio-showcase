import { Users, Layers, Building2, TrendingUp } from "lucide-react";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const proofCards = [
  {
    icon: Users,
    title: "10-Member Cross-Functional Team",
    desc: "Leading AI, backend, frontend, QA, and platform contributors across product development and enterprise delivery.",
  },
  {
    icon: Layers,
    title: "AI-Native PDLC Platform",
    desc: "Driving a connected platform spanning requirement intelligence, prototyping, engineering, testing, and release readiness.",
  },
  {
    icon: Building2,
    title: "Enterprise Client Adoption",
    desc: "Contributing to discovery, solution design, product pitches, technical demonstrations, and production deployment.",
  },
  {
    icon: TrendingUp,
    title: "Up to 80% Productivity Improvement",
    desc: "Delivered significant efficiency gains in targeted AI-assisted QA and automation workflows.",
  },
];

const focusTags = [
  "AI Product Strategy",
  "AI Systems Architecture",
  "Engineering Leadership",
  "Client Solutioning",
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
                About / Leadership Profile
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-8 leading-tight"
                style={{ letterSpacing: "-0.035em" }}
              >
                Where Product Thinking
                <br />
                Meets AI Engineering
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-5">
                I am a Lead AI Engineer working at the intersection of product
                strategy, AI architecture, and engineering leadership. I help
                determine what should be built, design how it should work, and
                lead teams in taking it from product concept to enterprise
                deployment.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[15px] text-foreground/80 leading-relaxed mb-5">
                My work spans multi-agent systems, LLM-powered platforms,
                retrieval and context engineering, AI evaluation, agentic
                automation, and cloud-native deployment. Beyond implementation, I
                contribute to product roadmaps, architecture decisions,
                technology selection, client discovery, solution pitches, and
                product demonstrations.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-10">
                I currently lead a cross-functional team of approximately 10
                members and am driving the evolution of an enterprise QA
                automation product into a broader AI-native Product Development
                Lifecycle platform.
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
