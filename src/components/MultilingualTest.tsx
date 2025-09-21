import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../hooks/useLanguage';

const MultilingualTest: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, getContent, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Multilingual Test Page</h1>
        
        <div className="grid gap-8">
          {/* Language Info */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Language Information</h2>
            <div className="space-y-2">
              <p><strong>Current Language:</strong> {currentLanguage}</p>
              <p><strong>Direction:</strong> {isRTL ? 'RTL (Right-to-Left)' : 'LTR (Left-to-Right)'}</p>
              <p><strong>Document Direction:</strong> {document.documentElement.dir}</p>
            </div>
          </div>

          {/* Translation Test */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Translation Test (i18n)</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Hero Section:</h3>
                <p className="text-gray-300">{t('hero.title')}</p>
                <p className="text-gray-300">{t('hero.subtitle')}</p>
              </div>
              <div>
                <h3 className="font-medium">Navigation:</h3>
                <p className="text-gray-300">{t('navigation.home')} | {t('navigation.resources')} | {t('navigation.blogs')}</p>
              </div>
              <div>
                <h3 className="font-medium">Common:</h3>
                <p className="text-gray-300">{t('common.loading')} | {t('common.error')} | {t('common.back')}</p>
              </div>
            </div>
          </div>

          {/* Database Content Test */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Database Content Test</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Hero Section (from DB):</h3>
                <p className="text-gray-300">{getContent('hero', 'title')}</p>
                <p className="text-gray-300">{getContent('hero', 'subtitle')}</p>
              </div>
              <div>
                <h3 className="font-medium">Who We Are (from DB):</h3>
                <p className="text-gray-300">{getContent('who-we-are', 'title')}</p>
              </div>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Language Controls</h2>
            <div className="flex gap-4">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-4 py-2 rounded ${currentLanguage === 'en' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('ar')}
                className={`px-4 py-2 rounded ${currentLanguage === 'ar' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-700'}`}
              >
                العربية
              </button>
            </div>
          </div>

          {/* RTL Test */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">RTL Layout Test</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-700 rounded">
                <span>Left Item</span>
                <span>Right Item</span>
              </div>
              <div className="text-right">
                <p>This text should be right-aligned in RTL mode</p>
              </div>
              <div className="text-left">
                <p>This text should be left-aligned in RTL mode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultilingualTest;
