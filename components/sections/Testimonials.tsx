"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const testimonials = [
    { 
      quote:"Kopi bukan sekadar tempat ngopi, tapi tempat berbagi cerita.", 
      name: "Reyhan afandi",
      role: "Owner"
    },
    { 
      quote: "Singga Kopi adalah tempat yang nyaman untuk menikmati kopi.", 
      name: "Yohan Pangalah",
      role: "owner"
    },
  ];

  return (
    <section className="py-48 bg-black text-white relative z-10 w-full overflow-hidden border-t border-zinc-900 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {mounted && (
        <>
          {/* Background Decorative Quote */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <Quote size={400} />
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="embla__slide flex-[0_0_100%] min-w-0 px-4 md:px-16 flex flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative"
                    >
                      <h3 className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-5xl leading-tight mb-12 italic">
                        &quot;{t.quote}&quot;
                      </h3>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-zinc-200 uppercase tracking-[0.3em] text-xs md:text-sm font-medium">
                          {t.name}
                        </p>
                        <p className="text-zinc-600 uppercase tracking-widest text-[10px]">
                          {t.role}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Fading Edges */}
            <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
          </div>
        </>
      )}
    </section>
  );
}
