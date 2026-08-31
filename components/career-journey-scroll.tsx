"use client"

import React, { useRef, useState, useEffect } from "react"
import { PixelIcon } from "@/components/pixel-icon"

const STAGES = [
  {
    step: "01",
    num: "1",
    line1: "The",
    line2: "Entrepreneur",
    headline: "From Idea to Conviction",
    tag: "OPPORTUNITY & INSTINCT",
    desc: "Developing an instinct for identifying opportunities, understanding market gaps, and bringing people together around a common vision with decisive conviction.",
    image: "/images/gallery/engagement-1.jpg",
    fallback: "/images/engagement/1.jpg",
  },
  {
    step: "02",
    num: "2",
    line1: "The",
    line2: "Builder",
    headline: "Scaling & Organisation",
    tag: "VENTURES & GOVERNANCE",
    desc: "Moving from individual ideas to building scalable organisations, forming international partnerships, creating high-performance teams, and establishing sustainable corporate structures.",
    image: "/images/gallery/engagement-2.jpg",
    fallback: "/images/engagement/2.jpg",
  },
  {
    step: "03",
    num: "3",
    line1: "The Corporate",
    line2: "Leader",
    headline: "Multi-Sector Executive",
    tag: "EXECUTIVE LEADERSHIP",
    desc: "Executive leadership across technology, human capital, media, entertainment, and international events spanning India, the United Arab Emirates, and the United Kingdom.",
    image: "/images/gallery/engagement-3.jpg",
    fallback: "/images/engagement/3.jpg",
  },
  {
    step: "04",
    num: "4",
    line1: "The Ecosystem",
    line2: "Architect",
    headline: "Enterprise Ecosystems",
    tag: "FUTURE ENTERPRISE & VALUE",
    desc: "Unifying technology infrastructure, talent incubation, creative media platforms, and cross-border networks into sustainable, high-impact enterprise ecosystems.",
    image: "/images/gallery/engagement-11.jpg",
    fallback: "/images/gallery/engagement-11.jpg",
  },
]

type Stage = (typeof STAGES)[number]

function StageCardBody({ stage }: { stage: Stage }) {
  return (
    <>
      <div className="w-full aspect-[16/10] max-md:max-h-[38vh] max-md:min-h-0 min-h-[140px] sm:min-h-[230px] rounded-2xl overflow-hidden mb-3 md:mb-4 relative bg-[#14161b] border border-white/10 shrink-0">
        <img
          src={stage.image}
          alt={`${stage.line1} ${stage.line2}`}
          className="w-full h-full object-cover object-top select-none"
          onError={(e) => {
            const el = e.target as HTMLImageElement
            if (el.src !== stage.fallback) el.src = stage.fallback
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0c]/60 via-transparent to-transparent pointer-events-none" />
        <span className="absolute bottom-2.5 left-2.5 font-pixel text-[9px] uppercase tracking-wider text-white bg-black/70 px-2.5 py-0.5 rounded-full border border-white/20">
          {stage.tag}
        </span>
      </div>

      <div className="min-w-0 overflow-visible">
        <div className="flex items-center justify-between gap-2 mb-2 min-w-0">
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full truncate min-w-0">
            {stage.headline}
          </span>
        </div>

        <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-2 break-words" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
          {stage.line1} {stage.line2}
        </h4>

        <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
          {stage.desc}
        </p>
      </div>
    </>
  )
}

function JourneyHeader({
  activeStep,
  onDotClick,
  showDots,
}: {
  activeStep: number
  onDotClick: (idx: number) => void
  showDots: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between z-30 pb-3 md:pb-4 border-b border-white/10 gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-block max-md:invert max-md:opacity-90">
            <PixelIcon type="workflow" size={30} />
          </span>
          <div className="min-w-0">
            <span className="font-pixel text-[10px] tracking-widest text-white/50 uppercase block truncate">
              CAREER JOURNEY &bull; EVOLUTION
            </span>
            <h2 className="text-base sm:text-lg md:text-xl font-light text-white tracking-tight truncate" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
              From Ideas to Enterprises
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-white/40 shrink-0">
          <span className="text-white font-bold">0{activeStep + 1}</span>
          <span>/</span>
          <span>04</span>
        </div>
      </div>

      {showDots && (
        <div className="flex lg:hidden items-center gap-1.5 z-30 pt-3">
          {STAGES.map((s, idx) => (
            <button
              key={`dot-${s.step}`}
              onClick={() => onDotClick(idx)}
              aria-label={`Go to stage ${s.step}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeStep === idx ? "w-8 bg-white" : "w-3.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      )}
    </>
  )
}

export function CareerJourneyScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<(HTMLElement | null)[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  // Desktop only: scroll-linked 3D lerp. Never run this on phones — it re-renders every frame and kills scroll smoothness.
  useEffect(() => {
    if (isMobile) return

    let animId: number
    let target = 0
    let current = 0
    let lastStep = -1
    let lastProgress = -1

    const update = () => {
      const el = containerRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        if (total > 0) {
          const raw = Math.min(Math.max(-rect.top / total, 0), 1)
          target = raw * (STAGES.length - 1)
        }
      }

      current += (target - current) * 0.16
      const nextStep = Math.round(current)
      if (Math.abs(current - lastProgress) > 0.002) {
        lastProgress = current
        setScrollProgress(current)
      }
      if (nextStep !== lastStep) {
        lastStep = nextStep
        setActiveStep(nextStep)
      }

      animId = requestAnimationFrame(update)
    }

    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [isMobile])

  // Phone: native snap paging — IntersectionObserver updates the header counter.
  useEffect(() => {
    if (!isMobile) return

    const nodes = stageRefs.current.filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const idx = Number((visible.target as HTMLElement).dataset.stage)
        if (!Number.isNaN(idx)) setActiveStep(idx)
      },
      { threshold: [0.45, 0.6], rootMargin: "-10% 0px -25% 0px" }
    )

    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [isMobile])

  const scrollToStage = (idx: number) => {
    if (isMobile) {
      stageRefs.current[idx]?.scrollIntoView({ behavior: "auto", block: "start" })
      return
    }
    const el = containerRef.current
    if (!el) return
    const total = el.offsetHeight - window.innerHeight
    const targetY = el.offsetTop + (idx / (STAGES.length - 1)) * total
    window.scrollTo({ top: targetY, behavior: "smooth" })
  }

  return (
    <div id="journey">
      {/* ── SMARTPHONE: native snap pages, no sticky/RAF jank ── */}
      <section className="md:hidden bg-[#090a0c] text-white select-none max-w-full">
        <div className="sticky top-0 z-30 bg-[#090a0c] px-4 pt-4 pb-2">
          <JourneyHeader activeStep={activeStep} onDotClick={scrollToStage} showDots />
        </div>

        {STAGES.map((stage, idx) => (
          <article
            key={stage.step}
            ref={(el) => { stageRefs.current[idx] = el }}
            data-stage={idx}
            className="px-4 pt-3 pb-8 flex flex-col"
          >
            <div className="flex flex-col rounded-3xl border border-white/15 bg-[#121418] p-4">
              <StageCardBody stage={stage} />
            </div>
          </article>
        ))}
      </section>

      {/* ── TABLET / LAPTOP / MACBOOK: original sticky kinetic stage ── */}
      <div
        ref={containerRef}
        className="hidden md:block relative bg-[#090a0c] text-white select-none min-h-[380vh]"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[180px]" />
        </div>

        <div className="sticky top-0 h-screen w-full max-w-full flex flex-col justify-between p-10 lg:p-14 overflow-hidden">
          <JourneyHeader activeStep={activeStep} onDotClick={scrollToStage} showDots />

          <div className="flex-1 min-h-0 relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-2">
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-3 font-mono text-xs text-white/30 z-30 pl-2">
              <div className="flex flex-col gap-3">
                {STAGES.map((s, idx) => {
                  const isCurrent = activeStep === idx
                  return (
                    <button
                      key={s.step}
                      onClick={() => scrollToStage(idx)}
                      className={`text-left transition-all duration-300 cursor-pointer select-none flex items-center gap-3 ${
                        isCurrent
                          ? "text-white font-bold text-sm scale-110"
                          : "text-white/20 hover:text-white/50"
                      }`}
                    >
                      <span className="w-4">{s.num}</span>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-2 text-[10px] text-white/60 uppercase tracking-widest font-sans font-normal whitespace-nowrap">
                          <span className="w-6 h-[1px] bg-white/40 inline-block" />
                          Evolution
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              className="lg:col-span-6 relative h-[260px] lg:h-[560px] flex items-center justify-start overflow-hidden w-full min-w-0"
              style={{
                perspective: "1400px",
                perspectiveOrigin: "15% 50%",
              }}
            >
              <div
                className="relative w-full flex flex-col justify-center items-start will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                {STAGES.map((s, idx) => {
                  const dist = idx - scrollProgress
                  const absDist = Math.abs(dist)
                  const translateY = dist * 175
                  const xCurve = Math.pow(dist, 2) * 14 + dist * 10
                  const rotateZ = dist * -10.5
                  const rotateX = dist * 25
                  const translateZ = -absDist * 85
                  const blurAmount = Math.min(absDist * 5.5, 9)
                  const opacity = Math.max(1 - absDist * 0.55, 0.18)
                  const scale = Math.max(1 - absDist * 0.14, 0.82)
                  const isMain = absDist < 0.45

                  return (
                    <button
                      key={s.step}
                      onClick={() => scrollToStage(idx)}
                      className="absolute left-0 text-left group cursor-pointer origin-left will-change-transform py-2 select-none"
                      style={{
                        transform: `translate3d(${xCurve.toFixed(2)}px, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px) scale3d(${scale.toFixed(3)}, ${scale.toFixed(3)}, 1) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`,
                        opacity: opacity.toFixed(3),
                        filter: `blur(${blurAmount.toFixed(2)}px)`,
                        WebkitFilter: `blur(${blurAmount.toFixed(2)}px)`,
                        transformStyle: "preserve-3d",
                        zIndex: Math.round(10 - absDist * 3),
                        transition: "none",
                      }}
                    >
                      <h3
                        className={`text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] font-bold tracking-tight leading-[0.9] transition-colors duration-150 ${
                          isMain
                            ? "text-white drop-shadow-[0_12px_40px_rgba(255,255,255,0.35)]"
                            : "text-[#80848e] hover:text-white/60"
                        }`}
                        style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
                      >
                        <span className="block">{s.line1}</span>
                        <span className="block">{s.line2}</span>
                      </h3>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end relative min-h-[440px] lg:min-h-[480px] w-full">
              {STAGES.map((stage, idx) => {
                const dist = idx - scrollProgress
                const absDist = Math.abs(dist)
                const opacity = Math.max(1 - absDist * 1.5, 0)
                const translateY = dist * 26

                if (opacity <= 0.01) return null

                return (
                  <div
                    key={stage.step}
                    className="absolute inset-auto w-[380px] max-w-full rounded-3xl border border-white/15 bg-[#121418]/90 backdrop-blur-2xl p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform select-none flex flex-col min-h-0 overflow-visible"
                    style={{
                      opacity: opacity.toFixed(3),
                      transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale3d(${(1 - absDist * 0.04).toFixed(3)}, ${(1 - absDist * 0.04).toFixed(3)}, 1)`,
                      pointerEvents: absDist < 0.6 ? "auto" : "none",
                      zIndex: Math.round((1 - absDist) * 10),
                      transition: "none",
                    }}
                  >
                    <StageCardBody stage={stage} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
