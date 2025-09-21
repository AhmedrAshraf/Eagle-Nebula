import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { AlertCircle } from 'lucide-react';

const ContentAvailabilityIndicator: React.FC = () => {
  const { currentLanguage, content, loading } = useLanguage();

  // Don't show indicator while loading
  if (loading) {
    return null;
  }

  // Check if we have any content for the current language
  const hasContent = Object.keys(content).length > 0;

  if (!hasContent) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-yellow-500/90 backdrop-blur-md rounded-lg border border-yellow-400/50 text-white p-3 shadow-lg max-w-xs">
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium">
              {currentLanguage === 'ar' 
                ? 'لا يوجد محتوى باللغة العربية' 
                : 'No content available in English'
              }
            </p>
            <p className="text-yellow-100 mt-1">
              {currentLanguage === 'ar' 
                ? 'يرجى التبديل إلى اللغة الإنجليزية أو إضافة محتوى باللغة العربية' 
                : 'Please switch to Arabic or add English content'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ContentAvailabilityIndicator;
