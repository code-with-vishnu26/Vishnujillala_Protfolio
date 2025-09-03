import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, Code, X, MapPin, Calendar } from "lucide-react";

interface JourneyNode {
  id: number;
  role: string;
  company: string;
  duration: string;
  achievements: string[];
  techStack: string[];
  color: string;
  icon: any;
}

const journeyData: JourneyNode[] = [
  {
    id: 1,
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
    color: "#3b82f6",
    icon: GraduationCap
  },
  {
    id: 2,
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
    color: "#8b5cf6",
    icon: Award
  },
  {
    id: 3,
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
    color: "#ec4899",
    icon: Code
  },
  {
    id: 4,
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
    color: "#10b981",
    icon: Briefcase
  }
];

const ProfessionalJourney2D = () => {
  const [selectedJourney, setSelectedJourney] = useState<number | null>(null);
  const [hoveredJourney, setHoveredJourney] = useState<number | null>(null);
  
  const selectedData = journeyData.find(item => item.id === selectedJourney);

  return (
    <section id="professional-journey" className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Professional Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Navigate through my career milestones in this interactive roadmap. Click on any milestone to explore details.
          </p>
        </motion.div>

        {/* Flowing River Journey Layout */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated Background River */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 800">
              <defs>
                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 50 400 Q 250 200, 450 350 T 850 400 Q 950 450, 950 500"
                fill="none"
                stroke="url(#riverGradient)"
                strokeWidth="60"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Journey Cards */}
          <div className="relative z-10 space-y-8 py-12">
            {journeyData.map((journey, index) => (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                {/* Connection Line to Center */}
                <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <motion.div
                    className={`w-16 h-0.5 ${index % 2 === 0 ? 'mr-4' : 'ml-4'}`}
                    style={{ 
                      background: `linear-gradient(${index % 2 === 0 ? '90deg' : '270deg'}, transparent, ${journey.color})`
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                  
                  {/* Journey Card */}
                  <motion.div
                    className="relative group cursor-pointer"
                    onHoverStart={() => setHoveredJourney(journey.id)}
                    onHoverEnd={() => setHoveredJourney(null)}
                    onClick={() => setSelectedJourney(journey.id)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Floating Milestone Indicator */}
                    <motion.div
                      className={`absolute ${index % 2 === 0 ? '-right-6' : '-left-6'} top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full border-4 border-black flex items-center justify-center`}
                      style={{ backgroundColor: journey.color }}
                      animate={{
                        boxShadow: hoveredJourney === journey.id 
                          ? `0 0 20px ${journey.color}60` 
                          : `0 0 10px ${journey.color}30`,
                        scale: hoveredJourney === journey.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <journey.icon size={16} className="text-black" />
                    </motion.div>

                    {/* Card Content */}
                    <div 
                      className="w-80 p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${journey.color}15, transparent)`,
                        borderColor: `${journey.color}40`,
                        boxShadow: hoveredJourney === journey.id 
                          ? `0 20px 40px ${journey.color}20` 
                          : `0 10px 25px ${journey.color}10`
                      }}
                    >
                      {/* Card Header */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-2">{journey.role}</h3>
                        <div className="flex items-center text-gray-300 mb-1">
                          <MapPin size={14} className="mr-2" style={{ color: journey.color }} />
                          <span className="text-sm font-medium">{journey.company}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Calendar size={14} className="mr-2" style={{ color: journey.color }} />
                          <span className="text-sm">{journey.duration}</span>
                        </div>
                      </div>

                      {/* Preview Achievements */}
                      <div className="mb-4">
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {journey.achievements[0]}
                        </p>
                      </div>

                      {/* Tech Stack Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {journey.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full text-xs border"
                            style={{
                              backgroundColor: `${journey.color}20`,
                              borderColor: `${journey.color}30`,
                              color: journey.color
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                        {journey.techStack.length > 3 && (
                          <span className="text-xs text-gray-400">+{journey.techStack.length - 3} more</span>
                        )}
                      </div>

                      {/* Click to Expand Hint */}
                      <motion.div 
                        className="text-xs text-gray-500 flex items-center justify-center py-2 rounded-lg border border-gray-700/50"
                        animate={{ 
                          opacity: hoveredJourney === journey.id ? 1 : 0.7,
                          backgroundColor: hoveredJourney === journey.id ? `${journey.color}10` : 'transparent'
                        }}
                      >
                        Click to explore details
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden w-full">
                  <motion.div
                    className="relative group cursor-pointer mx-4"
                    onHoverStart={() => setHoveredJourney(journey.id)}
                    onHoverEnd={() => setHoveredJourney(null)}
                    onClick={() => setSelectedJourney(journey.id)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="w-full p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${journey.color}15, transparent)`,
                        borderColor: `${journey.color}40`,
                        boxShadow: hoveredJourney === journey.id 
                          ? `0 20px 40px ${journey.color}20` 
                          : `0 10px 25px ${journey.color}10`
                      }}
                    >
                      <div className="flex items-center mb-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                          style={{ backgroundColor: journey.color }}
                        >
                          <journey.icon size={24} className="text-black" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{journey.role}</h3>
                          <p className="text-gray-300 text-sm">{journey.company}</p>
                          <p className="text-gray-400 text-xs">{journey.duration}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {journey.achievements[0]}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {journey.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full text-xs border"
                            style={{
                              backgroundColor: `${journey.color}20`,
                              borderColor: `${journey.color}30`,
                              color: journey.color
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Modal */}
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
                className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full mx-4 border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
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
                  <div 
                    className="w-16 h-16 rounded-full p-0.5"
                    style={{ background: `linear-gradient(135deg, ${selectedData.color}, ${selectedData.color}80)` }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <selectedData.icon size={28} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedData.role}</h3>
                    <p className="font-medium" style={{ color: selectedData.color }}>{selectedData.company}</p>
                    <p className="text-gray-400">{selectedData.duration}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                  <ul className="space-y-3">
                    {selectedData.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-gray-300 flex items-start"
                      >
                        <span 
                          className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedData.color }}
                        ></span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-4 py-2 rounded-full border font-medium"
                        style={{ 
                          backgroundColor: `${selectedData.color}20`,
                          borderColor: `${selectedData.color}50`,
                          color: selectedData.color
                        }}
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

export default ProfessionalJourney2D;