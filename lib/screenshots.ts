import { createClient } from '@/lib/supabase/server'

export type Screenshot = { id: string; image_url: string; caption: string | null }

export async function getScreenshots(): Promise<Screenshot[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('app_screenshots')
    .select('id, image_url, caption')
    .eq('is_published', true)
    .order('sort_order')

  return data || []
}
