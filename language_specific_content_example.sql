-- Example: Adding content for specific languages only
-- This demonstrates how to add content that only appears in one language

-- Example 1: Add English-only content
INSERT INTO multilingual_content (section, field, language, value) VALUES
('english-only', 'title', 'en', 'This content is only available in English'),
('english-only', 'description', 'en', 'This section will not appear when the language is set to Arabic')
ON CONFLICT (section, field, language) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Example 2: Add Arabic-only content
INSERT INTO multilingual_content (section, field, language, value) VALUES
('arabic-only', 'title', 'ar', 'هذا المحتوى متاح باللغة العربية فقط'),
('arabic-only', 'description', 'ar', 'هذا القسم لن يظهر عندما تكون اللغة الإنجليزية')
ON CONFLICT (section, field, language) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Example 3: Add content for both languages
INSERT INTO multilingual_content (section, field, language, value) VALUES
('bilingual', 'title', 'en', 'This content is available in both languages'),
('bilingual', 'title', 'ar', 'هذا المحتوى متاح باللغتين'),
('bilingual', 'description', 'en', 'This section will appear in both English and Arabic'),
('bilingual', 'description', 'ar', 'هذا القسم سيظهر باللغتين الإنجليزية والعربية')
ON CONFLICT (section, field, language) 
DO UPDATE SET 
    value = EXCLUDED.value,
    updated_at = NOW();

-- Example 4: Add English-only resource card
INSERT INTO multilingual_resource_cards (original_id, language, title, description, button_text) 
SELECT 
    rc.id,
    'en' as language,
    'English Only Resource' as title,
    'This resource card is only available in English' as description,
    'Download (English Only)' as button_text
FROM resource_cards rc
WHERE rc.title = 'Business Design Framework'
LIMIT 1
ON CONFLICT (original_id, language) 
DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    button_text = EXCLUDED.button_text,
    updated_at = NOW();

-- Example 5: Add Arabic-only blog post
INSERT INTO multilingual_blog_posts (original_id, language, title, excerpt, content) 
SELECT 
    bp.id,
    'ar' as language,
    'مقال متاح باللغة العربية فقط' as title,
    'هذا المقال لن يظهر في اللغة الإنجليزية' as excerpt,
    'محتوى المقال باللغة العربية فقط. هذا المقال لن يظهر عندما تكون اللغة الإنجليزية محددة.' as content
FROM blog_posts bp
WHERE bp.title = 'The Future of AI in Saudi Entrepreneurship'
LIMIT 1
ON CONFLICT (original_id, language) 
DO UPDATE SET 
    title = EXCLUDED.title,
    excerpt = EXCLUDED.excerpt,
    content = EXCLUDED.content,
    updated_at = NOW();

-- Verify the examples
SELECT 'Language-specific content examples added successfully' as status;

-- Check what content is available for each language
SELECT 
    'English Content' as language,
    COUNT(*) as content_count
FROM multilingual_content 
WHERE language = 'en'
UNION ALL
SELECT 
    'Arabic Content' as language,
    COUNT(*) as content_count
FROM multilingual_content 
WHERE language = 'ar';

-- Show sections available in each language
SELECT 
    language,
    section,
    COUNT(*) as field_count
FROM multilingual_content 
GROUP BY language, section
ORDER BY language, section;
