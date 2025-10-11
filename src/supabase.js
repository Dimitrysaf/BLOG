// src/supabase.js

import { createClient } from '@supabase/supabase-js'

// Grab the environment variables from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check for the variables to avoid errors
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required in your .env file.");
}

// Create and export the Supabase client to use it across the app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)