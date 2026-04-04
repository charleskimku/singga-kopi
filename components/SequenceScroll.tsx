"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function SequenceScroll() {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [mounted, setMounted] = useState(false);

  // Total frames in the sequence based on public/sequence files
  const frameCount = 192;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress (Lerp/Momentum) for cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Start from frame 80 for peak visual impact in the hero section
  const currentIndex = useTransform(smoothProgress, [0, 1], [80, frameCount - 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const getFrameUrl = (index: number) => {
      const paddedIndex = index.toString().padStart(3, '0');
      return `/sequence/ezgif-frame-${paddedIndex}.jpg`;
    };

    const loadImages = async () => {
      const loaded: HTMLImageElement[] = [];
      const promises: Promise<void>[] = [];

      // Phase 1: Load the initial frame (80) immediately for instant display on reload
      const initialFrame = 80;
      const initialImg = new Image();
      initialImg.src = getFrameUrl(initialFrame);
      
      const initialPromise = new Promise<void>((resolve) => {
        initialImg.onload = () => {
          loaded[initialFrame] = initialImg;
          setImages([...loaded]); // Trigger first render immediately
          resolve();
        };
        initialImg.onerror = () => resolve();
      });

      // Phase 2: Load the rest in the background
      for (let i = 1; i <= frameCount; i++) {
        if (i === initialFrame) continue;
        const img = new Image();
        img.src = getFrameUrl(i);
        const p = new Promise<void>((resolve) => {
          img.onload = () => {
            loaded[i] = img;
            resolve();
          };
          img.onerror = () => resolve();
        });
        promises.push(p);
      }

      await initialPromise;
      await Promise.all(promises);
      setImages(loaded);
    };

    loadImages();
  }, [mounted]);

  // Combined Resize and Frame Draw Logic for absolute consistency
  const drawFrame = useCallback((frameIndex: number) => {
    if (!canvasRef.current || images.length === 0) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = images[frameIndex] || images[80];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Ensure size is always synced before draw
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0); 
    context.clearRect(0, 0, width, height);
    
    // Perfect Matched Center-Cover logic
    const scale = Math.max(width / img.width, height / img.height);
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    
    const x = (width - drawWidth) / 2;
    const y = (height - drawHeight) / 2; // Mathematical Center by default

    context.drawImage(img, x, y, drawWidth, drawHeight);
  }, [images]);

  // Main animation loop
  useEffect(() => {
    if (!mounted || images.length === 0) return;

    let animId: number;
    const render = () => {
      const frameIndex = Math.floor(currentIndex.get());
      drawFrame(frameIndex);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [mounted, images, drawFrame, currentIndex]);

  // Storytelling Layers
  const chapter1Opacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.3], [1, 1, 1, 0]);
  const chapter1Scale = useTransform(smoothProgress, [0, 0.3], [1, 1.1]);
  const chapter1Y = useTransform(smoothProgress, [0, 0.3], [0, -30]);

  const chapter2Opacity = useTransform(smoothProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const chapter2Scale = useTransform(smoothProgress, [0.4, 0.65], [0.95, 1.05]);
  const chapter2Y = useTransform(smoothProgress, [0.4, 0.65], [30, -30]);

  const chapter3Opacity = useTransform(smoothProgress, [0.75, 0.8, 0.95, 1], [0, 1, 1, 1]);
  const chapter3Scale = useTransform(smoothProgress, [0.75, 1], [0.95, 1]);
  const chapter3Y = useTransform(smoothProgress, [0.75, 1], [30, 0]);

  const indicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  return (
    <section 
      ref={container} 
      className="relative h-[800vh] bg-black"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted && (
          <>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 block pointer-events-none w-full h-full"
            />
            
            <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10 pointer-events-none" />

            <div className="relative z-20 h-full w-full flex items-center justify-center p-6 text-center">
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                style={{ opacity: chapter1Opacity, scale: chapter1Scale, y: chapter1Y }}
                className="absolute flex flex-col items-center gap-8"
              >
                <div className="flex flex-col items-center gap-2">
                  <motion.span 
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.8em" }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                    className="text-amber-500/90 uppercase text-[11px] font-medium tracking-widest drop-shadow-md"
                  >
                    Est. 2026
                  </motion.span>
                  <h3 className="text-[15vw] md:text-[12rem] font-light tracking-tighter text-white uppercase flex flex-col leading-[0.8] drop-shadow-2xl">
                    <span className="italic font-serif">Singga</span>
                    <span className="font-bold -mt-2 md:-mt-6">Kopi</span>
                  </h3>
                </div>
                
                <div className="flex flex-col items-center gap-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="h-[1px] bg-white/40" 
                  />
                  <p className="text-zinc-300 uppercase tracking-[0.5em] text-[10px] md:text-sm font-light max-w-sm drop-shadow-lg leading-relaxed">
                    scroll ke bawah untuk Coffee Experience
                  </p>
                </div>
              </motion.div>

              <motion.div
                style={{ opacity: chapter2Opacity, scale: chapter2Scale, y: chapter2Y }}
                className="absolute flex flex-col items-center gap-6 px-4"
              >
                <span className="text-amber-500/80 uppercase tracking-[0.6em] text-[10px] font-medium">Authentic Journey</span>
                <h3 className="text-5xl md:text-9xl font-light tracking-tight text-white uppercase leading-tight">
                  The Art of <br /> <span className="italic font-serif text-amber-500/90">Signature</span> Roasting
                </h3>
                <p className="max-w-md text-zinc-400 text-xs md:text-sm font-light leading-relaxed">
                  Every bean is selected with care, honoring the legacy of traditional coffee culture from the heart of Indonesia.
                </p>
              </motion.div>

              <motion.div
                style={{ opacity: chapter3Opacity, scale: chapter3Scale, y: chapter3Y }}
                className="absolute flex flex-col items-center gap-6 px-4"
              >
                <h3 className="text-6xl md:text-[10rem] font-light tracking-tight text-white uppercase italic leading-none">
                  Sensory <br /> Perfection
                </h3>
                <div className="w-20 h-[1px] bg-amber-500/40" />
                <p className="max-w-xs text-zinc-300 text-xs md:text-sm uppercase tracking-[0.3em] font-light leading-loose">
                  Taste the richness of nature <br /> in every single drop.
                </p>
              </motion.div>

            </div>

            <motion.div 
              style={{ opacity: indicatorOpacity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
               <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500/60 via-white/20 to-transparent" />
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
