"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

export default function BentoSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

 
  const menuImage = "/foto/menu.jpeg";

  return (
    <>
      <section id="products" className="py-24 md:py-32 pt-32 md:pt-48 scroll-mt-24 px-6 md:px-16 bg-black text-white relative z-10 w-full overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-10 md:gap-16">
          <div className="text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-light uppercase tracking-tighter mb-4"
            >
              Our Menu
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 uppercase tracking-widest text-xs md:text-sm font-medium"
            >
              Singga Kopi Signature
            </motion.p>
          </div>
          
          {/* Single Featured Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedImage(menuImage)}
            className="relative group w-full aspect-[3/4] md:aspect-[4/5] max-w-2xl rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl cursor-pointer"
          >
            <img 
              src={menuImage} 
              alt="Daftar Menu Singgah Kopi" 
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 ease-out will-change-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
            
            {/* Overlay Hints */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
               <div className="flex flex-col gap-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-3">
                     <span className="w-8 h-[1px] bg-white/40" />
                     <p className="text-white/60 uppercase tracking-widest text-[10px] md:text-xs">Featured Item</p>
                  </div>
                  <h3 className="text-3xl md:text-5xl tracking-tighter font-medium uppercase">Daftar Menu</h3>
               </div>
            </div>

            {/* Scale Hint Icon */}
            <div className="absolute top-8 right-8 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
               <Maximize2 size={24} className="text-white" />
            </div>
          </motion.div>

          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.4 }}
             viewport={{ once: true }}
             transition={{ delay: 0.5 }}
             className="text-white/60 text-xs md:text-sm tracking-wide"
          >
            Click card to view full resolution
          </motion.p>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 cursor-zoom-out backdrop-blur-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-2"
            >
              <X size={40} />
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              src={selectedImage}
              alt="Expanded Menu"
              className="max-w-full max-h-full rounded-2xl object-contain shadow-[0_0_80px_rgba(255,255,255,0.05)]"
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
