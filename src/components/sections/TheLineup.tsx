"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);
import imgUltraCyber from "../../assets/images/can-ultra-cyber.png";
import imgNeonCitrus from "../../assets/images/can-neon-citrus.png";
import imgQuantumBlue from "../../assets/images/can-quantum-blue.png";
import imgInfernoRed from "../../assets/images/can-inferno-red.png";

// Importando as caveiras
import skullPurple from "../../assets/images/winged-skull-purple.png";
import skullGreen from "../../assets/images/winged-skull-green.png";
import skullBlue from "../../assets/images/winged-skull.png"; // Usando a neutra para o azul
import skullRed from "../../assets/images/winged-skull-red.png";

const energies = [
  {
    id: "1",
    line1: "ULTRA",
    line2: "CYBER",
    description: "The essence of the night in a can. Wild berries flavor with an electric citrus touch.",
    vibe: "Raw Energy",
    intensity: "Maximum",
    image: imgUltraCyber,
    skullImage: skullPurple,
    solidBg: "bg-[#D946EF]", // Fuchsia/Pink
    hexColor: "#D946EF",
    textColor: "text-black",
  },
  {
    id: "2",
    line1: "NEON",
    line2: "CITRUS",
    description: "Refreshing explosion of lime and yuzu with a sour background. For an icy reset.",
    vibe: "Fresh",
    intensity: "High",
    image: imgNeonCitrus,
    skullImage: skullGreen,
    solidBg: "bg-[#84CC16]", // Lime
    hexColor: "#84CC16",
    textColor: "text-black",
  },
  {
    id: "3",
    line1: "QUANTUM",
    line2: "BLUE",
    description: "Blue raspberry and blueberry flavor. Smooth at first, intense at the end.",
    vibe: "Mysterious",
    intensity: "Constant",
    image: imgQuantumBlue,
    skullImage: skullBlue,
    solidBg: "bg-[#0EA5E9]", // Sky Blue
    hexColor: "#0EA5E9",
    textColor: "text-black",
  },
  {
    id: "4",
    line1: "INFERNO",
    line2: "RED",
    description: "The hottest flavor: spicy cherry and dragon fruit. To dominate the night.",
    vibe: "Aggressive",
    intensity: "Extreme",
    image: imgInfernoRed,
    skullImage: skullRed,
    solidBg: "bg-[#EF4444]", // Red
    hexColor: "#EF4444",
    textColor: "text-black",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

export function TheLineup() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedEnergy = energies.find(e => e.id === selectedId);

  return (
    <section 
      id="catalog" 
      className="section bg-surface-900 relative min-h-screen flex flex-col justify-center w-full pt-20 md:pt-32 pb-24 overflow-hidden"
    >
      {/* Background glow sutil */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none translate-y-1/3 -translate-x-1/3" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

      {/* Modal de Detalhes (Fundo de Vidro Revelando o Fundo) */}
      <AnimatePresence>
        {selectedId && selectedEnergy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Background Caveira */}
            <motion.div 
              className="absolute inset-0 flex justify-center items-center pointer-events-none"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image 
                src={selectedEnergy.skullImage} 
                alt="Caveira de Fundo" 
                className="w-full max-w-[800px] h-auto object-contain blur-[2px]" 
                style={selectedEnergy.id === "3" ? { filter: 'sepia(1) hue-rotate(180deg) saturate(3)' } : {}}
              />
            </motion.div>

            {/* Seta Flutuante de Retornar na Lateral Esquerda */}
            <div className="absolute z-20 left-4 md:left-12 top-1/2 -translate-y-1/2 flex justify-start">
              <button 
                onClick={() => setSelectedId(null)}
                className="group flex flex-col items-center justify-center gap-2 text-white/50 hover:text-white transition-colors"
                title="Return"
              >
                <span className="flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white/30 group-hover:border-accent-500 group-hover:bg-accent-500 group-hover:text-black transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </span>
                <span className="font-sans font-bold uppercase tracking-widest text-xs md:text-sm">RETURN</span>
              </button>
            </div>

            {/* Conteúdo do Modal (Lata Esquerda, Info Direita) */}
            <div className="relative z-10 flex-1 container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
              
              {/* Lado Esquerdo: Lata Gigante */}
              <motion.div className="w-full md:w-1/2 flex justify-center items-center">
                <MotionImage 
                  layoutId={`can-${selectedEnergy.id}`}
                  src={selectedEnergy.image} 
                  alt={selectedEnergy.line1}
                  className="h-[400px] md:h-[600px] object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* Lado Direito: Informações */}
              <motion.div 
                className="w-full md:w-1/2 flex flex-col text-left"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <motion.h2 
                  layoutId={`title-${selectedEnergy.id}`}
                  className="text-[70px] md:text-[100px] leading-[0.85] font-sans font-black uppercase tracking-tighter mb-6"
                >
                  <span className="text-white" style={{ textShadow: `6px 6px 0px ${selectedEnergy.hexColor}` }}>
                    {selectedEnergy.line1}
                  </span>
                  <br />
                  <span style={{ color: selectedEnergy.hexColor, textShadow: '6px 6px 0px #000' }}>
                    {selectedEnergy.line2}
                  </span>
                </motion.h2>

                <div className="bg-surface-900 border-4 border-black shadow-[8px_8px_0px_#000] p-6 md:p-8 rounded-none mb-8 transform -rotate-1">
                  <p className="text-white/90 font-sans text-lg md:text-xl font-bold leading-relaxed mb-6">
                    {selectedEnergy.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 border-t-2 border-white/10 pt-6">
                    <div>
                      <span className="block text-xs text-white/50 uppercase tracking-widest font-black mb-1">Vibe</span>
                      <span className="text-white font-bold text-lg">{selectedEnergy.vibe}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-white/50 uppercase tracking-widest font-black mb-1">Intensity</span>
                      <span className="text-white font-bold text-lg">{selectedEnergy.intensity}</span>
                    </div>
                  </div>
                </div>

                <div 
                  className={`${selectedEnergy.solidBg} text-black border-4 border-black shadow-[6px_6px_0px_#000] font-black uppercase tracking-widest text-lg py-4 px-8 rounded-none transform rotate-1 text-center select-none`}
                >
                  Exclusive at Events
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 w-full relative z-10">
        <div className="text-center mb-20 md:mb-32 flex flex-col items-center">
          <h2 
            className="font-sans font-black text-6xl md:text-[8vw] leading-[0.85] uppercase tracking-tighter text-white"
            style={{ textShadow: '6px 6px 0px #db2777' }}
          >
            CHOOSE YOUR<br/>
            <span className="text-accent-500" style={{ textShadow: '6px 6px 0px #000' }}>VIBE</span>
          </h2>
          <div className="w-32 h-3 bg-white mt-10 shadow-[6px_6px_0px_#db2777] skew-x-[-15deg]"></div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-[1400px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {energies.map((energy, index) => {
            const isSelected = selectedId === energy.id;
            const isAnySelected = selectedId !== null;
            const rotationClass = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"][index % 4];

            return (
              <motion.div 
                key={energy.id}
                layoutId={`card-${energy.id}`}
                variants={cardVariants}
                animate={{
                  scale: isAnySelected && !isSelected ? 0.8 : 1,
                  opacity: isAnySelected && !isSelected ? 0.3 : 1,
                  filter: isAnySelected && !isSelected ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedId(energy.id)}
                className={`group relative flex flex-col items-center ${energy.solidBg} rounded-none p-6 pt-12 pb-8 border-4 border-black shadow-[12px_12px_0px_#000] transform ${rotationClass} hover:rotate-0 hover:shadow-[4px_4px_0px_#000] hover:translate-x-[8px] hover:translate-y-[8px] transition-all duration-300 cursor-pointer overflow-hidden ${isSelected ? 'pointer-events-none' : ''}`}
              >
                {/* Borda tracejada interna */}
                <div className="absolute inset-2 border-2 border-dashed border-black/30 rounded-none pointer-events-none transition-colors duration-500 group-hover:border-black/50" />

              {/* Título */}
              <div className="text-center z-10 w-full mb-8 relative">
                <motion.h3 
                  layoutId={`title-${energy.id}`}
                  className={`text-[46px] md:text-[56px] lg:text-[42px] xl:text-[56px] leading-[0.85] font-black uppercase tracking-tighter ${energy.textColor} font-sans`} 
                  style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.1)' }}
                >
                  {energy.line1}<br />{energy.line2}
                </motion.h3>
              </div>

              {/* Lata */}
              <motion.div 
                className="relative z-20 w-full flex justify-center mt-2 mb-8"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <MotionImage 
                  layoutId={`can-${energy.id}`}
                  src={energy.image} 
                  alt={`${energy.line1} ${energy.line2}`}
                  className="h-[280px] md:h-[320px] object-contain"
                  style={{ filter: `drop-shadow(15px 15px 0px rgba(0,0,0,0.6))` }}
                />
              </motion.div>

              {/* Informações */}
              <div className={`mt-auto text-center z-10 ${energy.textColor} px-2 flex flex-col justify-end h-full`}>
                <p className="text-xs md:text-sm font-bold leading-relaxed mb-4 opacity-95 max-w-[95%] mx-auto">
                  {energy.description}
                </p>
                <div className="flex items-center justify-center gap-3 text-[10px] md:text-[11px] font-black uppercase tracking-widest opacity-90 border-t-2 border-black/20 pt-4 mt-2">
                  <span>{energy.vibe}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  <span>{energy.intensity}</span>
                </div>
              </div>

            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
