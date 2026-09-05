import { createClient } from '@/lib/supabase/server'
import ArticlesManager from './ArticlesManager'

export default async function AdminArticlesPage() {
  const supabase = createClient()
  const { data: articles } = await supabase.from('articles').select('*').order('updated_at', { ascending: false })
  return <ArticlesManager initialArticles={articles || []} />
}
