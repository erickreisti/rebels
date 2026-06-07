"use client";
import { motion } from "framer-motion";

export function MarqueeDivider() {
  const text = "INICIE A REBELIÃO COM REBELS ENERGY! /// ";
  
  return (
    <div className="w-full bg-accent-500 overflow-hidden py-6 md:py-8 border-y-8 border-black relative z-20 shadow-[0_15px_0px_rgba(0,0,0,1)]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1500] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 25 
        }}
      >
        {/* Renderiza várias cópias do texto para garantir preenchimento da tela durante a animação infinita */}
        {[...Array(10)].map((_, i) => (
          <span 
            key={i} 
            className="text-black font-sans font-black text-6xl md:text-[5vw] uppercase tracking-tighter mx-4 leading-none"
            style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.4)' }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
