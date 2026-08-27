"use client"

import React from "react"

const BOOK_PILLARS = [
  {
    title: "The Entrepreneurial Mindset",
    desc: "Unpacking what drives someone to create from zero and how internal conviction shapes external reality.",
  },
  {
    title: "Navigating Uncertainty",
    desc: "How true leaders make critical decisions and build institutions even when the roadmap is completely unwritten.",
  },
  {
    title: "Resilience & Risk",
    desc: "Looking past financial models to examine the psychological grit required to persevere through ambiguity.",
  },
  {
    title: "The Human Side of Enterprise",
    desc: "Why leadership is ultimately about empowering people, fostering culture, and opening doors for others.",
  },
]

export function BookShowcase() {
  return (
    <section id="book" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#1A1C20] text-[#FAF9F6] selection:bg-[#FAF9F6] selection:text-[#1A1C20] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Book Artwork / 3D presentation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative group">
              {/* Gold Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/30 to-amber-600/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="relative w-64 sm:w-80 h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/images/book-the-entrepreneur.jpg"
                  alt="The Entrepreneur by Faizal Muhammed"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Written by Faizal Muhammed
              </span>
              <h4 className="text-xl font-light text-white mt-1">The Entrepreneur</h4>
              <p className="text-xs text-white/50 mt-1">Available in Hardcover, Paperback & Digital Editions</p>
              
              <div className="mt-5 flex items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-all shadow-md"
                >
                  Order / Inquire Book
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Book Thesis & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
                The Literary Voice & Work
              </div>
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-heading">
                What does it truly take to build <span className="font-serif italic text-[#D4AF37]">something of your own?</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-light">
                In <em>The Entrepreneur</em>, author <strong>Faizal Muhammed</strong> looks beyond balance sheets, valuation metrics, and corporate jargon to explore the human spirit behind building an enterprise.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BOOK_PILLARS.map((p, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/[0.08] transition-all"
                >
                  <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote Block */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/10 to-transparent border-l-4 border-[#D4AF37]">
              <blockquote className="text-base sm:text-lg font-serif italic text-white/90 leading-relaxed">
                &ldquo;An entrepreneur does not simply find opportunities. An entrepreneur creates possibilities where others see limitations.&rdquo;
              </blockquote>
              <div className="mt-2 text-xs font-mono text-[#D4AF37] tracking-wider uppercase">
                — Faizal Muhammed, <span className="italic font-serif normal-case">The Entrepreneur</span>
              </div>
            </div>

            <p className="text-sm text-white/60 font-light leading-relaxed">
              &ldquo;For Faizal, writing is not separate from his entrepreneurial journey. It is another way of understanding it.&rdquo;
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
