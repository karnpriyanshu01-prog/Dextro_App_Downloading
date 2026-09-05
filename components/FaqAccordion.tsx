'use client'

import { useState } from 'react'
import type { Faq } from '@/lib/faqs'

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-line-soft card overflow-hidden">
      {items.map((faq, i) => {
        const isOpen = openIndex === i
        return (
          <div key={faq.id}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="font-display text-sm font-bold text-ink sm:text-base">{faq.question}</span>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition-transform ${
                  isOpen ? 'rotate-45 border-red text-red' : 'border-line text-muted'
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-7">{faq.answer}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
