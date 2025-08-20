-- Setup for Blogs & News section
-- Run this in your Supabase SQL editor

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering by date
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default blog posts
INSERT INTO blog_posts (title, excerpt, content, author, date, category, featured) VALUES
('The Future of AI in Saudi Entrepreneurship', 'Discover how artificial intelligence is transforming the Saudi startup ecosystem and creating new opportunities for passionate entrepreneurs.', 'The landscape of entrepreneurship in Saudi Arabia is rapidly evolving, with artificial intelligence playing a pivotal role in this transformation. From automated business processes to AI-powered market analysis, the opportunities for innovative startups are unprecedented. Our team at Eagle Nebula is at the forefront of this revolution, helping passionate entrepreneurs leverage AI to build scalable, impactful businesses.', 'Eagle Nebula Team', '2024-01-15', 'AI & Technology', true),
('Building Your Business Around Passion: A Framework', 'Learn our proven methodology for designing businesses that align with your personal passions, skills, and long-term goals.', 'Most entrepreneurs start with market trends and try to fit themselves into opportunities. We believe in starting with the founder - understanding your unique combination of passion, skills, and vision to create a business that truly fits you. This approach leads to more sustainable, fulfilling, and successful ventures.', 'Sarah Al-Rashid', '2024-01-10', 'Business Strategy', true),
('Vision 2030 and the Startup Revolution', 'How Saudi Vision 2030 is creating unprecedented opportunities for innovative startups and passionate entrepreneurs.', 'Saudi Arabia''s Vision 2030 has opened doors for entrepreneurs like never before. From NEOM to the Red Sea Project, the Kingdom is actively supporting innovative startups that align with its ambitious goals. This is the perfect time for passionate entrepreneurs to build businesses that contribute to Saudi Arabia''s future.', 'Ahmed Al-Fahad', '2024-01-05', 'Industry News', false),
('From Idea to MVP: Our Co-Founding Process', 'Take a behind-the-scenes look at how we work with founders to transform ideas into viable products and businesses.', 'The journey from idea to minimum viable product is crucial for any startup. At Eagle Nebula, we''ve refined this process to help passionate entrepreneurs build faster and smarter. Our co-founding approach ensures that founders have the support they need every step of the way.', 'Eagle Nebula Team', '2023-12-28', 'Case Studies', false);

-- Insert blog page content into website_content table
INSERT INTO website_content (section, field, value, created_at, updated_at) VALUES
('blogs', 'heroTitle', 'Blogs & News', NOW(), NOW()),
('blogs', 'heroDescription', 'Stay updated with the latest insights, trends, and stories from the world of entrepreneurship and AI-powered business building.', NOW(), NOW()),
('blogs', 'blogsTitle', 'Latest Articles & Updates', NOW(), NOW())
ON CONFLICT (section, field) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Verify the setup
SELECT 'Blog posts table created successfully' as status;
SELECT COUNT(*) as blog_posts_count FROM blog_posts;
SELECT COUNT(*) as blog_content_count FROM website_content WHERE section = 'blogs';
