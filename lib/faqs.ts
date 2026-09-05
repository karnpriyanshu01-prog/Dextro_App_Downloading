import { createClient } from '@/lib/supabase/server'

export type Faq = { id: string; question: string; answer: string }

// Shown only until real FAQs are added via /admin/faqs — never presented
// as if it came from a content team, just sensible defaults so the section
// isn't empty on a fresh install.
const FALLBACK_FAQS: Faq[] = [
  {
    id: 'fallback-1',
    question: 'What is Dextro Play?',
    answer: 'Dextro Play is an Android app for streaming sports content through a fast, distraction-free player.',
  },
  {
    id: 'fallback-2',
    question: 'Is Dextro Play free?',
    answer: 'Yes, the APK is free to download from this website.',
  },
  {
    id: 'fallback-3',
    question: 'How do I install the APK?',
    answer: "Download it from the Download page, then follow our installation guide for step-by-step instructions.",
  },
  {
    id: 'fallback-4',
    question: 'Why is the stream buffering?',
    answer: 'This is usually a network issue — try switching networks or restarting the app.',
  },
]

export async function getFaqs(): Promise<Faq[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('faqs')
    .select('id, question, answer')
    .eq('published', true)
    .order('sort_order')

  return data && data.length > 0 ? data : FALLBACK_FAQS
}
