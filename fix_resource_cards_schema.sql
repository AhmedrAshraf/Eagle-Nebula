-- Fix resource_cards table schema to match camelCase column names
-- This fixes the PGRST204 error where column names don't match

-- Drop the existing table if it exists
DROP TABLE IF EXISTS resource_cards CASCADE;

-- Recreate the table with correct camelCase column names
CREATE TABLE resource_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    buttonText VARCHAR(255) NOT NULL,
    buttonAction VARCHAR(50) NOT NULL CHECK (buttonAction IN ('download', 'link', 'contact', 'no-action')),
    buttonLink TEXT,
    icon VARCHAR(100),
    category VARCHAR(100),
    "order" INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for ordering
CREATE INDEX idx_resource_cards_order ON resource_cards("order");

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_resource_cards_updated_at
    BEFORE UPDATE ON resource_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert the original resource cards with correct column names
INSERT INTO resource_cards (title, description, buttonText, buttonAction, "order", created_at, updated_at) VALUES
('Business Design Framework', 'Our complete framework for designing your business around your unique founder profile. Includes detailed worksheets, step-by-step guides, and AI prompts to help you discover your sweet spot.', 'Download Framework', 'download', 1, NOW(), NOW()),
('AI Co-Builder Toolkit', 'Essential AI tools and prompts for market research, content creation, business validation, and operations. Save months of work with our curated collection of AI assistants.', 'Download Toolkit', 'download', 2, NOW(), NOW()),
('Founder Fit Assessment', 'Discover your unique founder profile with our comprehensive assessment. Understand your strengths, work style, and ideal business model before you build.', 'Take Assessment', 'link', 3, NOW(), NOW()),
('Startup Validation Checklist', 'Step-by-step checklist to validate your business idea before you invest significant time and money. Avoid common pitfalls and build with confidence.', 'Download Checklist', 'download', 4, NOW(), NOW()),
('Saudi Market Insights Report', 'Exclusive insights into the Saudi startup ecosystem, emerging trends, funding landscape, and opportunities. Stay ahead of the curve.', 'Download Report', 'download', 5, NOW(), NOW()),
('Investor Pitch Template', 'Professional pitch deck template specifically designed for passionate entrepreneurs. Includes storytelling frameworks and design guidelines.', 'Download Template', 'download', 6, NOW(), NOW()),
('Financial Planning Model', 'Comprehensive Excel/Google Sheets financial model template for startups. Includes revenue projections, cash flow, and scenario planning.', 'Download Model', 'download', 7, NOW(), NOW()),
('Exclusive Community Access', 'Join our private community of passionate Saudi entrepreneurs, seasoned coaches, and successful operators. Network, learn, and grow together.', 'Join Community', 'contact', 8, NOW(), NOW());

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'resource_cards' 
ORDER BY ordinal_position;
