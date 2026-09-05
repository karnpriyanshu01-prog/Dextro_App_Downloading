import Link from 'next/link'

export type Crumb = { name: string; href: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-line bg-cream">
      <ol className="container-page flex flex-wrap items-center gap-1.5 py-3 text-xs text-muted">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-ink/20">/</span>}
            {i === items.length - 1 ? (
              <span className="text-ink-soft">{item.name}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-red">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
