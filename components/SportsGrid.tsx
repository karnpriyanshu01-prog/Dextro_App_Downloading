import Link from 'next/link'
import { sports } from '@/lib/sports'

// Lightweight inline icons — no external icon package needed.
const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const SportIcons: Record<string, JSX.Element> = {
  Cricket: (
    <svg {...iconProps}>
      <path d="M18.5 5.5 8 16a2.1 2.1 0 1 0 3 3L21 8.5" />
      <path d="M8 16 5.5 18.5" />
      <circle cx="5" cy="19" r="1.6" fill="currentColor" stroke="none" />
      <path d="M15.5 3.5 20.5 8.5" />
    </svg>
  ),
  Football: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.4 15 10.6l-1.15 3.6H10.1L9 10.6z" />
      <path d="M12 8.4V5.2M15 10.6l2.9-.9M13.85 14.2l1.8 2.6M10.15 14.2l-1.8 2.6M9 10.6l-2.9-.9" />
    </svg>
  ),
  'Formula 1': (
    <svg {...iconProps}>
      <path d="M4 6h13l3 3-3 3H4z" />
      <path d="M4 6v13" />
      <path d="M7 6v6M10 6v6M13 6v6M16 6v6" strokeWidth="1.4" />
    </svg>
  ),
  Tennis: (
    <svg {...iconProps}>
      <circle cx="9.5" cy="9.5" r="6" />
      <path d="M5.5 5.5c2.2 1.2 2.2 6.8 0 8M13.5 5.5c-2.2 1.2-2.2 6.8 0 8" strokeWidth="1.4" />
      <path d="M13.8 13.8 20 20" />
    </svg>
  ),
  UFC: (
    <svg {...iconProps}>
      <path d="M6.5 9.5v-2a2.5 2.5 0 0 1 5 0v2" />
      <path d="M11.5 9.5v-3a2 2 0 1 1 4 0v5.2c0 3.5-2.3 6.3-5.7 6.3-3 0-5.3-1.7-6.2-4.4L2.5 10a1.6 1.6 0 0 1 3-1.1l1 2.1" />
    </svg>
  ),
  WWE: (
    <svg {...iconProps}>
      <rect x="3" y="9.5" width="18" height="5" rx="1.5" />
      <circle cx="8.5" cy="12" r="1.6" />
      <circle cx="15.5" cy="12" r="1.6" />
    </svg>
  ),
}

export default function SportsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {sports.map((sport) => (
        <Link
          key={sport.name}
          href="/app"
          className="card flex flex-col items-center gap-3 px-4 py-7 text-center"
        >
          <span className="dome-soft">
            {SportIcons[sport.name] ?? sport.name.charAt(0)}
          </span>
          <span className="font-display text-sm font-bold text-ink">{sport.name}</span>
        </Link>
      ))}
    </div>
  )
}
