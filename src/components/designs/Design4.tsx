import React, { useEffect, useRef, useState } from 'react';
import { Rocket, Star, Zap, Edit3, Save, X, Menu, ChevronDown, Twitter, Linkedin, Youtube, Settings, Lock } from 'lucide-react';


interface EditableContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
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
  whySaudiTitle: string;
  whySaudiDescription: string;
  whatYouGetTitle: string;
  whatYouGetDescription: string;
  journeyTitle: string;
  journeyDescription: string;

  ctaTitle: string;
  ctaDescription: string;
}

export const Design4: React.FC<{
  onNavigateToResources: () => void;
  onNavigateToBlogs: () => void;
}> = ({ onNavigateToResources, onNavigateToBlogs }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSecretButton, setShowSecretButton] = useState(false);
  const [content, setContent] = useState<EditableContent>({
    heroTitle: 'Eagle Nebula Startup Studio',
    heroSubtitle: 'Where Passionate Entrepreneurs Are Created',
    heroDescription: 'In space, the Eagle Nebula is where stars are Created.\nIn our studio, it\'s where passionate entrepreneurs are created.\nWe don\'t just coach you… we co‑found with you.\nWe build Saudi startups together—from the first spark to launch.',
    whatWeAreTitle: 'Who We Are',
    whatWeAreDescription: 'Most people think starting a business means figuring it out alone—or joining an incubator that only teaches theory.\n\nA startup studio is different.\nIt\'s a startup factory where ideas become companies side‑by‑side with experienced entrepreneurs.\n\nWhere we stand apart: many incubators, accelerators, and VCs chase numbers only—growth charts, user counts, revenue graphs. They treat passion as "nice to have" and ignore the new wave of founders: content creators, solopreneurs, freeLancers, influencers, creatives, coaches, personal brands —people building in completely new ways.\n\nAt Eagle Nebula, we start with you. We design a business around your passion, your skills, and the way you work best—then co‑found it with you.\n\nFrom day one you\'re inside our Design Your Business with AI methodology, supported by a community of like‑minded founders, seasoned coaches, and a co‑founder who\'s invested in your success.\n\nWe don\'t just coach.\nWe co‑create, co‑own, and co‑launch.',
    focusTitle: 'Who We Work With',
    focusSubTitle: 'Our Focus',
    focusDescription: 'At Eagle Nebula, we\'re not looking for just any founder.\nWe\'re looking for passionate entrepreneurs — people who are driven not only by profit, but by the desire to create something that truly matters to them.',
    focusFields: [
      'Have a spark they can\'t ignore — a topic, craft, or mission that excites them',
      'Are ready to commit to building a business around their unique skills, creativity, and vision',
      'See entrepreneurship as a lifestyle and a calling, not just a quick way to make money',
      'Are open to using AI and modern tools to move faster, smarter, and with less waste',
      'Value collaboration and want a co-founder who\'s as invested in their success as they are'
    ],
    focusFounders: 'You might be an influencer, content creator, creative, artist, coach, educator, solopreneur, personal brand, or freelancers.\nThe label doesn\'t matter — what matters is that you have the passion, the drive, and the willingness to build.\n\nWe don\'t work with people chasing the next trend without caring if it fits them.\nWe work with those who want to design a business from the inside out, starting with their passion — and build it into something scalable, impactful, and truly theirs.\n\nIf that\'s you, you belong here.',
    methodologyTitle: 'Design Your Business with AI',
    methodologySubTitle: 'Our Methodology',
    methodologyDescription: '(The operating system of Eagle Nebula)\n\nMost founders start from the outside: "What\'s trending? What\'s profitable?"\nWe flip it. Start from inside—with founder fit—and then build outward. When the founder fits the market, the product becomes clear.\n\nThe Five Pillars:\n• What You Love – Your passion foundation. The fuel that keeps you going.\n• What You Have – Skills, experience, relationships, and assets already in your hands.\n• Your Best Way to Work – How you operate at your best (pace, role, environment, solo/team).\n• What You Want to Achieve – Your goals, outcomes, and the life you\'re building toward.\n• Your AI Co‑Builder – Your speed advantage that makes the journey easier and faster (idea testing, content, research, automation, ops).\n\nThe Sweet Spot: where all five overlap.\nYou love it. You\'re equipped for it. It fits your style. It moves you toward your goals. And AI makes building easier and faster than ever.\n\nThis is not a course. It\'s a build system—used live, in the studio, to turn your founder DNA into a company.',
    whySaudiTitle: 'What You Get When We Co‑Found With You',
    whySaudiDescription: '• A venture designed around you (not a template)\n• Shared ownership: we build it together and win together\n• A practical playbook and a system powered by Design Your Business with AI\n• AI‑enabled validation, content, and operations from day one\n• Access to our network, coaches, tools, and hands‑on operators who love the zero‑to‑one phase',
    whatYouGetTitle: 'What You Get When We Co-Found With You',
    whatYouGetDescription: '• A venture designed around you (not a template)\n• Shared ownership: we build it together and win together\n• A practical playbook and a system powered by Design Your Business with AI\n• AI‑enabled validation, content, and operations from day one\n• Access to our network, coaches, tools, and hands‑on operators who love the zero‑to‑one phase',
    journeyTitle: 'Your Journey With Us',
    journeyDescription: 'Step 1 — Apply: Tell us who you are, your story, and what excites you. We don\'t need a perfect idea—we need a spark.\n\nStep 2 — Discovery: We run the Design Your Business with AI process to map your founder profile (love, assets, work‑style, goals). You\'re the center of the design.\n\nStep 3 — Co‑Founding Sprint: We sit at the same table and build: brainstorm, validate, name, position, prototype—using AI for faster testing and execution.\n\nStep 4 — The Eagle Nebula Ecosystem: Join a supportive community of passionate Saudi founders, coaches, and operators. Share wins, ask real questions, get real answers.\n\nStep 5 — Launch & Grow: We launch together. We stand with you in operations, content, and growth. We share the risk—and the reward.',

    ctaTitle: 'Ready to Start Your Journey?',
    ctaDescription: 'You can chase the next trend and hope it fits you…\nor you can design the company that fits you—and build it with a co‑founder who\'s all‑in.\n\nApply to join Eagle Nebula Startup Studio today.\nThe best time to build your passionate business is now.'
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

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
      setShowAdminPanel(false);
      setAdminCode('');
    } else {
      alert('Invalid admin code');
      setAdminCode('');
    }
  };

  const handleContentChange = (field: keyof EditableContent, value: string) => {
    if (field === 'focusFields') {
      // Handle array fields differently
      return;
    }
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldChange = (index: number, value: string) => {
    setContent(prev => ({
      ...prev,
      focusFields: prev.focusFields.map((field, i) => i === index ? value : field)
    }));
  };

  const addField = () => {
    setContent(prev => ({
      ...prev,
      focusFields: [...prev.focusFields, 'New Focus Area']
    }));
  };

  const removeField = (index: number) => {
    setContent(prev => ({
      ...prev,
      focusFields: prev.focusFields.filter((_, i) => i !== index)
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
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
      // For multiline text, use CSS to preserve line breaks
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

  return (
    <div ref={parallaxRef} className="relative">
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
              
              <div className="mt-6 text-xs text-white/50">
                <p>💡 Hint: The code is related to the year and the company name</p>
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

              {/* Edit Button - Only shows when admin is authenticated */}
              {isAdmin && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isEditing
                    ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    }`}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      <span className="hidden sm:inline">Save</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </>
                  )}
                </button>
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
              <EditableText
                value={content.heroTitle}
                onChange={(value) => handleContentChange('heroTitle', value)}
                className="block"
              />
            </h1>
            <div className="text-2xl md:text-3xl text-white/80 font-light tracking-wide mb-8">
              <EditableText
                value={content.heroSubtitle}
                onChange={(value) => handleContentChange('heroSubtitle', value)}
              />
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              <EditableText
                value={content.heroDescription}
                onChange={(value) => handleContentChange('heroDescription', value)}
                multiline
                className="w-full"
              />
            </p>
          </div>
        </div>

        {/* Floating Action Elements */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 md:w-auto w-5/6"> {/* Increased z-index */}
          <div className="flex flex-col md:flex-row space-x-6 mt-8 items-center md:gap-5 justify-center">
            <button className="group bg-white/10 justify-center backdrop-blur-md border text-center border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-2 w-full md:w-auto h-10">
              <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Apply to Join the Studio
            </button>
            <button className="group bg-white text-center justify-center text-black px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 w-full md:w-auto !ml-0 my-8 h-10">
              <Star className="w-5 h-5" />
              Learn More
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
                <EditableText
                  value={content.whatWeAreTitle}
                  onChange={(value) => handleContentChange('whatWeAreTitle', value)}
                />
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-8 font-light">
                <EditableText
                  value={content.whatWeAreDescription}
                  onChange={(value) => handleContentChange('whatWeAreDescription', value)}
                  multiline
                  className="w-full"
                />
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
              <EditableText
                value={content.focusTitle}
                onChange={(value) => handleContentChange('focusTitle', value)}
              />
            </h2>
            <h3 className="text-4xl font-extralight text-white mb-8 tracking-wide text-center mt-12">
              <EditableText
                value={content.focusSubTitle}
                onChange={(value) => handleContentChange('focusSubTitle', value)}
              />
            </h3>
            <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-12">
              <EditableText
                value={content.focusDescription}
                onChange={(value) => handleContentChange('focusDescription', value)}
                multiline
                className="w-full"
              />
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
                    <EditableText
                      value={field}
                      onChange={(value) => handleFieldChange(index, value)}
                      className="block"
                    />
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
                  <EditableText
                    value={content.focusFounders}
                    onChange={(value) => handleContentChange('focusFounders', value)}
                    multiline
                    className="w-full"
                  />
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
                <EditableText
                  value={content.methodologyTitle}
                  onChange={(value) => handleContentChange('methodologyTitle', value)}
                />
              </h2>
              <h3 className="text-4xl font-extralight text-white mb-8 tracking-wide text-center mt-12">
                <EditableText
                  value={content.methodologySubTitle}
                  onChange={(value) => handleContentChange('methodologySubTitle', value)}
                />
              </h3>
              <p className="text-xl text-white/70 leading-relaxed mb-8 font-light">
                <EditableText
                  value={content.methodologyDescription}
                  onChange={(value) => handleContentChange('methodologyDescription', value)}
                  multiline
                  className="w-full"
                />
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">1</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">What You Love</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Your passion foundation that fuels your journey</p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">2</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">What You Have</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Skills, experience, and resources at your disposal</p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">3</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">Your Best Way to Work</h3>
                  <p className="text-white/60 text-sm leading-relaxed">How you operate at peak performance</p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">4</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">What You Want to Achieve</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Your goals and the life you're building toward</p>
                </div>

                <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-light text-white">5</span>
                  </div>
                  <h3 className="text-lg font-light text-white mb-4">Your AI Co-Builder</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Your speed advantage that makes everything easier</p>
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
            <EditableText
              value={content.whatYouGetTitle}
              onChange={(value) => handleContentChange('whatYouGetTitle', value)}
            />
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
            <EditableText
              value={content.whatYouGetDescription}
              onChange={(value) => handleContentChange('whatYouGetDescription', value)}
              multiline
              className="w-full"
            />
          </p>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-32 px-6 relative z-20"> {/* Increased z-index */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-extralight text-white mb-10 tracking-wide">
              <EditableText
                value={content.journeyTitle}
                onChange={(value) => handleContentChange('journeyTitle', value)}
              />
            </h2>
            <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-16">
              <EditableText
                value={content.journeyDescription}
                onChange={(value) => handleContentChange('journeyDescription', value)}
                multiline
                className="w-full"
              />
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-16 items-center">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">1</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">Apply</h3>
                <p className="text-white/60 text-sm leading-relaxed">Tell us who you are, your story, and what excites you. We don't need a perfect idea—we need a spark.</p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">2</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">Discovery</h3>
                <p className="text-white/60 text-sm leading-relaxed">We run the Design Your Business with AI process to map your founder profile. You're the center of the design.</p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">3</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">Co‑Founding Sprint</h3>
                <p className="text-white/60 text-sm leading-relaxed">We sit at the same table and build: brainstorm, validate, name, position, prototype—using AI for faster testing.</p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">4</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">Ecosystem & Launch</h3>
                <p className="text-white/60 text-sm leading-relaxed">Join our community of passionate Saudi founders. We launch together and share the risk—and the reward.</p>
              </div>

              <div className="group backdrop-blur-sm border border-white/10 rounded-2xl p-4 transition-all duration-500 hover:scale-105 bg-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-light text-white">5</span>
                </div>
                <h3 className="text-lg font-light text-white mb-4">The Eagle Nebula Ecosystem</h3>
                <p className="text-white/60 text-sm leading-relaxed">Join a supportive community of passionate Saudi founders, coaches, and operators. Share wins, ask real questions, get real answers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Final CTA Section */}
      <section id="cta" className="py-32 px-6 relative z-20"> {/* Increased z-index */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8 tracking-wide">
            <EditableText
              value="Ready to Start Your Journey?"
              onChange={(value) => handleContentChange('ctaTitle', value)}
            />
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
            <EditableText
              value={content.ctaDescription}
              onChange={(value) => handleContentChange('ctaDescription', value)}
              multiline
              className="w-full"
            />
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium">
              <Rocket className="w-5 h-5" />
              Apply to Join the Studio
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-lg">
              Learn More About Us
            </button>
          </div>
        </div>
      </section>

      <footer className="max-w-7xl mx-auto py-8 px-6 relative z-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © 2025 EAGLE NEBULA!. All rights reserved.
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
              Blogs & News
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};