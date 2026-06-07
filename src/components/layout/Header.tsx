"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const navItems = [
  { name: "The Vibe", href: "#about" },
  { name: "The Lineup", href: "#catalog" },
  { name: "Formula", href: "#features" },
  { name: "Drops", href: "#blog" },
  { name: "Stockists", href: "#locale" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, type: "spring", stiffness: 80 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-transparent py-2" 
            : "bg-transparent"
        }`}
      >
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between h-20 md:h-24 w-full">
            {/* Logo Brutalista com Imagem */}
            <div className="shrink-0">
              <a href="#" className="flex items-center group gap-3 z-10">
                {/* Logo Tipográfica RE - com ponto pulsante */}
                <div className="flex items-baseline font-sans font-black tracking-tighter text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  <span className="text-accent-500">R</span>
                  <span className="text-white -ml-1 opacity-90">E</span>
                  <span className="text-purple-500 text-5xl md:text-6xl -ml-1 leading-none animate-pulse">.</span>
                </div>
              </a>
            </div>

            {/* Desktop Nav - Centered Flex */}
            <AnimatePresence>
              {!scrolled && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, display: "none" }}
                  transition={{ duration: 0.2 }}
                  className="hidden lg:flex flex-1 justify-center items-center px-8 z-10"
                >
                  <div className="flex space-x-8">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="relative group font-sans font-black text-xs md:text-sm text-primary-50 hover:text-black uppercase tracking-widest transition-all duration-200 px-4 py-2"
                      >
                        <span className="relative z-10 transition-colors duration-200">
                          {item.name}
                        </span>
                        {/* Bloco Pílula Brutalista que aparece no hover */}
                        <span className="absolute inset-0 bg-accent-500 border-2 border-black shadow-[3px_3px_0px_#000] opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 -z-10 rounded-full"></span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA + Mobile */}
            <div className="shrink-0 flex items-center space-x-4 z-10">
              <motion.a
                href="#catalog"
                className="hidden md:flex items-center gap-2 px-6 py-2.5 border-2 border-black bg-accent-500 text-black text-xs md:text-sm font-sans font-black uppercase tracking-widest shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all duration-200 rounded-full"
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
                <FiArrowRight className="w-4 h-4" />
              </motion.a>

              <button
                onClick={() => setIsOpen(true)}
                className={`p-2 bg-surface-800 text-white hover:text-accent-500 flex items-center border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all duration-200 rounded-full ${scrolled ? 'lg:flex' : 'lg:hidden'}`}
                aria-label="Open menu"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Fullscreen Drawer (Mobile & Desktop Scrolled) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-primary-900 z-50 flex flex-col"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 h-24">
              <div className="flex items-center gap-3">
                <div className="flex items-baseline font-sans font-black tracking-tighter text-4xl">
                  <span className="text-accent-500">R</span>
                  <span className="text-white -ml-1 opacity-90">E</span>
                  <span className="text-purple-500 text-5xl -ml-1 leading-none">.</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-primary-50 hover:text-accent-500"
              >
                <FiX className="w-8 h-8" />
              </button>
            </div>

            {/* Drawer Nav */}
            <nav className="flex-1 flex flex-col items-center justify-center space-y-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-sans font-black tracking-tighter text-primary-200 hover:text-accent-500 lowercase transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            <div className="p-8 pb-12">
              <a
                href="#catalog"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-accent-500 text-primary-900 font-sans font-bold uppercase tracking-tight rounded-full"
              >
                Shop Now
                <FiArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
