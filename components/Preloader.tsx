"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preload the first few frames to ensure the experience starts smoothly.
    const preloadFrames = async () => {
      const promises = [];
      for (let i = 1; i <= 5; i++) {
        const indexStr = i.toString().padStart(3, "0");
        const imgUrl = `/sequence/ezgif-frame-${indexStr}.jpg`;

        const imgPromise = new Promise((resolve) => {
          const img = new Image();
          img.src = imgUrl;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
        promises.push(imgPromise);
      }

      await Promise.all(promises);

      // Add a slight delay for aesthetic purposes
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    preloadFrames();
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="text-white text-3xl font-light tracking-widest"
          >
            SINGGA KOPI
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
