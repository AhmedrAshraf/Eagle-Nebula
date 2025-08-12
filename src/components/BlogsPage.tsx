import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft, Edit3, Plus, Calendar, User, Tag, Save, X, Trash2, Twitter, Instagram, Linkedin } from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    featured: boolean;
}

interface EditableContent {
    heroTitle: string;
    heroDescription: string;
    blogsTitle: string;
}

export const BlogsPage: React.FC<{ 
  onBack: () => void;
  onNavigateToResources: () => void;
}> = ({ onBack, onNavigateToResources }) => {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);

    const [content, setContent] = useState<EditableContent>({
        heroTitle: 'Blogs & News',
        heroDescription: 'Stay updated with the latest insights, trends, and stories from the world of entrepreneurship and AI-powered business building.',
        blogsTitle: 'Latest Articles & Updates'
    });

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
        {
            id: '1',
            title: 'The Future of AI in Saudi Entrepreneurship',
            excerpt: 'Discover how artificial intelligence is transforming the Saudi startup ecosystem and creating new opportunities for passionate entrepreneurs.',
            content: 'The landscape of entrepreneurship in Saudi Arabia is rapidly evolving, with artificial intelligence playing a pivotal role in this transformation...',
            author: 'Eagle Nebula Team',
            date: '2024-01-15',
            category: 'AI & Technology',
            featured: true
        },
        {
            id: '2',
            title: 'Building Your Business Around Passion: A Framework',
            excerpt: 'Learn our proven methodology for designing businesses that align with your personal passions, skills, and long-term goals.',
            content: 'Most entrepreneurs start with market trends and try to fit themselves into opportunities. We believe in starting with the founder...',
            author: 'Sarah Al-Rashid',
            date: '2024-01-10',
            category: 'Business Strategy',
            featured: true
        },
        {
            id: '3',
            title: 'Vision 2030 and the Startup Revolution',
            excerpt: 'How Saudi Vision 2030 is creating unprecedented opportunities for innovative startups and passionate entrepreneurs.',
            content: 'Saudi Arabia\'s Vision 2030 has opened doors for entrepreneurs like never before. From NEOM to the Red Sea Project...',
            author: 'Ahmed Al-Fahad',
            date: '2024-01-05',
            category: 'Industry News',
            featured: false
        },
        {
            id: '4',
            title: 'From Idea to MVP: Our Co-Founding Process',
            excerpt: 'Take a behind-the-scenes look at how we work with founders to transform ideas into viable products and businesses.',
            content: 'The journey from idea to minimum viable product is crucial for any startup. At Eagle Nebula, we\'ve refined this process...',
            author: 'Eagle Nebula Team',
            date: '2023-12-28',
            category: 'Case Studies',
            featured: false
        }
    ]);

    const [newPost, setNewPost] = useState<Partial<BlogPost>>({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        featured: false
    });

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

    const createNewPost = () => {
        if (!newPost.title || !newPost.excerpt || !newPost.content) {
            alert('Please fill in all required fields');
            return;
        }

        const post: BlogPost = {
            id: Date.now().toString(),
            title: newPost.title || '',
            excerpt: newPost.excerpt || '',
            content: newPost.content || '',
            author: newPost.author || 'Eagle Nebula Team',
            date: new Date().toISOString().split('T')[0],
            category: newPost.category || 'General',
            featured: newPost.featured || false
        };

        setBlogPosts(prev => [post, ...prev]);
        setNewPost({
            title: '',
            excerpt: '',
            content: '',
            author: '',
            category: '',
            featured: false
        });
        setIsCreating(false);
    };

    const deletePost = (postId: string) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            setBlogPosts(prev => prev.filter(post => post.id !== postId));
        }
    };

    const EditableText: React.FC<{
        value: string;
        onChange: (value: string) => void;
        className?: string;
        multiline?: boolean;
        placeholder?: string;
    }> = ({ value, onChange, className = '', multiline = false, placeholder = '' }) => {
        if (!isEditing && !isCreating) {
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

    const EditableBlogText: React.FC<{
        value: string;
        onChange: (value: string) => void;
        className?: string;
        multiline?: boolean;
        placeholder?: string;
        postId?: string;
    }> = ({ value, onChange, className = '', multiline = false, placeholder = '', postId }) => {
        const shouldEdit = editingPostId === postId || isCreating;

        if (!shouldEdit) {
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
                    rows={multiline ? 6 : 3}
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

    const featuredPosts = blogPosts.filter(post => post.featured);
    const regularPosts = blogPosts.filter(post => !post.featured);

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
                                onClick={() => setIsCreating(!isCreating)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isCreating
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30'
                                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                                    }`}
                            >
                                {isCreating ? (
                                    <>
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        New Post
                                    </>
                                )}
                            </button>
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

            {/* Create New Post Section */}
            {isCreating && (
                <section className="py-20 px-6 relative z-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="backdrop-blur-sm border border-white/10 rounded-2xl p-8 bg-white/10">
                            <h2 className="text-3xl font-light text-white mb-8 text-center">Create New Blog Post</h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-white/70 mb-2">Title *</label>
                                    <EditableBlogText
                                        value={newPost.title || ''}
                                        onChange={(value) => handleNewPostChange('title', value)}
                                        className="w-full"
                                        placeholder="Enter blog post title..."
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white/70 mb-2">Author</label>
                                        <EditableBlogText
                                            value={newPost.author || ''}
                                            onChange={(value) => handleNewPostChange('author', value)}
                                            className="w-full"
                                            placeholder="Author name..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/70 mb-2">Category</label>
                                        <EditableBlogText
                                            value={newPost.category || ''}
                                            onChange={(value) => handleNewPostChange('category', value)}
                                            className="w-full"
                                            placeholder="Category..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white/70 mb-2">Excerpt *</label>
                                    <EditableBlogText
                                        value={newPost.excerpt || ''}
                                        onChange={(value) => handleNewPostChange('excerpt', value)}
                                        className="w-full"
                                        multiline
                                        placeholder="Brief description of the blog post..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-white/70 mb-2">Content *</label>
                                    <textarea
                                        value={newPost.content || ''}
                                        onChange={(e) => handleNewPostChange('content', e.target.value)}
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-3 resize-none text-white"
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
                                        <div className="flex items-center gap-4 text-white/60 text-sm">
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
                                        </div>
                                        {isEditing && (
                                            <div className="flex gap-2">
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
                                        <EditableBlogText
                                            value={post.title}
                                            onChange={(value) => handlePostChange(post.id, 'title', value)}
                                            className="w-full"
                                            postId={post.id}
                                        />
                                    </h3>

                                    <p className="text-white/70 mb-6 leading-relaxed">
                                        <EditableBlogText
                                            value={post.excerpt}
                                            onChange={(value) => handlePostChange(post.id, 'excerpt', value)}
                                            className="w-full"
                                            multiline
                                            postId={post.id}
                                        />
                                    </p>

                                    {editingPostId === post.id && (
                                        <div className="mb-6">
                                            <label className="block text-white/70 mb-2">Full Content</label>
                                            <EditableBlogText
                                                value={post.content}
                                                onChange={(value) => handlePostChange(post.id, 'content', value)}
                                                className="w-full"
                                                multiline
                                                postId={post.id}
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
                            <EditableText
                                value={content.blogsTitle}
                                onChange={(value) => handleContentChange('blogsTitle', value)}
                            />
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regularPosts.map((post) => (
                            <article key={post.id} className="group backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-500 hover:scale-105 bg-white/5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-white/50 text-xs">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.date).toLocaleDateString()}
                                    </div>
                                    {isEditing && (
                                        <div className="flex gap-2">
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
                                    <EditableBlogText
                                        value={post.title}
                                        onChange={(value) => handlePostChange(post.id, 'title', value)}
                                        className="w-full"
                                        postId={post.id}
                                    />
                                </h3>

                                <p className="text-white/60 text-sm leading-relaxed mb-4">
                                    <EditableBlogText
                                        value={post.excerpt}
                                        onChange={(value) => handlePostChange(post.id, 'excerpt', value)}
                                        className="w-full"
                                        multiline
                                        postId={post.id}
                                    />
                                </p>

                                {editingPostId === post.id && (
                                    <div className="mb-4">
                                        <label className="block text-white/70 mb-2 text-xs">Full Content</label>
                                        <EditableBlogText
                                            value={post.content}
                                            onChange={(value) => handlePostChange(post.id, 'content', value)}
                                            className="w-full"
                                            multiline
                                            postId={post.id}
                                        />
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-white/50 text-xs">{post.category}</span>
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
                            onClick={onBack}
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
                            <Twitter className="w-5 h-5" />
                        </button>
                        <button className="text-white hover:text-white/60 transition-colors text-sm">
                            <Instagram className="w-5 h-5" />
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
