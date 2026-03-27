import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Linkedin,
  Github,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  LayoutGrid,
  Mic,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FadeIn, Stagger, StaggerItem, motion } from "@/components/ui/motion";

const CONTACT_EMAIL = "paritoshsharma072000@gmail.com";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  lookingFor: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const engagementCards = [
  {
    icon: Briefcase,
    title: "Work With Me",
    desc: "For companies building AI products or platforms.",
  },
  {
    icon: LayoutGrid,
    title: "Consulting & Architecture",
    desc: "For designing LLM systems, RAG pipelines, and agent workflows.",
  },
  {
    icon: Mic,
    title: "Speaking / Knowledge Sharing",
    desc: "For sessions on AI systems, LLMOps, and multi-agent architectures.",
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/paritosh-sharma-74b4ba17a/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "https://github.com/paritosh0707",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    icon: Twitter,
  },
];

const lookingForOptions = [
  "Work Together",
  "Consulting",
  "Speaking",
  "Other",
];

export default function Contact() {
  const { toast } = useToast();
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      lookingFor: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("submitting");

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: data.lookingFor
            ? `Portfolio Inquiry: ${data.lookingFor}`
            : "Portfolio Contact Form",
          from_name: data.name,
          email: data.email,
          looking_for: data.lookingFor || "Not specified",
          message: data.message,
          botcheck: "",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitState("success");
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        reset();
        setTimeout(() => setSubmitState("idle"), 2500);
      } else {
        setSubmitState("idle");
        toast({
          title: "Failed to send",
          description:
            "Something went wrong. Please try again or email me directly.",
          variant: "destructive",
        });
      }
    } catch {
      setSubmitState("idle");
      toast({
        title: "Network error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <FadeIn>
          <span className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-5 block">
            Get In Touch
          </span>
          <h2
            className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-foreground mb-4 leading-tight"
            style={{ letterSpacing: "-0.035em" }}
          >
            Let's Build AI Systems
            <br className="hidden sm:block" />
            <span className="text-accent"> That Matter</span>
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            I work on production-grade AI systems, multi-agent platforms, and
            enterprise automation solutions.
          </p>
        </FadeIn>

        {/* Engagement Cards */}
        <Stagger
          className="grid sm:grid-cols-3 gap-4 mb-14"
          staggerDelay={0.08}
        >
          {engagementCards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <motion.div
                  className="p-5 rounded-lg border border-border/40 bg-card hover:border-accent/30 transition-colors"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2 rounded bg-accent/10 text-accent w-fit mb-3">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display font-semibold text-sm text-foreground mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Form + Side Panel */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className={`input-field ${errors.name ? "border-destructive focus:ring-destructive/30" : ""}`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`input-field ${errors.email ? "border-destructive focus:ring-destructive/30" : ""}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lookingFor"
                  className="block text-sm font-medium mb-2"
                >
                  What are you looking for?
                </label>
                <select
                  id="lookingFor"
                  {...register("lookingFor")}
                  className="input-field"
                >
                  <option value="">Select an option</option>
                  {lookingForOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className={`input-field resize-none ${errors.message ? "border-destructive focus:ring-destructive/30" : ""}`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={submitState !== "idle"}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={submitState === "idle" ? { scale: 1.02 } : {}}
                whileTap={submitState === "idle" ? { scale: 0.98 } : {}}
              >
                {submitState === "submitting" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                )}
                {submitState === "success" && (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Sent!
                  </>
                )}
                {submitState === "idle" && (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </FadeIn>

          {/* Side Panel */}
          <div className="lg:col-span-2 space-y-5">
            <FadeIn delay={0.2}>
              <div className="p-5 rounded-lg border border-border/40 bg-card">
                <div className="space-y-3.5">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="h-4 w-4 text-accent/60 shrink-0" />
                    {CONTACT_EMAIL}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-accent/60 shrink-0" />
                    Gurugram, Haryana
                  </div>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-accent/60 shrink-0 mt-0.5" />
                    Open for strategic roles and consulting opportunities
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="p-5 rounded-lg border border-border/40 bg-card">
                <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-[0.2em] mb-3 block">
                  Connect
                </span>
                <div className="flex gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/40 transition-all"
                      aria-label={link.name}
                    >
                      <link.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom Line */}
        <FadeIn delay={0.35}>
          <p className="text-center text-sm text-muted-foreground/70 mt-16 italic">
            If you're building something meaningful in AI, let's connect.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
