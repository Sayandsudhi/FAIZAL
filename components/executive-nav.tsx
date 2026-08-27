"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

const NAV_LINKS = [
  { label: "Profile", href: "#profile" },
  { label: "Ventures", href: "#ventures" },
  { label: "Journey", href: "#journey" },
  { label: "Leadership", href: "#leadership" },
  { label: "Global Reach", href: "#international" },
  { label: "The Book", href: "#book" },
  { label: "Speaking", href: "#speaking" },
  { label: "Media", href: "#media" },
  { label: "Contact", href: "#contact" },
]

export function ExecutiveNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pt-3 pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto w-full max-w-7xl">
        {/* Main Bar */}
        <nav
          className={`flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl border transition-all duration-300 ${
            scrolled
              ? "bg-[#FAF9F6]/85 backdrop-blur-xl border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              : "bg-[#FAF9F6]/60 backdrop-blur-md border-black/[0.06] shadow-sm"
          }`}
        >
          {/* Brand Monogram & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#141517] text-[#FAF9F6] flex items-center justify-center font-mono text-xs font-semibold tracking-wider group-hover:scale-105 transition-transform">
              MFC
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#141517] font-heading">
                Muhammed Faizal
              </span>
              <span className="text-[10px] tracking-widest text-black/50 uppercase font-mono">
                Entrepreneur & Author
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-medium tracking-wide text-black/70 hover:text-[#141517] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#141517] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Button & Burger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center text-[11px] font-semibold tracking-wider uppercase px-4 py-2 rounded-xl bg-[#141517] text-white hover:bg-black/80 hover:shadow-md transition-all duration-200"
            >
              Get In Touch
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-xl border border-black/10 hover:bg-black/5 transition-colors"
              aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              <span
                className="block h-[1.5px] bg-[#141517] transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(4.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] bg-[#141517] transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] bg-[#141517] transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(-4.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="rounded-2xl border border-black/10 bg-[#FAF9F6]/95 backdrop-blur-2xl p-4 shadow-xl flex flex-col gap-1">
            <div className="grid grid-cols-2 gap-1.5 mb-3 pb-3 border-b border-black/10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className="px-3 py-2 text-xs font-medium text-black/80 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={close}
              className="w-full text-center text-xs font-semibold uppercase tracking-wider py-2.5 rounded-xl bg-[#141517] text-white hover:bg-black/80 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
