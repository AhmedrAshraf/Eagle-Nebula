# Supabase Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

## 2. Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. Database Schema

Run this SQL in your Supabase SQL editor:

```sql
-- Create the website_content table
CREATE TABLE website_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  field TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_website_content_section ON website_content(section);
CREATE INDEX idx_website_content_field ON website_content(field);
CREATE UNIQUE INDEX idx_website_content_section_field ON website_content(section, field);

-- Enable Row Level Security (RLS)
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
CREATE POLICY "Allow all operations" ON website_content
  FOR ALL USING (true);
```

## 4. Features

- **Automatic Content Loading**: Website content loads from database on page load
- **Real-time Updates**: Changes are saved to database immediately
- **Admin Access**: Secret admin panel with code "eagle2025"
- **Content Management**: Edit all website content through the admin interface
- **Data Persistence**: All changes are stored permanently in Supabase

## 5. Database Structure

The `website_content` table stores:
- `section`: Content section (hero, who-we-are, focus, etc.)
- `field`: Specific field name (title, description, subtitle, etc.)
- `value`: The actual content text
- `created_at`: When the record was created
- `updated_at`: When the record was last updated

