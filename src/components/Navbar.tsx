import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "bg-white/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-gray-800">My Portfolio</h1>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-800"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu (hidden on mobile) */}
        <div className="hidden md:flex gap-8">
          {["Home", "About", "Projects", "Experience", "Certifications", "Resume", "Contact"].map(
            (item, index) => (
              <button
                key={index}
                className="text-gray-800 hover:text-blue-600 transition font-medium"
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Mobile Menu Sliding In */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="absolute top-0 right-0 w-full bg-white/90 backdrop-blur-md p-6 flex flex-row gap-6 justify-center items-center md:hidden shadow-lg"
      >
        {["Home", "About", "Projects", "Experience", "Certifications", "Resume", "Contact"].map(
          (item, index) => (
            <button
              key={index}
              className="text-gray-800 font-medium hover:text-blue-600 transition"
            >
              {item}
            </button>
          )
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
