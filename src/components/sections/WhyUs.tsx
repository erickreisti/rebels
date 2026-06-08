"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";

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
      className="relative p-8 bg-surface-900 border-2 border-white/5 overflow-hidden group cursor-crosshair min-h-[200px] flex flex-col justify-center"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      {/* O Spotlight de Fundo (Brilho suave na caixa) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${reason.color}20, transparent 40%)`
        }}
      />

      {/* Texto Base (Quase invisível, tipo marca d'água) */}
      <div className="relative z-10 opacity-20 group-hover:opacity-10 transition-opacity">
        <h4 className="text-3xl font-black uppercase tracking-widest font-sans mb-2 text-white">
          {reason.title}
        </h4>
        <p className="text-white font-bold font-mono text-sm">
          [ SCANNING DATA... ]
        </p>
      </div>

      {/* Texto Revelado (Brilha com a cor neon quando o mouse passa) */}
      <div 
        className="absolute inset-0 p-8 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center"
        style={{
          WebkitMaskImage: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)`,
          maskImage: `radial-gradient(200px circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 80%)`
        }}
      >
        <h4 
          className="text-4xl font-black uppercase tracking-widest font-sans mb-2 drop-shadow-[0_0_15px_currentColor]"
          style={{ color: reason.color }}
        >
          {reason.title}
        </h4>
        <p className="text-white font-bold font-sans text-lg">
          {reason.desc}
        </p>
      </div>
    </div>
  );
}

export function WhyUs() {
  return (
    <section className="relative bg-black min-h-screen py-24 border-y-4 border-black overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Coluna da Esquerda: O Manifesto de Venda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex flex-col items-start"
          >
            <div className="inline-block px-4 py-1 bg-white text-black font-black uppercase tracking-widest text-sm mb-6 shadow-[4px_4px_0px_#db2777] transform rotate-1">
              Why Rebels?
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 drop-shadow-[4px_4px_0px_#22d3ee]">
              THE SYSTEM<br/>
              WANTS YOU<br/>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-500 to-cyan-400">ASLEEP.</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-400 font-bold mb-8 leading-relaxed font-sans max-w-xl">
              We engineered the antidote. Rebels Energy isn't just a drink; it's a weapon against fatigue. Pass your scanner over the datablocks to reveal the truth.
            </p>

            <div className="hidden lg:block w-32 h-2 bg-gradient-to-r from-pink-500 to-cyan-400 mt-4 rounded-full" />
          </motion.div>

          {/* Coluna da Direita: Grade de Holofotes (Spotlights) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {REASONS.map((reason, index) => (
              <SpotlightCard key={index} reason={reason} />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
