-- Debug Database Content
-- Run this to see what content exists in your database

-- Check if multilingual_content table exists and has data
SELECT '=== CHECKING MULTILINGUAL CONTENT ===' as status;

-- Count content by language
SELECT 
    language,
    COUNT(*) as content_count
FROM multilingual_content 
GROUP BY language
ORDER BY language;

-- Check specific hero content for both languages
SELECT '=== HERO CONTENT ===' as section;
SELECT 
    language,
    field,
    LEFT(value, 50) || '...' as preview
FROM multilingual_content 
WHERE section = 'hero'
ORDER BY language, field;

-- Check if Arabic content exists
SELECT '=== ARABIC CONTENT CHECK ===' as status;
SELECT 
    section,
    field,
    LEFT(value, 30) || '...' as preview
FROM multilingual_content 
WHERE language = 'ar'
ORDER BY section, field
LIMIT 10;

-- Check resource cards
SELECT '=== RESOURCE CARDS ===' as status;
SELECT 
    language,
    COUNT(*) as card_count
FROM multilingual_resource_cards 
GROUP BY language
ORDER BY language;

-- Check blog posts
SELECT '=== BLOG POSTS ===' as status;
SELECT 
    language,
    COUNT(*) as post_count
FROM multilingual_blog_posts 
GROUP BY language
ORDER BY language;

-- Check if tables exist
SELECT '=== TABLE EXISTENCE ===' as status;
SELECT 
    table_name,
    EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = t.table_name
    ) as exists
FROM (VALUES 
    ('multilingual_content'),
    ('multilingual_resource_cards'),
    ('multilingual_blog_posts')
) AS t(table_name);

-- Check table structure
SELECT '=== TABLE STRUCTURE ===' as status;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'multilingual_content'
ORDER BY ordinal_position;
