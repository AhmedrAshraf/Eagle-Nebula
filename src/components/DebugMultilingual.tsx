import React, { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ContentService } from '../services/contentService';

const DebugMultilingual: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (language: string) => {
    setLoading(true);
    setError(null);
    try {
      const contentData = await ContentService.fetchAllContent(language);
      setContent(contentData);
      console.log(`Content for ${language}:`, contentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error(`Error fetching content for ${language}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent(currentLanguage);
  }, [currentLanguage]);

  const testLanguageSwitch = async (language: string) => {
    console.log(`Switching to ${language}`);
    changeLanguage(language);
  };

  const checkAvailableLanguages = async () => {
    try {
      const languages = await ContentService.getAvailableLanguages();
      console.log('Available languages:', languages);
      alert(`Available languages: ${languages.join(', ')}`);
    } catch (err) {
      console.error('Error checking languages:', err);
    }
  };

  return (
    <div className="fixed top-20 right-4 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-white text-sm max-w-md z-50">
      <h3 className="font-bold mb-2">🔍 Multilingual Debug</h3>
      
      <div className="mb-3">
        <p><strong>Current Language:</strong> {currentLanguage}</p>
        <p><strong>Document Direction:</strong> {document.documentElement.dir}</p>
      </div>

      <div className="mb-3 space-y-1">
        <button 
          onClick={() => testLanguageSwitch('en')}
          className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs mr-2"
        >
          Switch to English
        </button>
        <button 
          onClick={() => testLanguageSwitch('ar')}
          className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
        >
          Switch to Arabic
        </button>
      </div>

      <div className="mb-3">
        <button 
          onClick={checkAvailableLanguages}
          className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs"
        >
          Check Available Languages
        </button>
      </div>

      {loading && <p className="text-yellow-400">Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {content && (
        <div className="mt-3">
          <p className="font-bold mb-1">Content Preview:</p>
          <div className="bg-gray-800 p-2 rounded text-xs max-h-32 overflow-y-auto">
            <pre>{JSON.stringify(content, null, 2)}</pre>
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-400">
        <p>Hero Title: {content?.hero?.title || 'Not found'}</p>
        <p>Hero Subtitle: {content?.hero?.subtitle || 'Not found'}</p>
      </div>
    </div>
  );
};

export default DebugMultilingual;
