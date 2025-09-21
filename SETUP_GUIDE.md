# Multilingual Setup Guide for Eagle Nebula

This guide will help you set up the complete multilingual (English/Arabic) system for the Eagle Nebula website.

## 🚀 Quick Start

### 1. Database Setup

Run these SQL scripts in your Supabase SQL editor in order:

1. **First, run the main multilingual setup:**
   ```sql
   -- Copy and paste the content from multilingual_setup.sql
   ```

2. **Then, run the Arabic translations setup:**
   ```sql
   -- Copy and paste the content from arabic_translations_setup.sql
   ```

### 2. Frontend Setup

The frontend is already configured! The following files have been created/updated:

- ✅ `src/i18n/index.ts` - i18n configuration
- ✅ `src/i18n/locales/en.json` - English translations
- ✅ `src/i18n/locales/ar.json` - Arabic translations
- ✅ `src/components/LanguageSwitcher.tsx` - Language toggle
- ✅ `src/hooks/useLanguage.ts` - Language management hook
- ✅ `src/services/contentService.ts` - Updated with multilingual support
- ✅ `src/index.css` - RTL support and Space Grotesk font
- ✅ `src/App.tsx` - Language switcher integration

### 3. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. You should see a language switcher in the top-right corner
3. Click it to switch between English and Arabic
4. The layout should automatically adjust for RTL (Right-to-Left) when in Arabic

## 📋 What's Included

### Database Tables Created

1. **`multilingual_content`** - Website content in multiple languages
2. **`multilingual_resource_cards`** - Resource cards in multiple languages  
3. **`multilingual_blog_posts`** - Blog posts in multiple languages

### Features Implemented

- ✅ **Language Switching** - Toggle between English and Arabic
- ✅ **RTL Layout Support** - Automatic right-to-left layout for Arabic
- ✅ **Space Grotesk Font** - Same font for both languages
- ✅ **Database Integration** - Content stored and retrieved by language
- ✅ **Content Management** - Admin interface for managing translations
- ✅ **Language-Specific Content** - Content only shows in the language it was saved in
- ✅ **Content Availability Indicator** - Shows when content is not available in current language

### Arabic Content Added

All website content has been translated to Arabic:

- ✅ Hero section
- ✅ Who We Are section
- ✅ Focus section
- ✅ Methodology section
- ✅ What You Get section
- ✅ Journey section
- ✅ CTA section
- ✅ Resources section
- ✅ Blogs section
- ✅ Resource cards (8 items)
- ✅ Blog posts (4 items)

## 🔧 Usage Examples

### Using Translations in Components

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.description')}</p>
    </div>
  );
};
```

### Using Database Content

```typescript
import { useLanguage } from '../hooks/useLanguage';

const MyComponent = () => {
  const { getContent } = useLanguage();
  
  return (
    <div>
      <h1>{getContent('hero', 'title')}</h1>
      <p>{getContent('hero', 'description')}</p>
    </div>
  );
};
```

### Managing Content Programmatically

```typescript
import { ContentService } from '../services/contentService';

// Update content in Arabic
await ContentService.updateContent('hero', 'title', 'عنوان جديد', 'ar');

// Fetch Arabic content
const arabicContent = await ContentService.fetchAllContent('ar');

// Check if content exists for a language
const hasArabicContent = await ContentService.hasContentForLanguage('ar');

// Get available languages
const availableLanguages = await ContentService.getAvailableLanguages();
```

### Language-Specific Content

Content is now language-specific:
- If content is saved in Arabic, it only shows when Arabic is selected
- If content is saved in English, it only shows when English is selected
- No fallback between languages - each language is independent
- Content availability indicator shows when no content exists for current language

## 🎨 Font and Styling

The website now uses **Space Grotesk** for both English and Arabic, maintaining visual consistency while supporting both languages.

### RTL Support

The CSS automatically handles:
- Text direction (RTL for Arabic)
- Text alignment
- Margin and padding adjustments
- Flexbox direction changes

## 📊 Content Structure

### Translation Keys

The content is organized by sections:

```
common.*          - Common UI elements
navigation.*      - Navigation items
hero.*           - Hero section
whoWeAre.*       - Who We Are section
focus.*          - Focus section
methodology.*    - Methodology section
whatYouGet.*     - What You Get section
journey.*        - Journey section
cta.*            - Call to Action section
resources.*      - Resources section
blogs.*          - Blogs section
resourceCards.*  - Resource cards
blogPosts.*      - Blog posts
```

### Database Structure

Each piece of content is stored with:
- `section` - Content section (e.g., 'hero')
- `field` - Content field (e.g., 'title')
- `language` - Language code ('en' or 'ar')
- `value` - The actual content

## 🛠️ Admin Tools

### Multilingual Content Manager

Access the content manager component to edit translations:

```typescript
import MultilingualContentManager from './components/MultilingualContentManager';

// Use in your admin panel
<MultilingualContentManager />
```

### Test Component

Use the test component to verify everything is working:

```typescript
import MultilingualTest from './components/MultilingualTest';

// Use for testing
<MultilingualTest />
```

## 🔍 Troubleshooting

### Common Issues

1. **Content not loading in Arabic**
   - Check if Arabic translations exist in the database
   - Run the SQL scripts again if needed

2. **RTL layout issues**
   - Ensure CSS classes are properly applied
   - Check for hardcoded left/right positioning

3. **Font not loading**
   - Verify Space Grotesk is loading from Google Fonts
   - Check browser network tab for font requests

### Debug Commands

```sql
-- Check if Arabic content exists
SELECT COUNT(*) FROM multilingual_content WHERE language = 'ar';

-- Check specific content
SELECT * FROM multilingual_content WHERE section = 'hero' AND language = 'ar';

-- Check resource cards
SELECT * FROM multilingual_resource_cards WHERE language = 'ar';
```

## 📈 Next Steps

After setup, you can:

1. **Customize translations** using the content manager
2. **Add more languages** by extending the system
3. **Implement SEO** with language-specific meta tags
4. **Add language-specific URLs** for better SEO
5. **Create translation workflows** for content editors

## 🎯 Success Criteria

You'll know the setup is complete when:

- ✅ Language switcher appears in top-right corner
- ✅ Clicking the switcher changes the language
- ✅ Layout switches to RTL for Arabic
- ✅ Content only shows in the language it was saved in
- ✅ Content availability indicator appears when no content exists for current language
- ✅ Font remains consistent (Space Grotesk)
- ✅ No console errors

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify the SQL scripts ran successfully
3. Ensure all files are properly imported
4. Test with the MultilingualTest component

The multilingual system is now fully integrated and ready to use! 🌍
