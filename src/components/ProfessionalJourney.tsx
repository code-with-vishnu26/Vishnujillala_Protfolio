import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, Cloud, Code, Award, GraduationCap, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProfessionalJourney = () => {
  const { t } = useLanguage();
  const [selectedJourney, setSelectedJourney] = useState<number | null>(null);

  const journeyData = [
    {
      id: 1,
      icon: GraduationCap,
      role: "B.Tech Student",
      company: "Woxsen University",
      duration: "2022 – 2026",
      achievements: [
        "Pursuing B.Tech in Computer Science Engineering (Core)",
        "Maintaining 69% CGPA",
        "Active participant in hackathons and technical events",
        "Building strong foundation in programming and software development"
      ],
      techStack: ["Python", "Java", "JavaScript", "Data Structures", "Algorithms"],
      position: { x: 10, y: 20 }
    },
    {
      id: 2,
      icon: Award,
      role: "Hackathon Winner",
      company: "DIGITECH Hackathon",
      duration: "March 2025",
      achievements: [
        "🥇 Ranked #1 among 50+ teams",
        "Developed Resume Ranker AI tool",
        "Implemented machine learning algorithms for resume analysis",
        "Delivered complete end-to-end solution within 48 hours"
      ],
      techStack: ["AI/ML", "Python", "NLP", "React.js"],
      position: { x: 85, y: 35 }
    },
    {
      id: 3,
      icon: Code,
      role: "Full Stack Developer",
      company: "Personal Projects",
      duration: "2023 – Present",
      achievements: [
        "Built 5+ comprehensive full-stack applications",
        "Specialized in AI integration and cybersecurity",
        "Reduced security vulnerabilities by 60% through automated scanning",
        "Implemented blockchain-based password management system"
      ],
      techStack: ["React.js", "Node.js", "MongoDB", "Docker", "Blockchain"],
      position: { x: 15, y: 65 }
    },
    {
      id: 4,
      icon: Briefcase,
      role: "Aspiring Software Engineer",
      company: "Seeking Opportunities",
      duration: "2025 – Future",
      achievements: [
        "Actively seeking internship and full-time opportunities",
        "Building professional network and industry connections",
        "Continuously learning emerging technologies",
        "Contributing to open-source projects"
      ],
      techStack: ["Machine Learning", "Cloud Computing", "DevOps", "Microservices"],
      position: { x: 80, y: 80 }
    }
  ];

  const selectedData = journeyData.find(item => item.id === selectedJourney);

  return (
    <section id="professional-journey" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t('journey.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Enhanced Curved Path with Background Elements */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Background decorative elements */}
            <motion.circle
              cx="20" cy="15" r="1"
              fill="url(#sparkleGradient)"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            />
            <motion.circle
              cx="75" cy="25" r="0.8"
              fill="url(#sparkleGradient)"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.circle
              cx="30" cy="70" r="1.2"
              fill="url(#sparkleGradient)"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
            
            {/* Main curved path with enhanced design */}
            <motion.path
              d="M 10,20 Q 30,5 50,25 Q 70,45 85,35 Q 95,30 90,50 Q 85,70 50,60 Q 20,50 15,65 Q 10,80 40,75 Q 60,70 80,80"
              stroke="url(#enhancedGradient)"
              strokeWidth="0.4"
              fill="none"
              strokeDasharray="3,1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            
            {/* Glowing shadow path */}
            <motion.path
              d="M 10,20 Q 30,5 50,25 Q 70,45 85,35 Q 95,30 90,50 Q 85,70 50,60 Q 20,50 15,65 Q 10,80 40,75 Q 60,70 80,80"
              stroke="url(#glowGradient)"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
              filter="blur(0.5px)"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
            
            <defs>
              <linearGradient id="enhancedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="25%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="75%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <radialGradient id="sparkleGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#a78bfa" />
              </radialGradient>
            </defs>
          </svg>

          {/* Journey Points with Enhanced Design */}
          <div className="relative h-96">
            {/* Constellation-style background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Twinkling stars */}
              <motion.div
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ left: '15%', top: '12%' }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                style={{ right: '20%', top: '25%' }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-purple-400 rounded-full"
                style={{ left: '25%', bottom: '30%' }}
                animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute w-0.5 h-0.5 bg-pink-300 rounded-full"
                style={{ right: '35%', bottom: '15%' }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              
              {/* Subtle geometric elements */}
              <motion.div
                className="absolute w-16 h-16 border border-blue-500/20 rounded-full"
                style={{ left: '70%', top: '35%' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-8 h-8 border border-purple-500/30"
                style={{ left: '5%', top: '45%', transform: 'rotate(45deg)' }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
            </div>
            {journeyData.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${item.position.x}%`,
                    top: `${item.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedJourney(item.id)}
                >
                  <div className="relative group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-300">
                        <Icon size={24} className="text-white" />
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedJourney && selectedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJourney(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 max-w-lg w-full mx-4 border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJourney(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  <X size={20} className="text-white" />
                </button>

                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <selectedData.icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedData.role}</h3>
                    <p className="text-blue-400 font-medium">{selectedData.company}</p>
                    <p className="text-gray-400 text-sm">{selectedData.duration}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">{t('journey.keyAchievements')}</h4>
                  <ul className="space-y-2">
                    {selectedData.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-gray-300 text-sm flex items-start"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">{t('journey.techStack')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm text-blue-300 border border-blue-500/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProfessionalJourney;