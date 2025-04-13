
import React from 'react';
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
    <div className="section-indicator hidden md:flex">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center"
          aria-label={`Scroll to ${section.label} section`}
        >
          <div
            className={`section-indicator-dot ${
              currentSection === section.id ? 'active' : ''
            }`}
          />
          <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs bg-background/80 backdrop-blur-sm px-2 py-1 rounded whitespace-nowrap">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;
