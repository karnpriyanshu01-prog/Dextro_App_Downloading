import { createClient } from '@/lib/supabase/server'
import ScreenshotsManager from './ScreenshotsManager'

export default async function AdminScreenshotsPage() {
  const supabase = createClient()
  const { data: shots, error } = await supabase.from('app_screenshots').select('*').order('sort_order')

  // If `app_screenshots` (or the `screenshots` storage bucket) hasn't been
  // created yet, show setup instructions instead of a broken page.
  const tableMissing = !!error && /relation .* does not exist/i.test(error.message)

  return <ScreenshotsManager initial={shots || []} tableMissing={tableMissing} />
}
