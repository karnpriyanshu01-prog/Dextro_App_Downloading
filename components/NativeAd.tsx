import Script from 'next/script'
import { siteConfig } from '@/lib/site.config'

/**
 * Adsterra "Native Banner" ad — blends into the page layout rather than a
 * fixed-size box.
 *
 * NATIVE_AD_ENABLED: re-enabled with a fresh zone key.
 */
const NATIVE_AD_ENABLED = true

export default function NativeAd({
  className = '',
  zoneKey,
}: {
  className?: string
  zoneKey?: string
}) {
  const key = zoneKey || siteConfig.adsterra.nativeKey
  if (!NATIVE_AD_ENABLED || !key) return null

  const containerId = `container-${key}`

  return (
    <div className={className}>
      <div id={containerId} />
      <Script
        id={`adsterra-native-${key}`}
        src={`https://nobleduringsurveillance.com/${key}/invoke.js`}
        strategy="afterInteractive"
        data-cfasync="false"
      />
    </div>
  )
}
