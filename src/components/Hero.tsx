import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  "Multi-Agent Systems in Production",
  "Enterprise AI Platforms (IntelliQA)",
  "LLMOps & Evaluation Pipelines",
  "RAG & Workflow Automation",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[100dvh] relative flex items-center !pt-20 !pb-12 md:!py-0"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Column — Content (takes 3 of 5 cols) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Availability Indicator */}
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for Strategic Roles
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="font-display text-[2.25rem] sm:text-5xl md:text-[3.5rem] lg:text-[3.75rem] font-extrabold text-foreground leading-[1.08] mb-5"
              style={{ letterSpacing: "-0.04em" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              Designing
              <br />
              Production-Grade
              <br className="hidden sm:block" />
              <span className="text-accent"> AI Systems</span>
            </motion.h1>

            {/* Name Line */}
            <motion.div
              className="mb-6 pl-4 border-l-2 border-accent"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
            >
              <span className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Paritosh Sharma
              </span>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              className="text-[15px] md:text-base text-muted-foreground max-w-xl mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26 }}
            >
              I build intelligent systems that move beyond prototypes — from
              multi-agent orchestration to enterprise AI platforms, focused on
              reliability, evaluation, and real-world impact.
            </motion.p>

            {/* Differentiator Line */}
            <motion.p
              className="text-sm text-muted-foreground/70 italic max-w-lg mb-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34 }}
            >
              Focused on solving orchestration, reliability, and scaling
              challenges in real-world AI systems.
            </motion.p>

            {/* Capability Highlights */}
            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
            >
              {capabilities.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-foreground/85"
                >
                  <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>

            {/* Currently Building */}
            <motion.p
              className="text-xs text-muted-foreground/60 mb-8 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Currently building:{" "}
              <span className="text-accent/80 font-medium">Dockrion</span> — a
              framework for AI agent deployment and orchestration
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56 }}
            >
              <a href="#projects" className="btn-primary">
                View Systems
              </a>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right Column — Photo (takes 2 of 5 cols, hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-2 order-1 lg:order-2">
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="w-72 h-80 lg:w-[20rem] lg:h-[24rem] rounded-sm border-[3px] border-accent overflow-hidden shadow-[0_0_40px_8px_rgba(16,185,129,0.08)]">
                  <img
                    src="/profile.jpg"
                    alt="Paritosh Sharma"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </motion.div>
          </div>
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
          y: {
            delay: 1.5,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
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
