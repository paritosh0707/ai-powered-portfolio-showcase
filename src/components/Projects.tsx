import { ArrowUpRight, Github } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const featured = {
  title: "IntelliQA Platform",
  desc: "Enterprise AI platform for QA automation using multi-agent orchestration and LLM-driven workflows.",
  columns: [
    {
      label: "What it does",
      items: [
        "Generates test cases, scripts, and validations",
        "Covers UI, API, and data testing",
        "Supports end-to-end QA lifecycle",
      ],
    },
    {
      label: "How it is built",
      items: [
        "Multi-agent architecture using orchestration frameworks",
        "Retrieval pipelines and evaluation layers",
        "Modular and scalable system design",
      ],
    },
    {
      label: "Impact",
      items: [
        "80%+ productivity improvement",
        "Deployed across enterprise clients",
        "Reduced manual QA effort significantly",
      ],
    },
  ],
};

const coreSystems = [
  {
    title: "Dockrion",
    desc: "A framework for building and deploying AI agents and workflows with structured configurations and containerized execution.",
    highlights: [
      "Agent deployment abstraction",
      "Workflow orchestration via config-driven design",
      "Multi-tenant and scalable architecture concepts",
    ],
  },
  {
    title: "LLM Blocks",
    desc: "A modular architecture layer for reusable LLM components, enabling faster development of AI workflows and pipelines.",
    highlights: [
      "Reusable building blocks for AI systems",
      "Standardized prompt and pipeline design",
      "Supports rapid system prototyping",
    ],
  },
];

const exploration = {
  title: "GenAI Hub",
  desc: "A collection of applied experiments, POCs, and mini-systems exploring emerging patterns in generative AI, multi-agent systems, and automation workflows.",
  line: "A continuous playground for building, testing, and refining AI ideas into practical systems.",
};

export default function Projects() {
  const { toast } = useToast();

  const showCaseStudyToast = () => {
    toast({
      title: "Coming Soon",
      description: "Case study will be published soon. Stay tuned!",
      duration: 4000,
    });
  };

  const showGithubToast = () => {
    toast({
      title: "Coming Soon",
      description: "Repository going live soon. The codebase will be made public shortly.",
      duration: 4000,
    });
  };

  const showExperimentsToast = () => {
    toast({
      title: "Coming Soon",
      description: "Experiments and explorations going live soon. Stay tuned!",
      duration: 4000,
    });
  };

  return (
    <section id="projects" className="bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Selected Work
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            Selected Work
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            Systems where AI meets production and experimentation.
          </p>
        </FadeIn>

        {/* Block 1 — Featured System */}
        <FadeIn delay={0.1}>
          <motion.div
            className="relative p-6 md:p-8 rounded-lg border border-border/40 bg-card mb-6 overflow-hidden"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-accent" />

            <div className="pl-5">
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                {featured.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-8">
                {featured.desc}
              </p>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
                {featured.columns.map((col) => (
                  <div key={col.label}>
                    <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-3 block">
                      {col.label}
                    </span>
                    <ul className="space-y-2">
                      {col.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground/80 leading-relaxed flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={showCaseStudyToast}
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  View Case Study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={showGithubToast}
                  className="btn-outline inline-flex items-center gap-2 text-sm"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Block 2 — Core Systems */}
        <Stagger className="grid md:grid-cols-2 gap-4 mb-4" staggerDelay={0.1}>
          {coreSystems.map((sys) => (
            <StaggerItem key={sys.title}>
              <motion.div
                className="relative p-5 md:p-6 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors overflow-hidden h-full"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full bg-accent/50" />

                <div className="pl-4">
                  <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-2">
                    {sys.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {sys.desc}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {sys.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="text-xs text-foreground/70 flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={showCaseStudyToast}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
                    >
                      Case Study
                      <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button
                      onClick={showGithubToast}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      View on GitHub
                    </button>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Block 3 — Exploration Platform */}
        <FadeIn delay={0.3}>
          <motion.div
            className="p-5 md:p-6 rounded-lg border border-border/30 bg-card/60 hover:border-accent/20 transition-colors mb-10"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="max-w-2xl">
                <h3 className="font-display font-semibold text-base text-foreground mb-2">
                  {exploration.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  {exploration.desc}
                </p>
                <p className="text-xs text-muted-foreground/70 italic">
                  {exploration.line}
                </p>
              </div>
              <button
                onClick={showExperimentsToast}
                className="btn-outline inline-flex items-center gap-2 text-xs shrink-0 self-start"
              >
                <Github className="h-3.5 w-3.5" />
                Explore on GitHub
              </button>
            </div>
          </motion.div>
        </FadeIn>

        {/* More on GitHub */}
        <FadeIn delay={0.4}>
          <div className="text-center">
            <a
              href="https://github.com/paritosh0707"
              className="btn-outline inline-flex items-center gap-2 text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              More on GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
