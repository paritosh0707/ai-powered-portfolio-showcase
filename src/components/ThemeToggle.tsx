
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Cpu } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full relative overflow-hidden group"
      aria-label="Toggle theme"
    >
      <span className="relative z-10">
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-accent transition-all duration-300" />
        ) : (
          <Moon className="h-5 w-5 text-accent transition-all duration-300" />
        )}
      </span>
      <Cpu className="absolute opacity-0 group-hover:opacity-30 text-accent h-10 w-10 animate-pulse-slow" />
      <span className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
    </Button>
  );
}
