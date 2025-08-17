import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Edit3, Plus, Calendar, User, Tag, Save, X, Trash2, Twitter, Youtube, Linkedin, RotateCcw, LogOut, Lock, Settings } from 'lucide-react';
import { ContentService, BlogPost } from '../services/contentService';

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
  rows?: number;
}>(({ value, onChange, className = '', placeholder = '', textColor = 'text-white', rows = 4 }) => {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-3 resize-none ${textColor} placeholder-white/50`}
      placeholder={placeholder}
      rows={rows}
      style={{ minHeight: `${rows * 1.5}rem` }}
    />
  );
});

interface EditableContent {
    heroTitle: string;
    heroDescription: string;
    blogsTitle: string;
}

export const BlogsPage: React.FC<{ 
  onNavigateToHome: () => void;
  onNavigateToResources: () => void;
}> = ({ onNavigateToHome, onNavigateToResources }) => {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const hasMountedRef = useRef(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
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
        blogsTitle: ''
    });

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [newPost, setNewPost] = useState<Partial<BlogPost>>({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        featured: false
    });

    // Fetch content and blog posts from database on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                
                // Fetch both content and blog posts in parallel
                const [contentMap] = await Promise.all([
                    ContentService.fetchAllContent()
                ]);
                
                // Initialize blog posts if they don't exist
                await ContentService.initializeBlogPosts();
                
                // Fetch blog posts after initialization
                const posts = await ContentService.getBlogPosts();
                
                // Transform database content to component format
                const transformedContent: EditableContent = {
                    heroTitle: contentMap.blogs?.heroTitle || 'Blogs & News',
                    heroDescription: contentMap.blogs?.heroDescription || 'Stay updated with the latest insights, trends, and stories from the world of entrepreneurship and AI-powered business building.',
                    blogsTitle: contentMap.blogs?.blogsTitle || 'Latest Articles & Updates'
                };
                
                setContent(transformedContent);
                setBlogPosts(posts);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Initialize default content if fetch fails
                await ContentService.initializeDefaultContent();
                await ContentService.initializeBlogPosts();
                // Retry fetch
                const [contentMap] = await Promise.all([
                    ContentService.fetchAllContent()
                ]);
                const posts = await ContentService.getBlogPosts();
                // ... same transformation logic
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Scroll to top when component mounts
    useEffect(() => {
        if (!hasMountedRef.current) {
            window.scrollTo(0, 0);
            hasMountedRef.current = true;
        }
    }, []);

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

    const handleContentChange = (field: keyof EditableContent, value: string) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const handleStartEditing = () => {
        setOriginalContent(content);
        setIsEditing(true);
    };

    const handleDiscardChanges = () => {
        if (originalContent) {
            setContent(originalContent);
        }
        setIsEditing(false);
    };

    const handleSaveChanges = async () => {
        try {
            setIsSaving(true);
            
            // Save content changes
            const updates = [
                { section: 'blogs', field: 'heroTitle', value: content.heroTitle },
                { section: 'blogs', field: 'heroDescription', value: content.heroDescription },
                { section: 'blogs', field: 'blogsTitle', value: content.blogsTitle }
            ];

            await ContentService.updateMultipleContent(updates);

            // Save blog post changes
            for (const post of blogPosts) {
                await ContentService.updateBlogPost(post.id, {
                    title: post.title,
                    excerpt: post.excerpt,
                    content: post.content,
                    author: post.author,
                    category: post.category,
                    featured: post.featured
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

    const handlePostChange = (postId: string, field: keyof BlogPost, value: string | boolean) => {
        setBlogPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, [field]: value }
                : post
        ));
    };

    const handleNewPostChange = (field: keyof BlogPost, value: string | boolean) => {
        setNewPost(prev => ({ ...prev, [field]: value }));
    };

    const createNewPost = async () => {
        if (!newPost.title || !newPost.excerpt || !newPost.content) {
            alert('Please fill in all required fields');
            return;
        }

        const postData = {
            title: newPost.title || '',
            excerpt: newPost.excerpt || '',
            content: newPost.content || '',
            author: newPost.author || 'Eagle Nebula Team',
            date: new Date().toISOString().split('T')[0],
            category: newPost.category || 'General',
            featured: newPost.featured || false
        };

        const addedPost = await ContentService.addBlogPost(postData);
        if (addedPost) {
            setBlogPosts(prev => [addedPost, ...prev]);
            setNewPost({
                title: '',
                excerpt: '',
                content: '',
                author: '',
                category: '',
                featured: false
            });
            setIsCreating(false);
        }
    };

    const deletePost = async (postId: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            const success = await ContentService.deleteBlogPost(postId);
            if (success) {
                setBlogPosts(prev => prev.filter(post => post.id !== postId));
            }
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

    const featuredPosts = blogPosts.filter(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

    return (
        <div ref={parallaxRef} className="relative min-h-screen bg-black">
            {/* Background Overlay */}
            <div className="fixed inset-0 bg-black/50 z-10" />

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
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onNavigateToHome}
                                className="text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Home
                            </button>
                        </div>

                        <div 
                            className="text-white font-light text-xl tracking-wider cursor-pointer hover:text-white/80 transition-colors"
                            onClick={handleLogoClick}
                        >
                            EAGLE NEBULA
                        </div>

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

                            {/* Admin Controls - Only shows when admin is authenticated */}
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

                            {/* New Post Button - Only shows when admin is authenticated */}
                            {isAdmin && (
                                <button
                                    onClick={() => setIsCreating(!isCreating)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isCreating
                                        ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                                        }`}
                                >
                                    {isCreating ? (
                                        <>
                                            <X className="w-4 h-4" />
                                            <span className="hidden sm:inline">Cancel</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4" />
                                            <span className="hidden sm:inline">New Post</span>
                                        </>
                                    )}
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
                        {isAdmin && isEditing ? (
                            <EditableInput
                                value={content.heroTitle}
                                onChange={(value) => handleContentChange('heroTitle', value)}
                                className="w-full"
                                placeholder="Blogs & News"
                            />
                        ) : (
                            <span className="w-full">{content.heroTitle}</span>
                        )}
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed max-w-4xl mx-auto font-light mb-12">
                        {isAdmin && isEditing ? (
                            <EditableTextarea
                                value={content.heroDescription}
                                onChange={(value) => handleContentChange('heroDescription', value)}
                                className="w-full"
                                placeholder="Stay updated with the latest insights, trends, and stories from the world of entrepreneurship and AI-powered business building."
                                rows={4}
                            />
                        ) : (
                            <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                                {content.heroDescription}
                            </span>
                        )}
                    </p>
                </div>
            </section>

            {/* Create New Post Section */}
            {isCreating && (
                <section className="py-20 px-6 relative z-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-8 bg-white/10">
                            <h2 className="text-3xl font-light text-white mb-8 text-center">Create New Blog Post</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white/70 mb-2">Title *</label>
                                    <EditableInput
                                        value={newPost.title || ''}
                                        onChange={(value) => handleNewPostChange('title', value)}
                                        className="w-full"
                                        placeholder="Enter blog post title..."
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white/70 mb-2">Author</label>
                                        <EditableInput
                                            value={newPost.author || ''}
                                            onChange={(value) => handleNewPostChange('author', value)}
                                            className="w-full"
                                            placeholder="Author name..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/70 mb-2">Category</label>
                                        <EditableInput
                                            value={newPost.category || ''}
                                            onChange={(value) => handleNewPostChange('category', value)}
                                            className="w-full"
                                            placeholder="Category..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/70 mb-2">Excerpt *</label>
                                    <EditableTextarea
                                        value={newPost.excerpt || ''}
                                        onChange={(value) => handleNewPostChange('excerpt', value)}
                                        className="w-full"
                                        placeholder="Brief description of the blog post..."
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 mb-2">Content *</label>
                                    <EditableTextarea
                                        value={newPost.content || ''}
                                        onChange={(value) => handleNewPostChange('content', value)}
                                        className="w-full"
                                        placeholder="Write your blog post content here..."
                                        rows={8}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 text-white/70">
                                        <input
                                            type="checkbox"
                                            checked={newPost.featured || false}
                                            onChange={(e) => handleNewPostChange('featured', e.target.checked)}
                                            className="rounded"
                                        />
                                        Featured Post
                                    </label>
                                </div>

                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={createNewPost}
                                        className="bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
                                    >
                                        <Save className="w-4 h-4" />
                                        Publish Post
                                    </button>
                                    <button
                                        onClick={() => setIsCreating(false)}
                                        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
                <section className="py-20 px-6 relative z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-extralight text-white mb-6 tracking-wide">
                                Featured Articles
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <article key={post.id} className="group backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:scale-105 bg-white/10">
                                                                                                                    <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4 text-white/60 text-sm flex-1 min-w-0">
                                                {isAdmin && isEditing ? (
                                                    <>
                                                        <div className="flex items-center gap-1 flex-shrink-0">
                                                            <Calendar className="w-4 h-4" />
                                                            <input
                                                                type="date"
                                                                value={post.date}
                                                                onChange={(e) => handlePostChange(post.id, 'date', e.target.value)}
                                                                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs text-white w-32"
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-1 flex-shrink-0">
                                                            <User className="w-4 h-4" />
                                                            <EditableInput
                                                                value={post.author}
                                                                onChange={(value) => handlePostChange(post.id, 'author', value)}
                                                                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs w-20"
                                                            />
                                                        </div>
                                                        <div className="flex items-center gap-1 flex-shrink-0">
                                                            <Tag className="w-4 h-4" />
                                                            <EditableInput
                                                                value={post.category}
                                                                onChange={(value) => handlePostChange(post.id, 'category', value)}
                                                                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs w-24"
                                                            />
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(post.date).toLocaleDateString()}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <User className="w-4 h-4" />
                                                            {post.author}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Tag className="w-4 h-4" />
                                                            {post.category}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            {isAdmin && isEditing && (
                                                <div className="flex gap-2 flex-shrink-0 ml-4">
                                                    <button
                                                        onClick={() => setEditingPostId(editingPostId === post.id ? null : post.id)}
                                                        className="text-white/60 hover:text-white transition-colors"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => deletePost(post.id)}
                                                        className="text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                    <h3 className="text-2xl font-light text-white mb-4">
                                        {isAdmin && isEditing ? (
                                            <EditableInput
                                                value={post.title}
                                                onChange={(value) => handlePostChange(post.id, 'title', value)}
                                                className="w-full"
                                            />
                                        ) : (
                                            <span className="w-full">{post.title}</span>
                                        )}
                                    </h3>

                                    <p className="text-white/70 mb-6 leading-relaxed">
                                        {isAdmin && isEditing ? (
                                            <EditableTextarea
                                                value={post.excerpt}
                                                onChange={(value) => handlePostChange(post.id, 'excerpt', value)}
                                                className="w-full"
                                                rows={3}
                                            />
                                        ) : (
                                            <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                                                {post.excerpt}
                                            </span>
                                        )}
                                    </p>

                                    {editingPostId === post.id && (
                                        <div className="mb-6">
                                            <label className="block text-white/70 mb-2">Full Content</label>
                                            <EditableTextarea
                                                value={post.content}
                                                onChange={(value) => handlePostChange(post.id, 'content', value)}
                                                className="w-full"
                                                rows={6}
                                            />
                                        </div>
                                    )}

                                    <button className="text-white/60 hover:text-white transition-colors text-sm">
                                        Read More →
                                    </button>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts Section */}
            <section className="py-20 px-6 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extralight text-white mb-6 tracking-wide">
                            {isAdmin && isEditing ? (
                                <EditableInput
                                    value={content.blogsTitle}
                                    onChange={(value) => handleContentChange('blogsTitle', value)}
                                    className="w-full"
                                    placeholder="Latest Articles & Updates"
                                />
                            ) : (
                                <span className="w-full">{content.blogsTitle}</span>
                            )}
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularPosts.map((post) => (
                            <article key={post.id} className="group backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 hover:scale-105 bg-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-white/50 text-xs flex-1 min-w-0">
                                        {isAdmin && isEditing ? (
                                            <>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <Calendar className="w-3 h-3" />
                                                    <input
                                                        type="date"
                                                        value={post.date}
                                                        onChange={(e) => handlePostChange(post.id, 'date', e.target.value)}
                                                        className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-xs text-white w-20"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <User className="w-3 h-3" />
                                                    <EditableInput
                                                        value={post.author}
                                                        onChange={(value) => handlePostChange(post.id, 'author', value)}
                                                        className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-xs w-16"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1 flex-shrink-0">
                                                    <Tag className="w-3 h-3" />
                                                    <EditableInput
                                                        value={post.category}
                                                        onChange={(value) => handlePostChange(post.id, 'category', value)}
                                                        className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-xs w-16"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.date).toLocaleDateString()}
                                            </>
                                        )}
                                    </div>
                                    {isAdmin && isEditing && (
                                        <div className="flex gap-2 flex-shrink-0 ml-2">
                                            <button
                                                onClick={() => setEditingPostId(editingPostId === post.id ? null : post.id)}
                                                className="text-white/60 hover:text-white transition-colors"
                                            >
                                                <Edit3 className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                                                    <h3 className="text-lg font-light text-white mb-3">
                                        {isAdmin && isEditing ? (
                                            <EditableInput
                                                value={post.title}
                                                onChange={(value) => handlePostChange(post.id, 'title', value)}
                                                className="w-full"
                                            />
                                        ) : (
                                            <span className="w-full">{post.title}</span>
                                        )}
                                    </h3>

                                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                                        {isAdmin && isEditing ? (
                                            <EditableTextarea
                                                value={post.excerpt}
                                                onChange={(value) => handlePostChange(post.id, 'excerpt', value)}
                                                className="w-full"
                                                rows={3}
                                            />
                                        ) : (
                                            <span className="w-full whitespace-pre-line" style={{ whiteSpace: 'pre-line' }}>
                                                {post.excerpt}
                                            </span>
                                        )}
                                    </p>

                                {editingPostId === post.id && (
                                    <div className="mb-4">
                                        <label className="block text-white/70 mb-2 text-xs">Full Content</label>
                                        <EditableTextarea
                                            value={post.content}
                                            onChange={(value) => handlePostChange(post.id, 'content', value)}
                                            className="w-full"
                                            rows={3}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    {isAdmin && isEditing ? (
                                        <EditableInput
                                            value={post.category}
                                            onChange={(value) => handlePostChange(post.id, 'category', value)}
                                            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-xs"
                                        />
                                    ) : (
                                        <span className="text-white/50 text-xs">{post.category}</span>
                                    )}
                                    <button className="text-white/60 hover:text-white transition-colors text-xs">
                                        Read More →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 relative z-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8 tracking-wide">
                        Stay Connected
                    </h2>
                    <p className="text-xl text-white/70 leading-relaxed mb-12 font-light">
                        Don't miss our latest insights and updates. Join our community of passionate entrepreneurs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button
                            onClick={onNavigateToHome}
                            className="bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-lg font-medium"
                        >
                            Join the Studio
                        </button>
                        <button
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300 text-lg"
                        >
                            Subscribe to Newsletter
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
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
                         <button className="text-white hover:text-white/60 transition-colors text-sm" onClick={onNavigateToResources}>
                             Resources & Gifts
                         </button>
                     </div>
                </div>
            </footer>
        </div>
    );
};
