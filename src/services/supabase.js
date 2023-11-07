
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://qvwufnxwuwwvovaxiawy.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2d3Vmbnh3dXd3dm92YXhpYXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMDY3OTgsImV4cCI6MjAxNDU4Mjc5OH0.Y0Px2ouAi66HoDDvnVzovhF5Ka45QnVrqgWvd_ZTxVs";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase