import { createClient } from '@/lib/supabase/server'

// Fallback used if the row hasn't been created in Supabase yet (e.g. before
// supabase/schema.sql has been run on the project), so the button still
// works out of the box. Change from Admin → Settings once deployed.
const DEFAULT_WHATSAPP_CHANNEL_LINK =
  'https://whatsapp.com/channel/0029VbDHBnFADTOD6fejmv0l'

/**
 * Reads a single key from the `site_settings` table. Server-side only.
 * Never throws — falls back to `fallback` if Supabase is unreachable, the
 * key doesn't exist yet, or the value is blank.
 */
export async function getSiteSetting(key: string, fallback = ''): Promise<string> {
  try {
    const supabase = createClient()
    const { data } = await supabase.from('site_settings').select('value').eq('key', key).maybeSingle()
    return data?.value?.trim() || fallback
  } catch {
    return fallback
  }
}

export async function getWhatsAppChannelLink(): Promise<string> {
  return getSiteSetting('whatsapp_channel_link', DEFAULT_WHATSAPP_CHANNEL_LINK)
}

export async function getHeroPhoneImages(): Promise<{ phone1: string; phone2: string }> {
  const [phone1, phone2] = await Promise.all([
    getSiteSetting('hero_phone_1_image', ''),
    getSiteSetting('hero_phone_2_image', ''),
  ])
  return { phone1, phone2 }
}
