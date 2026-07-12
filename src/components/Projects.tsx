import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const featured = {
  title: "AI-Native PDLC Platform",
  desc: "A connected enterprise AI platform spanning product definition, experience design, engineering intelligence, autonomous quality validation, and release readiness.",
  tags: [
    "Product Strategy",
    "Platform Architecture",
    "Multi-Agent Systems",
    "Engineering Leadership",
  ],
};

type Project = {
  title: string;
  desc: string;
  tags: string[];
  caseStudyPath?: string;
  website?: string;
  websiteLabel?: string;
  comingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "IntelliQA",
    desc: "An enterprise multi-agent QA platform that converts product requirements into tests, generates automation assets, and executes UI, API, and data validation workflows.",
    tags: ["LangGraph", "Playwright", "RAG", "FastAPI", "Kubernetes"],
    comingSoon: true,
  },
  {
    title: "Dockrion",
    desc: "A configuration-driven platform for packaging, deploying, versioning, observing, and operating AI agents through production-ready runtime abstractions.",
    tags: ["Agent Deployment", "Containerized Runtime", "Observability", "Platform Engineering"],
    caseStudyPath: "/case-study/dockrion",
    website: "https://dockrion.com",
    websiteLabel: "dockrion.com",
  },
  {
    title: "LLM Blocks",
    desc: "A modular architecture layer for reusable LLM components, enabling faster development of AI workflows and pipelines.",
    tags: ["Reusable Components", "Prompt & Pipeline Design", "RAG Workflows", "Rapid Prototyping"],
  },
  {
    title: "GenAI Hub",
    desc: "A collection of applied experiments, POCs, and mini-systems exploring emerging patterns in generative AI, multi-agent systems, and automation workflows.",
    tags: ["Applied Experiments", "Multi-Agent Patterns", "Automation", "GenAI"],
  },
];

export default function Projects() {
  const { toast } = useToast();

  const scrollToPlatform = () => {
    document.getElementById("platform")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showCaseStudyToast = () => {
    toast({
      title: "Case study in progress",
      description: "A detailed IntelliQA case study is being prepared. Check back soon!",
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
            Selected Systems and Case Studies
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-14 leading-relaxed">
            A deeper look at the platforms, architectural decisions, and
            engineering systems behind my work.
          </p>
        </FadeIn>

        {/* Featured — AI-Native PDLC Platform */}
        <FadeIn delay={0.1}>
          <motion.div
            className="relative p-6 md:p-8 rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/[0.06] to-card mb-6 overflow-hidden"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-accent" />
            <div className="pl-5">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em] mb-3 block">
                Flagship
              </span>
              <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
                {featured.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-5">
                {featured.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {featured.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded border border-border/50 text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={scrollToPlatform}
                className="btn-primary w-full sm:w-auto gap-2"
              >
                Explore Platform Vision
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </FadeIn>

        {/* Project grid */}
        <Stagger className="grid md:grid-cols-2 gap-4 mb-10" staggerDelay={0.1}>
          {projects.map((p) => (
            <StaggerItem key={p.title}>
              <motion.div
                className="relative flex flex-col h-full p-5 md:p-6 rounded-2xl border border-border/50 bg-card hover:border-accent/30 transition-colors overflow-hidden"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute left-0 top-5 bottom-5 w-[2px] rounded-full bg-accent/40" />
                <div className="pl-4 flex flex-col h-full">
                  <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-1 rounded border border-border/50 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {(p.caseStudyPath || p.website || p.comingSoon) && (
                    <div className="mt-auto flex items-center gap-4 flex-wrap">
                      {p.caseStudyPath && (
                        <Link
                          to={p.caseStudyPath}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:opacity-80 transition-opacity"
                        >
                          View {p.title} Case Study
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      )}
                      {p.comingSoon && (
                        <button
                          onClick={showCaseStudyToast}
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
                        >
                          View {p.title} Case Study
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      )}
                      {p.website && (
                        <a
                          href={p.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          {p.websiteLabel ?? "Website"}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* More on GitHub — real profile link */}
        <FadeIn delay={0.2}>
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
