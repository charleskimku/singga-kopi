"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu as MenuIcon } from "lucide-react";
import Menu from "./Menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        key="navbar-main"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 md:px-16 py-8 mix-blend-difference text-white"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          {/* Coffee cup logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-8 h-8 fill-current"
            aria-hidden="true"
          >
            {/* Cup body */}
            <path d="M10 20h36l-4 26H14L10 20z" />
            {/* Handle */}
            <path d="M46 24h6a6 6 0 0 1 0 12h-6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Saucer */}
            <ellipse cx="28" cy="47" rx="20" ry="3" />
            {/* Steam lines */}
            <path d="M20 14 Q21 10 20 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M28 14 Q29 10 28 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M36 14 Q37 10 36 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-medium tracking-widest uppercase" suppressHydrationWarning>
            Singga Kopi
          </span>
        </div>
        

        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span
            className="uppercase text-sm font-medium tracking-widest hidden md:block group-hover:underline underline-offset-4"
            suppressHydrationWarning
          >
            Menu
          </span>
          <MenuIcon className="w-6 h-6" />
        </button>
      </motion.nav>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
