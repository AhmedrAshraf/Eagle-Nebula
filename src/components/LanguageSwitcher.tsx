import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ContentService } from '../services/contentService';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['en']);

  useEffect(() => {
    const loadAvailableLanguages = async () => {
      const languages = await ContentService.getAvailableLanguages();
      setAvailableLanguages(languages.length > 0 ? languages : ['en']);
    };
    loadAvailableLanguages();
  }, []);

  const toggleLanguage = async () => {
    const newLang = currentLanguage === 'en' ? 'ar' : 'en';
    if (availableLanguages.includes(newLang)) {
      await changeLanguage(newLang);
    }
  };

  const targetLang = currentLanguage === 'en' ? 'AR' : 'ENG';

  // Only show switcher if there are multiple languages available
  if (availableLanguages.length < 2) {
    return null;
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200 shadow-lg"
      title={currentLanguage === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      <Globe size={16} />
      <span className="font-medium">{targetLang}</span>
    </button>
  );
};

export default LanguageSwitcher;
