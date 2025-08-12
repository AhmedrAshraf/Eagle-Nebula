import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Rocket, Star, Zap, Edit3, ArrowLeft, Download, ExternalLink } from 'lucide-react';

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  buttonText: string;
  buttonAction: 'download' | 'assessment' | 'community';
}

interface EditableContent {
  heroTitle: string;
  heroDescription: string;
  resourcesTitle: string;
}

export const ResourcesPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState<EditableContent>({
    heroTitle: 'Resources & Gifts',
    heroDescription: 'Exclusive tools, frameworks, and resources to accelerate your entrepreneurial journey. From AI-powered toolkits to comprehensive assessments—everything you need to design and build your passionate business.',
    resourcesTitle: 'All Resources & Materials'
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [resources, setResources] = useState<ResourceItem[]>([
    {
      id: 'business-framework',
      title: 'Business Design Framework',
      description: 'Our complete framework for designing your business around your unique founder profile. Includes detailed worksheets, step-by-step guides, and AI prompts to help you discover your sweet spot.',
      icon: Sparkles,
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
      icon: Sparkles,
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

  const handleContentChange = (field: keyof EditableContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleResourceChange = (resourceId: string, field: 'title' | 'description' | 'buttonText', value: string) => {
    setResources(prev => prev.map(resource => 
      resource.id === resourceId 
        ? { ...resource, [field]: value }
        : resource
    ));
  };

  const handleResourceAction = (resource: ResourceItem) => {
    switch (resource.buttonAction) {
      case 'download':
        // In a real app, this would trigger a file download
        alert(`Downloading ${resource.title}...`);
        break;
      case 'assessment':
        // In a real app, this would navigate to an assessment page
        alert(`Opening ${resource.title}...`);
        break;
      case 'community':
        // In a real app, this would open community signup
        alert(`Joining ${resource.title}...`);
        break;
    }
  };

  const EditableText: React.FC<{
    value: string;
    onChange: (value: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
  }> = ({ value, onChange, className = '', multiline = false, placeholder = '' }) => {
    if (!isEditing) {
      if (multiline) {
        return (
          <span 
            className={`${className} whitespace-pre-line`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {value}
          </span>
        );
      }
      return <span className={className}>{value}</span>;
    }

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-3 resize-none`}
          placeholder={placeholder}
          rows={4}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-2`}
        placeholder={placeholder}
      />
    );
  };

  const EditableResourceText: React.FC<{
    value: string;
    onChange: (value: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
  }> = ({ value, onChange, className = '', multiline = false, placeholder = '' }) => {
    if (!isEditing) {
      if (multiline) {
        return (
          <span 
            className={`${className} whitespace-pre-line`}
            style={{ whiteSpace: 'pre-line' }}
          >
            {value}
          </span>
        );
      }
      return <span className={className}>{value}</span>;
    }

    if (multiline) {
      return (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-3 resize-none`}
          placeholder={placeholder}
          rows={3}
        />
      );
    }

    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-2`}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div ref={parallaxRef} className="relative min-h-screen bg-black">
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
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isEditing
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
              >
                {isEditing ? (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Exit Edit
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Edit Content
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-extralight text-white mb-8 tracking-wide">
            <EditableText
              value={content.heroTitle}
              onChange={(value) => handleContentChange('heroTitle', value)}
            />
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-12">
            <EditableText
              value={content.heroDescription}
              onChange={(value) => handleContentChange('heroDescription', value)}
              multiline
              className="w-full"
            />
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extralight text-white mb-6 tracking-wide">
              <EditableText
                value={content.resourcesTitle}
                onChange={(value) => handleContentChange('resourcesTitle', value)}
              />
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <div key={resource.id} className="group backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4 text-center">
                    <EditableResourceText
                      value={resource.title}
                      onChange={(value) => handleResourceChange(resource.id, 'title', value)}
                      className="w-full text-center"
                    />
                  </h3>
                  <p className="text-white/70 text-center mb-6 leading-relaxed">
                    <EditableResourceText
                      value={resource.description}
                      onChange={(value) => handleResourceChange(resource.id, 'description', value)}
                      className="w-full text-center"
                      multiline
                    />
                  </p>
                  <div className="text-center">
                    <button 
                      onClick={() => handleResourceAction(resource)}
                      className="bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto font-medium"
                    >
                      {resource.buttonAction === 'download' && <Download className="w-4 h-4" />}
                      {resource.buttonAction === 'assessment' && <ExternalLink className="w-4 h-4" />}
                      {resource.buttonAction === 'community' && <Rocket className="w-4 h-4" />}
                      <EditableResourceText
                        value={resource.buttonText}
                        onChange={(value) => handleResourceChange(resource.id, 'buttonText', value)}
                        className="inline"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8 tracking-wide">
            Ready to Build Your Passionate Business?
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
            These resources are just the beginning. Join Eagle Nebula Startup Studio and get hands-on support as we co-found your venture together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={onBack}
              className="bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
            >
              <Rocket className="w-5 h-5" />
              Apply to Join the Studio
            </button>
            <button 
              onClick={onBack}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-lg"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
