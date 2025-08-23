import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentService } from '../services/contentService';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  content: Record<string, any>;
  loading: boolean;
  getContent: (section: string, field: string, fallback?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');
  const [content, setContent] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        console.log('LanguageProvider: Loading content for language:', currentLanguage);
        const fetchedContent = await ContentService.fetchAllContent(currentLanguage);
        console.log('LanguageProvider: Fetched content:', fetchedContent);
        setContent(fetchedContent);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentLanguage]);

  const changeLanguage = async (language: string) => {
    // Update i18n and document properties first
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Then update the language state (this will trigger useEffect to load content)
    setCurrentLanguage(language);
  };

  const getContent = (section: string, field: string, fallback?: string) => {
    const contentValue = content[section]?.[field];
    if (contentValue) {
      return contentValue;
    }
    
    // If no content exists for this language, show a message
    if (currentLanguage === 'ar') {
      return fallback || 'لا يوجد محتوى باللغة العربية';
    } else {
      return fallback || 'No content available in English';
    }
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    content,
    loading,
    getContent,
    isRTL: currentLanguage === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
