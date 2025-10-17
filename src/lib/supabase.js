import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sdgdcmejzthicgwinuze.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZ2RjbWVqenRoaWNnd2ludXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2NTAxOTAsImV4cCI6MjA3NjIyNjE5MH0.Z094z-ypXl6dZqShAVrBjWidINbF0vZ2LPY5HQ8uFzs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

