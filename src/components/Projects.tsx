
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      image: "/placeholder.svg",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg",
      technologies: ["React", "Firebase", "Material-UI", "JavaScript"],
      githubUrl: "#",
      liveUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather application that provides current weather conditions and forecasts using REST APIs with beautiful data visualizations.",
      image: "/placeholder.svg",
      technologies: ["JavaScript", "API Integration", "Chart.js", "CSS3"],
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
