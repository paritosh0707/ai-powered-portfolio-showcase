import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";
import ResumeActions from "@/components/ResumeActions";

type Group = {
  label: string;
  points: string[];
};

type Role = {
  title: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  groups?: Group[];
  contributions?: string[];
  impact: string[];
};

const roles: Role[] = [
  {
    title: "Lead AI Engineer",
    company: "Incedo Solutions Ltd",
    period: "2026 — Present",
    current: true,
    summary:
      "Leading the product and engineering evolution of an enterprise AI platform spanning the complete product development lifecycle—from requirement intelligence and experience prototyping to code quality, autonomous testing, and release readiness.",
    groups: [
      {
        label: "Product & Platform Leadership",
        points: [
          "Shape product capabilities by translating business problems, client feedback, and enterprise use cases into technical roadmaps.",
          "Drive the evolution of IntelliQA from an AI-assisted testing solution into a broader AI-native Product Development Lifecycle platform.",
          "Define module boundaries, integration patterns, shared platform capabilities, and phased delivery priorities.",
          "Participate in decisions concerning what should be built, why it should be built, and how it should evolve.",
        ],
      },
      {
        label: "Architecture & Engineering Leadership",
        points: [
          "Own architectural decisions across multi-agent orchestration, retrieval, model integration, evaluation, observability, asynchronous execution, and scalable deployment.",
          "Lead technology selection and design trade-offs across LangGraph, FastAPI, Kubernetes, Azure OpenAI, vector search, Playwright, and supporting services.",
          "Lead a cross-functional team of approximately 10 members across AI, backend, frontend, testing, and platform engineering.",
          "Establish engineering practices for modularity, reliability, evaluation, security, scalability, and production readiness.",
        ],
      },
      {
        label: "Client & Solution Leadership",
        points: [
          "Contribute to client discovery sessions, product pitches, solution architecture, and technical demonstrations.",
          "Translate client challenges into practical product scenarios and production-feasible AI solutions.",
          "Build and present demonstrations that communicate business value, platform capability, and underlying architecture.",
          "Incorporate enterprise feedback into product priorities and platform evolution.",
        ],
      },
    ],
    impact: [
      "10-member cross-functional team",
      "AI-native PDLC platform leadership",
      "Enterprise solutioning and product demonstrations",
      "Platform architecture and technology ownership",
    ],
  },
  {
    title: "Senior AI Engineer",
    company: "Incedo Solutions Ltd",
    period: "2024 — 2026",
    summary:
      "Designed and scaled the multi-agent architecture behind IntelliQA, expanding it from focused test generation into a modular enterprise QA automation platform.",
    contributions: [
      "Designed agentic workflows for requirement analysis, test generation, browser automation, API testing, data validation, and code generation.",
      "Led the migration and evolution of orchestration patterns using LangGraph-based stateful workflows.",
      "Designed retrieval, context management, structured output, evaluation, and observability capabilities for production LLM systems.",
      "Built scalable execution patterns for long-running browser and AI workloads using background processing, queues, containers, and Kubernetes.",
      "Worked with product and engineering stakeholders to convert enterprise QA challenges into reusable platform capabilities.",
      "Supported enterprise demonstrations, integrations, deployments, and solution discussions.",
    ],
    impact: [
      "Multi-agent platform architecture",
      "Enterprise QA automation",
      "Production-scale agent execution",
      "Up to 80% improvement in targeted workflows",
    ],
  },
  {
    title: "AI Engineer",
    company: "Incedo Solutions Ltd",
    period: "2022 — 2024",
    summary:
      "Built the foundational AI and backend capabilities that enabled the first generation of the LLM-powered QA automation platform.",
    contributions: [
      "Developed backend APIs and core services for AI-assisted test generation and workflow automation.",
      "Built requirement-to-test pipelines for converting user stories and acceptance criteria into structured test cases.",
      "Developed initial prompt, parsing, validation, and integration patterns for enterprise LLM workflows.",
      "Contributed to the first production version of IntelliQA and its supporting automation services.",
      "Established reusable foundations for the platform's later multi-agent and multi-module evolution.",
    ],
    impact: [
      "First-generation AI platform",
      "Requirement-to-test automation",
      "Backend and LLM foundations",
      "Reusable platform capabilities",
    ],
  },
];

function RoleBlock({ role, index }: { role: Role; index: number }) {
  return (
    <FadeIn delay={index * 0.12}>
      <div
        className={`relative pl-6 space-y-6 border-l-2 ${
          role.current ? "border-accent" : "border-border"
        }`}
      >
        {/* Timeline dot */}
        <span
          className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ring-4 ring-background ${
            role.current ? "bg-accent" : "bg-border"
          }`}
        />

        {/* Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-display text-xl font-bold text-foreground">
                {role.title}
              </h3>
              {role.current && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent bg-accent/10 border border-accent/25 rounded-full px-2.5 py-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <p className="text-accent font-medium text-sm mt-0.5">{role.company}</p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground shrink-0 sm:mt-1">
            {role.period}
          </span>
        </div>

        {/* Summary */}
        <p className="text-[15px] text-foreground/80 leading-relaxed max-w-3xl">
          {role.summary}
        </p>

        {/* Responsibility areas (lead role) */}
        {role.groups && (
          <Stagger className="grid md:grid-cols-3 gap-4" staggerDelay={0.08}>
            {role.groups.map((group) => (
              <StaggerItem key={group.label}>
                <motion.div
                  className="p-5 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors h-full"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-display font-semibold text-sm text-foreground mb-3">
                    {group.label}
                  </h4>
                  <ul className="space-y-2">
                    {group.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-1.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {/* Key contributions (earlier roles) */}
        {role.contributions && (
          <div>
            <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-[0.2em] mb-4 block">
              Key Contributions
            </span>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {role.contributions.map((point, i) => (
                <li
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0 mt-2" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Impact */}
        <div className="p-4 rounded-lg bg-accent/5 border border-accent/15">
          <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em] mb-2.5 block">
            Impact
          </span>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {role.impact.map((item, i) => (
              <span key={i} className="text-sm text-foreground/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function Experience() {
  return (
    <section id="experience">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <FadeIn>
            <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
              Experience
            </span>
            <h2
              className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-3 leading-tight"
              style={{ letterSpacing: "-0.035em" }}
            >
              From AI Engineering to Product Leadership
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-2xl leading-relaxed">
              A progression from building foundational AI capabilities to
              architecting enterprise platforms and leading their product,
              engineering, and client-facing evolution.
            </p>
          </FadeIn>

          <FadeIn direction="right" className="self-start sm:self-auto shrink-0">
            <ResumeActions variant="desktop" />
          </FadeIn>
        </div>

        {/* Role Blocks */}
        <div className="space-y-16">
          {roles.map((role, index) => (
            <RoleBlock key={role.title} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
