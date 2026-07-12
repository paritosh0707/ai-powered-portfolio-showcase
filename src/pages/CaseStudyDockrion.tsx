import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Helmet } from "react-helmet-async";

const DOCKRION_URL = "https://dockrion.com";

/* ----------------------------------------------------------------------- */
/* Data                                                                     */
/* ----------------------------------------------------------------------- */

const NAV_SECTIONS = [
  { id: "dk-problem", label: "Problem" },
  { id: "dk-contract", label: "Contract" },
  { id: "dk-architecture", label: "Architecture" },
  { id: "dk-evolution", label: "Evolution" },
];

const PROOF = [
  { value: "1", label: "Declarative runtime contract" },
  { value: "4", label: "Architectural layers" },
  { value: "900+", label: "Passing package-level tests" },
  { value: "v0.0.3", label: "Published PyPI alpha" },
];

type LayerState = "built" | "next" | "vision";

const LAYERS: {
  key: string;
  index: string;
  label: string;
  eyebrow: string;
  title: string;
  copy: string;
  question: string;
  items: { t: string; state?: LayerState }[];
}[] = [
  {
    key: "experience",
    index: "01",
    label: "Experience layer",
    eyebrow: "Layer 01 · Interaction",
    title: "Experience layer",
    copy: "A consistent developer surface hides runtime complexity. Teams start with the CLI and SDK; the same contracts can later power a web console.",
    question: "How does a developer or platform team use Dockrion?",
    items: [
      { t: "CLI" },
      { t: "Python SDK" },
      { t: "Developer console", state: "next" },
      { t: "Team portal", state: "vision" },
    ],
  },
  {
    key: "control",
    index: "02",
    label: "Control layer",
    eyebrow: "Layer 02 · Coordination",
    title: "Control layer",
    copy: "This layer turns a Dockfile into lifecycle operations: validation and build today, followed by remote deployment, versions, rollback, and governance.",
    question: "How is an agent moved safely from source to a managed runtime?",
    items: [
      { t: "Validate" },
      { t: "Build" },
      { t: "Deploy", state: "next" },
      { t: "Version", state: "next" },
      { t: "Govern", state: "vision" },
    ],
  },
  {
    key: "runtime",
    index: "03",
    label: "Runtime layer",
    eyebrow: "Layer 03 · Execution",
    title: "Runtime layer",
    copy: "Every agent is exposed through a predictable API envelope with schemas, authentication, policies, streaming events, logs, and metrics.",
    question: "What surrounds agent logic on every invocation?",
    items: [
      { t: "REST API" },
      { t: "Auth" },
      { t: "Policies" },
      { t: "SSE / events" },
      { t: "Metrics" },
    ],
  },
  {
    key: "infrastructure",
    index: "04",
    label: "Infrastructure layer",
    eyebrow: "Layer 04 · Deployment",
    title: "Infrastructure layer",
    copy: "The runtime remains portable across local development and Docker today, with Kubernetes and multi-cloud scheduling forming the platform path.",
    question: "Where and how does the runtime operate?",
    items: [
      { t: "Local process" },
      { t: "Docker" },
      { t: "Kubernetes", state: "next" },
      { t: "Multi-cloud", state: "vision" },
    ],
  },
];

const PERSONAS = [
  {
    n: "P-01",
    title: "Agent engineer",
    copy: "Keep building in Python and the preferred agent framework. Avoid rewriting the same operational wrapper for every project.",
    outcome: "Outcome · Prototype → standardized API",
  },
  {
    n: "P-02",
    title: "Platform engineer",
    copy: "Receive predictable runtime contracts, build artifacts, authentication patterns, telemetry, and deployment boundaries.",
    outcome: "Outcome · Consistency across agent teams",
  },
  {
    n: "P-03",
    title: "AI platform leader",
    copy: "Evolve toward fleet visibility, policy governance, versions, cost attribution, and controlled enterprise adoption.",
    outcome: "Outcome · Governed agent operations",
  },
];

const STAGES: {
  id: "now" | "next" | "future";
  top: string;
  status: string;
  state: LayerState;
  title: string;
  sub: string;
  list: string[];
  foot: string;
}[] = [
  {
    id: "now",
    top: "Runtime framework",
    status: "Built foundation",
    state: "built",
    title: "Single Dock",
    sub: "Turn one agent into a repeatable, secure runtime.",
    list: [
      "Dockfile schema",
      "FastAPI runtime",
      "Auth and policies",
      "Streaming and events",
      "Docker builds",
    ],
    foot: "Current identity · Open-source alpha",
  },
  {
    id: "next",
    top: "Control plane",
    status: "Next platform layer",
    state: "next",
    title: "Fleet Control",
    sub: "Manage deployment and lifecycle across many agent runtimes.",
    list: [
      "Remote controller",
      "Version registry",
      "Rollback",
      "Deployment dashboard",
      "Team-level governance",
    ],
    foot: "Next identity · AgentOps control plane",
  },
  {
    id: "future",
    top: "Federated operations",
    status: "Long-term vision",
    state: "vision",
    title: "Agent Mesh",
    sub: "Operate connected agent workflows across teams and infrastructure.",
    list: [
      "Multi-agent DAGs",
      "Shared state",
      "Cross-agent policies",
      "Multi-cluster routing",
      "Enterprise billing",
    ],
    foot: "Future identity · Federated AgentOps platform",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Declarative over imperative",
    copy: "The Dockfile turns operational behavior into a reproducible contract instead of scattered scripts.",
  },
  {
    n: "02",
    title: "Framework-independent boundary",
    copy: "Agent logic remains portable while the surrounding runtime contract stays consistent.",
  },
  {
    n: "03",
    title: "Control plane ≠ runtime",
    copy: "Lifecycle coordination is separated from latency-sensitive agent invocation.",
  },
  {
    n: "04",
    title: "Guardrails by default",
    copy: "Security, policy, schema and observability are part of the runtime—not optional afterthoughts.",
  },
];

const STAGE_FILTERS = [
  { key: "all", label: "Whole journey" },
  { key: "now", label: "Now" },
  { key: "next", label: "Next" },
  { key: "future", label: "Future" },
];

/* ----------------------------------------------------------------------- */
/* Component                                                                */
/* ----------------------------------------------------------------------- */

export default function CaseStudyDockrion() {
  const navigate = useNavigate();
  const [activeLayer, setActiveLayer] = useState("experience");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [activeSection, setActiveSection] = useState<string>("dk-problem");

  const layer = useMemo(
    () => LAYERS.find((l) => l.key === activeLayer) ?? LAYERS[0],
    [activeLayer]
  );

  // Scroll-spy: highlight the section nearest the top of the viewport.
  useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="dk-root font-body">
      <Helmet>
        <title>Dockrion — Case Study | Paritosh Sharma</title>
        <meta
          name="description"
          content="Case study for Dockrion — a declarative framework that turns agent prototypes into secure, observable production APIs, with a credible path toward an AgentOps control plane."
        />
      </Helmet>

      <style>{DK_CSS}</style>

      {/* Intro / back — aligned to the portfolio grid */}
      <div className="dk-shell pt-28">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </button>
      </div>

      {/* Compact section navigation — part of the portfolio, not a product header */}
      <div className="dk-subnav">
        <div className="dk-shell dk-subnav-inner">
          <span className="dk-subnav-label">Dockrion · Case study</span>
          <nav className="dk-navlinks" aria-label="Case study sections">
            {NAV_SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                className="dk-navlink"
                aria-current={activeSection === s.id}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="dk-shell">
        {/* Hero */}
        <header className="dk-hero">
          <div>
            <div className="dk-kicker">
              <span className="dk-kicker-dot" />
              Open-source agent infrastructure · Alpha
            </div>
            <h1 className="font-display">
              From agent prototype to{" "}
              <span className="dk-gradient-text">production API.</span>
            </h1>
            <p className="dk-lead">
              Dockrion standardizes everything around agent logic—runtime,
              security, streaming, policy, observability, and deployment—through
              one declarative Dockfile.
            </p>
            <div className="dk-hero-actions">
              <a
                href={DOCKRION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="dk-action dk-action-primary"
              >
                Visit dockrion.com
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                className="dk-action"
                onClick={() => scrollTo("dk-architecture")}
              >
                Explore the system
              </button>
              <button
                type="button"
                className="dk-action"
                onClick={() => scrollTo("dk-evolution")}
              >
                See the roadmap
              </button>
            </div>
          </div>

          <div className="dk-terminal" aria-label="Dockrion workflow example">
            <div className="dk-terminal-bar">
              <div className="dk-dots">
                <span className="dk-dot" />
                <span className="dk-dot" />
                <span className="dk-dot" />
              </div>
              <span>Dockfile.yaml → runtime</span>
            </div>
            <pre className="dk-code font-mono">
              <code>
                <span className="dk-code-line dk-code-dim"># define the operational contract</span>
                <span className="dk-code-line"><span className="dk-code-key">agent:</span> <span className="dk-code-val">support-copilot</span></span>
                <span className="dk-code-line"><span className="dk-code-key">entrypoint:</span> app.graph:build</span>
                <span className="dk-code-line"><span className="dk-code-key">framework:</span> langgraph</span>
                <span className="dk-code-line"><span className="dk-code-key">auth:</span> jwt</span>
                <span className="dk-code-line"><span className="dk-code-key">streaming:</span> sse</span>
                <span className="dk-code-line"><span className="dk-code-key">policies:</span> [redact, tool-gate]</span>
                <span className="dk-code-line"> </span>
                <span className="dk-code-line dk-code-command">$ dockrion validate</span>
                <span className="dk-code-line dk-code-success">✓ Dockfile contract valid</span>
                <span className="dk-code-line dk-code-command">$ dockrion run</span>
                <span className="dk-code-line dk-code-success">✓ Agent API ready on :8080</span>
              </code>
            </pre>
          </div>
        </header>

        {/* Proof points */}
        <section className="dk-proof-grid" aria-label="Project proof points">
          {PROOF.map((p) => (
            <div className="dk-proof" key={p.label}>
              <div className="dk-proof-value font-display">{p.value}</div>
              <div className="dk-proof-label">{p.label}</div>
            </div>
          ))}
        </section>

        {/* 01 — Problem */}
        <section id="dk-problem" className="dk-section">
          <div className="dk-section-head">
            <div className="dk-section-index">01 · The infrastructure gap</div>
            <div>
              <h2 className="font-display">Agent logic is only one piece of production.</h2>
              <p className="dk-section-copy">
                Teams can build capable agents quickly, but each prototype still
                needs an API layer, authentication, schema validation, policies,
                streaming, observability, containers, and deployment automation.
              </p>
            </div>
          </div>

          <div className="dk-before-after">
            <article className="dk-world">
              <div className="dk-world-label">
                <span>Before</span>
                <span>Fragmented ownership</span>
              </div>
              <h3 className="dk-world-title font-display">
                Every agent becomes an infrastructure project.
              </h3>
              <div className="dk-chaos-map" aria-label="Fragmented agent infrastructure">
                <svg viewBox="0 0 400 290" role="img" aria-label="A web of disconnected operational concerns">
                  <path
                    d="M75 45 L184 138 L331 43 M75 45 L64 244 M184 138 L339 142 M184 138 L330 245 M64 244 L330 245 M331 43 L339 142"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="5 5"
                  />
                </svg>
                {["FastAPI wrapper", "Authentication", "Agent code", "Docker setup", "Metrics & logs", "Streaming"].map(
                  (n) => (
                    <div className="dk-chaos-node" key={n}>
                      {n}
                    </div>
                  )
                )}
              </div>
            </article>

            <div className="dk-transform-arrow" aria-hidden="true">
              <span>→</span>
            </div>

            <article className="dk-world">
              <div className="dk-world-label">
                <span>With Dockrion</span>
                <span>One standard path</span>
              </div>
              <h3 className="dk-world-title font-display">
                Agent engineering stays focused on the agent.
              </h3>
              <div className="dk-after-map">
                <div className="dk-flow-node">Agent code</div>
                <div className="dk-arrow-down" />
                <div className="dk-flow-node dk-core">Dockfile + Dockrion</div>
                <div className="dk-arrow-down" />
                <div className="dk-flow-node">Secure, observable agent API</div>
              </div>
            </article>
          </div>
        </section>

        {/* 02 — Contract */}
        <section id="dk-contract" className="dk-section">
          <div className="dk-section-head">
            <div className="dk-section-index">02 · The product insight</div>
            <div>
              <h2 className="font-display">
                The Dockfile is more than configuration. It is the operational
                contract.
              </h2>
              <p className="dk-section-copy">
                One portable specification connects agent code to a repeatable
                runtime. The contract makes security, interfaces, behavior, and
                deployment intent explicit instead of burying them across scripts.
              </p>
            </div>
          </div>

          <div className="dk-contract">
            <div className="dk-contract-side" aria-label="Inputs to the Dockfile contract">
              {["Agent entrypoint", "Input / output schema", "Runtime arguments", "Required secrets"].map((c) => (
                <div className="dk-contract-chip" key={c}>
                  {c}
                </div>
              ))}
            </div>

            <article className="dk-dockfile">
              <span className="dk-dockfile-tag">Single source of operational truth</span>
              <h3 className="font-display">Dockfile.yaml</h3>
              <p>
                Validated once. Consumed across local development, generated
                runtimes, containers, and the future control plane.
              </p>
              <div className="dk-contract-code font-mono" aria-label="Dockfile example">
                <span><span className="dk-code-key">version:</span> "1.0"</span>
                <span><span className="dk-code-key">agent:</span> {"{ framework, entrypoint }"}</span>
                <span><span className="dk-code-key">io_schema:</span> {"{ input, output }"}</span>
                <span><span className="dk-code-key">auth:</span> {"{ api_key, jwt }"}</span>
                <span><span className="dk-code-key">policies:</span> {"{ redact, tools }"}</span>
                <span><span className="dk-code-key">streaming:</span> {"{ sse, events }"}</span>
                <span><span className="dk-code-key">observability:</span> {"{ logs, metrics }"}</span>
              </div>
            </article>

            <div className="dk-contract-side" aria-label="Outputs from the Dockfile contract">
              {["Generated FastAPI runtime", "OpenAPI documentation", "Docker image", "Governed invocation"].map((c) => (
                <div className="dk-contract-chip" key={c}>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — Architecture */}
        <section id="dk-architecture" className="dk-section">
          <div className="dk-section-head">
            <div className="dk-section-index">03 · Layered architecture</div>
            <div>
              <h2 className="font-display">
                A runtime framework today. A control plane by design.
              </h2>
              <p className="dk-section-copy">
                The architecture separates how teams interact, how lifecycle
                operations are coordinated, how each agent runs, and where
                workloads are deployed. Select a layer to explore its role.
              </p>
            </div>
          </div>

          <div className="dk-architecture-wrap">
            <div className="dk-architecture">
              <div className="dk-architecture-title">
                <span className="dk-system-name">Dockrion system boundary</span>
                <div className="dk-legend" aria-label="Capability status legend">
                  <span className="dk-legend-item">
                    <span className="dk-legend-mark built" />Built
                  </span>
                  <span className="dk-legend-item">
                    <span className="dk-legend-mark next" />Next
                  </span>
                  <span className="dk-legend-item">
                    <span className="dk-legend-mark vision" />Vision
                  </span>
                </div>
              </div>

              <div className="dk-layer-stack">
                {LAYERS.map((l) => (
                  <button
                    key={l.key}
                    type="button"
                    className="dk-layer"
                    aria-pressed={activeLayer === l.key}
                    onClick={() => setActiveLayer(l.key)}
                  >
                    <span className="dk-layer-main">
                      <span className="dk-layer-label">
                        <span className="dk-layer-index">{l.index}</span>
                        {l.label}
                      </span>
                      <span className="dk-layer-items">
                        {l.items.map((it) => (
                          <span
                            className="dk-layer-item"
                            data-state={it.state ?? "built"}
                            key={it.t}
                          >
                            {it.t}
                          </span>
                        ))}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <aside className="dk-layer-detail" aria-live="polite">
              <div>
                <div className="dk-detail-eyebrow">{layer.eyebrow}</div>
                <h3 className="font-display">{layer.title}</h3>
                <p>{layer.copy}</p>
              </div>
              <div className="dk-detail-question">
                <strong>Question this layer answers</strong>
                {layer.question}
              </div>
            </aside>
          </div>
        </section>

        {/* 04 — Personas */}
        <section className="dk-section">
          <div className="dk-section-head">
            <div className="dk-section-index">04 · Three perspectives</div>
            <div>
              <h2 className="font-display">
                One platform idea, different value at every altitude.
              </h2>
              <p className="dk-section-copy">
                The case study stays accessible to product leaders while revealing
                enough architectural depth for engineers and interviewers.
              </p>
            </div>
          </div>

          <div className="dk-persona-grid">
            {PERSONAS.map((p) => (
              <article className="dk-persona" key={p.n}>
                <div className="dk-persona-number font-mono">{p.n}</div>
                <h3 className="font-display">{p.title}</h3>
                <p>{p.copy}</p>
                <div className="dk-persona-outcome">{p.outcome}</div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 — Evolution */}
        <section id="dk-evolution" className="dk-section">
          <div className="dk-section-head">
            <div className="dk-section-index">05 · Product evolution</div>
            <div>
              <h2 className="font-display">
                The whole vision—without pretending it is all built.
              </h2>
              <p className="dk-section-copy">
                Dockrion deliberately progresses from a strong single-agent runtime
                into deployment control and, eventually, federated AgentOps. Filter
                the roadmap to focus each stage.
              </p>
            </div>
          </div>

          <div className="dk-evolution-controls" aria-label="Roadmap stage filter">
            {STAGE_FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className="dk-stage-button"
                aria-pressed={stageFilter === f.key}
                onClick={() => setStageFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="dk-evolution">
            {STAGES.map((s) => {
              const active = stageFilter === "all" || stageFilter === s.id;
              const cls = [
                "dk-stage",
                `dk-stage-${s.state}`,
                !active ? "is-muted" : "",
                stageFilter !== "all" && active ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <article className={cls} key={s.id} data-state={s.state}>
                  <div className="dk-stage-top">
                    <span>{s.top}</span>
                    <span className="dk-stage-status">{s.status}</span>
                  </div>
                  <h3 className="font-display">{s.title}</h3>
                  <div className="dk-stage-sub">{s.sub}</div>
                  <div className="dk-stage-list">
                    {s.list.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="dk-stage-foot">{s.foot}</div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 06 — Principles */}
        <section className="dk-section">
          <div className="dk-section-head">
            <div className="dk-section-index">06 · Architectural judgement</div>
            <div>
              <h2 className="font-display">
                The case study is about decisions, not package names.
              </h2>
              <p className="dk-section-copy">
                These four principles reveal the senior engineering thinking behind
                Dockrion while keeping the story legible to non-specialists.
              </p>
            </div>
          </div>

          <div className="dk-principles">
            {PRINCIPLES.map((p) => (
              <article className="dk-principle" key={p.n}>
                <span className="font-mono">{p.n}</span>
                <h3 className="font-display">{p.title}</h3>
                <p>{p.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Closing thesis */}
        <section className="dk-closing">
          <div>
            <div className="dk-section-index">The thesis</div>
            <h2 className="font-display">
              Dockrion is the operational layer around agent intelligence.
            </h2>
            <p>
              Today it packages agents into consistent runtimes. Its architecture
              creates a credible path toward deploying, governing, versioning, and
              observing agent fleets.
            </p>
            <div className="dk-closing-actions">
              <a
                href={DOCKRION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary gap-2"
              >
                Visit dockrion.com
                <ExternalLink className="h-4 w-4" />
              </a>
              <Link to="/" className="btn-outline gap-2">
                Back to Portfolio
              </Link>
            </div>
          </div>
          <div className="dk-closing-stack" aria-label="Dockrion value chain">
            <div className="dk-closing-item"><span>Agent logic</span><span>Build freely</span></div>
            <div className="dk-closing-item"><span>Operational contract</span><span>Define once</span></div>
            <div className="dk-closing-item"><span>Runtime</span><span>Standardize</span></div>
            <div className="dk-closing-item"><span>Control plane</span><span>Scale safely</span></div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Scoped styles — portfolio tokens as the base, Dockrion navy/blue/purple  */
/* retained for technical surfaces. Mint (--accent) is the primary accent.  */
/* ----------------------------------------------------------------------- */

const DK_CSS = `
.dk-root {
  --dk-mint: hsl(var(--accent));
  --dk-blue: #3b82f6;
  --dk-cyan: #38bdf8;
  --dk-purple: #a855f7;
  --dk-navy: #0b1220;
  --dk-navy-2: #0f172a;
  --dk-navy-line: rgba(148, 163, 184, .16);
  --dk-navy-text: #e5edf6;
  --dk-navy-muted: #93a4bd;
  color: hsl(var(--foreground));
  position: relative;
  overflow-x: clip;
}
.dk-root * { box-sizing: border-box; }

.dk-shell {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
@media (min-width: 640px) { .dk-shell { padding-left: 1.5rem; padding-right: 1.5rem; } }
@media (min-width: 1024px) { .dk-shell { padding-left: 2rem; padding-right: 2rem; } }

.dk-root :focus-visible {
  outline: 2px solid hsl(var(--accent));
  outline-offset: 2px;
  border-radius: 10px;
}

/* Section navigation — compact, portfolio-native */
.dk-subnav {
  position: sticky;
  top: 4rem;
  z-index: 30;
  background: hsl(var(--background) / .82);
  backdrop-filter: blur(14px);
  border-top: 1px solid hsl(var(--border));
  border-bottom: 1px solid hsl(var(--border));
}
.dk-subnav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.dk-subnav-label {
  font-size: 11px;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
  white-space: nowrap;
}
.dk-navlinks { display: flex; gap: 4px; flex-wrap: wrap; justify-content: flex-end; }
.dk-navlink {
  border: 0;
  background: transparent;
  color: hsl(var(--muted-foreground));
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  min-height: 40px;
  transition: color .2s ease, background .2s ease;
}
.dk-navlink:hover { color: hsl(var(--foreground)); background: hsl(var(--muted)); }
.dk-navlink[aria-current="true"] {
  color: hsl(var(--accent-foreground));
  background: hsl(var(--accent));
}

/* Hero */
.dk-hero {
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  align-items: center;
  gap: 42px;
  padding: 40px 0 20px;
}
.dk-kicker {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 7px 12px;
  border: 1px solid hsl(var(--accent) / .35);
  border-radius: 999px;
  color: hsl(var(--foreground));
  background: hsl(var(--accent) / .08);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.dk-kicker-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--dk-mint);
  box-shadow: 0 0 0 4px hsl(var(--accent) / .18);
}
.dk-hero h1 {
  margin: 22px 0 20px;
  max-width: 760px;
  font-size: clamp(38px, 6.4vw, 76px);
  line-height: 1;
  letter-spacing: -.045em;
  font-weight: 800;
}
.dk-gradient-text {
  background: linear-gradient(110deg, hsl(var(--foreground)) 8%, var(--dk-mint) 52%, var(--dk-blue));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
.dk-lead {
  max-width: 650px;
  margin: 0;
  color: hsl(var(--foreground) / .78);
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.6;
}
.dk-hero-actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 28px; }
.dk-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid hsl(var(--border));
  border-radius: 12px;
  padding: 11px 16px;
  min-height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: hsl(var(--foreground));
  background: hsl(var(--card));
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, transform .2s ease;
}
.dk-action:hover { transform: translateY(-1px); border-color: hsl(var(--accent) / .5); }
.dk-action-primary {
  color: hsl(var(--accent-foreground));
  background: hsl(var(--accent));
  border-color: hsl(var(--accent));
}
.dk-action-primary:hover { filter: brightness(1.08); border-color: hsl(var(--accent)); }

/* Terminal — deep navy technical surface */
.dk-terminal {
  position: relative;
  border: 1px solid var(--dk-navy-line);
  border-radius: 20px;
  padding: 16px;
  background: var(--dk-navy);
  box-shadow: 0 28px 80px rgb(2 6 23 / .35);
}
.dk-terminal::before {
  content: "";
  position: absolute;
  inset: -16px;
  z-index: -1;
  border-radius: 28px;
  background:
    linear-gradient(90deg, hsl(var(--accent) / .10) 1px, transparent 1px),
    linear-gradient(hsl(var(--accent) / .10) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent);
}
.dk-terminal-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 2px 2px 14px;
  color: var(--dk-navy-muted);
  font-size: 12px;
}
.dk-dots { display: flex; gap: 6px; }
.dk-dot { width: 9px; height: 9px; border-radius: 50%; }
.dk-dot:nth-child(1) { background: var(--dk-purple); }
.dk-dot:nth-child(2) { background: var(--dk-blue); }
.dk-dot:nth-child(3) { background: var(--dk-mint); }
.dk-code {
  margin: 0;
  padding: 18px;
  min-height: 310px;
  border-radius: 14px;
  background: var(--dk-navy-2);
  color: var(--dk-navy-text);
  font-size: 13px;
  line-height: 1.75;
  overflow-x: auto;
}
.dk-code-line { display: block; white-space: pre-wrap; }
.dk-code-dim { color: var(--dk-navy-muted); }
.dk-code-key { color: var(--dk-cyan); }
.dk-code-val { color: var(--dk-mint); }
.dk-code-command { color: var(--dk-navy-text); }
.dk-code-success { color: var(--dk-mint); }

/* Proof */
.dk-proof-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid hsl(var(--border));
  border-bottom: 1px solid hsl(var(--border));
  margin: 34px 0 8px;
}
.dk-proof { padding: 24px 18px; border-right: 1px solid hsl(var(--border)); }
.dk-proof:last-child { border-right: 0; }
.dk-proof-value { font-size: clamp(23px, 4vw, 34px); letter-spacing: -.04em; font-weight: 800; }
.dk-proof-label { margin-top: 7px; color: hsl(var(--muted-foreground)); font-size: 12px; }

/* Sections — separated by spacing + subtle borders, no big card */
.dk-section { padding: 64px 0; border-top: 1px solid hsl(var(--border)); scroll-margin-top: 128px; }
.dk-section-head {
  display: grid;
  grid-template-columns: .38fr .62fr;
  gap: 34px;
  margin-bottom: 42px;
}
.dk-section-index {
  color: var(--dk-mint);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.dk-section h2 { margin: 0; font-size: clamp(28px, 4.4vw, 50px); line-height: 1.06; letter-spacing: -.035em; font-weight: 800; }
.dk-section-copy { margin: 16px 0 0; max-width: 700px; color: hsl(var(--foreground) / .72); font-size: 16px; line-height: 1.65; }

/* Before / after */
.dk-before-after { display: grid; grid-template-columns: 1fr 78px 1fr; align-items: stretch; gap: 16px; }
.dk-world {
  position: relative;
  min-height: 430px;
  padding: 24px;
  border: 1px solid hsl(var(--border));
  border-radius: 20px;
  background: hsl(var(--card));
  overflow: hidden;
}
.dk-world-label { display: flex; justify-content: space-between; gap: 12px; color: hsl(var(--muted-foreground)); font-size: 12px; text-transform: uppercase; letter-spacing: .09em; }
.dk-world-title { margin: 10px 0 0; font-size: 22px; letter-spacing: -.025em; font-weight: 700; }
.dk-chaos-map { position: relative; height: 310px; margin-top: 18px; }
.dk-chaos-map svg { position: absolute; inset: 0; width: 100%; height: 100%; color: hsl(var(--border)); }
.dk-chaos-node {
  position: absolute;
  display: grid; place-items: center;
  min-width: 82px; min-height: 42px;
  padding: 8px 10px;
  border: 1px solid hsl(var(--border));
  border-radius: 10px;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 11px; text-align: center;
}
.dk-chaos-node:nth-of-type(1) { left: 4%; top: 8%; }
.dk-chaos-node:nth-of-type(2) { right: 4%; top: 6%; }
.dk-chaos-node:nth-of-type(3) { left: 34%; top: 40%; }
.dk-chaos-node:nth-of-type(4) { left: 3%; bottom: 9%; }
.dk-chaos-node:nth-of-type(5) { right: 4%; bottom: 10%; }
.dk-chaos-node:nth-of-type(6) { right: 9%; top: 43%; }
.dk-after-map { display: grid; align-content: center; height: 310px; margin-top: 18px; gap: 0; }
.dk-flow-node { padding: 14px 16px; border: 1px solid hsl(var(--border)); border-radius: 12px; background: hsl(var(--background)); text-align: center; font-size: 13px; }
.dk-flow-node.dk-core {
  border-color: hsl(var(--accent) / .55);
  background: hsl(var(--accent) / .12);
  box-shadow: 0 12px 35px hsl(var(--accent) / .16);
  font-weight: 600;
}
.dk-arrow-down { height: 25px; width: 2px; margin: 0 auto; background: linear-gradient(hsl(var(--border)), var(--dk-mint)); position: relative; }
.dk-arrow-down::after { content: ""; position: absolute; bottom: -1px; left: -3px; width: 7px; height: 7px; border-right: 2px solid var(--dk-mint); border-bottom: 2px solid var(--dk-mint); transform: rotate(45deg); }
.dk-transform-arrow { display: grid; place-items: center; color: var(--dk-mint); font-size: 24px; }
.dk-transform-arrow span { width: 48px; height: 48px; display: grid; place-items: center; border: 1px solid hsl(var(--accent) / .4); border-radius: 50%; background: hsl(var(--card)); }

/* Contract */
.dk-contract { display: grid; grid-template-columns: .75fr 1.1fr .75fr; gap: 22px; align-items: center; }
.dk-contract-side { display: grid; gap: 12px; }
.dk-contract-chip { padding: 13px 14px; border: 1px solid hsl(var(--border)); border-radius: 11px; background: hsl(var(--card)); font-size: 12px; }
.dk-dockfile {
  position: relative;
  min-height: 430px;
  padding: 24px;
  border: 1px solid var(--dk-navy-line);
  border-radius: 22px;
  background: var(--dk-navy);
  color: var(--dk-navy-text);
  box-shadow: 0 24px 70px rgb(2 6 23 / .3);
}
.dk-dockfile-tag { display: inline-flex; padding: 6px 10px; border-radius: 999px; background: hsl(var(--accent) / .16); color: var(--dk-mint); font-size: 11px; font-weight: 600; }
.dk-dockfile h3 { margin: 18px 0 8px; font-size: 28px; letter-spacing: -.035em; font-weight: 700; color: var(--dk-navy-text); }
.dk-dockfile p { margin: 0 0 20px; color: var(--dk-navy-muted); line-height: 1.55; }
.dk-contract-code { padding: 16px; border-radius: 13px; background: var(--dk-navy-2); font-size: 12px; line-height: 1.7; }
.dk-contract-code span { display: block; color: var(--dk-navy-text); }

/* Architecture — navy technical surface + interactive layers */
.dk-architecture-wrap { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 20px; align-items: stretch; }
.dk-architecture {
  position: relative;
  padding: 26px;
  border: 1px solid var(--dk-navy-line);
  border-radius: 22px;
  background:
    linear-gradient(90deg, rgba(148,163,184,.10) 1px, transparent 1px),
    linear-gradient(rgba(148,163,184,.10) 1px, transparent 1px),
    var(--dk-navy);
  background-size: 30px 30px, 30px 30px, auto;
  color: var(--dk-navy-text);
}
.dk-architecture-title { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
.dk-system-name { font-size: 13px; letter-spacing: .1em; text-transform: uppercase; color: var(--dk-navy-muted); }
.dk-legend { display: flex; gap: 14px; flex-wrap: wrap; color: var(--dk-navy-muted); font-size: 10.5px; }
.dk-legend-item { display: inline-flex; align-items: center; gap: 6px; }
.dk-legend-mark { width: 9px; height: 9px; border-radius: 50%; }
.dk-legend-mark.built { background: var(--dk-mint); }
.dk-legend-mark.next { background: transparent; border: 1.5px solid var(--dk-blue); }
.dk-legend-mark.vision { background: transparent; border: 1.5px dashed var(--dk-purple); }

.dk-layer-stack { display: grid; gap: 11px; }
.dk-layer {
  width: 100%; padding: 0;
  border: 1px solid var(--dk-navy-line);
  border-radius: 16px;
  background: rgba(255,255,255,.02);
  color: var(--dk-navy-text);
  text-align: left; cursor: pointer; overflow: hidden;
  transition: border-color .2s ease, transform .2s ease, background .2s ease;
}
.dk-layer:hover { transform: translateY(-1px); border-color: hsl(var(--accent) / .5); }
.dk-layer[aria-pressed="true"] { border-color: var(--dk-mint); background: hsl(var(--accent) / .12); box-shadow: inset 3px 0 0 var(--dk-mint); }
.dk-layer-main { display: grid; grid-template-columns: 160px 1fr; gap: 16px; align-items: center; padding: 17px; }
.dk-layer-label { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; }
.dk-layer-index { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 8px; color: hsl(var(--accent-foreground)); background: var(--dk-mint); font-size: 10px; font-weight: 700; }
.dk-layer[aria-pressed="true"] .dk-layer-index { box-shadow: 0 0 0 3px hsl(var(--accent) / .25); }
.dk-layer-items { display: flex; gap: 7px; flex-wrap: wrap; }
.dk-layer-item { padding: 7px 9px; border: 1px solid var(--dk-navy-line); border-radius: 8px; background: rgba(255,255,255,.03); font-size: 10.5px; }
.dk-layer-item[data-state="built"] { border-color: hsl(var(--accent) / .45); }
.dk-layer-item[data-state="next"] { background: transparent; border-color: var(--dk-blue); color: #bcd4ff; }
.dk-layer-item[data-state="vision"] { background: transparent; border-style: dashed; border-color: var(--dk-purple); color: #dcc7ff; }

.dk-layer-detail {
  display: grid; align-content: space-between; min-height: 100%;
  padding: 24px;
  border: 1px solid hsl(var(--accent) / .35);
  border-radius: 22px;
  background: hsl(var(--accent) / .08);
}
.dk-detail-eyebrow { color: var(--dk-mint); font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
.dk-layer-detail h3 { margin: 16px 0 11px; font-size: 26px; letter-spacing: -.035em; font-weight: 700; }
.dk-layer-detail p { margin: 0; color: hsl(var(--foreground) / .75); line-height: 1.6; }
.dk-detail-question { margin-top: 28px; padding-top: 18px; border-top: 1px solid hsl(var(--border)); font-size: 12px; color: hsl(var(--muted-foreground)); }
.dk-detail-question strong { display: block; margin-bottom: 6px; color: hsl(var(--foreground)); font-weight: 600; }

/* Personas */
.dk-persona-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.dk-persona { min-height: 250px; padding: 22px; border: 1px solid hsl(var(--border)); border-radius: 18px; background: hsl(var(--card)); }
.dk-persona-number { color: var(--dk-mint); font-size: 12px; font-weight: 600; }
.dk-persona h3 { margin: 40px 0 12px; font-size: 22px; letter-spacing: -.03em; font-weight: 700; }
.dk-persona p { margin: 0; color: hsl(var(--foreground) / .74); line-height: 1.6; }
.dk-persona-outcome { margin-top: 24px; padding-top: 16px; border-top: 1px solid hsl(var(--border)); font-size: 12px; color: hsl(var(--muted-foreground)); }

/* Evolution / roadmap */
.dk-evolution-controls { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.dk-stage-button { padding: 9px 15px; min-height: 40px; border: 1px solid hsl(var(--border)); border-radius: 999px; background: hsl(var(--card)); color: hsl(var(--foreground)); font-size: 13px; font-weight: 500; cursor: pointer; transition: all .2s ease; }
.dk-stage-button:hover { border-color: hsl(var(--accent) / .5); }
.dk-stage-button[aria-pressed="true"] { background: hsl(var(--accent)); color: hsl(var(--accent-foreground)); border-color: hsl(var(--accent)); }
.dk-evolution { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid hsl(var(--border)); border-radius: 22px; overflow: hidden; background: hsl(var(--card)); }
.dk-stage { position: relative; min-height: 440px; padding: 26px; border-right: 1px solid hsl(var(--border)); transition: background .2s ease, opacity .2s ease; }
.dk-stage:last-child { border-right: 0; }
.dk-stage.is-muted { opacity: .34; }
.dk-stage.is-active.dk-stage-built { background: hsl(var(--accent) / .09); }
.dk-stage.is-active.dk-stage-next { background: rgb(59 130 246 / .09); }
.dk-stage.is-active.dk-stage-future { background: rgb(168 85 247 / .09); }
.dk-stage-top { display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.dk-stage-top > span:first-child { font-size: 13px; color: hsl(var(--muted-foreground)); }
.dk-stage-status { padding: 5px 9px; border-radius: 999px; font-size: 10px; font-weight: 600; white-space: nowrap; }
.dk-stage-built .dk-stage-status { background: hsl(var(--accent)); color: hsl(var(--accent-foreground)); }
.dk-stage-next .dk-stage-status { background: transparent; border: 1.5px solid var(--dk-blue); color: var(--dk-blue); }
.dk-stage-future .dk-stage-status { background: transparent; border: 1.5px dashed var(--dk-purple); color: var(--dk-purple); }
.dk-stage h3 { margin: 44px 0 10px; font-size: 28px; letter-spacing: -.04em; font-weight: 800; }
.dk-stage-sub { color: hsl(var(--foreground) / .7); min-height: 46px; line-height: 1.5; font-size: 14px; }
.dk-stage-list { display: grid; gap: 10px; margin-top: 26px; }
.dk-stage-list span { display: flex; align-items: center; gap: 9px; font-size: 12px; }
.dk-stage-list span::before { content: ""; width: 6px; height: 6px; border-radius: 50%; flex: 0 0 auto; }
.dk-stage-built .dk-stage-list span::before { background: var(--dk-mint); }
.dk-stage-next .dk-stage-list span::before { background: var(--dk-blue); }
.dk-stage-future .dk-stage-list span::before { background: transparent; border: 1.5px dashed var(--dk-purple); }
.dk-stage-foot { position: absolute; left: 26px; right: 26px; bottom: 24px; padding-top: 15px; border-top: 1px solid hsl(var(--border)); color: hsl(var(--muted-foreground)); font-size: 11px; }

/* Principles */
.dk-principles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.dk-principle { padding: 20px; border-top: 2px solid var(--dk-mint); background: hsl(var(--card)); border-radius: 0 0 12px 12px; }
.dk-principle:nth-child(2) { border-color: var(--dk-blue); }
.dk-principle:nth-child(3) { border-color: var(--dk-cyan); }
.dk-principle:nth-child(4) { border-color: var(--dk-purple); }
.dk-principle span { color: hsl(var(--muted-foreground)); font-size: 12px; }
.dk-principle h3 { margin: 22px 0 10px; font-size: 16px; font-weight: 700; letter-spacing: -.01em; }
.dk-principle p { margin: 0; color: hsl(var(--foreground) / .72); font-size: 12.5px; line-height: 1.6; }

/* Closing */
.dk-closing {
  display: grid; grid-template-columns: 1.2fr .8fr; gap: 36px; align-items: end;
  padding: 56px; margin: 64px 0 40px;
  border: 1px solid hsl(var(--accent) / .3);
  border-radius: 24px;
  background:
    radial-gradient(circle at 86% 20%, hsl(var(--accent) / .14), transparent 34%),
    hsl(var(--card));
}
.dk-closing h2 { font-size: clamp(30px, 4.4vw, 52px); font-weight: 800; letter-spacing: -.035em; margin: 14px 0 0; }
.dk-closing p { margin: 18px 0 0; color: hsl(var(--foreground) / .74); font-size: 16px; line-height: 1.6; }
.dk-closing-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.dk-closing-stack { display: grid; gap: 9px; }
.dk-closing-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 15px; border: 1px solid hsl(var(--border)); border-radius: 11px; background: hsl(var(--background) / .6); font-size: 12px; }
.dk-closing-item span:last-child { color: var(--dk-mint); font-weight: 600; }

/* Responsive */
@media (max-width: 900px) {
  .dk-hero, .dk-section-head, .dk-architecture-wrap, .dk-closing { grid-template-columns: 1fr; }
  .dk-hero { padding-top: 20px; gap: 32px; }
  .dk-closing { align-items: start; }
  .dk-proof-grid { grid-template-columns: repeat(2, 1fr); }
  .dk-proof:nth-child(2) { border-right: 0; }
  .dk-proof:nth-child(-n+2) { border-bottom: 1px solid hsl(var(--border)); }
  .dk-persona-grid { grid-template-columns: 1fr; }
  .dk-persona { min-height: 0; }
  .dk-persona h3 { margin-top: 22px; }
  .dk-principles { grid-template-columns: repeat(2, 1fr); }
  .dk-contract { grid-template-columns: 1fr; }
  .dk-contract-side { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 680px) {
  .dk-subnav-label { display: none; }
  .dk-subnav-inner { justify-content: center; }
  .dk-navlinks { justify-content: center; }
  .dk-before-after { grid-template-columns: 1fr; }
  .dk-transform-arrow { transform: rotate(90deg); padding: 4px 0; }
  .dk-transform-arrow span { width: 42px; height: 42px; }
  .dk-world { min-height: 380px; }
  .dk-layer-main { grid-template-columns: 1fr; gap: 12px; }
  .dk-evolution { grid-template-columns: 1fr; }
  .dk-stage { min-height: 0; border-right: 0; border-bottom: 1px solid hsl(var(--border)); padding-bottom: 78px; }
  .dk-stage:last-child { border-bottom: 0; }
  .dk-principles { grid-template-columns: 1fr; }
  .dk-closing { padding: 30px 22px; }
  .dk-section { padding: 48px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .dk-layer, .dk-stage, .dk-action, .dk-navlink, .dk-stage-button { transition: none; }
}
`;
