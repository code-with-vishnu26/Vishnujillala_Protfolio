
import { motion } from "framer-motion";
import SkillSphere from "./SkillSphere";

const Skills = () => {
  const skills = [
    { name: "Python", level: 90, color: "#3776ab" },
    { name: "JavaScript", level: 85, color: "#f7df1e" },
    { name: "Java", level: 80, color: "#ed8b00" },
    { name: "React.js", level: 85, color: "#61dafb" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "Express.js", level: 75, color: "#000000" },
    { name: "MongoDB", level: 75, color: "#47a248" },
    { name: "MySQL", level: 70, color: "#4479a1" },
    { name: "Docker", level: 70, color: "#2496ed" },
    { name: "Machine Learning", level: 75, color: "#ff6f00" },
    { name: "TensorFlow", level: 65, color: "#ff6f00" },
    { name: "Blockchain", level: 70, color: "#f7931a" },
  ];

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-white">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <SkillSphere />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
