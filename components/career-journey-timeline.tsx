"use client"

import React from "react"

const CAREER_STAGES = [
  {
    step: "01",
    phase: "The Entrepreneur",
    title: "From Idea to Conviction",
    desc: "His journey began with an interest in business, opportunity, and the possibilities that emerge when an idea is pursued with conviction. He developed an entrepreneurial instinct for identifying opportunities, understanding market gaps, and bringing people together around a common vision.",
    tagline: "Instinct • Market Vision • Conviction",
  },
  {
    step: "02",
    phase: "The Builder",
    title: "Scaling Organizations & Teams",
    desc: "As his experience evolved, his focus moved from individual ideas to building organisations. He became increasingly involved in developing ventures, forming partnerships, creating teams, and establishing business structures capable of sustainable growth.",
    tagline: "Venture Creation • Governance • Scaling",
  },
  {
    step: "03",
    phase: "The Corporate Leader",
    title: "Multi-Sector Executive Leadership",
    desc: "His entrepreneurial journey subsequently expanded into executive leadership across multiple sectors. Today, he leads businesses operating across technology, human capital, media, entertainment, and international events, with an established presence across India, the UK, and the UAE.",
    tagline: "Technology • Human Capital • Media & Entertainment",
  },
  {
    step: "04",
    phase: "The International Entrepreneur",
    title: "Building Beyond Borders (India ➔ UK ➔ UAE)",
    desc: "His leadership journey has expanded beyond India into international markets. Through his roles with The House of Adam Events in the United Kingdom and Adam Entertainment in the United Arab Emirates, he has developed a cross-border international dimension to his portfolio.",
    tagline: "London • Dubai • Cross-Border Expansion",
  },
  {
    step: "05",
    phase: "The Writer",
    title: "Literary Identity as Faizal Muhammed",
    desc: "Parallel to his business journey, Faizal developed his literary identity. Under the name Faizal Muhammed, he writes about entrepreneurship, ambition, leadership, and the human experiences behind building a business. His book, The Entrepreneur, represents the intersection of professional experience and literary depth.",
    tagline: "Author of The Entrepreneur • Philosophy",
  },
]

export function CareerJourneyTimeline() {
  return (
    <section id="journey" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-black/60 bg-black/5 border border-black/10 mb-4">
          Career Journey & Evolution
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141517] font-heading">
          From Ideas <span className="font-serif italic text-black/60">to Enterprises.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed font-light">
          Faizal’s career is a continuing journey of discovery, experimentation, leadership, and institution building—shaped by a willingness to enter sectors where technology, creativity, people, and business intersect.
        </p>
      </div>

      {/* Interactive Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {CAREER_STAGES.map((stage, idx) => (
          <div
            key={stage.step}
            className={`rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
              idx === 4
                ? "bg-[#141517] text-white border-black md:col-span-2 lg:col-span-2 shadow-lg"
                : "bg-white text-[#141517] border-black/10 hover:border-black/20"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`font-mono text-sm font-bold tracking-widest ${
                    idx === 4 ? "text-[#D4AF37]" : "text-black/30"
                  }`}
                >
                  PHASE {stage.step}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full ${
                    idx === 4
                      ? "bg-white/10 text-white/80 border border-white/10"
                      : "bg-black/5 text-black/60"
                  }`}
                >
                  {stage.tagline}
                </span>
              </div>

              <div
                className={`text-xs font-mono uppercase tracking-widest mb-1 ${
                  idx === 4 ? "text-[#D4AF37]" : "text-black/50"
                }`}
              >
                {stage.phase}
              </div>

              <h3 className="text-xl sm:text-2xl font-light font-heading tracking-tight mb-4">
                {stage.title}
              </h3>

              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  idx === 4 ? "text-white/75" : "text-black/70"
                }`}
              >
                {stage.desc}
              </p>
            </div>

            <div
              className={`mt-8 pt-4 border-t text-[11px] font-mono flex items-center justify-between ${
                idx === 4 ? "border-white/10 text-white/40" : "border-black/5 text-black/40"
              }`}
            >
              <span>Evolutionary Milestone</span>
              <span>&darr;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
