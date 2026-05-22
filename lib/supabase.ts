// ─────────────────────────────────────────────────────────────
// Supabase Client — Server ve Browser tarafı ayrı instance
// ─────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Browser-safe client (client componentlerde kullanılır)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client (API route'larında service_role key ile)
export function createServerSupabaseClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceKey) {
    return createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });
  }
  // Service key yoksa anon key ile devam et
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
