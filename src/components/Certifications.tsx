import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const Certifications = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const certifications = [
    { title: "Advanced React", issuer: "Meta", date: "Apr 2025", badge: "⚛️", link: "https://coursera.org/share/fb44550572118def361c74432940fc7f" },
    { title: "Exploratory Data Analysis for Machine Learning", issuer: "IBM", date: "Apr 2025", badge: "🔬", link: "https://coursera.org/share/c570f434124a3c04d3ccd73b59eb7674" },
    { title: "Introduction to Data Analytics", issuer: "IBM", date: "Sep 2025", badge: "📊", link: "https://coursera.org/share/b25cf61388d98f2cde60f3cbf9802b55" },
    { title: "Mathematics for ML: Multivariate Calculus", issuer: "Imperial College London", date: "Mar 2025", badge: "📐", link: "https://coursera.org/share/78b12ca74001c063686cf9f8c204101b" },
    { title: "React Basics", issuer: "Meta", date: "Apr 2025", badge: "⚛️", link: "https://coursera.org/share/312f385f042e2614a5bff0c47989d0d7" },
    { title: "Cloud Virtualization, Containers and APIs", issuer: "Duke University", date: "Oct 2024", badge: "☁️", link: "https://coursera.org/share/1e61e8bb37e54340c66c4438c75878e2" },
    { title: "Data Mining Methods", issuer: "University of Colorado Boulder", date: "Apr 2025", badge: "⛏️", link: "https://coursera.org/share/22de999be825e093abb3954fc720ded1" },
    { title: "Data Analysis and Visualization with Power BI", issuer: "Microsoft", date: "Apr 2025", badge: "📈", link: "https://coursera.org/share/4036e4b39284102c9b5f63ae2b6b80c4" },
    { title: "Operating Systems Fundamentals", issuer: "Akamai Technologies", date: "Apr 2024", badge: "🖥️", link: "https://coursera.org/share/67c078f54424e081ea1f353ac0716a6b" },
    { title: "Mathematics for ML: Linear Algebra", issuer: "Imperial College London", date: "Mar 2025", badge: "🧮", link: "https://coursera.org/share/8ea1b414e0ce1a0bd064bac390628103" },
    { title: "Introduction to OOP with Java", issuer: "LearnQuest", date: "Apr 2023", badge: "☕", link: "https://coursera.org/share/fee257e88f8a9868f2e0ca64adbe0eaf" },
    { title: "Algorithms for Searching, Sorting, and Indexing", issuer: "University of Colorado Boulder", date: "Nov 2023", badge: "🔍", link: "https://coursera.org/share/c8cc4d83d0ec181d10dabbf273fe58b4" },
    { title: "Dynamic Programming, Greedy Algorithms", issuer: "University of Colorado Boulder", date: "Nov 2023", badge: "🧩", link: "https://coursera.org/share/0e3670d9cc0ce76ca77d8f380d2e2a6e" },
    { title: "An Intuitive Introduction to Probability", issuer: "University of Zurich", date: "Apr 2023", badge: "🎲", link: "https://coursera.org/share/a98164f943c06afad0f6926da56b2a6e" },
    { title: "Introduction to Artificial Intelligence (AI)", issuer: "IBM", date: "Apr 2024", badge: "🤖", link: "https://coursera.org/share/3a8a6a929f57f4c97c2216a318143ba7" },
    { title: "Object-Oriented Hierarchies in Java", issuer: "LearnQuest", date: "Apr 2023", badge: "☕", link: "https://coursera.org/share/b8a0eaaf92886ea6d0250df1681bc162" },
    { title: "Physics 102 - Magnetic Fields and Faraday's Law", issuer: "Rice University", date: "Apr 2023", badge: "🧲", link: "https://coursera.org/share/39180ffa3d7cfa66f0ebd91b3444024b" },
    { title: "Introduction to Web Development", issuer: "UC Davis", date: "Apr 2024", badge: "🌐", link: "https://coursera.org/share/3d11ccc264cb8f9c050132fb6f14d692" },
    { title: "Java Class Library", issuer: "LearnQuest", date: "Apr 2023", badge: "📚", link: "https://coursera.org/share/14777405e8acb74bb191c5afad6f4440" },
    { title: "Database Management Essentials", issuer: "University of Colorado", date: "Nov 2023", badge: "🗄️", link: "https://coursera.org/share/31fe85abcfac93c89eab7dd5af7d8e6c" },
    { title: "Data Structures", issuer: "UC San Diego", date: "Apr 2023", badge: "🏗️", link: "https://coursera.org/share/f7c60cad85f7662546587cfe5c62bff9" },
    { title: "Introduction to Java", issuer: "LearnQuest", date: "Apr 2023", badge: "☕", link: "https://coursera.org/share/09f4472043d573966731be24fa753af4" },
    { title: "Renewable Energy Technology Fundamentals", issuer: "University of Colorado Boulder", date: "Mar 2023", badge: "🌱", link: "https://coursera.org/share/7bd2ba3bcdd70fe86a0940d137ae684d" },
  ];

  const visibleCerts = certifications.slice(0, 6);
  const hiddenCerts = certifications.slice(6);

  const CertCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, rotateY: 90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-white/10 group cursor-pointer block"
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
              <Award size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
              <span>Coursera Verified</span>
            </div>
            <ExternalLink size={14} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
          </div>
        </div>
      </div>
    </motion.a>
  );

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleCerts.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6">
                {hiddenCerts.map((cert, index) => (
                  <CertCard key={index + 6} cert={cert} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-10"
        >
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
          >
            {showAll ? "Show Less" : `View All ${certifications.length} Certificates`}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
