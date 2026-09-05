import type { Release } from '@/lib/releases'
import { formatReleaseSize } from '@/lib/releases'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function InfoBar({ release }: { release: Release }) {
  const items = [
    { label: 'Latest version', value: release.version ? `v${release.version}` : '—' },
    { label: 'Android', value: `${release.minAndroidVersion}+` },
    { label: 'APK size', value: formatReleaseSize(release) },
    { label: 'Updated', value: formatDate(release.releaseDate) },
    { label: 'Status', value: release.isPublished ? 'Published' : 'Pending' },
  ]

  return (
    <div className="border-y border-line bg-cream">
      <div className="container-page grid grid-cols-2 gap-3 py-6 sm:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="plate">
            <p className="plate-label">{item.label}</p>
            <p className="plate-value">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
