/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Add your CDN / Supabase Storage / Cloudflare R2 host(s) here, e.g.:
      // { protocol: 'https', hostname: 'your-project.supabase.co' },
      // { protocol: 'https', hostname: 'cdn.dextroplay.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // Adsterra's ad scripts (popunder/social bar/banner) use
            // eval()-based code internally, which requires 'unsafe-eval' —
            // Next.js dev mode also needs it for hot-reload, but here it's
            // enabled unconditionally (not just isDev) specifically so the
            // ad scripts work in production too. This does reduce CSP's
            // protection against certain XSS patterns; it's a deliberate
            // trade-off for third-party ad monetization, not an oversight.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Adsterra (and most ad networks) route through dozens of
              // constantly-rotating anti-adblock domains — allowlisting
              // them one at a time is a losing battle, so script-src,
              // connect-src, and frame-src are opened to any http(s)
              // source. Some Adsterra creatives even serve over plain
              // http (not https) — both schemes are allowed so those
              // aren't blocked either. Everything else (default-src,
              // style-src, font-src) stays locked down to 'self'.
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:",
              // Ad creatives/widgets sometimes load their own external
              // stylesheets (not just inline styles) — allow both schemes
              // here too, same reasoning as script-src above.
              "style-src 'self' 'unsafe-inline' https: http:",
              "img-src 'self' data: https: http:",
              "font-src 'self' data: https: http:",
              "connect-src 'self' https: http:",
              "frame-src https: http:",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
