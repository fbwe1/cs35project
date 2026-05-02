const dotenv = require("dotenv");
dotenv.config();
//import { createClient } from '@supabase/supabase-js'
const { createClient } = require('@supabase/supabase-js');
const supabase_url = process.env.SUPABASE_URL;
const anon_key = process.env.SUPABASE_SERVICE_ROLE_KEY;
//supabase client (interacts with our database)
const supabase = createClient(supabase_url, anon_key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

module.exports = supabase