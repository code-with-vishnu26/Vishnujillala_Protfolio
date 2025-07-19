import { motion } from "framer-motion";
import { useState } from "react";

const TechnicalSkills = () => {
  const [activeCategory, setActiveCategory] = useState("Programming");

  const categories = [
    "Programming",
    "Web Development", 
    "Databases",
    "AI & ML",
    "Tools"
  ];

  const skillsData = {
    Programming: [
      { name: "Python", level: 90, color: "#3776ab" },
      { name: "JavaScript", level: 85, color: "#f7df1e" },
      { name: "Java", level: 75, color: "#ed8b00" },
      { name: "PHP", level: 65, color: "#777bb4" },
    ],
    "Web Development": [
      { name: "React.js", level: 85, color: "#61dafb" },
      { name: "Node.js", level: 80, color: "#339933" },
      { name: "Express.js", level: 75, color: "#000000" },
      { name: "HTML/CSS", level: 90, color: "#e34f26" },
    ],
    Databases: [
      { name: "MongoDB", level: 75, color: "#47a248" },
      { name: "MySQL", level: 70, color: "#4479a1" },
      { name: "Firebase", level: 80, color: "#ffca28" },
    ],
    "AI & ML": [
      { name: "TensorFlow", level: 65, color: "#ff6f00" },
      { name: "Scikit-learn", level: 70, color: "#f7931e" },
      { name: "NLP", level: 75, color: "#4285f4" },
    ],
    Tools: [
      { name: "Docker", level: 70, color: "#2496ed" },
      { name: "Git", level: 85, color: "#f05032" },
      { name: "Postman", level: 80, color: "#ff6c37" },
    ]
  };

  const CircularProgress = ({ skill, index }: { skill: any; index: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center space-y-3"
      >
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="rgb(55, 65, 81)"
              strokeWidth="8"
              fill="transparent"
              className="opacity-20"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke={skill.color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="drop-shadow-lg"
              style={{
                filter: `drop-shadow(0 0 6px ${skill.color}40)`
              }}
            />
          </svg>
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              viewport={{ once: true }}
              className="text-lg font-bold text-white"
            >
              {skill.level}%
            </motion.span>
          </div>
        </div>
        <span className="text-sm font-medium text-gray-300 text-center">
          {skill.name}
        </span>
      </motion.div>
    );
  };

  return (
    <section className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center"
        >
          {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => (
            <CircularProgress key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;