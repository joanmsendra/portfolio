import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.header.home, href: "#home" },
    { name: t.header.about, href: "#about" },
    { name: t.header.skills, href: "#skills" },
    { name: t.header.projects, href: "#projects" },
    { name: t.header.contact, href: "#contact" },
  ];

  const cycleLanguage = () => {
    if (language === 'en') setLanguage('es');
    else if (language === 'es') setLanguage('ca');
    else setLanguage('en');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
        isScrolled
          ? "bg-card/80 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-gradient-to-b from-black/70 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-2xl font-bold gradient-text">
            JM
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium smooth-transition relative group ${
                  isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary smooth-transition group-hover:w-full" />
              </a>
            ))}

            {/* Language Switcher */}
            <button 
              onClick={cycleLanguage}
              className={`flex items-center gap-2 px-3 py-1 rounded-full border smooth-transition text-sm font-medium ${
                isScrolled 
                  ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20" 
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={cycleLanguage}
              className="text-foreground hover:text-primary smooth-transition font-bold text-sm flex items-center gap-1"
            >
              {language.toUpperCase()}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary smooth-transition"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 py-4 border-t border-border"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-muted-foreground hover:text-foreground smooth-transition"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};
