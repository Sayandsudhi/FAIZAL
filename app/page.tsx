"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { IntroAnimation, HERO_REVEAL_MS } from "@/components/intro-animation"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { StackingAgentCards } from "@/components/stacking-agent-cards"
import { MobileNav } from "@/components/mobile-nav"
import { CareerJourneyScroll } from "@/components/career-journey-scroll"
import { GlobalFootprint } from "@/components/global-footprint"
import { SpeakingConferences } from "@/components/speaking-conferences"
import { MediaVideoCard } from "@/components/media-video-card"

// ─── Intersection Observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mobile = window.matchMedia("(max-width: 767px)").matches
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, {
      threshold: mobile ? 0.01 : threshold,
      rootMargin: mobile ? "80px 0px" : "0px",
    })
    obs.observe(el)
    const fallback = mobile ? window.setTimeout(() => setInView(true), 1400) : undefined
    return () => {
      obs.disconnect()
      if (fallback) window.clearTimeout(fallback)
    }
  }, [threshold])
  return { ref, inView }
}

// ─── Bento card (Enhanced with physical 3D lift, cursor glow & top shimmer) ──
function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState(false)

  const handleCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleCardMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden transition-all duration-500 ease-out hover:border-black/[0.22] hover:bg-[#fafaf8] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] cursor-pointer ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-6px) scale(1.012)" : "translateY(0)") : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.4s ease`,
      }}
    >
      {/* Top Shimmer Accent Line on Hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />

      {/* Hover glow spot */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,0,0,0.04), transparent 65%)" }}
      />
      {children}
    </div>
  )
}

// ─── Pill tag ─────────────────────────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04] max-w-full text-center leading-relaxed max-md:whitespace-normal max-md:justify-center">
      {children}
    </span>
  )
}

export default function CEOExecutiveWebsite() {
  const [heroReady, setHeroReady] = useState(false)
  const [showImageGuide, setShowImageGuide] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const heroCardRef = useRef<HTMLElement>(null)

  const handleIntroDone = useCallback(() => {
    setHeroReady(true)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), HERO_REVEAL_MS)
    return () => clearTimeout(t)
  }, [])

  // ─── Ultra 120fps GPU Lerp Scroll Zoom-Out Animation (desktop / tablet only) ──
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) return

    let animId = 0
    let currentScale = 1
    let currentRadius = 0
    let running = false

    const tick = () => {
      const y = window.scrollY
      const maxScroll = 800
      const progress = Math.min(Math.max(y / maxScroll, 0), 1)
      const targetScale = 1 - progress * 0.10
      const targetRadius = progress * 36

      currentScale += (targetScale - currentScale) * 0.14
      currentRadius += (targetRadius - currentRadius) * 0.14

      if (heroCardRef.current) {
        heroCardRef.current.style.transform = `scale3d(${currentScale.toFixed(4)}, ${currentScale.toFixed(4)}, 1)`
        heroCardRef.current.style.borderRadius = `${currentRadius.toFixed(2)}px`
      }

      const settled =
        Math.abs(targetScale - currentScale) < 0.0004 &&
        Math.abs(targetRadius - currentRadius) < 0.05

      if (settled) {
        running = false
        return
      }
      animId = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (!running) {
        running = true
        animId = requestAnimationFrame(tick)
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    animId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(animId)
    }
  }, [])

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2500)
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased selection:bg-[#111] selection:text-[#F5F4F0] max-md:max-w-full">

      {/* ── INTRO ANIMATION (Spells FAIZAL in original massive letter reveal) ── */}
      <IntroAnimation onDone={handleIntroDone} />

      {/* ── STICKY NAV (Hidden at top Hero, smoothly appears when user scrolls down) ── */}
      <MobileNav />

      {/* ── HERO SCROLL-SCALING STICKY CONTAINER (ZOOMS OUT ON SCROLL LIKE REFERENCE) ── */}
      <div className="relative bg-[#F5F4F0] md:bg-[#0b0c0e] overflow-clip max-md:overflow-visible">

        {/* Sticky on tablet/desktop; normal flow on phones so the portrait is not clipped */}
        <div className="relative h-auto md:sticky md:top-0 md:h-screen w-full flex items-start md:items-center justify-center md:overflow-hidden max-w-full">
          <section
            ref={heroCardRef}
            className="w-full max-w-full h-auto md:h-full bg-[#F5F4F0] flex flex-col lg:flex-row items-center lg:items-end justify-between lg:justify-end pt-24 md:pt-24 lg:pt-20 pb-0 px-4 sm:px-8 md:px-12 lg:px-20 overflow-visible md:overflow-y-auto lg:overflow-hidden shadow-2xl border border-black/[0.08] origin-center relative select-none md:will-change-[transform]"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Ambient subtle backdrop elements */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[240px] h-[240px] md:w-[700px] md:h-[700px] bg-black/[0.015] rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full min-w-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-end relative z-20">
              
              {/* Left Column: CEO Title, Motto, Intro & Metrics */}
              <div className="lg:col-span-7 flex flex-col justify-center pb-4 sm:pb-12 lg:pb-14 pt-2 sm:pt-4 min-w-0 w-full">
                {/* Top pill badge */}
                <div
                  className="mb-3"
                  style={{
                    opacity: heroReady ? 1 : 0,
                    filter: heroReady ? "blur(0px)" : "blur(12px)",
                    transform: heroReady ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 0.8s ease 0ms, filter 0.8s ease 0ms, transform 0.8s ease 0ms",
                  }}
                >
                  <Tag>ENTREPRENEUR • CEO • BUSINESS LEADER • WRITER</Tag>
                </div>

                {/* Main Headline */}
                <h1
                  className="text-[2.15rem] sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-light text-[#111] leading-[0.96] tracking-tight mb-4 sm:mb-5 break-words"
                  style={{
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    opacity: heroReady ? 1 : 0,
                    filter: heroReady ? "blur(0px)" : "blur(24px)",
                    transform: heroReady ? "translateY(0px)" : "translateY(28px)",
                    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 100ms, filter 1s cubic-bezier(0.16,1,0.3,1) 100ms, transform 1s cubic-bezier(0.16,1,0.3,1) 100ms",
                  }}
                >
                  Muhammed<br />
                  Faizal Chirakkal.
                </h1>

                {/* Core Motto Quote */}
                <p
                  className="text-base sm:text-xl lg:text-2xl font-light text-black/75 italic mb-4 sm:mb-5 leading-relaxed"
                  style={{
                    opacity: heroReady ? 1 : 0,
                    filter: heroReady ? "blur(0px)" : "blur(16px)",
                    transform: heroReady ? "translateY(0px)" : "translateY(20px)",
                    transition: "opacity 0.9s ease 200ms, filter 0.9s ease 200ms, transform 0.9s ease 200ms",
                  }}
                >
                  &ldquo;Think Beyond Business. Build Beyond Boundaries.&rdquo;
                </p>

                {/* Sub-biography */}
                <p
                  className="text-xs sm:text-base text-black/55 leading-relaxed max-w-xl mb-6 sm:mb-8 font-light"
                  style={{
                    opacity: heroReady ? 1 : 0,
                    transform: heroReady ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 0.9s ease 250ms, transform 0.9s ease 250ms",
                  }}
                >
                  Known in his writings as <strong className="text-black/85 font-medium">Faizal Muhammed</strong>, author of <em>The Entrepreneur</em>. Leading strategic enterprises across technology, human capital, media, entertainment, and international events in India, the UK, and the UAE.
                </p>

                {/* 3 Executive Metrics */}
                <div className="flex flex-wrap sm:flex-nowrap gap-6 sm:gap-8 lg:gap-12 pt-4 sm:pt-6 border-t border-black/[0.06] min-w-0">
                  {[
                    { value: "6+", label: "Ventures Led" },
                    { value: "3", label: "Global Hubs (IN • UK • UAE)" },
                    { value: "1", label: "Published Book" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      style={{
                        opacity: heroReady ? 1 : 0,
                        filter: heroReady ? "blur(0px)" : "blur(16px)",
                        transform: heroReady ? "translateY(0px)" : "translateY(20px)",
                        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 80}ms, filter 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 80}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${300 + i * 80}ms`,
                      }}
                    >
                      <div className="text-3xl sm:text-5xl text-[#111] font-light tracking-tight" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-black/40 tracking-widest uppercase mt-1 sm:mt-1.5 font-mono">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: LARGER CEO PORTRAIT (Anchored flush to bottom, taller & scaled) */}
              <div
                className="lg:col-span-5 flex flex-col items-center justify-end self-auto lg:self-end w-full min-w-0 mt-2 lg:mt-0"
                style={{
                  opacity: heroReady ? 1 : 0,
                  filter: heroReady ? "blur(0px)" : "blur(20px)",
                  transform: heroReady ? "translateY(0px)" : "translateY(32px)",
                  transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 250ms, filter 1s cubic-bezier(0.16,1,0.3,1) 250ms, transform 1s cubic-bezier(0.16,1,0.3,1) 250ms",
                }}
              >
                <div className="relative w-full max-w-sm sm:max-w-xl lg:max-w-2xl flex justify-center items-end leading-none">
                  <img
                    src="/images/faizal-portrait.jpg"
                    alt="Muhammed Faizal Chirakkal"
                    className="w-full max-w-full h-auto max-h-none md:max-h-[60vh] lg:max-h-[92vh] xl:max-h-[94vh] object-contain object-bottom block drop-shadow-2xl select-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/book-the-entrepreneur.jpg"
                    }}
                  />
                </div>
              </div>

            </div>

            {/* Bottom Chevron Scroll Indicator (from reference image) */}
            <div className="hidden sm:flex absolute bottom-3 inset-x-0 justify-center pointer-events-none opacity-40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </section>
        </div>

        {/* Scroll buffer track for the zoom-out animation transition */}
        <div className="hidden md:block h-[85vh] pointer-events-none" />
      </div>

      {/* ── PROFESSIONAL PROFILE & DUAL IDENTITY (DARK MODE BENTO) ───────────── */}
      <section id="profile" data-snap-section className="py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-white/10 bg-[#0c0d0f] text-white max-md:overflow-x-clip">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-16">
            <span className="inline-block max-md:invert max-md:opacity-90">
              <PixelIcon type="platform" size={40} />
            </span>
            <div className="mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-white/70 bg-white/10 border border-white/15 backdrop-blur-md">
                PROFESSIONAL PROFILE
              </span>
            </div>
            <RevealText className="mt-5 text-[1.85rem] sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-white drop-shadow-md">
              {"Transforming ideas\ninto meaningful ventures."}
            </RevealText>
          </div>

          <div className="grid grid-cols-12 gap-4 min-w-0" onMouseMove={handleMouse}>
            {/* Top Large Bento Card: Profile Overview with Full Arc Background */}
            <div
              className="group relative col-span-12 p-5 sm:p-8 md:p-12 min-h-[280px] md:min-h-[340px] flex flex-col justify-between overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-xl transition-all duration-500 hover:border-white/40 hover:bg-white/[0.07] hover:-translate-y-1.5 cursor-pointer"
            >
              <img
                src="/images/arc.jpg"
                alt="Profile Background"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                style={{ objectPosition: "center 32%" }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  if (!el.src.includes("/images/arc.png")) {
                    el.src = "/images/arc.png"
                  }
                }}
              />
              {/* Soft progressive fade on left so text is crisp and readable against dark background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(12,13,15,0.96) 0%, rgba(12,13,15,0.85) 45%, rgba(12,13,15,0.3) 75%, transparent 100%)",
                }}
              />
              <div className="relative z-10 max-w-xl">
                <div className="font-pixel text-xs text-white/60 uppercase tracking-widest mb-4">
                  EXECUTIVE BIO
                </div>
                <h3 className="text-2xl sm:text-3xl font-light mb-4 text-white">
                  Entrepreneur &bull; Corporate Leader &bull; Author
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-4 font-light">
                  Muhammed Faizal Chirakkal is an entrepreneur, business leader and writer whose journey is defined by an enduring passion for building enterprises, creating opportunities and transforming ideas into meaningful ventures.
                </p>
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  With leadership responsibilities spanning India, the United Kingdom and the United Arab Emirates, Faizal has developed a diverse entrepreneurial portfolio across technology, human capital, media, entertainment and international events.
                </p>
              </div>
            </div>

            {/* Bottom 3 Cards: Dual Dimensions + Current Portfolio */}
            <div
              className="group relative col-span-12 md:col-span-4 p-5 sm:p-8 min-h-[180px] md:min-h-[220px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-lg transition-all duration-500 hover:border-white/35 hover:bg-white/[0.08] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="font-pixel text-[10px] text-white/40 tracking-widest mb-3 uppercase group-hover:text-white/80 transition-colors">
                  DIMENSION 01
                </div>
                <h3 className="text-lg font-light mb-2 text-white">The Corporate Leader</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Strategic vision, commercial instinct, innovation and decisive execution. Leading enterprises that connect people, technology, capital and markets.
                </p>
              </div>
            </div>

            <div
              className="group relative col-span-12 md:col-span-4 p-5 sm:p-8 min-h-[180px] md:min-h-[220px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-lg transition-all duration-500 hover:border-white/35 hover:bg-white/[0.08] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="font-pixel text-[10px] text-white/40 tracking-widest mb-3 uppercase group-hover:text-white/80 transition-colors">
                  DIMENSION 02
                </div>
                <h3 className="text-lg font-light mb-2 text-white">Faizal Muhammed (Writer)</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Author of <em>The Entrepreneur</em>. Exploring ambition, uncertainty, leadership, resilience, risk and the courage to build what does not yet exist.
                </p>
              </div>
            </div>

            <div
              className="group relative col-span-12 md:col-span-4 p-5 sm:p-8 min-h-[180px] md:min-h-[220px] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-lg transition-all duration-500 hover:border-white/35 hover:bg-white/[0.08] hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="font-pixel text-[10px] text-white/40 tracking-widest mb-3 uppercase group-hover:text-white/80 transition-colors">
                  CORE PURPOSE
                </div>
                <h3 className="text-lg font-light mb-2 text-white">Creating Possibilities</h3>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  &ldquo;For Faizal, entrepreneurship is not simply about creating companies. It is about creating possibilities.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAJOR PROJECTS & LEADERSHIP PORTFOLIO (Stacking Cards) ─────────── */}
      <section id="ventures" data-snap-section className="py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-8 md:mb-16">
            <div>
              <div><Tag>MAJOR PROJECTS & ENTERPRISES</Tag></div>
              <RevealText className="mt-5 text-[1.85rem] sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Building enterprises\nacross industries."}
              </RevealText>
            </div>
            <p className="text-sm text-black/45 leading-relaxed max-w-xs">
              Executive leadership spanning India, the United Kingdom, and the United Arab Emirates.
            </p>
          </div>

          <StackingAgentCards />
        </div>
      </section>

      {/* ── CAREER JOURNEY: KINETIC TYPOGRAPHY & SCROLL-LINKED STAGE CARDS ── */}
      <CareerJourneyScroll />

      {/* ── THE BOOK SPOTLIGHT: THE ENTREPRENEUR ───────────────────────────── */}
      <section id="book" data-snap-section className="py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-16">
            <PixelIcon type="integrations" size={40} />
            <div className="mt-4"><Tag>THE WRITER & PUBLISHED WORK</Tag></div>
            <RevealText className="mt-5 text-[1.85rem] sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"The Entrepreneur —\nBy Faizal Muhammed."}
            </RevealText>
          </div>

          <div className="rounded-2xl overflow-hidden border border-black/[0.07] bg-white flex flex-col md:block md:relative" onMouseMove={handleMouse}>
            <div className="relative w-full h-[320px] md:h-[480px] shrink-0 bg-[#ebe8e1]">
              <img
                src="/images/book-the-entrepreneur.jpg"
                alt="The Entrepreneur Book by Faizal Muhammed"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>

            <div className="flex flex-col gap-3 p-6 md:absolute md:bottom-6 md:right-6 md:p-0 md:w-80">
              <div
                className="rounded-xl border border-white/60 p-6 shadow-xl"
                style={{
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  background: "rgba(255,255,255,0.75)",
                }}
              >
                <Tag>AUTHOR INSIGHT</Tag>
                <h3 className="mt-3 text-lg font-light mb-2">What does it take to build?</h3>
                <p className="text-xs text-black/55 leading-relaxed mb-4">
                  Looking beyond financial spreadsheets and corporate titles to explore the psychological resilience, conviction, and courage behind creating an enterprise.
                </p>
                <div className="p-3 rounded-lg bg-black/[0.04] border border-black/[0.06] text-xs font-serif italic text-black/75">
                  &ldquo;An entrepreneur does not simply find opportunities. An entrepreneur creates possibilities where others see limitations.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP PRINCIPLES (6 TENETS) ──────────────────────────────── */}
      <section id="leadership" data-snap-section className="py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-16">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>HIS LEADERSHIP PRINCIPLES</Tag></div>
            <RevealText className="mt-5 text-[1.85rem] sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Leadership is\nResponsibility."}
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onMouseMove={handleMouse}>
            {[
              { title: "VISION", quote: "See possibilities before they become obvious." },
              { title: "COURAGE", quote: "Make decisions even when certainty is unavailable." },
              { title: "PEOPLE", quote: "Build capable teams and empower individuals." },
              { title: "EXECUTION", quote: "Convert ambition into measurable outcomes." },
              { title: "ADAPTABILITY", quote: "Remain relevant in changing markets." },
              { title: "LEGACY", quote: "Build organisations capable of creating value beyond the individual." },
            ].map((p, i) => (
              <BentoCard key={p.title} className="p-8 min-h-[190px]" delay={i * 60}>
                <div className="font-pixel text-[10px] text-black/30 tracking-widest mb-3">PRINCIPLE 0{i + 1}</div>
                <h3 className="text-xl font-light mb-2">{p.title}</h3>
                <p className="text-xs sm:text-sm text-black/60 font-serif italic leading-relaxed">
                  &ldquo;{p.quote}&rdquo;
                </p>
              </BentoCard>
            ))}
          </div>

          {/* Leader Quote Banner */}
          <div className="mt-8 p-8 rounded-2xl bg-white border border-black/[0.07] text-center max-w-3xl mx-auto">
            <p className="text-sm sm:text-base font-light text-black/70 leading-relaxed">
              &ldquo;Faizal believes that a leader’s greatest responsibility is not simply to lead an organisation, but to create an environment in which people can grow, perform and eventually become leaders themselves.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── INTERNATIONAL EXPORTER & FOOTPRINT (India ➔ UK ➔ UAE) ─────────── */}
      <GlobalFootprint />

      {/* ── SPEAKING & CONFERENCES (WITH DIRECT VIDEO1.MP4 AUTOPLAY) ─────────── */}
      <SpeakingConferences />

      {/* ── ACHIEVEMENTS, AWARDS & MEDIA ───────────────────────────────────── */}
      <section id="media" data-snap-section className="py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Heading & Track Record Bullet List */}
            <div className="lg:col-span-5">
              <PixelIcon type="pricing" size={40} />
              <div className="mt-4"><Tag>ACHIEVEMENTS & TRACK RECORD</Tag></div>
              <RevealText className="mt-5 text-[1.85rem] sm:text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Building a journey,\nnot just a resume."}
              </RevealText>
              <div className="mt-8 space-y-3">
                {[
                  "Diversified portfolio across tech, media, human capital, and entertainment",
                  "Executive leadership spanning India, UK, and UAE",
                  "Technology enterprise operations at Government Cyberpark, Kozhikode",
                  "Author of 'The Entrepreneur' under literary identity Faizal Muhammed",
                  "Building cross-border trade, alliances, and export-oriented ventures",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-black/60 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/40 mt-2 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Enlarged Video Recognitions Card Aligned Lower Down */}
            <div className="lg:col-span-7 lg:pt-20">
              <MediaVideoCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL RUNNING ANIMATION (ENGAGEMENT 1-28 CLEAN IMAGE GALLERY) ── */}
      <section data-snap-section className="py-16 md:py-24 border-b border-black/[0.06] overflow-hidden max-md:overflow-x-clip select-none bg-[#EFECE6]">
        <div className="max-w-6xl mx-auto px-4 md:px-12 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-black/40 animate-ping" />
              <span className="font-pixel text-[11px] tracking-widest text-black/40 uppercase">
                Visual Gallery &amp; Engagements
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[#111]">
              The Journey in Frames &amp; Engagements
            </h2>
          </div>
        </div>

        {/* Marquee Row 1: Images engagement-1 to engagement-14 (Running Left, Full Uncropped Images) */}
        <div data-marquee className="flex mb-4" style={{ animation: "marqueeLeft 50s linear infinite" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={`row1-${rep}`} className="flex shrink-0 gap-4 pr-4">
              {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
                <div
                  key={`eng-r1-${rep}-${num}`}
                  className="h-[180px] sm:h-[310px] shrink-0 rounded-2xl overflow-hidden border border-black/[0.08] bg-white/90 p-2 flex items-center justify-center relative group hover:shadow-xl hover:border-black/[0.18] transition-all duration-300"
                >
                  <img
                    src={`/images/gallery/engagement-${num}.jpg`}
                    alt={`Engagement ${num}`}
                    className="h-full w-auto max-w-none object-contain rounded-xl block group-hover:scale-[1.02] transition-transform duration-300 select-none"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      if (!el.src.includes(`/gallery/engagement-${num}.jpg`)) {
                        el.src = `/gallery/engagement-${num}.jpg`
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Marquee Row 2: Images engagement-15 to engagement-28 (Running Right, Full Uncropped Images) */}
        <div data-marquee className="flex" style={{ animation: "marqueeRight 50s linear infinite" }}>
          {[...Array(2)].map((_, rep) => (
            <div key={`row2-${rep}`} className="flex shrink-0 gap-4 pr-4">
              {Array.from({ length: 14 }, (_, i) => i + 15).map((num) => (
                <div
                  key={`eng-r2-${rep}-${num}`}
                  className="h-[180px] sm:h-[310px] shrink-0 rounded-2xl overflow-hidden border border-black/[0.08] bg-white/90 p-2 flex items-center justify-center relative group hover:shadow-xl hover:border-black/[0.18] transition-all duration-300"
                >
                  <img
                    src={`/images/gallery/engagement-${num}.jpg`}
                    alt={`Engagement ${num}`}
                    className="h-full w-auto max-w-none object-contain rounded-xl block group-hover:scale-[1.02] transition-transform duration-300 select-none"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement
                      if (!el.src.includes(`/gallery/engagement-${num}.jpg`)) {
                        el.src = `/gallery/engagement-${num}.jpg`
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── VISION MANIFESTO & CTA (WITH ORIGINAL FOOTER GLASS PANELS BLUR) ─── */}
      <section id="contact" data-snap-section className="relative py-16 md:py-32 px-4 md:px-12 lg:px-20 overflow-hidden">
        {/* Glass panels image — anchored to bottom center */}
        <img
          src="/images/footer.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-full object-cover object-bottom pointer-events-none select-none"
          style={{ opacity: 0.85 }}
        />
        {/* Progressive blur from bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 55%)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        />
        {/* Colour fade from bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgb(245,244,240) 0%, rgba(245,244,240,0.92) 18%, rgba(245,244,240,0.55) 35%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="font-pixel text-xs text-black/40 uppercase tracking-widest mb-4">
            LET’S BUILD SOMETHING MEANINGFUL
          </div>
          <h2 className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-6">
            Great businesses begin<br />with a conversation.
          </h2>
          <p className="text-sm text-black/55 leading-relaxed mb-10 max-w-xl mx-auto font-light">
            Whether you are interested in business partnerships, international opportunities, speaking engagements, media enquiries, or literary discussions, Faizal welcomes meaningful dialogues.
          </p>

          {/* Quick email copies */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 text-left">
            {[
              { label: "PARTNERSHIPS", email: "partnerships@faizalchirakkal.com" },
              { label: "INTERNATIONAL (UK / UAE)", email: "international@faizalchirakkal.com" },
              { label: "AUTHOR & SPEAKING", email: "author@faizalchirakkal.com" },
            ].map((desk) => (
              <div
                key={desk.label}
                onClick={() => copyEmail(desk.email)}
                className="p-4 rounded-xl bg-white/80 border border-black/10 hover:border-black/30 backdrop-blur-md transition-all cursor-pointer group"
              >
                <div className="text-[10px] font-mono text-black/40 tracking-wider uppercase mb-1">{desk.label}</div>
                <div className="text-xs font-mono text-black/80 group-hover:text-black break-all">{desk.email}</div>
                <div className="text-[10px] font-mono text-black/30 mt-1">
                  {copiedEmail === desk.email ? "✓ Copied" : "Click to copy"}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive message form */}
          {!contactSubmitted ? (
            <form
              onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true) }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/30 transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#111] text-white text-xs uppercase rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium cursor-pointer"
              >
                CONNECT
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-600/20 bg-emerald-50 text-emerald-800 text-sm font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {"Thank you. Your message has been received."}
            </div>
          )}

          {/* Social Profiles */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-black/[0.06] text-xs font-mono text-black/50">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Facebook</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">YouTube</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">X (Twitter)</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER (Exact Original Theme Styling) ─────────────────────────── */}
      <footer className="py-10 px-4 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <span className="font-pixel text-xs tracking-[0.25em] text-black/60">FAIZAL CHIRAKKAL</span>

          {/* Nav sections */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {[
              { label: "Profile",      href: "#profile" },
              { label: "Ventures",     href: "#ventures" },
              { label: "Journey",      href: "#journey" },
              { label: "The Book",     href: "#book" },
              { label: "Leadership",   href: "#leadership" },
              { label: "Speaking",     href: "#speaking" },
              { label: "Contact",      href: "#contact" },
            ].map(l => (
              <a key={l.label} href={l.href} className="text-xs text-black/40 hover:text-black transition-colors tracking-widest uppercase">{l.label}</a>
            ))}
          </div>

          <div className="text-xs text-black/40 font-mono">
            Govt Cyberpark, Kozhikode &bull; London &bull; Dubai
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-black/30">
          <span>&copy; {new Date().getFullYear()} Muhammed Faizal Chirakkal. All rights reserved.</span>
          <span>Known in writings as Faizal Muhammed &bull; Author of <em>The Entrepreneur</em></span>
        </div>
      </footer>

    </div>
  )
}
