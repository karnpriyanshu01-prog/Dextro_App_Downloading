import { features } from '@/lib/features'

export default function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, i) => (
        <div key={feature.title} className="card p-6">
          <div className="dome">{i + 1}</div>
          <h3 className="mt-4 font-display text-base font-bold text-ink">{feature.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
