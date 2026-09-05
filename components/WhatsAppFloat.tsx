'use client'

// Floating WhatsApp channel button, shown site-wide.
// Renders nothing if no link is configured (admin left it blank).
// Positioned above the mobile sticky ad banner (which is ~50px + safe-area
// tall) so it never overlaps it; sits lower on desktop where there's no
// sticky banner.
export default function WhatsAppFloat({ link }: { link: string }) {
  if (!link) return null

  return (
    <div
      className="group fixed right-4 z-[60] animate-pop-in sm:right-6"
      style={{ bottom: 'calc(4.75rem + env(safe-area-inset-bottom))', animationDelay: '0.4s' }}
    >
      {/* Hover tooltip / label */}
      <span
        className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full bg-ink px-3.5 py-2 font-display text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      >
        Chat on WhatsApp
        <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-ink" />
      </span>

      {/* Soft pulsing rings behind the button, drawing the eye */}
      <span
        className="absolute inset-0 -z-10 rounded-full animate-ring-pulse"
        style={{ backgroundColor: '#25D366' }}
      />
      <span
        className="absolute inset-0 -z-10 rounded-full animate-ring-pulse"
        style={{ backgroundColor: '#25D366', animationDelay: '1.1s' }}
      />

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our WhatsApp channel"
        className="relative flex h-14 w-14 animate-float-bob items-center justify-center rounded-full transition-transform duration-200 ease-out hover:scale-110 active:scale-95"
        style={{
          border: '1px solid #128C3E',
          backgroundImage: 'linear-gradient(180deg, #34E077 0%, #25D366 45%, #128C3E 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -6px 10px rgba(0,0,0,0.16), 0 12px 26px -8px rgba(18,140,62,0.65), 0 2px 0 #0E7A34',
        }}
      >
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="#FFFFFF"
          aria-hidden="true"
          style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))' }}
        >
          <path d="M16.02 3C9.4 3 4 8.36 4 14.95c0 2.25.62 4.36 1.7 6.17L4 29l8.1-1.65a13.06 13.06 0 0 0 3.92.6h.01c6.6 0 12-5.36 12-11.95C28.03 8.36 22.63 3 16.02 3zm0 21.8h-.01a10.9 10.9 0 0 1-5.55-1.51l-.4-.24-4.8.98 1.02-4.65-.26-.42a9.83 9.83 0 0 1-1.52-5.24c0-5.47 4.48-9.92 10.03-9.92 2.68 0 5.19 1.04 7.08 2.92a9.85 9.85 0 0 1 2.93 7.04c0 5.47-4.5 9.9-10.03 9.9zm5.5-7.42c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.64-.93-2.25-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
        </svg>
      </a>
    </div>
  )
}
