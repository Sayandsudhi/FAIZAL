"use client"

import React, { useState, useEffect, useRef } from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"

interface HubData {
  id: string
  num: string
  code: string
  flag: string
  country: string
  city: string
  airport: string
  role: string
  sector: string
  tz: string
  utcOffset: number
  image: string
  fallback: string
  tag: string
  quote: string
  ventures: { name: string; tag: string }[]
  metrics: { value: string; label: string }[]
}

const HUBS: HubData[] = [
  {
    id: "india",
    num: "01",
    code: "IN",
    flag: "🇮🇳",
    country: "India",
    city: "Kerala • Kozhikode",
    airport: "CCJ",
    role: "CEO & Managing Director",
    sector: "Technology • Cyberpark Headquarters",
    tz: "IST",
    utcOffset: 5.5,
    image: "/images/cyberpark-headquarters.jpg",
    fallback: "/images/gallery/engagement-2.jpg",
    tag: "PRIMARY INNOVATION HEADQUARTERS",
    quote: "Government Cyberpark serves as the central engine for enterprise technology solutions and human talent incubation.",
    ventures: [
      { name: "Nextron Software Solutions", tag: "Govt Cyberpark • Enterprise IT" },
      { name: "Next Future Innovations", tag: "Tech Incubator & Talent Ecosystem" },
    ],
    metrics: [
      { value: "Cyberpark", label: "Headquarters" },
      { value: "500+", label: "Engineers & Teams" },
      { value: "Enterprise", label: "Scale Operations" },
    ],
  },
  {
    id: "uae",
    num: "02",
    code: "AE",
    flag: "🇦🇪",
    country: "United Arab Emirates",
    city: "Dubai & MENA Region",
    airport: "DXB",
    role: "Managing Director",
    sector: "Commercial Strategy & Global Entertainment",
    tz: "GST",
    utcOffset: 4.0,
    image: "/images/dubai-hub.jpg",
    fallback: "/images/gallery/engagement-6.jpg",
    tag: "GCC & MENA COMMERCIAL HUB",
    quote: "Connecting Middle Eastern commercial capital with global entertainment and media ecosystems.",
    ventures: [
      { name: "Adam Entertainment — UAE", tag: "Dubai Hub • Media & IP Distribution" },
      { name: "MENA Enterprise Ventures", tag: "Middle East Corporate Development" },
    ],
    metrics: [
      { value: "Dubai", label: "Commercial Hub" },
      { value: "MENA", label: "Regional Reach" },
      { value: "Global", label: "Trade Flow" },
    ],
  },
  {
    id: "uk",
    num: "03",
    code: "GB",
    flag: "🇬🇧",
    country: "United Kingdom",
    city: "London & Europe Corridor",
    airport: "LHR",
    role: "Director of International Operations",
    sector: "Global Events • Luxury Production",
    tz: "BST",
    utcOffset: 1.0,
    image: "/images/london-hub.jpg",
    fallback: "/images/gallery/engagement-4.jpg",
    tag: "EUROPEAN & WESTERN EXPANSION",
    quote: "Establishing high-end cultural, artistic and enterprise event footprints across London and major European capitals.",
    ventures: [
      { name: "The House of Adam Events — UK", tag: "London • Luxury Global IP" },
      { name: "Trans-European Trade Alliance", tag: "UK-India Strategic Corridor" },
    ],
    metrics: [
      { value: "London", label: "Operations Base" },
      { value: "Europe", label: "Event Reach" },
      { value: "Global IP", label: "Asset Value" },
    ],
  },
]

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-white/70 bg-white/10 border border-white/15 backdrop-blur-md">
      {children}
    </span>
  )
}

export function GlobalFootprint() {
  const [time, setTime] = useState<Date>(new Date())
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const mobile = window.matchMedia("(max-width: 767px)").matches
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      {
        threshold: mobile ? 0.02 : 0.15,
        rootMargin: mobile ? "80px 0px" : "0px",
      }
    )
    obs.observe(el)
    const fallback = mobile ? window.setTimeout(() => setInView(true), 1400) : undefined
    return () => {
      obs.disconnect()
      if (fallback) window.clearTimeout(fallback)
    }
  }, [])

  const getHubTime = (offset: number) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000
    const d = new Date(utc + 3600000 * offset)
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <section
      ref={sectionRef}
      id="international"
      data-snap-section
      className="py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-white/10 bg-[#0a0b0e] text-white relative overflow-hidden max-md:overflow-x-clip"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[220px] h-[180px] md:w-[800px] md:h-[500px] bg-emerald-500/[0.03] rounded-full blur-[60px] md:blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="mb-8 md:mb-14">
          <span className="inline-block max-md:invert max-md:opacity-90">
            <PixelIcon type="workflow" size={40} />
          </span>
          <div className="mt-4">
            <Tag>INTERNATIONAL FOOTPRINT &bull; GLOBAL EXPANSION</Tag>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-5">
            <RevealText className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-white drop-shadow-md">
              {"From India\nto the World."}
            </RevealText>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light max-w-lg">
              Faizal’s entrepreneurial leadership extends across three strategic operating hubs in India, the United Arab Emirates, and the United Kingdom.
            </p>
          </div>
        </div>

        {/* ── GLOBAL CONNECTIVITY CORRIDOR BANNER (DARK FROSTED GLASS WITH LUMINOUS FLOW) ── */}
        <div
          onMouseMove={handleCardMouseMove}
          className="group relative rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md p-5 sm:p-8 md:p-10 mb-8 overflow-hidden transition-all duration-500 hover:border-white/35 hover:bg-white/[0.07] shadow-xl"
        >
          {/* Subtle cursor spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.08), transparent 70%)",
            }}
          />

          {/* Flowing animated light beam line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-pixel text-[10px] text-white/50 uppercase tracking-widest">
                  GLOBAL EXPANSION CORRIDOR &bull; LIVE HUBS
                </span>
              </div>
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight flex flex-wrap items-center gap-x-3 gap-y-1 break-words"
                style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
              >
                <span className="hover:text-emerald-300 transition-colors">INDIA</span>
                <span className="text-white/30 font-light">&rarr;</span>
                <span className="hover:text-emerald-300 transition-colors">UAE</span>
                <span className="text-white/30 font-light">&rarr;</span>
                <span className="hover:text-emerald-300 transition-colors">UK</span>
                <span className="text-white/30 font-light">&rarr;</span>
                <span className="text-emerald-400 font-normal">GLOBAL</span>
              </div>
            </div>

            <div className="max-w-md text-left lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10 w-full lg:w-auto">
              <blockquote className="text-xs sm:text-sm font-serif italic text-white/80 leading-relaxed">
                &ldquo;A business may begin in one place, but its possibilities should never end there.&rdquo;
              </blockquote>
              <span className="text-[10px] font-mono text-white/40 block mt-1.5 uppercase tracking-wider">
                — Faizal Muhammed
              </span>
            </div>
          </div>
        </div>

        {/* ── 3 LUXURY PANORAMIC HUB BENTO PANELS (INDIA • UK • UAE) WITH CASCADE ENTRY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" onMouseMove={handleCardMouseMove}>
          {HUBS.map((hub, idx) => (
            <div
              key={hub.id}
              className="group relative rounded-3xl border border-white/15 bg-[#111317] overflow-hidden flex flex-col justify-between min-h-[480px] md:min-h-[580px] shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] hover:border-white/50 hover:-translate-y-2 hover:scale-[1.015] transition-all duration-500 cursor-pointer"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(36px)",
                transition: `opacity 0.8s ease ${idx * 140}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${idx * 140}ms, border-color 0.3s ease, box-shadow 0.4s ease`,
              }}
            >
              {/* Dynamic Mouse Cursor Glow Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                style={{
                  background:
                    "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.12), transparent 70%)",
                }}
              />

              {/* Architectural City Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-[#16181d]">
                <img
                  src={hub.image}
                  alt={hub.country}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-1000 ease-out select-none"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    if (el.src !== hub.fallback) el.src = hub.fallback
                  }}
                />

                {/* Dark progressive fade gradient: transparent at top, deep black at bottom for crisp readability */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,11,14,0.2) 0%, rgba(10,11,14,0.65) 35%, rgba(10,11,14,0.96) 65%, rgb(10,11,14) 100%)",
                  }}
                />
              </div>

              {/* TOP CONTENT: Watermark Number & Code Badges */}
                <div className="relative z-10 p-5 sm:p-8 flex items-start justify-between">
                <div>
                  <span className="font-pixel text-[11px] text-white/60 tracking-widest block mb-1">
                    DESTINATION {hub.num}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-3xl drop-shadow-md">{hub.flag}</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-white/10 backdrop-blur-md text-white font-mono text-xs font-bold border border-white/20">
                      {hub.code}
                    </span>
                    <span className="text-[10px] font-mono text-white/60 bg-white/5 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                      IATA: {hub.airport}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTTOM CONTENT: Governance, Description, Ventures & Metrics */}
              <div className="relative z-10 p-5 sm:p-8 pt-0 flex flex-col justify-end">
                <div className="mb-4">
                  <span className="text-[10px] font-pixel uppercase tracking-wider text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full mb-2 inline-block backdrop-blur-md">
                    {hub.tag}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1 group-hover:text-white transition-colors"
                    style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                  >
                    {hub.country}
                  </h3>
                  <div className="text-xs font-medium text-white/90 uppercase tracking-wider mt-0.5">
                    {hub.role}
                  </div>
                  <div className="text-xs font-mono text-white/50 mt-0.5">{hub.city}</div>
                </div>

                <p className="text-xs text-white/80 leading-relaxed font-serif italic mb-5 bg-white/[0.06] backdrop-blur-md p-3 rounded-xl border border-white/10">
                  &ldquo;{hub.quote}&rdquo;
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-4 border-t border-white/10 text-center min-w-0">
                  {hub.metrics.map((m) => (
                    <div key={m.label} className="bg-white/[0.04] p-2 rounded-xl border border-white/10 min-w-0 flex flex-col justify-center">
                      <div className="text-[11px] sm:text-sm md:text-base font-light text-white leading-tight break-words" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                        {m.value}
                      </div>
                      <div className="text-[8px] sm:text-[9px] font-mono text-white/50 uppercase tracking-wider mt-0.5 line-clamp-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
