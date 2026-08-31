"use client"

import React, { useState } from "react"
import Image from "next/image"

interface GalleryItem {
  id: string
  title: string
  subtitle: string
  tag: string
  imageSrc: string
  aspectRatio?: string
}

const GALLERY_ROW_1: GalleryItem[] = [
  {
    id: "g1",
    title: "Global Leadership & Keynotes",
    subtitle: "Addressing International Forums & Summits",
    tag: "Speaking & Summits",
    imageSrc: "/images/summit-keynote.jpg",
  },
  {
    id: "g2",
    title: "Adam Finastra Cyberpark HQ",
    subtitle: "Government Cyberpark, Kozhikode, Kerala",
    tag: "Technology & IT",
    imageSrc: "/images/cyberpark-headquarters.jpg",
  },
  {
    id: "g3",
    title: "The Entrepreneur — Published Work",
    subtitle: "Author Identity as Faizal Muhammed",
    tag: "Bestselling Author",
    imageSrc: "/images/book-the-entrepreneur.jpg",
  },
  {
    id: "g4",
    title: "Executive Leadership & Strategy",
    subtitle: "Cross-Border Enterprise Architecture",
    tag: "Corporate Leadership",
    imageSrc: "/images/faizal-portrait.jpg",
  },
  {
    id: "g5",
    title: "International Market Alliances",
    subtitle: "London • Dubai • India Global Network",
    tag: "Global Expansion",
    imageSrc: "/images/gallery/photo-1.jpg",
  },
  {
    id: "g6",
    title: "Innovation & Digital Infrastructure",
    subtitle: "Next-Generation Enterprise Ecosystems",
    tag: "Cyberpark Ecosystem",
    imageSrc: "/images/gallery/photo-2.jpg",
  },
]

const GALLERY_ROW_2: GalleryItem[] = [
  {
    id: "g7",
    title: "The House of Adam Events — UK",
    subtitle: "Curating Luxury Experiences across the UK",
    tag: "United Kingdom",
    imageSrc: "/images/summit-keynote.jpg",
  },
  {
    id: "g8",
    title: "Adam Entertainment — UAE",
    subtitle: "Creative Industries & Event Ecosystems in UAE",
    tag: "United Arab Emirates",
    imageSrc: "/images/cyberpark-headquarters.jpg",
  },
  {
    id: "g9",
    title: "Guileless Resources & Outcomes",
    subtitle: "Human Capital Development & Talent Synergy",
    tag: "Human Capital",
    imageSrc: "/images/faizal-portrait.jpg",
  },
  {
    id: "g10",
    title: "Keatonx Media & Thinkstra",
    subtitle: "Content, Media & Entertainment Ventures",
    tag: "Creative Economy",
    imageSrc: "/images/book-the-entrepreneur.jpg",
  },
  {
    id: "g11",
    title: "Youth Entrepreneurship & Mentorship",
    subtitle: "Empowering Next-Gen Founders & Leaders",
    tag: "Mentorship",
    imageSrc: "/images/gallery/photo-1.jpg",
  },
]

export function HorizontalGalleryMarquee() {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null)
  const [showGuide, setShowGuide] = useState(false)

  return (
    <section className="py-24 bg-[#141517] text-[#FAF9F6] overflow-hidden relative selection:bg-[#FAF9F6] selection:text-[#141517]">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Executive Visual Timeline & Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-heading">
            Enterprise in Motion. <span className="text-[#D4AF37] italic font-serif">Global Presence.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-xl font-light">
            A dynamic visual showcase of leadership engagements, international enterprise hubs, technology centers, and published literature across India, the UK, and the UAE.
          </p>
        </div>

        {/* Image Placement Guide Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuide((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase border border-white/20 hover:border-[#D4AF37] text-white/80 hover:text-white bg-white/5 hover:bg-[#D4AF37]/10 transition-all cursor-pointer shadow-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            {showGuide ? "Hide Image Paste Guide" : "Where To Paste Images?"}
          </button>
        </div>
      </div>

      {/* Interactive Helper Box for User: Explaining exactly where to paste images */}
      {showGuide && (
        <div className="max-w-7xl mx-auto px-6 mb-10 transition-all duration-300">
          <div className="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/30 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0 mt-0.5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <h4 className="font-semibold text-white tracking-wide flex items-center gap-2">
                  <span>How to Paste and Update Your Images</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    Ready to drop
                  </span>
                </h4>
                <p className="text-white/70">
                  You can easily replace any photo by copying your image files directly into the project folders:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono mt-2">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-white/90">
                    <span className="text-[#D4AF37] font-bold block mb-1">1. Hero Front Page Portrait:</span>
                    <code className="text-white/80">public/images/faizal-portrait.jpg</code>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-white/90">
                    <span className="text-[#D4AF37] font-bold block mb-1">2. Horizontal Gallery Stream:</span>
                    <code className="text-white/80">public/images/gallery/photo-1.jpg, photo-2.jpg ...</code>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-white/90">
                    <span className="text-[#D4AF37] font-bold block mb-1">3. Book Mockup Cover:</span>
                    <code className="text-white/80">public/images/book-the-entrepreneur.jpg</code>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-white/90">
                    <span className="text-[#D4AF37] font-bold block mb-1">4. Cyberpark / Tech Campus:</span>
                    <code className="text-white/80">public/images/cyberpark-headquarters.jpg</code>
                  </div>
                </div>
                <p className="text-[11px] text-white/40 italic pt-1">
                  * Note: Any JPG or PNG with these exact filenames will immediately reflect on the website without editing code!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marquee Row 1 (Running Left) */}
      <div className="relative w-full mb-6 group">
        {/* Subtle Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#141517] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#141517] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 w-max animate-marquee-left group-hover:[animation-play-state:paused]"
          style={{ willChange: "transform" }}
        >
          {/* Double repeat for continuous seamless infinite loop */}
          {[...GALLERY_ROW_1, ...GALLERY_ROW_1, ...GALLERY_ROW_1].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setActiveImage(item)}
              className="relative w-[320px] sm:w-[380px] h-[240px] sm:h-[260px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:border-[#D4AF37]/50 shadow-lg group/card"
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                onError={(e) => {
                  // Fallback if user hasn't added this specific photo yet
                  (e.target as HTMLImageElement).src = "/images/cyberpark-headquarters.jpg"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />
              
              <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm self-start mb-2 border border-[#D4AF37]/30">
                  {item.tag}
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 font-light line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Running Right) */}
      <div className="relative w-full group">
        {/* Subtle Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#141517] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#141517] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-6 w-max animate-marquee-right group-hover:[animation-play-state:paused]"
          style={{ willChange: "transform" }}
        >
          {/* Double repeat for continuous seamless infinite loop */}
          {[...GALLERY_ROW_2, ...GALLERY_ROW_2, ...GALLERY_ROW_2].map((item, idx) => (
            <div
              key={`${item.id}-r2-${idx}`}
              onClick={() => setActiveImage(item)}
              className="relative w-[300px] sm:w-[360px] h-[220px] sm:h-[240px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer transform transition-all duration-300 hover:scale-[1.03] hover:border-[#D4AF37]/50 shadow-lg group/card"
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/summit-keynote.jpg"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />
              
              <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm self-start mb-2 border border-[#D4AF37]/30">
                  {item.tag}
                </span>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-white/70 mt-1 font-light line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Preview Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1A1C20] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
          >
            <div className="relative h-[450px] sm:h-[520px] w-full">
              <img
                src={activeImage.imageSrc}
                alt={activeImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C20] via-transparent to-black/40" />
            </div>

            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                {activeImage.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white mt-3 font-heading">
                {activeImage.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base mt-2 font-light">
                {activeImage.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
