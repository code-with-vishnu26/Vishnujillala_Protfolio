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
        scrolled ? "bg-background/90 shadow-lg backdrop-blur-md border-b border-border" : "bg-background/70"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-primary">Portfolio</h1>

        {/* Menu Items show when Menu is clicked - now inline */}
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className={`${
              isOpen ? "flex" : "hidden"
            } flex-row gap-4`}
          >
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-accent rounded-md transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>

          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
