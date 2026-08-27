"use client"

import React, { useState } from "react"

interface Channel {
  title: string
  email: string
  desc: string
}

const INQUIRY_CHANNELS: Channel[] = [
  {
    title: "Business & Strategic Partnerships",
    email: "partnerships@faizalchirakkal.com",
    desc: "For enterprise collaborations, venture co-creation, and commercial alliances.",
  },
  {
    title: "International Business (UK / UAE / Global)",
    email: "international@faizalchirakkal.com",
    desc: "Cross-border market development, trade expansion, and global operations.",
  },
  {
    title: "Media & Press Inquiries",
    email: "media@faizalchirakkal.com",
    desc: "Interviews, press commentary, broadcast appearances, and publication features.",
  },
  {
    title: "Speaking & Conferences",
    email: "speaking@faizalchirakkal.com",
    desc: "Keynote addresses, leadership summits, panel discussions, and corporate forums.",
  },
  {
    title: "Author & Book Enquiries",
    email: "author@faizalchirakkal.com",
    desc: "Literary interviews, bulk book orders, book signings, and publishing rights.",
  },
]

const SOCIAL_LINKS = [
  {
    platform: "LinkedIn",
    name: "Muhammed Faizal Chirakkal",
    url: "https://linkedin.com",
    tag: "Professional Network",
  },
  {
    platform: "Instagram",
    name: "Faizal Muhammed",
    url: "https://instagram.com",
    tag: "Visual & Literary Updates",
  },
  {
    platform: "Facebook",
    name: "Muhammed Faizal Chirakkal",
    url: "https://facebook.com",
    tag: "Official Page",
  },
  {
    platform: "YouTube",
    name: "Faizal Muhammed",
    url: "https://youtube.com",
    tag: "Speeches & Videos",
  },
  {
    platform: "X (Twitter)",
    name: "Faizal Muhammed",
    url: "https://x.com",
    tag: "Thoughts & Perspectives",
  },
  {
    platform: "Author / Book Page",
    name: "The Entrepreneur",
    url: "#book",
    tag: "Official Book Hub",
  },
]

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Business & Strategic Partnerships",
    message: "",
  })

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#141517] text-[#FAF9F6] selection:bg-[#FAF9F6] selection:text-[#141517] relative overflow-hidden">
      {/* Subtle Ambient Lighting */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            Connect & Initiate Dialogue
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white font-heading">
            Let’s Build <span className="font-serif italic text-[#D4AF37]">Something Meaningful.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-light">
            Great businesses often begin with a single conversation. Whether you are exploring business partnerships, international opportunities, keynote speaking, or author inquiries, Faizal welcomes meaningful dialogues.
          </p>
        </div>

        {/* Main Grid: Channels & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left Column: Direct Routed Channels */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Direct Executive Communication Desks
            </h3>

            {INQUIRY_CHANNELS.map((ch, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/[0.08] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {ch.title}
                  </h4>
                  <p className="text-xs text-white/60 font-light mt-0.5">
                    {ch.desc}
                  </p>
                  <div className="text-xs font-mono text-[#D4AF37] mt-1.5 font-medium">
                    {ch.email}
                  </div>
                </div>

                <button
                  onClick={() => copyEmail(ch.email)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider border border-white/20 hover:border-[#D4AF37] text-white/80 hover:text-white bg-white/5 hover:bg-[#D4AF37]/20 transition-all shrink-0 cursor-pointer self-start sm:self-auto"
                >
                  {copiedEmail === ch.email ? "✓ Copied" : "Copy Email"}
                </button>
              </div>
            ))}

            {/* Corporate Office Address Box */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mt-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-1">
                Corporate Office
              </span>
              <h4 className="text-sm font-semibold text-white font-heading">
                Adam Finastra & Executive Headquarters
              </h4>
              <p className="text-xs text-white/70 mt-1 font-light leading-relaxed">
                Government Cyberpark, Kozhikode, Kerala, India
              </p>
              <div className="text-[11px] text-white/40 font-mono mt-2">
                Regional Hubs: London (UK) &bull; Dubai (UAE)
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-6 rounded-3xl bg-white/[0.04] border border-white/10 p-8 sm:p-10 backdrop-blur-xl">
            <h3 className="text-xl font-light text-white font-heading mb-2">
              Send an Executive Message
            </h3>
            <p className="text-xs text-white/60 mb-6 font-light">
              Your inquiry will be routed directly to the appropriate executive desk.
            </p>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Your Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe, Managing Director"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Your Official Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Inquiry Nature
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1A1C20] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  >
                    <option value="Business & Strategic Partnerships">Business & Strategic Partnerships</option>
                    <option value="International Business">International Business (UK / UAE / Global)</option>
                    <option value="Media & Press">Media & Press Inquiries</option>
                    <option value="Speaking & Conferences">Keynote Speaking & Conferences</option>
                    <option value="Author & Book Enquiries">Author & The Entrepreneur Book</option>
                    <option value="General Executive Inquiry">General Executive Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide a brief summary of the proposed collaboration or discussion..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#E5C158] transition-all shadow-md mt-2 cursor-pointer"
                >
                  Transmit Message &rarr;
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-lg mx-auto">
                  ✓
                </div>
                <h4 className="text-lg font-semibold text-white font-heading">
                  Inquiry Successfully Transmitted
                </h4>
                <p className="text-xs text-white/70 font-light max-w-sm mx-auto">
                  Thank you for reaching out. The executive office of Muhammed Faizal Chirakkal has received your details and will respond accordingly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs font-mono text-[#D4AF37] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Social Media Links Bar */}
        <div className="border-t border-white/10 pt-12">
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Connect Across Platforms
            </span>
            <h4 className="text-lg font-light text-white font-heading mt-1">
              Official Digital Presence
            </h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SOCIAL_LINKS.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/[0.08] transition-all text-center group block"
              >
                <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                  {s.platform}
                </div>
                <div className="text-[11px] text-white/50 mt-0.5 truncate">{s.name}</div>
                <span className="text-[9px] font-mono text-white/30 block mt-2 uppercase tracking-wider">
                  {s.tag}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
