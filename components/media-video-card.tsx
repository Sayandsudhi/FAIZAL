"use client"

import React, { useRef, useEffect } from "react"

export function MediaVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        video.play().catch(() => {
          // Retry on user interaction
        })
      }
    }

    startPlay()

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

  return (
    <div className="group relative rounded-3xl border border-white/20 bg-[#0c0d10] p-5 sm:p-11 lg:p-12 min-h-[360px] sm:min-h-[480px] flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/40 hover:-translate-y-1">
      {/* Background Looping Video with Rich Contrast */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0d10]">
        <video
          ref={videoRef}
          src="/video2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out select-none pointer-events-none"
        >
          <source src="/video2.mp4" type="video/mp4" />
        </video>
        {/* Soft Contrast Gradient (Transparent enough to clearly see the video in action) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 font-pixel text-[10px] sm:text-sm text-white/80 uppercase tracking-widest flex items-center justify-between gap-3 mb-4 min-w-0">
        <span className="min-w-0 leading-relaxed">VERIFIED MEDIA &amp; INSTITUTIONAL RECOGNITIONS</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-5 my-auto">
        <div className="p-4 sm:p-7 rounded-2xl bg-black/45 hover:bg-black/60 border border-white/20 backdrop-blur-md transition-colors shadow-lg">
          <span className="text-[10px] sm:text-xs font-mono text-emerald-300 uppercase tracking-wider font-semibold">Press &amp; Publications</span>
          <h4 className="text-base sm:text-lg font-semibold text-white mt-1.5" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
            Cross-Border Leadership &amp; Enterprise Features
          </h4>
          <p className="text-xs sm:text-sm text-white/80 mt-1.5 font-light leading-relaxed">
            Covering international expansion, technology ecosystems, and literary work.
          </p>
        </div>

        <div className="p-4 sm:p-7 rounded-2xl bg-black/45 hover:bg-black/60 border border-white/20 backdrop-blur-md transition-colors shadow-lg">
          <span className="text-[10px] sm:text-xs font-mono text-emerald-300 uppercase tracking-wider font-semibold">Awards &amp; Honours</span>
          <h4 className="text-base sm:text-lg font-semibold text-white mt-1.5" style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}>
            Entrepreneurship &amp; Executive Recognition
          </h4>
          <p className="text-xs sm:text-sm text-white/80 mt-1.5 font-light leading-relaxed">
            Institutional awards and summits across India and overseas forums.
          </p>
        </div>
      </div>
    </div>
  )
}
