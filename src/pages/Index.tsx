
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import TechnicalSkills from "@/components/TechnicalSkills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import ProfessionalJourney from "@/components/ProfessionalJourney";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <TechnicalSkills />
        <Projects />
        <ProfessionalJourney />
        <Certifications />
        <Resume />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
