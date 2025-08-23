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
        scrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-gray-800">My Portfolio</h1>

        {/* Menu Button (always visible) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 font-semibold px-4 py-2 hover:text-blue-600 transition"
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
        } flex-row justify-center gap-6 py-4 bg-white/90 backdrop-blur-md shadow-md`}
      >
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="text-gray-800 font-medium hover:text-blue-600 transition"
          >
            {item}
          </button>
        ))}
      </motion.div>
    </nav>
  );
};

export default Navbar;
