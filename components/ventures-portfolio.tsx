"use client"

import React, { useState } from "react"

interface Venture {
  id: string
  name: string
  role: string
  sector: string
  industry: string
  market: string
  location: string
  countryCode: "IN" | "UK" | "UAE"
  description: string
  highlights: string[]
  iconType: string
}

const VENTURES: Venture[] = [
  {
    id: "adam-finastra",
    name: "Adam Finastra Private Limited",
    role: "CEO",
    sector: "Technology & Digital Business",
    industry: "Information Technology",
    market: "India",
    location: "Government Cyberpark, Kozhikode, Kerala",
    countryCode: "IN",
    description:
      "As CEO, Faizal leads a technology-focused enterprise working across digital solutions, IT services, software, technology development, and related professional services. The business operates from Government Cyberpark, Kozhikode, placing it within one of Kerala's recognised technology ecosystems.",
    highlights: [
      "Digital transformation solutions & enterprise IT services",
      "Software architecture & technology capability development",
      "Located at Government Cyberpark, Kozhikode, Kerala",
      "Enabling companies to adapt and innovate in the digital economy",
    ],
    iconType: "tech",
  },
  {
    id: "guileless-resources",
    name: "Guileless Resources and Outcomes Limited",
    role: "CEO & Managing Director",
    sector: "Human Capital & Business Services",
    industry: "Human Capital & Business Services",
    market: "India",
    location: "India",
    countryCode: "IN",
    description:
      "As CEO & Managing Director, Faizal leads an enterprise built around the intersection of people, opportunities, business, and organisational outcomes. The venture reflects his belief that human potential is one of the most powerful foundations of sustainable business.",
    highlights: [
      "Human capital development & strategic talent enablement",
      "Organisational outcome architecture & business services",
      "Connecting people with meaningful economic possibilities",
      "Empowering workforce capability across emerging markets",
    ],
    iconType: "human",
  },
  {
    id: "keatonx-media",
    name: "Keatonx Media Limited",
    role: "CEO",
    sector: "Media & Communication",
    industry: "Media & Communication",
    market: "India",
    location: "India",
    countryCode: "IN",
    description:
      "As CEO, Faizal is involved in developing a media-oriented enterprise focused on the evolving relationship between content, communication, technology, and business. The venture reflects his interest in the growing influence of digital media and the creative economy.",
    highlights: [
      "Digital media strategy & strategic brand communication",
      "Creative content production & modern storytelling",
      "Navigating the intersection of media and technology",
      "Engaging new-age digital audiences across platforms",
    ],
    iconType: "media",
  },
  {
    id: "thinkstra-entertainment",
    name: "Thinkstra Entertainment Limited",
    role: "CEO",
    sector: "Entertainment & Creative Industries",
    industry: "Entertainment & Creative Industries",
    market: "India",
    location: "India",
    countryCode: "IN",
    description:
      "As CEO, Faizal leads a venture focused on the entertainment and creative sector. His vision is to explore new opportunities in entertainment by combining creativity, commercial strategy, technology, and audience experiences.",
    highlights: [
      "Creative intellectual property & entertainment production",
      "Commercial strategy for creative arts & media",
      "Audience-centric immersive entertainment formats",
      "Fostering cross-genre creative talents & partnerships",
    ],
    iconType: "entertainment",
  },
  {
    id: "house-of-adam-uk",
    name: "The House of Adam Events",
    role: "Managing Director",
    sector: "International Events & Entertainment",
    industry: "Events & Entertainment",
    market: "United Kingdom",
    location: "United Kingdom",
    countryCode: "UK",
    description:
      "As Managing Director, Faizal leads the UK-based venture with an international outlook towards events, experiences, and entertainment. The venture forms part of his broader ambition to establish businesses capable of operating across international markets.",
    highlights: [
      "International corporate & cultural luxury event curation",
      "Cross-border creative collaborations across the UK & Europe",
      "High-impact experiential brand activations",
      "Connecting global audiences with world-class productions",
    ],
    iconType: "events",
  },
  {
    id: "adam-entertainment-uae",
    name: "Adam Entertainment",
    role: "Managing Director",
    sector: "International Entertainment",
    industry: "Entertainment",
    market: "United Arab Emirates",
    location: "United Arab Emirates",
    countryCode: "UAE",
    description:
      "As Managing Director, Faizal leads Adam Entertainment in the UAE. The venture strengthens his presence within one of the world's most dynamic entertainment and business markets and forms part of his broader international entrepreneurial ecosystem.",
    highlights: [
      "Strategic presence in the UAE entertainment capital",
      "Cross-regional entertainment distribution & management",
      "Middle East & GCC market development",
      "Fostering cultural and creative international exchanges",
    ],
    iconType: "uae",
  },
]

export function VenturesPortfolio() {
  const [filter, setFilter] = useState<string>("ALL")

  const filteredVentures =
    filter === "ALL"
      ? VENTURES
      : VENTURES.filter((v) => v.countryCode === filter || v.industry.toLowerCase().includes(filter.toLowerCase()))

  return (
    <section id="ventures" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F3F1EB] border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-black/60 bg-black/5 border border-black/10 mb-4">
              Executive Leadership Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141517] font-heading">
              Building Enterprises <span className="font-serif italic text-black/60">Across Industries.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed max-w-2xl font-light">
              Faizal’s major entrepreneurial initiatives span technology, human capital, media, entertainment, events, and cross-border international commerce.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Ventures", value: "ALL" },
              { label: "India (IN)", value: "IN" },
              { label: "United Kingdom (UK)", value: "UK" },
              { label: "UAE (Dubai)", value: "UAE" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  filter === f.value
                    ? "bg-[#141517] text-white shadow-sm"
                    : "bg-white/80 hover:bg-white text-black/70 border border-black/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Venture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVentures.map((v) => (
            <div
              key={v.id}
              className="rounded-3xl bg-white border border-black/10 p-7 flex flex-col justify-between hover:shadow-xl hover:border-black/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8934E] font-semibold bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20">
                    {v.role}
                  </span>
                  <span className="text-[11px] font-mono text-black/50 bg-black/5 px-2.5 py-1 rounded-full">
                    {v.location}
                  </span>
                </div>

                {/* Company Name */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[#141517] font-heading tracking-tight leading-snug group-hover:text-black">
                  {v.name}
                </h3>
                <div className="text-xs font-medium text-black/50 uppercase tracking-wider mt-1 mb-4">
                  {v.sector}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-black/70 leading-relaxed font-light mb-6">
                  {v.description}
                </p>

                {/* Bullet Highlights */}
                <div className="space-y-2 pt-4 border-t border-black/5">
                  {v.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-black/60 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#141517] mt-1.5 shrink-0 opacity-40 group-hover:opacity-100" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-black/40">Market: {v.market}</span>
                <a
                  href="#contact"
                  className="font-medium text-[#141517] hover:text-[#B8934E] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Partner / Inquire &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
