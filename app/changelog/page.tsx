import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import ResponsiveAdsterraBanner from '@/components/ResponsiveAdsterraBanner'
import { getReleaseHistory } from '@/lib/releases'
import MirrorDownload from '@/components/MirrorDownload'

export const metadata: Metadata = {
  title: 'Dextro Play Changelog',
  description: 'Version history for Dextro Play — new features, improvements, and fixes for every release.',
  alternates: { canonical: '/changelog' },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function ChangelogPage() {
  const releases = await getReleaseHistory()

  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Changelog', href: '/changelog' }]} />

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
          <ResponsiveAdsterraBanner className="mb-10" />
          <span className="eyebrow">Version history</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">Changelog</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            Every published Dextro Play release, newest first.
          </p>

          <div className="mt-12 space-y-6">
            {releases.map((release, i) => (
              <article key={release.id || i} className="card p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    Dextro Play v{release.version}
                  </h2>
                  {release.isLatest && (
                    <span className="rounded-full bg-red/10 px-3 py-1 font-mono text-[11px] text-red">
                      Latest
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">Released {formatDate(release.releaseDate)}</p>

                {[
                  { label: 'New', items: release.releaseNotes.added },
                  { label: 'Improved', items: release.releaseNotes.improved },
                  { label: 'Fixed', items: release.releaseNotes.fixed },
                ].map((group) =>
                  group.items.length > 0 ? (
                    <div key={group.label} className="mt-5">
                      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink">
                        {group.label}
                      </h3>
                      <ul className="mt-2 space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm text-ink-soft">
                            <span className="text-red">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}

                {release.isPublished && release.mirrors.length > 0 && (
                  <div className="mt-6 max-w-xs">
                    <MirrorDownload releaseId={release.id} mirrors={release.mirrors} />
                  </div>
                )}
              </article>
            ))}
          </div>

          <AdUnit slot="6666666666" className="mt-14" label="End of changelog" />
        </main>
      </div>
    </>
  )
}
