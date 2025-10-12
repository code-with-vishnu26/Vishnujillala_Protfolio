import { useState, useEffect } from "react";
import { Menu, Home, User, FolderOpen, Briefcase, Award, FileText, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { key: "nav.home", value: "Home" },
    { key: "nav.about", value: "About" },
    { key: "nav.projects", value: "Projects" },
    { key: "nav.journey", value: "Journey" },
    { key: "nav.certifications", value: "Certifications" },
    { key: "nav.resume", value: "Resume" },
    { key: "nav.contact", value: "Contact" },
  ];

  const handleNavClick = (item: string) => {
    setIsOpen(false); // Close menu after clicking
    
    if (item === "Resume") {
      // Download resume
      window.open("https://drive.google.com/uc?export=download&id=1tzCxxKywTCItE8WycimCWmbHQXDnHC0p", "_blank");
      return;
    }
    
    // Map menu items to section IDs
    const sectionMap: { [key: string]: string } = {
      "Home": "hero",
      "About": "about", 
      "Projects": "projects",
      "Journey": "professional-journey",
      "Certifications": "certifications",
      "Contact": "contact"
    };
    
    const targetId = sectionMap[item];
    if (targetId === "hero") {
      // Scroll to top for Home
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (targetId) {
      // Smooth scroll to section
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-xl shadow-2xl shadow-purple-500/30 border-b border-purple-500/20" 
          : "bg-gradient-to-r from-black/60 via-purple-900/40 to-black/60 backdrop-blur-sm"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo / Brand */}
        <motion.button 
          className="px-6 py-3 text-white ml-8 cursor-pointer relative group bg-transparent rounded-2xl border border-transparent hover:border-white/30 transition-all duration-300"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Portfolio</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </motion.button>

        {/* Menu Items show when Menu is clicked - now inline */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ 
              opacity: isOpen ? 1 : 0, 
              x: isOpen ? 0 : 20,
              scale: isOpen ? 1 : 0.9
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-row gap-3 bg-gradient-to-r from-slate-800/90 via-purple-800/80 to-slate-800/90 px-6 py-3 rounded-2xl backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/20`}
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => handleNavClick(item.value)}
                className="px-4 py-2 text-sm font-medium text-white hover:text-cyan-300 rounded-xl transition-all duration-300 hover:bg-purple-500/20 border border-transparent hover:border-purple-400/50 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{t(item.key)}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </motion.div>

        {/* Menu Button */}
        <div className="flex items-center gap-3">
          {/* Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="px-6 py-3 bg-transparent text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/30 hover:border-white/50 relative group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Menu
              <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}></div>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <LanguageSwitcher />
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
