import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-extrabold text-primary-red/30">404</span>
      <h1 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-sm text-base text-muted">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/download" className="btn-secondary">Download Dextro Play</Link>
      </div>
    </section>
  )
}
