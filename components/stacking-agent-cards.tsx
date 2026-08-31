"use client"

import { useEffect, useRef, useState } from "react"

const VENTURES = [
  {
    label: "TECHNOLOGY",
    title: "Adam Finastra Private Limited",
    role: "CEO",
    desc: "Technology-focused enterprise working across digital solutions, IT services, software architecture, and professional services operating from Government Cyberpark, Kozhikode, Kerala.",
    stats: [{ v: "Govt Cyberpark", l: "location" }, { v: "Enterprise IT", l: "focus" }],
    img: "/images/brand/1.jpg",
  },
  {
    label: "HUMAN CAPITAL",
    title: "Guileless Resources and Outcomes Limited",
    role: "CEO & Managing Director",
    desc: "Built around the intersection of people, opportunities, and business outcomes. Connecting talent with meaningful economic possibilities and scaling sustainable human capital.",
    stats: [{ v: "Strategic", l: "talent synergy" }, { v: "Pan-India", l: "operations" }],
    img: "/images/brand/2.jpg",
  },
  {
    label: "MEDIA & COMMUNICATION",
    title: "Keatonx Media Limited",
    role: "CEO",
    desc: "A media-focused enterprise exploring the evolving intersection between content, digital communication, technology, and the modern creative economy.",
    stats: [{ v: "Digital Media", l: "focus" }, { v: "Strategic", l: "storytelling" }],
    img: "/images/brand/3.jpg",
  },
  {
    label: "ENTERTAINMENT",
    title: "Thinkstra Entertainment Limited",
    role: "CEO",
    desc: "Exploring creative opportunities, immersive audience experiences, and commercial strategy across the evolving creative and entertainment economy.",
    stats: [{ v: "Creative IP", l: "domain" }, { v: "Cross-Genre", l: "productions" }],
    img: "/images/brand/4.jpg",
  },
  {
    label: "INTERNATIONAL EVENTS",
    title: "The House of Adam Events — UK",
    role: "Managing Director",
    desc: "UK-based venture with an international outlook towards events, luxury cultural productions, and high-impact brand experiences across the UK and Europe.",
    stats: [{ v: "United Kingdom", l: "headquarters" }, { v: "Global", l: "curation" }],
    img: "/images/brand/5.jpg",
  },
  {
    label: "CREATIVE ENTERTAINMENT",
    title: "Adam Entertainment — UAE",
    role: "Managing Director",
    desc: "Strengthening international presence in the dynamic UAE market. Combining creativity, commercial strategy, technology, and global audience experiences.",
    stats: [{ v: "Dubai, UAE", l: "market" }, { v: "Cross-Border", l: "distribution" }],
    img: "/images/brand/6.jpg",
  },
  {
    label: "LEGAL",
    title: "Lawvex Legal Allies Private Limited",
    role: "Director",
    desc: "Building a modern legal practice focused on counsel, compliance, and commercial support for enterprises navigating complex regulatory and business environments.",
    stats: [{ v: "Legal Allies", l: "practice" }, { v: "Corporate", l: "counsel" }],
    img: "/images/brand/7.jpg",
  },
  {
    label: "PRODUCTS & OUTBOUND",
    title: "Subtantiation of Products and Outbound Tower Private Limited",
    role: "Director & CEO",
    desc: "Focused on product substantiation and outbound operations, building structured commercial pathways that connect enterprises with markets, distribution, and delivery.",
    stats: [{ v: "Outbound", l: "operations" }, { v: "Products", l: "focus" }],
    img: "/images/brand/9.jpg",
  },
  {
    label: "EDUCATION",
    title: "Adam Institute of Management and Technology Private Limited",
    role: "CEO",
    desc: "Developing management and technology education that prepares professionals for enterprise leadership, applied learning, and the demands of a changing business landscape.",
    stats: [{ v: "Management", l: "discipline" }, { v: "Technology", l: "focus" }],
    img: "/images/brand/8.jpg",
  },
  {
    label: "LEGAL",
    title: "Lawvex Legal Allies Private Limited",
    role: "Director",
    desc: "Building a modern legal practice focused on counsel, compliance, and commercial support for enterprises navigating complex regulatory and business environments.",
    stats: [{ v: "Legal Allies", l: "practice" }, { v: "Corporate", l: "counsel" }],
    img: "/images/brand/10.jpg",
  },
]

const STICKY_TOP   = 80   // matches top: 80px on first card
const STICKY_STEP  = 16   // each card stacks 16px lower
const SCALE_STEP   = 0.03 // scale reduction per card stacked on top
const OFFSET_STEP  = 6    // px pushed down per card stacked on top

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

export function StackingAgentCards() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  // depth[i] = 0..N how many cards are currently stacked on top of card i
  const [depth, setDepth] = useState<number[]>(VENTURES.map(() => 0))

  useEffect(() => {
    function onScroll() {
      const nextDepth = VENTURES.map((_, i) => {
        let count = 0
        for (let j = i + 1; j < VENTURES.length; j++) {
          const el = cardRefs.current[j]
          if (!el) continue
          const rect = el.getBoundingClientRect()
          const stickyTopJ = STICKY_TOP + j * STICKY_STEP
          if (rect.top <= stickyTopJ + 2) count++
        }
        return count
      })
      setDepth((prev) => (prev.every((v, i) => v === nextDepth[i]) ? prev : nextDepth))
    }

    let ticking = false
    const onScrollRaf = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        onScroll()
      })
    }

    window.addEventListener("scroll", onScrollRaf, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScrollRaf)
  }, [])

  return (
    <div className="flex flex-col md:[perspective:1400px] md:[perspective-origin:50%_0%]">
      {VENTURES.map((venture, i) => {
        const d         = depth[i]
        const scale     = 1 - d * SCALE_STEP
        const translateY = d * OFFSET_STEP

        return (
          <div
            key={`${venture.title}-${i}`}
            ref={el => { cardRefs.current[i] = el }}
            className="sticky mb-4"
            style={{ top: `${STICKY_TOP + i * STICKY_STEP}px`, zIndex: 10 + i }}
          >
            <div
              style={{
                transform:      `scale(${scale}) translateY(${translateY}px)`,
                transformOrigin: "top center",
                transition:     "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                willChange:     "transform",
              }}
            >
              <div className="group relative bg-[#faf9f7] rounded-2xl border border-black/[0.07] overflow-hidden cursor-pointer min-h-[300px] md:min-h-[340px] flex flex-col">

                {/* MOBILE: image top */}
                {venture.img && (
                  <div className="relative w-full h-52 pointer-events-none md:hidden bg-[#f0ede6] flex items-center justify-center p-4">
                    <img
                      src={venture.img}
                      alt={venture.label}
                      className="max-w-full max-h-full object-contain object-center"
                    />
                  </div>
                )}

                {/* DESKTOP: image right, fades out at left */}
                {venture.img && (
                  <div className="hidden md:flex absolute inset-y-0 right-0 w-1/2 pointer-events-none items-center justify-center p-6 bg-[#f7f5f0]/40">
                    <img
                      src={venture.img}
                      alt={venture.label}
                      className="max-w-[85%] max-h-[85%] object-contain object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(to right, #faf9f7 0%, transparent 40%)",
                      }}
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="relative z-10 p-5 sm:p-8 min-w-0 flex-1 flex flex-col">
                  <div className="md:max-w-[55%]">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Tag>{venture.label}</Tag>
                        <span className="text-[11px] font-mono text-black/50 bg-black/5 px-2.5 py-0.5 rounded-full">
                          {venture.role}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-light mb-3 break-words">{venture.title}</h3>
                    <p className="text-sm text-black/45 leading-relaxed mb-6 sm:mb-8">{venture.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 sm:gap-8 pt-6 border-t border-black/[0.06] md:max-w-[55%] mt-auto">
                    {venture.stats.map(s => (
                      <div key={s.l} className="min-w-0">
                        <div className="text-lg sm:text-xl font-light break-words">{s.v}</div>
                        <div className="text-[11px] text-black/35 tracking-widest mt-0.5 uppercase font-mono">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
