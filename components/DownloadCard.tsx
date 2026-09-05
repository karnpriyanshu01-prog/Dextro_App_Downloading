import Link from 'next/link'
import type { Release } from '@/lib/releases'
import { formatReleaseSize } from '@/lib/releases'
import MirrorDownload from '@/components/MirrorDownload'
import AdsterraBanner from '@/components/AdsterraBanner'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function DownloadCard({ release }: { release: Release }) {
  const rows = [
    { label: 'App name', value: 'Dextro Play' },
    { label: 'Version', value: release.version },
    { label: 'File size', value: formatReleaseSize(release) },
    { label: 'Requires', value: `Android ${release.minAndroidVersion}+` },
    { label: 'Released', value: formatDate(release.releaseDate) },
  ]

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl font-extrabold text-ink">Download Dextro Play APK</h3>
        <span
          className={`shrink-0 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wide ${
            release.isPublished
              ? 'bg-red/10 text-red'
              : 'bg-cream text-muted'
          }`}
        >
          {release.isPublished ? 'Latest release' : 'Not yet published'}
        </span>
      </div>

      <dl className="mt-6 min-w-0 divide-y divide-line-soft border-y border-line-soft">
        {rows.map((row) => (
          <div key={row.label} className="flex min-w-0 items-center justify-between gap-4 py-3">
            <dt className="shrink-0 text-sm text-muted">{row.label}</dt>
            <dd className="min-w-0 truncate text-right text-sm font-semibold text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <AdsterraBanner className="mt-6" />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <MirrorDownload releaseId={release.id} mirrors={release.mirrors} className="flex-1" />
        <Link href="/changelog" className="btn-secondary flex-1 self-start">
          View Changelog
        </Link>
      </div>

      <AdsterraBanner className="mt-6" />

      <p className="mt-4 text-xs leading-relaxed text-muted">
        See our{' '}
        <Link href="/guides/how-to-install-dextro-play" className="text-ink underline underline-offset-2 hover:text-red">
          installation guide
        </Link>{' '}
        for step-by-step instructions.
      </p>
    </div>
  )
}
