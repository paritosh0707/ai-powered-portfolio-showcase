import { Linkedin, Github, Twitter, Mail, ArrowUp } from "lucide-react";

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
  {
    name: "Email",
    href: "mailto:paritoshsharma072000@gmail.com",
    icon: Mail,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold">PS<span className="text-accent">.</span></span>
            <span className="text-muted-foreground text-sm">Paritosh Sharma</span>
          </div>

          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-accent transition-colors"
                aria-label={link.name}
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="border-t border-border/30 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Paritosh Sharma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
