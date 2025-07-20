import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const RotatingText3D = () => {
  const roles = ["Problem Solver", "AI/ML Enthusiast", "Developer", "Aspiring Full Stack Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setKey(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRoleClick = () => {
    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    setKey(prev => prev + 1);
  };

  return (
    <div 
      className="text-xl md:text-2xl max-w-2xl mx-auto cursor-pointer perspective-1000"
      onClick={handleRoleClick}
      style={{ perspective: "1000px" }}
    >
      <div className="relative inline-block preserve-3d">
        <span className="text-gray-400">&lt; </span>
        
        <div className="inline-block relative">
          <AnimatePresence mode="wait">
            <motion.span
              key={key}
              initial={{ 
                rotateY: 90,
                opacity: 0
              }}
              animate={{ 
                rotateY: 0,
                opacity: 1
              }}
              exit={{ 
                rotateY: -90,
                opacity: 0
              }}
              transition={{
                duration: 0.6,
                ease: "easeInOut"
              }}
              className="text-cyan-400 font-semibold inline-block"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              {roles[currentRoleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
        
        <span className="text-gray-400"> /&gt;</span>
      </div>
    </div>
  );
};

export default RotatingText3D;