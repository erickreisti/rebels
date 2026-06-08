"use client";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-black text-white relative w-full border-t-4 border-white">
      {/* Marquee Header for Footer */}
      <div className="bg-white py-4 overflow-hidden flex whitespace-nowrap">
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

      <div className="container mx-auto px-4 py-24">
        
        {/* Title - Toned Down and Contained */}
        <div className="flex flex-col mb-16 border-b-4 border-white/20 pb-8">
          <h2 className="font-sans font-black text-5xl md:text-7xl uppercase text-white drop-shadow-[4px_4px_0px_#ec4899]">
            STAY REBEL
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full items-start">
          
          {/* Explore Links */}
          <div className="flex flex-col">
            <h4 className="font-sans font-black uppercase text-2xl tracking-widest mb-8 text-pink-500">
              Explore
            </h4>
            <div className="flex flex-col space-y-4">
              <a href="#about" className="font-sans font-black text-xl text-white hover:text-cyan-400 hover:translate-x-2 transition-transform w-fit uppercase">The Vibe</a>
              <a href="#catalog" className="font-sans font-black text-xl text-white hover:text-accent-500 hover:translate-x-2 transition-transform w-fit uppercase">The Lineup</a>
              <a href="#features" className="font-sans font-black text-xl text-white hover:text-pink-500 hover:translate-x-2 transition-transform w-fit uppercase">Formula</a>
            </div>
          </div>
          
          {/* Newsletter / Central Box */}
          <div className="flex flex-col bg-neutral-900 p-8 border-4 border-white shadow-[8px_8px_0px_#22d3ee] transition-shadow hover:shadow-[12px_12px_0px_#22d3ee]">
            <h4 className="text-white font-sans font-black uppercase text-2xl md:text-3xl tracking-tighter mb-2">Join The Cult</h4>
            <p className="font-sans font-bold text-white/60 uppercase tracking-widest text-sm mb-6">Drop your email. No spam, just pure energy.</p>
            
            <form className="w-full flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full border-4 border-white p-4 text-black font-sans font-black uppercase bg-white focus:outline-none focus:ring-4 focus:ring-cyan-400 placeholder-black/50"
              />
              <button 
                type="submit" 
                className="w-full bg-black text-white font-sans font-black uppercase text-xl p-4 border-4 border-white hover:bg-cyan-400 hover:text-black transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Socials */}
          <div className="flex flex-col md:text-right">
            <h4 className="font-sans font-black uppercase text-2xl tracking-widest mb-8 text-accent-500">
              Socials
            </h4>
            <div className="flex flex-col space-y-4 md:items-end">
              <a href="#" className="font-sans font-black text-xl text-white hover:text-pink-500 hover:-translate-x-2 transition-transform w-fit uppercase">Instagram</a>
              <a href="#" className="font-sans font-black text-xl text-white hover:text-cyan-400 hover:-translate-x-2 transition-transform w-fit uppercase">Twitter X</a>
              <a href="#" className="font-sans font-black text-xl text-white hover:text-accent-500 hover:-translate-x-2 transition-transform w-fit uppercase">Discord</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black border-t-4 border-white/20 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm font-bold uppercase tracking-widest text-white/60">
          <span>© {new Date().getFullYear()} REBELS ENERGY. ALL RIGHTS RESERVED.</span>
          <span className="mt-4 md:mt-0 px-4 py-2 bg-neutral-900 text-white border-2 border-white/20">MADE BY ERICK REIS</span>
        </div>
      </div>
    </footer>
  );
}
