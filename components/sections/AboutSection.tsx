"use client";

import { useRef, useState, useMemo } from "react";
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

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end 20%"],
  });

  const textWords = useMemo(() =>
    "Bagi kami, Singga Kopi bukanlah tempat untuk sekadar menikmati kopi, melainkan ruang untuk saling berbagi cerita.".split(" "),
    []);

  const images = [
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.36.jpeg", desc: "Suasana Pagi di Singga Kopi" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.24.jpeg", desc: "Barista Area & Brewing Station" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.37.jpeg", desc: "Detail Interior Kayu Estetik" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.29.jpeg", desc: "Area Outdoor yang Sejuk" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.34.jpeg", desc: "Momen Berbagi Cerita" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.23.jpeg", desc: "Koleksi Biji Kopi Pilihan" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.25.jpeg", desc: "Spot Favorit Pelanggan" },
    { src: "/foto/whatsapp_image_2026-04-02_at_21.34.26.jpeg", desc: "Sentuhan Alam di Setiap Sudut" },
  ];

  return (
    <>
      <section
        ref={container}
        id="about"
        className="relative z-10 w-full min-h-screen bg-black text-white px-8 md:px-16 py-32 flex flex-col justify-center -mt-[100vh] border-t border-zinc-900 shadow-[0_-20px_50px_rgba(0,0,0,1)] overflow-hidden"
      >
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
                {images.map((img, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setSelectedImage(img.src)}
                    whileHover={{ y: -10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative flex-[0_0_85%] sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_28%] min-w-0 aspect-[4/5] md:aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
                  >
                    <img
                      src={img.src}
                      alt={img.desc}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out pointer-events-none"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                       <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white text-xs md:text-sm font-light tracking-wide leading-relaxed">
                            {img.desc}
                          </p>
                       </div>
                    </div>
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
                    <ChevronLeft size={20}/>
                  </button>
                  <button 
                  onClick={() => emblaApi?.scrollNext()} 
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-zinc-800 text-zinc-500 hover:border-white hover:text-white transition-all active:scale-95"
                  >
                    <ChevronRight size={20}/>
                  </button>
               </div>
            </div>
          </div>
        </div>
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
              alt="Singga Kopi expanded"
              className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-white/60 text-xs md:text-sm tracking-[0.2em] uppercase font-light">
                {images.find(img => img.src === selectedImage)?.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
