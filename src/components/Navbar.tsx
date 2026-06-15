"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

const navLinks = [
  { label: "The Method", href: "#how-it-works" },
  { label: "The Briefs", href: "#conundrums" },
  { label: "Gallery", href: "#journey" },
  { label: "For Schools", href: "#pricing" },
  { label: "Questions", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-paper transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_rgba(24,28,24,0.16)]" : ""
        }`}
      >
        <div className="kente-rule" aria-hidden="true" />
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a href="/" className="shrink-0">
            <Image
              src="/images/logo/on-green.png"
              alt="Khijani Africa"
              width={180}
              height={100}
              sizes="180px"
              priority
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="folio text-ink-soft hover:text-terra transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <a
              href="#pricing"
              className="folio px-5 py-2.5 border border-ink text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 text-ink"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-paper flex flex-col px-6 pt-6 pb-10"
          >
            <div className="kente-rule absolute top-0 left-0 right-0" aria-hidden="true" />
            <div className="flex items-center justify-between mb-14 mt-2">
              <Image
                src="/images/logo/on-green.png"
                alt="Khijani Africa"
                width={180}
                height={100}
                sizes="180px"
                className="h-10 w-auto"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-ink-faint hover:text-ink"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 + i * 0.07,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="group flex items-baseline justify-between py-5 hairline-b"
                >
                  <span className="font-display text-3xl font-semibold text-ink group-hover:italic group-hover:text-terra transition-colors duration-200">
                    {link.label}
                  </span>
                  <span className="folio text-ink-faint">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-auto"
            >
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="block w-full text-center folio py-4 bg-ink text-paper"
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
