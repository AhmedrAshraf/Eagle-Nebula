import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Star, Zap, Edit3, Save, X, Menu, ChevronDown, Twitter, Linkedin, Youtube, Settings, Lock, RotateCcw, LogOut, Plus, Trash2, FileText, Upload, Download, ExternalLink, MessageCircle, ArrowLeft } from 'lucide-react';
import { ContentService, ResourceCard } from '../services/contentService';
import { useLanguage } from '../hooks/useLanguage';
import { supabase } from '../lib/supabase';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  buttonText: string;
  buttonAction: 'download' | 'assessment' | 'community';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}

interface EditableContent {
  heroTitle: string;
  heroDescription: string;
  resourcesTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaApplyButton: string;
  ctaLearnButton: string;
  footerCopyright: string;
  footerBlogsButton: string;
}

// Stable input components defined outside to prevent recreation on every render
const EditableInput = React.memo<{
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  textColor?: string;
}>(({ value, onChange, className = '', placeholder = '', textColor = 'text-white' }) => {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-2 ${textColor} placeholder-white/50`}
      placeholder={placeholder}
    />
  );
});

const EditableTextarea = React.memo<{
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  textColor?: string;
}>(({ value, onChange, className = '', placeholder = '', textColor = 'text-white' }) => {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-3 resize-none ${textColor} placeholder-white/50`}
      placeholder={placeholder}
      rows={4}
      style={{ minHeight: '100px' }}
    />
  );
});

export const ResourcesPage: React.FC<{ 
  onBack: () => void;
  onNavigateToBlogs: () => void;
}> = ({ onBack, onNavigateToBlogs }) => {
  const { currentLanguage } = useLanguage();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSecretButton, setShowSecretButton] = useState(false);
  const [originalContent, setOriginalContent] = useState<EditableContent | null>(null);

  // Check for cached admin login on component mount
  useEffect(() => {
    const cachedAdmin = localStorage.getItem('eagleNebulaAdmin');
    if (cachedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const [content, setContent] = useState<EditableContent>({
    heroTitle: '',
    heroDescription: '',
    resourcesTitle: '',
    ctaTitle: '',
    ctaDescription: '',
    ctaApplyButton: '',
    ctaLearnButton: '',
    footerCopyright: '',
    footerBlogsButton: ''
  });

  const [resourceCards, setResourceCards] = useState<ResourceCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingResourceId, setUploadingResourceId] = useState<string | null>(null);
  const [resourceFiles, setResourceFiles] = useState<Record<string, { url: string; fileName: string; fileSize: string }>>({});

  // Fetch content and resource cards from database on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch both content and resource cards in parallel
        const [contentMap, files] = await Promise.all([
          ContentService.fetchAllContent(currentLanguage),
          ContentService.getResourceFiles()
        ]);
        
        // Initialize resource cards if they don't exist
        await ContentService.initializeResourceCards();
        
        // Fetch resource cards after initialization
        const cards = await ContentService.getResourceCards(currentLanguage);
        
        // Transform database content to component format
        const transformedContent: EditableContent = {
          heroTitle: contentMap.resources?.heroTitle || '',
          heroDescription: contentMap.resources?.heroDescription || '',
          resourcesTitle: contentMap.resources?.resourcesTitle || '',
          ctaTitle: contentMap.resources?.ctaTitle || '',
          ctaDescription: contentMap.resources?.ctaDescription || '',
          ctaApplyButton: contentMap.resources?.ctaApplyButton || '',
          ctaLearnButton: contentMap.resources?.ctaLearnButton || '',
          footerCopyright: contentMap.resources?.footerCopyright || '',
          footerBlogsButton: contentMap.resources?.footerBlogsButton || ''
        };
        
        setContent(transformedContent);
        setResourceCards(cards);
        setResourceFiles(files);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Initialize default content if fetch fails
        await ContentService.initializeDefaultContent();
        // Retry fetch
        const [contentMap, cards, files] = await Promise.all([
          ContentService.fetchAllContent(currentLanguage),
          ContentService.getResourceCards(currentLanguage),
          ContentService.getResourceFiles()
        ]);
        // ... same transformation logic
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentLanguage]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: 'business-framework',
      title: 'Business Design Framework',
      description: 'Our complete framework for designing your business around your unique founder profile. Includes detailed worksheets, step-by-step guides, and AI prompts to help you discover your sweet spot.',
      icon: Star,
      buttonText: 'Download Framework',
      buttonAction: 'download'
    },
    {
      id: 'ai-toolkit',
      title: 'AI Co-Builder Toolkit',
      description: 'Essential AI tools and prompts for market research, content creation, business validation, and operations. Save months of work with our curated collection of AI assistants.',
      icon: Star,
      buttonText: 'Get Toolkit',
      buttonAction: 'download'
    },
    {
      id: 'founder-assessment',
      title: 'Founder Fit Assessment',
      description: 'Discover your unique founder profile with our comprehensive assessment. Understand your strengths, work style, and ideal business model before you build.',
      icon: Rocket,
      buttonText: 'Take Assessment',
      buttonAction: 'assessment'
    },
    {
      id: 'validation-checklist',
      title: 'Startup Validation Checklist',
      description: 'Step-by-step checklist to validate your business idea before you invest significant time and money. Avoid common pitfalls and build with confidence.',
      icon: Edit3,
      buttonText: 'Download Checklist',
      buttonAction: 'download'
    },
    {
      id: 'market-insights',
      title: 'Saudi Market Insights Report',
      description: 'Exclusive insights into the Saudi startup ecosystem, emerging trends, funding landscape, and opportunities. Stay ahead of the curve.',
      icon: Star,
      buttonText: 'Download Report',
      buttonAction: 'download'
    },
    {
      id: 'pitch-template',
      title: 'Investor Pitch Template',
      description: 'Professional pitch deck template specifically designed for passionate entrepreneurs. Includes storytelling frameworks and design guidelines.',
      icon: Star,
      buttonText: 'Download Template',
      buttonAction: 'download'
    },
    {
      id: 'financial-model',
      title: 'Financial Planning Model',
      description: 'Comprehensive Excel/Google Sheets financial model template for startups. Includes revenue projections, cash flow, and scenario planning.',
      icon: Edit3,
      buttonText: 'Download Model',
      buttonAction: 'download'
    },
    {
      id: 'community-access',
      title: 'Exclusive Community Access',
      description: 'Join our private community of passionate Saudi entrepreneurs, seasoned coaches, and successful operators. Network, learn, and grow together.',
      icon: Rocket,
      buttonText: 'Join Community',
      buttonAction: 'community'
    }
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;

      const scrolled = window.pageYOffset;
      const parallaxElements = parallaxRef.current.querySelectorAll('[data-speed]');

      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContentChange = React.useCallback((field: keyof EditableContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  }, []);



  const handleStartEditing = React.useCallback(() => {
    setOriginalContent(content);
    setIsEditing(true);
  }, [content]);

  const handleDiscardChanges = React.useCallback(() => {
    if (originalContent) {
      setContent(originalContent);
    }
    setIsEditing(false);
  }, [originalContent]);

  const handleSaveChanges = React.useCallback(async () => {
    try {
      setIsSaving(true);
      
      // Prepare updates for database
      const updates = [
        { section: 'resources', field: 'heroTitle', value: content.heroTitle },
        { section: 'resources', field: 'heroDescription', value: content.heroDescription },
        { section: 'resources', field: 'resourcesTitle', value: content.resourcesTitle },
        { section: 'resources', field: 'ctaTitle', value: content.ctaTitle },
        { section: 'resources', field: 'ctaDescription', value: content.ctaDescription },
        { section: 'resources', field: 'ctaApplyButton', value: content.ctaApplyButton },
        { section: 'resources', field: 'ctaLearnButton', value: content.ctaLearnButton },
        { section: 'resources', field: 'footerCopyright', value: content.footerCopyright },
        { section: 'resources', field: 'footerBlogsButton', value: content.footerBlogsButton }
      ];

      await ContentService.updateMultipleContent(updates);
      setIsEditing(false);
      setOriginalContent(null);
      
      // Show success message
      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Error saving content. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [content]);

  const handleFileUpload = React.useCallback(async (resourceId: string, file: File) => {
    try {
      setIsUploading(true);
      setUploadingResourceId(resourceId);

      // Upload file to Supabase Storage
      const fileInfo = await ContentService.uploadFile(file, resourceId);
      
      // Save file information to database
      await ContentService.saveResourceFile(resourceId, fileInfo);

      // Update the resource with file information
      setResourceFiles(prev => ({
        ...prev,
        [resourceId]: {
          url: fileInfo.url,
          fileName: fileInfo.fileName,
          fileSize: fileInfo.fileSize
        }
      }));

      alert(`File "${file.name}" uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadingResourceId(null);
    }
  }, []);

  const handleFileSelect = React.useCallback((resourceId: string) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('data-resource-id', resourceId);
      fileInputRef.current.click();
    }
  }, []);

  const handleFileInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const resourceId = event.target.getAttribute('data-resource-id');
    
    if (file && resourceId) {
      handleFileUpload(resourceId, file);
    }
    
    // Reset input
    event.target.value = '';
  }, [handleFileUpload]);

  const handleRemoveFile = React.useCallback(async (resourceId: string) => {
    try {
      const fileInfo = resourceFiles[resourceId];
      if (fileInfo) {
        // Remove from Supabase Storage
        const timestamp = fileInfo.fileName.split('_')[1]?.split('.')[0];
        const fileExtension = fileInfo.fileName.split('.').pop();
        const storageFileName = `${resourceId}_${timestamp}.${fileExtension}`;
        
        await ContentService.deleteFile(storageFileName);
      }

      // Remove from database
      const { error } = await supabase
        .from('resource_files')
        .delete()
        .eq('resource_id', resourceId);

      if (error) {
        console.error('Error removing file from database:', error);
      }

      // Update local state
      setResourceFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[resourceId];
        return newFiles;
      });

      alert('File removed successfully!');
    } catch (error) {
      console.error('Error removing file:', error);
      alert('Error removing file. Please try again.');
    }
  }, [resourceCards]);

  const handleResourceAction = (resource: ResourceCard) => {
    switch (resource.buttonAction) {
      case 'download':
        const fileInfo = resourceFiles[resource.id];
        if (fileInfo) {
          // Create a temporary link to download the file
          const link = document.createElement('a');
          link.href = fileInfo.url;
          link.download = fileInfo.fileName || 'download';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert(`No file uploaded for ${resource.title}. Please upload a file first.`);
        }
        break;
      case 'link':
        if (resource.buttonLink) {
          window.open(resource.buttonLink, '_blank');
        } else {
          alert(`No link provided for ${resource.title}.`);
        }
        break;
      case 'contact':
        // In a real app, this would open contact form or email
        alert(`Contacting about ${resource.title}...`);
        break;
    }
  };

  // Resource Cards Management
  const handleAddResourceCard = async () => {
    const newCard: Omit<ResourceCard, 'id' | 'created_at' | 'updated_at'> = {
      title: 'New Resource',
      description: 'Description of the new resource...',
      buttonText: 'Get Resource',
      buttonAction: 'no-action',
      order: resourceCards.length + 1
    };

    const addedCard = await ContentService.addResourceCard(newCard);
    if (addedCard) {
      setResourceCards(prev => [...prev, addedCard]);
    }
  };

  const handleDeleteResourceCard = async (id: string) => {
    const success = await ContentService.deleteResourceCard(id);
    if (success) {
      setResourceCards(prev => prev.filter(card => card.id !== id));
      // Also remove associated file if exists
      if (resourceFiles[id]) {
        await ContentService.deleteFile(resourceFiles[id].fileName);
        const newFiles = { ...resourceFiles };
        delete newFiles[id];
        setResourceFiles(newFiles);
      }
    }
  };

  const handleResourceChange = (id: string, field: keyof ResourceCard, value: string) => {
    setResourceCards(prev => 
      prev.map(card => 
        card.id === id ? { ...card, [field]: value } : card
      )
    );
  };

  const handleSaveResourceChanges = async () => {
    try {
      setIsSaving(true);
      
      // Save content changes
      const updates = [
        { section: 'resources', field: 'heroTitle', value: content.heroTitle },
        { section: 'resources', field: 'heroDescription', value: content.heroDescription },
        { section: 'resources', field: 'resourcesTitle', value: content.resourcesTitle },
        { section: 'resources', field: 'ctaTitle', value: content.ctaTitle },
        { section: 'resources', field: 'ctaDescription', value: content.ctaDescription },
        { section: 'resources', field: 'ctaApplyButton', value: content.ctaApplyButton },
        { section: 'resources', field: 'ctaLearnButton', value: content.ctaLearnButton },
        { section: 'resources', field: 'footerCopyright', value: content.footerCopyright },
        { section: 'resources', field: 'footerBlogsButton', value: content.footerBlogsButton }
      ];

      await ContentService.updateMultipleContent(updates);

      // Save resource card changes
      for (const card of resourceCards) {
        await ContentService.updateResourceCard(card.id, {
          title: card.title,
          description: card.description,
          buttonText: card.buttonText,
          buttonAction: card.buttonAction,
          buttonLink: card.buttonLink,
          icon: card.icon,
          category: card.category,
          order: card.order
        });
      }

      setIsEditing(false);
      setOriginalContent(null);
      
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading state while fetching content
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={parallaxRef} className="relative min-h-screen bg-black">
      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
      />

      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/50 z-10" />

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>

            <div className="text-white font-light text-xl tracking-wider">
              EAGLE NEBULA
            </div>

            <div className="flex items-center space-x-4">
                {isEditing ? (
                  <>
                  <button
                    onClick={handleDiscardChanges}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-400/30 hover:bg-red-500/30 transition-all duration-300"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Discard
                  </button>
                  <button
                    onClick={handleSaveResourceChanges}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </button>
                  </>
                ) : (
                <button
                  onClick={handleStartEditing}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                    <Edit3 className="w-4 h-4" />
                    Edit Content
                </button>
                )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-8 tracking-wide">
            {isEditing ? (
              <EditableInput
              value={content.heroTitle}
              onChange={(value) => handleContentChange('heroTitle', value)}
            />
            ) : (
              <span>{content.heroTitle}</span>
            )}
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-12">
            {isEditing ? (
              <EditableTextarea
              value={content.heroDescription}
              onChange={(value) => handleContentChange('heroDescription', value)}
              className="w-full"
            />
            ) : (
              <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                {content.heroDescription}
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight text-white mb-6 tracking-wide">
              {isEditing ? (
                <EditableInput
                value={content.resourcesTitle}
                onChange={(value) => handleContentChange('resourcesTitle', value)}
              />
              ) : (
                <span>{content.resourcesTitle}</span>
              )}
            </h2>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {resourceCards.map((resource) => {
              const isUploadingThis = isUploading && uploadingResourceId === resource.id;
              const hasFile = resourceFiles[resource.id];
              
              return (
                                 <div key={resource.id} className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group relative ${
                   resource.buttonAction === 'no-action' ? 'pb-8' : ''
                 }`}>
                   {/* Delete button for admin */}
                   {isEditing && (
                     <button
                       onClick={() => handleDeleteResourceCard(resource.id)}
                       className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
                       title="Delete resource"
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                   )}

                   <div className="text-center mb-6">
                     <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                       {resource.icon ? (
                         <span className="text-2xl">{resource.icon}</span>
                       ) : (
                         <Star className="w-8 h-8 text-white" />
                       )}
                     </div>
                     <h3 className="text-xl font-light text-white mb-4">
                       {isEditing ? (
                         <EditableInput
                           value={resource.title}
                           onChange={(value) => handleResourceChange(resource.id, 'title', value)}
                           className="w-full text-center"
                         />
                       ) : (
                         <span className="w-full text-center">{resource.title}</span>
                       )}
                     </h3>
                     <p className="text-white/70 leading-relaxed mb-6 h-40">
                       {isEditing ? (
                         <EditableTextarea
                           value={resource.description}
                           onChange={(value) => handleResourceChange(resource.id, 'description', value)}
                           className="w-full text-center"
                         />
                       ) : (
                         <span className="w-full text-center">{resource.description}</span>
                       )}
                     </p>
                   </div>

                  {/* File upload section for admin */}
                  {isEditing && resource.buttonAction === 'download' && (
                    <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
                      {hasFile ? (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-green-400 font-medium">{hasFile.fileName}</span>
                          </div>
                          <p className="text-xs text-white/60 mb-3">{hasFile.fileSize}</p>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleRemoveFile(resource.id)}
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-400/30 hover:bg-red-500/30 transition-all duration-300 text-xs"
                            >
                              <Trash2 className="w-3 h-3" />
                              Remove
                            </button>
                            <button
                              onClick={() => handleFileSelect(resource.id)}
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300 text-xs"
                            >
                              <Upload className="w-3 h-3" />
                              Replace
                            </button>
                          </div>
                        </div>
                      ) : (
                  <div className="text-center">
                          <p className="text-sm text-white/60 mb-3">No file uploaded</p>
                          <button
                            onClick={() => handleFileSelect(resource.id)}
                            disabled={isUploadingThis}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploadingThis ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                Upload File
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Button Action Type Selector for Admin */}
                  {isEditing && (
                    <div className="mb-4">
                      <select
                        value={resource.buttonAction}
                        onChange={(e) => handleResourceChange(resource.id, 'buttonAction', e.target.value as 'download' | 'link' | 'contact' | 'no-action')}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-2 text-white text-sm"
                      >
                        <option value="no-action">Select Option</option>
                        <option value="download">Download File</option>
                        <option value="link">External Link</option>
                        <option value="contact">Contact Us</option>
                      </select>
                      
                      {resource.buttonAction === 'link' && (
                        <input
                          type="text"
                          value={resource.buttonLink || ''}
                          onChange={(e) => handleResourceChange(resource.id, 'buttonLink', e.target.value)}
                          placeholder="Enter URL..."
                          className="w-full mt-2 bg-white/10 border border-white/20 rounded-lg p-2 text-white text-sm placeholder-white/50"
                        />
                      )}
                    </div>
                  )}

                  {/* Only show button if not 'no-action' */}
                  
                  {!!resource.buttonAction && (
                    <button
                      onClick={isEditing ? undefined : () => handleResourceAction(resource)}
                      className={`w-full bg-white text-black px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 font-medium ${
                        isEditing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                      }`}
                      disabled={isEditing}
                    >
                      {resource.buttonAction === 'download' && hasFile && <Download className="w-4 h-4" />}
                      {resource.buttonAction === 'link' && <ExternalLink className="w-4 h-4" />}
                      {resource.buttonAction === 'contact' && <MessageCircle className="w-4 h-4" />}
                      {isEditing ? (
                        <EditableInput
                          value={resource.buttonText}
                          onChange={(value) => handleResourceChange(resource.id, 'buttonText', value)}
                          className="inline text-black"
                          textColor="text-black"
                        />
                      ) : (
                        <span className="inline">{resource.buttonText}</span>
                      )}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Add New Resource Card Button */}
            {isEditing && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group border-dashed border-white/20 flex items-center justify-center min-h-[300px]">
                <button
                  onClick={handleAddResourceCard}
                  className="flex flex-col items-center gap-4 text-white/60 hover:text-white transition-colors"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <Plus className="w-8 h-8" />
                  </div>
                  <span className="text-lg font-light">Add New Resource</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8 tracking-wide">
            {isEditing ? (
              <EditableInput
                value={content.ctaTitle}
                onChange={(value) => handleContentChange('ctaTitle', value)}
              />
            ) : (
              <span>{content.ctaTitle}</span>
            )}
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
            {isEditing ? (
              <EditableTextarea
                value={content.ctaDescription}
                onChange={(value) => handleContentChange('ctaDescription', value)}
                className="w-full"
              />
            ) : (
              <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                {content.ctaDescription}
              </span>
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={onBack}
              className="bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
            >
              <Rocket className="w-5 h-5" />
              {isEditing ? (
                <EditableInput
                  value={content.ctaApplyButton}
                  onChange={(value) => handleContentChange('ctaApplyButton', value)}
                  className="inline text-black"
                  textColor="text-black"
                />
              ) : (
                <span className="inline text-black">{content.ctaApplyButton}</span>
              )}
            </button>
            <button
              onClick={onBack}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-lg"
            >
              {isEditing ? (
                <EditableInput
                  value={content.ctaLearnButton}
                  onChange={(value) => handleContentChange('ctaLearnButton', value)}
                  className="inline"
                />
              ) : (
                <span className="inline">{content.ctaLearnButton}</span>
              )}
            </button>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto py-8 px-6 relative z-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            {isEditing ? (
              <EditableInput
                value={content.footerCopyright}
                onChange={(value) => handleContentChange('footerCopyright', value)}
                className="block"
              />
            ) : (
              <span className="block">{content.footerCopyright}</span>
            )}
          </p>
          <div className="flex justify-center items-center gap-4">
            <button className="text-white hover:text-white/60 transition-colors text-sm">
              <Youtube className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-white/60 transition-colors text-sm">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-white/60 transition-colors text-sm">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-white hover:text-white/60 transition-colors text-sm" onClick={onNavigateToBlogs}>
              {isEditing ? (
                <EditableInput
                  value={content.footerBlogsButton}
                  onChange={(value) => handleContentChange('footerBlogsButton', value)}
                  className="block"
                />
              ) : (
                <span className="block">{content.footerBlogsButton}</span>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
