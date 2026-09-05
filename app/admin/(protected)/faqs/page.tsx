import { createClient } from '@/lib/supabase/server'
import FaqsManager from './FaqsManager'

export default async function AdminFaqsPage() {
  const supabase = createClient()
  const { data: faqs } = await supabase.from('faqs').select('*').order('sort_order')
  return <FaqsManager initialFaqs={faqs || []} />
}
