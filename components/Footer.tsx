"use client";

import { useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(2026); // Default to current year context
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-black text-white px-8 md:px-16 py-24 pb-48 md:pb-24 relative z-10 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-8 mb-24">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase mb-8">
              Singga <br /> Kopi
            </h2>
            <p className="text-zinc-500 max-w-sm text-sm md:text-base leading-relaxed">
              Bringing the richness of the earth to your cup. Every bean tells a story of tradition, quality, and the perfect brew.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-8">Explore</h4>
            <ul className="flex flex-col gap-4 text-sm uppercase tracking-widest text-zinc-400">
              <li><a href="#about" className="hover:text-white transition-colors duration-300">Our Story</a></li>
              <li><a href="#products" className="hover:text-white transition-colors duration-300">Menu</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Farms</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Brewing Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-zinc-600 mb-8">Connect</h4>
            <ul className="flex flex-col gap-4 text-sm uppercase tracking-widest text-zinc-400">
              <li><a href="https://www.instagram.com/_singgah.kopi/" className="hover:text-white transition-colors duration-300">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Facebook</a></li>
              <li><a href="https://wa.me/6282239059813" className="hover:text-white transition-colors duration-300">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-zinc-900 gap-8">
          <div className="text-zinc-600 text-[10px] md:text-xs uppercase tracking-[0.2em]">
            © {year} Singga Kopi. Crafted for coffee lovers.
          </div>

          <div className="flex gap-8 text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Large background text signature */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <h1 className="text-[20vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap translate-y-1/2">
          Singga Kopi
        </h1>
      </div>
    </footer>
  );
}
