"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import Image from "next/image";
import logoImg from "../../assets/images/winged-skull-glitch-logo.png";

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
  const [activeMenuIdx, setActiveMenuIdx] = useState(0);
  const { toggleCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueia o scroll da página quando o menu mobile está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setActiveMenuIdx(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, type: "spring", stiffness: 80 }}
        className={`fixed w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-transparent py-4" 
            : "bg-transparent py-2"
        }`}
      >
        <div className="w-full mx-auto px-4 md:px-8 lg:px-12">
          <nav className="flex items-center justify-between h-28 md:h-32 w-full">
            {/* Logo Brutalista com Imagem */}
            <div className="shrink-0">
              <a href="#" className="flex items-center group gap-3 z-10">
                {/* Logo Caveira Alada */}
                <div className="transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] flex items-center justify-center">
                  <Image src={logoImg} alt="Rebels Energy Logo" width={112} height={112} className="object-contain" unoptimized={true} priority />
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
                        {/* Bloco Brutalista que aparece no hover */}
                        <span className="absolute inset-0 bg-accent-500 border-2 border-black shadow-[4px_4px_0px_#000] opacity-0 group-hover:opacity-100 transition-all duration-200 scale-95 group-hover:scale-100 group-hover:-translate-y-1 group-hover:-translate-x-1 -z-10 rounded-none group-hover:-rotate-2"></span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA + Mobile */}
            <div className="shrink-0 flex items-center space-x-4 z-10">
              <motion.button
                onClick={() => toggleCart()}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 border-2 border-black bg-accent-500 text-black text-xs md:text-sm font-sans font-black uppercase tracking-widest shadow-[4px_4px_0px_#000] transform -rotate-2 hover:-rotate-1 hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all duration-200"
                whileTap={{ scale: 0.95 }}
              >
                Cart ({cartCount})
                <FiShoppingCart className="w-4 h-4" />
              </motion.button>

              <button
                onClick={() => setIsOpen(true)}
                className={`p-2 bg-surface-800 text-white hover:text-accent-500 flex items-center border-2 border-black shadow-[4px_4px_0px_#000] transform -rotate-2 hover:-rotate-1 hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all duration-200 ${scrolled ? 'lg:flex' : 'lg:hidden'}`}
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
            className="fixed inset-0 bg-black z-[100] flex flex-col overflow-y-auto"
            onWheel={(e) => {
              if (e.deltaY > 0) {
                setActiveMenuIdx((prev) => Math.min(prev + 1, navItems.length - 1));
              } else if (e.deltaY < 0) {
                setActiveMenuIdx((prev) => Math.max(prev - 1, 0));
              }
            }}
            initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
            transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 md:p-12">
              <div className="flex items-center drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                <Image src={logoImg} alt="Rebels Energy Logo" width={96} height={96} className="object-contain" unoptimized={true} priority />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-4 bg-black border-4 border-white text-white hover:bg-pink-500 hover:text-black shadow-[6px_6px_0px_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                <FiX className="w-8 h-8" />
              </button>
            </div>

            {/* Drawer Nav */}
            <nav className="flex-1 flex flex-col items-center justify-center space-y-4 md:space-y-6 w-full max-w-4xl mx-auto py-6">
              {navItems.map((item, i) => {
                const isActive = i === activeMenuIdx;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`font-sans font-black tracking-tighter uppercase text-center transition-all duration-300 cursor-pointer
                      ${isActive 
                        ? 'text-5xl md:text-7xl text-white scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                        : 'text-3xl md:text-4xl text-white/20 hover:text-white/50'}
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    onMouseEnter={() => setActiveMenuIdx(i)}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </nav>

            <div className="p-4 md:p-8 w-full max-w-md mx-auto mt-auto pb-8">
              <button
                onClick={() => {
                  setIsOpen(false);
                  toggleCart();
                }}
                className="flex items-center justify-center gap-3 w-full py-3 md:py-4 bg-accent-500 border-4 border-white shadow-[4px_4px_0px_#ec4899] text-black font-sans font-black text-lg md:text-xl uppercase tracking-widest transform -rotate-1 hover:rotate-0 hover:shadow-none hover:translate-y-1 hover:translate-x-1 transition-all"
              >
                Cart ({cartCount})
                <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
