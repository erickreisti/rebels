"use client";
import { motion } from "framer-motion";
import { FiArrowDownRight } from "react-icons/fi";
import imgHero from "../../assets/images/rebels-can.png";
import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

// Função pseudo-aleatória determinística para evitar Hydration Mismatch no Next.js
const prng = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Componente para as faíscas/glitches coloridos
const GlitchEffect = () => {
  const colors = ['bg-accent-500', 'bg-pink-500', 'bg-purple-500', 'bg-cyan-400'];
  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute h-2 md:h-6 w-[20vw] md:w-[40vw] ${colors[i % 4]} mix-blend-screen opacity-0`}
          initial={{ top: `${prng(i + 1) * 100}%`, left: `${prng(i + 2) * 100}%` }}
          animate={{
            opacity: [0, 1, 0, 1, 0, 0],
            x: [0, prng(i + 3) * 100 - 50, 0, prng(i + 4) * 50 - 25, 0],
            scaleX: [1, 2, 0.5, 3, 1],
          }}
          transition={{
            duration: 0.2 + prng(i + 5) * 0.4,
            repeat: Infinity,
            repeatDelay: prng(i + 6) * 0.2,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  const [phase, setPhase] = useState("glitch"); // "glitch", "canDrop", "impact"

  useEffect(() => {
    // Termina os glitches e começa a cair a lata após 1.5s
    const timer = setTimeout(() => {
      setPhase("canDrop");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleImpact = () => {
    if (phase === "impact") return;
    setPhase("impact");

    // Cores cibernéticas dos fogos
    const colors = ['#EC4899', '#A855F7', '#06B6D4', '#ffffff'];
    
    // Explosão Esquerda (saindo do centro da lata pra diagonal esquerda)
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.65, x: 0.45 },
      angle: 135,
      colors: colors,
      startVelocity: 55,
      zIndex: 50,
      gravity: 0.9,
      scalar: 1.2
    });
    
    // Explosão Direita (saindo do centro da lata pra diagonal direita)
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.65, x: 0.55 },
      angle: 45,
      colors: colors,
      startVelocity: 55,
      zIndex: 50,
      gravity: 0.9,
      scalar: 1.2
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0608] mt-10 md:mt-0">
      {/* ── Background Gradients ── */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-800 rounded-full blur-[150px] opacity-40 mix-blend-screen translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-500 rounded-full blur-[150px] opacity-10 mix-blend-screen -translate-x-1/4 translate-y-1/4" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Glitches Iniciais */}
      {phase === "glitch" && <GlitchEffect />}

      {/* Slogans Absolutos (Esquerda e Direita) */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto pointer-events-none z-0">
        
        {/* Slogan Esquerda */}
        <div className="absolute left-6 md:left-[10%] top-1/2 -translate-y-1/2 overflow-hidden">
          <motion.h1 
            initial={{ x: "-100%", opacity: 0 }}
            animate={phase === "impact" ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="font-sans font-black text-transparent bg-clip-text bg-linear-to-br from-accent-500 to-pink-500 leading-[0.85] tracking-tighter" 
            style={{ fontSize: "clamp(3rem, 8vw, 10rem)" }}
          >
            CRACK<br/>THE
          </motion.h1>
        </div>

        {/* Slogan Direita */}
        <div className="absolute right-6 md:right-[10%] top-1/2 -translate-y-1/2 overflow-hidden text-right">
          <motion.h1 
            initial={{ x: "100%", opacity: 0 }}
            animate={phase === "impact" ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.1 }}
            className="font-sans font-black text-primary-50 leading-[0.85] tracking-tighter" 
            style={{ fontSize: "clamp(3rem, 8vw, 10rem)" }}
          >
            BOLD<span className="text-purple-500">.</span>
          </motion.h1>
        </div>
      </div>

      {/* A Lata Central (Só aparece a partir do canDrop) */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none mt-10 md:mt-20">
        
        {/* Lata 3D */}
        {(phase === "canDrop" || phase === "impact") && (
          <motion.img
            initial={{ opacity: 0, y: -800, rotate: 20, scale: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 120, 
              damping: 14, 
              mass: 2
            }}
            onAnimationComplete={() => handleImpact()}
            src={imgHero.src}
            alt="Rebels Can"
            className="relative z-10 h-[55vh] md:h-[75vh] w-auto object-contain origin-bottom mix-blend-screen pointer-events-auto drop-shadow-[0_0_50px_rgba(236,72,153,0.15)]"
          />
        )}
        
        {/* Botão de Ação Inferior */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={phase === "impact" ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute bottom-10 flex flex-col md:flex-row items-center gap-6 z-20 pointer-events-auto"
        >
          <a
            href="#catalog"
            className="group flex items-center gap-4 bg-accent-500 text-primary-900 px-8 py-4 md:py-5 rounded-full font-sans font-black uppercase tracking-tight text-base md:text-lg hover:bg-primary-50 transition-colors shadow-[0_0_30px_rgba(236,72,153,0.4)]"
          >
            Taste Rebellion
            <div className="bg-primary-900 text-accent-500 p-2 rounded-full group-hover:bg-primary-50 group-hover:text-primary-900 transition-colors">
              <FiArrowDownRight className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
            </div>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
