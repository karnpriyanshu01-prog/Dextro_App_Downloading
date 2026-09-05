import Link from 'next/link'
import type { GuideSummary } from '@/lib/guides'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function GuideCard({ guide }: { guide: GuideSummary }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="card flex flex-col gap-3 p-6">
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
        Updated {formatDate(guide.updated)} · {guide.minutesToRead} min read
      </span>
      <h3 className="font-display text-lg font-bold leading-snug text-ink">{guide.title}</h3>
      <p className="text-sm leading-relaxed text-ink-soft">{guide.description}</p>
      <span className="mt-auto pt-2 text-sm font-semibold text-red">Read guide →</span>
    </Link>
  )
}
