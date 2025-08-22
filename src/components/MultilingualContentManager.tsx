import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentService } from '../services/contentService';
import { Save, Globe, Edit3, Check, X } from 'lucide-react';

interface ContentField {
  section: string;
  field: string;
  value: string;
}

const MultilingualContentManager: React.FC = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [content, setContent] = useState<Record<string, any>>({});
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, [currentLanguage]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const fetchedContent = await ContentService.fetchAllContent(currentLanguage);
      setContent(fetchedContent);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (section: string, field: string, value: string) => {
    setEditingField(`${section}.${field}`);
    setEditValue(value);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveField = async () => {
    if (!editingField) return;

    const [section, field] = editingField.split('.');
    setSaving(true);

    try {
      await ContentService.updateContent(section, field, editValue, currentLanguage);
      
      // Update local state
      setContent(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: editValue
        }
      }));

      setEditingField(null);
      setEditValue('');
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      saveField();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Multilingual Content Manager</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe size={20} />
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-2"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {Object.entries(content).map(([section, fields]) => (
            <div key={section} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {section.replace('-', ' ')}
              </h2>
              <div className="space-y-4">
                {Object.entries(fields as Record<string, string>).map(([field, value]) => {
                  const fieldKey = `${section}.${field}`;
                  const isEditing = editingField === fieldKey;

                  return (
                    <div key={field} className="border border-gray-700 rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-300 capitalize">
                          {field.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        {!isEditing && (
                          <button
                            onClick={() => startEditing(section, field, value)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            <Edit3 size={16} />
                          </button>
                        )}
                      </div>
                      
                      {isEditing ? (
                        <div className="space-y-2">
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-full bg-gray-700 border border-gray-600 rounded p-3 text-white resize-y min-h-[100px]"
                            placeholder="Enter content..."
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={saveField}
                              disabled={saving}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded disabled:opacity-50"
                            >
                              <Check size={16} />
                              {saving ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                            >
                              <X size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-700 rounded p-3 whitespace-pre-wrap">
                          {value}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultilingualContentManager;
