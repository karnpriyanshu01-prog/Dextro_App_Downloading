'use client'

import { useState } from 'react'
import type { Mirror } from '@/lib/releases'

export default function MirrorDownload({
  releaseId,
  mirrors,
  className = '',
}: {
  releaseId: string
  mirrors: Mirror[]
  className?: string
}) {
  const [open, setOpen] = useState(false)

  function track(mirrorId: string) {
    // Fire-and-forget — never block or delay the actual download.
    fetch('/api/download/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ releaseId, mirrorId }),
      keepalive: true,
    }).catch(() => {})
  }

  // Adsterra's site-wide Popunder script listens for clicks bubbling up to
  // the document to decide when to fire — stopping propagation here keeps
  // clicks on the download button(s) from ever reaching that listener, so
  // downloading never triggers a popunder, while clicks everywhere else on
  // the site still do.
  function suppressPopunder(e: React.MouseEvent) {
    e.stopPropagation()
  }

  if (mirrors.length === 0) {
    return (
      <button disabled className={`btn-primary cursor-not-allowed opacity-40 ${className}`}>
        Download unavailable
      </button>
    )
  }

  // Only one mirror configured — the main button downloads directly,
  // no need to make people pick from a list of one.
  if (mirrors.length === 1) {
    const mirror = mirrors[0]
    return (
      <a
        href={mirror.file_url}
        onClick={(e) => {
          suppressPopunder(e)
          track(mirror.id)
        }}
        className={`btn-primary w-full ${className}`}
      >
        Download APK
      </a>
    )
  }

  return (
    <div className={className}>
      <button
        onClick={(e) => {
          suppressPopunder(e)
          setOpen((v) => !v)
        }}
        className="btn-primary w-full"
      >
        Download APK
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-line bg-cream p-3">
          <p className="mb-2 px-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            Choose a download link
          </p>
          <div className="space-y-2">
            {mirrors.map((mirror, i) => (
              <div
                key={mirror.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3 py-2.5 shadow-sm"
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-md font-mono text-xs font-bold text-white"
                    style={{ backgroundImage: 'linear-gradient(180deg, #FF4D42, #A80500)' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-semibold text-ink">
                    {mirror.label}
                    {mirror.region && <span className="ml-1.5 text-xs font-normal text-muted">· {mirror.region}</span>}
                  </span>
                </span>
                <a
                  href={mirror.file_url}
                  onClick={(e) => {
                    suppressPopunder(e)
                    track(mirror.id)
                  }}
                  className="btn-primary !px-4 !py-2 !text-xs shrink-0"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
