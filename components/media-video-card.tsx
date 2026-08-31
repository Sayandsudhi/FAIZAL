"use client"

import React, { useRef, useEffect, useState } from "react"

export function MediaVideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute("muted", "")
    video.setAttribute("playsinline", "")
    video.setAttribute("webkit-playsinline", "")
    video.setAttribute("autoplay", "")

    const attemptPlay = () => {
      if (!video) return
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setHasError(false)
          })
          .catch(() => {
            setIsPlaying(false)
          })
      }
    }

    // Attempt autoplay immediately
    attemptPlay()

    // Play when video enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    // User gesture fallback for mobile/iOS low-power mode
    const handleGesture = () => {
      attemptPlay()
    }

    window.addEventListener("touchstart", handleGesture, { passive: true, once: true })
    window.addEventListener("scroll", handleGesture, { passive: true, once: true })
    window.addEventListener("click", handleGesture, { passive: true, once: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("touchstart", handleGesture)
      window.removeEventListener("scroll", handleGesture)
      window.removeEventListener("click", handleGesture)
    }
  }, [])

  const handleVideoClick = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      onClick={handleVideoClick}
      className="relative rounded-3xl border border-black/[0.08] bg-[#0c0d10] min-h-[300px] sm:min-h-[460px] lg:min-h-[500px] overflow-hidden shadow-2xl group cursor-pointer"
    >
      <video
        ref={videoRef}
        src="/video2.mp4"
        poster="/images/arc.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          const v = videoRef.current
          if (v) {
            v.currentTime = 0
            v.play().catch(() => {})
          }
        }}
        onError={() => setHasError(true)}
        className="absolute inset-0 w-full h-full object-cover object-center select-none"
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>

      {/* Elegant glass overlay badge at bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>EXECUTIVE MEDIA &bull; ENGAGEMENTS</span>
        </div>
      </div>
    </div>
  )
}
