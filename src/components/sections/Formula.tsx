"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useCart } from "../../context/CartContext";

const REASONS = [
  {
    title: "MORE ENERGY",
    desc: "A pure jolt of power to your system. No crashes, just raw output.",
    color: "#22d3ee" // Cyan
  },
  {
    title: "ENDLESS NIGHTS",
    desc: "Stay locked in the rave until the sun comes up. Your body won't quit.",
    color: "#ec4899" // Pink
  },
  {
    title: "LASER FOCUS",
    desc: "Nootropic enhancement. Hack your brain for maximum clarity.",
    color: "#a855f7" // Purple
  },
  {
    title: "NEON TASTE",
    desc: "Synthetic perfection. Tastes like the future in a can.",
    color: "#f5a818" // Accent/Orange
  }
];

function SpotlightCard({ reason }: { reason: typeof REASONS[0] }) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="relative p-6 bg-surface-900 border-2 border-white/5 overflow-hidden group cursor-crosshair min-h-[160px] flex flex-col justify-center"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), ${reason.color}20, transparent 40%)`
        }}
      />
      <div className="relative z-10 opacity-20 group-hover:opacity-10 transition-opacity">
        <h4 className="text-2xl font-black uppercase tracking-widest font-sans mb-1 text-white">
          {reason.title}
        </h4>
        <p className="text-white font-bold font-mono text-xs">
          [ LIGHT FRENESI... ]
        </p>
      </div>
      <div 
        className="absolute inset-0 p-6 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center"
        style={{
          WebkitMaskImage: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)`,
          maskImage: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)`
        }}
      >
        <h4 
          className="text-3xl font-black uppercase tracking-widest font-sans mb-1 drop-shadow-[0_0_15px_currentColor]"
          style={{ color: reason.color }}
        >
          {reason.title}
        </h4>
        <p className="text-white font-bold font-sans text-sm">
          {reason.desc}
        </p>
      </div>
    </div>
  );
}

export function Formula() {
  const { toggleCart } = useCart();
  
  return (
    <section id="latest-drop" className="section bg-surface-900 relative min-h-screen flex flex-col justify-center w-full py-24 border-y-4 border-black overflow-hidden">
      {/* Background Texture */}
      <div
        className="absolute inset-0 bg-pink-900/10 pointer-events-none mix-blend-overlay"
      ></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        
        {/* Massive Title Section */}
        <motion.div
          className="flex flex-col items-center text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-6 py-2 bg-accent-500 border-4 border-black text-black font-black uppercase tracking-widest text-xl md:text-2xl mb-8 shadow-[6px_6px_0px_#000] transform -rotate-2">
            The Unfair Advantage
          </div>
          
          <h2 className="text-7xl sm:text-9xl md:text-[11rem] font-sans font-black text-white mb-10 tracking-tighter uppercase leading-[0.85] drop-shadow-[8px_8px_0px_#db2777]">
            NOT YOUR<br/>
            AVERAGE<br/>
            <span className="text-pink-500 glitch-text-left inline-block" data-glitch="ENERGY" style={{ textShadow: '8px 8px 0px #000' }}>ENERGY</span>
          </h2>

          <p className="text-2xl md:text-3xl text-gray-300 font-bold leading-relaxed font-sans max-w-4xl">
            We stripped out the BS. No sugar crashes, no jitters, just pure, cyber-brewed performance designed to keep you dominating the grid until dawn.
          </p>
        </motion.div>

        {/* Grade de Holofotes (Spotlights) em 4 Colunas */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {REASONS.map((reason, index) => (
            <SpotlightCard key={index} reason={reason} />
          ))}
        </motion.div>

        {/* Botão Centralizado */}
        <div className="flex justify-center w-full">
          <motion.button
            onClick={() => toggleCart(true)}
            className="inline-flex items-center space-x-4 px-10 py-4 md:px-14 md:py-6 bg-pink-500 text-black border-4 border-black font-sans font-black uppercase tracking-tighter text-3xl md:text-5xl shadow-[8px_8px_0px_#000] transform -rotate-2 hover:-rotate-1 hover:shadow-[2px_2px_0px_#000] hover:translate-y-[6px] hover:translate-x-[6px] transition-all duration-300"
          >
            <span>Join The Elite</span>
            <FiChevronDown className="w-8 h-8 md:w-10 md:h-10 transform -rotate-90" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
