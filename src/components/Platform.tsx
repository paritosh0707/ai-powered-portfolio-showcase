import { ArrowRight } from "lucide-react";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

type Status = "Production" | "In Development" | "Planned";

type PlatformModule = {
  name: string;
  stage: string;
  status: Status;
  desc: string;
  capabilities: string[];
};

const modules: PlatformModule[] = [
  {
    name: "Spec AI",
    stage: "Define",
    status: "In Development",
    desc: "Transforms product documents and business context into structured requirements, epics, user stories, acceptance criteria, dependencies, and traceability.",
    capabilities: ["Document Intelligence", "Requirement Analysis", "User Story Generation", "Traceability"],
  },
  {
    name: "Proto AI",
    stage: "Design",
    status: "Planned",
    desc: "Converts product intent into UI/UX concepts, interactive prototypes, experience specifications, and high-level architecture recommendations.",
    capabilities: ["UI/UX Generation", "Rapid Prototyping", "Architecture Concepts", "Design Validation"],
  },
  {
    name: "Code IQ",
    stage: "Build",
    status: "In Development",
    desc: "Provides repository intelligence, implementation guidance, code-quality insights, and visibility into engineering and CI/CD workflows.",
    capabilities: ["Repository Intelligence", "Code Quality", "Implementation Guidance", "Pipeline Visibility"],
  },
  {
    name: "IntelliQA",
    stage: "Validate",
    status: "Production",
    desc: "Generates and executes UI, API, and data tests through multi-agent planning, browser automation, validation, and corrective execution.",
    capabilities: ["Test Generation", "Agentic Execution", "API Testing", "Data Validation"],
  },
  {
    name: "Release Pulse",
    stage: "Release",
    status: "Planned",
    desc: "Consolidates regression results, quality signals, release risks, test evidence, and readiness indicators into an actionable release view.",
    capabilities: ["Release Readiness", "Regression Intelligence", "Risk Signals", "Quality Gates"],
  },
];

const foundation = [
  "Identity & Access",
  "Enterprise Integrations",
  "Model Gateway",
  "Agent Orchestration",
  "Knowledge & Retrieval",
  "Evaluation",
  "Observability",
  "Audit & Governance",
  "Deployment Infrastructure",
];

const LIFECYCLE = ["Define", "Design", "Build", "Validate", "Release"];

// Status styling — never color alone: each carries a text label + border style.
const statusStyles: Record<Status, string> = {
  Production: "text-accent bg-accent/10 border border-accent/40",
  "In Development": "text-blue-500 dark:text-blue-400 bg-transparent border border-blue-500/50",
  Planned:
    "text-muted-foreground bg-transparent border border-dashed border-muted-foreground/50",
};

export default function Platform() {
  return (
    <section id="platform" className="bg-surface-container-low">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Flagship Platform
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            Building an AI-Native Product Development Lifecycle
          </h2>
          <p className="text-[15px] md:text-base text-foreground/80 max-w-3xl leading-relaxed mb-4">
            We are extending traditional software delivery into an AI-native
            Product Development Lifecycle—connecting product intent, experience
            design, engineering, quality, and release intelligence within one
            platform.
          </p>
          <p className="text-[15px] text-muted-foreground max-w-3xl leading-relaxed mb-12">
            The platform maintains context and traceability across lifecycle
            stages, allowing specialized AI modules to collaborate rather than
            operate as disconnected assistants.
          </p>
        </FadeIn>

        {/* Lifecycle stepper — horizontal on desktop, vertical on mobile */}
        <FadeIn delay={0.1}>
          <ol className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 mb-10">
            {LIFECYCLE.map((stage, i) => (
              <li key={stage} className="flex items-center gap-3 lg:flex-1">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent/10 border border-accent/40 text-accent text-xs font-semibold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-foreground uppercase tracking-[0.12em]">
                  {stage}
                </span>
                {i < LIFECYCLE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block flex-1 h-px bg-gradient-to-r from-accent/40 to-border ml-2"
                  />
                )}
              </li>
            ))}
          </ol>
        </FadeIn>

        {/* Module cards — vertical stack on mobile, aligned to lifecycle on desktop */}
        <Stagger className="grid gap-4 lg:grid-cols-5" staggerDelay={0.08}>
          {modules.map((m) => (
            <StaggerItem key={m.name}>
              <motion.div
                className="relative flex flex-col h-full p-5 rounded-2xl border border-border/50 bg-card hover:border-accent/40 transition-colors"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.18em]">
                    {m.stage}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-1.5">
                  {m.name}
                </h3>
                <span
                  className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold mb-3 ${statusStyles[m.status]}`}
                >
                  {m.status}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {m.desc}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {m.capabilities.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] px-2 py-1 rounded border border-border/50 text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Shared platform foundation */}
        <FadeIn delay={0.15}>
          <div className="mt-6 p-6 md:p-7 rounded-2xl border border-border/50 bg-gradient-to-b from-accent/[0.04] to-transparent">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-1.5 h-6 rounded-full bg-accent" />
              <h3 className="font-display font-semibold text-base md:text-lg text-foreground">
                Shared AI Platform Foundation
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {foundation.map((f) => (
                <span
                  key={f}
                  className="text-xs px-3 py-1.5 rounded-lg border border-border/50 bg-background/50 text-muted-foreground"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Status legend */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent/20 border border-accent/50" />
              Production
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border border-blue-500/60" />
              In Development
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border border-dashed border-muted-foreground/60" />
              Planned
            </span>
            <span className="inline-flex items-center gap-1.5 ml-auto text-muted-foreground/80">
              <ArrowRight className="h-3 w-3" />
              Define → Design → Build → Validate → Release
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
