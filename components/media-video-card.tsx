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
    <div className="relative rounded-3xl border border-black/[0.07] bg-[#0c0d10] min-h-[360px] sm:min-h-[480px] overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        src="/video2.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
