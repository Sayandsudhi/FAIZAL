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
    desc: "Executive leadership across technology, human capital, media, entertainment, and international events spanning India, the United Kingdom, and the United Arab Emirates.",
    image: "/images/gallery/engagement-3.jpg",
    fallback: "/images/engagement/3.jpg",
  },
  {
    step: "04",
    num: "4",
    line1: "The",
    line2: "Writer",
    headline: "Literary Identity",
    tag: "AUTHOR OF THE ENTREPRENEUR",
    desc: "Authoring 'The Entrepreneur' under Faizal Muhammed, reflecting on mindset, courage, uncertainty, resilience, risk, and the discipline of building what does not yet exist.",
    image: "/images/book-the-entrepreneur.jpg",
    fallback: "/images/book-the-entrepreneur.jpg",
  },
]

export function CareerJourneyScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    let animId: number
    let target = 0
    let current = 0

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

      // Smooth inertia lerp interpolation (120fps continuous easing)
      current += (target - current) * 0.16
      setScrollProgress(current)
      setActiveStep(Math.round(current))

      animId = requestAnimationFrame(update)
    }

    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [])

  const scrollToStage = (idx: number) => {
    const el = containerRef.current
    if (!el) return
    const total = el.offsetHeight - window.innerHeight
    const targetY = el.offsetTop + (idx / (STAGES.length - 1)) * total
    window.scrollTo({ top: targetY, behavior: "smooth" })
  }

  return (
    <div
      id="journey"
      ref={containerRef}
      className="relative bg-[#090a0c] text-white select-none min-h-[380vh]"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[180px] pointer-events-none" />

      {/* ── STICKY VIEWPORT STAGE ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between z-30 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <PixelIcon type="workflow" size={30} />
            <div>
              <span className="font-pixel text-[10px] tracking-widest text-white/50 uppercase block">
                CAREER JOURNEY &bull; EVOLUTION
              </span>
              <h2 className="text-lg md:text-xl font-light text-white tracking-tight" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                From Ideas to Enterprises
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/40">
            <span className="text-white font-bold">0{activeStep + 1}</span>
            <span>/</span>
            <span>04</span>
          </div>
        </div>

        {/* ── MAIN STAGE: LEFT STEP RAIL + CENTER 3D CYLINDER ARC WHEEL + RIGHT CARD ── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative z-20 w-full my-auto py-2">
          
          {/* Far Left Step Indicator Rail (Matching Reference Image 2 - Desktop) */}
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
                        Career Stage
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Center Column: 3D Kinetic Curved Cylinder Typography Wheel */}
          <div
            className="lg:col-span-6 relative h-[180px] sm:h-[260px] lg:h-[560px] flex items-center justify-start overflow-visible w-full"
            style={{
              perspective: "1400px",
              perspectiveOrigin: "15% 50%",
            }}
          >
            <div
              className="relative w-full flex flex-col justify-center items-start will-change-transform"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {STAGES.map((s, idx) => {
                const dist = idx - scrollProgress
                const absDist = Math.abs(dist)

                // 3D Spherical & Cylindrical Circular Arc Math matching Image 2
                const translateY = dist * 175
                const xCurve = Math.pow(dist, 2) * 14 + dist * 10
                const rotateZ = dist * -10.5
                const rotateX = dist * 25
                const translateZ = -absDist * 85
                
                // Gaussian blur for non-active items matching Image 2
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
                      className={`text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[92px] font-bold tracking-tight leading-[0.9] transition-colors duration-150 ${
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

          {/* Right Column: Layered Stack of 4 Detail Cards (Butter-Smooth GPU Cross-Fade) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
            {STAGES.map((stage, idx) => {
              const dist = idx - scrollProgress
              const absDist = Math.abs(dist)
              const opacity = Math.max(1 - absDist * 1.5, 0)
              const translateY = dist * 26

              if (opacity <= 0.01) return null

              return (
                <div
                  key={stage.step}
                  className="absolute inset-x-0 sm:inset-auto sm:w-[380px] rounded-3xl border border-white/15 bg-[#121418]/90 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] will-change-transform select-none"
                  style={{
                    opacity: opacity.toFixed(3),
                    transform: `translate3d(0, ${translateY.toFixed(2)}px, 0) scale3d(${(1 - absDist * 0.04).toFixed(3)}, ${(1 - absDist * 0.04).toFixed(3)}, 1)`,
                    pointerEvents: absDist < 0.6 ? "auto" : "none",
                    zIndex: Math.round((1 - absDist) * 10),
                    transition: "none",
                  }}
                >
                  {/* Card Image Thumbnail (Fully Visible Without Cropping) */}
                  <div className="w-full aspect-[16/10] min-h-[210px] sm:min-h-[230px] rounded-2xl overflow-hidden mb-4 relative bg-[#14161b] border border-white/10">
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
                    
                    <span className="absolute bottom-2.5 left-2.5 font-pixel text-[9px] uppercase tracking-wider text-white bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                      {stage.tag}
                    </span>
                  </div>

                  {/* Title, Headline & Description */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-pixel text-[11px] text-white/50 uppercase tracking-widest">
                        STAGE {stage.step}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {stage.headline}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-2" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
                      {stage.line1} {stage.line2}
                    </h4>

                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Bottom Stage Progress Cue */}
                  <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>Stage {stage.step} of 04</span>
                    <span className="text-white/60">Scroll &darr;</span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </div>
  )
}
