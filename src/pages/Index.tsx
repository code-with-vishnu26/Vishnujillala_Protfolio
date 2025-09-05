
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import MovingLogos from "@/components/MovingLogos";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";
import { EnhancedTimeline } from "@/components/EnhancedTimeline";
import { LiveChatWidget } from "@/components/LiveChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechnicalSkills />
        <MovingLogos />
        <Projects />
        <EnhancedTimeline />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <LiveChatWidget />
    </div>
  );
};

export default Index;
