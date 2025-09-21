# Multilingual Setup for Eagle Nebula

This document explains the multilingual (English/Arabic) implementation for the Eagle Nebula website.

## Overview

The website now supports both English and Arabic languages with:
- Full RTL (Right-to-Left) layout support for Arabic
- Database-level multilingual content storage
- Dynamic language switching
- Proper font support for Arabic text
- Translation management system

## Database Schema

### New Tables Created

1. **multilingual_content** - Stores website content in multiple languages
   - `id` (UUID, Primary Key)
   - `section` (VARCHAR) - Content section (e.g., 'hero', 'about')
   - `field` (VARCHAR) - Content field (e.g., 'title', 'description')
   - `language` (VARCHAR(2)) - Language code ('en', 'ar')
   - `value` (TEXT) - Translated content
   - `created_at`, `updated_at` (TIMESTAMP)

2. **multilingual_resource_cards** - Stores resource cards in multiple languages
   - `id` (UUID, Primary Key)
   - `original_id` (UUID) - Reference to resource_cards table
   - `language` (VARCHAR(2)) - Language code
   - `title`, `description`, `button_text` (VARCHAR/TEXT) - Translated content
   - `created_at`, `updated_at` (TIMESTAMP)

3. **multilingual_blog_posts** - Stores blog posts in multiple languages
   - `id` (UUID, Primary Key)
   - `original_id` (UUID) - Reference to blog_posts table
   - `language` (VARCHAR(2)) - Language code
   - `title`, `excerpt`, `content` (VARCHAR/TEXT) - Translated content
   - `created_at`, `updated_at` (TIMESTAMP)

### Modified Tables

- **website_content** - Added `language` column
- **resource_cards** - Added `language` column
- **blog_posts** - Added `language` column

## Setup Instructions

### 1. Database Setup

Run the SQL script in your Supabase SQL editor:

```sql
-- Run the multilingual_setup.sql file
```

This will:
- Create new multilingual tables
- Add language columns to existing tables
- Migrate existing content to the new structure
- Insert Arabic translations for all content

### 2. Frontend Setup

The frontend is already configured with:

- **i18n Configuration** (`src/i18n/index.ts`)
- **Translation Files** (`src/i18n/locales/en.json`, `src/i18n/locales/ar.json`)
- **Language Switcher Component** (`src/components/LanguageSwitcher.tsx`)
- **Language Hook** (`src/hooks/useLanguage.ts`)
- **RTL CSS Support** (`src/index.css`)

### 3. Content Management

#### Using the Multilingual Content Manager

1. Access the content manager component
2. Select the language you want to edit
3. Click the edit button next to any content field
4. Make your changes and save

#### Programmatic Content Updates

```typescript
import { ContentService } from '../services/contentService';

// Update content in a specific language
await ContentService.updateContent('hero', 'title', 'New Title', 'ar');

// Fetch content for a specific language
const content = await ContentService.fetchAllContent('ar');
```

## Features

### Language Switching

- Users can switch between English and Arabic using the language switcher
- The UI automatically adjusts for RTL layout
- Content is dynamically loaded based on selected language
- Language preference is saved in localStorage

### RTL Support

- Full right-to-left layout support for Arabic
- Proper text alignment and spacing
- Arabic font (Noto Sans Arabic) for better readability
- Automatic direction switching based on language

### Content Management

- Admin interface for managing translations
- Real-time content updates
- Fallback to English if translation is missing
- Support for rich text content

## File Structure

```
src/
├── i18n/
│   ├── index.ts                 # i18n configuration
│   └── locales/
│       ├── en.json             # English translations
│       └── ar.json             # Arabic translations
├── components/
│   ├── LanguageSwitcher.tsx    # Language toggle component
│   └── MultilingualContentManager.tsx # Admin content manager
├── hooks/
│   └── useLanguage.ts          # Language management hook
├── services/
│   └── contentService.ts       # Updated with multilingual support
└── index.css                   # RTL and Arabic font support
```

## Usage Examples

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

### Using the Language Hook

```typescript
import { useLanguage } from '../hooks/useLanguage';

const MyComponent = () => {
  const { currentLanguage, changeLanguage, getContent, isRTL } = useLanguage();
  
  return (
    <div>
      <h1>{getContent('hero', 'title')}</h1>
      <button onClick={() => changeLanguage('ar')}>
        Switch to Arabic
      </button>
    </div>
  );
};
```

### Managing Content Programmatically

```typescript
import { ContentService } from '../services/contentService';

// Add new content
await ContentService.updateContent('new-section', 'title', 'New Title', 'en');
await ContentService.updateContent('new-section', 'title', 'عنوان جديد', 'ar');

// Fetch content for specific language
const englishContent = await ContentService.fetchAllContent('en');
const arabicContent = await ContentService.fetchAllContent('ar');
```

## Best Practices

1. **Always provide translations for both languages** when adding new content
2. **Use the translation keys** in components for dynamic content
3. **Test RTL layout** thoroughly when adding new components
4. **Keep translation files organized** and up to date
5. **Use semantic HTML** for better RTL support
6. **Test with Arabic content** to ensure proper text rendering

## Troubleshooting

### Common Issues

1. **Content not loading in Arabic**
   - Check if Arabic translations exist in the database
   - Verify the multilingual_content table has the correct data

2. **RTL layout issues**
   - Ensure CSS classes are properly applied
   - Check for hardcoded left/right positioning

3. **Font rendering issues**
   - Verify Noto Sans Arabic font is loading
   - Check browser font settings

### Debug Commands

```sql
-- Check multilingual content
SELECT * FROM multilingual_content WHERE language = 'ar';

-- Check resource cards
SELECT * FROM multilingual_resource_cards WHERE language = 'ar';

-- Check blog posts
SELECT * FROM multilingual_blog_posts WHERE language = 'ar';
```

## Future Enhancements

- [ ] Add more languages (French, Spanish, etc.)
- [ ] Implement translation memory
- [ ] Add automatic translation suggestions
- [ ] Create translation workflow for content editors
- [ ] Add language-specific SEO meta tags
- [ ] Implement language-specific URLs
