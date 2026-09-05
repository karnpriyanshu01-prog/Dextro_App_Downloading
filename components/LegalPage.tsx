import Breadcrumbs from '@/components/Breadcrumbs'

export default function LegalPage({
  title,
  updated,
  crumbName,
  crumbHref,
  children,
}: {
  title: string
  updated: string
  crumbName: string
  crumbHref: string
  children: React.ReactNode
}) {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: crumbName, href: crumbHref }]} />
      <section className="container-page max-w-3xl py-14 sm:py-20">
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {updated}</p>
        <div className="prose-legal mt-8 space-y-6 text-base leading-relaxed text-ink-soft [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-red">
          {children}
        </div>
      </section>
    </>
  )
}
