import { createClient } from '@/lib/supabase/server'
import ReleasesManager from './ReleasesManager'

export default async function AdminReleasesPage() {
  const supabase = createClient()
  const { data: releases } = await supabase
    .from('app_releases')
    .select('*, release_mirrors(*)')
    .order('release_date', { ascending: false })

  return <ReleasesManager initialReleases={(releases as any) || []} />
}
