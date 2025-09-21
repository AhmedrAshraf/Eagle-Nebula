-- Test Main Website Content
-- Check if the main website content exists in the multilingual_content table

-- Check all Arabic content sections
SELECT '=== ARABIC CONTENT SECTIONS ===' as status;
SELECT section, COUNT(*) as field_count 
FROM multilingual_content 
WHERE language = 'ar' 
GROUP BY section 
ORDER BY section;

-- Check hero section content
SELECT '=== HERO SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'hero' 
ORDER BY field;

-- Check who-we-are section content
SELECT '=== WHO-WE-ARE SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'who-we-are' 
ORDER BY field;

-- Check focus section content
SELECT '=== FOCUS SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'focus' 
ORDER BY field;

-- Check methodology section content
SELECT '=== METHODOLOGY SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'methodology' 
ORDER BY field;

-- Check what-you-get section content
SELECT '=== WHAT-YOU-GET SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'what-you-get' 
ORDER BY field;

-- Check journey section content
SELECT '=== JOURNEY SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'journey' 
ORDER BY field;

-- Check cta section content
SELECT '=== CTA SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'cta' 
ORDER BY field;

-- Check footer section content
SELECT '=== FOOTER SECTION CONTENT ===' as status;
SELECT field, value 
FROM multilingual_content 
WHERE language = 'ar' AND section = 'footer' 
ORDER BY field;

-- Summary
SELECT '=== SUMMARY ===' as status;
SELECT 
    'Total Arabic content entries' as info,
    COUNT(*) as count
FROM multilingual_content 
WHERE language = 'ar'
UNION ALL
SELECT 
    'Total sections' as info,
    COUNT(DISTINCT section) as count
FROM multilingual_content 
WHERE language = 'ar';
