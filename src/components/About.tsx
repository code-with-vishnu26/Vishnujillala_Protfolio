import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Calendar, X, Trophy, Target } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  
  const cardDetails = {
    education: {
      title: "Education",
      icon: GraduationCap,
      color: "blue-400",
      content: {
        degree: "B.Tech – CSE (Core)",
        institution: "Woxsen University, Hyderabad",
        duration: "2022 – 2026",
        description: "Pursuing Bachelor of Technology in Computer Science Engineering with focus on core computer science concepts, algorithms, and modern software development practices.",
        highlights: ["Current CGPA: 7.5/10", "Specialization in Full Stack Development", "Active participant in coding competitions", "Member of Computer Science Society"]
      }
    },
    location: {
      title: "Location",
      icon: MapPin,
      color: "purple-400",
      content: {
        current: "Nizamabad, Telangana, India",
        description: "Based in Nizamabad, a vibrant district in Telangana state. Open to remote work opportunities and willing to relocate for the right position.",
        details: ["Time Zone: IST (UTC +5:30)", "Open to Remote Work", "Willing to Relocate", "Passport Ready for International Opportunities"]
      }
    },
    achievement: {
      title: "Achievement",
      icon: Trophy,
      color: "yellow-400",
      content: {
        title: "DIGITECH Hackathon Winner",
        date: "March 2025",
        description: "Ranked #1 among 50+ teams using Resume Ranker AI tool",
        details: ["Developed AI-powered resume ranking system", "Used machine learning algorithms for scoring", "Implemented React frontend with Node.js backend"]
      }
    },
    interests: {
      title: "Interests",
      icon: Target,
      color: "green-400",
      content: {
        description: "Passionate about technology and continuous learning",
        interests: [{
          name: "Competitive Coding",
          description: "Regularly practicing problem-solving on LeetCode with 100+ completed challenges across data structures and algorithms."
        }, {
          name: "Open Source",
          description: "Contributing to open source projects on GitHub. Contributed to 10+ repositories with 200+ commits."
        }, {
          name: "Exploring AI",
          description: "Learning about machine learning, neural networks, and AI applications in web development."
        }]
      }
    }
  };

  const renderDetailModal = () => {
    if (!selectedCard) return null;
    const card = cardDetails[selectedCard as keyof typeof cardDetails];
    const IconComponent = card.icon;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={() => setSelectedCard(null)}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg sm:max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 max-h-[85vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={() => setSelectedCard(null)} 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/70 hover:text-white transition-colors p-1"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          <div className={`flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 text-${card.color}`}>
            <IconComponent size={24} className="sm:w-8 sm:h-8" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">{card.title}</h3>
          </div>

          {selectedCard === 'education' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-xl overflow-hidden mb-4 sm:mb-6">
                <img 
                  src="/lovable-uploads/edae03cb-9d12-4f8c-b78f-1af61bbf4c94.png" 
                  alt="Woxsen University" 
                  className="w-full h-32 sm:h-48 object-cover" 
                />
              </div>
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-lg sm:text-xl font-semibold text-white">{(card.content as any).degree}</h4>
                <p className="text-base sm:text-lg text-gray-300">{(card.content as any).institution}</p>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar size={14} className="sm:w-4 sm:h-4" />
                  <span className="text-sm sm:text-base">{(card.content as any).duration}</span>
                </div>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{(card.content as any).description}</p>
                <div className="space-y-2">
                  <h5 className="font-semibold text-white text-sm sm:text-base">Key Highlights:</h5>
                  <ul className="space-y-1">
                    {(card.content as any).highlights?.map((highlight: string, index: number) => (
                      <li key={index} className="text-sm sm:text-base text-gray-300 flex items-center">
                        <span className="text-blue-400 mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedCard === 'location' && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold text-white">{(card.content as any).current}</h4>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{(card.content as any).description}</p>
              <div className="space-y-2">
                <h5 className="font-semibold text-white text-sm sm:text-base">Details:</h5>
                <ul className="space-y-1">
                  {(card.content as any).details?.map((detail: string, index: number) => (
                    <li key={index} className="text-sm sm:text-base text-gray-300 flex items-center">
                      <span className="text-purple-400 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedCard === 'achievement' && (
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-lg sm:text-xl font-semibold text-white">{(card.content as any).title}</h4>
              <p className="text-base sm:text-lg text-gray-300">{(card.content as any).date}</p>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{(card.content as any).description}</p>
              <div className="space-y-2">
                <h5 className="font-semibold text-white text-sm sm:text-base">Project Details:</h5>
                <ul className="space-y-1">
                  {(card.content as any).details?.map((detail: string, index: number) => (
                    <li key={index} className="text-sm sm:text-base text-gray-300 flex items-center">
                      <span className="text-yellow-400 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {selectedCard === 'interests' && (
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{(card.content as any).description}</p>
              <div className="space-y-3 sm:space-y-4">
                {(card.content as any).interests?.map((interest: any, index: number) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
                    <h5 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">{interest.name}</h5>
                    <p className="text-gray-300 text-xs sm:text-sm">{interest.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section id="about" className="py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('about.title')}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t('about.description1')}
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {t('about.description2')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Education Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('education')}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <GraduationCap className="text-blue-400" size={20} />
                  <h3 className="text-lg sm:text-xl font-semibold">Education</h3>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base text-gray-300">B.Tech – Computer Science and Engineering</p>
                  <p className="text-sm sm:text-base text-gray-400">Woxsen University, Hyderabad</p>
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <Calendar size={14} />
                    <span>2022 – 2026</span>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('location')}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <MapPin className="text-purple-400" size={20} />
                  <h3 className="text-lg sm:text-xl font-semibold">Location</h3>
                </div>
                <p className="text-sm sm:text-base text-gray-300">Nizamabad, Telangana, India</p>
              </motion.div>

              {/* Achievement Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('achievement')}
              >
                <h3 className="text-white font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                  <Trophy className="text-yellow-400 mr-2" size={18} />
                  Achievement
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  <strong>DIGITECH Hackathon Winner</strong> – March 2025<br />
                  <span className="text-xs sm:text-sm">Ranked #1 among 50+ teams using Resume Ranker AI tool</span>
                </p>
              </motion.div>

              {/* Interests Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCard('interests')}
              >
                <h3 className="text-white font-semibold mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                  <Target className="text-green-400 mr-2" size={18} />
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Competitive Coding", "Open Source", "Exploring AI"].map(interest => (
                    <span 
                      key={interest} 
                      className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {renderDetailModal()}
      </AnimatePresence>
    </>
  );
};

export default About;
