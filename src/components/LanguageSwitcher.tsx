import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages = [
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi' as Language, name: 'हिंदी', flag: '🇮🇳' },
  { code: 'te' as Language, name: 'తెలుగు', flag: '🇮🇳' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-6 py-3 bg-transparent text-white rounded-2xl border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-2">
          <Globe size={16} className="text-gray-300" />
          <span className="text-sm font-medium text-gray-300">
            {currentLanguage?.flag}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={14} className="text-gray-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to close dropdown when clicking outside */}
            <div 
              className="fixed inset-0 z-[999998] bg-black/30 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-900/98 via-purple-900/95 to-slate-900/98 backdrop-blur-xl rounded-2xl border border-purple-400/30 shadow-2xl z-[999999] w-[360px] max-w-[90vw]"
              style={{ maxHeight: 'min(600px, 85vh)' }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-purple-400/20">
                <h3 className="text-lg font-semibold text-white">Select Language</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-y-auto p-4" style={{ maxHeight: 'min(500px, 70vh)' }}>
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-5 py-4 text-left hover:bg-purple-500/20 transition-all duration-200 flex items-center space-x-4 rounded-xl mb-2 ${
                      language === lang.code ? 'bg-purple-500/30 text-cyan-300 border border-purple-400/40' : 'text-white border border-transparent'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="text-lg font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;