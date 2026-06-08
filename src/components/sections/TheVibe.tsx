"use client";
import { motion } from "framer-motion";

export function TheVibe() {
  return (
    <section id="about" className="section bg-surface-900 relative overflow-hidden min-h-screen flex flex-col items-center justify-center w-full pt-32 pb-24">
      {/* Background Glow Cyberpunk */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[200px] opacity-[0.05] mix-blend-screen -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      {/* Container flex perfeitamente centralizado verticalmente */}
      <div className="container mx-auto px-4 w-full max-w-[1400px] flex items-center justify-center h-full pt-40 md:pt-20">
        <div className="relative w-full flex flex-col lg:block items-center lg:h-[65vh] xl:h-[70vh] gap-12 lg:gap-0">
          
          {/* Item 1: Taurina Extrema (Esquerda Superior) */}
          <motion.div 
            className="lg:absolute lg:top-4 lg:left-0 z-30 w-full max-w-[300px] xl:max-w-[340px] group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative bg-accent-500 p-6 md:p-8 rounded-[24px] border-4 border-black shadow-[10px_10px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[6px_6px_0px_#000] transition-all duration-300 text-right z-10">
              
              {/* Linha Conectora Limpa (Vai para a direita até a lata) */}
              <div className="hidden lg:block absolute top-1/2 left-[98%] w-[12vw] xl:w-[15vw] h-[6px] bg-black -z-10 -translate-y-1/2" />

              <h4 className="text-2xl font-sans font-black text-black mb-3 uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                Extreme Taurine
              </h4>
              <p className="text-black font-sans font-bold text-sm leading-relaxed opacity-95">
                For instant explosive energy. Our dose is precisely calculated to give you maximum thrust when the game turns and you need it most.
              </p>
            </div>
          </motion.div>

          {/* Item 2: Zero Açúcar (Esquerda Inferior) */}
          <motion.div 
            className="lg:absolute lg:bottom-4 lg:left-8 z-30 w-full max-w-[300px] xl:max-w-[340px] group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative bg-cyan-400 p-6 md:p-8 rounded-[24px] border-4 border-black shadow-[10px_10px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[6px_6px_0px_#000] transition-all duration-300 text-right lg:text-left z-10">
              
              {/* Linha Conectora Limpa (Vai para a direita) */}
              <div className="hidden lg:block absolute top-1/2 left-[98%] w-[10vw] xl:w-[13vw] h-[6px] bg-black -z-10 -translate-y-1/2" />

              <h4 className="text-2xl font-sans font-black text-black mb-3 uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                Zero Sugar
              </h4>
              <p className="text-black font-sans font-bold text-sm leading-relaxed opacity-95">
                No crash at the end of the match. All the power without the fatigue that sugar brings. A wave of clean, constant energy that lasts the entire night.
              </p>
            </div>
          </motion.div>

          {/* Item 3: Foco Neural (Direita Central) */}
          <motion.div 
            className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 z-30 w-full max-w-[300px] xl:max-w-[340px] group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative bg-pink-500 p-6 md:p-8 rounded-[24px] border-4 border-black shadow-[10px_10px_0px_#000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[6px_6px_0px_#000] transition-all duration-300 text-left z-10">
              
              {/* Linha Conectora Limpa (Vai para a esquerda até a lata) */}
              <div className="hidden lg:block absolute top-1/2 right-[98%] w-[12vw] xl:w-[15vw] h-[6px] bg-black -z-10 -translate-y-1/2" />

              <h4 className="text-2xl font-sans font-black text-black mb-3 uppercase tracking-tighter" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                Neural Focus
              </h4>
              <p className="text-black font-sans font-bold text-sm leading-relaxed opacity-95">
                Vitamins B12 and B6 in a complex optimized for the mind. Specially developed for gamers and devs who can't afford to blink.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
