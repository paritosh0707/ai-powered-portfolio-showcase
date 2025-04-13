
import React, { Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import ChatAssistant from "@/components/ChatAssistant";
import useSection from "@/hooks/use-section";
import { lazy } from "react";
import { WebGLDetector } from "@/components/3d/WebGLDetector";
import SectionIndicator from "@/components/3d/SectionIndicator";

// Lazy load 3D components to improve initial loading
const Scene3D = lazy(() => import("@/components/3d/Scene3D"));

export default function Index() {
  const currentSection = useSection();

  // Preload 3D assets
  useEffect(() => {
    // This helps with smoother transitions when the 3D scene first renders
    const preloadThree = async () => {
      try {
        await import('@react-three/fiber');
        await import('@react-three/drei');
        await import('three');
      } catch (err) {
        console.error('Failed to preload 3D libraries:', err);
      }
    };
    
    preloadThree();
  }, []);

  // Add intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-enter');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all sections except Hero (which should always be visible)
    document.querySelectorAll('section:not(#home)').forEach((section) => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* WebGL detector */}
      <WebGLDetector />
      
      {/* 3D Background Scene */}
      <Suspense fallback={null}>
        <Scene3D currentSection={currentSection} />
      </Suspense>
      
      {/* Section indicator */}
      <SectionIndicator />
      
      <Navbar />
      <main className="flex-1 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}
