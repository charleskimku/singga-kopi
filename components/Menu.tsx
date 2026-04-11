"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Menu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const links = [
    { title: "beranda", href: "#home" },
    { title: "tentang kami", href: "#about" },
    { title: "produk kami", href: "#products" },
    { title: "kontak", href: "#contact" },
  ];

  const socialLinks = ["Instagram", "Twitter", "Facebook"];

  const menuVariants = {
    initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    },
    exit: {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }
    }
  };

  const linkVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.1 * i + 0.3 }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="menu"
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-[#111] text-white flex flex-col justify-between p-8 md:p-16 h-svh"
        >
          {/* Header inside Menu */}
          <div className="flex justify-between items-center w-full z-10">
            <div className="text-xl font-medium tracking-widest uppercase">
              Singga kopi
            </div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="uppercase text-sm font-medium tracking-widest hidden md:block group-hover:underline underline-offset-4">
                Close
              </span>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02]">
            <h1 className="text-[25vw] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
              Singga kopi
            </h1>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 mt-16 md:mt-24">
            {links.map((link, i) => (
              <div key={link.title} className="overflow-hidden">
                <motion.a
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  onClick={onClose}
                  className="block text-5xl md:text-8xl font-light uppercase tracking-tighter hover:italic focus:italic transition-all duration-300 origin-left hover:text-zinc-400"
                >
                  {link.title}
                </motion.a>
              </div>
            ))}
          </div>

          {/* Socials & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-8 mt-auto"
          >
            <div className="flex gap-6 uppercase text-sm tracking-wide text-zinc-400">
              {socialLinks.map((social) => (
                <a key={social} href="#" className="hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
            <div className="text-sm tracking-wide text-zinc-400 uppercase">
              singgakopi@gmail.com
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
