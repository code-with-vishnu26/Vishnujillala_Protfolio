import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Certifications = () => {
  const { t } = useLanguage();
  const certifications = [
    {
      title: "GenAI Powered Data Analytics Simulation",
      issuer: "Forage, Tata",
      date: "July 2025",
      description: "Advanced certification in Generative AI applications for data analytics and business intelligence.",
      badge: "🤖",
    },
    {
      title: "Flipkart GRID 6.0 – E-Commerce & Tech Quiz",
      issuer: "Flipkart",
      date: "Dec 2024",
      description: "Technical competition focused on e-commerce solutions and emerging technologies.",
      badge: "🛒",
    },
    {
      title: "TechVortex 2.0 – International Project Competition",
      issuer: "International Competition",
      date: "Sep 2024",
      description: "Global project competition showcasing innovative technology solutions.",
      badge: "🌪️",
    },
    {
      title: "Intro to Web Development",
      issuer: "UC Davis",
      date: "Apr 2024",
      description: "Comprehensive web development fundamentals including HTML, CSS, JavaScript, and modern frameworks.",
      badge: "🌐",
    },
    {
      title: "Database Management Essentials",
      issuer: "University of Colorado",
      date: "Nov 2023",
      description: "Core database concepts, SQL, and database design principles.",
      badge: "🗄️",
    },
    {
      title: "Data Structures",
      issuer: "UC San Diego",
      date: "Apr 2023",
      description: "Advanced data structures and algorithms for efficient problem solving.",
      badge: "📊",
    },
  ];

  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('certifications.title')}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10 group"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{cert.badge}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-2 mb-2">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {cert.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-400 flex-shrink-0">
                      <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <p className="text-blue-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{cert.issuer}</p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {cert.description}
                  </p>
                  
                  <div className="mt-3 sm:mt-4 flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
                    <Award size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
                    <span>Verified Certificate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
