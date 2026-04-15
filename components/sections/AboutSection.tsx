"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// --- Sub-component for individual word animation (to fix Hook rules) ---
function AnimatedWord({ content, index, total, scrollYProgress }: {
  content: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total;
  const end = start + (1 / total);
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight"
    >
      {content}
    </motion.span>
  );
}

export default function AboutSection() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 20%"],
  });

  const textWords = useMemo(() =>
    "Bagi kami, Singgah Kopi bukanlah tempat untuk sekadar menikmati kopi, melainkan ruang untuk saling berbagi cerita.".split(" "),
    []);

  const images = [
    "/foto/whatsapp_image_2026-04-02_at_21.34.36.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.24.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.37.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.29.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.34.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.23.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.25.jpeg",
    "/foto/whatsapp_image_2026-04-02_at_21.34.26.jpeg",
  ];

  return (
    <>
      <section
        ref={container}
        id="about"
        className="relative z-10 w-full min-h-screen bg-black text-white px-8 md:px-16 py-32 flex flex-col justify-center -mt-[100vh] border-t border-zinc-900 shadow-[0_-20px_50px_rgba(0,0,0,1)] overflow-hidden"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        {mounted && (
          <div className="max-w-6xl mx-auto w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-zinc-500 uppercase tracking-widest text-xs md:text-sm mb-12"
            >
              cerita kami
            </motion.h3>

            <div className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-4 mb-20 md:mb-32">
              {textWords.map((word, i) => (
                <AnimatedWord
                  key={i}
                  content={word}
                  index={i}
                  total={textWords.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Enhanced Swiper Container */}
            <div className="relative group/carousel">
              <div className="overflow-hidden cursor-grab active:cursor-grabbing pb-4" ref={emblaRef}>
                <div className="flex gap-4 md:gap-6">
                  {images.map((src, i) => (
                    <motion.div
                      key={i}
                      onClick={() => setSelectedImage(src)}
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="relative flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_28%] min-w-0 aspect-[4/5] md:aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                    >
                      <img
                        src={src}
                        alt="Singgah kopi Story"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Swipe Hint & Navigation */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6 md:mt-8">
                {/* Animated Progress Bar Hint */}
                <div className="flex gap-2 w-full md:w-32">
                  <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: "0%" }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full bg-white/40"
                    />
                  </div>
                </div>

                {/* Manual Navigation */}
                <div className="flex gap-6">
                  <button
                    onClick={() => emblaApi?.scrollPrev()}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:border-white hover:text-white transition-all active:scale-95"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => emblaApi?.scrollNext()}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:border-white hover:text-white transition-all active:scale-95"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 cursor-zoom-out backdrop-blur-xl"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors p-2"
            >
              <X size={32} />
            </motion.button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              src={selectedImage}
              alt="Singgah Kopi expanded"
              className="max-w-full max-h-full rounded-xl object-contain shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
