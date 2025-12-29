import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  // Return cached client if available
  if (supabaseClient) return supabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check if env vars are set
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client during build/SSG when env vars aren't available
    // This prevents build failures - the real client will be created at runtime
    console.warn('Supabase environment variables not set - using placeholder');
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
  }

  supabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
