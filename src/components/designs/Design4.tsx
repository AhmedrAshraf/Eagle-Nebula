import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Star, Zap, Edit3, Save, X, Menu, ChevronDown, Twitter, Linkedin, Youtube, Settings, Lock, RotateCcw, LogOut } from 'lucide-react';
import { ContentService } from '../../services/contentService';

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




interface EditableContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroApplyButton: string;
  heroLearnButton: string;
  whatWeAreTitle: string;
  whatWeAreDescription: string;
  focusTitle: string;
  focusSubTitle: string;
  focusDescription: string;
  focusFields: string[];
  focusFounders: string;
  methodologyTitle: string;
  methodologySubTitle: string;
  methodologyDescription: string;
  methodologyPillar1Title: string;
  methodologyPillar1Desc: string;
  methodologyPillar2Title: string;
  methodologyPillar2Desc: string;
  methodologyPillar3Title: string;
  methodologyPillar3Desc: string;
  methodologyPillar4Title: string;
  methodologyPillar4Desc: string;
  methodologyPillar5Title: string;
  methodologyPillar5Desc: string;
  whatYouGetTitle: string;
  whatYouGetDescription: string;
  journeyTitle: string;
  journeyDescription: string;
  journeyStep1Title: string;
  journeyStep1Desc: string;
  journeyStep2Title: string;
  journeyStep2Desc: string;
  journeyStep3Title: string;
  journeyStep3Desc: string;
  journeyStep4Title: string;
  journeyStep4Desc: string;
  journeyStep5Title: string;
  journeyStep5Desc: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaApplyButton: string;
  ctaLearnButton: string;
  footerCopyright: string;
  footerBlogsButton: string;
}

export const Design4: React.FC<{
  onNavigateToResources: () => void;
  onNavigateToBlogs: () => void;
}> = ({ onNavigateToResources, onNavigateToBlogs }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
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
    heroSubtitle: '',
    heroDescription: '',
    heroApplyButton: '',
    heroLearnButton: '',
    whatWeAreTitle: '',
    whatWeAreDescription: '',
    focusTitle: '',
    focusSubTitle: '',
    focusDescription: '',
    focusFields: [],
    focusFounders: '',
    methodologyTitle: '',
    methodologySubTitle: '',
    methodologyDescription: '',
    methodologyPillar1Title: '',
    methodologyPillar1Desc: '',
    methodologyPillar2Title: '',
    methodologyPillar2Desc: '',
    methodologyPillar3Title: '',
    methodologyPillar3Desc: '',
    methodologyPillar4Title: '',
    methodologyPillar4Desc: '',
    methodologyPillar5Title: '',
    methodologyPillar5Desc: '',
    whatYouGetTitle: '',
    whatYouGetDescription: '',
    journeyTitle: '',
    journeyDescription: '',
    journeyStep1Title: '',
    journeyStep1Desc: '',
    journeyStep2Title: '',
    journeyStep2Desc: '',
    journeyStep3Title: '',
    journeyStep3Desc: '',
    journeyStep4Title: '',
    journeyStep4Desc: '',
    journeyStep5Title: '',
    journeyStep5Desc: '',
    ctaTitle: '',
    ctaDescription: '',
    ctaApplyButton: '',
    ctaLearnButton: '',
    footerCopyright: '',
    footerBlogsButton: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);



  // Fetch content from database on component mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const contentMap = await ContentService.fetchAllContent();
        
        // Transform database content to component format
        const transformedContent: EditableContent = {
          heroTitle: contentMap.hero?.title || '',
          heroSubtitle: contentMap.hero?.subtitle || '',
          heroDescription: contentMap.hero?.description || '',
          heroApplyButton: contentMap.hero?.applyButton || 'Apply to Join the Studio',
          heroLearnButton: contentMap.hero?.learnButton || 'Learn More',
          whatWeAreTitle: contentMap['who-we-are']?.title || '',
          whatWeAreDescription: contentMap['who-we-are']?.description || '',
          focusTitle: contentMap.focus?.title || '',
          focusSubTitle: contentMap.focus?.subtitle || '',
          focusDescription: contentMap.focus?.description || '',
          focusFields: contentMap.focus?.fields ? JSON.parse(contentMap.focus.fields) : [
            'Have a spark they can\'t ignore — a topic, craft, or mission that excites them',
            'Are ready to commit to building a business around their unique skills, creativity, and vision',
            'See entrepreneurship as a lifestyle and a calling, not just a quick way to make money',
            'Are open to using AI and modern tools to move faster, smarter, and with less waste',
            'Value collaboration and want a co-founder who\'s as invested in their success as they are'
          ],
          focusFounders: contentMap.focus?.founders || '',
          methodologyTitle: contentMap.methodology?.title || '',
          methodologySubTitle: contentMap.methodology?.subtitle || '',
          methodologyDescription: contentMap.methodology?.description || '',
          methodologyPillar1Title: contentMap.methodology?.pillar1Title || 'What You Love',
          methodologyPillar1Desc: contentMap.methodology?.pillar1Desc || 'Your passion foundation that fuels your journey',
          methodologyPillar2Title: contentMap.methodology?.pillar2Title || 'What You Have',
          methodologyPillar2Desc: contentMap.methodology?.pillar2Desc || 'Skills, experience, and resources at your disposal',
          methodologyPillar3Title: contentMap.methodology?.pillar3Title || 'Your Best Way to Work',
          methodologyPillar3Desc: contentMap.methodology?.pillar3Desc || 'How you operate at peak performance',
          methodologyPillar4Title: contentMap.methodology?.pillar4Title || 'What You Want to Achieve',
          methodologyPillar4Desc: contentMap.methodology?.pillar4Desc || 'Your goals and the life you\'re building toward',
          methodologyPillar5Title: contentMap.methodology?.pillar5Title || 'Your AI Co-Builder',
          methodologyPillar5Desc: contentMap.methodology?.pillar5Desc || 'Your speed advantage that makes everything easier',
          whatYouGetTitle: contentMap['what-you-get']?.title || '',
          whatYouGetDescription: contentMap['what-you-get']?.description || '',
          journeyTitle: contentMap.journey?.title || '',
          journeyDescription: contentMap.journey?.description || '',
          journeyStep1Title: contentMap.journey?.step1Title || 'Apply',
          journeyStep1Desc: contentMap.journey?.step1Desc || 'Tell us who you are, your story, and what excites you. We don\'t need a perfect idea—we need a spark.',
          journeyStep2Title: contentMap.journey?.step2Title || 'Discovery',
          journeyStep2Desc: contentMap.journey?.step2Desc || 'We run the Design Your Business with AI process to map your founder profile. You\'re the center of the design.',
          journeyStep3Title: contentMap.journey?.step3Title || 'Co‑Founding Sprint',
          journeyStep3Desc: contentMap.journey?.step3Desc || 'We sit at the same table and build: brainstorm, validate, name, position, prototype—using AI for faster testing.',
          journeyStep4Title: contentMap.journey?.step4Title || 'Ecosystem & Launch',
          journeyStep4Desc: contentMap.journey?.step4Desc || 'Join our community of passionate Saudi founders. We launch together and share the risk—and the reward.',
          journeyStep5Title: contentMap.journey?.step5Title || 'The Eagle Nebula Ecosystem',
          journeyStep5Desc: contentMap.journey?.step5Desc || 'Join a supportive community of passionate Saudi founders, coaches, and operators. Share wins, ask real questions, get real answers.',
          ctaTitle: contentMap.cta?.title || '',
          ctaDescription: contentMap.cta?.description || '',
          ctaApplyButton: contentMap.cta?.applyButton || 'Apply to Join the Studio',
          ctaLearnButton: contentMap.cta?.learnButton || 'Learn More About Us',
          footerCopyright: contentMap.footer?.copyright || '© 2025 EAGLE NEBULA!. All rights reserved.',
          footerBlogsButton: contentMap.footer?.blogsButton || 'Blogs & News'
        };
        
        setContent(transformedContent);
      } catch (error) {
        console.error('Error fetching content:', error);
        // Initialize default content if fetch fails
        await ContentService.initializeDefaultContent();
        // Retry fetch
        const contentMap = await ContentService.fetchAllContent();
        // ... same transformation logic
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    // Only scroll to top when component mounts (not when editing starts)
    if (!hasMountedRef.current && !isEditing) {
      window.scrollTo(0, 0);
      hasMountedRef.current = true;
    }

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

  // Secret admin access - triple click on logo to show admin button
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime > 1000) {
      setLogoClickCount(1);
    } else {
      setLogoClickCount(prev => prev + 1);
    }
    setLastClickTime(currentTime);

    if (logoClickCount === 3) {
      setShowSecretButton(true);
      setTimeout(() => setShowSecretButton(false), 5000); // Hide after 5 seconds
      setLogoClickCount(0);
    }
  };

  const handleAdminCodeSubmit = () => {
    // Secret admin code: "eagle2025"
    if (adminCode === 'eagle2025') {
      setIsAdmin(true);
      // Cache admin login
      localStorage.setItem('eagleNebulaAdmin', 'true');
      setShowAdminPanel(false);
      setAdminCode('');
    } else {
      setAdminCode('');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditing(false);
    // Clear cached admin login
    localStorage.removeItem('eagleNebulaAdmin');
  };

  const handleContentChange = React.useCallback((field: keyof EditableContent, value: string) => {
    if (field === 'focusFields') {
      // Handle array fields differently
      return;
    }
    setContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleDiscardChanges = React.useCallback(() => {
    if (originalContent) {
      setContent(originalContent);
    }
    setIsEditing(false);
  }, [originalContent]);

  const handleStartEditing = React.useCallback(() => {
    setOriginalContent(content);
    setIsEditing(true);
  }, [content]);

  const handleFieldEdit = React.useCallback((fieldId: string) => {
    setEditingField(fieldId);
  }, []);

  const handleFieldSave = React.useCallback((fieldId: string) => {
    setEditingField(null);
  }, []);

  const handleFieldCancel = React.useCallback(() => {
    setEditingField(null);
  }, []);

  const handleSaveChanges = React.useCallback(async () => {
    try {
      setIsSaving(true);
      
      // Prepare updates for database
      const updates = [
        { section: 'hero', field: 'title', value: content.heroTitle },
        { section: 'hero', field: 'subtitle', value: content.heroSubtitle },
        { section: 'hero', field: 'description', value: content.heroDescription },
        { section: 'hero', field: 'applyButton', value: content.heroApplyButton },
        { section: 'hero', field: 'learnButton', value: content.heroLearnButton },
        { section: 'who-we-are', field: 'title', value: content.whatWeAreTitle },
        { section: 'who-we-are', field: 'description', value: content.whatWeAreDescription },
        { section: 'focus', field: 'title', value: content.focusTitle },
        { section: 'focus', field: 'subtitle', value: content.focusSubTitle },
        { section: 'focus', field: 'description', value: content.focusDescription },
        { section: 'focus', field: 'fields', value: JSON.stringify(content.focusFields) },
        { section: 'focus', field: 'founders', value: content.focusFounders },
        { section: 'methodology', field: 'title', value: content.methodologyTitle },
        { section: 'methodology', field: 'subtitle', value: content.methodologySubTitle },
        { section: 'methodology', field: 'description', value: content.methodologyDescription },
        { section: 'methodology', field: 'pillar1Title', value: content.methodologyPillar1Title },
        { section: 'methodology', field: 'pillar1Desc', value: content.methodologyPillar1Desc },
        { section: 'methodology', field: 'pillar2Title', value: content.methodologyPillar2Title },
        { section: 'methodology', field: 'pillar2Desc', value: content.methodologyPillar2Desc },
        { section: 'methodology', field: 'pillar3Title', value: content.methodologyPillar3Title },
        { section: 'methodology', field: 'pillar3Desc', value: content.methodologyPillar3Desc },
        { section: 'methodology', field: 'pillar4Title', value: content.methodologyPillar4Title },
        { section: 'methodology', field: 'pillar4Desc', value: content.methodologyPillar4Desc },
        { section: 'methodology', field: 'pillar5Title', value: content.methodologyPillar5Title },
        { section: 'methodology', field: 'pillar5Desc', value: content.methodologyPillar5Desc },
        { section: 'what-you-get', field: 'title', value: content.whatYouGetTitle },
        { section: 'what-you-get', field: 'description', value: content.whatYouGetDescription },
        { section: 'journey', field: 'title', value: content.journeyTitle },
        { section: 'journey', field: 'description', value: content.journeyDescription },
        { section: 'journey', field: 'step1Title', value: content.journeyStep1Title },
        { section: 'journey', field: 'step1Desc', value: content.journeyStep1Desc },
        { section: 'journey', field: 'step2Title', value: content.journeyStep2Title },
        { section: 'journey', field: 'step2Desc', value: content.journeyStep2Desc },
        { section: 'journey', field: 'step3Title', value: content.journeyStep3Title },
        { section: 'journey', field: 'step3Desc', value: content.journeyStep3Desc },
        { section: 'journey', field: 'step4Title', value: content.journeyStep4Title },
        { section: 'journey', field: 'step4Desc', value: content.journeyStep4Desc },
        { section: 'journey', field: 'step5Title', value: content.journeyStep5Title },
        { section: 'journey', field: 'step5Desc', value: content.journeyStep5Desc },
        { section: 'cta', field: 'title', value: content.ctaTitle },
        { section: 'cta', field: 'description', value: content.ctaDescription },
        { section: 'cta', field: 'applyButton', value: content.ctaApplyButton },
        { section: 'cta', field: 'learnButton', value: content.ctaLearnButton },
        { section: 'footer', field: 'copyright', value: content.footerCopyright },
        { section: 'footer', field: 'blogsButton', value: content.footerBlogsButton }
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

  const handleFieldChange = React.useCallback((index: number, value: string) => {
    setContent(prev => ({
      ...prev,
      focusFields: prev.focusFields.map((field, i) => i === index ? value : field)
    }));
  }, []);

  const addField = React.useCallback(() => {
    setContent(prev => ({
      ...prev,
      focusFields: [...prev.focusFields, 'New Focus Area']
    }));
  }, []);

  const removeField = React.useCallback((index: number) => {
    setContent(prev => ({
      ...prev,
      focusFields: prev.focusFields.filter((_, i) => i !== index)
    }));
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
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
    <div ref={parallaxRef} className="relative" onKeyDown={(e) => {
      // Prevent form submission on Enter key
      if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
        e.preventDefault();
      }
    }}>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/50 z-10" /> {/* Added dark overlay */}

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowAdminPanel(false)} />
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <Lock className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-light text-white mb-6">Admin Access</h3>
              <p className="text-white/70 mb-6">Enter the secret admin code to access editing features</p>
              
              <div className="space-y-4">
                <input
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Enter admin code..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminCodeSubmit()}
                />
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAdminCodeSubmit}
                    className="flex-1 bg-white text-black px-4 py-3 rounded-lg hover:bg-white/90 transition-colors font-medium"
                  >
                    Access Admin
                  </button>
                  <button
                    onClick={() => setShowAdminPanel(false)}
                    className="flex-1 bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="text-white font-light text-xl tracking-wider cursor-pointer hover:text-white/80 transition-colors"
              onClick={handleLogoClick}
            >
              EAGLE NEBULA
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('who-we-are')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Who We Are
              </button>
              <button
                onClick={() => scrollToSection('focus')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Our Focus
              </button>
              <button
                onClick={() => scrollToSection('methodology')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Methodology
              </button>
              <button
                onClick={() => scrollToSection('journey')}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Journey
              </button>
              <button
                onClick={onNavigateToResources}
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Resources & Gifts
              </button>
            </nav>

            {/* Admin & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Secret Admin Button - Only shows after triple click on logo */}
              {showSecretButton && (
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-400/30 transition-all duration-300 animate-pulse"
                >
                  <Lock className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}

              {/* Edit/Save/Discard/Logout Buttons - Only shows when admin is authenticated */}
              {isAdmin && (
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleDiscardChanges}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 border border-red-400/30 hover:bg-red-500/30 transition-all duration-300"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span className="hidden sm:inline">Discard</span>
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-400/30 hover:bg-green-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Save className="w-4 h-4" />
                        <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleStartEditing}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30 hover:bg-orange-500/30 transition-all duration-300"
                    title="Logout from admin"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-white p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
              <div className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection('hero')} className="text-white/70 hover:text-white transition-colors text-left">Home</button>
                <button onClick={() => scrollToSection('who-we-are')} className="text-white/70 hover:text-white transition-colors text-left">Who We Are</button>
                <button onClick={() => scrollToSection('focus')} className="text-white/70 hover:text-white transition-colors text-left">Our Focus</button>
                <button onClick={() => scrollToSection('methodology')} className="text-white/70 hover:text-white transition-colors text-left">Methodology</button>
                <button onClick={() => scrollToSection('what-you-get')} className="text-white/70 hover:text-white transition-colors text-left">What You Get</button>
                <button onClick={() => scrollToSection('journey')} className="text-white/70 hover:text-white transition-colors text-left">Journey</button>
                <button onClick={onNavigateToResources} className="text-white/70 hover:text-white transition-colors text-left">Resources & Gifts</button>
                <button onClick={() => scrollToSection('cta')} className="text-white/70 hover:text-white transition-colors text-left">Apply</button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section with Parallax Layers */}
      <section id="hero" className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Layer 1 - Distant Stars */}
          <div
            data-speed="0.1"
            className="absolute inset-0 opacity-30"
          >
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Layer 2 - Nebula Clouds */}
          <div data-speed="0.3" className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Layer 3 - Constellation Lines */}
          <div data-speed="0.5" className="absolute inset-0">
            <svg className="w-full h-full opacity-20">
              <defs>
                <linearGradient id="constellation" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="white" stopOpacity="0" />
                  <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M100,200 L300,150 L500,300 L700,100 L900,250"
                stroke="url(#constellation)"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6 pt-20"> {/* Increased z-index */}
          <div data-speed="0.2">
            <h1 className="text-4xl md:text-6xl font-extralight text-white mb-6 tracking-wide">
              {isEditing ? (
                <EditableInput
                  value={content.heroTitle}
                  onChange={(value) => handleContentChange('heroTitle', value)}
                  className="block"
                />
              ) : (
                <span className="block">{content.heroTitle}</span>
              )}
            </h1>
            <div className="text-2xl md:text-3xl text-white/80 font-light tracking-wide mb-8">
              {isEditing ? (
                <EditableInput
                  value={content.heroSubtitle}
                  onChange={(value) => handleContentChange('heroSubtitle', value)}
                />
              ) : (
                <span>{content.heroSubtitle}</span>
              )}
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
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
        </div>

        {/* Floating Action Elements */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 md:w-auto w-5/6"> {/* Increased z-index */}
          <div className="flex flex-col md:flex-row space-x-6 mt-8 items-center md:gap-5 justify-center">
            <button className="group bg-white/10 justify-center backdrop-blur-md border text-center border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 w-full md:w-auto h-10">
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              {isEditing ? (
                <EditableInput
                  value={content.heroApplyButton}
                  onChange={(value) => handleContentChange('heroApplyButton', value)}
                  className="block"
                />
              ) : (
                <span className="block">{content.heroApplyButton}</span>
              )}
            </button>
            <button className="group bg-white text-center justify-center text-black px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full md:w-auto !ml-0 my-8 h-10">
              <Star className="w-5 h-5" />
              {isEditing ? (
                <EditableInput
                  value={content.heroLearnButton}
                  onChange={(value) => handleContentChange('heroLearnButton', value)}
                  className="block"
                  textColor="text-black"
                />
              ) : (
                <span className="block text-black">{content.heroLearnButton}</span>
              )}
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"> {/* Increased z-index */}
          <ChevronDown className="w-6 h-6 text-white/50 animate-bounce" />
        </div>
      </section>

      {/* Rest of the sections... */}
      {/* What We Are Section */}
      <section id="who-we-are" className="py-4 px-6 md:py-32 md:px-6 relative z-20"> {/* Increased z-index */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-1 gap-16 h-[60vh] items-center">
            <div data-speed="0.1">
              <h2 className="text-5xl font-extralight text-white mb-8 tracking-wide">
                {isEditing ? (
                  <EditableInput
                    value={content.whatWeAreTitle}
                    onChange={(value) => handleContentChange('whatWeAreTitle', value)}
                  />
                ) : (
                  <span>{content.whatWeAreTitle}</span>
                )}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8 font-light">
                {isEditing ? (
                  <EditableTextarea
                    value={content.whatWeAreDescription}
                    onChange={(value) => handleContentChange('whatWeAreDescription', value)}
                    className="w-full"
                  />
                ) : (
                  <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                    {content.whatWeAreDescription}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-4">
                <Zap className="w-6 h-6 text-white" />
                <span className="text-white/60">Co-founding, not just coaching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section id="focus" className="py-32 px-6 relative z-20"> {/* Increased z-index */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight text-white mb-8 tracking-wide">
                              {isEditing ? (
                  <EditableInput
                    value={content.focusTitle}
                    onChange={(value) => handleContentChange('focusTitle', value)}
                  />
                ) : (
                  <span>{content.focusTitle}</span>
                )}
            </h2>
            <h3 className="text-4xl font-extralight text-white mb-8 tracking-wide text-center mt-12">
                              {isEditing ? (
                  <EditableInput
                    value={content.focusSubTitle}
                    onChange={(value) => handleContentChange('focusSubTitle', value)}
                  />
                ) : (
                  <span>{content.focusSubTitle}</span>
                )}
            </h3>
            <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-12">
              {isEditing ? (
                <EditableTextarea
                  value={content.focusDescription}
                  onChange={(value) => handleContentChange('focusDescription', value)}
                  className="w-full"
                />
              ) : (
                <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                  {content.focusDescription}
                </span>
              )}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Founder Types Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {content.focusFields.map((field, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <p className="text-sm font-light text-white/80 leading-relaxed">
                    {isEditing ? (
                      <EditableInput
                        value={field}
                        onChange={(value) => handleFieldChange(index, value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{field}</span>
                    )}
                  </p>
                  {isEditing && (
                    <button
                      onClick={() => removeField(index)}
                      className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity mt-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Founder Description */}
            <div className="text-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
                <p className="text-white/80 leading-relaxed font-light text-lg">
                  {isEditing ? (
                    <EditableTextarea
                      value={content.focusFounders}
                      onChange={(value) => handleContentChange('focusFounders', value)}
                      className="w-full"
                    />
                  ) : (
                    <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                      {content.focusFounders}
                    </span>
                  )}
                </p>
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Star className="w-6 h-6 text-white" />
                  <span className="text-white/60">Ready to commit full-time</span>
                </div>
              </div>

              {isEditing && (
                <button onClick={addField} className="mt-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors mx-auto">
                  <div className="w-2 h-2 border border-white/60 rounded-full"></div>
                  <span className="text-sm">Add Founder Quality</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-32 px-6 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* <div className="lg:order-1 relative">
          <div className="w-full h-[700px] rounded-3xl overflow-hidden mb-20">
            <img  
              src="/assets/C19D5355-B820-4697-9DC1-F3AD8436E8E8.png"
              alt="AI-Powered Methodology"
              className="w-full h-full object-contain"
            />
          </div>
        </div> */}
          <div className="grid lg:grid-cols-1 gap-16 items-center">
            <div className="lg:order-2">
              <h2 className="text-5xl font-extralight text-white mb-8 tracking-wide text-center">
                {isEditing ? (
                  <EditableInput
                    value={content.methodologyTitle}
                    onChange={(value) => handleContentChange('methodologyTitle', value)}
                  />
                ) : (
                  <span>{content.methodologyTitle}</span>
                )}
              </h2>
              <h3 className="text-4xl font-extralight text-white mb-8 tracking-wide text-center mt-12">
                {isEditing ? (
                  <EditableInput
                    value={content.methodologySubTitle}
                    onChange={(value) => handleContentChange('methodologySubTitle', value)}
                  />
                ) : (
                  <span>{content.methodologySubTitle}</span>
                )}
              </h3>
              <p className="text-xl text-white/70 leading-relaxed mb-8 font-light">
                {isEditing ? (
                  <EditableTextarea
                    value={content.methodologyDescription}
                    onChange={(value) => handleContentChange('methodologyDescription', value)}
                    className="w-full"
                  />
                ) : (
                  <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                    {content.methodologyDescription}
                  </span>
                )}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">1</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar1Title}
                        onChange={(value) => handleContentChange('methodologyPillar1Title', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar1Title}</span>
                    )}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar1Desc}
                        onChange={(value) => handleContentChange('methodologyPillar1Desc', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar1Desc}</span>
                    )}
                  </p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">2</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar2Title}
                        onChange={(value) => handleContentChange('methodologyPillar2Title', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar2Title}</span>
                    )}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar2Desc}
                        onChange={(value) => handleContentChange('methodologyPillar2Desc', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar2Desc}</span>
                    )}
                  </p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">3</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar3Title}
                        onChange={(value) => handleContentChange('methodologyPillar3Title', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar3Title}</span>
                    )}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar3Desc}
                        onChange={(value) => handleContentChange('methodologyPillar3Desc', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar3Desc}</span>
                    )}
                  </p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">4</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar4Title}
                        onChange={(value) => handleContentChange('methodologyPillar4Title', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar4Title}</span>
                    )}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar4Desc}
                        onChange={(value) => handleContentChange('methodologyPillar4Desc', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar4Desc}</span>
                    )}
                  </p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">5</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar5Title}
                        onChange={(value) => handleContentChange('methodologyPillar5Title', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar5Title}</span>
                    )}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {isEditing ? (
                      <EditableInput
                        value={content.methodologyPillar5Desc}
                        onChange={(value) => handleContentChange('methodologyPillar5Desc', value)}
                        className="block"
                      />
                    ) : (
                      <span className="block">{content.methodologyPillar5Desc}</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="lg:order-1 relative mt-20">
                <div className="w-full h-[700px] rounded-3xl overflow-hidden mb-20">
                  <img
                    src="/assets/C19D5355-B820-4697-9DC1-F3AD8436E8E8.png"
                    alt="AI-Powered Methodology"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>``
            </div>
          </div>
        </div>
      </section>

      {/* Why Saudi Section */}
      <section id="what-you-get" className="px-6 relative z-20"> {/* Increased z-index */}
        {/* <div className="max-w-6xl mx-auto mt-40"> */}
        {/* <div className="max-w-4xl mx-auto"> */}
        {/* <div data-speed="0.1">
            <h2 className="text-5xl font-extralight text-white mb-8 tracking-wide text-center">
              <EditableText
                value={content.whatYouGetTitle}
                onChange={(value) => handleContentChange('whatYouGetTitle', value)}
              />
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8 font-light">
              <EditableText
                value={content.whatYouGetDescription}
                onChange={(value) => handleContentChange('whatYouGetDescription', value)}
                multiline
                className="w-full"
              />
            </p>
            </div> */}
        {/* </div> */}
        {/* </div> */}
      </section>

      <section id="cta" className="py-32 px-6 relative z-20"> {/* Increased z-index */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extralight text-white mb-8 tracking-wide text-center">
            {isEditing ? (
              <EditableInput
                value={content.whatYouGetTitle}
                onChange={(value) => handleContentChange('whatYouGetTitle', value)}
              />
            ) : (
              <span>{content.whatYouGetTitle}</span>
            )}
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
            {isEditing ? (
              <EditableTextarea
                value={content.whatYouGetDescription}
                onChange={(value) => handleContentChange('whatYouGetDescription', value)}
                className="w-full"
              />
            ) : (
              <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                {content.whatYouGetDescription}
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-32 px-6 relative z-20"> {/* Increased z-index */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-extralight text-white mb-10 tracking-wide">
              {isEditing ? (
                <EditableInput
                  value={content.journeyTitle}
                  onChange={(value) => handleContentChange('journeyTitle', value)}
                />
              ) : (
                <span>{content.journeyTitle}</span>
              )}
            </h2>
            <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-16">
              {isEditing ? (
                <EditableTextarea
                  value={content.journeyDescription}
                  onChange={(value) => handleContentChange('journeyDescription', value)}
                  className="w-full"
                />
              ) : (
                <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                  {content.journeyDescription}
                </span>
              )}
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-16 items-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">1</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep1Title}
                      onChange={(value) => handleContentChange('journeyStep1Title', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep1Title}</span>
                  )}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep1Desc}
                      onChange={(value) => handleContentChange('journeyStep1Desc', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep1Desc}</span>
                  )}
                </p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">2</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep2Title}
                      onChange={(value) => handleContentChange('journeyStep2Title', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep2Title}</span>
                  )}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep2Desc}
                      onChange={(value) => handleContentChange('journeyStep2Desc', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep2Desc}</span>
                  )}
                </p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">3</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep3Title}
                      onChange={(value) => handleContentChange('journeyStep3Title', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep3Title}</span>
                  )}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep3Desc}
                      onChange={(value) => handleContentChange('journeyStep3Desc', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep3Desc}</span>
                  )}
                </p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">4</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep4Title}
                      onChange={(value) => handleContentChange('journeyStep4Title', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep4Title}</span>
                  )}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep4Desc}
                      onChange={(value) => handleContentChange('journeyStep4Desc', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep4Desc}</span>
                  )}
                </p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">5</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep5Title}
                      onChange={(value) => handleContentChange('journeyStep5Title', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep5Title}</span>
                  )}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {isEditing ? (
                    <EditableInput
                      value={content.journeyStep5Desc}
                      onChange={(value) => handleContentChange('journeyStep5Desc', value)}
                      className="block"
                    />
                  ) : (
                    <span className="block">{content.journeyStep5Desc}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section id="cta" className="py-32 px-6 relative z-20"> {/* Increased z-index */}
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
            <button className="bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium">
              <Rocket className="w-5 h-5" />
              {isEditing ? (
                <EditableInput
                  value={content.ctaApplyButton}
                  onChange={(value) => handleContentChange('ctaApplyButton', value)}
                  className="block"
                  textColor="text-black"
                />
              ) : (
                <span className="block text-black">{content.ctaApplyButton}</span>
              )}
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-lg">
              {isEditing ? (
                <EditableInput
                  value={content.ctaLearnButton}
                  onChange={(value) => handleContentChange('ctaLearnButton', value)}
                  className="block"
                />
              ) : (
                <span className="block">{content.ctaLearnButton}</span>
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