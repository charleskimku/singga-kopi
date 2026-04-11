"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

export default function StatsSection() {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { num: 120, label: "Farms", suffix: "+" },
    { num: 5, label: "Continents", suffix: "" },
    { num: 45, label: "Varieties", suffix: "+" },
    { num: 24, label: "Awards", suffix: "" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as any } },
  };

  return (
    <section 
      ref={ref} 
      className="py-32 md:py-48 px-8 md:px-16 bg-black text-white relative z-10 w-full border-t border-zinc-900 border-b border-zinc-900 overflow-hidden"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {mounted && (
        <>
          {/* Background Accent */}
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent opacity-20" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent opacity-20" />

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col gap-6 group">
                <h3 className="text-6xl md:text-8xl font-light tracking-tighter text-white group-hover:text-zinc-400 transition-colors duration-500 flex items-center">
                  <CountUp 
                    start={0} 
                    end={stat.num} 
                    duration={3} 
                    separator="," 
                    enableScrollSpy 
                    scrollSpyOnce 
                  />
                  <span className="text-zinc-700 ml-1" suppressHydrationWarning>{stat.suffix}</span>
                </h3>
                <div className="flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-zinc-800 group-hover:w-12 group-hover:bg-white transition-all duration-500" />
                  <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold" suppressHydrationWarning>
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
}
