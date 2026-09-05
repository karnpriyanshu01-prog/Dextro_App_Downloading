import { siteConfig } from '@/lib/site.config'

type AdUnitProps = {
  slot: string
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical'
  className?: string
  label?: string
}

/**
 * Reusable AdSense placement — renders as a labeled skeuomorphic tray so it
 * always reads as "advertisement," never as site UI.
 *
 * Renders nothing until a real publisher ID is configured. Callers are
 * responsible for spacing: never place this directly next to a download
 * button, nav, or player controls.
 */
export default function AdUnit({ slot, format = 'auto', className = '', label }: AdUnitProps) {
  if (!siteConfig.adsensePublisherId) return null

  return (
    <div className={`ad-slot ${className}`}>
      <div className="ad-slot-inner h-full">
        <span className="ad-tag">Advertisement</span>
        {label && <small className="font-mono text-[11px] text-muted">{label}</small>}
        <ins
          className="adsbygoogle block w-full"
          style={{ display: 'block' }}
          data-ad-client={siteConfig.adsensePublisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  )
}
