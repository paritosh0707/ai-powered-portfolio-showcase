import { Download } from "lucide-react";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

type SystemCard = {
  title: string;
  points: string[];
};

type Role = {
  title: string;
  company: string;
  period: string;
  summary: string;
  systems: SystemCard[];
  impact: string[];
};

const roles: Role[] = [
  {
    title: "Senior AI Engineer",
    company: "Incedo Solutions Ltd",
    period: "2024 — Present",
    summary:
      "Leading the design and deployment of enterprise-grade AI systems focused on multi-agent orchestration, QA automation, and intelligent workflow platforms.",
    systems: [
      {
        title: "IntelliQA Platform",
        points: [
          "Multi-agent AI system for QA automation",
          "Covers UI testing, API testing, and data validation",
          "Generates test cases, scripts, and validations",
          "Built using orchestration frameworks like LangGraph",
        ],
      },
      {
        title: "User Story Intelligence System",
        points: [
          "Converts product and business requirements into structured epics and user stories",
          "Multi-agent pipeline with dependency handling and context-aware reasoning",
        ],
      },
      {
        title: "AI Testing & Automation Modules",
        points: [
          "Automated workflows for API testing, UI validation, and data quality checks",
          "Designed for scalability across enterprise environments",
        ],
      },
    ],
    impact: [
      "Improved QA productivity by 80%+",
      "Deployed across multiple enterprise clients",
      "Reduced manual testing effort and increased automation coverage",
    ],
  },
  {
    title: "AI Engineer",
    company: "Incedo Solutions Ltd",
    period: "2022 — 2024",
    summary:
      "Built foundational AI systems and backend infrastructure for LLM-powered QA automation platforms.",
    systems: [
      {
        title: "LLM-based QA Automation Foundation",
        points: [
          "Designed initial architecture for AI-driven test generation",
          "Built backend APIs and core logic for automation workflows",
        ],
      },
      {
        title: "Test Case Generation Engine",
        points: [
          "Automated generation of structured test cases from requirements",
          "Enabled faster and more scalable QA processes",
        ],
      },
    ],
    impact: [
      "Delivered the first version of AI-powered QA platform",
      "Accelerated testing workflows across teams",
      "Established base architecture for future AI systems",
    ],
  },
];

function RoleBlock({ role, index }: { role: Role; index: number }) {
  return (
    <FadeIn delay={index * 0.15}>
      <div className="space-y-6">
        {/* Role Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {role.title}
            </h3>
            <p className="text-accent font-medium text-sm">{role.company}</p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground shrink-0 sm:mt-1">
            {role.period}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
          {role.summary}
        </p>

        {/* Key Systems Built */}
        <div>
          <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-4 block">
            Key Systems Built
          </span>

          <Stagger
            className={`grid gap-4 ${
              role.systems.length === 3
                ? "md:grid-cols-3"
                : "md:grid-cols-2"
            }`}
            staggerDelay={0.08}
          >
            {role.systems.map((sys) => (
              <StaggerItem key={sys.title}>
                <motion.div
                  className="p-4 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors h-full"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <h4 className="font-display font-semibold text-sm text-foreground mb-3">
                    {sys.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {sys.points.map((point, i) => (
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
        </div>

        {/* Impact */}
        <div className="p-4 rounded-lg bg-accent/5 border border-accent/15">
          <span className="text-[10px] font-semibold text-accent uppercase tracking-[0.2em] mb-2 block">
            Impact
          </span>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-1">
            {role.impact.map((item, i) => (
              <span key={i} className="text-sm text-foreground/80">
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
              Where I've Built
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-2xl leading-relaxed">
              A systems-level view of what I have designed, built, and shipped
              in production environments.
            </p>
          </FadeIn>

          <FadeIn direction="right">
            <a
              href="/Paritosh_Sharma_Senior_AI_Engineer.pdf"
              download
              className="btn-outline flex items-center gap-2 self-start sm:self-auto text-sm shrink-0"
            >
              <Download className="h-4 w-4" />
              Full Resume
            </a>
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
