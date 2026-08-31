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
      className="relative w-full aspect-video rounded-2xl sm:rounded-3xl border border-black/[0.08] overflow-hidden shadow-xl sm:shadow-2xl group cursor-pointer bg-transparent"
      style={{
        transform: "translateZ(0)",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      <video
        ref={videoRef}
        src="/video2.mp4"
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
        className="w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl select-none block"
      >
        <source src="/video2.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
