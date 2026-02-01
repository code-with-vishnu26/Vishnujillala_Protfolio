import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FloatingCube from "./FloatingCube";
import RotatingText3D from "./RotatingText3D";
import { useLanguage } from "@/contexts/LanguageContext";
const Hero = () => {
  const { t } = useLanguage();
  
  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingCube />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} className="space-y-6 text-left">
            <motion.h2 className="text-2xl md:text-3xl font-medium text-gray-300" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.2,
            duration: 0.8
          }}>{t('hero.greeting')}</motion.h2>
            
            <motion.h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" initial={{
            scale: 0.5
          }} animate={{
            scale: 1
          }} transition={{
            duration: 0.8,
            type: "spring"
          }}>
              {t('hero.name')}
            </motion.h1>
            
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} className="text-left">
              <RotatingText3D />
            </motion.div>
            
            <motion.p className="text-lg text-gray-400 max-w-2xl" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8,
            duration: 0.8
          }}>
              {t('hero.tagline')}
            </motion.p>
            
            <motion.div className="flex gap-4 mt-8" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 1,
            duration: 0.8
          }}>
              <a href="#professional-journey" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                {t('hero.viewWork')}
              </a>
              <a href="#contact" className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 text-white">
                {t('hero.contactMe')}
              </a>
              <a href="https://drive.google.com/uc?export=download&id=1LnZTFVzXaXV0IF8h0rPkJU_Rol5bRrrf" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-gray-400 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                {t('hero.downloadResume')}
              </a>
            </motion.div>
          </motion.div>
          
          {/* Right side - Image/Visual content */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-96 h-80 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur-3xl absolute inset-0"></div>
              <div className="w-80 h-96 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl relative z-10 flex items-center justify-center text-8xl font-bold text-white shadow-2xl my-0 px-0 py-0 mx-[81px]">
                VJ
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" animate={{
      y: [0, 10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity
    }}>
        <ChevronDown size={32} className="text-gray-400" />
      </motion.div>
    </section>;
};
export default Hero;