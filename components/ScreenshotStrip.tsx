import type { Screenshot } from '@/lib/screenshots'

export default function ScreenshotStrip({ screenshots }: { screenshots: Screenshot[] }) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-4 [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] sm:mx-0 sm:px-0">
      <div className="flex w-max gap-5 sm:gap-6">
        {screenshots.map((shot) => (
          <div key={shot.id} className="w-[150px] shrink-0 [scroll-snap-align:start] sm:w-[180px]">
            <div className="phone-frame w-full">
              <div className="phone-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={shot.image_url}
                  alt={shot.caption || 'Dextro Play screenshot'}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            {shot.caption && (
              <p className="mt-2.5 text-center font-mono text-xs leading-snug text-muted">{shot.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
