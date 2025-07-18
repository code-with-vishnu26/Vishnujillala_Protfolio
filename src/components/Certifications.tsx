
import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Data Analytics Professional Certificate",
      issuer: "Google",
      date: "2023",
      description: "Comprehensive program covering data analysis, visualization, and statistical methods using tools like R, SQL, and Tableau.",
      badge: "🎯",
    },
    {
      title: "Java Programming Masterclass",
      issuer: "Oracle",
      date: "2023",
      description: "Advanced Java programming concepts including OOP, data structures, algorithms, and enterprise application development.",
      badge: "☕",
    },
    {
      title: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "2023",
      description: "Complete web development curriculum covering HTML, CSS, JavaScript, React, Node.js, and database management.",
      badge: "🌐",
    },
    {
      title: "Cloud Computing Fundamentals",
      issuer: "AWS",
      date: "2024",
      description: "Foundation in cloud services, deployment strategies, and scalable architecture design on Amazon Web Services.",
      badge: "☁️",
    },
  ];

  return (
    <section id="certifications" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group perspective-1000"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{cert.badge}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                  <p className="text-blue-300 font-medium mb-3">{cert.issuer}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{cert.description}</p>
                  
                  <div className="mt-4 flex items-center space-x-2 text-sm text-gray-400">
                    <Award size={16} className="text-yellow-400" />
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
