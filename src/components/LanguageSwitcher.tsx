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
    <div className="relative w-full">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-3 bg-transparent rounded-2xl border border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-2">
          <Globe size={16} className="text-gray-300" />
          <span className="text-sm font-medium text-gray-300">
            {currentLanguage?.flag} {currentLanguage?.name}
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
              className="fixed inset-0 z-[99998]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-slate-900/98 via-purple-900/95 to-slate-900/98 backdrop-blur-xl rounded-2xl border border-purple-400/30 shadow-2xl overflow-hidden z-[99999] w-[340px] max-h-[500px] overflow-y-auto"
            >
              <div className="p-4">
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