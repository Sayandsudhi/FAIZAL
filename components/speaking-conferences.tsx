"use client"

import React, { useRef, useEffect, useState } from "react"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-white/90 bg-white/10 backdrop-blur-md border border-white/20">
      {children}
    </span>
  )
}

const TOPICS = [
  { topic: "ENTREPRENEURSHIP", title: "From Idea to Enterprise", desc: "Understanding how ideas are identified, developed and transformed into businesses." },
  { topic: "LEADERSHIP", title: "Leading People. Leading Change.", desc: "The responsibility of leadership, decision-making and building high-performing teams." },
  { topic: "STRATEGY", title: "Vision Into Execution", desc: "Turning ambition into practical strategy and sustainable growth." },
  { topic: "TECHNOLOGY", title: "Business in a Digital World", desc: "Understanding technology as a driver of innovation and competitive advantage." },
  { topic: "HUMAN CAPITAL", title: "People Behind the Enterprise", desc: "Building organisations around talent, capability and opportunity." },
  { topic: "INTERNATIONAL", title: "Building Beyond Borders", desc: "Exploring global markets, international partnerships and cross-border opportunities." },
]

export function SpeakingConferences() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute("muted", "")
    video.setAttribute("playsinline", "")
    video.setAttribute("autoplay", "")

    const startPlay = () => {
      if (video) {
        video.play().catch((err) => {
          console.log("Waiting for user gesture to play:", err)
        })
      }
    }

    startPlay()

    // Fallback: trigger play on first touch/scroll/click
    const handleInteract = () => {
      startPlay()
      window.removeEventListener("click", handleInteract)
      window.removeEventListener("scroll", handleInteract)
      window.removeEventListener("touchstart", handleInteract)
    }

    window.addEventListener("click", handleInteract, { once: true })
    window.addEventListener("scroll", handleInteract, { once: true })
    window.addEventListener("touchstart", handleInteract, { once: true })

    return () => {
      window.removeEventListener("click", handleInteract)
      window.removeEventListener("scroll", handleInteract)
      window.removeEventListener("touchstart", handleInteract)
    }
  }, [])

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted
      videoRef.current.muted = nextMuted
      setIsMuted(nextMuted)
    }
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <section id="speaking" data-snap-section className="relative py-16 md:py-32 px-4 md:px-12 lg:px-20 border-b border-black/[0.06] overflow-hidden max-md:overflow-x-clip bg-black text-white">
      
      {/* ── FULL BACKGROUND VIDEO (NO WHITE OVERLAY) ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video1.mp4" type="video/mp4" />
        <source src="/videos/video1.mp4" type="video/mp4" />
        <source src="/images/engagement/video1.mp4" type="video/mp4" />
        <source src="/engagement/video1.mp4" type="video/mp4" />
      </video>

      {/* Subtle Dark Vignette for Contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black/35" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Top Section Header */}
        <div className="mb-8 md:mb-16">
          <RevealText className="text-[1.85rem] sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-white drop-shadow-md">
            {"Ideas worth sharing\non global stages."}
          </RevealText>
        </div>

        {/* 6 Luxury Frosted Glass Cards with Cursor Hover Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((sp) => (
            <div
              key={sp.topic}
              onMouseMove={handleCardMouseMove}
              className="group relative rounded-2xl border border-white/20 p-5 sm:p-7 overflow-hidden cursor-pointer shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-white/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              style={{
                background: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
              }}
            >
              {/* Dynamic Mouse Cursor Glow Spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.18), transparent 70%)",
                }}
              />

              {/* Top Shimmer Accent Line on Hover */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <span className="font-pixel text-[10px] text-white/60 tracking-widest uppercase block mb-3 transition-colors group-hover:text-white">
                  {sp.topic}
                </span>
                <h3 className="text-lg font-light mb-2 text-white group-hover:text-white transition-colors">
                  {sp.title}
                </h3>
                <p className="text-xs text-white/75 leading-relaxed font-light group-hover:text-white/95 transition-colors">
                  {sp.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
