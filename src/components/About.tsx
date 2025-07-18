
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate and dedicated fresher with a strong foundation in software development. 
              My journey in technology began with curiosity and has evolved into a deep commitment to 
              creating innovative solutions that make a difference.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With hands-on experience in modern web technologies and a keen interest in emerging trends, 
              I'm excited to contribute to meaningful projects and grow as a software engineer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <GraduationCap className="text-blue-400" size={24} />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">Bachelor of Technology</p>
                <p className="text-gray-400">Computer Science & Engineering</p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>2020 - 2024</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <MapPin className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold">Location</h3>
              </div>
              <p className="text-gray-300">India</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
