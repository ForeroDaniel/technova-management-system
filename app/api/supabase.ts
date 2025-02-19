/**
 * Supabase Client Configuration
 * 
 * This file sets up and exports the Supabase client for database interactions.
 * It uses environment variables for the Supabase URL and anonymous key to establish
 * a connection to the Supabase backend.
 */

import { createClient } from '@supabase/supabase-js'

// Environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Initialize and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey) 