import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tbzohhmbmbwswrpujynb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiem9oaG1ibWJ3c3dycHVqeW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjQ1MzIsImV4cCI6MjA3NjA0MDUzMn0.8nxG-qfnpOzkTPnOdRtv4C4AS2j3ITR_vk0IMA1CDmA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

