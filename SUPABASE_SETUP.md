# Supabase Setup Guide for Eagle Nebula

## Database Setup

### 1. Create the website_content table
```sql
CREATE TABLE IF NOT EXISTS website_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(section, field)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_content_section_field ON website_content(section, field);
CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content(section);
```

### 2. Create the resource_files table
```sql
CREATE TABLE IF NOT EXISTS resource_files (
    id SERIAL PRIMARY KEY,
    resource_id VARCHAR(255) NOT NULL UNIQUE,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size VARCHAR(50) NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_resource_files_resource_id ON resource_files(resource_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resource_files_updated_at 
    BEFORE UPDATE ON resource_files 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## Storage Setup

### 1. Create Storage Bucket
1. Go to your Supabase project dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Name the bucket: `resources`
5. Set it as **Public** (so files can be downloaded)
6. Click **Create bucket**

### 2. Configure Storage Policies
Run these SQL commands in your Supabase SQL editor:

```sql
-- Allow public read access to resources bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'resources');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload files" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'resources' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own files
CREATE POLICY "Authenticated users can update files" ON storage.objects FOR UPDATE 
USING (bucket_id = 'resources' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own files
CREATE POLICY "Authenticated users can delete files" ON storage.objects FOR DELETE 
USING (bucket_id = 'resources' AND auth.role() = 'authenticated');
```

## Environment Variables

Make sure your `.env` file contains:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## File Upload Features

### Supported File Types
- PDF documents (.pdf)
- Word documents (.doc, .docx)
- Excel spreadsheets (.xls, .xlsx)
- PowerPoint presentations (.ppt, .pptx)
- Text files (.txt)
- Compressed files (.zip, .rar)

### File Size Limits
- Maximum file size: 50MB per file
- Total storage: Depends on your Supabase plan

### Security Features
- Files are stored with unique names to prevent conflicts
- Public read access for downloads
- Authenticated upload/delete access
- File type validation on frontend

## Usage Instructions

### For Admins:
1. **Access Admin Mode**: Triple-click the logo to reveal admin button
2. **Enter Admin Code**: Use "eagle2025" to access editing features
3. **Edit Content**: Click "Edit Content" to enable editing mode
4. **Upload Files**: 
   - Click "Upload File" on any resource card
   - Select your file (PDF, DOC, XLS, etc.)
   - File will be uploaded to Supabase Storage
   - File information is saved to database
5. **Manage Files**:
   - View uploaded files with size information
   - Replace files by clicking "Replace"
   - Remove files by clicking "Remove"
6. **Save Changes**: Click "Save" to persist all changes

### For Users:
1. **Browse Resources**: View all available resources and materials
2. **Download Files**: Click download buttons to get files
3. **Take Assessments**: Access assessment tools
4. **Join Community**: Access community features

## Troubleshooting

### Common Issues:

1. **File Upload Fails**
   - Check file size (max 50MB)
   - Verify file type is supported
   - Ensure you're in admin mode
   - Check browser console for errors

2. **Files Not Loading**
   - Verify storage bucket exists and is public
   - Check storage policies are configured
   - Ensure database tables are created

3. **Download Issues**
   - Verify file URL is accessible
   - Check file exists in storage bucket
   - Ensure public read policy is active

### Database Queries for Debugging:

```sql
-- Check website content
SELECT * FROM website_content WHERE section = 'resources';

-- Check uploaded files
SELECT * FROM resource_files;

-- Check storage objects
SELECT * FROM storage.objects WHERE bucket_id = 'resources';
```

## Backup and Maintenance

### Regular Backups:
1. Export database schema and data
2. Backup storage bucket contents
3. Keep environment variables secure

### Monitoring:
1. Monitor storage usage
2. Check for orphaned files
3. Review access logs

## Security Considerations

1. **File Validation**: Always validate file types on both frontend and backend
2. **Size Limits**: Enforce file size limits to prevent abuse
3. **Access Control**: Use proper authentication for admin features
4. **Regular Audits**: Periodically review uploaded files and access logs

