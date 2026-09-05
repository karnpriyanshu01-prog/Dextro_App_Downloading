'use client'

import { siteConfig } from '@/lib/site.config'

/**
 * Adsterra banner slot (320x50 by default; pass overrideKey/width/height
 * for other fixed sizes like 468x60 or 728x90 — see ResponsiveAdsterraBanner
 * for the desktop/mobile-swap pattern built on top of this).
 *
 * Rendered inside a <iframe srcDoc> with NO sandbox attribute at all.
 *
 * History of why: this ad's creative script turned out to need real,
 * unrestricted access to the page — first just document.cookie, then
 * (confirmed by a later console error) it also does cross-frame checks
 * against the top-level window itself. Every attempt to keep it sandboxed
 * (even with shims for cookie/storage) kept hitting a *different*
 * SecurityError deeper in the script, because Adsterra's banner code is
 * built to run with full page access, not inside an isolated frame —
 * that's literally their standard/documented integration (paste the
 * script directly into the page, no wrapping needed).
 *
 * Trade-off, explicit: without any sandboxing, the ad script *could* in
 * principle write content outside its own box. Given the priority has
 * been "every ad must actually show," this matches Adsterra's intended
 * integration as closely as possible while still keeping it inside its
 * own iframe document. If layout-breaking from an escaped ad becomes a
 * real recurring problem, the only fully robust fix is hosting this
 * iframe's content on a genuinely separate domain.
 *
 * Sizing: padding-bottom percentage trick (reliable across this site's
 * nested grid/flex layouts, unlike `aspect-ratio` which was collapsing to
 * 0 height in some containers).
 *
 * SHOW_PLACEHOLDER: when no key is configured for a slot, this used to
 * always show a dashed "Advertisement" placeholder box. Set to false
 * (current) to hide that placeholder entirely — the slot renders nothing
 * until a real key is set, at which point the real ad renders
 * automatically. Flip to true any time you want the placeholder visible
 * again (e.g. while testing layout).
 */
const SHOW_PLACEHOLDER = false

export default function AdsterraBanner({
  className = '',
  sticky = false,
  overrideKey,
  width,
  height,
}: {
  className?: string
  sticky?: boolean
  /** Use a different zone key than the default 320x50 (e.g. for 468x60/728x90). */
  overrideKey?: string
  /** Must match the real declared width of overrideKey's zone. */
  width?: number
  /** Must match the real declared height of overrideKey's zone. */
  height?: number
}) {
  const { bannerKey, bannerWidth, bannerHeight, bannerDomain } = siteConfig.adsterra
  const key = overrideKey ?? bannerKey
  const w = width ?? bannerWidth
  const h = height ?? bannerHeight
  const paddingBottomPct = (h / w) * 100

  const wrapperClasses = sticky
    ? 'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur'
    : ''

  if (!key) {
    if (!SHOW_PLACEHOLDER) return null

    return (
      <div className={`${wrapperClasses} ${className}`}>
        <div className="ad-slot w-full">
          <div className="ad-slot-inner" style={{ aspectRatio: `${w} / ${h}` }}>
            <span className="ad-tag">Advertisement</span>
            <small className="font-mono text-[10px] text-muted">
              {w}×{h} Adsterra banner
            </small>
          </div>
        </div>
      </div>
    )
  }

  const adDoc = `<!doctype html><html><head><style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}</style></head><body>
    <script>
      atOptions = {
        'key' : '${key}',
        'format' : 'iframe',
        'height' : ${h},
        'width' : ${w},
        'params' : {}
      };
    </script>
    <script src="${bannerDomain}/${key}/invoke.js"></script>
  </body></html>`

  return (
    <div className={`${wrapperClasses} ${className}`}>
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: `${paddingBottomPct}%` }}>
        <iframe
          title="Advertisement"
          srcDoc={adDoc}
          width={w}
          height={h}
          scrolling="no"
          className="absolute inset-0 block h-full w-full border-0"
        />
      </div>
    </div>
  )
}
