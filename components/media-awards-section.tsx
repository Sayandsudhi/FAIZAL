"use client"

import React from "react"

const ACHIEVEMENTS = [
  "Building a diversified entrepreneurial portfolio across technology, media, human capital, and entertainment.",
  "Assuming executive leadership positions across India, the United Kingdom, and the United Arab Emirates.",
  "Leading high-growth technology initiatives from Government Cyberpark, Kozhikode, Kerala.",
  "Establishing an international dimension to creative and corporate events in the UK and UAE.",
  "Developing sustainable human capital infrastructure connecting talent with economic possibilities.",
  "Developing a distinct literary identity as Faizal Muhammed and authoring 'The Entrepreneur'.",
  "Cultivating cross-border commercial alliances and technology export frameworks.",
  "Building an entrepreneurial ecosystem connecting people, capital, innovation, and markets.",
]

const MEDIA_TYPES = [
  {
    type: "Business Feature",
    title: "Building Across Borders: The Multi-Sector Entrepreneurial Vision",
    outlet: "International Business Review",
    date: "Featured Coverage",
    desc: "In-depth profile exploring enterprise creation, cross-border leadership across India, UK, and UAE, and the author's philosophy in 'The Entrepreneur'.",
  },
  {
    type: "Leadership Dialogue",
    title: "Technology, Talent & The Future of Human Capital",
    outlet: "Executive Leadership Quarterly",
    date: "Special Interview",
    desc: "A strategic discussion on how modern enterprises can build resilient digital capabilities while placing human potential at the core.",
  },
  {
    type: "Literary Review",
    title: "The Entrepreneur: Deconstructing the Psychology of Building",
    outlet: "Contemporary Business Books",
    date: "Author Spotlight",
    desc: "Reviewing Faizal Muhammed's celebrated book exploring uncertainty, conviction, and resilience behind venture creation.",
  },
]

const AWARDS = [
  {
    title: "Excellence in Cross-Border Entrepreneurship",
    presenter: "International Business Forum",
    year: "Honour & Recognition",
  },
  {
    title: "Distinguished Leadership in Technology & Enterprise",
    presenter: "Regional Technology & Innovation Council",
    year: "Annual Recognition",
  },
  {
    title: "Visionary Business Leader & Institutional Builder",
    presenter: "Global Commerce & Enterprise Summit",
    year: "Leadership Award",
  },
]

export function MediaAwardsSection() {
  return (
    <section id="media" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F3F1EB] border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-black/60 bg-black/5 border border-black/10 mb-4">
            Recognition, Press & Achievements
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141517] font-heading">
            Building a Journey, <span className="font-serif italic text-black/60">Not Just a Resume.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed font-light">
            Faizal’s achievements are reflected through the businesses he has built, the organisations he leads, the markets he explores, and the literary ideas he continues to develop.
          </p>
        </div>

        {/* Top: Key Professional Achievements Grid */}
        <div className="rounded-3xl bg-white border border-black/10 p-8 sm:p-12 mb-16 shadow-sm">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
            <h3 className="text-xl sm:text-2xl font-light font-heading text-[#141517]">
              Key Professional Milestones
            </h3>
            <span className="text-xs font-mono uppercase text-[#B8934E] font-semibold">
              Enterprise Track Record
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF9F6] border border-black/5 text-xs sm:text-sm text-black/75 font-light"
              >
                <div className="w-5 h-5 rounded-full bg-[#141517] text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom 2 Columns: Media Features & Awards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Media & Press */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-black/50 mb-4">
              Featured Press & Publications
            </h4>

            {MEDIA_TYPES.map((m, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-black/10 p-6 sm:p-7 hover:shadow-md hover:border-black/25 transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8934E] font-semibold bg-[#D4AF37]/10 px-2.5 py-0.5 rounded-full">
                    {m.type}
                  </span>
                  <span className="text-xs font-mono text-black/40">{m.date}</span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-[#141517] font-heading mt-2 group-hover:text-black">
                  &ldquo;{m.title}&rdquo;
                </h4>
                <div className="text-xs font-medium text-black/50 mt-1 mb-3">{m.outlet}</div>
                <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Awards & Recognition */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-black/50 mb-4">
              Selected Awards & Institutional Recognitions
            </h4>

            <div className="rounded-3xl bg-white border border-black/10 p-6 sm:p-8 space-y-5">
              {AWARDS.map((aw, idx) => (
                <div
                  key={idx}
                  className="pb-5 border-b border-black/5 last:border-0 last:pb-0"
                >
                  <span className="text-[10px] font-mono text-black/40 uppercase block mb-1">
                    {aw.year}
                  </span>
                  <h5 className="text-sm font-semibold text-[#141517] font-heading">
                    {aw.title}
                  </h5>
                  <p className="text-xs text-black/60 font-light mt-0.5">
                    Presented by {aw.presenter}
                  </p>
                </div>
              ))}

              <div className="pt-4 mt-4 border-t border-black/5 text-[11px] text-black/40 font-mono italic">
                * Features verified corporate honours, institutional certificates, and media appearances.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
