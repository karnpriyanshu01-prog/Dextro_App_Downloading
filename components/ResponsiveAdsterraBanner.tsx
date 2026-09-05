import AdsterraBanner from './AdsterraBanner'
import { siteConfig } from '@/lib/site.config'

/**
 * Shows the compact 320x50 banner on mobile and a wider 728x90 leaderboard
 * on desktop (falls back to 468x60 if only that key is set, or just the
 * 320x50 stretched wider if neither wide key is configured). More screen
 * space on desktop for the same slot = more genuine ad surface without
 * adding extra placements.
 */
export default function ResponsiveAdsterraBanner({
  className = '',
  sticky = false,
}: {
  className?: string
  sticky?: boolean
}) {
  const { banner728x90Key, banner468x60Key } = siteConfig.adsterra

  const wideKey = banner728x90Key || banner468x60Key
  const wideWidth = banner728x90Key ? 728 : 468
  const wideHeight = banner728x90Key ? 90 : 60

  if (!wideKey) {
    // No wide zone configured — just show the normal 320x50 everywhere.
    return <AdsterraBanner className={className} sticky={sticky} />
  }

  return (
    <>
      <AdsterraBanner className={`sm:hidden ${className}`} sticky={sticky} />
      <AdsterraBanner
        className={`hidden sm:block ${className}`}
        sticky={sticky}
        overrideKey={wideKey}
        width={wideWidth}
        height={wideHeight}
      />
    </>
  )
}
