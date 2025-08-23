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

          {/* Right aligned Glassmorphism Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                       shadow-lg hover:bg-white/20 transition duration-300"
          >
            {isOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <MoreHorizontal size={26} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-black/90 backdrop-blur-md border-t border-white/10"
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md 
                           text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
