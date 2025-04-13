
import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);

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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-accent transition-all duration-300" />
          ) : (
            <Moon className="h-5 w-5 text-accent transition-all duration-300" />
          )}
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Cpu className="text-accent h-10 w-10" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 3D glow effect */}
      <motion.span 
        className="absolute inset-0 bg-accent/10 rounded-full"
        animate={{ 
          boxShadow: isHovering 
            ? '0 0 10px 3px rgba(155, 135, 245, 0.3), 0 0 20px 6px rgba(155, 135, 245, 0.1)' 
            : '0 0 0px 0px rgba(155, 135, 245, 0)' 
        }}
        transition={{ duration: 0.3 }}
      />
    </Button>
  );
}
