import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import ResumeActions from "@/components/ResumeActions";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#home"
            onClick={(e) => handleNav(e, "#home")}
            className="font-display font-extrabold text-lg tracking-tight hover:text-accent transition-colors"
          >
            PS<span className="text-accent">.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <nav className="flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border/50">
              <ThemeToggle />
              <ResumeActions variant="desktop" />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center h-11 w-11 rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-y-0 right-0 w-full max-w-xs bg-background border-l border-border shadow-2xl z-[70] transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
          <span className="font-display font-bold">Menu</span>
          <button
            onClick={closeMenu}
            className="inline-flex items-center justify-center h-11 w-11 rounded-lg text-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-1 h-[calc(100%-4rem)] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="px-4 py-3 text-lg text-foreground/80 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="mt-4 pt-4 border-t border-border/50">
            <ResumeActions variant="mobile" onAction={closeMenu} />
          </div>
        </nav>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
