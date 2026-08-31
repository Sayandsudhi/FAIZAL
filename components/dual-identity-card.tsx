"use client"

import React, { useState } from "react"

export function DualIdentityCard() {
  const [activeTab, setActiveTab] = useState<"corporate" | "literary">("corporate")

  return (
    <section id="profile" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-black/60 bg-black/5 border border-black/10 mb-4">
          Professional Profile & Identity
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141517] font-heading">
          Two Dimensions. <span className="font-serif italic text-black/60">One Singular Vision.</span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed font-light">
          Combining strategic enterprise execution with philosophical reflection. Exploring where technology, human capital, creativity, and conviction converge.
        </p>

        {/* Tab Switcher */}
        <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-black/5 border border-black/10">
          <button
            onClick={() => setActiveTab("corporate")}
            className={`px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeTab === "corporate"
                ? "bg-[#141517] text-white shadow-md"
                : "text-black/60 hover:text-black"
            }`}
          >
            Muhammed Faizal Chirakkal (Executive)
          </button>
          <button
            onClick={() => setActiveTab("literary")}
            className={`px-5 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeTab === "literary"
                ? "bg-[#141517] text-white shadow-md"
                : "text-black/60 hover:text-black"
            }`}
          >
            Faizal Muhammed (Author & Writer)
          </button>
        </div>
      </div>

      {/* Dynamic Content Panel */}
      <div className="rounded-3xl border border-black/10 bg-white p-6 sm:p-10 lg:p-12 shadow-[0_10px_40px_rgb(0,0,0,0.03)] transition-all duration-500">
        {activeTab === "corporate" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono uppercase tracking-widest text-black/50">
                  Corporate & Enterprise Leadership
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#141517] font-heading leading-snug">
                Building Enterprises. Creating Opportunities. Transforming Ideas into Global Realities.
              </h3>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light">
                Muhammed Faizal Chirakkal is an entrepreneur and business leader whose journey is defined by an enduring passion for building enterprises, creating opportunities, and transforming ideas into meaningful ventures.
              </p>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light">
                With leadership responsibilities spanning India, the United Arab Emirates, and the United Kingdom, Faizal has developed a diverse entrepreneurial portfolio across technology, human capital, media, entertainment, and international events.
              </p>
              
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-black/10">
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                  <div className="text-xs text-black/40 font-mono">CORE FOCUS</div>
                  <div className="text-sm font-semibold text-[#141517] mt-1">Tech & Capital</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                  <div className="text-xs text-black/40 font-mono">REGIONS</div>
                  <div className="text-sm font-semibold text-[#141517] mt-1">India • UAE • UK</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF9F6] border border-black/5">
                  <div className="text-xs text-black/40 font-mono">KEY VENTURES</div>
                  <div className="text-sm font-semibold text-[#141517] mt-1">6 Active Entities</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-black/10 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-black/50">Current Executive Roles</h4>
              <ul className="space-y-3">
                {[
                  { role: "CEO", company: "Adam Finastra Private Limited", loc: "Cyberpark, India" },
                  { role: "CEO & MD", company: "Guileless Resources & Outcomes Limited", loc: "India" },
                  { role: "CEO", company: "Keatonx Media Limited", loc: "India" },
                  { role: "CEO", company: "Thinkstra Entertainment Limited", loc: "India" },
                  { role: "Managing Director", company: "The House of Adam Events", loc: "United Kingdom" },
                  { role: "Managing Director", company: "Adam Entertainment", loc: "United Arab Emirates" },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/5 hover:border-black/20 transition-all">
                    <div>
                      <div className="text-xs font-bold text-[#141517]">{item.company}</div>
                      <div className="text-[11px] text-black/50">{item.loc}</div>
                    </div>
                    <span className="text-[10px] font-mono uppercase font-semibold px-2 py-1 rounded bg-black/5 text-black/70">
                      {item.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#B8934E]">
                  Literary Voice & Thought Leadership
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-[#141517] font-heading leading-snug">
                Faizal Muhammed — Author of <span className="italic font-serif font-normal">The Entrepreneur</span>
              </h3>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light">
                Beyond his corporate identity, he is known in the world of writing as <strong>Faizal Muhammed</strong>. As a writer, he explores the ideas and experiences behind entrepreneurship—ambition, uncertainty, leadership, resilience, risk, and the courage to build something that does not yet exist.
              </p>
              <p className="text-sm sm:text-base text-black/70 leading-relaxed font-light">
                His book, <em>The Entrepreneur</em>, represents the intersection of his professional experience and his passion for writing. For Faizal, entrepreneurship is not simply about creating companies—it is about creating possibilities.
              </p>
              
              <div className="p-4 rounded-xl bg-[#FAF9F6] border-l-4 border-[#D4AF37] text-xs sm:text-sm italic text-black/75 font-serif">
                &ldquo;An entrepreneur does not simply find opportunities. An entrepreneur creates possibilities where others see limitations.&rdquo;
                <span className="block mt-1 font-sans font-medium not-italic text-[11px] text-black/50">— Faizal Muhammed</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FAF9F6] rounded-2xl p-6 sm:p-8 border border-black/10 flex flex-col items-center text-center">
              <div className="relative w-40 h-56 sm:w-48 sm:h-64 shadow-xl rounded-lg overflow-hidden mb-4 border border-black/10">
                <img
                  src="/images/book-the-entrepreneur.jpg"
                  alt="The Entrepreneur by Faizal Muhammed"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-base font-semibold text-[#141517]">The Entrepreneur</h4>
              <p className="text-xs text-black/60 mt-1 max-w-xs">
                A seminal work on the entrepreneurial mindset and transforming vision into an enterprise.
              </p>
              <a
                href="#book"
                className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#141517] hover:text-[#B8934E] inline-flex items-center gap-1.5"
              >
                Explore The Book &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
