"use client";
import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi"; // FiDroplet no lugar de FiWine

export function Footer() {
  return (
    <footer className="bg-black text-white relative overflow-hidden border-t-4 border-black">
      {/* Marquee Header for Footer */}
      <div className="bg-accent-500 border-b-4 border-black py-3 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex space-x-8 font-sans font-black uppercase text-xl md:text-2xl tracking-widest text-black"
        >
          {Array(10).fill("JOIN THE REBELLION • ").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col items-center justify-center">
          {/* Massive Typography */}
          <h2 className="font-sans font-black text-[12vw] leading-[0.8] tracking-tighter text-center uppercase drop-shadow-[8px_8px_0px_#db2777] mb-12">
            STAY<br/>
            <span className="text-accent-500" style={{ textShadow: "8px 8px 0px #0ea5e9" }}>REBEL</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl mt-16 border-t-4 border-white/20 pt-16">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-pink-500 font-black uppercase tracking-widest mb-4">Explore</h4>
              <a href="#about" className="font-bold hover:text-accent-500 mb-2 uppercase transition-colors">The Vibe</a>
              <a href="#catalog" className="font-bold hover:text-accent-500 mb-2 uppercase transition-colors">The Lineup</a>
              <a href="#features" className="font-bold hover:text-accent-500 mb-2 uppercase transition-colors">Formula</a>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="flex items-baseline font-sans font-black tracking-tighter text-6xl mb-4 group cursor-pointer">
                <span className="text-accent-500 group-hover:text-cyan-400 transition-colors">R</span>
                <span className="text-white -ml-1 group-hover:text-pink-500 transition-colors">E</span>
                <span className="text-purple-500 text-7xl -ml-1 leading-none animate-pulse">.</span>
              </div>
              <p className="font-bold text-gray-500 uppercase tracking-widest">Crack the bold.</p>
            </div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right">
              <h4 className="text-cyan-400 font-black uppercase tracking-widest mb-4">Socials</h4>
              <a href="#" className="font-bold hover:text-accent-500 mb-2 uppercase transition-colors">Instagram</a>
              <a href="#" className="font-bold hover:text-accent-500 mb-2 uppercase transition-colors">Twitter X</a>
              <a href="#" className="font-bold hover:text-accent-500 mb-2 uppercase transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-900 border-t-4 border-black py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-xs font-black uppercase tracking-widest text-gray-500">
          <span>© {new Date().getFullYear()} REBELS ENERGY. ALL RIGHTS RESERVED.</span>
          <span className="mt-4 md:mt-0">MADE BY ERICK REIS</span>
        </div>
      </div>
    </footer>
  );
}
