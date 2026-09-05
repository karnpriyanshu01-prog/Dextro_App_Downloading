import AdUnit from '@/components/AdUnit'

/**
 * Sticky left-hand vertical ad rail, shown alongside main content on
 * higher-traffic pages (home, download, features, changelog, guides, FAQ).
 * Skipped on thin/legal pages per AdSense guidance.
 */
export default function AdRail() {
  return (
    <aside className="hidden min-w-0 flex-col gap-[22px] lg:sticky lg:top-[94px] lg:flex">
      <AdUnit slot="rail-1" format="rectangle" className="!h-[250px]" label="160×600 / 300×250" />
      <AdUnit slot="rail-2" format="vertical" className="!h-[480px]" label="Sticky vertical unit" />
      <AdUnit slot="rail-3" format="rectangle" className="!h-[320px]" label="Native / in-feed" />
    </aside>
  )
}
