"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Catalog", href: "#catalog" },
  { name: "Features", href: "#features" },
  { name: "Blog", href: "#blog" },
  { name: "Location", href: "#locale" },
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
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-primary-900/70 backdrop-blur-xl border-b border-primary-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between h-20 md:h-24 w-full">
            {/* Logo Brutalista com Imagem */}
            <div className="shrink-0">
              <a href="#" className="flex items-center group gap-3 z-10">
                {/* Logo Tipográfica RE */}
                <div className="flex items-baseline font-sans font-black tracking-tighter text-4xl md:text-5xl transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                  <span className="text-accent-500">R</span>
                  <span className="text-white -ml-1 opacity-90">E</span>
                  <span className="text-purple-500 text-5xl md:text-6xl -ml-1 leading-none">.</span>
                </div>
                <span className="text-2xl md:text-3xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-accent-500 via-pink-500 to-purple-500 transition-transform duration-300 group-hover:scale-105">
                  REBELS ENERGY
                </span>
              </a>
            </div>

            {/* Desktop Nav - Centered Flex */}
            <div className="hidden lg:flex flex-1 justify-center items-center px-8 z-10">
              <div className="flex space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="relative inline-block font-sans text-xs font-bold text-primary-300 hover:text-pink-400 uppercase tracking-widest transition-all duration-300 py-2 hover:scale-110 hover:[text-shadow:0_0_15px_#ec4899,0_0_30px_#a855f7]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA + Mobile */}
            <div className="shrink-0 flex items-center space-x-4 z-10">
              <motion.a
                href="#catalog"
                className="hidden md:flex items-center gap-2 px-7 py-3 bg-linear-to-r from-accent-500 via-pink-500 to-purple-500 text-white text-xs font-sans font-black uppercase tracking-widest rounded-full shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Now
                <FiArrowRight className="w-4 h-4" />
              </motion.a>

              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 text-primary-50 hover:text-accent-500 transition-colors"
                aria-label="Open menu"
              >
                <FiMenu className="w-8 h-8" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer - Tela Cheia Minimalista */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-primary-900 z-50 md:hidden flex flex-col"
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
                <span className="text-2xl font-sans font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-accent-500 via-pink-500 to-purple-500">
                  REBELS ENERGY
                </span>
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
