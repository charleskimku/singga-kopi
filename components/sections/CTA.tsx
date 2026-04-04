"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTA() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Magnetic button logic
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <section ref={container} className="relative z-10 w-full min-h-screen bg-black text-white flex items-center justify-center overflow-hidden border-t border-zinc-900">
      {/* Dynamic background layers */}
      <motion.div 
        style={{ scale, rotate }}
        className="absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full border border-white/5 opacity-20 pointer-events-none"
      />
      <motion.div 
        style={{ scale: useTransform(scrollYProgress, [0, 1], [1.2, 0.8]) }}
        className="absolute w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-white opacity-[0.03] blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-[10rem] font-medium tracking-tighter uppercase leading-[0.9] mb-16 inline-block bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        >
          Ready to <br /> Order?
        </motion.h2>

        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
          className="relative overflow-hidden w-48 h-48 md:w-64 md:h-64 bg-white text-black rounded-full flex items-center justify-center group shadow-[0_0_50px_rgba(255,255,255,0.1)]"
        >
          <motion.span 
            className="relative z-10 uppercase tracking-[0.2em] text-xs md:text-sm font-bold flex flex-col items-center gap-2"
          >
            <span className="group-hover:scale-110 transition-transform duration-500 block">Shop Now</span>
            <span className="w-12 h-px bg-black opacity-20 group-hover:w-16 transition-all duration-500" />
          </motion.span>
          <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
        </motion.button>
      </div>
    </section>
  );
}
