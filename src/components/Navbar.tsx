import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, User, Code, Briefcase, Award, FileText, Mail } from "lucide-react";
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
  const navItems = [{
    name: "Home",
    href: "#home",
    icon: Home
  }, {
    name: "About",
    href: "#about",
    icon: User
  }, {
    name: "Projects",
    href: "#projects",
    icon: Briefcase
  }, {
    name: "Experience",
    href: "#professional-journey",
    icon: Code
  }, {
    name: "Certifications",
    href: "#certifications",
    icon: Award
  }, {
    name: "Resume",
    href: "#resume",
    icon: FileText
  }, {
    name: "Contact",
    href: "#contact",
    icon: Mail
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          <motion.a href="#home" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.2
        }} className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200">
            Portfolio
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => <motion.a key={item.name} href={item.href} initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1 * index
            }} className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10">
                  {item.name}
                </motion.a>)}
            </div>
          </div>

          {/* Mobile menu button - positioned at top-right */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: "auto"
    }} exit={{
      opacity: 0,
      height: 0
    }} className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => {
          const Icon = item.icon;
          return <a key={item.name} href={item.href} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <Icon size={20} />
                  <span>{item.name}</span>
                </a>;
        })}
          </div>
        </motion.div>}
    </motion.nav>;
};
export default Navbar;