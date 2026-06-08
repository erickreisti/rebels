"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCart } from "../../context/CartContext";
import logoImg from "../../assets/images/winged-skull-glitch-logo.png";

export function TheManifesto() {
  const { toggleCart } = useCart();
  
  // Parallax do Manifesto
  const manifestoRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.section 
      ref={manifestoRef} 
      className="relative min-h-screen border-y-4 border-black bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.div 
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        variants={{
          hidden: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' },
          visible: { 
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            transition: { duration: 1.2, ease: [0.85, 0, 0.15, 1] }
          }
        }}
      >
        {/* Vídeo de Fundo com Parallax */}
        <motion.div 
          className="absolute left-0 w-full h-[140%] top-[-20%] z-0"
        style={{ y: backgroundY }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50"
          style={{ filter: 'grayscale(30%) contrast(120%)' }}
        >
          <source src="/mixer.mp4" type="video/mp4" />
        </video>
      </motion.div>
      
      {/* Overlay Escuro para o vídeo (Substitui o overlay rosa) */}
      <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none z-0" />

      {/* Conteúdo do Manifesto (Sequência em Inglês) */}
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center min-h-screen py-24">
        <motion.h2 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.2], transition: { duration: 3, times: [0, 0.2, 0.8, 1], delay: 0.5 } }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-[10vw] md:text-[7vw] font-sans font-black text-white uppercase tracking-tighter leading-none pointer-events-none glitch-text-left" 
          style={{ textShadow: '6px 6px 0px #000' }}
          data-glitch="WE DON'T SLEEP."
        >
          WE DON'T SLEEP.
        </motion.h2>

        <motion.h2 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.2], transition: { duration: 3, times: [0, 0.2, 0.8, 1], delay: 3.2 } }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-[8vw] md:text-[5.5vw] font-sans font-black text-cyan-400 uppercase tracking-tighter leading-none pointer-events-none glitch-text-right" 
          style={{ textShadow: '6px 6px 0px #ec4899' }}
          data-glitch="WE ARE THE RESISTANCE."
        >
          WE ARE THE RESISTANCE.
        </motion.h2>

        <motion.h2 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 1.2], transition: { duration: 3, times: [0, 0.2, 0.8, 1], delay: 5.9 } }
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-[12vw] md:text-[8vw] font-sans font-black text-white uppercase tracking-tighter leading-none pointer-events-none glitch-text-left" 
          style={{ textShadow: '8px 8px 0px #000' }}
          data-glitch="WE ARE REBELS!"
        >
          WE ARE REBELS!
        </motion.h2>

        {/* Final Logo and Button */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 8.5, type: "spring", bounce: 0.5 } }
          }}
          className="flex flex-col items-center z-20 w-full -mt-48 md:-mt-72"
        >
          <img src={logoImg.src} alt="Rebels Energy Glitch Logo" className="w-80 h-80 md:w-[500px] md:h-[500px] object-contain mb-12 drop-shadow-[0_0_40px_rgba(236,72,153,0.8)] hover:scale-105 transition-transform duration-500" />
          
          <button 
            onClick={() => toggleCart(true)}
            className="px-10 py-4 md:px-14 md:py-6 bg-accent-500 text-black border-4 border-black font-sans font-black uppercase tracking-tighter text-3xl md:text-5xl shadow-[8px_8px_0px_#000] transform -rotate-2 hover:-rotate-1 hover:shadow-[2px_2px_0px_#000] hover:translate-y-[6px] hover:translate-x-[6px] transition-all duration-300"
          >
            Join The Cult
          </button>
        </motion.div>
      </div>
      </motion.div>
    </motion.section>
  );
}
