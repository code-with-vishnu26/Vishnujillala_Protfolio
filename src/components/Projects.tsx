
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "AI in Cyber Security Threat Detection",
      description: "Used ML-based phishing detection API to analyze URLs and emails. Reduced false positives by 40% and scanned 1,000+ URLs with 95% detection accuracy.",
      image: "/placeholder.svg",
      technologies: ["Machine Learning", "Python", "REST APIs", "Scikit-learn"],
      githubUrl: "https://github.com/code-with-vishnu26/Applicative-project--SEM-6-.git",
      liveUrl: "#",
    },
    {
      title: "Secure Password Management Using Blockchain",
      description: "Centralized password store with smart contracts. Reduced breach risk by 99% with end-to-end encrypted and immutable data records.",
      image: "/placeholder.svg",
      technologies: ["Blockchain", "Smart Contracts", "Solidity", "Web3"],
      githubUrl: "https://github.com/code-with-vishnu26/-Applicative-Project-SEM-5-.git",
      liveUrl: "#",
    },
    {
      title: "Full-Stack Web App Template",
      description: "Docker-based, SSR, CI/CD enabled template with JWT authentication, REST APIs, and Socket.IO for real-time features.",
      image: "/placeholder.svg",
      technologies: ["Next.js", "Express", "NestJS", "Docker", "Socket.IO"],
      githubUrl: "https://github.com/code-with-vishnu26/fullstack-nextjs-app-template-main.git",
      liveUrl: "#",
    },
    {
      title: "Web Vulnerability Scanner",
      description: "Automated 80+ security tests, found 500+ vulnerabilities, and reduced scan time by 60% using advanced scanning tools.",
      image: "/placeholder.svg",
      technologies: ["Nmap", "Nikto", "TheHarvester", "Python", "Security"],
      githubUrl: "https://github.com/code-with-vishnu26/Web-Vulnerability-Scanner.git",
      liveUrl: "#",
    },
    {
      title: "Mini CRM AI Workflow",
      description: "OCR integration and lead automation system with intelligent workflow management and data processing capabilities.",
      image: "/placeholder.svg",
      technologies: ["React.js", "Python", "React Flow", "OCR", "AI"],
      githubUrl: "#",
      liveUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
