import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    // { name: "Blog", href: "#blog" },
    // { name: "Mindstack", href: "/mindstack" },
    { name: "Contact", href: "#contact" },
  ];

  // Helper to handle section navigation from any route
  const handleSectionNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const section = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-lg md:text-xl font-bold gradient-text"
            >
              Paritosh Sharma
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="nav-link text-sm font-medium"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="nav-link text-sm font-medium"
                    onClick={e => handleSectionNav(e, link.href)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-full text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 w-screen h-screen bg-background/95 backdrop-blur-xl z-50 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: 0, left: 0 }}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 rounded-full text-foreground focus:outline-none"
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-8 overflow-y-auto">
          {navLinks.map((link) => (
            link.href.startsWith('/') ? (
              <Link
                key={link.name}
                to={link.href}
                className="nav-link text-xl font-medium"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-xl font-medium"
                onClick={e => handleSectionNav(e, link.href)}
              >
                {link.name}
              </a>
            )
          ))}
        </div>
      </div>
    </header>
  );
}
