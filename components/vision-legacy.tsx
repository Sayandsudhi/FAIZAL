"use client"

import React from "react"

const VISION_PILLARS = [
  {
    title: "Create Employment",
    desc: "Building scalable enterprises that generate meaningful jobs and economic mobility.",
  },
  {
    title: "Empower People",
    desc: "Fostering environments where human talent develops into future leadership.",
  },
  {
    title: "Encourage Entrepreneurship",
    desc: "Inspiring youth and founders to embrace risk, innovation, and self-reliance.",
  },
  {
    title: "Accelerate Innovation",
    desc: "Leveraging technology and creative media to solve modern real-world problems.",
  },
  {
    title: "Connect Markets",
    desc: "Bridging ecosystems across India, the United Kingdom, the UAE, and global corridors.",
  },
  {
    title: "Build Sustainable Institutions",
    desc: "Establishing governance structures capable of enduring beyond any single generation.",
  },
]

export function VisionLegacy() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-black/60 bg-black/5 border border-black/10 mb-4">
          Vision & Enduring Legacy
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141517] font-heading">
          Building a Future <span className="font-serif italic text-black/60">of Possibilities.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed font-light">
          Faizal’s vision extends beyond building successful companies. He seeks to build institutions, ecosystems, and opportunities that create lasting societal and economic value.
        </p>
      </div>

      {/* 6 Vision Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {VISION_PILLARS.map((p, i) => (
          <div
            key={i}
            className="p-8 rounded-3xl bg-white border border-black/10 hover:border-black/20 hover:shadow-lg transition-all"
          >
            <span className="text-xs font-mono text-[#B8934E] font-bold block mb-3">
              OBJECTIVE 0{i + 1}
            </span>
            <h3 className="text-xl font-light font-heading text-[#141517] mb-2">
              {p.title}
            </h3>
            <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Grand Vision Triad Manifesto */}
      <div className="rounded-3xl bg-[#141517] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/10 via-transparent to-amber-600/10 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            The Guiding Creed
          </span>
          <div className="text-2xl sm:text-4xl md:text-5xl font-light font-heading tracking-tight leading-tight">
            Build businesses that matter.<br />
            Create opportunities that last.<br />
            <span className="font-serif italic text-[#D4AF37]">Leave a legacy that continues.</span>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-2xl mx-auto">
            &ldquo;Every business begins with an idea. Every idea begins with a belief. And every belief requires someone willing to act. The story is not about where he has been. It is about what he chooses to build next.&rdquo;
          </div>
        </div>
      </div>
    </section>
  )
}
