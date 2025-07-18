
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
              I'm genuinely excited to start my career! I'm looking for a place where I can jump in, 
              learn quickly, and grow alongside a supportive team. I bring a practical, problem-solving 
              approach honed through my studies and a knack for breaking down big challenges into manageable 
              steps.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I thrive in getting hands-on experience and helping teams succeed. What really energizes 
              me is figuring out how technology can simplify complex tasks and bring people together to 
              collaborate better—especially when it makes a real difference for others.
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
                <p className="text-gray-300">B.Tech – CSE (Core)</p>
                <p className="text-gray-400">Woxsen University, Hyderabad</p>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar size={16} />
                  <span>2022 – 2026 (69%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center space-x-4 mb-4">
                <MapPin className="text-purple-400" size={24} />
                <h3 className="text-xl font-semibold">Location</h3>
              </div>
              <p className="text-gray-300">Nizamabad, Telangana, India</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <span className="text-yellow-400 mr-2">🏆</span>
                Achievement
              </h3>
              <p className="text-gray-300">
                <strong>DIGITECH Hackathon Winner</strong> – March 2025<br />
                Ranked #1 among 50+ teams using Resume Ranker AI tool
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <span className="text-green-400 mr-2">🎯</span>
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Competitive Coding", "Open Source", "AI in Games", "Full-Stack Projects"].map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
