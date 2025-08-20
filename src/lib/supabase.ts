import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface WebsiteContent {
  id: string
  section: string
  field: string
  value: string
  created_at: string
  updated_at: string
}

export interface ContentUpdate {
  section: string
  field: string
  value: string
}
