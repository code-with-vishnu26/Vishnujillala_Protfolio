import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#professional-journey" },
    { name: "Certifications", href: "#certifications" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 w-full px-6">
          {/* Left aligned Portfolio text */}
          <motion.a
            href="#home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 
                       bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
          >
            Portfolio
          </motion.a>

          {/* Right aligned Neon Glow Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full border border-purple-400 text-purple-400 
                       hover:text-white hover:bg-purple-500 hover:shadow-[0_0_15px_#a855f7] 
                       transition-all duration-300"
          >
            {isOpen ? <X size={22} /> : <MoreHorizontal size={26} />}
          </button>
        </div>
      </div>

      {/* Right Side Floating Neon Buttons */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          className="fixed top-20 right-5 flex flex-col space-y-4 z-40"
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-white font-medium 
                         rounded-full border-2 border-transparent 
                         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                         shadow-lg hover:shadow-[0_0_20px_#a855f7] 
                         transition-all duration-300"
            >
              {item.name}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
