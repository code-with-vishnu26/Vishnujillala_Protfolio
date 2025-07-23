
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import InteractiveProfessionalJourney from "@/components/InteractiveProfessionalJourney";
import MovingLogos from "@/components/MovingLogos";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <TechnicalSkills />
        <MovingLogos />
        <Projects />
        <InteractiveProfessionalJourney />
        <Certifications />
        <Resume />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
