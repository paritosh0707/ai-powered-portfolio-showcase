
import React from 'react';
import { motion } from 'framer-motion';
import { useSection } from '@/hooks/use-section';

const SectionIndicator = () => {
  const currentSection = useSection();
  
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <motion.div 
      className="section-indicator hidden md:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center my-2"
          aria-label={`Scroll to ${section.label} section`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentSection === section.id 
                ? 'bg-accent shadow-[0_0_10px_3px] shadow-accent/50' 
                : 'bg-foreground/20'
            }`}
            animate={{
              scale: currentSection === section.id ? 1.2 : 1,
            }}
          />
          <motion.span 
            className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded whitespace-nowrap"
          >
            {section.label}
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SectionIndicator;
