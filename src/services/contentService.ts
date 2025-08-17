import { supabase, WebsiteContent, ContentUpdate } from '../lib/supabase'

export interface FileUploadResult {
  url: string;
  fileName: string;
  fileSize: string;
}

export interface ResourceCard {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: 'download' | 'link' | 'contact' | 'no-action';
  buttonLink?: string;
  icon?: string;
  category?: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export class ContentService {
  // Fetch all content from database
  static async fetchAllContent(): Promise<Record<string, any>> {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('section', { ascending: true })

      if (error) {
        console.error('Error fetching content:', error)
        throw error
      }

      // Transform data into the format expected by the component
      const contentMap: Record<string, any> = {}
      
      data?.forEach((item: WebsiteContent) => {
        if (!contentMap[item.section]) {
          contentMap[item.section] = {}
        }
        contentMap[item.section][item.field] = item.value
      })

      return contentMap
    } catch (error) {
      console.error('Error in fetchAllContent:', error)
      throw error
    }
  }

  // Upload file to Supabase Storage
  static async uploadFile(file: File, resourceId: string): Promise<FileUploadResult> {
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${resourceId}_${timestamp}.${fileExtension}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('resources')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Error uploading file:', error);
        throw error;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('resources')
        .getPublicUrl(fileName);

      // Convert file size to readable format
      const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
      };

      return {
        url: urlData.publicUrl,
        fileName: file.name,
        fileSize: formatFileSize(file.size)
      };
    } catch (error) {
      console.error('Error in uploadFile:', error);
      throw error;
    }
  }

  // Delete file from Supabase Storage
  static async deleteFile(fileName: string): Promise<void> {
    try {
      const { error } = await supabase.storage
        .from('resources')
        .remove([fileName]);

      if (error) {
        console.error('Error deleting file:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in deleteFile:', error);
      throw error;
    }
  }

  // Save resource file information to database
  static async saveResourceFile(resourceId: string, fileInfo: FileUploadResult): Promise<void> {
    try {
      const { error } = await supabase
        .from('resource_files')
        .upsert({
          resource_id: resourceId,
          file_url: fileInfo.url,
          file_name: fileInfo.fileName,
          file_size: fileInfo.fileSize,
          uploaded_at: new Date().toISOString()
        }, {
          onConflict: 'resource_id'
        });

      if (error) {
        console.error('Error saving resource file:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error in saveResourceFile:', error);
      throw error;
    }
  }

  // Get resource file information from database
  static async getResourceFiles(): Promise<Record<string, FileUploadResult>> {
    try {
      const { data, error } = await supabase
        .from('resource_files')
        .select('*');

      if (error) {
        console.error('Error fetching resource files:', error);
        throw error;
      }

      // Transform data into a map
      const fileMap: Record<string, FileUploadResult> = {};
      data?.forEach((item: any) => {
        fileMap[item.resource_id] = {
          url: item.file_url,
          fileName: item.file_name,
          fileSize: item.file_size
        };
      });

      return fileMap;
    } catch (error) {
      console.error('Error in getResourceFiles:', error);
      throw error;
    }
  }

  // Update a single content field
  static async updateContent(section: string, field: string, value: string): Promise<void> {
    try {
      // First, try to update existing record
      const { error: updateError } = await supabase
        .from('website_content')
        .update({ 
          value,
          updated_at: new Date().toISOString()
        })
        .eq('section', section)
        .eq('field', field)

      if (updateError) {
        console.error('Error updating content:', updateError)
        throw updateError
      }

      // If no rows were updated, insert new record
      const { data: existingData } = await supabase
        .from('website_content')
        .select('id')
        .eq('section', section)
        .eq('field', field)
        .single()

      if (!existingData) {
        const { error: insertError } = await supabase
          .from('website_content')
          .insert({
            section,
            field,
            value,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (insertError) {
          console.error('Error inserting content:', insertError)
          throw insertError
        }
      }
    } catch (error) {
      console.error('Error in updateContent:', error)
      throw error
    }
  }

  // Update multiple content fields at once
  static async updateMultipleContent(updates: ContentUpdate[]): Promise<void> {
    try {
      const promises = updates.map(update => 
        this.updateContent(update.section, update.field, update.value)
      )
      
      await Promise.all(promises)
    } catch (error) {
      console.error('Error in updateMultipleContent:', error)
      throw error
    }
  }

  // Initialize default content in database
  static async initializeDefaultContent(): Promise<void> {
    const defaultContent = [
      { section: 'hero', field: 'title', value: 'Eagle Nebula Startup Studio' },
      { section: 'hero', field: 'subtitle', value: 'Where Passionate Entrepreneurs Are Created' },
      { section: 'hero', field: 'description', value: 'In space, the Eagle Nebula is where stars are Created.\nIn our studio, it\'s where passionate entrepreneurs are created.\nWe don\'t just coach you… we co‑found with you.\nWe build Saudi startups together—from the first spark to launch.' },
      { section: 'who-we-are', field: 'title', value: 'Who We Are' },
      { section: 'who-we-are', field: 'description', value: 'Most people think starting a business means figuring it out alone—or joining an incubator that only teaches theory.\n\nA startup studio is different.\nIt\'s a startup factory where ideas become companies side‑by‑side with experienced entrepreneurs.\n\nWhere we stand apart: many incubators, accelerators, and VCs chase numbers only—growth charts, user counts, revenue graphs. They treat passion as "nice to have" and ignore the new wave of founders: content creators, solopreneurs, freeLancers, influencers, creatives, coaches, personal brands —people building in completely new ways.\n\nAt Eagle Nebula, we start with you. We design a business around your passion, your skills, and the way you work best—then co‑found it with you.\n\nFrom day one you\'re inside our Design Your Business with AI methodology, supported by a community of like‑minded founders, seasoned coaches, and a co‑founder who\'s invested in your success.\n\nWe don\'t just coach.\nWe co‑create, co‑own, and co‑launch.' },
      { section: 'focus', field: 'title', value: 'Who We Work With' },
      { section: 'focus', field: 'subtitle', value: 'Our Focus' },
      { section: 'focus', field: 'description', value: 'At Eagle Nebula, we\'re not looking for just any founder.\nWe\'re looking for passionate entrepreneurs — people who are driven not only by profit, but by the desire to create something that truly matters to them.' },
      { section: 'focus', field: 'founders', value: 'You might be an influencer, content creator, creative, artist, coach, educator, solopreneur, personal brand, or freelancers.\nThe label doesn\'t matter — what matters is that you have the passion, the drive, and the willingness to build.\n\nWe don\'t work with people chasing the next trend without caring if it fits them.\nWe work with those who want to design a business from the inside out, starting with their passion — and build it into something scalable, impactful, and truly theirs.\n\nIf that\'s you, you belong here.' },
      { section: 'methodology', field: 'title', value: 'Design Your Business with AI' },
      { section: 'methodology', field: 'subtitle', value: 'Our Methodology' },
      { section: 'methodology', field: 'description', value: '(The operating system of Eagle Nebula)\n\nMost founders start from the outside: "What\'s trending? What\'s profitable?"\nWe flip it. Start from inside—with founder fit—and then build outward. When the founder fits the market, the product becomes clear.\n\nThe Five Pillars:\n• What You Love – Your passion foundation. The fuel that keeps you going.\n• What You Have – Skills, experience, relationships, and assets already in your hands.\n• Your Best Way to Work – How you operate at your best (pace, role, environment, solo/team).\n• What You Want to Achieve – Your goals, outcomes, and the life you\'re building toward.\n• Your AI Co‑Builder – Your speed advantage that makes the journey easier and faster (idea testing, content, research, automation, ops).\n\nThe Sweet Spot: where all five overlap.\nYou love it. You\'re equipped for it. It fits your style. It moves you toward your goals. And AI makes building easier and faster than ever.\n\nThis is not a course. It\'s a build system—used live, in the studio, to turn your founder DNA into a company.' },
      { section: 'what-you-get', field: 'title', value: 'What You Get When We Co-Found With You' },
      { section: 'what-you-get', field: 'description', value: '• A venture designed around you (not a template)\n• Shared ownership: we build it together and win together\n• A practical playbook and a system powered by Design Your Business with AI\n• AI‑enabled validation, content, and operations from day one\n• Access to our network, coaches, tools, and hands‑on operators who love the zero‑to‑one phase' },
      { section: 'journey', field: 'title', value: 'Your Journey With Us' },
      { section: 'journey', field: 'description', value: 'Step 1 — Apply: Tell us who you are, your story, and what excites you. We don\'t need a perfect idea—we need a spark.\n\nStep 2 — Discovery: We run the Design Your Business with AI process to map your founder profile (love, assets, work‑style, goals). You\'re the center of the design.\n\nStep 3 — Co‑Founding Sprint: We sit at the same table and build: brainstorm, validate, name, position, prototype—using AI for faster testing and execution.\n\nStep 4 — The Eagle Nebula Ecosystem: Join a supportive community of passionate Saudi founders, coaches, and operators. Share wins, ask real questions, get real answers.\n\nStep 5 — Launch & Grow: We launch together. We stand with you in operations, content, and growth. We share the risk—and the reward.' },
      { section: 'cta', field: 'title', value: 'Ready to Start Your Journey?' },
      { section: 'cta', field: 'description', value: 'You can chase the next trend and hope it fits you…\nor you can design the company that fits you—and build it with a co‑founder who\'s all‑in.\n\nApply to join Eagle Nebula Startup Studio today.\nThe best time to build your passionate business is now.' },
      { section: 'resources', field: 'heroTitle', value: 'Resources & Gifts' },
      { section: 'resources', field: 'heroDescription', value: 'Exclusive tools, frameworks, and resources to accelerate your entrepreneurial journey. From AI-powered toolkits to comprehensive assessments—everything you need to design and build your passionate business.' },
      { section: 'resources', field: 'resourcesTitle', value: 'All Resources & Materials' },
      { section: 'resources', field: 'ctaTitle', value: 'Ready to Build Your Passionate Business?' },
      { section: 'resources', field: 'ctaDescription', value: 'These resources are just the beginning. Join Eagle Nebula Startup Studio and get hands-on support as we co-found your venture together.' },
      { section: 'resources', field: 'ctaApplyButton', value: 'Apply to Join the Studio' },
      { section: 'resources', field: 'ctaLearnButton', value: 'Learn More About Us' },
      { section: 'resources', field: 'footerCopyright', value: '© 2025 EAGLE NEBULA!. All rights reserved.' },
      { section: 'resources', field: 'footerBlogsButton', value: 'Blogs & News' }
    ]

    try {
      // Check if content already exists
      const { data: existingData } = await supabase
        .from('website_content')
        .select('id')
        .limit(1)

      if (existingData && existingData.length > 0) {
        console.log('Content already exists, skipping initialization')
        return
      }

      // Insert default content
      const { error } = await supabase
        .from('website_content')
        .insert(defaultContent.map(item => ({
          ...item,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })))

      if (error) {
        console.error('Error initializing default content:', error)
        throw error
      }

      console.log('Default content initialized successfully')
    } catch (error) {
      console.error('Error in initializeDefaultContent:', error)
      throw error
    }
  }

  // Resource Cards Management
  static async getResourceCards(): Promise<ResourceCard[]> {
    try {
      const { data, error } = await supabase
        .from('resource_cards')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching resource cards:', error);
      return [];
    }
  }

  static async initializeResourceCards(): Promise<boolean> {
    try {
      // Check if resource cards already exist
      const { data: existingCards, error: checkError } = await supabase
        .from('resource_cards')
        .select('id')
        .limit(1);

      if (checkError) {
        console.error('Error checking resource cards:', checkError);
        return false;
      }

      // If cards already exist, don't initialize
      if (existingCards && existingCards.length > 0) {
        console.log('Resource cards already exist, skipping initialization');
        return true;
      }

      // Insert default resource cards
      const defaultCards = [
        {
          title: 'Business Design Framework',
          description: 'Our complete framework for designing your business around your unique founder profile. Includes detailed worksheets, step-by-step guides, and AI prompts to help you discover your sweet spot.',
          buttonText: 'Download Framework',
          buttonAction: 'download' as const,
          order: 1
        },
        {
          title: 'AI Co-Builder Toolkit',
          description: 'Essential AI tools and prompts for market research, content creation, business validation, and operations. Save months of work with our curated collection of AI assistants.',
          buttonText: 'Download Toolkit',
          buttonAction: 'download' as const,
          order: 2
        },
        {
          title: 'Founder Fit Assessment',
          description: 'Discover your unique founder profile with our comprehensive assessment. Understand your strengths, work style, and ideal business model before you build.',
          buttonText: 'Take Assessment',
          buttonAction: 'link' as const,
          order: 3
        },
        {
          title: 'Startup Validation Checklist',
          description: 'Step-by-step checklist to validate your business idea before you invest significant time and money. Avoid common pitfalls and build with confidence.',
          buttonText: 'Download Checklist',
          buttonAction: 'download' as const,
          order: 4
        },
        {
          title: 'Saudi Market Insights Report',
          description: 'Exclusive insights into the Saudi startup ecosystem, emerging trends, funding landscape, and opportunities. Stay ahead of the curve.',
          buttonText: 'Download Report',
          buttonAction: 'download' as const,
          order: 5
        },
        {
          title: 'Investor Pitch Template',
          description: 'Professional pitch deck template specifically designed for passionate entrepreneurs. Includes storytelling frameworks and design guidelines.',
          buttonText: 'Download Template',
          buttonAction: 'download' as const,
          order: 6
        },
        {
          title: 'Financial Planning Model',
          description: 'Comprehensive Excel/Google Sheets financial model template for startups. Includes revenue projections, cash flow, and scenario planning.',
          buttonText: 'Download Model',
          buttonAction: 'download' as const,
          order: 7
        },
        {
          title: 'Exclusive Community Access',
          description: 'Join our private community of passionate Saudi entrepreneurs, seasoned coaches, and successful operators. Network, learn, and grow together.',
          buttonText: 'Join Community',
          buttonAction: 'contact' as const,
          order: 8
        }
      ];

      const { error } = await supabase
        .from('resource_cards')
        .insert(defaultCards);

      if (error) throw error;
      console.log('Resource cards initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing resource cards:', error);
      return false;
    }
  }

  // Blog Posts Management
  static async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  static async addBlogPost(post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([post])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding blog post:', error);
      return null;
    }
  }

  static async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
  }

  static async deleteBlogPost(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }

  static async initializeBlogPosts(): Promise<boolean> {
    try {
      // Check if blog posts already exist
      const { data: existingPosts, error: checkError } = await supabase
        .from('blog_posts')
        .select('id')
        .limit(1);

      if (checkError) {
        console.error('Error checking blog posts:', checkError);
        return false;
      }

      // If posts already exist, don't initialize
      if (existingPosts && existingPosts.length > 0) {
        console.log('Blog posts already exist, skipping initialization');
        return true;
      }

      // Insert default blog posts
      const defaultPosts = [
        {
          title: 'The Future of AI in Saudi Entrepreneurship',
          excerpt: 'Discover how artificial intelligence is transforming the Saudi startup ecosystem and creating new opportunities for passionate entrepreneurs.',
          content: 'The landscape of entrepreneurship in Saudi Arabia is rapidly evolving, with artificial intelligence playing a pivotal role in this transformation. From automated business processes to AI-powered market analysis, the opportunities for innovative startups are unprecedented.',
          author: 'Eagle Nebula Team',
          date: '2024-01-15',
          category: 'AI & Technology',
          featured: true
        },
        {
          title: 'Building Your Business Around Passion: A Framework',
          excerpt: 'Learn our proven methodology for designing businesses that align with your personal passions, skills, and long-term goals.',
          content: 'Most entrepreneurs start with market trends and try to fit themselves into opportunities. We believe in starting with the founder - understanding your unique combination of passion, skills, and vision to create a business that truly fits you.',
          author: 'Sarah Al-Rashid',
          date: '2024-01-10',
          category: 'Business Strategy',
          featured: true
        },
        {
          title: 'Vision 2030 and the Startup Revolution',
          excerpt: 'How Saudi Vision 2030 is creating unprecedented opportunities for innovative startups and passionate entrepreneurs.',
          content: 'Saudi Arabia\'s Vision 2030 has opened doors for entrepreneurs like never before. From NEOM to the Red Sea Project, the Kingdom is actively supporting innovative startups that align with its ambitious goals.',
          author: 'Ahmed Al-Fahad',
          date: '2024-01-05',
          category: 'Industry News',
          featured: false
        },
        {
          title: 'From Idea to MVP: Our Co-Founding Process',
          excerpt: 'Take a behind-the-scenes look at how we work with founders to transform ideas into viable products and businesses.',
          content: 'The journey from idea to minimum viable product is crucial for any startup. At Eagle Nebula, we\'ve refined this process to help passionate entrepreneurs build faster and smarter.',
          author: 'Eagle Nebula Team',
          date: '2023-12-28',
          category: 'Case Studies',
          featured: false
        }
      ];

      const { error } = await supabase
        .from('blog_posts')
        .insert(defaultPosts);

      if (error) throw error;
      console.log('Blog posts initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing blog posts:', error);
      return false;
    }
  }

  static async addResourceCard(card: Omit<ResourceCard, 'id' | 'created_at' | 'updated_at'>): Promise<ResourceCard | null> {
    try {
      const { data, error } = await supabase
        .from('resource_cards')
        .insert([card])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding resource card:', error);
      return null;
    }
  }

  static async updateResourceCard(id: string, updates: Partial<ResourceCard>): Promise<ResourceCard | null> {
    try {
      // First check if the resource card exists
      const { data: existingCard, error: checkError } = await supabase
        .from('resource_cards')
        .select('id')
        .eq('id', id)
        .single();

      if (checkError || !existingCard) {
        console.error(`Resource card with id ${id} not found`);
        return null;
      }

      const { data, error } = await supabase
        .from('resource_cards')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating resource card:', error);
      return null;
    }
  }

  static async deleteResourceCard(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('resource_cards')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting resource card:', error);
      return false;
    }
  }

  static async reorderResourceCards(cardIds: string[]): Promise<boolean> {
    try {
      const updates = cardIds.map((id, index) => ({
        id,
        order: index + 1
      }));

      const { error } = await supabase
        .from('resource_cards')
        .upsert(updates);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error reordering resource cards:', error);
      return false;
    }
  }
}

// Resource Cards Management
export const getResourceCards = async (): Promise<ResourceCard[]> => {
  try {
    const { data, error } = await supabase
      .from('resource_cards')
      .select('*')
      .order('order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching resource cards:', error);
    return [];
  }
};

export const addResourceCard = async (card: Omit<ResourceCard, 'id' | 'created_at' | 'updated_at'>): Promise<ResourceCard | null> => {
  try {
    const { data, error } = await supabase
      .from('resource_cards')
      .insert([card])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding resource card:', error);
    return null;
  }
};



export const deleteResourceCard = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('resource_cards')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting resource card:', error);
    return false;
  }
};

export const reorderResourceCards = async (cardIds: string[]): Promise<boolean> => {
  try {
    const updates = cardIds.map((id, index) => ({
      id,
      order: index + 1
    }));

    const { error } = await supabase
      .from('resource_cards')
      .upsert(updates);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error reordering resource cards:', error);
    return false;
  }
};
