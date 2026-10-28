import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Validate whether real credentials are provided
export const isSupabaseConfigured = () => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-id') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 20 &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Create Supabase client singleton
let client = null;

if (isSupabaseConfigured()) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
    console.info('[Supabase] Initialized successfully with endpoint:', supabaseUrl);
  } catch (err) {
    console.warn('[Supabase] Failed to initialize client:', err);
    client = null;
  }
} else {
  console.info(
    '[Supabase] Running in local demo/mock mode. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env to connect to live Supabase project.'
  );
}

export const supabase = client;
export default supabase;
