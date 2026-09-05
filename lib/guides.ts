export type GuideSummary = {
  slug: string
  title: string
  description: string
  updated: string
  minutesToRead: number
}

// Only list guides that actually have a published page — never link to a
// stub. Add more entries here as you write more guides.
export const guides: GuideSummary[] = [
  {
    slug: 'how-to-install-dextro-play',
    title: 'How to Install Dextro Play APK on Android',
    description:
      'A complete, step-by-step walkthrough for downloading and installing the Dextro Play APK safely on any Android phone.',
    updated: '2026-08-01',
    minutesToRead: 5,
  },
  {
    slug: 'dextro-play-not-working',
    title: 'Dextro Play Not Working? Troubleshooting Guide',
    description:
      'Fixes for the most common Dextro Play problems — app crashes, buffering, black screens, and login issues — in the order you should try them.',
    updated: '2026-08-01',
    minutesToRead: 6,
  },
  {
    slug: 'dextro-play-update',
    title: 'How to Update Dextro Play',
    description:
      'How to check your current version, download the newest release, and update Dextro Play without losing your settings.',
    updated: '2026-08-01',
    minutesToRead: 4,
  },
]

export function getGuideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug)
}
