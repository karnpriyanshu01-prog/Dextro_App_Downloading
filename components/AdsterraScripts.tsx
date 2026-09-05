import Script from 'next/script'
import { siteConfig } from '@/lib/site.config'

/**
 * Site-wide Adsterra scripts — Social Bar and/or Popunder. Adsterra gives
 * you a single <script src="..."> for each of these; paste just the URL
 * into NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_URL / NEXT_PUBLIC_ADSTERRA_POPUNDER_URL
 * (or lib/site.config.ts directly) and it loads on every page.
 *
 * These ad types show themselves (popup / bottom bar) — there's no
 * placeholder to reserve space for, so this renders nothing when unset.
 */
export default function AdsterraScripts() {
  const { socialBarScriptUrl, popunderScriptUrl } = siteConfig.adsterra

  return (
    <>
      {socialBarScriptUrl && (
        <Script src={socialBarScriptUrl} strategy="lazyOnload" async />
      )}
      {popunderScriptUrl && (
        <Script src={popunderScriptUrl} strategy="lazyOnload" async />
      )}
    </>
  )
}
