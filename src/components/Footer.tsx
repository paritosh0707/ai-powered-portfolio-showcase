
import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-foreground/70 text-sm">
              © {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center text-sm text-foreground/70">
            <p className="flex items-center">
              Built with <Heart className="h-4 w-4 mx-1 text-accent" /> using React & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
