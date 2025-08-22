import { useState, useEffect } from 'react';
import { StarField } from './components/StarField';
import { Design4 } from './components/designs/Design4';
import { ResourcesPage } from './components/ResourcesPage';
import { BlogsPage } from './components/BlogsPage';
import LanguageSwitcher from './components/LanguageSwitcher';
import ContentAvailabilityIndicator from './components/ContentAvailabilityIndicator';
import { LanguageProvider } from './contexts/LanguageContext';
import './i18n';

type CurrentPage = 'home' | 'resources' | 'blogs';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  useEffect(() => {
    // Set initial document direction based on language
    const savedLanguage = localStorage.getItem('i18nextLng') || 'en';
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const navigateToResources = () => {
    setCurrentPage('resources');
  };

  const navigateToBlogs = () => {
    setCurrentPage('blogs');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <LanguageProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <StarField intensity="low" meteors={true} />
        <LanguageSwitcher />
        <ContentAvailabilityIndicator />
        {currentPage === 'home' && (
          <Design4 
            onNavigateToResources={navigateToResources}
            onNavigateToBlogs={navigateToBlogs}
          />
        )}
        {currentPage === 'resources' && (
          <ResourcesPage 
            onBack={navigateToHome} 
            onNavigateToBlogs={navigateToBlogs}
          />
        )}
        {currentPage === 'blogs' && (
          <BlogsPage 
            onBack={navigateToHome} 
            onNavigateToResources={navigateToResources}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;