"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Simulate loading/preloading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    // Preload the first few frames
    const preloadFrames = async () => {
      const promises = [];
      for (let i = 1; i <= 20; i++) {
        const img = new Image();
        img.src = `/sequence/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        promises.push(new Promise((resolve) => (img.onload = resolve)));
      }
      await Promise.all(promises);
    };

    preloadFrames();
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-[1px] bg-white/20 mb-8"
            />
            <motion.h1
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-white text-xs uppercase tracking-[0.5em] font-light"
            >
              Singga Kopi
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
