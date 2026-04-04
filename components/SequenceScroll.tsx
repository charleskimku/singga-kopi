"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maxFrames = 192;
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Track scroll position inside the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Preload images into memory
  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= maxFrames; i++) {
      const img = new Image();
      const indexStr = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${indexStr}.jpg`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === maxFrames) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
      
      loadedImages.push(img);
    }
  }, []);

  // Map scroll progress to a frame index (1 to maxFrames), then wrap it in motion value subscription
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, maxFrames - 1]);

  useEffect(() => {
    if (!canvasRef.current || images.length !== maxFrames) return;

    const ctx = canvasRef.current.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas dimensions dynamically with High-DPI support
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = window.innerWidth * dpr;
        canvasRef.current.height = window.innerHeight * dpr;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
        ctx.scale(dpr, dpr);
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Initial draw
    const drawImage = (img: HTMLImageElement) => {
      if (!canvasRef.current || !ctx) return;
      
      const width = canvasRef.current.width / (window.devicePixelRatio || 1);
      const height = canvasRef.current.height / (window.devicePixelRatio || 1);
      
      const canvasRatio = width / height;
      const imgRatio = img.width / img.height;
      
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      // Cover-fit logic
      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    if (images[0]) drawImage(images[0]);

    // Update draw loop on scroll
    const unsubscribe = frameIndex.on("change", (latest) => {
      const currentIdx = Math.min(maxFrames - 1, Math.max(0, Math.floor(latest)));
      if (images[currentIdx]) {
        drawImage(images[currentIdx]);
      }
    });

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      unsubscribe();
    };
  }, [images, frameIndex]);

  const opacity0 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y0 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const opacity30 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [0, 1, 0]);
  const y30 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [50, 0, -50]);

  const opacity60 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [0, 1, 0]);
  const y60 = useTransform(scrollYProgress, [0.45, 0.6, 0.75], [50, 0, -50]);

  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black z-0">
        {mounted && (
          <>
            {/* Simple loader that doesn't use AnimatePresence */}
            {isLoading && (
              <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center gap-6">
                 <div className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                 <p className="text-white uppercase tracking-[0.4em] text-[10px] opacity-40">Brewing Experience</p>
              </div>
            )}
            
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Overlays */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center px-6 md:px-16">
              
              <motion.div 
                style={{ opacity: opacity0, y: y0 }}
                className="absolute flex flex-col items-center justify-center text-center text-white"
              >
                <h1 className="text-6xl md:text-[8rem] lg:text-[11rem] font-medium tracking-tighter uppercase leading-[0.85] mb-8">
                  Singga kopi <br />
                </h1>
                <h3 className="text-sm md:text-xl font-light text-zinc-400 tracking-[0.4em] uppercase max-w-lg">
                  Kopi Dulu Cerita Nyusul
                </h3>
              </motion.div>

              <motion.div 
                style={{ opacity: opacity30, y: y30 }}
                className="absolute w-full px-8 md:px-24 flex justify-start text-white"
              >
               
              </motion.div>

              <motion.div 
                style={{ opacity: opacity60, y: y60 }}
                className="absolute w-full px-8 md:px-24 flex justify-end text-right text-white"
              >
              </motion.div>

              {/* Scroll Hint */}
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: [0, 1, 0] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 style={{ opacity: scrollHintOpacity }}
                 className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
              >
                 <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</p>
                 <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
