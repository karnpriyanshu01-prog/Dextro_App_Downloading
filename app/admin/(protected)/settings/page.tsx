import { createClient } from '@/lib/supabase/server'
import SettingsManager from './SettingsManager'

export default async function AdminSettingsPage() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['whatsapp_channel_link', 'hero_phone_1_image', 'hero_phone_2_image'])

  // If the `site_settings` table hasn't been created yet (schema.sql not
  // run on this Supabase project), show setup instructions instead of a
  // broken/empty form.
  const tableMissing = !!error && /relation .* does not exist/i.test(error.message)

  const get = (key: string) => data?.find((r) => r.key === key)?.value || ''

  return (
    <SettingsManager
      initialWhatsappLink={get('whatsapp_channel_link')}
      initialHeroPhone1={get('hero_phone_1_image')}
      initialHeroPhone2={get('hero_phone_2_image')}
      tableMissing={tableMissing}
    />
  )
}
