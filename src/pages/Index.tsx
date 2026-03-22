import Hero from "@/components/Hero";
import About from "@/components/About";
import Competencies from "@/components/Competencies";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ChatAssistant from "@/components/ChatAssistant";

export default function Index() {
  return (
    <>
      <Hero />
      <About />
      <Competencies />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <ChatAssistant />
    </>
  );
}
