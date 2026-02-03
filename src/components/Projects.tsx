import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import aiCyberSecurityImage from "@/assets/ai-cyber-security.jpg";
import blockchainPasswordImage from "@/assets/blockchain-password.jpg";
import fullstackTemplateImage from "@/assets/fullstack-template.jpg";
import vulnerabilityScannerImage from "@/assets/vulnerability-scanner.jpg";
import crmWorkflowImage from "@/assets/crm-workflow.jpg";

const Projects = () => {
  const { t } = useLanguage();
  const projects = [
    {
      id: 1,
      title: "AI in Cyber Security Threat Detection",
      description: "Used ML-based phishing detection API to analyze URLs and emails. Reduced false positives by 40% and scanned 1,000+ URLs with 95% detection accuracy.",
      tech: ["Machine Learning", "Python", "REST APIs"],
      github: "https://github.com/code-with-vishnu26/Applicative-project--SEM-6-.git",
      date: "April 2025",
      image: aiCyberSecurityImage
    },
    {
      id: 2,
      title: "Secure Password Management Using Blockchain",
      description: "Centralized password store with smart contracts. Reduced breach risk by 99% with end-to-end encrypted and immutable data records.",
      tech: ["Blockchain", "Smart Contracts"],
      github: "https://github.com/code-with-vishnu26/-Applicative-Project-SEM-5-.git",
      date: "2024",
      image: blockchainPasswordImage
    },
    {
      id: 3,
      title: "Full-Stack Web App Template",
      description: "Docker-based template with Next.js and Express/NestJS. Features SSR, CI/CD, JWT authentication, REST APIs, and Socket.IO for real-time features.",
      tech: ["Next.js", "Express/NestJS", "Docker"],
      github: "https://github.com/code-with-vishnu26/fullstack-nextjs-app-template-main.git",
      date: "May 2024",
      image: fullstackTemplateImage
    },
    {
      id: 4,
      title: "Web Vulnerability Scanner",
      description: "Automated 80+ security tests, found 500+ vulnerabilities, and reduced scan time by 60% using comprehensive security testing tools.",
      tech: ["Nmap", "Nikto", "TheHarvester"],
      github: "https://github.com/code-with-vishnu26/Web-Vulnerability-Scanner.git",
      date: "November 2023",
      image: vulnerabilityScannerImage
    },
    {
      id: 5,
      title: "Mini CRM AI Workflow",
      description: "OCR integration with lead automation for streamlined customer relationship management and automated workflow processing.",
      tech: ["React.js", "Python", "React Flow"],
      date: "2024",
      image: crmWorkflowImage
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('projects.title')}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 group"
            >
              {project.image && (
                <div className="h-36 sm:h-40 md:h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                  <span className="self-start px-2 py-1 text-xs text-blue-400 bg-blue-400/20 rounded-full whitespace-nowrap">
                    {project.date}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      <Github size={16} />
                      <span className="text-xs sm:text-sm">{t('projects.codeLabel')}</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
