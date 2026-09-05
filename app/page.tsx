import Link from 'next/link'
import type { Metadata } from 'next'
import { getLatestRelease } from '@/lib/releases'
import InfoBar from '@/components/InfoBar'
import DownloadCard from '@/components/DownloadCard'
import FeatureGrid from '@/components/FeatureGrid'
import SportsGrid from '@/components/SportsGrid'
import GuideCard from '@/components/GuideCard'
import FaqAccordion from '@/components/FaqAccordion'
import AdUnit from '@/components/AdUnit'
import AdRail from '@/components/AdRail'
import ResponsiveAdsterraBanner from '@/components/ResponsiveAdsterraBanner'
import NativeAd from '@/components/NativeAd'
import ScreenshotStrip from '@/components/ScreenshotStrip'
import { guides } from '@/lib/guides'
import { getFaqs } from '@/lib/faqs'
import { getScreenshots } from '@/lib/screenshots'
import { getHeroPhoneImages } from '@/lib/settings'
import { siteConfig } from '@/lib/site.config'

export const metadata: Metadata = {
  title: 'Dextro Play – Official Sports Streaming App & Latest APK',
  description:
    'Explore Dextro Play, its latest Android APK release, features, installation guides, updates, and troubleshooting resources.',
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const release = await getLatestRelease()
  const allFaqs = await getFaqs()
  const previewFaqs = allFaqs.slice(0, 6)
  const screenshots = await getScreenshots()
  const heroPhones = await getHeroPhoneImages()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-hero-glow bg-white py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="min-w-0 animate-rise-in">
            <span className="eyebrow">
              <span className="live-dot" /> Official APK Distribution
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[56px]">
              Sports Streaming,
              <br />
              <span className="text-red">Made Simple.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
              A clean and fast way to discover the latest Dextro Play app updates, features,
              installation guides, and official APK releases.
            </p>
          </div>

          <div className="flex justify-center gap-3 animate-rise-in [animation-delay:120ms] xs:gap-5">
            <div className="phone-frame w-[130px] rotate-[3deg] xs:w-[150px] sm:w-[190px] md:w-[210px]">
              <div className="phone-screen">
                {heroPhones.phone1 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={heroPhones.phone1} alt="Dextro Play app screenshot" className="h-full w-full object-cover" />
                ) : (
                  <span className="px-4 text-center font-mono text-[10px] text-white/40">
                    Your app screenshot here
                  </span>
                )}
              </div>
            </div>
            <div className="phone-frame mt-8 w-[130px] -rotate-[3deg] xs:w-[150px] sm:w-[190px] md:w-[210px]">
              <div className="phone-screen">
                {heroPhones.phone2 ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={heroPhones.phone2} alt="Dextro Play app screenshot" className="h-full w-full object-cover" />
                ) : (
                  <span className="px-4 text-center font-mono text-[10px] text-white/40">
                    Second screenshot
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <InfoBar release={release} />

      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
        <AdRail />

        <main className="min-w-0">
          <ResponsiveAdsterraBanner className="mb-10" />

          {/* Screenshots */}
          <section>
            <span className="eyebrow">Take a look</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">App Screenshots</h2>
            <div className="mt-10">
              {screenshots.length > 0 ? (
                <ScreenshotStrip screenshots={screenshots} />
              ) : (
                <div className="-mx-5 overflow-x-auto px-5 pb-4 [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory] sm:mx-0 sm:px-0">
                  <div className="flex w-max gap-5 sm:gap-6">
                    {['Home screen', 'Player', 'Channels', 'Settings'].map((label) => (
                      <div key={label} className="w-[150px] shrink-0 [scroll-snap-align:start] sm:w-[180px]">
                        <div className="phone-frame w-full">
                          <div className="phone-screen">
                            <span className="px-4 text-center font-mono text-[10px] text-white/40">
                              Add via /admin/screenshots
                            </span>
                          </div>
                        </div>
                        <p className="mt-2.5 text-center font-mono text-xs leading-snug text-muted">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <AdUnit slot="1111111111" className="my-14" label="After Screenshots, before Download" />

          <NativeAd className="mb-10" />

          {/* Download */}
          <section className="border-t border-line-soft py-14">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
              <div className="min-w-0">
                <span className="eyebrow">Get the app</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">
                  What is Dextro Play?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  Dextro Play is an Android app for watching sports streams through a fast,
                  distraction-free player. It's built for people who want to open the app, pick a
                  channel, and start watching — without wading through clutter to get there.
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  This site is the official home for the Dextro Play APK, feature breakdowns,
                  installation help, and release notes for every version we publish.
                </p>
                <Link href="/app" className="mt-6 inline-block text-sm font-semibold text-red underline underline-offset-4">
                  Read the full app overview →
                </Link>
              </div>
              <div className="mx-auto w-full min-w-0 max-w-md lg:max-w-none">
                <DownloadCard release={release} />
              </div>
            </div>
          </section>

          <AdUnit slot="2222222222" className="my-14" label="After Download, before Key Features" />

          {/* Features */}
          <section className="border-t border-line-soft py-14">
            <span className="eyebrow">Built for streaming</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">Key Features</h2>
            <p className="mt-3 max-w-2xl text-base text-ink-soft">
              Everything below reflects what's actually in the app today.
            </p>
            <div className="mt-10">
              <FeatureGrid />
            </div>
          </section>

          {/* Sports */}
          <section className="border-t border-line-soft py-14">
            <span className="eyebrow">Coverage</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">Sports on Dextro Play</h2>
            <div className="mt-10">
              <SportsGrid />
            </div>
          </section>

          <AdUnit slot="3333333333" className="my-14" label="After Sports, before Latest Update" />

          {/* Changelog preview */}
          <section className="border-t border-line-soft py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Release notes</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">Latest Update</h2>
              </div>
              <Link href="/changelog" className="text-sm font-semibold text-red">
                Full changelog →
              </Link>
            </div>

            <div className="mt-10 card max-w-2xl p-7">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-extrabold text-ink">
                  {release.version ? `v${release.version}` : 'Pending release'}
                </h3>
                {release.isLatest && (
                  <span className="rounded-full bg-red/10 px-3 py-1 font-mono text-[11px] text-red">Latest</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted">
                Released {new Date(release.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              {[
                { label: 'New', items: release.releaseNotes.added },
                { label: 'Improved', items: release.releaseNotes.improved },
                { label: 'Fixed', items: release.releaseNotes.fixed },
              ].map((group) =>
                group.items.length > 0 ? (
                  <div key={group.label} className="mt-5">
                    <h4 className="font-display text-sm font-bold uppercase tracking-wide text-ink">{group.label}</h4>
                    <ul className="mt-2 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-ink-soft">
                          <span className="text-red">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          </section>

          <AdUnit slot="4444444444" className="my-14" label="After Latest Update, before Guides" />

          {/* Guides preview */}
          <section className="border-t border-line-soft py-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow">Learn</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">Guides &amp; Troubleshooting</h2>
              </div>
              <Link href="/guides" className="text-sm font-semibold text-red">
                All guides →
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>

          <AdUnit slot="5555555555" className="my-14" label="After Guides, before FAQ" />

          {/* FAQ */}
          <section className="border-t border-line-soft py-14">
            <span className="eyebrow">Questions</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">Frequently Asked Questions</h2>
            <div className="mt-10 max-w-3xl">
              <FaqAccordion items={previewFaqs} />
            </div>
            <Link href="/faq" className="mt-6 inline-block text-sm font-semibold text-red underline underline-offset-4">
              See all FAQs →
            </Link>
          </section>

          {/* Bottom native ad stack */}
          <div className="mt-14 space-y-6 border-t border-line-soft pt-14">
            <NativeAd zoneKey={siteConfig.adsterra.nativeKey2} />
            <NativeAd zoneKey={siteConfig.adsterra.nativeKey3} />
            <NativeAd zoneKey={siteConfig.adsterra.nativeKey4} />
            <NativeAd zoneKey={siteConfig.adsterra.nativeKey5} />
          </div>
        </main>
      </div>
    </>
  )
}
