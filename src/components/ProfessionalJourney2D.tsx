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
    <section id="professional-journey" className="py-12 sm:py-16 md:py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Professional Journey
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-4 sm:mb-6 md:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Navigate through my career milestones in this interactive roadmap. Click on any milestone to explore details.
          </p>
        </motion.div>

        {/* Journey Cards - Simplified for all screens */}
        <div className="relative max-w-6xl mx-auto">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
          </div>

          {/* Journey Cards Grid */}
          <div className="relative z-10 grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 py-6 sm:py-8 md:py-12">
            {journeyData.map((journey, index) => (
              <motion.div
                key={journey.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <motion.div
                  className="relative group cursor-pointer"
                  onHoverStart={() => setHoveredJourney(journey.id)}
                  onHoverEnd={() => setHoveredJourney(null)}
                  onClick={() => setSelectedJourney(journey.id)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="w-full p-4 sm:p-5 md:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${journey.color}15, transparent)`,
                      borderColor: `${journey.color}40`,
                      boxShadow: hoveredJourney === journey.id 
                        ? `0 20px 40px ${journey.color}20` 
                        : `0 10px 25px ${journey.color}10`
                    }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0"
                        style={{ backgroundColor: journey.color }}
                      >
                        <journey.icon size={20} className="text-black sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{journey.role}</h3>
                        <div className="flex items-center text-gray-300 mt-0.5 sm:mt-1">
                          <MapPin size={12} className="mr-1 flex-shrink-0 sm:w-[14px] sm:h-[14px]" style={{ color: journey.color }} />
                          <span className="text-xs sm:text-sm font-medium truncate">{journey.company}</span>
                        </div>
                        <div className="flex items-center text-gray-400 mt-0.5">
                          <Calendar size={12} className="mr-1 flex-shrink-0 sm:w-[14px] sm:h-[14px]" style={{ color: journey.color }} />
                          <span className="text-xs sm:text-sm">{journey.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2">
                      {journey.achievements[0]}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {journey.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 sm:py-1 rounded-full text-xs border"
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
                        <span className="text-xs text-gray-400">+{journey.techStack.length - 3}</span>
                      )}
                    </div>

                    {/* Click hint */}
                    <motion.div 
                      className="text-xs text-gray-500 flex items-center justify-center py-2 mt-3 rounded-lg border border-gray-700/50"
                      animate={{ 
                        opacity: hoveredJourney === journey.id ? 1 : 0.7,
                        backgroundColor: hoveredJourney === journey.id ? `${journey.color}10` : 'transparent'
                      }}
                    >
                      Tap to explore
                    </motion.div>
                  </div>
                </motion.div>
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
                className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl p-5 sm:p-6 md:p-8 max-w-lg sm:max-w-xl md:max-w-2xl w-full border border-white/10 shadow-2xl max-h-[85vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedJourney(null)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                >
                  <X size={18} className="text-white sm:w-5 sm:h-5" />
                </button>

                {/* Header */}
                <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 pr-8">
                  <div 
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full p-0.5 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${selectedData.color}, ${selectedData.color}80)` }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <selectedData.icon size={22} className="text-white sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{selectedData.role}</h3>
                    <p className="text-sm sm:text-base font-medium" style={{ color: selectedData.color }}>{selectedData.company}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{selectedData.duration}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Key Achievements</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {selectedData.achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-xs sm:text-sm md:text-base text-gray-300 flex items-start"
                      >
                        <span 
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-1.5 sm:mt-2 mr-2 sm:mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedData.color }}
                        ></span>
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedData.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm font-medium"
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
