import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jehqvirzoncxqtygihsd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplaHF2aXJ6b25jeHF0eWdpaHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NzI4NjUsImV4cCI6MjA5MzA0ODg2NX0.hQqjFIJIINlFGzLBKvq1kr08cVGuQkyIMJfy6pG4HyY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)