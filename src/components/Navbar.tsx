import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
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
    "Home",
    "About",
    "Projects",
    "Experience",
    "Certifications",
    "Resume",
    "Contact",
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "bg-white/90 shadow-lg backdrop-blur-md" : "bg-white/70"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-600">My Portfolio</h1>

        {/* Menu Button (always visible) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 font-semibold px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition"
        >
          Menu
        </button>
      </div>

      {/* Menu Items show when Menu is clicked */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-row justify-center gap-6 py-4 bg-white/95 backdrop-blur-md shadow-md`}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="px-4 py-2 text-lg font-semibold text-gray-800 
              hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600 
              rounded-xl shadow-sm hover:shadow-lg transition transform hover:scale-105"
          >
            {item}
          </button>
        ))}
      </motion.div>
    </nav>
  );
};

export default Navbar;
