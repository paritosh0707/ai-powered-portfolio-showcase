import { ArrowDown, Download, Link, Database, LayoutGrid, Zap } from "lucide-react";
import { motion } from "framer-motion";

const techPills = [
  { icon: Link, label: "LangChain" },
  { icon: Database, label: "RAG" },
  { icon: LayoutGrid, label: "MCP" },
  { icon: Zap, label: "FastAPI" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center py-0"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for Strategic Roles
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-foreground leading-[1.05]"
              style={{ letterSpacing: "-0.04em" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Building the
              <br />
              <span className="text-accent">Future</span> of AI
            </motion.h1>

            <motion.div
              className="mb-6 pl-4 border-l-2 border-accent"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Paritosh Sharma
              </span>
            </motion.div>

            <motion.p
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Lead AI Engineer &amp; Architect | Specializing in Multi-Agent
              Systems, LLMOps &amp; Production AI. Crafting intelligent systems
              that redefine technical possibility.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#projects" className="btn-primary">
                View My Work
              </a>
              <a
                href="/Paritosh_Sharma_Senior_AI_Engineer.pdf"
                download
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
            >
              {techPills.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded border border-border/50 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-accent/40 transition-colors"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Photo Frame */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-[22rem] lg:w-[22rem] lg:h-[26rem] rounded-sm border-[3px] border-accent overflow-hidden shadow-[0_0_40px_8px_rgba(16,185,129,0.12)]">
                <img
                  src="/profile.jpg"
                  alt="Paritosh Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground rounded-sm px-3 py-2 text-center shadow-lg">
                <span className="block text-xl font-bold leading-tight">4+</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider leading-tight">
                  Years Exp
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
            Scroll to Explore
          </span>
          <ArrowDown className="h-4 w-4" />
        </div>
      </motion.a>
    </section>
  );
}
