import { supabase, WebsiteContent, ContentUpdate } from '../lib/supabase'

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
      { section: 'cta', field: 'description', value: 'You can chase the next trend and hope it fits you…\nor you can design the company that fits you—and build it with a co‑founder who\'s all‑in.\n\nApply to join Eagle Nebula Startup Studio today.\nThe best time to build your passionate business is now.' }
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
}
