
import { motion } from "framer-motion";
import { Download, FileText, Eye } from "lucide-react";

const Resume = () => {
  return (
    <section id="resume" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resume
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
          >
            <div className="mb-6">
              <FileText size={64} className="mx-auto text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Download My Resume</h3>
              <p className="text-gray-300">
                Get a comprehensive overview of my skills, experience, and qualifications
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://drive.google.com/uc?export=download&id=1tzCxxKywTCItE8WycimCWmbHQXDnHC0p"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </motion.a>
              
              <motion.a
                href="https://drive.google.com/file/d/1tzCxxKywTCItE8WycimCWmbHQXDnHC0p/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-400 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                <Eye size={20} />
                <span>Preview Online</span>
              </motion.a>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              <p>Last updated: January 2024</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
