// Central site configuration.
// Replace every value below with real Dextro Play data before launch.
// Nothing here should be presented to users as fact until it is verified.

export const siteConfig = {
  name: 'Dextro Play',
  tagline: 'Sports Streaming, Made Simple',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dextroplay.com',
  description:
    'Dextro Play is an Android sports streaming app. Get the official APK, browse features, read installation and troubleshooting guides, and check the latest changelog.',
  contactEmail: 'playdextro@gmail.com',
  dmcaEmail: 'playdextro@gmail.com',
  social: {
    // Fill in only the accounts that actually exist.
    twitter: '',
    telegram: '',
  },
  adsensePublisherId: process.env.ADSENSE_PUBLISHER_ID || '', // e.g. pub-0000000000000000
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || '',

  // Adsterra — fill in the zone/script values from your Adsterra dashboard.
  // Anything left blank simply renders nothing (safe to deploy before you
  // have real values).
  adsterra: {
    // Banner ad zone key (e.g. 320x50 mobile banner / 300x250 box) — used
    // in AdsterraBanner.
    bannerKey: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_KEY || '',
    bannerWidth: 320,
    bannerHeight: 50,
    // Domain the banner's invoke.js is served from (Adsterra rotates this
    // per zone — copy it from the <script src="..."> your dashboard gives
    // you, everything up to and including the domain).
    bannerDomain: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_DOMAIN || 'https://www.highperformanceformat.com',
    // Wider banner formats — used by ResponsiveAdsterraBanner to show a
    // bigger ad on desktop (more visible surface = more impressions there)
    // while mobile still gets the compact 320x50.
    banner468x60Key: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_468x60_KEY || '',
    banner728x90Key: process.env.NEXT_PUBLIC_ADSTERRA_BANNER_728x90_KEY || '',
    // Native banner zone key(s), if you use Adsterra's native ad format.
    // Adsterra requires a SEPARATE zone/key per placement on the same page
    // (one script can't fill two different spots) — nativeKey is the
    // primary slot; nativeKey2/3/4 are optional extra slots for the bottom
    // native-ad stack. Leave unset to skip that slot.
    nativeKey: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY || '',
    nativeKey2: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY_2 || '',
    nativeKey3: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY_3 || '',
    nativeKey4: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY_4 || '',
    nativeKey5: process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_KEY_5 || '',
    // Social Bar / Popunder — Adsterra gives you a single <script src="...">
    // tag for these. Paste just the script URL here; it loads site-wide.
    socialBarScriptUrl: process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_URL || '',
    popunderScriptUrl: process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_URL || '',
  },
}

export type SiteConfig = typeof siteConfig
