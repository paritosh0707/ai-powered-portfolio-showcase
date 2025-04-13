
import { useState, useEffect, useCallback } from 'react';

export const useSection = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    setLastScrollY(currentScrollY);
    
    // Find current section with improved detection
    const sections = document.querySelectorAll('section[id]');
    
    // Determine the view threshold based on scroll direction
    // When scrolling down, detect section earlier; when scrolling up, detect later
    const viewThreshold = scrollDirection === 'down' 
      ? window.innerHeight / 3 
      : window.innerHeight / 2;
    
    const scrollPosition = window.scrollY + viewThreshold;
    
    // Check all sections to find the current one
    let currentSectionId = 'home';
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionId = section.getAttribute('id') || '';
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });
    
    setCurrentSection(currentSectionId);
  }, [lastScrollY, scrollDirection]);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  return currentSection;
};

export default useSection;
