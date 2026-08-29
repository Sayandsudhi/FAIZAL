"use client"

import { useState, useEffect } from "react"

const NAV_LINKS = [
  { label: "Profile",     href: "#profile" },
  { label: "Ventures",    href: "#ventures" },
  { label: "Journey",     href: "#journey" },
  { label: "The Book",    href: "#book" },
  { label: "Leadership",  href: "#leadership" },
  { label: "Speaking",    href: "#speaking" },
  { label: "Contact",     href: "#contact" },
]

const NAV_STYLE = {
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  background: "rgba(245,244,240,0.85)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
} as const

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Navbar is visible first at the top, and vanishes as soon as the user scrolls into the zoom-out section
      if (window.scrollY <= 40) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <div
      className={`fixed top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 transition-all duration-500 ease-out pointer-events-none max-md:max-w-full ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8"
      }`}
    >
      <div className="pointer-events-auto w-full max-w-4xl min-w-0">

        {/* Main bar */}
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-2xl border border-black/[0.06]"
          style={NAV_STYLE}
        >
          <a href="#" className="font-pixel text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.22em] text-black/80 hover:text-black transition-colors truncate">
            FAIZAL CHIRAKKAL
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] text-black/60 hover:text-black transition-colors duration-200 tracking-wide uppercase font-medium"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="text-[11px] px-4 py-2 rounded-xl border border-black/10 text-black/80 hover:text-black hover:border-black/25 hover:bg-black/[0.04] transition-all duration-200 tracking-wider font-medium hidden md:block"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              CONTACT OFFICE
            </a>

            {/* Burger — mobile only */}
            <button
              onClick={() => setOpen(v => !v)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded-lg hover:bg-black/[0.04] transition-colors"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(6px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300"
                style={{
                  width: "18px",
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "none",
                }}
              />
              <span
                className="block h-px bg-black/60 transition-all duration-300 origin-center"
                style={{
                  width: "18px",
                  transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div
          className="md:hidden mt-2 overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: open ? "380px" : "0px", opacity: open ? 1 : 0 }}
        >
          <div
            className="rounded-2xl border border-black/[0.06] px-2 py-2 flex flex-col"
            style={NAV_STYLE}
          >
            {NAV_LINKS.map(l => (
              <a
                key={l.label}
                href={l.href}
                onClick={close}
                className="px-4 py-3 text-sm text-black/70 hover:text-black hover:bg-black/[0.04] rounded-xl transition-colors tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-1 px-2 pb-1">
              <a
                href="#contact"
                onClick={close}
                className="block text-center w-full text-[11px] px-4 py-2.5 rounded-xl bg-black text-white hover:bg-black/80 transition-all duration-200 tracking-wide"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                CONTACT OFFICE
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
