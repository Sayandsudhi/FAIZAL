"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { PixelIcon } from "./pixel-icon"

interface HubData {
  id: string
  num: string
  country: string
  flag: string
  code: string
  city: string
  airport: string
  role: string
  sector: string
  hqs: string
  coordinates: string
  timeZoneName: string
  utcOffset: number // in hours from UTC
  quote: string
  accentColor: string
  ventures: { name: string; tag: string }[]
  metrics: { value: string; label: string }[]
}

const HUBS: HubData[] = [
  {
    id: "india",
    num: "01",
    country: "India",
    flag: "🇮🇳",
    code: "IN",
    city: "Kozhikode, Kerala",
    airport: "CCJ",
    role: "Chief Executive Officer & Managing Director",
    sector: "Technology Architecture & Human Capital",
    hqs: "Government Cyberpark, Kozhikode, Kerala",
    coordinates: "11.2588° N, 75.7804° E",
    timeZoneName: "IST",
    utcOffset: 5.5,
    quote: "Building foundational technology systems and empowering human talent across India.",
    accentColor: "#10b981",
    ventures: [
      { name: "Adam Finastra Private Limited", tag: "Govt Cyberpark HQ • Enterprise IT" },
      { name: "Guileless Resources and Outcomes Ltd", tag: "Human Capital Strategy" },
      { name: "Keatonx Media Limited", tag: "Digital Media & Publishing" },
      { name: "Thinkstra Entertainment Limited", tag: "Creative Strategy & IP" },
    ],
    metrics: [
      { value: "4+", label: "Active Enterprises" },
      { value: "Cyberpark", label: "HQ IT Campus" },
      { value: "Pan-India", label: "Operations" },
    ],
  },
  {
    id: "uk",
    num: "02",
    country: "United Kingdom",
    flag: "🇬🇧",
    code: "UK",
    city: "London & Europe",
    airport: "LHR",
    role: "Managing Director",
    sector: "Luxury Events & Cultural Curations",
    hqs: "London, United Kingdom",
    coordinates: "51.5074° N, 0.1278° W",
    timeZoneName: "BST",
    utcOffset: 1.0,
    quote: "Curating international luxury cultural experiences and high-impact European productions.",
    accentColor: "#0284c7",
    ventures: [
      { name: "The House of Adam Events — UK", tag: "London HQ • Luxury Cultural Productions" },
    ],
    metrics: [
      { value: "London", label: "European Hub" },
      { value: "Bespoke", label: "Global Productions" },
      { value: "Europe", label: "Network" },
    ],
  },
  {
    id: "uae",
    num: "03",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    code: "UAE",
    city: "Dubai, MENA",
    airport: "DXB",
    role: "Managing Director",
    sector: "Commercial Strategy & Global Entertainment",
    hqs: "Dubai, United Arab Emirates",
    coordinates: "25.2048° N, 55.2708° E",
    timeZoneName: "GST",
    utcOffset: 4.0,
    quote: "Connecting Middle Eastern commercial capital with global entertainment and media ecosystems.",
    accentColor: "#f59e0b",
    ventures: [
      { name: "Adam Entertainment — UAE", tag: "Dubai Hub • Media & Distribution" },
    ],
    metrics: [
      { value: "Dubai", label: "Commercial Hub" },
      { value: "MENA", label: "Regional Reach" },
      { value: "Cross-Border", label: "Distribution" },
    ],
  },
]

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

export function InternationalFootprint() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [selectedHub, setSelectedHub] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  // Live time ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Calculate local time for each hub
  function getHubTime(offset: number) {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000
    const hubDate = new Date(utc + 3600000 * offset)
    return hubDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  // Scroll listener
  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollable = rect.height - windowHeight
      if (totalScrollable <= 0) return

      const raw = -rect.top / totalScrollable
      const clamped = Math.min(Math.max(raw, 0), 1)
      setScrollProgress(clamped)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth lerp for physical flight inertia
  useEffect(() => {
    let animId: number
    function loop() {
      setCurrentProgress((prev) => {
        const diff = (selectedHub !== null ? selectedHub / 2 : scrollProgress) - prev
        if (Math.abs(diff) < 0.0003) return selectedHub !== null ? selectedHub / 2 : scrollProgress
        return prev + diff * 0.1
      })
      animId = requestAnimationFrame(loop)
    }
    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [scrollProgress, selectedHub])

  // Destination stages (0: India, 1: UK, 2: UAE)
  const activeIndex = useMemo(() => {
    if (selectedHub !== null) return selectedHub
    if (currentProgress < 0.35) return 0
    if (currentProgress < 0.72) return 1
    return 2
  }, [currentProgress, selectedHub])

  // Flight path calculations (0 to 1000 width, 0 to 140 height)
  const { planeX, planeY, planeRotation } = useMemo(() => {
    const p = currentProgress
    let x: number
    let y: number
    let angle: number

    if (p <= 0.5) {
      const t = p / 0.5
      const u = 1 - t
      // India (120, 80) -> Curve peak (500, 30) -> UK (500, 70)
      x = u * u * u * 120 + 3 * u * u * t * 280 + 3 * u * t * t * 420 + t * t * t * 500
      y = u * u * u * 80 + 3 * u * u * t * 25 + 3 * u * t * t * 25 + t * t * t * 70
      const dx = 3 * u * u * (280 - 120) + 6 * u * t * (420 - 280) + 3 * t * t * (500 - 420)
      const dy = 3 * u * u * (25 - 80) + 6 * u * t * (25 - 25) + 3 * t * t * (70 - 25)
      angle = Math.atan2(dy, dx) * (180 / Math.PI)
    } else {
      const t = (p - 0.5) / 0.5
      const u = 1 - t
      // UK (500, 70) -> Curve peak (740, 115) -> UAE (880, 80)
      x = u * u * u * 500 + 3 * u * u * t * 580 + 3 * u * t * t * 740 + t * t * t * 880
      y = u * u * u * 70 + 3 * u * u * t * 115 + 3 * u * t * t * 115 + t * t * t * 80
      const dx = 3 * u * u * (580 - 500) + 6 * u * t * (740 - 580) + 3 * t * t * (880 - 740)
      const dy = 3 * u * u * (115 - 70) + 6 * u * t * (115 - 115) + 3 * t * t * (80 - 115)
      angle = Math.atan2(dy, dx) * (180 / Math.PI)
    }

    return { planeX: x, planeY: y, planeRotation: angle }
  }, [currentProgress])

  function selectStage(index: number) {
    setSelectedHub(index)
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
    const targetScroll = scrollTop + (totalScrollable * (index / 2))
    window.scrollTo({ top: targetScroll + 10, behavior: "smooth" })
    setTimeout(() => setSelectedHub(null), 1000)
  }

  const activeHub = HUBS[activeIndex]

  return (
    <section
      id="international"
      ref={containerRef}
      className="relative min-h-[280vh] bg-[#FAF9F6] border-b border-black/[0.06] select-none"
    >
      {/* ── STICKY VIEWPORT WITH PROPER TOP CLEARANCE BELOW NAVBAR ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-28 pb-8 px-6 md:px-12 lg:px-20 overflow-hidden">
        
        {/* Subtle Ambient Dots Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "radial-gradient(circle, #000000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── 1. CLEAN SECTION HEADER & HUB TIME CARDS ── */}
        <div className="relative z-20 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <PixelIcon type="workflow" size={32} />
                <Tag>INTERNATIONAL FOOTPRINT &bull; GLOBAL EXPANSION</Tag>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#111] leading-none" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                India &bull; United Kingdom &bull; UAE
              </h2>
            </div>

            {/* 3 Interactive Country Hub Badges with Local Clocks */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-black/[0.08] shadow-xs">
              {HUBS.map((h, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={h.id}
                    onClick={() => selectStage(i)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-300 flex items-center gap-2.5 ${
                      isActive
                        ? "bg-[#111] text-white shadow-md font-semibold scale-105"
                        : "text-black/60 hover:text-black hover:bg-black/5"
                    }`}
                  >
                    <span className="text-base">{h.flag}</span>
                    <div className="text-left leading-tight">
                      <div className="font-sans font-medium text-xs">{h.country}</div>
                      <div className={`text-[10px] ${isActive ? "text-white/70" : "text-black/40"}`}>
                        {h.timeZoneName} {getHubTime(h.utcOffset)}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── 2. ELEGANT PANORAMIC FLIGHT PATH CANVAS ── */}
        <div className="relative z-20 max-w-5xl mx-auto w-full my-auto">
          <div className="relative w-full h-28 sm:h-36 overflow-visible">
            <svg
              viewBox="0 0 1000 140"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="flightGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.4" />
                </filter>

                <filter id="planeShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.25" />
                </filter>

                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#0284c7" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Reference Route Line (Dashed) */}
              <path
                d="M 120,80 C 280,25 420,25 500,70 C 580,115 740,115 880,80"
                fill="none"
                stroke="rgba(0,0,0,0.12)"
                strokeWidth="3"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />

              {/* Active Traveled Route */}
              <path
                d="M 120,80 C 280,25 420,25 500,70 C 580,115 740,115 880,80"
                fill="none"
                stroke="url(#routeGrad)"
                strokeWidth="4.5"
                strokeDasharray="1200"
                strokeDashoffset={1200 - currentProgress * 1200}
                strokeLinecap="round"
                filter="url(#flightGlow)"
              />

              {/* WAYPOINT 01: INDIA */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => selectStage(0)}
                transform="translate(120, 80)"
              >
                <circle r={activeIndex === 0 ? "24" : "12"} fill="#10b981" opacity={activeIndex === 0 ? "0.25" : "0.1"} className={activeIndex === 0 ? "animate-ping" : ""} />
                <circle r="9" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
                <text y="28" textAnchor="middle" className="font-mono text-[14px] font-bold fill-black/85">🇮🇳 INDIA</text>
                <text y="42" textAnchor="middle" className="font-mono text-[10px] fill-black/40">ORIGIN &bull; CCJ</text>
              </g>

              {/* WAYPOINT 02: UK */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => selectStage(1)}
                transform="translate(500, 70)"
              >
                <circle r={activeIndex === 1 ? "24" : "12"} fill="#0284c7" opacity={activeIndex === 1 ? "0.25" : "0.1"} className={activeIndex === 1 ? "animate-ping" : ""} />
                <circle r="9" fill="#0284c7" stroke="#ffffff" strokeWidth="3" />
                <text y="-22" textAnchor="middle" className="font-mono text-[14px] font-bold fill-black/85">🇬🇧 UNITED KINGDOM</text>
                <text y="-8" textAnchor="middle" className="font-mono text-[10px] fill-black/40">EUROPE &bull; LHR</text>
              </g>

              {/* WAYPOINT 03: UAE */}
              <g
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => selectStage(2)}
                transform="translate(880, 80)"
              >
                <circle r={activeIndex === 2 ? "24" : "12"} fill="#f59e0b" opacity={activeIndex === 2 ? "0.25" : "0.1"} className={activeIndex === 2 ? "animate-ping" : ""} />
                <circle r="9" fill="#f59e0b" stroke="#ffffff" strokeWidth="3" />
                <text y="28" textAnchor="middle" className="font-mono text-[14px] font-bold fill-black/85">🇦🇪 UAE</text>
                <text y="42" textAnchor="middle" className="font-mono text-[10px] fill-black/40">CROSSROADS &bull; DXB</text>
              </g>

              {/* ── WHITE AIRCRAFT (GLIDES & ROTATES ALONG TRAJECTORY) ── */}
              <g
                transform={`translate(${planeX}, ${planeY}) rotate(${planeRotation})`}
                filter="url(#planeShadow)"
                style={{ willChange: "transform" }}
              >
                {/* Vapor Contrail Trails */}
                <line x1="-22" y1="-6" x2="-44" y2="-6" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="3 3" />
                <line x1="-22" y1="6" x2="-44" y2="6" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="3 3" />

                {/* Radar Aura */}
                <circle r="26" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.4" />

                {/* Aerodynamic White Jet Body */}
                <g transform="scale(1.2) rotate(90)">
                  <path
                    d="M 0,-22 L 2.5,-8 L 18,4 L 18,7 L 3,4 L 3,14 L 8,18 L 8,20 L 0,18 L -8,20 L -8,18 L -3,14 L -3,4 L -18,7 L -18,4 L -2.5,-8 Z"
                    fill="#ffffff"
                    stroke="#94a3b8"
                    strokeWidth="0.8"
                  />
                  <path
                    d="M 0,-16 L 1.5,-10 L -1.5,-10 Z"
                    fill="#0f172a"
                    opacity="0.8"
                  />
                  <rect x="-11" y="5" width="2.5" height="5.5" rx="1" fill="#64748b" />
                  <rect x="8.5" y="5" width="2.5" height="5.5" rx="1" fill="#64748b" />
                  <circle cx="-16" cy="5.5" r="1" fill="#ef4444" />
                  <circle cx="16" cy="5.5" r="1" fill="#22c55e" />
                </g>
              </g>

            </svg>
          </div>
        </div>

        {/* ── 3. REFINED FULL-WIDTH HUB SHOWCASE CARD ── */}
        <div className="relative z-20 max-w-5xl mx-auto w-full my-auto">
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-2xl p-6 sm:p-8 transition-all duration-700">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Hub Identity, Role & Strategic Quote */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl drop-shadow-sm">{activeHub.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-[11px] text-black/40 uppercase tracking-widest">
                        DESTINATION {activeHub.num} &bull; {activeHub.code}
                      </span>
                      <span className="text-[10px] font-mono bg-black/5 text-black/70 px-2 py-0.5 rounded-full font-medium">
                        IATA: {activeHub.airport}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-[#111] tracking-tight mt-0.5" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                      {activeHub.country} &bull; <span className="text-black/50">{activeHub.city}</span>
                    </h3>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/40 block mb-1">
                    EXECUTIVE GOVERNANCE
                  </span>
                  <div className="text-base sm:text-lg font-medium text-[#111]">
                    {activeHub.role}
                  </div>
                  <div className="text-xs text-black/60 font-light mt-0.5">
                    Sector: {activeHub.sector}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-black/75 leading-relaxed font-light bg-[#FAF8F5] p-3.5 rounded-xl border border-black/[0.05]">
                  &ldquo;{activeHub.quote}&rdquo;
                </p>
              </div>

              {/* Right Column: Active Enterprises in Hub & Metrics */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black/40 block mb-2">
                    ACTIVE ENTERPRISES IN HUB
                  </span>
                  <div className="space-y-2">
                    {activeHub.ventures.map((v) => (
                      <div key={v.name} className="p-3 bg-black/[0.02] rounded-xl border border-black/[0.04] flex items-center justify-between gap-3">
                        <div className="text-xs font-medium text-[#111]">{v.name}</div>
                        <div className="text-[10px] text-black/50 font-mono shrink-0">{v.tag}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/[0.06] text-center">
                  {activeHub.metrics.map((m) => (
                    <div key={m.label} className="bg-black/[0.02] p-2 rounded-lg">
                      <div className="text-sm sm:text-base font-medium text-[#111]">{m.value}</div>
                      <div className="text-[9px] font-mono text-black/40 uppercase tracking-wider mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── 4. BOTTOM SCROLL BAR ── */}
        <div className="relative z-20 max-w-5xl mx-auto w-full flex items-center justify-between pt-2 border-t border-black/[0.06] font-mono text-xs text-black/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black/60 animate-bounce" />
            <span>SCROLL TO ADVANCE FLIGHT &bull; INDIA ➔ UK ➔ UAE</span>
          </div>

          <div className="flex items-center gap-3">
            <span>FLIGHT LOG: {Math.round(currentProgress * 100)}%</span>
            <div className="w-28 h-1.5 bg-black/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-150"
                style={{ width: `${currentProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
