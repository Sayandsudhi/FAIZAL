"use client"

import React from "react"

const PRINCIPLES = [
  {
    number: "01",
    title: "VISION",
    motto: "See possibilities before they become obvious.",
    desc: "Anticipate market transitions, identify hidden structural gaps, and conceptualize ventures before models become conventional.",
  },
  {
    number: "02",
    title: "COURAGE",
    motto: "Make decisions even when certainty is unavailable.",
    desc: "True leadership begins when data ends. Navigating ambiguity with resilience, conviction, and deliberate calculated risk.",
  },
  {
    number: "03",
    title: "PEOPLE",
    motto: "Build capable teams and empower individuals.",
    desc: "Human potential is the true catalyst of enterprise. Creating high-trust environments where talent thrives and produces leaders.",
  },
  {
    number: "04",
    title: "EXECUTION",
    motto: "Convert ambition into measurable outcomes.",
    desc: "Ideas without execution remain aspirations. Grounding strategic vision in disciplined operational momentum.",
  },
  {
    number: "05",
    title: "ADAPTABILITY",
    motto: "Remain relevant in changing markets.",
    desc: "Sectors evolve rapidly across technology and creative media. Agility and continuous learning safeguard long-term enterprise value.",
  },
  {
    number: "06",
    title: "LEGACY",
    motto: "Build organisations capable of creating value beyond the individual.",
    desc: "Constructing robust systems, enduring institutions, and inter-generational opportunities that outlast any single tenure.",
  },
]

const CORE_CAPABILITIES = [
  "Corporate Strategy",
  "Venture Creation",
  "Organisational Growth",
  "International Expansion",
  "Strategic Partnerships",
  "Team Building",
  "Technology-Led Business",
  "Human Capital Development",
  "Media & Communication",
  "Entertainment & Events",
  "Market Expansion",
  "Institutional Development",
]

export function LeadershipPrinciples() {
  return (
    <section id="leadership" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#141517] text-[#FAF9F6] selection:bg-[#FAF9F6] selection:text-[#141517] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            Leadership Philosophy & Core Values
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-heading">
            Leadership is <span className="font-serif italic text-[#D4AF37]">Responsibility.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-light">
            For Faizal, leadership is not defined merely by a title. It is defined by responsibility, vision, decisive decision-making, and the dedication to create opportunities for others.
          </p>
        </div>

        {/* 6 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PRINCIPLES.map((item) => (
            <div
              key={item.number}
              className="rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/[0.08] hover:border-[#D4AF37]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#D4AF37] font-semibold tracking-widest">
                    PRINCIPLE {item.number}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]/60 group-hover:scale-125 transition-transform" />
                </div>
                <h3 className="text-2xl font-light font-heading tracking-tight text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-[#D4AF37]/90 mb-4">
                  &ldquo;{item.motto}&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Major Quote Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-white/[0.07] via-white/[0.03] to-white/[0.07] border border-white/10 p-8 sm:p-12 mb-16 text-center max-w-4xl mx-auto">
          <blockquote className="text-lg sm:text-2xl font-light font-serif italic text-white/90 leading-relaxed">
            &ldquo;Faizal believes that a leader’s greatest responsibility is not simply to lead an organisation, but to create an environment in which people can grow, perform and eventually become leaders themselves.&rdquo;
          </blockquote>
          <div className="mt-4 font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
            — Muhammed Faizal Chirakkal
          </div>
        </div>

        {/* Comprehensive Leadership Capabilities Matrix */}
        <div className="border-t border-white/10 pt-12">
          <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-6">
            Executive Competencies & Areas of Practice
          </div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {CORE_CAPABILITIES.map((cap) => (
              <span
                key={cap}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-light text-white/80 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/10 transition-all"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
