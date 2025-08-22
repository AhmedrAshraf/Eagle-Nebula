# Multilingual System Test Guide

## 🧪 Testing Steps

### 1. Database Setup (Run First)
Before testing, make sure you've run these SQL scripts in your Supabase SQL editor:

1. **Run the main multilingual setup:**
   ```sql
   -- Copy and paste the content from multilingual_setup.sql
   ```

2. **Run the complete Arabic content setup:**
   ```sql
   -- Copy and paste the content from complete_arabic_content.sql
   ```

### 2. Frontend Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the website** at `http://localhost:5174`

3. **Look for the language switcher** in the top-right corner (🌐 icon)

4. **Test Language Switching:**
   - Click the language switcher
   - Should see "عربي" when in English mode
   - Should see "EN" when in Arabic mode

5. **Test Content Display:**
   - **English Mode**: All content should be in English
   - **Arabic Mode**: All content should be in Arabic
   - **RTL Layout**: When in Arabic, layout should be right-to-left

### 3. What to Check

#### ✅ English Mode Should Show:
- "Eagle Nebula Startup Studio"
- "Where Passionate Entrepreneurs Are Created"
- "Apply to Join the Studio"
- "Learn More"
- "Who We Are"
- "Our Focus"
- "Methodology"
- "Journey"
- "Resources & Gifts"

#### ✅ Arabic Mode Should Show:
- "استوديو إيجل نيبولا للشركات الناشئة"
- "حيث يتم إنشاء رواد الأعمال المتحمسين"
- "تقدم للانضمام"
- "اعرف المزيد"
- "من نحن"
- "تركيزنا"
- "منهجيتنا"
- "رحلتك معنا"
- "الموارد والهدايا"

### 4. Troubleshooting

#### If content is still in English when Arabic is selected:

1. **Check Database:**
   ```sql
   -- Check if Arabic content exists
   SELECT COUNT(*) FROM multilingual_content WHERE language = 'ar';
   
   -- Check specific content
   SELECT * FROM multilingual_content WHERE section = 'hero' AND language = 'ar';
   ```

2. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for any errors in the Console tab
   - Check Network tab for failed requests

3. **Check Language Hook:**
   - The `useLanguage` hook should be working
   - Content should be fetched with the correct language parameter

#### If language switcher doesn't appear:

1. **Check if multiple languages exist:**
   ```sql
   SELECT DISTINCT language FROM multilingual_content;
   ```

2. **Check LanguageSwitcher component:**
   - Should only show if multiple languages are available

#### If RTL layout doesn't work:

1. **Check CSS:**
   - Document direction should change to `rtl` when Arabic is selected
   - Check `document.documentElement.dir` in browser console

### 5. Expected Behavior

- ✅ Language switcher appears in top-right corner
- ✅ Clicking switcher changes language
- ✅ Content changes to selected language
- ✅ Layout switches to RTL for Arabic
- ✅ Font remains Space Grotesk for both languages
- ✅ No console errors
- ✅ Content availability indicator shows if no content exists for current language

### 6. Debug Commands

```sql
-- Check all Arabic content
SELECT section, field, value FROM multilingual_content WHERE language = 'ar' ORDER BY section, field;

-- Check resource cards
SELECT * FROM multilingual_resource_cards WHERE language = 'ar';

-- Check blog posts
SELECT * FROM multilingual_blog_posts WHERE language = 'ar';

-- Check available languages
SELECT DISTINCT language FROM multilingual_content;
```

## 🎯 Success Criteria

The multilingual system is working correctly when:

1. ✅ Language switcher appears and works
2. ✅ Content displays in the correct language
3. ✅ RTL layout works for Arabic
4. ✅ No errors in browser console
5. ✅ All sections show translated content
6. ✅ Resource cards and blog posts are translated
7. ✅ UI elements (buttons, forms) are translated

If all these criteria are met, the multilingual system is fully functional! 🌍
